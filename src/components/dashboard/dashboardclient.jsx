// components/dashboard/DashboardClient.jsx (Client Component)
"use client";
import React, { useState } from 'react';

// Component imports
import DashboardLayout from "@/components/dashboard/layout";
import WelcomeSection from "@/components/dashboard/welcome";
import StatsGrid from "@/components/dashboard/statgrid";
import LawyerQuickActions from "@/components/dashboard/lawyeraction";
import RecentReviews from "@/components/dashboard/recentreview";
import RecommendedLawyers from "@/components/dashboard/recommendedlawyers";
// import LegalResources from "@/components/dashboard/LegalResources";
import AppointmentsList from "@/components/dashboard/appointmentlist";
import LawyerServices from "@/components/dashboard/lawyerservice";
import LawyerProfile from './lawyerprofile';
import NotificationsList from './notification';
import ClientLawyerBrowser from "@/components/dashboard/lawyerbrowser";

// UI Components
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DashboardClient({ user, isLawyer, stats }) {
  const [showForm, setShowForm] = useState(false);

  return (
    <DashboardLayout user={user} isLawyer={isLawyer}>
      <WelcomeSection user={user} isLawyer={isLawyer} />
      <StatsGrid stats={stats} isLawyer={isLawyer} />

      {/* Tabbed Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value={isLawyer ? "services" : "lawyers"}>
            {isLawyer ? "Services" : "Find Lawyers"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {isLawyer ? (
              <>
                <LawyerQuickActions 
                  onAddService={() => setShowForm(true)} 
                />
                <RecentReviews user={user} />
              </>
            ) : (
              <>
                <RecommendedLawyers />
                <LegalResources />
              </>
            )}
          </div>
        </TabsContent>

        <TabsContent value="appointments" className="space-y-4">
          <AppointmentsList user={user} isLawyer={isLawyer} />
        </TabsContent>

        <TabsContent value={isLawyer ? "services" : "lawyers"} className="space-y-4">
          {isLawyer ? (
            <LawyerServices 
              user={user} 
              showForm={showForm} 
              setShowForm={setShowForm} 
            />
          ) : (
            <ClientLawyerBrowser />
          )}
        </TabsContent>
      </Tabs>

      {/* Lawyer Profile - Only for lawyers */}
      {isLawyer && <LawyerProfile user={user} />}

      {/* Notifications */}
      <NotificationsList user={user} />
    </DashboardLayout>
  );
}