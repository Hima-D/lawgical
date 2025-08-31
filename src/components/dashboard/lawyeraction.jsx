import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Plus, 
  Calendar, 
  FileText, 
  MessageSquare, 
  Clock,
  Users,
  CheckCircle,
  AlertCircle,
  Bell,
  Settings,
  RotateCcw,
  TrendingUp,
  Eye,
  Download,
  Video,
  MapPin,
  User,
  Phone,
  Mail,
  ChevronDown,
  Star,
  Filter,
  Search
} from "lucide-react";

// Client-only Appointment Booking Form
const ClientAppointmentBookingForm = ({ 
  selectedLawyer, 
  selectedService, 
  onBookingSuccess,
  onClose 
}) => {
  const [formData, setFormData] = useState({
    appointmentDate: '',
    appointmentTime: '',
    clientNotes: '',
    meetingType: 'virtual',
    availabilitySlotId: null
  });
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (selectedLawyer && formData.appointmentDate) {
      loadAvailableSlots();
    }
  }, [selectedLawyer, formData.appointmentDate]);

  const loadAvailableSlots = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/client/lawyers/${selectedLawyer.id}/availability?date=${formData.appointmentDate}`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('clientToken')}`,
            'X-User-Type': 'client'
          }
        }
      );
      const data = await response.json();
      setAvailableSlots(data.slots || []);
    } catch (err) {
      console.error('Failed to load slots:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setError('');
  };

  const handleTimeSlotSelect = (slot) => {
    setFormData(prev => ({
      ...prev,
      appointmentTime: slot.time,
      availabilitySlotId: slot.id
    }));
  };

  const validateForm = () => {
    if (!formData.appointmentDate || !formData.appointmentTime) {
      setError('Please select both date and time');
      return false;
    }

    const appointmentDateTime = new Date(`${formData.appointmentDate}T${formData.appointmentTime}`);
    if (appointmentDateTime <= new Date()) {
      setError('Appointment must be scheduled for a future date and time');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/client/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('clientToken')}`,
          'X-User-Type': 'client'
        },
        body: JSON.stringify({
          lawyerProfileId: selectedLawyer.id,
          serviceId: selectedService.id,
          ...formData
        })
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        onBookingSuccess?.(data.appointment);
        onClose?.();
      }
    } catch (err) {
      setError('Failed to book appointment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateDateOptions = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push({
          value: date.toISOString().split('T')[0],
          label: date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'short', 
            day: 'numeric' 
          })
        });
      }
    }
    
    return dates;
  };

  return (
    <div className="space-y-6">
      <div className="bg-muted/50 p-4 rounded-lg">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <User className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">{selectedLawyer?.user?.displayName}</h3>
            <p className="text-sm text-muted-foreground">{selectedService?.name}</p>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {selectedService?.duration} min
              </span>
              <span className="flex items-center gap-1">
                <span className="text-green-600 font-medium">₹{selectedService?.price}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Select Date</label>
          <select
            value={formData.appointmentDate}
            onChange={(e) => handleInputChange('appointmentDate', e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            required
          >
            <option value="">Choose a date</option>
            {generateDateOptions().map(date => (
              <option key={date.value} value={date.value}>
                {date.label}
              </option>
            ))}
          </select>
        </div>

        {formData.appointmentDate && (
          <div>
            <label className="block text-sm font-medium mb-2">Select Time</label>
            {isLoading ? (
              <div className="grid grid-cols-3 gap-2">
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} className="h-10 bg-muted rounded animate-pulse"></div>
                ))}
              </div>
            ) : availableSlots.length > 0 ? (
              <div className="grid grid-cols-3 gap-2">
                {availableSlots.map(slot => (
                  <Button
                    key={slot.id}
                    type="button"
                    variant={formData.appointmentTime === slot.time ? "default" : "outline"}
                    className="h-10"
                    onClick={() => handleTimeSlotSelect(slot)}
                    disabled={slot.isBooked}
                  >
                    {slot.time}
                  </Button>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No available slots for this date</p>
              </div>
            )}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-2">Meeting Type</label>
          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant={formData.meetingType === 'virtual' ? "default" : "outline"}
              className="flex items-center gap-2"
              onClick={() => handleInputChange('meetingType', 'virtual')}
            >
              <Video className="h-4 w-4" />
              Virtual
            </Button>
            <Button
              type="button"
              variant={formData.meetingType === 'in_person' ? "default" : "outline"}
              className="flex items-center gap-2"
              onClick={() => handleInputChange('meetingType', 'in_person')}
            >
              <MapPin className="h-4 w-4" />
              In Person
            </Button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Additional Notes (Optional)
          </label>
          <textarea
            value={formData.clientNotes}
            onChange={(e) => handleInputChange('clientNotes', e.target.value)}
            placeholder="Describe your legal matter or any specific requirements..."
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            rows={3}
            maxLength={500}
          />
          <p className="text-xs text-muted-foreground mt-1">
            {formData.clientNotes.length}/500 characters
          </p>
        </div>

        <Button 
          type="submit" 
          className="w-full" 
          disabled={isSubmitting || !formData.appointmentDate || !formData.appointmentTime}
        >
          {isSubmitting ? (
            <>
              <RotateCcw className="h-4 w-4 mr-2 animate-spin" />
              Booking...
            </>
          ) : (
            <>
              <CheckCircle className="h-4 w-4 mr-2" />
              Book Appointment
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

// Client Appointment List (Read-only with booking options)
const ClientAppointmentList = ({ refreshTrigger }) => {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadAppointments();
  }, [filter, refreshTrigger]);

  const loadAppointments = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        ...(filter !== 'all' && { status: filter })
      });
      
      const response = await fetch(`/api/client/appointments?${params}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('clientToken')}`,
          'X-User-Type': 'client'
        }
      });
      const data = await response.json();
      
      setAppointments(data.appointments || []);
    } catch (err) {
      console.error('Failed to load appointments:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    if (!confirm('Are you sure you want to cancel this appointment?')) return;
    
    try {
      const response = await fetch(`/api/client/appointments/${appointmentId}/cancel`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('clientToken')}`,
          'X-User-Type': 'client'
        }
      });

      if (response.ok) {
        loadAppointments();
      }
    } catch (err) {
      console.error('Failed to cancel appointment:', err);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const canCancelAppointment = (appointment) => {
    const appointmentDateTime = new Date(`${appointment.appointmentDate}T${appointment.appointmentTime}`);
    const hoursUntilAppointment = (appointmentDateTime - new Date()) / (1000 * 60 * 60);
    return appointment.status === 'pending' || 
           (appointment.status === 'confirmed' && hoursUntilAppointment > 24);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 border-b">
        {['all', 'pending', 'confirmed', 'completed'].map(status => (
          <Button
            key={status}
            variant={filter === status ? "default" : "ghost"}
            size="sm"
            onClick={() => setFilter(status)}
            className="capitalize"
          >
            {status}
          </Button>
        ))}
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1,2,3].map(i => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4 animate-pulse"></div>
                  <div className="h-3 bg-muted rounded w-1/2 animate-pulse"></div>
                  <div className="h-3 bg-muted rounded w-2/3 animate-pulse"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : appointments.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              {filter === 'all' ? 'No appointments found' : `No ${filter} appointments`}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Book your first appointment to get started
            </p>
          </CardContent>
        </Card>
      ) : (
        appointments.map(appointment => (
          <Card key={appointment.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">
                      {appointment.lawyerProfile?.user?.displayName}
                    </h3>
                    <Badge className={getStatusColor(appointment.status)}>
                      {appointment.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {appointment.service?.name}
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{formatDate(appointment.appointmentDate)} at {appointment.appointmentTime}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  {appointment.meetingType === 'virtual' ? (
                    <Video className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className="capitalize">{appointment.meetingType} meeting</span>
                </div>

                {appointment.clientNotes && (
                  <div className="flex items-start gap-2">
                    <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <span className="text-muted-foreground italic">
                      "{appointment.clientNotes}"
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-2 text-green-600 font-medium">
                  <span>₹{appointment.service?.price}</span>
                </div>
              </div>

              {/* Client-specific actions */}
              <div className="flex gap-2 mt-4">
                {appointment.status === 'confirmed' && (
                  <Button size="sm" variant="outline" className="flex-1">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Message Lawyer
                  </Button>
                )}
                
                {canCancelAppointment(appointment) && (
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => cancelAppointment(appointment.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

// Lawyer Appointment List (Full management capabilities)
const LawyerAppointmentList = ({ refreshTrigger }) => {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  useEffect(() => {
    loadAppointments();
  }, [filter, dateFilter, refreshTrigger]);

  const loadAppointments = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        ...(filter !== 'all' && { status: filter }),
        ...(dateFilter !== 'all' && { dateFilter })
      });
      
      const response = await fetch(`/api/lawyer/appointments?${params}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('lawyerToken')}`,
          'X-User-Type': 'lawyer'
        }
      });
      const data = await response.json();
      
      setAppointments(data.appointments || []);
    } catch (err) {
      console.error('Failed to load appointments:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateAppointmentStatus = async (appointmentId, newStatus, notes = '') => {
    try {
      const response = await fetch(`/api/lawyer/appointments/${appointmentId}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('lawyerToken')}`,
          'X-User-Type': 'lawyer'
        },
        body: JSON.stringify({ status: newStatus, lawyerNotes: notes })
      });

      if (response.ok) {
        loadAppointments();
      }
    } catch (err) {
      console.error('Failed to update appointment:', err);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-4">
      {/* Enhanced Filters for Lawyers */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex gap-2 border-b sm:border-b-0 pb-2 sm:pb-0">
          {['all', 'pending', 'confirmed', 'completed'].map(status => (
            <Button
              key={status}
              variant={filter === status ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilter(status)}
              className="capitalize"
            >
              {status}
            </Button>
          ))}
        </div>
        
        <div className="flex gap-2">
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-3 py-1 border rounded text-sm"
          >
            <option value="all">All dates</option>
            <option value="today">Today</option>
            <option value="tomorrow">Tomorrow</option>
            <option value="this_week">This week</option>
            <option value="next_week">Next week</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1,2,3].map(i => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4 animate-pulse"></div>
                  <div className="h-3 bg-muted rounded w-1/2 animate-pulse"></div>
                  <div className="h-3 bg-muted rounded w-2/3 animate-pulse"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : appointments.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              {filter === 'all' ? 'No appointments found' : `No ${filter} appointments`}
            </p>
          </CardContent>
        </Card>
      ) : (
        appointments.map(appointment => (
          <Card key={appointment.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">
                      {appointment.client?.displayName || appointment.client?.email}
                    </h3>
                    <Badge className={getStatusColor(appointment.status)}>
                      {appointment.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {appointment.service?.name}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-green-600">
                    ₹{appointment.service?.price}
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{formatDate(appointment.appointmentDate)} at {appointment.appointmentTime}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  {appointment.meetingType === 'virtual' ? (
                    <Video className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className="capitalize">{appointment.meetingType} meeting</span>
                </div>

                {appointment.clientNotes && (
                  <div className="flex items-start gap-2">
                    <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <span className="text-muted-foreground italic">
                      "{appointment.clientNotes}"
                    </span>
                  </div>
                )}

                {/* Client contact info for lawyers */}
                <div className="flex items-center gap-4 text-muted-foreground">
                  {appointment.client?.email && (
                    <div className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      <span className="text-xs">{appointment.client.email}</span>
                    </div>
                  )}
                  {appointment.client?.phoneNumber && (
                    <div className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      <span className="text-xs">{appointment.client.phoneNumber}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Lawyer-specific action buttons */}
              <div className="mt-4">
                {appointment.status === 'pending' && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => updateAppointmentStatus(appointment.id, 'confirmed')}
                      className="flex-1"
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Confirm
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                      className="flex-1 text-red-600 hover:text-red-700"
                    >
                      <AlertCircle className="h-4 w-4 mr-1" />
                      Decline
                    </Button>
                  </div>
                )}

                {appointment.status === 'confirmed' && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
                      className="flex-1"
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Mark Complete
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        window.open(`mailto:${appointment.client?.email}`, '_blank');
                      }}
                    >
                      <Mail className="h-4 w-4 mr-1" />
                      Email
                    </Button>
                  </div>
                )}

                {appointment.status === 'completed' && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        console.log('Generate invoice for:', appointment.id);
                      }}
                    >
                      <FileText className="h-4 w-4 mr-1" />
                      Generate Invoice
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

// Client-only Lawyer Selection Component
const ClientLawyerSelection = ({ onSelectLawyer, onBack }) => {
  const [lawyers, setLawyers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadLawyers();
  }, []);

  const loadLawyers = async () => {
    try {
      const response = await fetch('/api/client/lawyers', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('clientToken')}`,
          'X-User-Type': 'client'
        }
      });
      const data = await response.json();
      setLawyers(data.lawyers || []);
    } catch (err) {
      console.error('Failed to load lawyers:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const categories = ['all', 'family', 'criminal', 'corporate', 'property', 'other'];

  const filteredLawyers = lawyers.filter(lawyer => {
    const matchesCategory = selectedCategory === 'all' || 
      lawyer.specializations?.some(spec => 
        spec.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    
    const matchesSearch = searchQuery === '' ||
      lawyer.user?.displayName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lawyer.specializations?.some(spec => 
        spec.toLowerCase().includes(searchQuery.toLowerCase())
      );
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Select a Lawyer</h2>
        {onBack && (
          <Button variant="ghost" size="sm" onClick={onBack}>
            ← Back
          </Button>
        )}
      </div>

      {/* Search and Filter */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search lawyers by name or specialization..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="capitalize"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1,2,3,4].map(i => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="h-4 bg-muted rounded w-3/4 animate-pulse"></div>
                  <div className="h-3 bg-muted rounded w-full animate-pulse"></div>
                  <div className="h-3 bg-muted rounded w-1/2 animate-pulse"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredLawyers.map(lawyer => (
            <Card key={lawyer.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4" onClick={() => onSelectLawyer(lawyer)}>
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{lawyer.user?.displayName}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {lawyer.experience} years experience
                    </p>
                    {lawyer.rating && (
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{lawyer.rating}</span>
                        <span className="text-xs text-muted-foreground">
                          ({lawyer.reviewCount} reviews)
                        </span>
                      </div>
                    )}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {lawyer.specializations?.slice(0, 2).map(spec => (
                        <Badge key={spec} variant="secondary" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                      {lawyer.specializations?.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{lawyer.specializations.length - 2}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-green-600 font-medium">
                        From ₹{Math.min(...(lawyer.services?.map(s => s.price) || [0]))}
                      </span>
                      <Button size="sm">
                        Select
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

// Client-only Service Selection Component
const ClientServiceSelection = ({ selectedLawyer, onSelectService, onBack }) => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (selectedLawyer) {
      loadServices();
    }
  }, [selectedLawyer]);

  const loadServices = async () => {
    try {
      const response = await fetch(`/api/client/lawyers/${selectedLawyer.id}/services`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('clientToken')}`,
          'X-User-Type': 'client'
        }
      });
      const data = await response.json();
      setServices(data.services || []);
    } catch (err) {
      console.error('Failed to load services:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Select a Service</h2>
          <p className="text-muted-foreground">
            Services offered by {selectedLawyer.user?.displayName}
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={onBack}>
          ← Back
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1,2,3].map(i => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4 animate-pulse"></div>
                  <div className="h-3 bg-muted rounded w-full animate-pulse"></div>
                  <div className="h-3 bg-muted rounded w-1/2 animate-pulse"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {services.map(service => (
            <Card key={service.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4" onClick={() => onSelectService(service)}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{service.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {service.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {service.duration} min
                      </span>
                      <span className="flex items-center gap-1">
                        {service.meetingType === 'virtual' ? (
                          <Video className="h-4 w-4" />
                        ) : service.meetingType === 'in_person' ? (
                          <MapPin className="h-4 w-4" />
                        ) : (
                          <><Video className="h-4 w-4" /> / <MapPin className="h-4 w-4" /></>
                        )}
                        {service.meetingType || 'Virtual/In-person'}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-green-600">
                      ₹{service.price}
                    </div>
                    <Button size="sm" className="mt-2">
                      Select
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

// Client Dashboard Component
const ClientAppointmentManagement = () => {
  const [currentView, setCurrentView] = useState('list');
  const [selectedLawyer, setSelectedLawyer] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleBookingSuccess = (appointment) => {
    handleRefresh();
    setCurrentView('list');
    setSelectedLawyer(null);
    setSelectedService(null);
    setShowBookingDialog(false);
  };

  const startBookingFlow = () => {
    setCurrentView('lawyers');
    setSelectedLawyer(null);
    setSelectedService(null);
  };

  const handleLawyerSelect = (lawyer) => {
    setSelectedLawyer(lawyer);
    setCurrentView('services');
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setShowBookingDialog(true);
  };

  const resetBookingFlow = () => {
    setCurrentView('list');
    setSelectedLawyer(null);
    setSelectedService(null);
    setShowBookingDialog(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">
            {currentView === 'list' ? 'My Appointments' : 
             currentView === 'lawyers' ? 'Select Lawyer' :
             currentView === 'services' ? 'Select Service' : 'Book Appointment'}
          </h1>
          <p className="text-muted-foreground">
            {currentView === 'list' 
              ? 'Manage your booked appointments'
              : 'Book a new appointment'
            }
          </p>
        </div>

        {currentView === 'list' && (
          <Button onClick={startBookingFlow}>
            <Plus className="h-4 w-4 mr-2" />
            Book Appointment
          </Button>
        )}

        {currentView !== 'list' && (
          <Button variant="ghost" onClick={resetBookingFlow}>
            Cancel
          </Button>
        )}
      </div>

      {currentView === 'list' && (
        <ClientAppointmentList refreshTrigger={refreshTrigger} />
      )}

      {currentView === 'lawyers' && (
        <ClientLawyerSelection 
          onSelectLawyer={handleLawyerSelect}
          onBack={resetBookingFlow}
        />
      )}

      {currentView === 'services' && selectedLawyer && (
        <ClientServiceSelection 
          selectedLawyer={selectedLawyer}
          onSelectService={handleServiceSelect}
          onBack={() => setCurrentView('lawyers')}
        />
      )}

      <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Book Appointment</DialogTitle>
            <DialogDescription>
              Complete your appointment booking
            </DialogDescription>
          </DialogHeader>
          
          {selectedLawyer && selectedService && (
            <ClientAppointmentBookingForm
              selectedLawyer={selectedLawyer}
              selectedService={selectedService}
              onBookingSuccess={handleBookingSuccess}
              onClose={() => setShowBookingDialog(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Lawyer Dashboard Component
const LawyerAppointmentManagement = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Client Appointments</h1>
          <p className="text-muted-foreground">
            Manage your client appointments and schedule
          </p>
        </div>
        <Button onClick={handleRefresh} variant="outline">
          <RotateCcw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <LawyerAppointmentList refreshTrigger={refreshTrigger} />
    </div>
  );
};

// Lawyer-only Quick Actions Component
const LawyerQuickActions = ({ 
  onAddService, 
  onSetAvailability, 
  onGenerateReport, 
  onViewMessages,
  onRefresh 
}) => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showReminderDialog, setShowReminderDialog] = useState(false);
  const [reminderType, setReminderType] = useState('');
  const [reminderResult, setReminderResult] = useState('');

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/lawyer/appointments/stats', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('lawyerToken')}`,
          'X-User-Type': 'lawyer'
        }
      });
      const data = await response.json();
      setStats(data.stats);
    } catch (err) {
      console.error('Failed to load stats:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const sendReminders = async (type) => {
    try {
      const response = await fetch('/api/lawyer/appointments/reminders', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('lawyerToken')}`,
          'X-User-Type': 'lawyer'
        },
        body: JSON.stringify({ type })
      });
      
      const data = await response.json();
      
      if (data.error) {
        setReminderResult(`Error: ${data.error}`);
      } else {
        setReminderResult(`✅ ${data.message}`);
        onRefresh?.();
        loadStats();
      }
    } catch (err) {
      setReminderResult('❌ Failed to send reminders');
    }
  };

  const handleReminderAction = (type) => {
    setReminderType(type);
    setShowReminderDialog(true);
    setReminderResult('');
  };

  const confirmSendReminder = () => {
    sendReminders(reminderType);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Appointment Overview
          </CardTitle>
          <CardDescription>
            Your appointment statistics
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="flex justify-between items-center">
                  <div className="h-4 bg-muted rounded w-20 animate-pulse"></div>
                  <div className="h-6 bg-muted rounded w-8 animate-pulse"></div>
                </div>
              ))}
            </div>
          ) : stats ? (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total</span>
                <Badge variant="secondary">{stats.total}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-green-600">Upcoming</span>
                <Badge className="bg-green-100 text-green-800">{stats.upcoming}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-yellow-600">Pending</span>
                <Badge className="bg-yellow-100 text-yellow-800">
                  {stats.statusBreakdown.pending || 0}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-blue-600">Completed</span>
                <Badge className="bg-blue-100 text-blue-800">
                  {stats.statusBreakdown.completed || 0}
                </Badge>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Unable to load stats</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Practice Management
          </CardTitle>
          <CardDescription>
            Manage your legal practice
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Button 
              className="w-full justify-start" 
              onClick={onAddService}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Service
            </Button>

            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={onSetAvailability}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Set Availability
            </Button>

            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={onGenerateReport}
            >
              <FileText className="h-4 w-4 mr-2" />
              Generate Report
            </Button>

            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={onViewMessages}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Client Messages
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Appointment Actions
          </CardTitle>
          <CardDescription>
            Manage your appointments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => handleReminderAction('24h')}
            >
              <Bell className="h-4 w-4 mr-2" />
              Send 24h Reminders
            </Button>

            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => handleReminderAction('1h')}
            >
              <AlertCircle className="h-4 w-4 mr-2" />
              Send 1h Reminders
            </Button>

            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => {
                console.log('View pending appointments');
              }}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Review Pending
              {stats?.statusBreakdown?.pending > 0 && (
                <Badge className="ml-auto bg-yellow-100 text-yellow-800 text-xs">
                  {stats.statusBreakdown.pending}
                </Badge>
              )}
            </Button>

            <Separator />

            <Button 
              variant="ghost" 
              className="w-full justify-start text-muted-foreground hover:text-foreground"
              onClick={() => {
                loadStats();
                onRefresh?.();
              }}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Refresh Data
            </Button>

            <Button 
              variant="ghost" 
              className="w-full justify-start text-muted-foreground hover:text-foreground"
              onClick={() => {
                const period = 30;
                window.open(`/api/lawyer/appointments/export?period=${period}`, '_blank');
              }}
            >
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showReminderDialog} onOpenChange={setShowReminderDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Send Appointment Reminders
            </DialogTitle>
            <DialogDescription>
              {reminderType === '24h' 
                ? 'Send reminders to clients with appointments in the next 24 hours?'
                : 'Send reminders to clients with appointments in the next hour?'
              }
            </DialogDescription>
          </DialogHeader>

          {reminderResult && (
            <Alert className={reminderResult.includes('Error') ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}>
              <AlertDescription>{reminderResult}</AlertDescription>
            </Alert>
          )}

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowReminderDialog(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={confirmSendReminder}
              disabled={reminderResult.includes('✅')}
            >
              {reminderResult.includes('✅') ? 'Sent' : 'Send Reminders'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Client-only Quick Stats Component
const ClientQuickStats = ({ refreshTrigger }) => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, [refreshTrigger]);

  const loadStats = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/client/appointments/stats', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('clientToken')}`,
          'X-User-Type': 'client'
        }
      });
      const data = await response.json();
      setStats(data.stats);
    } catch (err) {
      console.error('Failed to load stats:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Your Appointments
        </CardTitle>
        <CardDescription>
          Appointment summary
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex justify-between items-center">
                <div className="h-4 bg-muted rounded w-20 animate-pulse"></div>
                <div className="h-6 bg-muted rounded w-8 animate-pulse"></div>
              </div>
            ))}
          </div>
        ) : stats ? (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total Booked</span>
              <Badge variant="secondary">{stats.total}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-blue-600">Upcoming</span>
              <Badge className="bg-blue-100 text-blue-800">{stats.upcoming}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-yellow-600">Pending</span>
              <Badge className="bg-yellow-100 text-yellow-800">
                {stats.statusBreakdown.pending || 0}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-green-600">Completed</span>
              <Badge className="bg-green-100 text-green-800">
                {stats.statusBreakdown.completed || 0}
              </Badge>
            </div>
            {stats.totalSpent && (
              <div className="pt-2 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Total Spent</span>
                  <span className="text-sm font-semibold text-green-600">
                    ₹{stats.totalSpent}
                  </span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Unable to load stats</p>
        )}
      </CardContent>
    </Card>
  );
};

// Complete Lawyer Dashboard
const LawyerDashboard = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleAddService = () => {
    console.log('Add service clicked - lawyer only action');
  };

  const handleSetAvailability = () => {
    console.log('Set availability clicked - lawyer only action');
  };

  const handleGenerateReport = () => {
    console.log('Generate report clicked - lawyer only action');
  };

  const handleViewMessages = () => {
    console.log('View messages clicked - lawyer only action');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <LawyerAppointmentManagement />
          </div>

          <div className="lg:col-span-1">
            <LawyerQuickActions
              onAddService={handleAddService}
              onSetAvailability={handleSetAvailability}
              onGenerateReport={handleGenerateReport}
              onViewMessages={handleViewMessages}
              onRefresh={handleRefresh}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Complete Client Dashboard
const ClientDashboard = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <ClientAppointmentManagement />
          </div>

          <div className="lg:col-span-1">
            <ClientQuickStats refreshTrigger={refreshTrigger} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component with Role Detection
const AppointmentSystemApp = () => {
  const [userType, setUserType] = useState('client'); // This would come from your auth system
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Mock auth state

  // Mock user type switcher for demo purposes
  const switchUserType = () => {
    setUserType(userType === 'client' ? 'lawyer' : 'client');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <User className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">Please Log In</h2>
            <p className="text-muted-foreground mb-4">
              Access your appointment dashboard
            </p>
            <Button className="w-full">
              Log In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Demo user type switcher - remove in production */}
      <div className="fixed top-4 right-4 z-50">
        <Button 
          onClick={switchUserType}
          variant="outline"
          size="sm"
          className="bg-background border-2"
        >
          Switch to {userType === 'client' ? 'Lawyer' : 'Client'} View
        </Button>
      </div>

      {userType === 'lawyer' ? <LawyerDashboard /> : <ClientDashboard />}
    </div>
  );
};

export default AppointmentSystemApp;