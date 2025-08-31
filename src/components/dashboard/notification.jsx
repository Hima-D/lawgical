'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, DollarSign, MessageSquare, Bell } from "lucide-react";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getNotificationIcon = (type) => {
    switch (type) {
      case "appointment": return <CalendarDays className="h-5 w-5 text-blue-500" />;
      case "payment": return <DollarSign className="h-5 w-5 text-green-500" />;
      case "message": return <MessageSquare className="h-5 w-5 text-purple-500" />;
      default: return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('/api/notifications', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });

        if (!response.ok) throw new Error('Failed to fetch notifications');
        
        const data = await response.json();
        setNotifications(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const markAllRead = async () => {
    try {
      const response = await fetch('/api/notifications/mark-all-read', {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });

      if (response.ok) {
        setNotifications(notifications.map(n => ({ ...n, isRead: true })));
      }
    } catch (err) {
      console.error('Error marking notifications as read:', err);
    }
  };

  if (loading) return <div>Loading notifications...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Recent Notifications</CardTitle>
        <CardDescription>Stay updated with your latest activities</CardDescription>
        {notifications.length > 0 && (
          <Button onClick={markAllRead} variant="outline" size="sm">
            Mark All Read
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {notifications.length > 0 ? (
          notifications.map(notification => (
            <div key={notification.id} className={`flex items-center gap-4 p-4 border-b ${notification.isRead ? 'opacity-60' : ''}`}>
              {getNotificationIcon(notification.type)}
              <div className="flex-1">
                <p className="font-medium">{notification.title}</p>
                <p className="text-sm text-gray-600">{notification.message}</p>
                <p className="text-xs text-gray-400">
                  {new Date(notification.createdAt).toLocaleDateString()} {new Date(notification.createdAt).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <Bell className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 font-medium">No new notifications</p>
            <p className="text-sm text-gray-600">We'll notify you when something important happens</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
