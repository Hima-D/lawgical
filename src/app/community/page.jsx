"use client";
import { useState } from 'react';
import Footer from '@/components/footer'; // Footer component

const CommunityPage = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);
  const [currentUser, setCurrentUser] = useState({
    name: 'John Doe',
    role: 'Attorney', // Example: Role of the user (can be dynamic)
  });
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Categories for filtering questions
  const categories = ['General Legal Advice', 'Criminal Law', 'Family Law', 'Employment Law'];
  const [selectedCategory, setSelectedCategory] = useState('');

  // Handle adding a new question
  const handlePostQuestion = (e) => {
    e.preventDefault();
    if (newQuestion.trim() === '' || !selectedCategory) return;

    const newQuestionObj = {
      question: newQuestion,
      author: currentUser,
      category: selectedCategory,
      answers: [],
      bestAnswer: null, // Track the best answer
    };

    setQuestions([newQuestionObj, ...questions]);
    setNewQuestion('');
    setSelectedCategory('');
  };

  // Handle adding an answer to a specific question
  const handlePostAnswer = (e) => {
    e.preventDefault();
    if (newAnswer.trim() === '') return;

    const updatedQuestions = [...questions];
    updatedQuestions[selectedQuestionIndex].answers.push({
      answer: newAnswer,
      author: currentUser,
    });
    setQuestions(updatedQuestions);
    setNewAnswer('');
    setSelectedQuestionIndex(null);
  };

  // Handle marking the best answer
  const handleMarkBestAnswer = (questionIndex, answerIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].bestAnswer = answerIndex;
    setQuestions(updatedQuestions);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-6 sm:px-12">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-primary mb-8">
        Legal Community - Q&A
      </h1>

      {/* Select Category */}
      <div className="mb-8 text-center">
        <h2 className="text-xl font-semibold text-primary mb-4">Select a Category</h2>
        <div className="flex justify-center gap-6">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg ${
                selectedCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Post a new question */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold text-primary mb-4">Ask a Legal Question</h2>
        <form onSubmit={handlePostQuestion}>
          <textarea
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            rows="4"
            className="w-full p-4 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-300"
            placeholder="Type your legal question here..."
            required
          />
          <button
            type="submit"
            className="mt-4 px-6 py-2 bg-primary text-white rounded-full shadow-md hover:bg-[#383838] dark:hover:bg-[#ccc] transition duration-300 ease-in-out"
          >
            Post Question
          </button>
        </form>
      </div>

      {/* Display the questions */}
      <div className="space-y-8">
        {questions.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-300">No questions posted yet. Be the first to ask!</p>
        ) : (
          questions
            .filter((question) => (selectedCategory ? question.category === selectedCategory : true))
            .map((question, questionIndex) => (
              <div key={questionIndex} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="flex items-center gap-4">
                  <span className="font-semibold text-primary">{question.author.name}</span>
                  <span className="text-sm text-gray-500">{question.author.role}</span>
                </div>
                <h3 className="text-xl font-semibold text-primary mt-4">{question.question}</h3>
                <p className="text-sm text-gray-500">{question.category}</p>

                <div className="mt-4 space-y-4">
                  {question.answers.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-300">No answers yet. Be the first to answer!</p>
                  ) : (
                    question.answers.map((answer, answerIndex) => (
                      <div key={answerIndex} className="border-t border-gray-200 dark:border-gray-700 pt-4">
                        <div className="flex items-center gap-4">
                          <span className="font-semibold text-primary">{answer.author.name}</span>
                          <span className="text-sm text-gray-500">{answer.author.role}</span>
                        </div>
                        <p className="mt-2 text-gray-900 dark:text-gray-100">{answer.answer}</p>
                        {/* Mark as best answer button */}
                        {question.bestAnswer === answerIndex ? (
                          <p className="text-green-500 mt-2">Best Answer</p>
                        ) : (
                          <button
                            onClick={() => handleMarkBestAnswer(questionIndex, answerIndex)}
                            className="mt-2 text-sm text-primary underline"
                          >
                            Mark as Best Answer
                          </button>
                        )}
                      </div>
                    ))
                  )}
                </div>

                {/* Answering Section */}
                {selectedQuestionIndex === questionIndex ? (
                  <div className="mt-4">
                    <textarea
                      value={newAnswer}
                      onChange={(e) => setNewAnswer(e.target.value)}
                      rows="4"
                      className="w-full p-4 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-300"
                      placeholder="Write your answer here..."
                    />
                    <button
                      onClick={handlePostAnswer}
                      className="mt-4 px-6 py-2 bg-primary text-white rounded-full shadow-md hover:bg-[#383838] dark:hover:bg-[#ccc] transition duration-300 ease-in-out"
                    >
                      Post Answer
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setSelectedQuestionIndex(questionIndex)}
                    className="mt-4 text-primary underline"
                  >
                    Answer this question
                  </button>
                )}
              </div>
            ))
        )}
      </div>

      {/* Include Footer */}
      <Footer />
    </div>
  );
};

export default CommunityPage;
