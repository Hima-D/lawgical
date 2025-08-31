import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Filter, 
  Plus, 
  Calendar, 
  ChevronRight, 
  MoreVertical, 
  Check, 
  CheckCircle, 
  Edit, 
  X,
  User
} from "lucide-react";

const AppointmentsList = ({ user, isLawyer }) => {
  const [actionLoading, setActionLoading] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [actionType, setActionType] = useState('');
  const [formData, setFormData] = useState({
    reason: '',
    notes: '',
    newDate: '',
    newTime: ''
  });

  const appointments = isLawyer 
    ? user.lawyerProfile?.appointments 
    : user.appointments;

  const handleAppointmentAction = async (appointment, action) => {
    setSelectedAppointment(appointment);
    setActionType(action);
    
    if (action === 'confirm' || action === 'complete') {
      await performAction(appointment.id, action, {});
    } else {
      setDialogOpen(true);
    }
  };

  const performAction = async (appointmentId, action, data = {}) => {
    setActionLoading({ [appointmentId]: action });
    
    try {
      let endpoint = '';
      let payload = {};
      
      switch (action) {
        case 'confirm':
          endpoint = `/api/appointments/${appointmentId}/confirm`;
          break;
        case 'cancel':
          endpoint = `/api/appointments/${appointmentId}/cancel`;
          payload = { reason: data.reason };
          break;
        case 'reschedule':
          endpoint = `/api/appointments/${appointmentId}/reschedule`;
          payload = { 
            newDate: data.newDate, 
            newTime: data.newTime, 
            reason: data.reason 
          };
          break;
        case 'complete':
          endpoint = `/api/appointments/${appointmentId}/complete`;
          payload = { notes: data.notes };
          break;
        default:
          throw new Error('Unknown action');
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Action failed');
      }

      window.location.reload();
      setDialogOpen(false);
      setFormData({ reason: '', notes: '', newDate: '', newTime: '' });
      
    } catch (error) {
      console.error('Action error:', error);
      alert(error.message || 'Action failed');
    } finally {
      setActionLoading({});
    }
  };

  const handleDialogSubmit = async () => {
    if (!selectedAppointment) return;
    
    const data = {
      reason: formData.reason,
      notes: formData.notes,
      newDate: formData.newDate,
      newTime: formData.newTime
    };
    
    await performAction(selectedAppointment.id, actionType, data);
  };

  const canPerformAction = (appointment, action) => {
    const isClient = appointment.clientId === user?.userId;
    const isAppointmentLawyer = appointment.lawyerProfile?.userId === user?.userId;
    
    switch (action) {
      case 'confirm':
        return isLawyer && isAppointmentLawyer && appointment.status === 'pending';
      case 'cancel':
        return (isClient || isAppointmentLawyer) && ['pending', 'confirmed'].includes(appointment.status);
      case 'reschedule':
        return (isClient || isAppointmentLawyer) && ['pending', 'confirmed'].includes(appointment.status);
      case 'complete':
        return isLawyer && isAppointmentLawyer && appointment.status === 'confirmed';
      default:
        return false;
    }
  };

  const getDialogTitle = () => {
    switch (actionType) {
      case 'cancel': return 'Cancel Appointment';
      case 'reschedule': return 'Reschedule Appointment';
      case 'complete': return 'Complete Appointment';
      default: return 'Action';
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>
                {isLawyer ? "Client Appointments" : "Your Appointments"}
              </CardTitle>
              <CardDescription>
                {isLawyer
                  ? "Manage your client meetings"
                  : "View your scheduled consultations"}
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              {isLawyer && (
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Block Time
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {appointments?.slice(0, 6).map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage
                      src={
                        isLawyer
                          ? appointment.client?.photoUrl
                          : appointment.lawyerProfile?.user?.photoUrl
                      }
                    />
                    <AvatarFallback>
                      {isLawyer
                        ? appointment.client?.displayName?.charAt(0) || 
                          appointment.client?.email.charAt(0)
                        : appointment.lawyerProfile?.user?.displayName?.charAt(0) ||
                          appointment.lawyerProfile?.user?.email.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">
                      {isLawyer
                        ? appointment.client?.displayName || appointment.client?.email
                        : appointment.lawyerProfile?.user?.displayName ||
                          appointment.lawyerProfile?.user?.email}
                    </p>
                    <p className="text-sm text-gray-500">
                      {appointment.service.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(appointment.appointmentDate).toLocaleDateString()}{" "}
                      at {appointment.appointmentTime}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge
                    variant={
                      appointment.status === "confirmed"
                        ? "default"
                        : appointment.status === "pending"
                          ? "secondary"
                          : appointment.status === "completed"
                            ? "outline"
                            : "destructive"
                    }
                  >
                    {appointment.status}
                  </Badge>
                  <div className="text-right">
                    <p className="font-semibold">${appointment.service.price}</p>
                    <p className="text-xs text-gray-500">
                      {appointment.service.durationMinutes}min
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    {appointment.status === 'pending' && isLawyer && canPerformAction(appointment, 'confirm') && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleAppointmentAction(appointment, 'confirm')}
                        disabled={actionLoading[appointment.id] === 'confirm'}
                      >
                        {actionLoading[appointment.id] === 'confirm' ? (
                          <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-gray-600"></div>
                        ) : (
                          <Check className="h-3 w-3" />
                        )}
                      </Button>
                    )}
                    
                    {appointment.status === 'confirmed' && isLawyer && canPerformAction(appointment, 'complete') && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleAppointmentAction(appointment, 'complete')}
                        disabled={actionLoading[appointment.id] === 'complete'}
                      >
                        {actionLoading[appointment.id] === 'complete' ? (
                          <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-gray-600"></div>
                        ) : (
                          <CheckCircle className="h-3 w-3" />
                        )}
                      </Button>
                    )}

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => alert('View details - implement as needed')}>
                          <User className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        
                        {canPerformAction(appointment, 'reschedule') && (
                          <DropdownMenuItem onClick={() => handleAppointmentAction(appointment, 'reschedule')}>
                            <Edit className="h-4 w-4 mr-2" />
                            Reschedule
                          </DropdownMenuItem>
                        )}
                        
                        {canPerformAction(appointment, 'cancel') && (
                          <DropdownMenuItem onClick={() => handleAppointmentAction(appointment, 'cancel')}>
                            <X className="h-4 w-4 mr-2" />
                            Cancel
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            ))}
            
            {(appointments?.length || 0) === 0 && (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">No appointments scheduled</p>
                <Button>
                  {isLawyer ? "Set Availability" : "Book Consultation"}
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{getDialogTitle()}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {selectedAppointment && (
              <div className="bg-gray-50 p-3 rounded">
                <p className="font-medium">
                  {isLawyer
                    ? selectedAppointment.client?.displayName || selectedAppointment.client?.email
                    : selectedAppointment.lawyerProfile?.user?.displayName}
                </p>
                <p className="text-sm text-gray-600">
                  {new Date(selectedAppointment.appointmentDate).toLocaleDateString()} at {selectedAppointment.appointmentTime}
                </p>
                <p className="text-sm text-gray-600">
                  {selectedAppointment.service?.name}
                </p>
              </div>
            )}

            {actionType === 'reschedule' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="newDate">New Date</Label>
                  <Input
                    id="newDate"
                    type="date"
                    value={formData.newDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, newDate: e.target.value }))}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <Label htmlFor="newTime">New Time</Label>
                  <Input
                    id="newTime"
                    type="time"
                    value={formData.newTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, newTime: e.target.value }))}
                  />
                </div>
              </div>
            )}

            <div>
              <Label htmlFor="reason">
                {actionType === 'cancel' ? 'Cancellation Reason' : 
                 actionType === 'reschedule' ? 'Reason for Rescheduling' : 'Notes'}
              </Label>
              <Textarea
                id="reason"
                placeholder={actionType === 'cancel' ? 'Why are you cancelling this appointment?' : 
                           actionType === 'reschedule' ? 'Why are you rescheduling?' : 'Add any notes...'}
                value={actionType === 'complete' ? formData.notes : formData.reason}
                onChange={(e) => {
                  if (actionType === 'complete') {
                    setFormData(prev => ({ ...prev, notes: e.target.value }));
                  } else {
                    setFormData(prev => ({ ...prev, reason: e.target.value }));
                  }
                }}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleDialogSubmit}
                disabled={actionType === 'reschedule' && (!formData.newDate || !formData.newTime)}
              >
                {actionType === 'cancel' ? 'Cancel Appointment' : 
                 actionType === 'reschedule' ? 'Reschedule' : 'Complete'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AppointmentsList;