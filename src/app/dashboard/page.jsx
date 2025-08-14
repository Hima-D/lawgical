import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { PrismaClient } from '@/generated/prisma';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  CalendarDays, Users, DollarSign, Clock, Plus, Settings, Bell, Search, 
  LogOut, Home, Calendar, UserCheck, FileText, MessageSquare, HelpCircle,
  Menu, X, Star, Filter, ChevronRight, TrendingUp, Activity, Briefcase,
  MapPin, Phone, Mail, Globe, Award, BookOpen, Languages, Clock4
} from "lucide-react";

const prisma = new PrismaClient();

export default async function Page() {
  // Await the cookies() function before using it
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Access Denied</CardTitle>
            <CardDescription className="text-center">
              No authentication token found. Please sign in.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button>Sign In</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.error("JWT verification failed:", err);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Invalid Token</CardTitle>
            <CardDescription className="text-center">
              Your session has expired. Please sign in again.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button>Sign In</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Fetch user with all related data
  const user = await prisma.user.findUnique({
    where: { id: decoded.userId },
    include: {
      lawyerProfile: {
        include: {
          services: true,
          appointments: {
            include: {
              client: true,
              service: true
            },
            orderBy: { createdAt: 'desc' }
          },
          availability: true,
          reviews: {
            include: {
              client: true
            },
            orderBy: { createdAt: 'desc' },
            take: 5
          }
        }
      },
      appointments: {
        include: {
          lawyerProfile: {
            include: {
              user: true
            }
          },
          service: true
        },
        orderBy: { createdAt: 'desc' }
      },
      notifications: {
        where: { isRead: false },
        take: 10,
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">User Not Found</CardTitle>
            <CardDescription className="text-center">
              The user account could not be found.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const isLawyer = user.userType === 'lawyer';
  const isClient = user.userType === 'client';

  // Dashboard Statistics
  const stats = isLawyer ? {
    totalServices: user.lawyerProfile?.services.length || 0,
    totalAppointments: user.lawyerProfile?.appointments.length || 0,
    pendingAppointments: user.lawyerProfile?.appointments.filter(apt => apt.status === 'pending').length || 0,
    monthlyRevenue: user.lawyerProfile?.appointments
      .filter(apt => apt.status === 'completed')
      .reduce((sum, apt) => sum + apt.service.price, 0) || 0,
    todayAppointments: user.lawyerProfile?.appointments.filter(apt => {
      const today = new Date().toDateString();
      return new Date(apt.appointmentDate).toDateString() === today;
    }).length || 0,
    averageRating: user.lawyerProfile?.reviews.length > 0 
      ? (user.lawyerProfile.reviews.reduce((sum, review) => sum + review.rating, 0) / user.lawyerProfile.reviews.length).toFixed(1)
      : 0,
    totalReviews: user.lawyerProfile?.reviews.length || 0
  } : {
    totalAppointments: user.appointments.length || 0,
    upcomingAppointments: user.appointments.filter(apt => 
      apt.status === 'confirmed' && new Date(apt.appointmentDate) > new Date()
    ).length || 0,
    completedAppointments: user.appointments.filter(apt => apt.status === 'completed').length || 0,
    totalSpent: user.appointments
      .filter(apt => apt.status === 'completed')
      .reduce((sum, apt) => sum + apt.service.price, 0) || 0
  };

  // Sample lawyers data for client view (in real app, fetch from database)
  const sampleLawyers = [
    {
      id: 1,
      name: "Sarah Johnson",
      specialization: "Corporate Law",
      rating: 4.9,
      reviews: 127,
      hourlyRate: 350,
      experience: "15+ years",
      location: "New York, NY",
      avatar: null,
      verified: true
    },
    {
      id: 2,
      name: "Michael Chen",
      specialization: "Immigration Law",
      rating: 4.8,
      reviews: 89,
      hourlyRate: 275,
      experience: "10+ years",
      location: "Los Angeles, CA",
      avatar: null,
      verified: true
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      specialization: "Family Law",
      rating: 4.9,
      reviews: 156,
      hourlyRate: 300,
      experience: "12+ years",
      location: "Chicago, IL",
      avatar: null,
      verified: true
    }
  ];

  // Sidebar navigation items
  const sidebarItems = isLawyer ? [
    { icon: Home, label: "Dashboard", href: "/dashboard", active: true },
    { icon: Calendar, label: "Appointments", href: "/appointments" },
    { icon: Briefcase, label: "Services", href: "/services" },
    { icon: Users, label: "Clients", href: "/clients" },
    { icon: Activity, label: "Availability", href: "/availability" },
    { icon: TrendingUp, label: "Analytics", href: "/analytics" },
    { icon: MessageSquare, label: "Messages", href: "/messages" },
    { icon: FileText, label: "Documents", href: "/documents" },
    { icon: Settings, label: "Settings", href: "/settings" }
  ] : [
    { icon: Home, label: "Dashboard", href: "/dashboard", active: true },
    { icon: Calendar, label: "My Appointments", href: "/appointments" },
    { icon: Search, label: "Find Lawyers", href: "/lawyers" },
    { icon: MessageSquare, label: "Messages", href: "/messages" },
    { icon: FileText, label: "Documents", href: "/documents" },
    { icon: HelpCircle, label: "Legal Help", href: "/help" },
    { icon: Settings, label: "Settings", href: "/settings" }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white border-r border-gray-200">
          <div className="flex items-center flex-shrink-0 px-4">
            <h1 className="text-xl font-bold text-gray-900">Lawgical</h1>
            <Badge variant={isLawyer ? "default" : "secondary"} className="ml-2">
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
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  {item.label}
                  {item.active && <ChevronRight className="ml-auto h-4 w-4" />}
                </a>
              ))}
            </nav>

            {/* User Profile in Sidebar */}
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
                  <Button variant="ghost" size="sm" type="submit" className="ml-2">
                    <LogOut className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <header className="md:hidden bg-white shadow-sm border-b">
          <div className="px-4 sm:px-6">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
                <h1 className="text-xl font-bold text-gray-900">LegalHub</h1>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-4 w-4" />
                  {user.notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                      {user.notifications.length}
                    </span>
                  )}
                </Button>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.photoUrl} />
                  <AvatarFallback className="text-xs">
                    {user.displayName?.charAt(0) || user.email.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </header>

        {/* Desktop Header */}
        <header className="hidden md:block bg-white shadow-sm border-b">
          <div className="px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <h2 className="text-2xl font-semibold text-gray-900">Dashboard</h2>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 w-64"
                  />
                </div>
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-4 w-4" />
                  {user.notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                      {user.notifications.length}
                    </span>
                  )}
                  <span className="sr-only">Notifications</span>
                </Button>
                <form action="/api/logout" method="POST">
                  <Button variant="ghost" size="sm" type="submit">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 px-6 lg:px-8 py-8 overflow-y-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user.displayName || user.email}!
            </h2>
            <p className="text-gray-600">
              {isLawyer 
                ? "Manage your legal services and client appointments" 
                : "Find legal services and manage your appointments"
              }
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {isLawyer ? (
              <>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Services</CardTitle>
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalServices}</div>
                    <p className="text-xs text-muted-foreground">Active legal services</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalAppointments}</div>
                    <p className="text-xs text-muted-foreground">All time appointments</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Rating</CardTitle>
                    <Star className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.averageRating}</div>
                    <p className="text-xs text-muted-foreground">{stats.totalReviews} reviews</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${stats.monthlyRevenue}</div>
                    <p className="text-xs text-muted-foreground">From completed appointments</p>
                  </CardContent>
                </Card>
              </>
            ) : (
              <>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalAppointments}</div>
                    <p className="text-xs text-muted-foreground">All appointments</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.upcomingAppointments}</div>
                    <p className="text-xs text-muted-foreground">Confirmed appointments</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Completed</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.completedAppointments}</div>
                    <p className="text-xs text-muted-foreground">Sessions completed</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${stats.totalSpent}</div>
                    <p className="text-xs text-muted-foreground">On legal services</p>
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          {/* Tabbed Content */}
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
              <TabsTrigger value={isLawyer ? "services" : "lawyers"}>
                {isLawyer ? "Services" : "Find Lawyers"}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {isLawyer ? (
                  <>
                    {/* Quick Actions */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription>Manage your practice efficiently</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <Button className="w-full justify-start">
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

                    {/* Recent Reviews */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Recent Reviews</CardTitle>
                        <CardDescription>What clients are saying about you</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {user.lawyerProfile?.reviews.slice(0, 3).map((review) => (
                            <div key={review.id} className="border-b pb-4 last:border-b-0">
                              <div className="flex items-start space-x-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={review.client.photoUrl} />
                                  <AvatarFallback className="text-xs">
                                    {review.client.displayName?.charAt(0) || review.client.email.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <p className="text-sm font-medium">
                                      {review.client.displayName || review.client.email}
                                    </p>
                                    <div className="flex items-center">
                                      {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`h-3 w-3 ${
                                          i < review.rating 
                                            ? "fill-yellow-400 text-yellow-400" 
                                            : "text-gray-300"
                                        }`} />
                                      ))}
                                    </div>
                                  </div>
                                  {review.comment && (
                                    <p className="text-sm text-gray-600">{review.comment}</p>
                                  )}
                                  <p className="text-xs text-gray-500 mt-1">
                                    {new Date(review.createdAt).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                          {user.lawyerProfile?.reviews.length === 0 && (
                            <div className="text-center py-8">
                              <Star className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                              <p className="text-gray-500 mb-4">No reviews yet</p>
                              <p className="text-sm text-gray-400">Complete your first appointment to get reviews</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </>
                ) : (
                  <>
                    {/* Recommended Lawyers */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Recommended Lawyers</CardTitle>
                        <CardDescription>Top-rated lawyers in your area</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {sampleLawyers.slice(0, 2).map((lawyer) => (
                            <div key={lawyer.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                              <Avatar className="h-12 w-12">
                                <AvatarImage src={lawyer.avatar} />
                                <AvatarFallback>{lawyer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                  <p className="font-medium">{lawyer.name}</p>
                                  {lawyer.verified && (
                                    <Badge variant="outline" className="text-xs">
                                      <UserCheck className="h-3 w-3 mr-1" />
                                      Verified
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-gray-500">{lawyer.specialization}</p>
                                <div className="flex items-center space-x-4 mt-1">
                                  <div className="flex items-center space-x-1">
                                    {[...Array(5)].map((_, i) => (
                                      <Star key={i} className={`h-3 w-3 ${
                                        i < Math.floor(lawyer.rating)
                                          ? "fill-yellow-400 text-yellow-400"
                                          : "text-gray-300"
                                      }`} />
                                    ))}
                                    <span className="text-xs text-gray-500 ml-1">
                                      {lawyer.rating} ({lawyer.reviews})
                                    </span>
                                  </div>
                                  <div className="flex items-center text-xs text-gray-500">
                                    <MapPin className="h-3 w-3 mr-1" />
                                    {lawyer.location}
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold">${lawyer.hourlyRate}/hr</p>
                                <Button size="sm" className="mt-2">Book</Button>
                              </div>
                            </div>
                          ))}
                          <Button variant="outline" className="w-full">
                            View All Lawyers
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Legal Resources */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Legal Resources</CardTitle>
                        <CardDescription>Helpful information and tools</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <Button variant="outline" className="w-full justify-start">
                            <FileText className="h-4 w-4 mr-2" />
                            Legal Document Templates
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <HelpCircle className="h-4 w-4 mr-2" />
                            FAQ & Legal Guides
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Free Legal Consultation
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <Clock4 className="h-4 w-4 mr-2" />
                            Emergency Legal Help
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </>
                )}
              </div>
            </TabsContent>

            <TabsContent value="appointments" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>
                        {isLawyer ? "Client Appointments" : "Your Appointments"}
                      </CardTitle>
                      <CardDescription>
                        {isLawyer ? "Manage your client meetings" : "View your scheduled consultations"}
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
                    {(isLawyer ? user.lawyerProfile?.appointments : user.appointments)?.slice(0, 6).map((appointment) => (
                      <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarImage src={
                              isLawyer 
                                ? appointment.client?.photoUrl 
                                : appointment.lawyerProfile?.user?.photoUrl
                            } />
                            <AvatarFallback>
                              {isLawyer 
                                ? (appointment.client?.displayName?.charAt(0) || appointment.client?.email.charAt(0))
                                : (appointment.lawyerProfile?.user?.displayName?.charAt(0) || appointment.lawyerProfile?.user?.email.charAt(0))
                              }
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">
                              {isLawyer 
                                ? (appointment.client?.displayName || appointment.client?.email)
                                : (appointment.lawyerProfile?.user?.displayName || appointment.lawyerProfile?.user?.email)
                              }
                            </p>
                            <p className="text-sm text-gray-500">{appointment.service.name}</p>
                            <p className="text-xs text-gray-400">
                              {new Date(appointment.appointmentDate).toLocaleDateString()} at {appointment.appointmentTime}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge variant={
                            appointment.status === 'confirmed' ? 'default' :
                            appointment.status === 'pending' ? 'secondary' :
                            appointment.status === 'completed' ? 'outline' : 'destructive'
                          }>
                            {appointment.status}
                          </Badge>
                          <div className="text-right">
                            <p className="font-semibold">${appointment.service.price}</p>
                            <p className="text-xs text-gray-500">{appointment.service.durationMinutes}min</p>
                          </div>
                          <Button variant="ghost" size="sm">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    {((isLawyer ? user.lawyerProfile?.appointments : user.appointments)?.length || 0) === 0 && (
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
            </TabsContent>

            <TabsContent value={isLawyer ? "services" : "lawyers"} className="space-y-4">
              {isLawyer ? (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Your Legal Services</CardTitle>
                        <CardDescription>Manage your service offerings</CardDescription>
                      </div>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Service
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {user.lawyerProfile?.services.map((service) => (
                        <div key={service.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="font-medium">{service.name}</h4>
                              <Badge variant={service.isActive ? "default" : "secondary"}>
                                {service.isActive ? "Active" : "Inactive"}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{service.description}</p>
                            <div className="flex items-center space-x-4 mt-3">
                              <Badge variant="outline">{service.category || "General"}</Badge>
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
                              <Button variant="outline" size="sm">Edit</Button>
                              <Button variant="ghost" size="sm">
                                <Settings className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                      {(user.lawyerProfile?.services.length || 0) === 0 && (
                        <div className="text-center py-12">
                          <Briefcase className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                          <p className="text-gray-500 mb-4">No services created yet</p>
                          <p className="text-sm text-gray-400 mb-6">Start by creating your first legal service to attract clients</p>
                          <Button>Create Your First Service</Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Find Legal Experts</CardTitle>
                        <CardDescription>Browse and connect with qualified lawyers</CardDescription>
                      </div>
                      <Button variant="outline">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <div className="flex space-x-4">
                        <div className="flex-1">
                          <Label htmlFor="search-lawyers">Search Lawyers</Label>
                          <div className="relative mt-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              id="search-lawyers"
                              type="text"
                              placeholder="Search by name or specialization..."
                              className="pl-10"
                            />
                          </div>
                        </div>
                        <div className="w-48">
                          <Label htmlFor="specialization">Specialization</Label>
                          <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                            <option>All Specializations</option>
                            <option>Corporate Law</option>
                            <option>Criminal Law</option>
                            <option>Family Law</option>
                            <option>Real Estate Law</option>
                            <option>Immigration Law</option>
                            <option>Intellectual Property</option>
                            <option>Personal Injury</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {sampleLawyers.map((lawyer) => (
                        <div key={lawyer.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex items-center space-x-4">
                            <Avatar className="h-16 w-16">
                              <AvatarImage src={lawyer.avatar} />
                              <AvatarFallback className="text-lg font-semibold">
                                {lawyer.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h4 className="font-semibold text-lg">{lawyer.name}</h4>
                                {lawyer.verified && (
                                  <Badge variant="default" className="text-xs">
                                    <UserCheck className="h-3 w-3 mr-1" />
                                    Verified
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{lawyer.specialization}</p>
                              <div className="flex items-center space-x-4 mb-2">
                                <div className="flex items-center space-x-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < Math.floor(lawyer.rating)
                                          ? "fill-yellow-400 text-yellow-400"
                                          : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                  <span className="text-sm text-gray-500 ml-1">
                                    {lawyer.rating} ({lawyer.reviews} reviews)
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <div className="flex items-center">
                                  <Award className="h-4 w-4 mr-1" />
                                  {lawyer.experience}
                                </div>
                                <div className="flex items-center">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  {lawyer.location}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-2xl">${lawyer.hourlyRate}</p>
                            <p className="text-sm text-gray-500 mb-3">per hour</p>
                            <div className="flex space-x-2">
                              <Button size="sm" className="min-w-[120px]">Book Consultation</Button>
                              <Button variant="outline" size="sm">View Profile</Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 text-center">
                      <Button variant="outline" size="lg">Load More Lawyers</Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>

          {/* Lawyer Profile Section - Only for lawyers */}
          {isLawyer && user.lawyerProfile && (
            <Card className="mt-8">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Professional Profile</CardTitle>
                    <CardDescription>Your public profile information</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Specialization</Label>
                    <p className="mt-1 font-medium">{user.lawyerProfile.specialization}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">License Number</Label>
                    <p className="mt-1 font-medium">{user.lawyerProfile.licenseNumber}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Hourly Rate</Label>
                    <p className="mt-1 font-medium">${user.lawyerProfile.hourlyRate || 'Not set'}</p>
                  </div>
                  {user.lawyerProfile.firmName && (
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Law Firm</Label>
                      <p className="mt-1 font-medium">{user.lawyerProfile.firmName}</p>
                    </div>
                  )}
                  {user.lawyerProfile.address && (
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Office Address</Label>
                      <p className="mt-1 font-medium">{user.lawyerProfile.address}</p>
                    </div>
                  )}
                  {user.lawyerProfile.websiteUrl && (
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Website</Label>
                      <p className="mt-1 font-medium text-blue-600 hover:text-blue-800">
                        <a href={user.lawyerProfile.websiteUrl} target="_blank" rel="noopener noreferrer">
                          {user.lawyerProfile.websiteUrl}
                        </a>
                      </p>
                    </div>
                  )}
                  {user.lawyerProfile.yearsExperience && (
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Experience</Label>
                      <p className="mt-1 font-medium">{user.lawyerProfile.yearsExperience}+ years</p>
                    </div>
                  )}
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Member Since</Label>
                    <p className="mt-1 font-medium">
                      {new Date(user.lawyerProfile.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Total Services</Label>
                    <p className="mt-1 font-medium">{user.lawyerProfile.services.length} Services</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Profile Status</Label>
                    <div className="flex items-center mt-1">
                      <p className="font-medium mr-2">
                        {Math.round(
                          ((user.lawyerProfile.bio ? 1 : 0) +
                          (user.lawyerProfile.firmName ? 1 : 0) +
                          (user.lawyerProfile.address ? 1 : 0) +
                          (user.lawyerProfile.websiteUrl ? 1 : 0) +
                          (user.lawyerProfile.hourlyRate ? 1 : 0) +
                          (user.lawyerProfile.services.length > 0 ? 1 : 0)) / 6 * 100
                        )}% Complete
                      </p>
                      {user.lawyerProfile.isVerified && (
                        <Badge variant="default" className="text-xs">
                          <UserCheck className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* Education & Certifications */}
                {(user.lawyerProfile.education?.length > 0 || user.lawyerProfile.certifications?.length > 0) && (
                  <>
                    <Separator className="my-6" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {user.lawyerProfile.education?.length > 0 && (
                        <div>
                          <Label className="text-sm font-medium text-gray-500">Education</Label>
                          <div className="mt-2 space-y-1">
                            {user.lawyerProfile.education.map((edu, index) => (
                              <div key={index} className="flex items-center">
                                <BookOpen className="h-4 w-4 text-gray-400 mr-2" />
                                <p className="text-sm">{edu}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {user.lawyerProfile.certifications?.length > 0 && (
                        <div>
                          <Label className="text-sm font-medium text-gray-500">Certifications</Label>
                          <div className="mt-2 space-y-1">
                            {user.lawyerProfile.certifications.map((cert, index) => (
                              <div key={index} className="flex items-center">
                                <Award className="h-4 w-4 text-gray-400 mr-2" />
                                <p className="text-sm">{cert}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}

                {/* Languages */}
                {user.lawyerProfile.languages?.length > 0 && (
                  <>
                    <Separator className="my-6" />
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Languages</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {user.lawyerProfile.languages.map((language, index) => (
                          <Badge key={index} variant="outline" className="flex items-center">
                            <Languages className="h-3 w-3 mr-1" />
                            {language}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Professional Bio */}
                {user.lawyerProfile.bio && (
                  <>
                    <Separator className="my-6" />
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Professional Bio</Label>
                      <p className="mt-2 text-gray-700 leading-relaxed">{user.lawyerProfile.bio}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          )}

          {/* Recent Notifications */}
          <Card className="mt-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Notifications</CardTitle>
                  <CardDescription>Stay updated with your latest activities</CardDescription>
                </div>
                {user.notifications.length > 0 && (
                  <Button variant="outline" size="sm">Mark All Read</Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user.notifications.length > 0 ? (
                  user.notifications.slice(0, 5).map((notification) => (
                    <div key={notification.id} className="flex items-start space-x-4 p-3 bg-blue-50 rounded-lg">
                      <div className="bg-blue-100 p-2 rounded-full">
                        {notification.type === 'appointment' && <CalendarDays className="h-4 w-4 text-blue-600" />}
                        {notification.type === 'payment' && <DollarSign className="h-4 w-4 text-green-600" />}
                        {notification.type === 'message' && <MessageSquare className="h-4 w-4 text-purple-600" />}
                        {notification.type === 'system' && <Bell className="h-4 w-4 text-gray-600" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{notification.title}</p>
                        <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(notification.createdAt).toLocaleDateString()} {new Date(notification.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-2">No new notifications</p>
                    <p className="text-sm text-gray-400">We'll notify you when something important happens</p>
                  </div>
                )}
                
                {user.notifications.length > 5 && (
                  <div className="text-center mt-4">
                    <Button variant="outline" size="sm">View All Notifications</Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}