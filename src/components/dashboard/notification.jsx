import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  CalendarDays, DollarSign, MessageSquare, Bell 
} from "lucide-react";

const NotificationsList = ({ user }) => {
  const getNotificationIcon = (type) => {
    switch (type) {
      case "appointment":
        return <CalendarDays className="h-4 w-4 text-blue-600" />;
      case "payment":
        return <DollarSign className="h-4 w-4 text-green-600" />;
      case "message":
        return <MessageSquare className="h-4 w-4 text-purple-600" />;
      default:
        return <Bell className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Recent Notifications</CardTitle>
            <CardDescription>
              Stay updated with your latest activities
            </CardDescription>
          </div>
          {user.notifications.length > 0 && (
            <Button variant="outline" size="sm">
              Mark All Read
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {user.notifications.length > 0 ? (
            user.notifications.slice(0, 5).map((notification) => (
              <div
                key={notification.id}
                className="flex items-start space-x-4 p-3 bg-blue-50 rounded-lg"
              >
                <div className="bg-blue-100 p-2 rounded-full">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    {notification.title}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(notification.createdAt).toLocaleDateString()}{" "}
                    {new Date(notification.createdAt).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-2">No new notifications</p>
              <p className="text-sm text-gray-400">
                We'll notify you when something important happens
              </p>
            </div>
          )}

          {user.notifications.length > 5 && (
            <div className="text-center mt-4">
              <Button variant="outline" size="sm">
                View All Notifications
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationsList;