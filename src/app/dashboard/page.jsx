/** @jsxImportSource @emotion/react */
"use client";
import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabaseclient';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [posts, setPosts] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [activeTab, setActiveTab] = useState('posts');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showSidebar, setShowSidebar] = useState(true);
  
  // Post creation state
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [postCategory, setPostCategory] = useState('general');
  const [postTags, setPostTags] = useState([]);
  const [currentTag, setCurrentTag] = useState('');
  
  // Question creation state
  const [newQuestionTitle, setNewQuestionTitle] = useState('');
  const [newQuestionDetails, setNewQuestionDetails] = useState('');
  const [showNewQuestionForm, setShowNewQuestionForm] = useState(false);
  
  // Profile settings
  const [profileData, setProfileData] = useState({
    displayName: '',
    bio: '',
    location: '',
    website: '',
    avatarUrl: ''
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  
  // Dark mode toggle
  const [darkMode, setDarkMode] = useState(true);
  
  // Search functionality
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  
  // Ref for file input
  const fileInputRef = useRef(null);
  
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const fetchSession = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          router.push('/login');
        } else {
          setUser(session.user);
          fetchPosts();
          fetchQuestions();
          fetchProfileData(session.user.id);
        }
      };

      fetchSession();

      const { data: authListener } = supabase.auth.onAuthStateChange(
        (event, session) => {
          if (event === 'SIGNED_OUT') {
            router.push('/login');
          }
          if (session) {
            setUser(session.user);
          }
        }
      );

      // Check for saved theme preference
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        setDarkMode(savedTheme === 'dark');
      }

      return () => {
        authListener?.remove();
      };
    }
  }, [router]);

  const fetchProfileData = async (userId) => {
    setTimeout(() => {
      setProfileData({
        displayName: 'John Doe',
        bio: 'Full-stack developer passionate about React and modern web technologies.',
        location: 'San Francisco, CA',
        website: 'johndoe.dev',
        avatarUrl: ''
      });
    }, 1000);
  };

  const fetchPosts = async () => {
    const fetchedPosts = [
      { 
        id: 1, 
        title: 'Getting Started with React', 
        content: 'React is a JavaScript library for building user interfaces.',
        date: '2025-03-10', 
        likes: 24,
        category: 'tutorials',
        tags: ['react', 'javascript', 'frontend'],
        comments: []
      },
      { 
        id: 2, 
        title: 'Styling with Emotion', 
        content: 'Emotion is a library for writing CSS with JavaScript.',
        date: '2025-03-12', 
        likes: 18,
        category: 'css',
        tags: ['emotion', 'css-in-js', 'styling'],
        comments: []
      },
      { 
        id: 3, 
        title: 'Authentication with Supabase', 
        content: 'Supabase provides a secure way to implement authentication.',
        date: '2025-03-15', 
        likes: 31,
        category: 'backend',
        tags: ['supabase', 'auth', 'backend'],
        comments: []
      }
    ];
    setPosts(fetchedPosts);
    setLoading(false);
  };

  const fetchQuestions = async () => {
    const fetchedQuestions = [
      {
        id: 1,
        title: 'How do I implement server-side rendering with Next.js?',
        details: 'I\'m trying to improve SEO for my React application.',
        date: '2025-03-13',
        answers: 3,
        views: 128,
        status: 'answered'
      },
      {
        id: 2,
        title: 'Best practices for Supabase RLS policies?',
        details: 'What are some best practices for row-level security policies?',
        date: '2025-03-14',
        answers: 2,
        views: 87,
        status: 'open'
      }
    ];
    setQuestions(fetchedQuestions);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/signin');
  };

  const handlePasswordChange = async () => {
    setPasswordError('');
    if (!newPassword) {
      setPasswordError('Password cannot be empty');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) {
        setPasswordError(error.message);
      } else {
        setNewPassword('');
        setConfirmPassword('');
        setShowPasswordModal(false);
        showNotificationWithTimeout('Password updated successfully!');
      }
    } catch (error) {
      setPasswordError('An error occurred. Please try again.');
    }
  };

  const handleProfileUpdate = () => {
    showNotificationWithTimeout('Profile updated successfully!');
    setIsEditingProfile(false);
  };

  const handleCreatePost = () => {
    if (!newPostTitle || !newPostContent) {
      showNotificationWithTimeout('Please fill in all required fields', 'error');
      return;
    }

    const newPost = {
      id: Date.now(),
      title: newPostTitle,
      content: newPostContent,
      date: new Date().toISOString().split('T')[0],
      likes: 0,
      category: postCategory,
      tags: [...postTags],
      comments: []
    };

    setPosts([newPost, ...posts]);
    setNewPostTitle('');
    setNewPostContent('');
    setPostCategory('general');
    setPostTags([]);
    setShowNewPostForm(false);
    showNotificationWithTimeout('Post published successfully!');
  };

  const handleCreateQuestion = () => {
    if (!newQuestionTitle || !newQuestionDetails) {
      showNotificationWithTimeout('Please fill in all required fields', 'error');
      return;
    }

    const newQuestion = {
      id: Date.now(),
      title: newQuestionTitle,
      details: newQuestionDetails,
      date: new Date().toISOString().split('T')[0],
      answers: 0,
      views: 0,
      status: 'open'
    };

    setQuestions([newQuestion, ...questions]);
    setNewQuestionTitle('');
    setNewQuestionDetails('');
    setShowNewQuestionForm(false);
    showNotificationWithTimeout('Question posted successfully!');
  };

  const handleAddTag = () => {
    if (currentTag && !postTags.includes(currentTag)) {
      setPostTags([...postTags, currentTag]);
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setPostTags(postTags.filter(tag => tag !== tagToRemove));
  };

  const handleDeletePost = (id) => {
    setPosts(posts.filter(post => post.id !== id));
    showNotificationWithTimeout('Post deleted successfully!');
  };

  const handleLikePost = (id) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const handleAvatarUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileData({
        ...profileData,
        avatarUrl: URL.createObjectURL(file)
      });
      showNotificationWithTimeout('Profile picture updated!');
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.length > 2) {  
      setIsSearching(true);
      const postResults = posts.filter(post => 
        post.title.toLowerCase().includes(query.toLowerCase()) || 
        post.content.toLowerCase().includes(query.toLowerCase())
      );
      
      const questionResults = questions.filter(question => 
        question.title.toLowerCase().includes(query.toLowerCase()) || 
        question.details.toLowerCase().includes(query.toLowerCase())
      );
      
      setSearchResults([
        ...postResults.map(p => ({...p, type: 'post'})),
        ...questionResults.map(q => ({...q, type: 'question'}))
      ]);
    } else {
      setIsSearching(false);
      setSearchResults([]);
    }
  };

  const showNotificationWithTimeout = (message, type = 'success') => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('theme', !darkMode ? 'dark' : 'light');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-t-blue-500 border-gray-700 rounded-full animate-spin mb-4 mx-auto"></div>
          <p className="text-gray-300 text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        {/* Sidebar */}
        <motion.aside
          initial={{ width: 0 }}
          animate={{ width: showSidebar ? '250px' : '0' }}
          exit={{ width: '0' }}
          className="bg-gray-800 text-white p-4 transition-width duration-200"
        >
          <div className="flex justify-between items-center mb-6">
            <Image src="/logo.svg" alt="Logo" width={30} height={30} />
            <button onClick={() => setShowSidebar(!showSidebar)} className="text-white">☰</button>
          </div>
          <nav className="flex flex-col">
            <button
              onClick={() => setActiveTab('posts')}
              className={`flex items-center p-3 mb-2 rounded-lg ${activeTab === 'posts' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
            >
              Posts
            </button>
            <button
              onClick={() => setActiveTab('questions')}
              className={`flex items-center p-3 mb-2 rounded-lg ${activeTab === 'questions' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
            >
              Questions
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center p-3 mb-2 rounded-lg ${activeTab === 'settings' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
            >
              Settings
            </button>
          </nav>
        </motion.aside>

        {/* Main content */}
        <div className="flex-1 p-6">
          {/* Notification */}
          {showNotification && (
            <div className="fixed top-0 right-0 mt-6 mr-6 bg-green-500 text-white p-4 rounded-lg shadow-lg">
              {notificationMessage}
            </div>
          )}

          {/* Tab content */}
          {activeTab === 'posts' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Posts</h2>
              <button onClick={() => setShowNewPostForm(true)} className="bg-blue-600 text-white p-2 rounded-lg mb-4">Create Post</button>

              {/* Show post form */}
              {showNewPostForm && (
                <div className="mb-6">
                  <input
                    type="text"
                    className="block w-full mb-2 p-2 border rounded-md"
                    placeholder="Post Title"
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                  />
                  <textarea
                    className="block w-full mb-2 p-2 border rounded-md"
                    placeholder="Post Content"
                    rows="5"
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                  ></textarea>
                  <input
                    type="text"
                    className="block w-full mb-2 p-2 border rounded-md"
                    placeholder="Category (e.g., General, Tutorial, etc.)"
                    value={postCategory}
                    onChange={(e) => setPostCategory(e.target.value)}
                  />
                  <div className="flex mb-2">
                    <input
                      type="text"
                      className="block w-full p-2 border rounded-md"
                      placeholder="Add tag"
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                    />
                    <button
                      className="bg-blue-600 text-white p-2 ml-2 rounded-md"
                      onClick={handleAddTag}
                    >
                      Add Tag
                    </button>
                  </div>
                  <div className="flex flex-wrap mb-2">
                    {postTags.map(tag => (
                      <span
                        key={tag}
                        className="bg-blue-600 text-white p-1 px-2 rounded-full mr-2"
                      >
                        {tag}
                        <button onClick={() => handleRemoveTag(tag)} className="ml-1 text-white">&times;</button>
                      </span>
                    ))}
                  </div>
                  <button onClick={handleCreatePost} className="bg-green-600 text-white p-2 rounded-lg mr-2">Publish</button>
                  <button onClick={() => setShowNewPostForm(false)} className="bg-gray-600 text-white p-2 rounded-lg">Cancel</button>
                </div>
              )}

              {/* Display Posts */}
              <div>
                {posts.map(post => (
                  <div key={post.id} className="mb-4 p-4 border rounded-md">
                    <h3 className="text-xl font-semibold">{post.title}</h3>
                    <p className="text-sm">{post.content}</p>
                    <div className="flex items-center mt-2">
                      <button 
                        onClick={() => handleLikePost(post.id)} 
                        className="bg-blue-600 text-white p-2 rounded-md"
                      >
                        Like ({post.likes})
                      </button>
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="bg-red-600 text-white p-2 rounded-md ml-2"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'questions' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Questions</h2>
              <button onClick={() => setShowNewQuestionForm(true)} className="bg-blue-600 text-white p-2 rounded-lg mb-4">Ask Question</button>

              {showNewQuestionForm && (
                <div className="mb-6">
                  <input
                    type="text"
                    className="block w-full mb-2 p-2 border rounded-md"
                    placeholder="Question Title"
                    value={newQuestionTitle}
                    onChange={(e) => setNewQuestionTitle(e.target.value)}
                  />
                  <textarea
                    className="block w-full mb-2 p-2 border rounded-md"
                    placeholder="Question Details"
                    rows="5"
                    value={newQuestionDetails}
                    onChange={(e) => setNewQuestionDetails(e.target.value)}
                  ></textarea>
                  <button onClick={handleCreateQuestion} className="bg-green-600 text-white p-2 rounded-lg mr-2">Submit</button>
                  <button onClick={() => setShowNewQuestionForm(false)} className="bg-gray-600 text-white p-2 rounded-lg">Cancel</button>
                </div>
              )}

              <div>
                {questions.map(question => (
                  <div key={question.id} className="mb-4 p-4 border rounded-md">
                    <h3 className="text-xl font-semibold">{question.title}</h3>
                    <p className="text-sm">{question.details}</p>
                    <div className="flex items-center mt-2">
                      <button className="bg-blue-600 text-white p-2 rounded-md">
                        Answer ({question.answers})
                      </button>
                      <button className="ml-2 bg-gray-600 text-white p-2 rounded-md">
                        View ({question.views})
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Settings</h2>
              <button 
                onClick={() => setShowPasswordModal(true)} 
                className="bg-blue-600 text-white p-2 rounded-lg mb-4"
              >
                Change Password
              </button>
              <button 
                onClick={() => setIsEditingProfile(true)} 
                className="bg-blue-600 text-white p-2 rounded-lg mb-4"
              >
                Edit Profile
              </button>
              <button onClick={toggleDarkMode} className="bg-blue-600 text-white p-2 rounded-lg">
                {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
