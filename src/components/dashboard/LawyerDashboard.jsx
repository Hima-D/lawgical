"use client";

import React, { useState } from 'react';
import LawyerAppointmentList from './LawyerAppointmentList';
import LawyerQuickActions from './LawyerQuickActions';
import NotificationsPage from './NotificationsPage';
import RecentReviews from './recentreview';
import StatsGrid from './statgrid';
import LawyerProfile from './lawyerprofile';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const LawyerDashboard = ({ user, stats, token }) => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="flex min-h-screen">
      <div className="container mx-auto p-4 space-y-6 flex-1">
        <h1 className="text-2xl font-bold">Lawyer Dashboard</h1>
        <StatsGrid stats={stats} isLawyer={true} />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <RecentReviews user={user} />
              </CardContent>
            </Card>
            <LawyerAppointmentList refreshTrigger={refreshTrigger} token={token} />
          </div>
          <div className="lg:col-span-1">
            <LawyerQuickActions
              refreshTrigger={refreshTrigger}
              onRefresh={handleRefresh}
              lawyerId={user.lawyerProfile?.id}
              token={token}
              stats={stats}
            />
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <NotificationsPage token={token} />
          </CardContent>
        </Card>
        <LawyerProfile user={user} />
      </div>
    </div>
  );
};

export default LawyerDashboard;
