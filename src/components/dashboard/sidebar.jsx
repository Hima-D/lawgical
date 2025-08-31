import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Home, Calendar, Users, Activity, TrendingUp, MessageSquare,
  FileText, Settings, Briefcase, Search, HelpCircle, LogOut, ChevronRight
} from "lucide-react";

const Sidebar = ({ user, isLawyer }) => {
  const sidebarItems = isLawyer
    ? [
        { icon: Home, label: "Dashboard", href: "/dashboard", active: true },
        { icon: Calendar, label: "Appointments", href: "/appointments" },
        { icon: Briefcase, label: "Services", href: "/services" },
        { icon: Users, label: "Clients", href: "/clients" },
        { icon: Activity, label: "Availability", href: "/availability" },
        { icon: TrendingUp, label: "Analytics", href: "/analytics" },
        { icon: MessageSquare, label: "Messages", href: "/messages" },
        { icon: FileText, label: "Documents", href: "/documents" },
        { icon: Settings, label: "Settings", href: "/settings" },
      ]
    : [
        { icon: Home, label: "Dashboard", href: "/dashboard", active: true },
        { icon: Calendar, label: "My Appointments", href: "/appointments" },
        { icon: Search, label: "Find Lawyers", href: "/lawyers" },
        { icon: MessageSquare, label: "Messages", href: "/messages" },
        { icon: FileText, label: "Documents", href: "/documents" },
        { icon: HelpCircle, label: "Legal Help", href: "/help" },
        { icon: Settings, label: "Settings", href: "/settings" },
      ];

  return (
    <aside className="hidden md:flex md:w-64 md:flex-col">
      <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white border-r border-gray-200">
        <div className="flex items-center flex-shrink-0 px-4">
          <h1 className="text-xl font-bold text-gray-900">Lawgical</h1>
          <Badge
            variant={isLawyer ? "default" : "secondary"}
            className="ml-2"
          >
            {isLawyer ? "Lawyer" : "Client"}
          </Badge>
        </div>

        <div className="flex flex-col flex-grow mt-5">
          <nav className="flex-1 px-2 pb-4 space-y-1">
            {sidebarItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                  item.active
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                {item.label}
                {item.active && <ChevronRight className="ml-auto h-4 w-4" />}
              </a>
            ))}
          </nav>

          <div className="flex-shrink-0 p-4 border-t border-gray-200">
            <div className="flex items-center">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.photoUrl} />
                <AvatarFallback className="text-xs">
                  {user.displayName?.charAt(0) || user.email.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="ml-3 flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-700 truncate">
                  {user.displayName || user.email}
                </p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
              <form action="/api/logout" method="POST">
                <Button
                  className="ml-2 bg-red-500 hover:bg-red-600 text-white"
                  size="sm"
                  type="submit"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;