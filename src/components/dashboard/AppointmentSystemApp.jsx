import React from 'react';
import ClientDashboard from './ClientDashboard';
import LawyerDashboard from './LawyerDashboard';

const AppointmentSystemApp = ({ isLawyer }) => {
  return isLawyer ? <LawyerDashboard /> : <ClientDashboard />;
};

export default AppointmentSystemApp;
