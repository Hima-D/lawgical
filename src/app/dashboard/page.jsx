import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@/generated/prisma";
import DashboardClient from "@/components/dashboard/dashboardclient";
import NotificationsPage from "@/components/dashboard/NotificationsPage";
import AuthError from "@/components/dashboard/AuthError";

export default async function Dashboard({ searchParams }) {
  const prisma = new PrismaClient();

  const view = (await searchParams).view || null;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    await prisma.$disconnect();
    return <AuthError message="No authentication token found. Please sign in." />;
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.error("JWT verification failed:", err);
    await prisma.$disconnect();
    return <AuthError message="Your session has expired. Please sign in again." />;
  }

  const user = await prisma.user.findUnique({
    where: { id: decoded.userId },
    select: {
      id: true,
      userType: true,
      displayName: true,
      email: true,
      lawyerProfile: {
        include: {
          services: true,
          appointments: {
            include: {
              client: { select: { displayName: true, email: true } },
              service: true,
            },
            orderBy: { createdAt: "desc" },
          },
          availability: true,
          reviews: {
            include: { client: { select: { displayName: true } } },
            orderBy: { createdAt: "desc" },
            take: 5,
          },
        },
      },
      appointments: {
        include: {
          lawyerProfile: { include: { user: { select: { displayName: true } } } },
          service: true,
        },
        orderBy: { createdAt: "desc" },
      },
      notifications: {
        where: { isRead: false },
        take: 10,
        orderBy: { createdAt: "desc" },
      },
    },
  });

  await prisma.$disconnect();

  if (!user) {
    return <AuthError message="The user account could not be found." />;
  }

  const isLawyer = user.userType === "lawyer";

  const stats = isLawyer
    ? {
        totalAppointments: user.lawyerProfile?.appointments.length || 0,
        upcomingAppointments:
          user.lawyerProfile?.appointments.filter(
            (apt) =>
              apt.status === "confirmed" &&
              new Date(apt.appointmentDate) > new Date()
          ).length || 0,
        pendingAppointments:
          user.lawyerProfile?.appointments.filter(
            (apt) => apt.status === "pending"
          ).length || 0,
        completedAppointments:
          user.lawyerProfile?.appointments.filter(
            (apt) => apt.status === "completed"
          ).length || 0,
        totalServices: user.lawyerProfile?.services.length || 0,
        monthlyRevenue:
          user.lawyerProfile?.appointments
            .filter((apt) => apt.status === "completed")
            .reduce((sum, apt) => sum + apt.service.price, 0) || 0,
        todayAppointments:
          user.lawyerProfile?.appointments.filter((apt) => {
            const today = new Date().toDateString();
            return new Date(apt.appointmentDate).toDateString() === today;
          }).length || 0,
        averageRating:
          user.lawyerProfile?.reviews.length > 0
            ? (
                user.lawyerProfile.reviews.reduce(
                  (sum, review) => sum + review.rating,
                  0
                ) / user.lawyerProfile.reviews.length
              ).toFixed(1)
            : 0,
        totalReviews: user.lawyerProfile?.reviews.length || 0,
      }
    : {
        totalAppointments: user.appointments.length || 0,
        upcomingAppointments:
          user.appointments.filter(
            (apt) =>
              apt.status === "confirmed" &&
              new Date(apt.appointmentDate) > new Date()
          ).length || 0,
        completedAppointments:
          user.appointments.filter((apt) => apt.status === "completed")
            .length || 0,
        totalSpent:
          user.appointments
            .filter((apt) => apt.status === "completed")
            .reduce((sum, apt) => sum + apt.service.price, 0) || 0,
      };

  if (view === "notifications") {
    return <NotificationsPage token={token} />;
  }

  return (
    <DashboardClient 
      user={user} 
      isLawyer={isLawyer} 
      stats={stats} 
      token={token}
    />
  );
}
