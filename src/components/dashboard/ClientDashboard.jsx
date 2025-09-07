import React, { useState } from 'react';
import ClientAppointmentManagement from './ClientAppointmentManagement';
import ClientQuickStats from './ClientQuickStats';
import RecommendedLawyers from './recommendedlawyers';
import StatsGrid from './statgrid';
import Header from './header';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ClientDashboard = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Client Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <ClientAppointmentManagement refreshTrigger={refreshTrigger} onRefresh={handleRefresh} />
        </div>
        <div className="lg:col-span-1">
          <ClientQuickStats refreshTrigger={refreshTrigger} />
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
