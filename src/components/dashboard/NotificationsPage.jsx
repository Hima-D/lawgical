"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, DollarSign, MessageSquare, Bell, AlertCircle } from "lucide-react";

export default function NotificationsPage({ token }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getNotificationIcon = (type) => {
    switch (type) {
      case "appointment": return <CalendarDays className="h-5 w-5 text-blue-500" />;
      case "payment": return <DollarSign className="h-5 w-5 text-green-500" />;
      case "message": return <MessageSquare className="h-5 w-5 text-purple-500" />;
      case "reminder": return <Bell className="h-5 w-5 text-yellow-500" />;
      default: return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!token) {
        setError('Authentication token missing');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/notifications', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) throw new Error(`Failed to fetch notifications: ${response.status}`);
        
        const data = await response.json();
        if (data.success) {
          setNotifications(data.notifications || []);
        } else {
          throw new Error(data.error || 'Failed to fetch notifications');
        }
      } catch (err) {
        console.error('Error fetching notifications:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [token]);

  const markAllRead = async () => {
    if (!token) {
      setError('Authentication token missing');
      return;
    }

    try {
      const response = await fetch('/api/notifications/mark-all-read', {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        setNotifications(notifications.map(n => ({ ...n, isRead: true })));
      } else {
        throw new Error('Failed to mark notifications as read');
      }
    } catch (err) {
      console.error('Error marking notifications as read:', err);
      setError(err.message);
    }
  };

  if (loading) return <div>Loading notifications...</div>;
  if (error) return (
    <div className="text-red-600 flex items-center">
      <AlertCircle className="h-5 w-5 mr-2" />
      Error: {error}
    </div>
  );

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
                  {new Date(notification.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
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
