import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/router';
import { Edit, Trash2, Plus, X, Save, LogOut, Search } from 'lucide-react';

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: '', content: '', category: 'General' });
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [activeTab, setActiveTab] = useState('blogs');
  const [stats, setStats] = useState({ total: 0, published: 0, draft: 0 });
  const [notification, setNotification] = useState(null);
  const router = useRouter();

  // Fetch blogs and calculate statistics when component mounts
  useEffect(() => {
    fetchBlogs();
  }, []);

  // Filter blogs when search term changes
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredBlogs(blogs);
    } else {
      setFilteredBlogs(
        blogs.filter(
          blog => 
            blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.category?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, blogs]);

  // Fetch blogs from the database
  const fetchBlogs = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      showNotification('Error fetching blogs: ' + error.message, 'error');
    } else {
      setBlogs(data);
      setFilteredBlogs(data);
      
      // Calculate stats
      setStats({
        total: data.length,
        published: data.filter(blog => blog.status === 'published').length,
        draft: data.filter(blog => blog.status === 'draft').length
      });
    }
    setLoading(false);
  };

  // Create a new blog
  const handleAddBlog = async (e) => {
    e.preventDefault();
    if (!newBlog.title || !newBlog.content) {
      showNotification('Title and content are required', 'error');
      return;
    }
    
    setLoading(true);
    const { data, error } = await supabase.from('blogs').insert([
      { 
        title: newBlog.title, 
        content: newBlog.content,
        category: newBlog.category || 'General',
        status: 'draft',
        created_at: new Date().toISOString()
      }
    ]).select();
    
    if (error) {
      showNotification('Error adding blog: ' + error.message, 'error');
    } else {
      setBlogs([data[0], ...blogs]);
      setNewBlog({ title: '', content: '', category: 'General' });
      showNotification('Blog post created successfully!', 'success');
    }
    setLoading(false);
  };

  // Start editing a blog
  const startEditingBlog = (blog) => {
    setEditingBlog({ ...blog });
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingBlog(null);
  };

  // Save edited blog
  const handleSaveEdit = async () => {
    if (!editingBlog.title || !editingBlog.content) {
      showNotification('Title and content are required', 'error');
      return;
    }
    
    setLoading(true);
    const { data, error } = await supabase
      .from('blogs')
      .update({ 
        title: editingBlog.title, 
        content: editingBlog.content,
        category: editingBlog.category || 'General',
        updated_at: new Date().toISOString()
      })
      .eq('id', editingBlog.id)
      .select();
      
    if (error) {
      showNotification('Error updating blog: ' + error.message, 'error');
    } else {
      setBlogs(
        blogs.map(blog => blog.id === editingBlog.id ? data[0] : blog)
      );
      setEditingBlog(null);
      showNotification('Blog updated successfully!', 'success');
    }
    setLoading(false);
  };

  // Change blog status (publish/unpublish)
  const toggleBlogStatus = async (blog) => {
    const newStatus = blog.status === 'published' ? 'draft' : 'published';
    
    const { error } = await supabase
      .from('blogs')
      .update({ status: newStatus })
      .eq('id', blog.id);
      
    if (error) {
      showNotification('Error changing status: ' + error.message, 'error');
    } else {
      setBlogs(
        blogs.map(b => b.id === blog.id ? { ...b, status: newStatus } : b)
      );
      showNotification(`Blog ${newStatus === 'published' ? 'published' : 'unpublished'} successfully!`, 'success');
    }
  };

  // Delete a blog
  const handleDeleteBlog = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;
    
    const { error } = await supabase.from('blogs').delete().eq('id', id);
    if (error) {
      showNotification('Error deleting blog: ' + error.message, 'error');
    } else {
      setBlogs(blogs.filter(blog => blog.id !== id));
      showNotification('Blog deleted successfully!', 'success');
    }
  };

  // Handle logout
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      showNotification('Error signing out: ' + error.message, 'error');
    } else {
      router.push('/login');
    }
  };

  // Display notification
  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-indigo-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Blog Admin Dashboard</h1>
          <button 
            onClick={handleLogout} 
            className="flex items-center bg-indigo-700 hover:bg-indigo-800 px-4 py-2 rounded-md"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto p-4">
        {/* Notification */}
        {notification && (
          <div className={`mb-4 p-3 rounded-md ${
            notification.type === 'error' ? 'bg-red-100 text-red-700' : 
            notification.type === 'success' ? 'bg-green-100 text-green-700' : 
            'bg-blue-100 text-blue-700'
          }`}>
            {notification.message}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold text-gray-700">Total Posts</h3>
            <p className="text-3xl font-bold text-indigo-600">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold text-gray-700">Published</h3>
            <p className="text-3xl font-bold text-green-600">{stats.published}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold text-gray-700">Drafts</h3>
            <p className="text-3xl font-bold text-yellow-600">{stats.draft}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex space-x-4">
            <button 
              onClick={() => setActiveTab('blogs')}
              className={`px-4 py-2 font-medium ${activeTab === 'blogs' 
                ? 'border-b-2 border-indigo-500 text-indigo-600' 
                : 'text-gray-500 hover:text-gray-700'}`}
            >
              Manage Blogs
            </button>
            <button 
              onClick={() => setActiveTab('create')}
              className={`px-4 py-2 font-medium ${activeTab === 'create' 
                ? 'border-b-2 border-indigo-500 text-indigo-600' 
                : 'text-gray-500 hover:text-gray-700'}`}
            >
              Create New Post
            </button>
          </nav>
        </div>

        {/* Create New Blog Form */}
        {activeTab === 'create' && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Create New Blog Post</h2>
            <form onSubmit={handleAddBlog}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="title">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={newBlog.title}
                  onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                  placeholder="Enter blog title"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="category">
                  Category
                </label>
                <select
                  id="category"
                  value={newBlog.category}
                  onChange={(e) => setNewBlog({ ...newBlog, category: e.target.value })}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="General">General</option>
                  <option value="Technology">Technology</option>
                  <option value="Business">Business</option>
                  <option value="Health">Health</option>
                  <option value="Travel">Travel</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="content">
                  Content
                </label>
                <textarea
                  id="content"
                  value={newBlog.content}
                  onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                  placeholder="Write your blog content here..."
                  className="w-full px-4 py-2 border rounded-md h-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md flex items-center justify-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                {loading ? 'Creating...' : 'Create Blog Post'}
              </button>
            </form>
          </div>
        )}

        {/* Manage Blogs */}
        {activeTab === 'blogs' && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3" />
                <input
                  type="text"
                  placeholder="Search blogs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {loading && <div className="p-4 text-center text-gray-500">Loading blogs...</div>}
            
            {!loading && filteredBlogs.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No blog posts found.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredBlogs.map((blog) => (
                      <tr key={blog.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {blog.title}
                          </div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">
                            {blog.content.substring(0, 60)}...
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                            {blog.category || 'General'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button 
                            onClick={() => toggleBlogStatus(blog)}
                            className={`px-2 py-1 text-xs rounded-full ${
                              blog.status === 'published' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {blog.status === 'published' ? 'Published' : 'Draft'}
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(blog.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => startEditingBlog(blog)}
                            className="text-indigo-600 hover:text-indigo-900 mr-3"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteBlog(blog.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Edit Blog Modal */}
      {editingBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-3xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Edit Blog Post</h2>
              <button 
                onClick={cancelEditing}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="edit-title">
                Title
              </label>
              <input
                id="edit-title"
                type="text"
                value={editingBlog.title}
                onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="edit-category">
                Category
              </label>
              <select
                id="edit-category"
                value={editingBlog.category || 'General'}
                onChange={(e) => setEditingBlog({ ...editingBlog, category: e.target.value })}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="General">General</option>
                <option value="Technology">Technology</option>
                <option value="Business">Business</option>
                <option value="Health">Health</option>
                <option value="Travel">Travel</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="edit-content">
                Content
              </label>
              <textarea
                id="edit-content"
                value={editingBlog.content}
                onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })}
                className="w-full px-4 py-2 border rounded-md h-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelEditing}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center"
              >
                <Save className="w-4 h-4 mr-2" />
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;