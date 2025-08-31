// components/dashboard/StatsGrid.jsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  CalendarDays, Users, DollarSign, Clock, 
  Briefcase, Star 
} from "lucide-react";

const StatsGrid = ({ stats, isLawyer }) => {
  const lawyerStats = [
    {
      title: "Total Services",
      value: stats.totalServices,
      description: "Active legal services",
      icon: Briefcase
    },
    {
      title: "Total Appointments",
      value: stats.totalAppointments,
      description: "All time appointments",
      icon: CalendarDays
    },
    {
      title: "Rating",
      value: stats.averageRating,
      description: `${stats.totalReviews} reviews`,
      icon: Star
    },
    {
      title: "Revenue",
      value: `$${stats.monthlyRevenue}`,
      description: "From completed appointments",
      icon: DollarSign
    }
  ];

  const clientStats = [
    {
      title: "Total Appointments",
      value: stats.totalAppointments,
      description: "All appointments",
      icon: CalendarDays
    },
    {
      title: "Upcoming",
      value: stats.upcomingAppointments,
      description: "Confirmed appointments",
      icon: Clock
    },
    {
      title: "Completed",
      value: stats.completedAppointments,
      description: "Sessions completed",
      icon: Users
    },
    {
      title: "Total Spent",
      value: `$${stats.totalSpent}`,
      description: "On legal services",
      icon: DollarSign
    }
  ];

  const statsToShow = isLawyer ? lawyerStats : clientStats;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statsToShow.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsGrid;