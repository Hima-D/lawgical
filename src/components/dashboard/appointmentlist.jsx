import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Filter, Plus, Calendar, ChevronRight } from "lucide-react";

const AppointmentsList = ({ user, isLawyer }) => {
  const appointments = isLawyer 
    ? user.lawyerProfile?.appointments 
    : user.appointments;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>
              {isLawyer ? "Client Appointments" : "Your Appointments"}
            </CardTitle>
            <CardDescription>
              {isLawyer
                ? "Manage your client meetings"
                : "View your scheduled consultations"}
            </CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            {isLawyer && (
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Block Time
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {appointments?.slice(0, 6).map((appointment) => (
            <div
              key={appointment.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage
                    src={
                      isLawyer
                        ? appointment.client?.photoUrl
                        : appointment.lawyerProfile?.user?.photoUrl
                    }
                  />
                  <AvatarFallback>
                    {isLawyer
                      ? appointment.client?.displayName?.charAt(0) || 
                        appointment.client?.email.charAt(0)
                      : appointment.lawyerProfile?.user?.displayName?.charAt(0) ||
                        appointment.lawyerProfile?.user?.email.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">
                    {isLawyer
                      ? appointment.client?.displayName || appointment.client?.email
                      : appointment.lawyerProfile?.user?.displayName ||
                        appointment.lawyerProfile?.user?.email}
                  </p>
                  <p className="text-sm text-gray-500">
                    {appointment.service.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(appointment.appointmentDate).toLocaleDateString()}{" "}
                    at {appointment.appointmentTime}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Badge
                  variant={
                    appointment.status === "confirmed"
                      ? "default"
                      : appointment.status === "pending"
                        ? "secondary"
                        : appointment.status === "completed"
                          ? "outline"
                          : "destructive"
                  }
                >
                  {appointment.status}
                </Badge>
                <div className="text-right">
                  <p className="font-semibold">${appointment.service.price}</p>
                  <p className="text-xs text-gray-500">
                    {appointment.service.durationMinutes}min
                  </p>
                </div>
                <Button variant="ghost" size="sm">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          
          {(appointments?.length || 0) === 0 && (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No appointments scheduled</p>
              <Button>
                {isLawyer ? "Set Availability" : "Book Consultation"}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentsList;