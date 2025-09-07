"use client";

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { LayoutDashboard, Bell, Briefcase, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

const Sidebar = ({ user, isLawyer }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, description: 'View your dashboard' },
    { label: 'Notifications', path: '/dashboard?view=notifications', icon: Bell, description: 'Check your notifications' },
    ...(isLawyer ? [{ label: 'Services', path: '/dashboard?view=services', icon: Briefcase, description: 'Manage your services' }] : []),
    { label: 'Logout', path: '/logout', icon: LogOut, description: 'Sign out of your account' },
  ];

  const isActive = (itemPath) => {
    if (itemPath.includes('?')) {
      const [basePath, query] = itemPath.split('?');
      return pathname === basePath && searchParams.get('view') === query.split('=')[1];
    }
    return pathname === itemPath;
  };

  return (
    <Card className="w-64 h-screen border-r">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900">{user.displayName}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-80px)]">
          <nav className="space-y-1 p-4">
            {navItems.map((item) => (
              <Button
                key={item.path}
                onClick={() => router.push(item.path)}
                variant="ghost"
                className={cn(
                  'w-full justify-start text-gray-900 hover:bg-gray-100 hover:text-gray-900',
                  isActive(item.path) && 'bg-gray-100 text-gray-900 font-semibold'
                )}
              >
                <item.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                <div className="flex-1 text-left">
                  <div className="text-sm font-medium">{item.label}</div>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
              </Button>
            ))}
          </nav>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default Sidebar;
