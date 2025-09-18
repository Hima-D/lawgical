const { streamText } = require('ai');
const { openai } = require('@ai-sdk/openai');
const { MongoClient } = require('mongodb');
const { RecursiveCharacterTextSplitter } = require('langchain/text_splitter');
const { OpenAIEmbeddings } = require('@langchain/openai');
const { MongoDBAtlasVectorSearch } = require('@langchain/community/vectorstores/mongodb_atlas');
const { ChatPromptTemplate, MessagesPlaceholder } = require('@langchain/core/prompts');
const { HumanMessage, AIMessage } = require('@langchain/core/messages');
const { MongoDBChatMessageHistory } = require('@langchain/community/chat_message_histories/mongodb');
const { RunnableSequence } = require('@langchain/core/runnables');

// Global MongoDB client
let client;
async function getMongoClient() {
  if (!client) {
    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
  }
  return client;
}

exports.POST = async function (req) {
  const { messages } = await req.json();
  const sessionId = 'test-session'; // Replace with req.headers.get('session-id') or cookies
  const lastMessage = messages[messages.length - 1].content;

  const mongoClient = await getMongoClient();
  const db = mongoClient.db('ai_chat');
  const historyCollection = db.collection('history');
  const vectorCollection = db.collection('vectors');

  // Message history
  const history = new MongoDBChatMessageHistory({
    collection: historyCollection,
    sessionId,
  });

  // Add user message
  await history.addMessages([new HumanMessage(lastMessage)]);

  // Vector store for RAG
  const embeddings = new OpenAIEmbeddings();
  const vectorStore = new MongoDBAtlasVectorSearch(embeddings, {
    collection: vectorCollection,
    indexName: 'default',
    textKey: 'text',
    embeddingKey: 'embedding',
  });
  const retriever = vectorStore.asRetriever({
    k: 4,
    filter: { 'metadata.sessionId': sessionId },
  });

  // Retrieve context
  const relevantDocs = await retriever.invoke(lastMessage);
  const context = relevantDocs.map((doc) => doc.pageContent).join('\n\n');

  // Prompt template
  const prompt = ChatPromptTemplate.fromMessages([
    ['system', 'You are a helpful legal AI assistant. Use the following context if relevant: {context}'],
    new MessagesPlaceholder('chat_history'),
    ['human', '{question}'],
  ]);

  // Chain
  const llm = openai('gpt-4o');
  const chain = RunnableSequence.from([
    prompt,
    llm,
  ]);

  // Get past history
  const pastMessages = await history.getMessages();

  // Generate response with streaming
  const result = await streamText({
    model: llm,
    prompt: await prompt.formatMessages({
      context,
      chat_history: pastMessages.slice(0, -1),
      question: lastMessage,
    }),
  });

  // Collect response for history
  let fullResponse = '';
  const stream = result.toReadableStream();
  const [streamForResponse, streamForCollection] = stream.tee();

  streamForCollection.pipeTo(
    new WritableStream({
      write(chunk) {
        fullResponse += new TextDecoder().decode(chunk);
      },
      async close() {
        await history.addMessages([new AIMessage(fullResponse)]);
      },
    })
  );

  return new Response(streamForResponse);
};