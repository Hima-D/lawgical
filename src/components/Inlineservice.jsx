import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Loader2, 
  AlertCircle, 
  CheckCircle,
  ChevronDown,
  X,
  Clock, 
  Settings, 
  Briefcase,
  Edit,
  Trash2
} from 'lucide-react';

// InlineServiceForm Component
const InlineServiceForm = ({ onServiceAdded, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    durationMinutes: '',
    category: ''
  });

  const serviceCategories = [
    'Legal Consultation',
    'Document Review',
    'Contract Drafting',
    'Court Representation',
    'Legal Advice',
    'Mediation',
    'Corporate Law',
    'Family Law',
    'Criminal Defense',
    'Real Estate',
    'Immigration',
    'Intellectual Property',
    'Other'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (error) setError('');
    if (success) setSuccess('');
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Service name is required');
      return false;
    }
    if (!formData.description.trim()) {
      setError('Service description is required');
      return false;
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      setError('Valid price is required');
      return false;
    }
    if (!formData.durationMinutes || parseInt(formData.durationMinutes) <= 0) {
      setError('Valid duration is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newService = {
        id: Date.now().toString(),
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price),
        durationMinutes: parseInt(formData.durationMinutes),
        category: formData.category || 'General',
        isActive: true,
        createdAt: new Date().toISOString()
      };

      setSuccess('Service added successfully!');
      
      if (onServiceAdded) {
        onServiceAdded(newService);
      }

      setTimeout(() => {
        if (onClose) onClose();
        setSuccess('');
      }, 1500);

    } catch (err) {
      console.error('Add service error:', err);
      setError(err.message || 'Failed to add service');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      durationMinutes: '',
      category: ''
    });
    setError('');
    setSuccess('');
  };

  return (
    <Card className="shadow-md border-l-4 border-l-blue-500">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Plus className="h-5 w-5 text-blue-600" />
          Create New Service
        </CardTitle>
        <CardDescription>
          Add a new service that clients can book and pay for through your platform.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Service Name */}
        <div className="space-y-2">
          <Label htmlFor="service-name" className="text-sm font-medium">
            Service Name *
          </Label>
          <Input
            id="service-name"
            placeholder="e.g., Legal Consultation, Document Review"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            disabled={loading}
            className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category and Duration Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => handleInputChange('category', value)}
              disabled={loading}
            >
              <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-blue-500">
                <SelectValue placeholder="Select category (optional)" />
              </SelectTrigger>
              <SelectContent>
                {serviceCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration" className="text-sm font-medium">
              Duration (minutes) *
            </Label>
            <Input
              id="duration"
              type="number"
              min="1"
              placeholder="e.g., 60"
              value={formData.durationMinutes}
              onChange={(e) => handleInputChange('durationMinutes', e.target.value)}
              disabled={loading}
              className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Price */}
        <div className="space-y-2">
          <Label htmlFor="price" className="text-sm font-medium">
            Price (USD) *
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <Input
              id="price"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              value={formData.price}
              onChange={(e) => handleInputChange('price', e.target.value)}
              disabled={loading}
              className="pl-8 transition-all duration-200 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description" className="text-sm font-medium">
            Service Description *
          </Label>
          <Textarea
            id="description"
            placeholder="Describe what this service includes..."
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            disabled={loading}
            rows={4}
            className="resize-none transition-all duration-200 focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-500">
            Provide a clear description to help clients understand what they're booking.
          </p>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <Alert variant="destructive" className="animate-in slide-in-from-top-2">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="border-green-200 bg-green-50 animate-in slide-in-from-top-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              {success}
            </AlertDescription>
          </Alert>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
          <Button
            onClick={onClose}
            variant="outline"
            disabled={loading}
            className="flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            Cancel
          </Button>
          
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Adding Service...
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                Add Service
              </>
            )}
          </Button>
        </div>

        {/* Form Helper */}
        <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600">
          <p className="font-medium mb-1">💡 Quick Tips:</p>
          <ul className="list-disc list-inside space-y-1 text-xs">
            <li>Choose descriptive names that clients will easily understand</li>
            <li>Set realistic durations including consultation and prep time</li>
            <li>Price competitively based on your expertise and market rates</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

// Main LawyerServices Component
const LawyerServices = () => {
  const [showForm, setShowForm] = useState(false);
  const [services, setServices] = useState([
    {
      id: '1',
      name: 'Legal Consultation',
      description: 'One-on-one consultation to discuss your legal matters and provide initial advice.',
      price: 150,
      durationMinutes: 60,
      category: 'Legal Consultation',
      isActive: true
    },
    {
      id: '2',
      name: 'Contract Review',
      description: 'Comprehensive review of contracts and legal documents with detailed feedback.',
      price: 200,
      durationMinutes: 90,
      category: 'Document Review',
      isActive: true
    }
  ]);

  const handleServiceAdded = (newService) => {
    setServices(prev => [...prev, newService]);
    setShowForm(false);
  };

  const handleDeleteService = (serviceId) => {
    setServices(prev => prev.filter(service => service.id !== serviceId));
  };

  const toggleServiceStatus = (serviceId) => {
    setServices(prev => prev.map(service => 
      service.id === serviceId 
        ? { ...service, isActive: !service.isActive }
        : service
    ));
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Your Legal Services</CardTitle>
              <CardDescription>
                Manage your service offerings and pricing
              </CardDescription>
            </div>
            <Button 
              onClick={() => setShowForm(!showForm)}
              variant={showForm ? "outline" : "default"}
            >
              {showForm ? (
                <>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Service
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          {showForm && (
            <div className="mb-6">
              <InlineServiceForm 
                onServiceAdded={handleServiceAdded}
                onClose={() => setShowForm(false)}
              />
            </div>
          )}
                 
          <div className="space-y-4">
            {services.map((service) => (
              <div
                key={service.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium">{service.name}</h4>
                    <Badge
                      variant={service.isActive ? "default" : "secondary"}
                      className={service.isActive ? "bg-green-100 text-green-800" : ""}
                    >
                      {service.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {service.description}
                  </p>
                  <div className="flex items-center space-x-4 mt-3">
                    <Badge variant="outline">
                      {service.category || "General"}
                    </Badge>
                    <span className="text-xs text-gray-500 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {service.durationMinutes} minutes
                    </span>
                  </div>
                </div>
                
                <div className="text-right ml-4">
                  <p className="font-bold text-lg">${service.price}</p>
                  <p className="text-xs text-gray-500 mb-3">per session</p>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => toggleServiceStatus(service.id)}
                    >
                      {service.isActive ? "Deactivate" : "Activate"}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-gray-600"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDeleteService(service.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
                     
            {services.length === 0 && !showForm && (
              <div className="text-center py-12">
                <Briefcase className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">No services created yet</p>
                <p className="text-sm text-gray-400 mb-6">
                  Start by creating your first legal service to attract clients
                </p>
                <Button onClick={() => setShowForm(true)}>
                  Create Your First Service
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LawyerServices;