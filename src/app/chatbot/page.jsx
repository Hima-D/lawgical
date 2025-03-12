"use client";
import { useState } from 'react';
import axios from 'axios';
import Header from '@/components/header';  // Assuming you have a Header component
import Footer from '@/components/footer';  // Assuming you have a Footer component

const Chatbot = () => {
  const [inputText, setInputText] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  // Handle input changes
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  // Handle file upload (only when user selects a file)
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle sending messages
  const handleSendMessage = async () => {
    if (!inputText.trim() && !file) return;  // Don't submit if there's no text or file

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('text', inputText);

      // Append the file only if it is selected
      if (file) {
        formData.append('file', file);
      }

      // Make the POST request to the API
      const { data } = await axios.post('/api/chatbot', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Add the user's message and the chatbot's response to chat history
      setChatHistory((prev) => [
        ...prev,
        { sender: 'user', text: inputText || 'Document uploaded' },
        { sender: 'bot', text: data.result },
      ]);

      // Clear the input text and file after submission
      setInputText('');
      setFile(null);
    } catch (error) {
      console.error('Error sending message:', error);
      setChatHistory((prev) => [
        ...prev,
        { sender: 'bot', text: 'Oops! Something went wrong. Please try again later.' },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Header */}
      <Header />

      {/* Upper Section with Details */}
      <div className="bg-gradient-to-r from-gray-800 to-black p-8 text-center">
        <h1 className="text-3xl font-semibold">Chat with the Bot</h1>
        <p className="mt-2 text-lg">Ask me anything, or upload a document for assistance</p>
      </div>

      <div className="flex-grow flex flex-col justify-between p-6">
        {/* Chat History */}
        <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-white rounded-lg shadow-md">
          {chatHistory.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg text-sm shadow-lg transition-all ${
                  msg.sender === 'user'
                    ? 'bg-blue-500 text-white transform scale-100 hover:scale-105'
                    : 'bg-gray-700 text-white transform scale-100 hover:scale-105'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input Area with File Upload */}
        <div className="flex items-center border-t border-gray-700 pt-4 mt-4">
          <div className="flex-grow flex items-center space-x-3">
            <input
              type="text"
              value={inputText}
              onChange={handleInputChange}
              placeholder="Ask me something..."
              className="w-full p-4 rounded-lg border border-gray-600 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {/* File Upload */}
            <label htmlFor="file-upload" className="cursor-pointer">
              <svg className="w-6 h-6 text-gray-400 hover:text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 10l3 3m0 0l3-3m-3 3v12m12-12H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V10a2 2 0 00-2-2z" />
              </svg>
            </label>
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>

        {/* Button Section with Floating Send Button */}
        <div className="mt-4 flex justify-center items-center">
          <button
            onClick={handleSendMessage}
            disabled={loading || (!inputText.trim() && !file)}  // Disable button if no input or file
            className={`p-4 rounded-full bg-blue-500 text-white disabled:bg-blue-300 focus:outline-none hover:bg-blue-600 transition-all transform ${loading ? 'scale-90' : 'scale-100'} hover:scale-105`}
          >
            {loading ? (
              <div className="w-5 h-5 animate-spin border-4 border-t-4 border-white rounded-full"></div>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 19l7-7-7-7" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Chatbot;
