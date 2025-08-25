// components/dashboard/RecommendedLawyers.jsx
'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  UserCheck, Star, MapPin, Loader2, AlertCircle, 
  RefreshCw, Award, Building2, TrendingUp 
} from "lucide-react";

const RecommendedLawyers = ({ 
  limit = 6, 
  userId = null, 
  specialization = null, 
  location = null,
  showViewAll = true 
}) => {
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [metadata, setMetadata] = useState(null);

  // Fetch recommended lawyers
  const fetchRecommendedLawyers = async () => {
    try {
      setLoading(true);
      setError(null);

      // Build query parameters
      const params = new URLSearchParams();
      params.append('limit', limit.toString());
      
      if (specialization) params.append('specialization', specialization);
      if (location) params.append('location', location);
      if (userId) params.append('userId', userId);

      const response = await fetch(`/api/lawyer/recommended?${params}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to fetch recommendations (${response.status})`);
      }

      const responseData = await response.json();
      
      if (!responseData.success) {
        throw new Error(responseData.error || 'Failed to fetch recommended lawyers');
      }

      setLawyers(responseData.data.lawyers);
      setMetadata(responseData.data.metadata);
      
    } catch (err) {
      console.error('Error fetching recommended lawyers:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchRecommendedLawyers();
  }, [limit, userId, specialization, location]);

  // Render star rating
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  // Format currency
  const formatCurrency = (amount) => {
    if (!amount) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Get experience display text
  const getExperienceText = (years) => {
    if (!years) return null;
    return years === 1 ? '1 year' : `${years}+ years`;
  };

  // Handle booking
  const handleBookLawyer = (lawyerId) => {
    window.location.href = `/lawyers/${lawyerId}/book`;
  };

  // Handle view profile
  const handleViewProfile = (lawyerId) => {
    window.location.href = `/lawyers/${lawyerId}`;
  };

  // Handle view all lawyers
  const handleViewAll = () => {
    const params = new URLSearchParams();
    if (specialization) params.append('specialization', specialization);
    if (location) params.append('location', location);
    
    const queryString = params.toString();
    window.location.href = `/lawyers${queryString ? `?${queryString}` : ''}`;
  };

  // Loading state
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recommended Lawyers</CardTitle>
          <CardDescription>
            Finding the best lawyers for you
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Loader2 className="h-6 w-6 animate-spin mx-auto mb-3 text-blue-500" />
            <p className="text-sm text-gray-600">Loading recommendations...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Error state
  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recommended Lawyers</CardTitle>
          <CardDescription>
            Top-rated lawyers in your area
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <div className="h-12 w-12 bg-red-100 rounded-full mx-auto mb-3 flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-red-500" />
            </div>
            <p className="text-red-600 font-medium mb-2">Failed to load recommendations</p>
            <p className="text-sm text-gray-600 mb-4">{error}</p>
            <Button variant="outline" size="sm" onClick={fetchRecommendedLawyers}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // No lawyers found
  if (!lawyers || lawyers.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recommended Lawyers</CardTitle>
          <CardDescription>
            Top-rated lawyers in your area
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <div className="h-12 w-12 bg-gray-100 rounded-full mx-auto mb-3 flex items-center justify-center">
              <UserCheck className="h-6 w-6 text-gray-400" />
            </div>
            <p className="text-gray-600 font-medium mb-2">No recommendations available</p>
            <p className="text-sm text-gray-500 mb-4">
              Try adjusting your preferences or check back later
            </p>
            {showViewAll && (
              <Button variant="outline" size="sm" onClick={handleViewAll}>
                Browse All Lawyers
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <span>Recommended Lawyers</span>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </CardTitle>
            <CardDescription>
              Top-rated lawyers based on ratings, experience, and recent activity
              {metadata?.hasPersonalization && (
                <span className="text-blue-600 ml-1">• Personalized for you</span>
              )}
            </CardDescription>
          </div>
          {specialization && (
            <Badge variant="secondary" className="text-xs">
              {specialization}
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {lawyers.map((lawyer, index) => (
            <div
              key={lawyer.id}
              className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors group"
            >
              {/* Ranking badge for top lawyers */}
              {index < 3 && (
                <div className="flex-shrink-0">
                  <div className={`
                    w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white
                    ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-amber-600'}
                  `}>
                    {index + 1}
                  </div>
                </div>
              )}

              {/* Avatar */}
              <Avatar className="h-12 w-12 flex-shrink-0">
                <AvatarImage src={lawyer.photoUrl} alt={lawyer.name} />
                <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                  {lawyer.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("") || 'L'}
                </AvatarFallback>
              </Avatar>

              {/* Lawyer info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-medium text-base truncate">{lawyer.name}</h4>
                  {lawyer.isVerified && (
                    <Badge variant="default" className="text-xs bg-green-100 text-green-800 border-green-200">
                      <UserCheck className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                
                <p className="text-sm text-blue-600 font-medium mb-1">
                  {lawyer.specialization}
                </p>

                {/* Firm name */}
                {lawyer.firmName && (
                  <div className="flex items-center text-xs text-gray-600 mb-1">
                    <Building2 className="h-3 w-3 mr-1" />
                    <span className="truncate">{lawyer.firmName}</span>
                  </div>
                )}

                {/* Rating and reviews */}
                {lawyer.totalReviews > 0 && (
                  <div className="flex items-center space-x-3 mb-1">
                    <div className="flex items-center space-x-1">
                      {renderStars(lawyer.averageRating)}
                      <span className="text-xs text-gray-600 ml-1">
                        {lawyer.averageRating} ({lawyer.totalReviews} review{lawyer.totalReviews !== 1 ? 's' : ''})
                      </span>
                    </div>
                  </div>
                )}

                {/* Additional info */}
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  {lawyer.yearsExperience && (
                    <div className="flex items-center">
                      <Award className="h-3 w-3 mr-1 text-amber-500" />
                      {getExperienceText(lawyer.yearsExperience)}
                    </div>
                  )}
                  
                  {lawyer.address && (
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1 text-red-500" />
                      <span className="truncate max-w-[120px]">{lawyer.address}</span>
                    </div>
                  )}
                  
                  {lawyer.completedAppointments > 0 && (
                    <div className="text-green-600">
                      {lawyer.completedAppointments} completed
                    </div>
                  )}
                </div>
              </div>

              {/* Rate and actions */}
              <div className="text-right flex-shrink-0">
                <div className="mb-2">
                  <p className="font-semibold text-lg text-gray-900">
                    {formatCurrency(lawyer.hourlyRate)}
                  </p>
                  <p className="text-xs text-gray-500">per hour</p>
                </div>
                
                <div className="space-y-1">
                  <Button 
                    size="sm" 
                    className="w-full text-xs px-2 py-1"
                    onClick={() => handleBookLawyer(lawyer.id)}
                    disabled={!lawyer.isAvailable}
                  >
                    Book Now
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full text-xs px-2 py-1 h-auto"
                    onClick={() => handleViewProfile(lawyer.id)}
                  >
                    View Profile
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all button */}
        {showViewAll && (
          <div className="mt-6">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleViewAll}
            >
              View All Lawyers
              {specialization && ` in ${specialization}`}
            </Button>
          </div>
        )}

        {/* Metadata info */}
        {metadata && (
          <div className="mt-4 pt-4 border-t text-xs text-gray-500 text-center">
            Showing {metadata.count} of {metadata.totalAvailable || 'many'} recommended lawyers
            {specialization && ` specializing in ${specialization}`}
            {location && ` in ${location}`}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecommendedLawyers;