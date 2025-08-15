// components/dashboard/LawyerQuickActions.jsx
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Calendar, FileText, MessageSquare } from "lucide-react";

const LawyerQuickActions = ({ onAddService }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>
          Manage your practice efficiently
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button className="w-full justify-start" onClick={onAddService}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Service
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Calendar className="h-4 w-4 mr-2" />
            Set Availability
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <MessageSquare className="h-4 w-4 mr-2" />
            Client Messages
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LawyerQuickActions;