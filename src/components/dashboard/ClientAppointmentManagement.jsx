import React, { useState } from 'react';
import ClientAppointmentList from './ClientAppointmentList';
import ClientLawyerSelection from './ClientLawyerSelection';
import ClientServiceSelection from './ClientServiceSelection';
import ClientAppointmentBookingForm from './ClientAppointmentBookingForm';
import AppointmentModal from './AppointmentModal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const ClientAppointmentManagement = ({ refreshTrigger, onRefresh }) => {
  const [currentView, setCurrentView] = useState('list');
  const [selectedLawyer, setSelectedLawyer] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const handleSelectLawyer = (lawyer) => {
    setSelectedLawyer(lawyer);
    setCurrentView('services');
  };

  const handleSelectService = (service) => {
    setSelectedService(service);
    setCurrentView('booking');
  };

  const handleBack = () => {
    if (currentView === 'booking') {
      setCurrentView('services');
    } else if (currentView === 'services') {
      setCurrentView('lawyers');
    } else if (currentView === 'lawyers') {
      setCurrentView('list');
    }
  };

  const handleBookingSuccess = () => {
    setCurrentView('list');
    setSelectedLawyer(null);
    setSelectedService(null);
    onRefresh();
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>My Appointments</CardTitle>
        {currentView === 'list' && (
          <div className="flex gap-2">
            <Button onClick={() => setShowBookingModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Quick Book
            </Button>
            <Button onClick={() => setCurrentView('lawyers')}>
              <Plus className="h-4 w-4 mr-2" />
              Book New Appointment
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {currentView === 'list' && (
          <ClientAppointmentList refreshTrigger={refreshTrigger} />
        )}
        {currentView === 'lawyers' && (
          <ClientLawyerSelection onSelectLawyer={handleSelectLawyer} onBack={handleBack} />
        )}
        {currentView === 'services' && (
          <ClientServiceSelection
            selectedLawyer={selectedLawyer}
            onSelectService={handleSelectService}
            onBack={handleBack}
          />
        )}
        {currentView === 'booking' && (
          <ClientAppointmentBookingForm
            selectedLawyer={selectedLawyer}
            selectedService={selectedService}
            onBookingSuccess={handleBookingSuccess}
            onClose={handleBack}
          />
        )}
        <AppointmentModal
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
          onBookingSuccess={handleBookingSuccess}
        />
      </CardContent>
    </Card>
  );
};

export default ClientAppointmentManagement;
