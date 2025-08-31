// components/dashboard/DashboardLayout.jsx
import React from 'react';
import Sidebar from './sidebar';
import Header from './header';

const DashboardLayout = ({ children, user, isLawyer }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar user={user} isLawyer={isLawyer} />
      <div className="flex-1 flex flex-col">
        <Header user={user} />
        <main className="flex-1 px-6 lg:px-8 py-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;