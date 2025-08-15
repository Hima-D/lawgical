'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Filter, Search, UserCheck, Star, MapPin, Award, Loader2 
} from "lucide-react";

const ClientLawyerBrowser = () => {
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Fetch lawyers from the database
  const fetchLawyers = async (reset = false) => {
    try {
      setLoading(true);
      const currentPage = reset ? 1 : page;
      
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '6', // Load 6 lawyers per page
        search: searchQuery,
        specialization: selectedSpecialization,
      });

      const response = await fetch(`/api/lawyers?${params}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch lawyers');
      }

      const data = await response.json();
      
      if (reset) {
        setLawyers(data.lawyers);
        setPage(2);
      } else {
        setLawyers(prev => [...prev, ...data.lawyers]);
        setPage(prev => prev + 1);
      }
      
      setHasMore(data.hasMore);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching lawyers:', err);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchLawyers(true);
  }, []);

  // Search and filter effect
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchLawyers(true);
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, selectedSpecialization]);

  const handleLoadMore = () => {
    fetchLawyers(false);
  };

  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  if (error) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-red-500">Error loading lawyers: {error}</p>
          <Button 
            onClick={() => fetchLawyers(true)} 
            className="mt-4"
            variant="outline"
          >
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Find Legal Experts</CardTitle>
            <CardDescription>
              Browse and connect with qualified lawyers
            </CardDescription>
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Search and Filter Section */}
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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="w-48">
              <Label htmlFor="specialization">Specialization</Label>
              <select 
                id="specialization"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={selectedSpecialization}
                onChange={(e) => setSelectedSpecialization(e.target.value)}
              >
                <option value="">All Specializations</option>
                <option value="Corporate Law">Corporate Law</option>
                <option value="Criminal Law">Criminal Law</option>
                <option value="Family Law">Family Law</option>
                <option value="Real Estate Law">Real Estate Law</option>
                <option value="Immigration Law">Immigration Law</option>
                <option value="Intellectual Property">Intellectual Property</option>
                <option value="Personal Injury">Personal Injury</option>
                <option value="Tax Law">Tax Law</option>
                <option value="Employment Law">Employment Law</option>
                <option value="Environmental Law">Environmental Law</option>
              </select>
            </div>
          </div>
        </div>

        {/* Lawyers List */}
        <div className="space-y-4">
          {lawyers.map((lawyer) => {
            const averageRating = parseFloat(calculateAverageRating(lawyer.reviews));
            const reviewCount = lawyer.reviews?.length || 0;
            
            return (
              <div
                key={lawyer.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={lawyer.user.photoUrl} />
                    <AvatarFallback className="text-lg font-semibold">
                      {lawyer.user.displayName
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("") || lawyer.user.email[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-lg">
                        {lawyer.user.displayName || 'Legal Professional'}
                      </h4>
                      {lawyer.isVerified && (
                        <Badge variant="default" className="text-xs">
                          <UserCheck className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {lawyer.specialization}
                    </p>
                    {reviewCount > 0 && (
                      <div className="flex items-center space-x-4 mb-2">
                        <div className="flex items-center space-x-1">
                          {renderStars(averageRating)}
                          <span className="text-sm text-gray-500 ml-1">
                            {averageRating} ({reviewCount} review{reviewCount !== 1 ? 's' : ''})
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      {lawyer.yearsExperience && (
                        <div className="flex items-center">
                          <Award className="h-4 w-4 mr-1" />
                          {lawyer.yearsExperience}+ years
                        </div>
                      )}
                      {lawyer.address && (
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {lawyer.address}
                        </div>
                      )}
                      {lawyer.firmName && (
                        <div className="text-xs text-blue-600">
                          {lawyer.firmName}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-2xl">
                    ${lawyer.hourlyRate || 'N/A'}
                  </p>
                  <p className="text-sm text-gray-500 mb-3">
                    per hour
                  </p>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      className="min-w-[120px]"
                      onClick={() => {
                        // Handle booking consultation
                        window.location.href = `/lawyers/${lawyer.id}/book`;
                      }}
                    >
                      Book Consultation
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        // Handle view profile
                        window.location.href = `/lawyers/${lawyer.id}`;
                      }}
                    >
                      View Profile
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Loading State */}
        {loading && lawyers.length === 0 && (
          <div className="text-center py-8">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-gray-500">Loading lawyers...</p>
          </div>
        )}

        {/* No Results */}
        {!loading && lawyers.length === 0 && (
          <div className="text-center py-8">
            <div className="h-12 w-12 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Search className="h-6 w-6 text-gray-400" />
            </div>
            <p className="text-gray-500 mb-2">No lawyers found</p>
            <p className="text-sm text-gray-400">
              Try adjusting your search criteria
            </p>
          </div>
        )}

        {/* Load More Button */}
        {!loading && lawyers.length > 0 && hasMore && (
          <div className="mt-6 text-center">
            <Button 
              variant="outline" 
              size="lg"
              onClick={handleLoadMore}
              disabled={loading}
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              Load More Lawyers
            </Button>
          </div>
        )}

        {/* End of Results */}
        {!loading && lawyers.length > 0 && !hasMore && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              You've seen all available lawyers
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ClientLawyerBrowser;