import React, { useState, useEffect } from 'react';
import { format, addDays } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const formSchema = z.object({
  lawyerProfileId: z.string().min(1, 'Please select a lawyer'),
  serviceId: z.string().min(1, 'Please select a service'),
  appointmentDate: z.string().min(1, 'Please select a date'),
  appointmentTime: z.string().min(1, 'Please select a time'),
  clientNotes: z.string().optional(),
  meetingType: z.enum(['virtual', 'in-person'], { required_error: 'Please select a meeting type' }),
});

const AppointmentModal = ({ isOpen, onClose, onBookingSuccess }) => {
  const [lawyers, setLawyers] = useState([]);
  const [services, setServices] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lawyerProfileId: '',
      serviceId: '',
      appointmentDate: '',
      appointmentTime: '',
      clientNotes: '',
      meetingType: 'virtual',
    },
  });

  useEffect(() => {
    if (isOpen) {
      const fetchLawyers = async () => {
        try {
          const response = await fetch('/api/lawyer/search?limit=100', {
            credentials: 'include',
            headers: { 'X-User-Type': 'client' }
          });
          const data = await response.json();
          if (response.ok && data.success) {
            setLawyers(data.data.lawyers || []);
          } else {
            setError('Failed to fetch lawyers');
          }
        } catch (err) {
          setError('Error fetching lawyers');
        }
      };

      const fetchServices = async () => {
        try {
          const response = await fetch('/api/services', {
            credentials: 'include',
            headers: { 'X-User-Type': 'client' }
          });
          const data = await response.json();
          if (response.ok) {
            setServices(data.services.filter(s => s.isActive) || []);
          } else {
            setError('Failed to fetch services');
          }
        } catch (err) {
          setError('Error fetching services');
        }
      };

      fetchLawyers();
      fetchServices();
    }
  }, [isOpen]);

  const generateDateOptions = () => {
    const dates = [];
    for (let i = 0; i < 30; i++) {
      const date = addDays(new Date(), i);
      dates.push(format(date, 'yyyy-MM-dd'));
    }
    return dates;
  };

  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 9; hour <= 17; hour++) {
      times.push(`${hour.toString().padStart(2, '0')}:00`);
      times.push(`${hour.toString().padStart(2, '0')}:30`);
    }
    return times;
  };

  const onSubmit = async (data) => {
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Type': 'client'
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess('Appointment booked successfully!');
        form.reset();
        onBookingSuccess();
        setTimeout(() => {
          onClose();
          setSuccess('');
        }, 2000);
      } else {
        setError(result.error || 'Failed to book appointment');
      }
    } catch (err) {
      setError('Error booking appointment');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Book an Appointment</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="lawyerProfileId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lawyer</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a lawyer" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {lawyers.map((lawyer) => (
                        <SelectItem key={lawyer.id} value={lawyer.id.toString()}>
                          {lawyer.user?.displayName || lawyer.user?.email}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="serviceId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.id} value={service.id.toString()}>
                          {service.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="appointmentDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a date" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {generateDateOptions().map((date) => (
                        <SelectItem key={date} value={date}>
                          {format(new Date(date), 'PPP')}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="appointmentTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a time" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {generateTimeOptions().map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="clientNotes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Add any additional notes" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="meetingType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meeting Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select meeting type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="virtual">Virtual</SelectItem>
                      <SelectItem value="in-person">In-Person</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && <p className="text-destructive text-sm">{error}</p>}
            {success && <p className="text-green-600 text-sm">{success}</p>}
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Booking...' : 'Book Appointment'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentModal;
