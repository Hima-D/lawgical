"use client";

import React, { useState, useEffect } from 'react';
import { format, addDays } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { User, Clock, Video, MapPin, CheckCircle, RotateCcw, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

const STORAGE_KEY = 'appointmentFormData';

const ClientAppointmentBookingForm = ({
  selectedLawyer,
  selectedService,
  onBookingSuccess,
  onClose
}) => {
  const router = useRouter();
  const [formData, setFormData] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {
        appointmentDate: '',
        appointmentTime: '',
        clientNotes: '',
        meetingType: 'virtual',
        availabilitySlotId: null
      };
    }
    return {
      appointmentDate: '',
      appointmentTime: '',
      clientNotes: '',
      meetingType: 'virtual',
      availabilitySlotId: null
    };
  });
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    console.log('Received props:', { selectedLawyer, selectedService });
  }, [selectedLawyer, selectedService]);

  useEffect(() => {
    console.log('Saving formData to sessionStorage:', formData);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    if (selectedLawyer?.id && formData.appointmentDate) {
      loadAvailableSlots();
    } else {
      console.log('Clearing availableSlots: no lawyer ID or date selected');
      setAvailableSlots([]);
    }
  }, [selectedLawyer?.id, formData.appointmentDate]);

  const loadAvailableSlots = async () => {
    setIsLoading(true);
    setError('');
    try {
      const params = new URLSearchParams({
        lawyerProfileId: selectedLawyer.id.toString(),
        date: formData.appointmentDate
      });
      console.log(`Fetching availability for lawyer ID: ${selectedLawyer.id}, date: ${formData.appointmentDate}`);
      const response = await fetch(`/api/appointments/availability?${params}`, {
        credentials: 'include',
        headers: { 'X-User-Type': 'client' }
      });
      console.log(`Availability response status: ${response.status}`);
      if (!response.ok) {
        let errorData = {};
        try {
          errorData = await response.json();
        } catch (jsonError) {
          console.error('Failed to parse error response:', jsonError);
          throw new Error(`HTTP error! status: ${response.status}, message: Failed to parse server response`);
        }
        console.error('Error response:', errorData);
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Availability data:', data);
      const validSlots = (data.availableSlots || []).filter(
        slot => slot && slot.time && slot.availabilitySlotId && Number.isFinite(slot.duration)
      );
      setAvailableSlots(validSlots);
    } catch (err) {
      console.error('Failed to load slots:', err);
      setError(err.message || 'Failed to load available slots. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    console.log(`Updating formData field ${field}:`, value);
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleTimeSlotSelect = (slot) => {
    console.log('Selected time slot:', slot);
    setFormData(prev => ({
      ...prev,
      appointmentTime: slot.time,
      availabilitySlotId: slot.availabilitySlotId
    }));
  };

  const validateForm = () => {
    if (!formData.appointmentDate || !formData.appointmentTime) {
      setError('Please select both date and time');
      return false;
    }
    const appointmentDateTime = new Date(`${formData.appointmentDate}T${formData.appointmentTime}`);
    if (isNaN(appointmentDateTime.getTime()) || appointmentDateTime <= new Date()) {
      setError('Appointment must be scheduled for a future date and time');
      return false;
    }
    if (!selectedLawyer?.id || !selectedLawyer?.user || !selectedService?.id) {
      setError('Lawyer or service information is missing');
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
      const payload = {
        lawyerProfileId: selectedLawyer.id,
        serviceId: selectedService.id,
        appointmentDate: formData.appointmentDate,
        appointmentTime: formData.appointmentTime,
        clientNotes: formData.clientNotes,
        meetingType: formData.meetingType,
        availabilitySlotId: formData.availabilitySlotId
      };
      console.log('Submitting appointment:', payload);
      const response = await fetch('/api/appointments', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Type': 'client'
        },
        body: JSON.stringify(payload)
      });
      console.log(`Booking response status: ${response.status}`);
      const data = await response.json();
      if (!response.ok) {
        console.error('Booking error response:', data);
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }
      console.log('Booking successful:', data);
      setFormData({
        appointmentDate: '',
        appointmentTime: '',
        clientNotes: '',
        meetingType: 'virtual',
        availabilitySlotId: null
      });
      sessionStorage.removeItem(STORAGE_KEY);
      setAvailableSlots([]);
      onBookingSuccess?.(data.appointment);
      onClose?.();
    } catch (err) {
      console.error('Failed to book appointment:', err);
      setError(err.message || 'Failed to book appointment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    console.log('Canceling form, clearing state');
    setFormData({
      appointmentDate: '',
      appointmentTime: '',
      clientNotes: '',
      meetingType: 'virtual',
      availabilitySlotId: null
    });
    setAvailableSlots([]);
    sessionStorage.removeItem(STORAGE_KEY);
    onClose?.();
    router.push('/search');
  };

  const generateDateOptions = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 30; i++) {
      const date = addDays(today, i);
      if (date.getDay() !== 0 && date.getDay() !== 6) { // Exclude weekends
        const dateValue = format(date, 'yyyy-MM-dd');
        dates.push({
          value: dateValue,
          label: format(date, 'EEEE, MMM d'),
          key: `${dateValue}-${i}` // Unique key to prevent duplicate key errors
        });
      }
    }
    console.log('Generated date options:', dates);
    return dates;
  };

  if (!selectedLawyer || !selectedLawyer.user || !selectedService) {
    return (
      <div className="space-y-6">
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            Missing lawyer or service information. Please go back and select a lawyer and service.
          </AlertDescription>
        </Alert>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => router.push('/search')}
        >
          Back to Search
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-muted/50 p-4 rounded-lg">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <User className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">{selectedLawyer.user.displayName}</h3>
            <p className="text-sm text-muted-foreground">{selectedService.name}</p>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {selectedService.durationMinutes} min
              </span>
              <span className="flex items-center gap-1">
                <span className="text-green-600 font-medium">₹{selectedService.price}</span>
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
              <option key={date.key} value={date.value}>
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
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="h-10 bg-muted rounded animate-pulse"></div>
                ))}
              </div>
            ) : availableSlots.length > 0 ? (
              <div className="grid grid-cols-3 gap-2">
                {availableSlots.map(slot => (
                  <Button
                    key={slot.availabilitySlotId}
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
              variant={formData.meetingType === 'in-person' ? "default" : "outline"}
              className="flex items-center gap-2"
              onClick={() => handleInputChange('meetingType', 'in-person')}
            >
              <MapPin className="h-4 w-4" />
              In Person
            </Button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Additional Notes (Optional)</label>
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
        <div className="flex gap-4">
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
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ClientAppointmentBookingForm;
