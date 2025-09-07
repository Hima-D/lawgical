import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, CheckCircle, DollarSign } from 'lucide-react';

const ClientQuickStats = ({ refreshTrigger }) => {
  const [stats, setStats] = useState({
    totalBooked: 0,
    upcomingAppointments: 0,
    pendingAppointments: 0,
    completedAppointments: 0,
    totalSpent: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, [refreshTrigger]);

  const loadStats = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/appointments/stats', {
        credentials: 'include',
        headers: { 'X-User-Type': 'client' }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setStats(data.stats || {});
    } catch (err) {
      console.error('Failed to load stats:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Stats</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="space-y-2">
            {[1,2,3,4].map(i => (
              <div key={i} className="h-4 bg-muted rounded w-full animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <span>Total Booked</span>
              </div>
              <Badge variant="secondary">{stats.totalBooked}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <span>Upcoming</span>
              </div>
              <Badge variant="secondary">{stats.upcomingAppointments}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <span>Pending</span>
              </div>
              <Badge variant="secondary">{stats.pendingAppointments}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-muted-foreground" />
                <span>Completed</span>
              </div>
              <Badge variant="secondary">{stats.completedAppointments}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-muted-foreground" />
                <span>Total Spent</span>
              </div>
              <Badge variant="secondary">₹{stats.totalSpent}</Badge>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ClientQuickStats;
