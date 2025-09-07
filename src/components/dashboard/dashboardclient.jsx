"use client";

import React from 'react';
import DashboardLayout from "@/components/dashboard/layout";
import WelcomeSection from "@/components/dashboard/welcome";
import NotificationsPage from "@/components/dashboard/NotificationsPage";
import AppointmentSystemApp from "@/components/dashboard/AppointmentSystemApp";
import LawyerDashboard from "@/components/dashboard/LawyerDashboard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function DashboardClient({ user, isLawyer, stats, token }) {
  return (
    <DashboardLayout user={user} isLawyer={isLawyer}>
      <WelcomeSection user={user} isLawyer={isLawyer} />
      {isLawyer ? (
        <LawyerDashboard user={user} stats={stats} token={token} />
      ) : (
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="lawyers">Find Lawyers</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <NotificationsPage token={token} />
          </TabsContent>

          <TabsContent value="appointments" className="space-y-4">
            <AppointmentSystemApp token={token} />
          </TabsContent>

          <TabsContent value="lawyers" className="space-y-4">
            <NotificationsPage token={token} />
          </TabsContent>
        </Tabs>
      )}
    </DashboardLayout>
  );
}
