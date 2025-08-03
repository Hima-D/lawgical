'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Header from '@/components/header';
import Footer from '@/components/footer';

import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  FileText,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  Briefcase,
  Users,
  Shield,
  Zap,
  Award,
  Star,
  MapPin,
  GraduationCap,
} from 'lucide-react';

const Consultation = () => {
  const { control, handleSubmit, watch, setValue, trigger, reset, formState: { errors } } = useForm({
    mode: 'onChange',
    defaultValues: {
      service: '',
      attorney: '',
      date: '',
      time: '',
      name: '',
      email: '',
      phone: '',
      description: '',
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [currentStep, setCurrentStep] = useState(1);

  const watchedService = watch('service');
  const watchedAttorney = watch('attorney');

  // Get today's date and format it as yyyy-mm-dd
  const today = new Date().toISOString().split('T')[0];

  // Services data
  const services = [
    { id: 1, title: 'Company Incorporation' },
    { id: 2, title: 'GST Registration and Returns' },
    { id: 3, title: 'Intellectual Property' },
    { id: 4, title: 'FSSAI Registration' },
    { id: 5, title: 'Digital Signatures' },
    { id: 6, title: 'ISO Certifications' },
    { id: 7, title: 'GeM Portal Registration' },
    { id: 8, title: 'Bookkeeping and Accounting' },
    { id: 9, title: 'MSME and Startup India Registration' },
    { id: 10, title: 'Shop Act Registration' },
    { id: 11, title: 'Trade License' },
    { id: 12, title: 'Import Export Code (IE Code)' },
    { id: 13, title: 'IPO, Mergers, and Valuations' },
    { id: 14, title: 'Legal Metrology Act Registration' },
    { id: 15, title: 'POSH Training and Compliance' },
    { id: 16, title: 'Other Professional Services' },
  ];

  // Generate time slots from 9 AM to 5 PM in half-hour increments
  const generateTimeSlots = (startHour = 9, endHour = 17) => {
    const timeSlots = [];
    let currentTime = new Date();
    currentTime.setHours(startHour, 0, 0, 0);

    while (currentTime.getHours() < endHour) {
      const hours = currentTime.getHours();
      const minutes = currentTime.getMinutes();
      const timeSlot = `${hours % 12 || 12}:${minutes === 0 ? '00' : '30'} ${
        hours >= 12 ? 'PM' : 'AM'
      }`;
      timeSlots.push(timeSlot);
      currentTime = new Date(currentTime.setMinutes(currentTime.getMinutes() + 30));
    }

    return timeSlots;
  };

  const timeSlots = generateTimeSlots();

  const getAttorneys = () => {
    const attorneyMap = {
      'Company Incorporation': [
        { 
          id: 'attorney1', 
          name: 'Jessica Rodriguez', 
          specialty: 'Company Incorporation', 
          rating: 4.9, 
          experience: '8 Years',
          location: 'Mumbai',
          cases: '250+ Cases',
          education: 'Harvard Law School'
        },
        { 
          id: 'attorney2', 
          name: 'Carlos Martinez', 
          specialty: 'Company Incorporation', 
          rating: 4.8, 
          experience: '12 Years',
          location: 'Delhi',
          cases: '400+ Cases',
          education: 'Delhi University'
        },
      ],
      'GST Registration and Returns': [
        { 
          id: 'attorney3', 
          name: 'Michael Chang', 
          specialty: 'GST Registration and Returns', 
          rating: 4.9, 
          experience: '10 Years',
          location: 'Bangalore',
          cases: '300+ Cases',
          education: 'NLS Bangalore'
        },
        { 
          id: 'attorney4', 
          name: 'David Kim', 
          specialty: 'GST Registration and Returns', 
          rating: 4.7, 
          experience: '15 Years',
          location: 'Chennai',
          cases: '500+ Cases',
          education: 'Madras University'
        },
      ],
      'Intellectual Property': [
        { 
          id: 'attorney5', 
          name: 'Sarah Williams', 
          specialty: 'Intellectual Property', 
          rating: 4.8, 
          experience: '9 Years',
          location: 'Pune',
          cases: '200+ Cases',
          education: 'Columbia Law'
        },
        { 
          id: 'attorney6', 
          name: 'Emma Johnson', 
          specialty: 'Intellectual Property', 
          rating: 4.9, 
          experience: '11 Years',
          location: 'Hyderabad',
          cases: '350+ Cases',
          education: 'NALSAR University'
        },
      ],
      'FSSAI Registration': [
        { 
          id: 'attorney7', 
          name: 'Robert Brown', 
          specialty: 'FSSAI Registration', 
          rating: 4.9, 
          experience: '13 Years',
          location: 'Mumbai',
          cases: '400+ Cases',
          education: 'Government Law College'
        },
        { 
          id: 'attorney8', 
          name: 'Lisa Davis', 
          specialty: 'FSSAI Registration', 
          rating: 4.8, 
          experience: '7 Years',
          location: 'Delhi',
          cases: '180+ Cases',
          education: 'Faculty of Law, DU'
        },
      ],
      'Digital Signatures': [
        { 
          id: 'attorney9', 
          name: 'James Wilson', 
          specialty: 'Digital Signatures', 
          rating: 4.7, 
          experience: '14 Years',
          location: 'Bangalore',
          cases: '450+ Cases',
          education: 'Christ University'
        },
        { 
          id: 'attorney10', 
          name: 'Maria Garcia', 
          specialty: 'Digital Signatures', 
          rating: 4.9, 
          experience: '6 Years',
          location: 'Gurgaon',
          cases: '150+ Cases',
          education: 'Jindal Global Law School'
        },
      ],
    };

    return attorneyMap[watchedService] || [];
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSuccessMessage(
        'Your consultation has been booked successfully! We will contact you shortly to confirm the details.'
      );
      reset();
      setCurrentStep(1);
      window.scrollTo(0, 0);
    } catch (error) {
      setErrorMessage('There was an error submitting your form. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = async () => {
    const stepFields = {
      1: ['service', 'attorney'],
      2: ['date', 'time'],
      3: ['name', 'email', 'phone', 'description'],
    };
    
    const isValid = await trigger(stepFields[currentStep]);
    if (isValid) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };

  const renderProgressSteps = () => {
    const steps = [
      { number: 1, title: 'Choose Service', icon: Briefcase },
      { number: 2, title: 'Schedule', icon: Calendar },
      { number: 3, title: 'Your Details', icon: User },
    ];

    return (
      <div className="flex justify-center items-center mb-12">
        <div className="flex items-center w-full max-w-3xl">
          {steps.map((step, index) => (
            <div key={step.number} className="flex flex-1 items-center">
              <div className={`flex flex-col items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}>
                <div
                  className={`flex items-center justify-center w-14 h-14 rounded-full border-2 transition-all duration-300 ${
                    currentStep === step.number
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 border-transparent text-white shadow-lg scale-110'
                      : currentStep > step.number
                      ? 'bg-gradient-to-r from-green-400 to-green-600 border-transparent text-white shadow-lg'
                      : 'bg-white border-gray-300 text-gray-400 shadow-sm'
                  }`}
                >
                  {currentStep > step.number ? <CheckCircle size={20} /> : <step.icon size={20} />}
                </div>
                <div
                  className={`mt-3 text-center transition-colors duration-300 ${
                    currentStep >= step.number ? 'text-gray-900' : 'text-gray-400'
                  }`}
                >
                  <div className="text-sm font-semibold">{step.title}</div>
                  <div className="text-xs">Step {step.number}</div>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-4 transition-colors duration-300 ${
                    currentStep > step.number ? 'bg-gradient-to-r from-green-400 to-green-600' : 'bg-gray-200'
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderStep1 = () => (
    <div className="space-y-8">
      {/* Service Selection */}
      <Card className="bg-white shadow-lg border border-gray-100">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white mr-4">
              <Briefcase size={24} />
            </div>
            <div>
              <CardTitle className="text-xl text-gray-900">Select Legal Service</CardTitle>
              <CardDescription className="text-gray-600">Choose the area of law you need assistance with</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <Controller
            name="service"
            control={control}
            rules={{ required: 'Please select a service' }}
            render={({ field }) => (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Legal Service</label>
                <select
                  {...field}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                >
                  <option value="">Select a service</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.title}>
                      {service.title}
                    </option>
                  ))}
                </select>
                {errors.service && (
                  <p className="text-red-500 text-sm">{errors.service.message}</p>
                )}
              </div>
            )}
          />
        </CardContent>
      </Card>

      {/* Attorney Selection */}
      <Card className="bg-white shadow-lg border border-gray-100">
        <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl text-white mr-4">
              <Users size={24} />
            </div>
            <div>
              <CardTitle className="text-xl text-gray-900">Choose Your Attorney</CardTitle>
              <CardDescription className="text-gray-600">Select from our expert legal professionals</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {!watchedService ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">👨‍💼</div>
              <p className="text-gray-500 text-lg">Please select a service first to see available attorneys</p>
            </div>
          ) : (
            <Controller
              name="attorney"
              control={control}
              rules={{ required: 'Please select an attorney' }}
              render={({ field }) => (
                <div className="space-y-4">
                  <label className="text-sm font-medium text-gray-700">Select Attorney</label>
                  <div className="grid gap-4">
                    {getAttorneys().map((attorney) => (
                      <Card 
                        key={attorney.id}
                        className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                          field.value === attorney.name
                            ? 'ring-2 ring-blue-500 bg-blue-50 border-blue-200'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                        onClick={() => field.onChange(attorney.name)}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="text-lg font-semibold text-gray-900">{attorney.name}</h3>
                                <div className="flex items-center text-yellow-500">
                                  <Star size={16} fill="currentColor" />
                                  <span className="text-sm font-medium ml-1">{attorney.rating}</span>
                                </div>
                              </div>
                              <p className="text-blue-600 font-medium mb-3">{attorney.specialty}</p>
                              
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-gray-600">
                                <div className="flex items-center">
                                  <Award size={14} className="mr-2 text-purple-500" />
                                  <span>{attorney.experience}</span>
                                </div>
                                <div className="flex items-center">
                                  <MapPin size={14} className="mr-2 text-green-500" />
                                  <span>{attorney.location}</span>
                                </div>
                                <div className="flex items-center">
                                  <Briefcase size={14} className="mr-2 text-orange-500" />
                                  <span>{attorney.cases}</span>
                                </div>
                              </div>
                              
                              <div className="flex items-center mt-2 text-sm text-gray-600">
                                <GraduationCap size={14} className="mr-2 text-indigo-500" />
                                <span>{attorney.education}</span>
                              </div>
                            </div>
                            
                            {field.value === attorney.name && (
                              <div className="ml-4">
                                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                  <CheckCircle size={16} className="text-white" />
                                </div>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  {errors.attorney && (
                    <p className="text-red-500 text-sm">{errors.attorney.message}</p>
                  )}
                </div>
              )}
            />
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          type="button"
          onClick={nextStep}
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
        >
          Continue to Schedule
        </Button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="bg-white shadow-lg border border-gray-100">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl text-white mr-4">
                <Calendar size={24} />
              </div>
              <div>
                <CardTitle className="text-xl text-gray-900">Select Date</CardTitle>
                <CardDescription className="text-gray-600">Choose your preferred consultation date</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <Controller
              name="date"
              control={control}
              rules={{ required: 'Please select a date' }}
              render={({ field }) => (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Consultation Date</label>
                  <Input
                    type="date"
                    min={today}
                    {...field}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.date && (
                    <p className="text-red-500 text-sm">{errors.date.message}</p>
                  )}
                </div>
              )}
            />
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg border border-gray-100">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl text-white mr-4">
                <Clock size={24} />
              </div>
              <div>
                <CardTitle className="text-xl text-gray-900">Select Time</CardTitle>
                <CardDescription className="text-gray-600">Pick your preferred time slot</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <Controller
              name="time"
              control={control}
              rules={{ required: 'Please select a time' }}
              render={({ field }) => (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Time Slot</label>
                  <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto">
                    {timeSlots.map((slot, index) => (
                      <Button
                        key={index}
                        type="button"
                        variant={field.value === slot ? 'default' : 'outline'}
                        className={`p-3 text-sm font-medium ${
                          field.value === slot
                            ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white'
                            : 'border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50 text-gray-700'
                        }`}
                        onClick={() => field.onChange(slot)}
                      >
                        {slot}
                      </Button>
                    ))}
                  </div>
                  {errors.time && (
                    <p className="text-red-500 text-sm">{errors.time.message}</p>
                  )}
                </div>
              )}
            />
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between">
        <Button
          type="button"
          onClick={prevStep}
          variant="outline"
          size="lg"
          className="border-gray-300 text-gray-700 hover:bg-gray-100"
        >
          <ArrowLeft size={18} className="mr-2" /> Previous Step
        </Button>
        <Button
          type="button"
          onClick={nextStep}
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
        >
          Continue to Details
        </Button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-white shadow-lg border border-gray-100">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
            <div className="flex items-center">
              <User className="mr-3 text-green-600" size={20} />
              <CardTitle className="text-lg">Full Name</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <Controller
              name="name"
              control={control}
              rules={{ required: 'Please enter your full name' }}
              render={({ field }) => (
                <div className="space-y-2">
                  <Input
                    placeholder="Enter your full name"
                    {...field}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name.message}</p>
                  )}
                </div>
              )}
            />
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg border border-gray-100">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
            <div className="flex items-center">
              <Mail className="mr-3 text-blue-600" size={20} />
              <CardTitle className="text-lg">Email Address</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <Controller
              name="email"
              control={control}
              rules={{
                required: 'Please enter your email',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Please enter a valid email address',
                },
              }}
              render={({ field }) => (
                <div className="space-y-2">
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    {...field}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email.message}</p>
                  )}
                </div>
              )}
            />
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white shadow-lg border border-gray-100">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50">
          <div className="flex items-center">
            <Phone className="mr-3 text-purple-600" size={20} />
            <CardTitle className="text-lg">Phone Number</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <Controller
            name="phone"
            control={control}
            rules={{
              required: 'Please enter your phone number',
              pattern: {
                value: /^\d{10,}$/,
                message: 'Phone number must have at least 10 digits',
              },
            }}
            render={({ field }) => (
              <div className="space-y-2">
                <Input
                  type="tel"
                  placeholder="(123) 456-7890"
                  {...field}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
                <p className="text-xs text-gray-500 flex items-center">
                  <Shield size={12} className="mr-1" />
                  We will send booking confirmation via WhatsApp to this number
                </p>
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}
              </div>
            )}
          />
        </CardContent>
      </Card>

      <Card className="bg-white shadow-lg border border-gray-100">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
          <div className="flex items-center">
            <FileText className="mr-3 text-orange-600" size={20} />
            <CardTitle className="text-lg">Brief Description of Your Legal Issue</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <Controller
            name="description"
            control={control}
            rules={{
              required: 'Please describe your legal issue',
              minLength: {
                value: 10,
                message: 'Please provide more details (at least 10 characters)',
              },
            }}
            render={({ field }) => (
              <div className="space-y-2">
                <Textarea
                  placeholder="Please provide details about your legal issue so we can better assist you..."
                  rows={5}
                  {...field}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
                />
                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-500">
                    {field.value?.length || 0}/500 characters
                  </p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Shield size={12} className="mr-1" />
                    Your information is secure and confidential
                  </div>
                </div>
                {errors.description && (
                  <p className="text-red-500 text-sm">{errors.description.message}</p>
                )}
              </div>
            )}
          />
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button
          type="button"
          onClick={prevStep}
          variant="outline"
          size="lg"
          className="border-gray-300 text-gray-700 hover:bg-gray-100"
        >
          <ArrowLeft size={18} className="mr-2" /> Previous Step
        </Button>
        <Button
          type="submit"
          size="lg"
          className={`bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white flex items-center ${
            isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Booking...
            </>
          ) : (
            <>
              <CheckCircle size={18} className="mr-2" />
              Book Your Consultation
            </>
          )}
        </Button>
      </div>
    </form>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">

      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Book Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Legal Consultation
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Get expert legal advice from our experienced attorneys. Connect with qualified professionals who understand
              your needs and provide personalized solutions.
            </p>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600 mb-8">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-green-100 rounded-full">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <span>500+ Expert Lawyers</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Shield className="w-4 h-4 text-blue-600" />
                </div>
                <span>100% Confidential</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-purple-100 rounded-full">
                  <Zap className="w-4 h-4 text-purple-600" />
                </div>
                <span>Quick Response</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        {successMessage && (
          <Alert className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-800 mb-8">
            <CheckCircle className="w-6 h-6" />
            <AlertDescription className="ml-3">
              <h3 className="text-lg font-semibold">Consultation Booked Successfully!</h3>
              <div className="mt-2 text-sm">
                <p>{successMessage}</p>
                <div className="flex flex-wrap gap-4 mt-4">
                  <Button
                    onClick={() => {
                      setSuccessMessage('');
                      setCurrentStep(1);
                    }}
                    className="bg-green-600 text-white hover:bg-green-700"
                  >
                    Book Another Consultation
                  </Button>
                  <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-50">
                    View Booking Details
                  </Button>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Error Message */}
        {errorMessage && (
          <Alert className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 text-red-800 mb-8">
            <AlertCircle className="w-6 h-6" />
            <AlertDescription className="ml-3">
              <h3 className="text-lg font-semibold">Booking Failed</h3>
              <div className="mt-2 text-sm">
                <p>{errorMessage}</p>
                <Button
                  onClick={() => setErrorMessage('')}
                  className="bg-red-600 text-white hover:bg-red-700 mt-4"
                >
                  Try Again
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Progress Steps */}
        {!successMessage && renderProgressSteps()}

        {/* Form Steps */}
        <div className="mt-8">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
        </div>

        {/* Features Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <Card className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardContent className="pt-0">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl text-white w-fit mx-auto mb-4">
                <Shield size={24} />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Secure & Confidential</h4>
              <p className="text-gray-600 text-sm">Your information is protected with bank-level security</p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardContent className="pt-0">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-white w-fit mx-auto mb-4">
                <Zap size={24} />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Quick Response</h4>
              <p className="text-gray-600 text-sm">Get connected with an attorney within 24 hours</p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50">
            <CardContent className="pt-0">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl text-white w-fit mx-auto mb-4">
                <Award size={24} />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Expert Attorneys</h4>
              <p className="text-gray-600 text-sm">Work with qualified and experienced legal professionals</p>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* Footer */}
      <Footer className="mt-16 bg-white shadow-lg border-t border-gray-200" />
      {/* Header */}
    </div>
  );
};

export default Consultation;