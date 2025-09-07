import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Bell, FileText, MessageSquare, Calendar, Download, Settings } from 'lucide-react';

const LawyerQuickActions = ({ refreshTrigger, onRefresh }) => {
  const [stats, setStats] = useState({
    totalAppointments: 0,
    upcomingAppointments: 0,
    pendingAppointments: 0,
    completedAppointments: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [showReminderDialog, setShowReminderDialog] = useState(false);
  const [reminderType, setReminderType] = useState('');
  const [reminderResult, setReminderResult] = useState('');

  useEffect(() => {
    loadStats();
  }, [refreshTrigger]);

  const loadStats = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/appointments/stats', {
        credentials: 'include',
        headers: { 'X-User-Type': 'lawyer' }
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

  const handleAddService = () => {
    console.log('Navigate to add service page');
  };

  const handleSetAvailability = () => {
    console.log('Navigate to set availability page');
  };

  const handleViewMessages = () => {
    console.log('Navigate to messages page');
  };

  const handleGenerateReport = () => {
    console.log('Generate report');
  };

  const handleSendReminders = async (type) => {
    setReminderType(type);
    setShowReminderDialog(true);
    setReminderResult('');
    try {
      const response = await fetch('/api/appointments/reminders', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Type': 'lawyer'
        },
        body: JSON.stringify({ reminderType: type })
      });
      const data = await response.json();
      if (response.ok) {
        setReminderResult(`Successfully sent ${type} reminders`);
        onRefresh();
      } else {
        setReminderResult(data.error || 'Failed to send reminders');
      }
    } catch (err) {
      console.error('Failed to send reminders:', err);
      setReminderResult('Failed to send reminders');
    }
  };

  const handleExportData = async () => {
    try {
      const response = await fetch('/api/appointments/export', {
        credentials: 'include',
        headers: { 'X-User-Type': 'lawyer' }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'appointments_export.csv';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to export data:', err);
      alert('Failed to export data');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="space-y-2">
            {[1,2,3,4].map(i => (
              <div key={i} className="h-4 bg-muted rounded w-full animate-pulse"></div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <p className="text-muted-foreground">Total Appointments</p>
                <p className="font-semibold">{stats.totalAppointments}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">Upcoming</p>
                <p className="font-semibold">{stats.upcomingAppointments}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">Pending</p>
                <p className="font-semibold">{stats.pendingAppointments}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">Completed</p>
                <p className="font-semibold">{stats.completedAppointments}</p>
              </div>
            </div>
            <div className="space-y-2">
              <Button className="w-full" onClick={handleAddService}>
                <FileText className="h-4 w-4 mr-2" />
                Add New Service
              </Button>
              <Button className="w-full" variant="outline" onClick={handleSetAvailability}>
                <Calendar className="h-4 w-4 mr-2" />
                Set Availability
              </Button>
              <Button className="w-full" variant="outline" onClick={handleViewMessages}>
                <MessageSquare className="h-4 w-4 mr-2" />
                View Messages
              </Button>
              <Button className="w-full" variant="outline" onClick={handleGenerateReport}>
                <FileText className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
              <Button className="w-full" variant="outline" onClick={() => handleSendReminders('24h')}>
                <Bell className="h-4 w-4 mr-2" />
                Send 24h Reminders
              </Button>
              <Button className="w-full" variant="outline" onClick={() => handleSendReminders('1h')}>
                <Bell className="h-4 w-4 mr-2" />
                Send 1h Reminders
              </Button>
              <Button className="w-full" variant="outline" onClick={handleExportData}>
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
            </div>
          </>
        )}
        <Dialog open={showReminderDialog} onOpenChange={setShowReminderDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Send {reminderType} Reminders</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              {reminderResult ? (
                <p className={reminderResult.includes('Successfully') ? 'text-green-600' : 'text-red-600'}>
                  {reminderResult}
                </p>
              ) : (
                <p>Sending {reminderType} reminders to all applicable appointments...</p>
              )}
            </div>
            <DialogFooter>
              <Button onClick={() => setShowReminderDialog(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default LawyerQuickActions;
