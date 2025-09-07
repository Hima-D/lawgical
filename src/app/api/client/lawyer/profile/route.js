// app/api/lawyer/profile/route.js
import { PrismaClient } from '@/generated/prisma';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

// Middleware to verify JWT and get user
async function verifyAuth() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');
    
    if (!token) {
      throw new Error('No token provided');
    }

    const decoded = jwt.verify(token.value, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
}

// Validation helper
function validateProfileData(data) {
  const errors = [];
  
  if (data.specialization && (data.specialization.length < 2 || data.specialization.length > 100)) {
    errors.push('Specialization must be between 2-100 characters');
  }
  
  if (data.licenseNumber && (data.licenseNumber.length < 5 || data.licenseNumber.length > 50)) {
    errors.push('License number must be between 5-50 characters');
  }
  
  if (data.firmName && data.firmName.length > 200) {
    errors.push('Firm name cannot exceed 200 characters');
  }
  
  if (data.address && data.address.length > 300) {
    errors.push('Address cannot exceed 300 characters');
  }
  
  if (data.websiteUrl && !isValidUrl(data.websiteUrl)) {
    errors.push('Please provide a valid website URL');
  }
  
  if (data.hourlyRate && (isNaN(data.hourlyRate) || data.hourlyRate < 0 || data.hourlyRate > 10000)) {
    errors.push('Hourly rate must be a number between 0-10000');
  }
  
  if (data.yearsExperience && (isNaN(data.yearsExperience) || data.yearsExperience < 0 || data.yearsExperience > 70)) {
    errors.push('Years of experience must be between 0-70');
  }
  
  if (data.bio && data.bio.length > 2000) {
    errors.push('Bio cannot exceed 2000 characters');
  }
  
  return errors;
}

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

// Calculate completion percentage
function calculateCompletionPercentage(profile) {
  const requiredFields = [
    profile.bio,
    profile.firmName,
    profile.address,
    profile.websiteUrl,
    profile.hourlyRate,
    profile.services && profile.services.length > 0
  ];
  
  const completedFields = requiredFields.filter(field => !!field).length;
  return Math.round((completedFields / requiredFields.length) * 100);
}

// Create lawyer profile
export async function POST(request) {
  try {
    const user = await verifyAuth();
    
    if (user.userType !== 'lawyer') {
      return Response.json(
        { 
          success: false,
          error: 'Only lawyers can create lawyer profiles' 
        },
        { status: 403 }
      );
    }

    const data = await request.json();
    const {
      bio,
      specialization,
      licenseNumber,
      firmName,
      address,
      websiteUrl,
      hourlyRate,
      yearsExperience,
      education,
      certifications,
      languages
    } = data;

    // Validation
    if (!specialization || !licenseNumber) {
      return Response.json(
        { 
          success: false,
          error: 'Specialization and license number are required' 
        },
        { status: 400 }
      );
    }

    const validationErrors = validateProfileData(data);
    if (validationErrors.length > 0) {
      return Response.json(
        { 
          success: false,
          error: 'Validation failed',
          errors: validationErrors 
        },
        { status: 400 }
      );
    }

    // Check if lawyer profile already exists
    const existingProfile = await prisma.lawyerProfile.findUnique({
      where: { userId: user.userId }
    });

    if (existingProfile) {
      return Response.json(
        { 
          success: false,
          error: 'Lawyer profile already exists. Use PUT to update.' 
        },
        { status: 409 }
      );
    }

    // Check if license number is already taken
    const existingLicense = await prisma.lawyerProfile.findUnique({
      where: { licenseNumber: licenseNumber.trim() }
    });

    if (existingLicense) {
      return Response.json(
        { 
          success: false,
          error: 'License number already exists' 
        },
        { status: 409 }
      );
    }

    // Create lawyer profile
    const lawyerProfile = await prisma.lawyerProfile.create({
      data: {
        userId: user.userId,
        bio: bio?.trim() || null,
        specialization: specialization.trim(),
        licenseNumber: licenseNumber.trim(),
        firmName: firmName?.trim() || null,
        address: address?.trim() || null,
        websiteUrl: websiteUrl?.trim() || null,
        hourlyRate: hourlyRate ? parseFloat(hourlyRate) : null,
        yearsExperience: yearsExperience ? parseInt(yearsExperience) : null,
        education: Array.isArray(education) ? education.filter(e => e?.trim()) : [],
        certifications: Array.isArray(certifications) ? certifications.filter(c => c?.trim()) : [],
        languages: Array.isArray(languages) ? languages.filter(l => l?.trim()) : [],
        isVerified: false
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            displayName: true,
            photoUrl: true,
            createdAt: true
          }
        },
        services: {
          where: { isActive: true },
          select: {
            id: true,
            name: true,
            description: true,
            price: true,
            durationMinutes: true,
            category: true
          }
        }
      }
    });

    const completionPercentage = calculateCompletionPercentage(lawyerProfile);

    return Response.json(
      {
        success: true,
        message: 'Lawyer profile created successfully',
        data: {
          profile: lawyerProfile,
          completionPercentage
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Create lawyer profile error:', error);
    
    if (error.message === 'Invalid token' || error.message === 'No token provided') {
      return Response.json(
        { 
          success: false,
          error: 'Authentication required' 
        },
        { status: 401 }
      );
    }

    if (error.code === 'P2002') {
      return Response.json(
        { 
          success: false,
          error: 'License number already exists' 
        },
        { status: 409 }
      );
    }

    return Response.json(
      { 
        success: false,
        error: 'Internal server error' 
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Get lawyer profile
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return Response.json(
        { 
          success: false,
          error: 'User ID is required' 
        },
        { status: 400 }
      );
    }

    const lawyerProfile = await prisma.lawyerProfile.findUnique({
      where: { userId: parseInt(userId) },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            displayName: true,
            photoUrl: true,
            createdAt: true
          }
        },
        services: {
          where: { isActive: true },
          select: {
            id: true,
            name: true,
            description: true,
            price: true,
            durationMinutes: true,
            category: true
          }
        },
        reviews: {
          include: {
            client: {
              select: {
                displayName: true,
                photoUrl: true
              }
            }
          },
          where: { isVisible: true },
          orderBy: { createdAt: 'desc' },
          take: 10
        },
        _count: {
          select: {
            appointments: {
              where: { status: 'completed' }
            },
            reviews: {
              where: { isVisible: true }
            }
          }
        }
      }
    });

    if (!lawyerProfile) {
      return Response.json(
        { 
          success: false,
          error: 'Lawyer profile not found' 
        },
        { status: 404 }
      );
    }

    // Calculate average rating
    const avgRating = lawyerProfile.reviews.length > 0
      ? lawyerProfile.reviews.reduce((sum, review) => sum + review.rating, 0) / lawyerProfile.reviews.length
      : 0;

    const completionPercentage = calculateCompletionPercentage(lawyerProfile);

    return Response.json({
      success: true,
      data: {
        profile: {
          ...lawyerProfile,
          averageRating: Math.round(avgRating * 10) / 10,
          completedAppointments: lawyerProfile._count.appointments,
          totalReviews: lawyerProfile._count.reviews
        },
        completionPercentage
      }
    });

  } catch (error) {
    console.error('Get lawyer profile error:', error);
    return Response.json(
      { 
        success: false,
        error: 'Internal server error' 
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Update lawyer profile
export async function PUT(request) {
  try {
    const user = await verifyAuth();
    
    if (user.userType !== 'lawyer') {
      return Response.json(
        { 
          success: false,
          error: 'Only lawyers can update lawyer profiles' 
        },
        { status: 403 }
      );
    }

    const data = await request.json();
    const {
      bio,
      specialization,
      licenseNumber,
      firmName,
      address,
      websiteUrl,
      hourlyRate,
      yearsExperience,
      education,
      certifications,
      languages
    } = data;

    // Validate data
    const validationErrors = validateProfileData(data);
    if (validationErrors.length > 0) {
      return Response.json(
        { 
          success: false,
          error: 'Validation failed',
          errors: validationErrors 
        },
        { status: 400 }
      );
    }

    // Check if profile exists
    const existingProfile = await prisma.lawyerProfile.findUnique({
      where: { userId: user.userId }
    });

    if (!existingProfile) {
      return Response.json(
        { 
          success: false,
          error: 'Lawyer profile not found. Create one first.' 
        },
        { status: 404 }
      );
    }

    // Check license number conflict (if changed)
    if (licenseNumber && licenseNumber.trim() !== existingProfile.licenseNumber) {
      const licenseConflict = await prisma.lawyerProfile.findUnique({
        where: { licenseNumber: licenseNumber.trim() }
      });

      if (licenseConflict) {
        return Response.json(
          { 
            success: false,
            error: 'License number already exists' 
          },
          { status: 409 }
        );
      }
    }

    // Build update data - only update provided fields
    const updateData = {};
    
    if (bio !== undefined) updateData.bio = bio?.trim() || null;
    if (specialization !== undefined) updateData.specialization = specialization.trim();
    if (licenseNumber !== undefined) updateData.licenseNumber = licenseNumber.trim();
    if (firmName !== undefined) updateData.firmName = firmName?.trim() || null;
    if (address !== undefined) updateData.address = address?.trim() || null;
    if (websiteUrl !== undefined) updateData.websiteUrl = websiteUrl?.trim() || null;
    if (hourlyRate !== undefined) updateData.hourlyRate = hourlyRate ? parseFloat(hourlyRate) : null;
    if (yearsExperience !== undefined) updateData.yearsExperience = yearsExperience ? parseInt(yearsExperience) : null;
    if (Array.isArray(education)) updateData.education = education.filter(e => e?.trim());
    if (Array.isArray(certifications)) updateData.certifications = certifications.filter(c => c?.trim());
    if (Array.isArray(languages)) updateData.languages = languages.filter(l => l?.trim());

    // Update profile
    const updatedProfile = await prisma.lawyerProfile.update({
      where: { userId: user.userId },
      data: updateData,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            displayName: true,
            photoUrl: true,
            createdAt: true
          }
        },
        services: {
          where: { isActive: true },
          select: {
            id: true,
            name: true,
            description: true,
            price: true,
            durationMinutes: true,
            category: true
          }
        }
      }
    });

    const completionPercentage = calculateCompletionPercentage(updatedProfile);

    return Response.json({
      success: true,
      message: 'Lawyer profile updated successfully',
      data: {
        profile: updatedProfile,
        completionPercentage
      }
    });

  } catch (error) {
    console.error('Update lawyer profile error:', error);
    
    if (error.message === 'Invalid token' || error.message === 'No token provided') {
      return Response.json(
        { 
          success: false,
          error: 'Authentication required' 
        },
        { status: 401 }
      );
    }

    if (error.code === 'P2002') {
      return Response.json(
        { 
          success: false,
          error: 'License number already exists' 
        },
        { status: 409 }
      );
    }

    return Response.json(
      { 
        success: false,
        error: 'Internal server error' 
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Delete lawyer profile
export async function DELETE(request) {
  try {
    const user = await verifyAuth();
    
    if (user.userType !== 'lawyer') {
      return Response.json(
        { 
          success: false,
          error: 'Only lawyers can delete their profiles' 
        },
        { status: 403 }
      );
    }

    // Check if profile exists
    const existingProfile = await prisma.lawyerProfile.findUnique({
      where: { userId: user.userId }
    });

    if (!existingProfile) {
      return Response.json(
        { 
          success: false,
          error: 'Lawyer profile not found' 
        },
        { status: 404 }
      );
    }

    // Delete the profile
    await prisma.lawyerProfile.delete({
      where: { userId: user.userId }
    });

    return Response.json({
      success: true,
      message: 'Lawyer profile deleted successfully'
    });

  } catch (error) {
    console.error('Delete lawyer profile error:', error);
    
    if (error.message === 'Invalid token' || error.message === 'No token provided') {
      return Response.json(
        { 
          success: false,
          error: 'Authentication required' 
        },
        { status: 401 }
      );
    }

    return Response.json(
      { 
        success: false,
        error: 'Internal server error' 
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}