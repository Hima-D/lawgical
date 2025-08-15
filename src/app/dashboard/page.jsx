// pages/dashboard.jsx (Server Component)
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@/generated/prisma";
import DashboardClient from "@/components/dashboard/dashboardclient";
import AuthError from "@/components/dashboard/AuthError";

const prisma = new PrismaClient();

export default async function Dashboard() {
  // Server-side authentication logic
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return <AuthError message="No authentication token found. Please sign in." />;
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.error("JWT verification failed:", err);
    return <AuthError message="Your session has expired. Please sign in again." />;
  }

  // Fetch user data from database
  const user = await prisma.user.findUnique({
    where: { id: decoded.userId },
    include: {
      lawyerProfile: {
        include: {
          services: true,
          appointments: {
            include: {
              client: true,
              service: true,
            },
            orderBy: { createdAt: "desc" },
          },
          availability: true,
          reviews: {
            include: {
              client: true,
            },
            orderBy: { createdAt: "desc" },
            take: 5,
          },
        },
      },
      appointments: {
        include: {
          lawyerProfile: {
            include: {
              user: true,
            },
          },
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

  if (!user) {
    return <AuthError message="The user account could not be found." />;
  }

  const isLawyer = user.userType === "lawyer";

  // Calculate statistics
  const stats = isLawyer
    ? {
        totalServices: user.lawyerProfile?.services.length || 0,
        totalAppointments: user.lawyerProfile?.appointments.length || 0,
        pendingAppointments:
          user.lawyerProfile?.appointments.filter(
            (apt) => apt.status === "pending"
          ).length || 0,
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

  // Pass data to client component
  return (
    <DashboardClient 
      user={user} 
      isLawyer={isLawyer} 
      stats={stats} 
    />
  );
}