"use client";
import React, { useState, useEffect } from 'react';
import { Search, Filter, Calendar, User, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const AppointmentSearch = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({});
  const [filters, setFilters] = useState({
    q: '',
    status: '',
    dateFrom: '',
    dateTo: '',
    lawyerId: '',
    serviceCategory: '',
    page: 1,
    limit: 10
  });

  const statusColors = {
    'pending': 'bg-yellow-100 text-yellow-800',
    'confirmed': 'bg-blue-100 text-blue-800',
    'completed': 'bg-green-100 text-green-800',
    'cancelled': 'bg-red-100 text-red-800',
    'rescheduled': 'bg-purple-100 text-purple-800'
  };

  const serviceCategories = [
    'Corporate Law',
    'Family Law',
    'Criminal Law',
    'Real Estate',
    'Immigration',
    'Tax Law',
    'Employment Law',
    'Personal Injury'
  ];

  const fetchAppointments = async (searchFilters = filters) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      Object.entries(searchFilters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });

      const response = await fetch(`/api/appointments/search?${params}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const text = await response.text();
      let data;
      
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        console.error('Invalid JSON response:', text);
        throw new Error('Invalid response from server');
      }
      
      setAppointments(data.appointments || []);
      setPagination(data.pagination || {});
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setAppointments([]);
      setPagination({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value, page: 1 };
    setFilters(newFilters);
    fetchAppointments(newFilters);
  };

  const handlePageChange = (newPage) => {
    const newFilters = { ...filters, page: newPage };
    setFilters(newFilters);
    fetchAppointments(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      q: '',
      status: '',
      dateFrom: '',
      dateTo: '',
      lawyerId: '',
      serviceCategory: '',
      page: 1,
      limit: 10
    };
    setFilters(clearedFilters);
    fetchAppointments(clearedFilters);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'N/A';
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Appointments
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by client, lawyer, service, or notes..."
              value={filters.q}
              onChange={(e) => handleFilterChange('q', e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filter Row */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Select
              value={filters.status || "all"}
              onValueChange={(value) => handleFilterChange('status', value === 'all' ? '' : value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="rescheduled">Rescheduled</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.serviceCategory || "all"}
              onValueChange={(value) => handleFilterChange('serviceCategory', value === 'all' ? '' : value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Service Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {serviceCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              type="date"
              placeholder="From Date"
              value={filters.dateFrom}
              onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
            />

            <Input
              type="date"
              placeholder="To Date"
              value={filters.dateTo}
              onChange={(e) => handleFilterChange('dateTo', e.target.value)}
            />

            <Button 
              variant="outline" 
              onClick={clearFilters}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>
              Appointments ({pagination.totalCount || 0} found)
            </span>
            {loading && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                Loading...
              </div>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {appointments.length === 0 && !loading ? (
            <div className="text-center py-8 text-gray-500">
              No appointments found matching your criteria
            </div>
          ) : (
            <>
              {appointments.map((appointment) => (
                <Card key={appointment.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      {/* Client/Lawyer Avatar */}
                      <Avatar>
                        <AvatarImage 
                          src={appointment.client?.photoUrl || appointment.lawyerProfile?.user?.photoUrl} 
                        />
                        <AvatarFallback>
                          {getInitials(
                            appointment.client?.displayName || 
                            appointment.lawyerProfile?.user?.displayName
                          )}
                        </AvatarFallback>
                      </Avatar>

                      {/* Appointment Details */}
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">
                            {appointment.client?.displayName || 
                             appointment.lawyerProfile?.user?.displayName || 
                             'N/A'}
                          </h3>
                          <Badge className={statusColors[appointment.status] || 'bg-gray-100 text-gray-800'}>
                            {appointment.status}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {formatDate(appointment.appointmentDate)}
                          </div>
                          {appointment.service && (
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              {appointment.service.name}
                            </div>
                          )}
                          {appointment.service?.category && (
                            <Badge variant="outline">
                              {appointment.service.category}
                            </Badge>
                          )}
                        </div>

                        {(appointment.clientNotes || appointment.lawyerNotes) && (
                          <div className="text-sm text-gray-600">
                            <p className="line-clamp-2">
                              {appointment.clientNotes || appointment.lawyerNotes}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      {appointment.status === 'pending' && (
                        <Button size="sm">
                          Manage
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Showing {((pagination.page - 1) * pagination.limit) + 1} to{' '}
                    {Math.min(pagination.page * pagination.limit, pagination.totalCount)} of{' '}
                    {pagination.totalCount} results
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(pagination.page - 1)}
                      disabled={pagination.page <= 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>
                    <span className="px-3 py-1 text-sm">
                      {pagination.page} of {pagination.totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(pagination.page + 1)}
                      disabled={pagination.page >= pagination.totalPages}
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentSearch;