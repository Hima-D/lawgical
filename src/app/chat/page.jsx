'use client';
import { useChat } from '@ai-sdk/react';
import { useState, useRef, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  Shield, 
  Clock, 
  CheckCircle,
  ArrowLeft,
  Sparkles,
  FileText,
  Users,
  Zap
} from 'lucide-react';

// Professional UI Components
const Button = ({ children, variant = "default", size = "default", className = "", ...props }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";
  
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
  };
  
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 px-3 rounded-md",
    lg: "h-12 px-8 text-lg",
  };
  
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className = "", ...props }) => (
  <div className={`rounded-lg border bg-white text-card-foreground shadow-sm ${className}`} {...props}>
    {children}
  </div>
);

const Badge = ({ children, variant = "default", className = "" }) => {
  const variants = {
    default: "bg-blue-100 text-blue-800",
    secondary: "bg-gray-100 text-gray-800",
    success: "bg-green-100 text-green-800",
  };
  
  return (
    <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
};

const STARTER_PROMPTS = [
  {
    icon: FileText,
    title: "Draft a Legal Document",
    subtitle: "Help me create contracts, agreements, or legal letters",
    prompt: "I need help drafting a legal document. Can you guide me through the process?"
  },
  {
    icon: Users,
    title: "Legal Consultation",
    subtitle: "Get advice on legal matters and potential strategies",
    prompt: "I have a legal question and need professional guidance. Can you help?"
  },
  {
    icon: Shield,
    title: "Case Analysis",
    subtitle: "Analyze legal situations and understand your options",
    prompt: "I need help analyzing my legal case and understanding my options."
  },
  {
    icon: MessageCircle,
    title: "Legal Research",
    subtitle: "Research laws, regulations, and legal precedents",
    prompt: "I need assistance with legal research on a specific topic."
  }
];

export default function Chat() {
  const [input, setInput] = useState('');
  const { messages, sendMessage, isLoading } = useChat();
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      sendMessage({ text: input.trim() });
      setInput('');
    }
  };

  const handleStarterPrompt = (prompt) => {
    if (!isLoading) {
      setInput(prompt);
      sendMessage({ text: prompt });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">
      {/* Professional Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-800 transition-colors">
                <ArrowLeft className="h-6 w-6" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-10 h-10 rounded-xl flex items-center justify-center">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Legal AI Assistant</h1>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-500">Online & Ready to Help</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="success" className="hidden sm:inline-flex">
                <Shield className="h-3 w-3 mr-1" />
                Secure & Confidential
              </Badge>
              <Button variant="outline" size="sm">
                <Phone className="h-4 w-4 mr-2" />
                Call Expert
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Interface */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden" style={{ height: 'calc(100vh - 200px)' }}>
          
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6" style={{ height: 'calc(100% - 100px)' }}>
            {messages.length === 0 && (
              <div className="text-center py-12">
                {/* Welcome Section */}
                <div className="mb-8">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Sparkles className="h-10 w-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Welcome to Your Legal AI Assistant
                  </h2>
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                    Get instant legal guidance, document drafting help, and expert consultation. 
                    Our AI is trained on extensive legal knowledge to assist you professionally.
                  </p>
                </div>

                {/* Features */}
                <div className="grid md:grid-cols-3 gap-4 mb-8 max-w-3xl mx-auto">
                  <Card className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
                    <Zap className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-900 mb-1">Instant Responses</h4>
                    <p className="text-sm text-gray-600">Get immediate legal guidance 24/7</p>
                  </Card>
                  <Card className="p-4 bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200">
                    <Shield className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-900 mb-1">Confidential</h4>
                    <p className="text-sm text-gray-600">Your conversations are private</p>
                  </Card>
                  <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-900 mb-1">Expert Knowledge</h4>
                    <p className="text-sm text-gray-600">Trained on legal expertise</p>
                  </Card>
                </div>

                {/* Starter Prompts */}
                <div className="max-w-4xl mx-auto">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">How can I help you today?</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {STARTER_PROMPTS.map((item, index) => (
                      <Card 
                        key={index} 
                        className="p-6 cursor-pointer hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-blue-300 group"
                        onClick={() => handleStarterPrompt(item.prompt)}
                      >
                        <div className="flex items-start space-x-4">
                          <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <item.icon className="h-6 w-6 text-white" />
                          </div>
                          <div className="text-left">
                            <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                            <p className="text-sm text-gray-600">{item.subtitle}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Messages */}
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-6`}
              >
                <div className={`flex max-w-3xl ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  {/* Avatar */}
                  <div className={`flex-shrink-0 ${message.role === 'user' ? 'ml-4' : 'mr-4'}`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      message.role === 'user' 
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600' 
                        : 'bg-gradient-to-r from-purple-500 to-pink-600'
                    }`}>
                      {message.role === 'user' ? (
                        <User className="h-5 w-5 text-white" />
                      ) : (
                        <Bot className="h-5 w-5 text-white" />
                      )}
                    </div>
                  </div>

                  {/* Message Content */}
                  <div className={`rounded-2xl px-6 py-4 max-w-2xl ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                      : 'bg-gray-50 text-gray-900 border border-gray-200'
                  }`}>
                    {message.parts.map((part, i) => {
                      switch (part.type) {
                        case 'text':
                          return (
                            <div key={`${message.id}-${i}`} className="whitespace-pre-wrap leading-relaxed">
                              {part.text}
                            </div>
                          );
                        default:
                          return null;
                      }
                    })}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex justify-start mb-6">
                <div className="flex">
                  <div className="mr-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <div className="border-t border-gray-200 p-6 bg-white">
            <form onSubmit={handleSubmit} className="flex space-x-4">
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything about legal matters..."
                  disabled={isLoading}
                  className="w-full px-6 py-4 border border-gray-300 rounded-xl 
                           bg-white text-gray-900 placeholder-gray-500
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           disabled:opacity-50 disabled:cursor-not-allowed
                           text-lg"
                />
              </div>
              <Button
                type="submit"
                disabled={!input.trim() || isLoading}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 rounded-xl shadow-lg transform hover:scale-105 transition-all"
              >
                {isLoading ? (
                  <Clock className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-2" />
                    Send
                  </>
                )}
              </Button>
            </form>
            
            {/* Footer Note */}
            <div className="text-center mt-4">
              <p className="text-sm text-gray-500">
                This AI provides general legal information and should not replace professional legal advice.
                For complex matters, consult with a qualified attorney.
              </p>
            </div>
          </div>
        </div>
        
        {/* Quick Contact */}
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 w-12 h-12 rounded-xl flex items-center justify-center">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Need Immediate Help?</h3>
                <p className="text-blue-600 font-bold">+91 8383801899</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-12 h-12 rounded-xl flex items-center justify-center">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Email Consultation</h3>
                <p className="text-purple-600 font-bold">support@lawgical.tech</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}