import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
  Download
} from "lucide-react";

// Enhanced LawyerQuickActions component with appointment features
const LawyerQuickActions = ({ 
  onAddService, 
  onSetAvailability, 
  onGenerateReport, 
  onViewMessages,
  userType = 'lawyer',
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
      const response = await fetch('/api/appointments/stats');
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
      const response = await fetch('/api/appointments/reminders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type })
      });
      
      const data = await response.json();
      
      if (data.error) {
        setReminderResult(`Error: ${data.error}`);
      } else {
        setReminderResult(`✅ ${data.message}`);
        onRefresh?.();
        loadStats(); // Refresh stats
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
      {/* Appointment Stats Card */}
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

      {/* Original Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Quick Actions
          </CardTitle>
          <CardDescription>
            Manage your practice efficiently
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {/* Service Management */}
            <Button 
              className="w-full justify-start" 
              onClick={onAddService}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Service
            </Button>

            {/* Availability Management */}
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={onSetAvailability}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Set Availability
            </Button>

            {/* Reports */}
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={onGenerateReport}
            >
              <FileText className="h-4 w-4 mr-2" />
              Generate Report
            </Button>

            {/* Messages */}
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

      {/* Appointment Management Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Appointment Management
          </CardTitle>
          <CardDescription>
            Manage your appointments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {/* View Today's Appointments */}
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => {
                // This would navigate to today's appointments or open a modal
                const today = new Date().toISOString().split('T')[0];
                window.location.href = `#appointments?date=${today}`;
              }}
            >
              <Eye className="h-4 w-4 mr-2" />
              Today's Appointments
              {stats?.upcoming > 0 && (
                <Badge className="ml-auto bg-blue-100 text-blue-800 text-xs">
                  {stats.upcoming}
                </Badge>
              )}
            </Button>

            {/* Send 24h Reminders */}
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => handleReminderAction('24h')}
            >
              <Bell className="h-4 w-4 mr-2" />
              Send 24h Reminders
            </Button>

            {/* Send 1h Reminders */}
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => handleReminderAction('1h')}
            >
              <AlertCircle className="h-4 w-4 mr-2" />
              Send 1h Reminders
            </Button>

            {/* Confirm Pending Appointments */}
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => {
                // Navigate to pending appointments
                window.location.href = '#appointments?status=pending';
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

            {/* Refresh Data */}
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

            {/* Export Appointments */}
            <Button 
              variant="ghost" 
              className="w-full justify-start text-muted-foreground hover:text-foreground"
              onClick={() => {
                // This would trigger an export
                const period = 30; // days
                window.open(`/api/appointments/export?period=${period}`, '_blank');
              }}
            >
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Reminder Confirmation Dialog */}
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

// Usage example component showing how to integrate everything
const LawyerDashboardWithQuickActions = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  // Your existing handlers
  const handleAddService = () => {
    console.log('Add service clicked');
    // Navigate to add service page or open modal
  };

  const handleSetAvailability = () => {
    console.log('Set availability clicked');
    // Navigate to availability settings or open modal
  };

  const handleGenerateReport = () => {
    console.log('Generate report clicked');
    // Open report generation modal or navigate to reports page
  };

  const handleViewMessages = () => {
    console.log('View messages clicked');
    // Navigate to messages page or open messages modal
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Your main appointment components would go here */}
            <div className="space-y-6">
              <div className="text-center py-12 border-2 border-dashed border-muted rounded-lg">
                <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Appointments Dashboard</h3>
                <p className="text-muted-foreground">
                  Your appointment components would be displayed here
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar with Enhanced Quick Actions */}
          <div className="lg:col-span-1">
            <LawyerQuickActions
              onAddService={handleAddService}
              onSetAvailability={handleSetAvailability}
              onGenerateReport={handleGenerateReport}
              onViewMessages={handleViewMessages}
              onRefresh={handleRefresh}
              userType="lawyer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawyerQuickActions;