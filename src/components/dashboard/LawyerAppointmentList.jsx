import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Video, MapPin, MessageSquare, Mail, Phone, CheckCircle, AlertCircle, FileText } from 'lucide-react';

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
        type: 'lawyer',
        ...(filter !== 'all' && { status: filter }),
        ...(dateFilter !== 'all' && { dateFilter })
      });
      const response = await fetch(`/api/appointments?${params}`, {
        credentials: 'include',
        headers: { 'X-User-Type': 'lawyer' }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
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
      let url = `/api/appointments/${appointmentId}`;
      let method = 'PUT';
      let body = { status: newStatus, lawyerNotes: notes };
      if (newStatus === 'confirmed') {
        url = `/api/appointments/${appointmentId}/confirm`;
        method = 'POST';
        body = {};
      } else if (newStatus === 'completed') {
        url = `/api/appointments/${appointmentId}/complete`;
        method = 'POST';
        body = { notes };
      } else if (newStatus === 'cancelled') {
        url = `/api/appointments/${appointmentId}/cancel`;
        method = 'POST';
        body = { reason: notes };
      }
      const response = await fetch(url, {
        method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Type': 'lawyer'
        },
        body: JSON.stringify(body)
      });
      if (response.ok) {
        loadAppointments();
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to update appointment');
      }
    } catch (err) {
      console.error('Failed to update appointment:', err);
      alert('Failed to update appointment');
    }
  };

  const rescheduleAppointment = async (appointmentId) => {
    const newDate = prompt('Enter new date (YYYY-MM-DD):');
    const newTime = prompt('Enter new time (HH:MM):');
    const reason = prompt('Provide reason for rescheduling (optional):');
    if (!newDate || !newTime) return;
    try {
      const response = await fetch(`/api/appointments/${appointmentId}/reschedule`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Type': 'lawyer'
        },
        body: JSON.stringify({ newDate, newTime, reason: reason || '' })
      });
      if (response.ok) {
        loadAppointments();
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to reschedule appointment');
      }
    } catch (err) {
      console.error('Failed to reschedule appointment:', err);
      alert('Failed to reschedule appointment');
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

  const canCancelOrReschedule = (appointment) => {
    const appointmentDateTime = new Date(`${appointment.appointmentDate}T${appointment.appointmentTime}`);
    const hoursUntilAppointment = (appointmentDateTime - new Date()) / (1000 * 60 * 60);
    return appointment.status === 'pending' ||
           (appointment.status === 'confirmed' && hoursUntilAppointment > 24);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex gap-2 border-b sm:border-b-0 pb-2 sm:pb-0">
          {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map(status => (
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
                      onClick={() => {
                        const reason = prompt('Provide reason for declining:');
                        if (reason) {
                          updateAppointmentStatus(appointment.id, 'cancelled', reason);
                        }
                      }}
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
                      onClick={() => {
                        const notes = prompt('Add notes (optional):');
                        updateAppointmentStatus(appointment.id, 'completed', notes || '');
                      }}
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
                {canCancelOrReschedule(appointment) && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => rescheduleAppointment(appointment.id)}
                    className="text-blue-600 hover:text-blue-700 mt-2 w-full"
                  >
                    Reschedule
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

export default LawyerAppointmentList;
