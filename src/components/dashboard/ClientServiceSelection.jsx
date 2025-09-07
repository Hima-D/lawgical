import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Video, MapPin } from 'lucide-react';

const ClientServiceSelection = ({ selectedLawyer, onSelectService, onBack }) => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (selectedLawyer) {
      loadServices();
    }
  }, [selectedLawyer]);

  const loadServices = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/client/lawyer/${selectedLawyer.id}/services`, {
        credentials: 'include',
        headers: { 'X-User-Type': 'client' }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setServices(data.services || []);
    } catch (err) {
      console.error('Failed to load services:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Select a Service</h2>
          <p className="text-muted-foreground">
            Services offered by {selectedLawyer.user?.displayName}
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={onBack}>
          ← Back
        </Button>
      </div>
      {isLoading ? (
        <div className="space-y-3">
          {[1,2,3].map(i => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4 animate-pulse"></div>
                  <div className="h-3 bg-muted rounded w-full animate-pulse"></div>
                  <div className="h-3 bg-muted rounded w-1/2 animate-pulse"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : services.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">No services available for this lawyer.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {services.map(service => (
            <Card key={service.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4" onClick={() => onSelectService(service)}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{service.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {service.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {service.duration} min
                      </span>
                      <span className="flex items-center gap-1">
                        {service.meetingType === 'virtual' ? (
                          <Video className="h-4 w-4" />
                        ) : service.meetingType === 'in-person' ? (
                          <MapPin className="h-4 w-4" />
                        ) : (
                          <><Video className="h-4 w-4" /> / <MapPin className="h-4 w-4" /></>
                        )}
                        {service.meetingType ? service.meetingType.replace('_', ' ') : 'Virtual/In-person'}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-green-600">
                      ₹{service.price}
                    </div>
                    <Button size="sm">
                      Select
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientServiceSelection;
