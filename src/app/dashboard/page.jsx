/** @jsxImportSource @emotion/react */
"use client";
import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabaseclient';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function LegalDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('success');
  const [passwordError, setPasswordError] = useState('');
  const [showSidebar, setShowSidebar] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const fileInputRef = useRef(null);
  
  // Main navigation state
  const [activeTab, setActiveTab] = useState('cases');
  
  // Profile settings
  const [profileData, setProfileData] = useState({
    displayName: '',
    title: '',
    barNumber: '',
    specialization: '',
    experience: '',
    email: '',
    phone: '',
    office: '',
    bio: '',
    avatarUrl: ''
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  
  // Cases management
  const [cases, setCases] = useState([]);
  const [showCaseForm, setShowCaseForm] = useState(false);
  const [caseFormMode, setCaseFormMode] = useState('create');
  const [selectedCase, setSelectedCase] = useState(null);
  const [newCase, setNewCase] = useState({
    title: '',
    caseNumber: '',
    client: '',
    clientContact: '',
    court: '',
    judge: '',
    opposingCounsel: '',
    practiceArea: 'criminal',
    status: 'active',
    priority: 'medium',
    filingDate: '',
    nextHearing: '',
    description: '',
    tags: []
  });
  const [currentTag, setCurrentTag] = useState('');
  const [caseFilter, setCaseFilter] = useState('all');
  const [caseSortBy, setCaseSortBy] = useState('date');
  const [caseView, setCaseView] = useState('list');
  const [caseDetailView, setCaseDetailView] = useState('summary');
  
  // Client management
  const [clients, setClients] = useState([]);
  const [showClientForm, setShowClientForm] = useState(false);
  const [clientFormMode, setClientFormMode] = useState('create');
  const [selectedClient, setSelectedClient] = useState(null);
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    company: '',
    type: 'individual',
    status: 'active',
    retainerAmount: '',
    retainerPaid: false,
    notes: ''
  });
  
  // Documents management
  const [documents, setDocuments] = useState([]);
  const [showDocumentForm, setShowDocumentForm] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [newDocument, setNewDocument] = useState({
    title: '',
    description: '',
    type: 'pleading',
    caseId: '',
    dueDate: '',
    status: 'draft',
    tags: []
  });
  const [documentFilter, setDocumentFilter] = useState('all');
  
  // Time tracking
  const [timeEntries, setTimeEntries] = useState([]);
  const [showTimeEntryForm, setShowTimeEntryForm] = useState(false);
  const [selectedTimeEntry, setSelectedTimeEntry] = useState(null);
  const [newTimeEntry, setNewTimeEntry] = useState({
    caseId: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    hours: '',
    billable: true,
    billed: false,
    rate: '250'
  });
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [activeTimer, setActiveTimer] = useState(null);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  
  // Calendar and deadlines
  const [events, setEvents] = useState([]);
  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: '',
    caseId: '',
    type: 'hearing',
    date: '',
    time: '',
    location: '',
    description: '',
    reminder: '1 day',
    attendees: []
  });
  const [calendarView, setCalendarView] = useState('month');
  const [calendarDate, setCalendarDate] = useState(new Date());
  
  // Research and resources
  const [research, setResearch] = useState([]);
  const [showResearchForm, setShowResearchForm] = useState(false);
  const [selectedResearch, setSelectedResearch] = useState(null);
  const [newResearch, setNewResearch] = useState({
    title: '',
    caseId: '',
    category: 'caselaw',
    content: '',
    source: '',
    tags: []
  });
  
  // Legal forms templates
  const [templates, setTemplates] = useState([]);
  const [showTemplateForm, setShowTemplateForm] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [newTemplate, setNewTemplate] = useState({
    title: '',
    category: 'motion',
    jurisdiction: '',
    content: '',
    tags: []
  });
  
  // Analytics dashboard
  const [showAnalytics, setShowAnalytics] = useState({
    casesByStatus: true,
    casesByPracticeArea: true,
    billingStats: true,
    timeTracking: true,
    upcomingDeadlines: true
  });

  // Statutes and regulations library
  const [statutes, setStatutes] = useState([]);
  const [selectedStatute, setSelectedStatute] = useState(null);
  const [statuteCategories, setStatuteCategories] = useState([]);
  
  const router = useRouter();
  
  // Fetch initial data
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const fetchSession = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          router.push('/login');
          return;
        } else {
          setUser(session.user);
          await Promise.all([
            fetchCases(),
            fetchClients(),
            fetchDocuments(),
            fetchTimeEntries(),
            fetchEvents(),
            fetchResearch(),
            fetchTemplates(),
            fetchStatutes(),
            fetchProfileData(session.user.id),
            fetchStatuteCategories()
          ]);
          setLoading(false);
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

  // Timer effect
  useEffect(() => {
    if (isTimerActive) {
      const interval = setInterval(() => {
        setTimerSeconds(prev => prev + 1);
      }, 1000);
      setTimerInterval(interval);
      return () => clearInterval(interval);
    } else if (timerInterval) {
      clearInterval(timerInterval);
    }
  }, [isTimerActive]);

  // Data fetching functions
  const fetchProfileData = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();
      
      if (error) throw error;
      
      if (data) {
        setProfileData({
          displayName: data.display_name || '',
          title: data.title || '',
          barNumber: data.bar_number || '',
          specialization: data.specialization || '',
          experience: data.experience || '',
          email: data.email || '',
          phone: data.phone || '',
          office: data.office || '',
          bio: data.bio || '',
          avatarUrl: data.avatar_url || ''
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchCases = async () => {
    try {
      const { data, error } = await supabase
        .from('cases')
        .select(`
          *,
          time_entries(id, hours, billable, billed, rate)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Calculate billable hours and unbilled amount
      const processedCases = data.map(caseData => {
        const billableHours = caseData.time_entries
          .filter(entry => entry.billable)
          .reduce((total, entry) => total + parseFloat(entry.hours || 0), 0);
          
        const unbilledAmount = caseData.time_entries
          .filter(entry => entry.billable && !entry.billed)
          .reduce((total, entry) => {
            return total + (parseFloat(entry.hours || 0) * parseFloat(entry.rate || 0));
          }, 0);
          
        // Delete time_entries from case object to avoid duplication
        delete caseData.time_entries;
        
        return {
          ...caseData,
          billableHours,
          unbilledAmount
        };
      });
      
      setCases(processedCases);
    } catch (error) {
      console.error('Error fetching cases:', error);
    }
  };

  const fetchClients = async () => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select(`
          *,
          cases(id)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      const processedClients = data.map(client => {
        const caseIds = client.cases.map(c => c.id);
        delete client.cases;
        
        return {
          ...client,
          caseIds
        };
      });
      
      setClients(processedClients);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const fetchDocuments = async () => {
    try {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setDocuments(data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const fetchTimeEntries = async () => {
    try {
      const { data, error } = await supabase
        .from('time_entries')
        .select(`
          *,
          cases(id, title, case_number)
        `)
        .order('date', { ascending: false });
      
      if (error) throw error;
      
      setTimeEntries(data);
    } catch (error) {
      console.error('Error fetching time entries:', error);
    }
  };

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select(`
          *,
          cases(id, title, case_number)
        `)
        .order('date', { ascending: true });
      
      if (error) throw error;
      
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const fetchResearch = async () => {
    try {
      const { data, error } = await supabase
        .from('research')
        .select(`
          *,
          cases(id, title, case_number)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setResearch(data);
    } catch (error) {
      console.error('Error fetching research:', error);
    }
  };

  const fetchTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .order('title');
      
      if (error) throw error;
      
      setTemplates(data);
    } catch (error) {
      console.error('Error fetching templates:', error);
    }
  };

  const fetchStatutes = async () => {
    try {
      const { data, error } = await supabase
        .from('statutes')
        .select('*')
        .order('title');
      
      if (error) throw error;
      
      setStatutes(data);
    } catch (error) {
      console.error('Error fetching statutes:', error);
    }
  };

  const fetchStatuteCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('statute_categories')
        .select('name')
        .order('name');
      
      if (error) throw error;
      
      setStatuteCategories(data.map(category => category.name));
    } catch (error) {
      console.error('Error fetching statute categories:', error);
    }
  };

  // Search functionality
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    try {
      // Search in cases
      const { data: casesData, error: casesError } = await supabase
        .from('cases')
        .select('id, title, case_number, status')
        .or(`title.ilike.%${searchQuery}%,case_number.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
        
      if (casesError) throw casesError;
      
      // Search in clients
      const { data: clientsData, error: clientsError } = await supabase
        .from('clients')
        .select('id, name, email, company')
        .or(`name.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%,company.ilike.%${searchQuery}%`);
        
          if (clientsError) throw clientsError;
    
          setSearchResults({
            cases: casesData,
            clients: clientsData
          });
        } catch (error) {
          console.error('Error during search:', error);
        } finally {
          setIsSearching(false);
        }
      }};