// const { MongoClient } = require('mongodb');
// const { RecursiveCharacterTextSplitter } = require('langchain/text_splitter');
// const { OpenAIEmbeddings } = require('@langchain/openai');
// const { MongoDBAtlasVectorSearch } = require('@langchain/community/vectorstores/mongodb_atlas');
// const pdfParse = require('pdf-parse');

// let client;
// async function getMongoClient() {
//   if (!client) {
//     client = new MongoClient(process.env.MONGODB_URI);
//     await client.connect();
//   }
//   return client;
// }

// exports.POST = async function (req) {
//   const formData = await req.formData();
//   const file = formData.get('file');
//   const sessionId = formData.get('sessionId');

//   if (!file) {
//     return new Response('No file provided', { status: 400 });
//   }

//   const buffer = Buffer.from(await file.arrayBuffer());

//   // Extract text from PDF
//   let docs;
//   try {
//     const pdfData = await pdfParse(buffer);
//     docs = [{ pageContent: pdfData.text, metadata: { sessionId } }];
//   } catch (error) {
//     console.error('Error parsing PDF:', error);
//     return new Response('Failed to parse PDF', { status: 500 });
//   }

//   // Split documents
//   const splitter = new RecursiveCharacterTextSplitter({
//     chunkSize: 1000,
//     chunkOverlap: 200,
//   });
//   const splitDocs = await splitter.splitDocuments(docs);

//   // Add metadata
//   const docsWithMetadata = splitDocs.map((doc) => ({
//     ...doc,
//     metadata: { ...doc.metadata, sessionId },
//   }));

//   // Embed and store
//   const mongoClient = await getMongoClient();
//   const vectorCollection = mongoClient.db('ai_chat').collection('vectors');

//   const embeddings = new OpenAIEmbeddings();
//   await MongoDBAtlasVectorSearch.fromDocuments(
//     docsWithMetadata,
//     embeddings,
//     {
//       collection: vectorCollection,
//       indexName: 'default',
//       textKey: 'text',
//       embeddingKey: 'embedding',
//     }
//   );

//   return new Response(JSON.stringify({ success: true }), { status: 200 });
// };