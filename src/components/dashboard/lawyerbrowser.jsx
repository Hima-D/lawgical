'use client';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Filter, Search, UserCheck, Star, MapPin, Award, Loader2, 
  Clock, Languages, DollarSign, SlidersHorizontal, X,
  ChevronDown, Building2, Phone, RefreshCw
} from "lucide-react";

const SPECIALIZATIONS = [
  'Corporate Law',
  'Criminal Law',
  'Family Law',
  'Real Estate Law',
  'Immigration Law',
  'Intellectual Property',
  'Personal Injury',
  'Tax Law',
  'Employment Law',
  'Environmental Law',
  'Contract Law',
  'Constitutional Law',
  'Banking Law',
  'Insurance Law',
  'Labor Law'
];

const SORT_OPTIONS = [
  { value: 'createdAt', label: 'Newest First', order: 'desc' },
  { value: 'rating', label: 'Highest Rated', order: 'desc' },
  { value: 'experience', label: 'Most Experienced', order: 'desc' },
  { value: 'rate', label: 'Lowest Rate', order: 'asc' },
  { value: 'rate', label: 'Highest Rate', order: 'desc' },
  { value: 'name', label: 'Name A-Z', order: 'asc' }
];

const ClientLawyerBrowser = () => {
  // State management
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [location, setLocation] = useState('');
  const [minRate, setMinRate] = useState('');
  const [maxRate, setMaxRate] = useState('');
  const [minExperience, setMinExperience] = useState('');
  const [language, setLanguage] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);

  // Debounced search effect
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Build search parameters
  const buildSearchParams = useCallback((pageNum = 1) => {
    const params = new URLSearchParams();
    
    params.append('page', pageNum.toString());
    params.append('limit', '6');
    
    if (debouncedSearchQuery.trim()) params.append('search', debouncedSearchQuery.trim());
    if (selectedSpecialization) params.append('specialization', selectedSpecialization);
    if (location.trim()) params.append('location', location.trim());
    if (minRate && !isNaN(parseFloat(minRate))) params.append('minRate', minRate);
    if (maxRate && !isNaN(parseFloat(maxRate))) params.append('maxRate', maxRate);
    if (minExperience && !isNaN(parseInt(minExperience))) params.append('minExperience', minExperience);
    if (language.trim()) params.append('language', language.trim());
    if (isVerified) params.append('isVerified', 'true');
    
    params.append('sortBy', sortBy);
    params.append('sortOrder', sortOrder);

    return params;
  }, [
    debouncedSearchQuery, selectedSpecialization, location, minRate, maxRate, 
    minExperience, language, isVerified, sortBy, sortOrder
  ]);

  // Fetch lawyers from the API
  const fetchLawyers = useCallback(async (reset = false) => {
    try {
      const isInitialLoad = reset || page === 1;
      
      if (isInitialLoad) {
        setLoading(true);
        setError(null);
      } else {
        setLoadingMore(true);
      }

      const currentPage = reset ? 1 : page;
      const params = buildSearchParams(currentPage);

      const response = await fetch(`/api/lawyer/search?${params}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to fetch lawyers (${response.status})`);
      }

      const responseData = await response.json();
      
      if (!responseData.success) {
        throw new Error(responseData.error || 'Failed to fetch lawyers');
      }

      const { data } = responseData;
      
      if (reset || isInitialLoad) {
        setLawyers(data.lawyers);
        setPage(2);
      } else {
        setLawyers(prev => [...prev, ...data.lawyers]);
        setPage(prev => prev + 1);
      }
      
      setPagination(data.pagination);
      setHasMore(data.hasMore);
      setError(null);

    } catch (err) {
      setError(err.message);
      console.error('Error fetching lawyers:', err);
      
      // Don't clear lawyers on error if it's a "load more" request
      if (reset || page === 1) {
        setLawyers([]);
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [page, buildSearchParams]);

  // Initial load
  useEffect(() => {
    fetchLawyers(true);
  }, []);

  // Reset and search when filters change
  useEffect(() => {
    setPage(1);
    fetchLawyers(true);
  }, [
    debouncedSearchQuery, selectedSpecialization, location, minRate, maxRate,
    minExperience, language, isVerified, sortBy, sortOrder
  ]);

  const handleLoadMore = () => {
    fetchLawyers(false);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedSpecialization('');
    setLocation('');
    setMinRate('');
    setMaxRate('');
    setMinExperience('');
    setLanguage('');
    setIsVerified(false);
    setSortBy('createdAt');
    setSortOrder('desc');
  };

  const handleSortChange = (value) => {
    const [newSortBy, newSortOrder] = value.split('-');
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  // Count active filters
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedSpecialization) count++;
    if (location.trim()) count++;
    if (minRate || maxRate) count++;
    if (minExperience) count++;
    if (language.trim()) count++;
    if (isVerified) count++;
    return count;
  }, [selectedSpecialization, location, minRate, maxRate, minExperience, language, isVerified]);

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

  const formatCurrency = (amount) => {
    if (!amount) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (error && lawyers.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <div className="mb-4">
            <div className="h-12 w-12 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <X className="h-6 w-6 text-red-500" />
            </div>
            <p className="text-red-600 font-medium mb-2">Error loading lawyers</p>
            <p className="text-gray-600 text-sm">{error}</p>
          </div>
          <div className="space-x-2">
            <Button 
              onClick={() => fetchLawyers(true)} 
              variant="outline"
              className="min-w-[100px]"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
            <Button 
              onClick={clearFilters}
              variant="ghost"
            >
              Clear Filters
            </Button>
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
            <CardTitle className="text-2xl font-bold">Find Legal Experts</CardTitle>
            <CardDescription className="text-base">
              Browse and connect with qualified lawyers
              {pagination && (
                <span className="ml-2 text-blue-600">
                  ({pagination.total} available)
                </span>
              )}
            </CardDescription>
          </div>
          <Button 
            variant="outline" 
            onClick={() => setShowFilters(!showFilters)}
            className="relative"
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Search Section */}
        <div className="mb-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <Label htmlFor="search-lawyers">Search Lawyers</Label>
              <div className="relative mt-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="search-lawyers"
                  type="text"
                  placeholder="Search by name, specialization, or firm..."
                  className="pl-10 pr-4"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                    onClick={() => setSearchQuery('')}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>
            
            <div className="w-48">
              <Label htmlFor="sort">Sort By</Label>
              <select 
                id="sort"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => handleSortChange(e.target.value)}
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={`${option.value}-${option.order}`} value={`${option.value}-${option.order}`}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-lg">Advanced Filters</h3>
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear All
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="specialization">Specialization</Label>
                <select 
                  id="specialization"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={selectedSpecialization}
                  onChange={(e) => setSelectedSpecialization(e.target.value)}
                >
                  <option value="">All Specializations</option>
                  {SPECIALIZATIONS.map((spec) => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  type="text"
                  placeholder="City, State"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="language">Language</Label>
                <Input
                  id="language"
                  type="text"
                  placeholder="e.g., Spanish, French"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="min-rate">Min Rate ($/hour)</Label>
                <Input
                  id="min-rate"
                  type="number"
                  placeholder="0"
                  min="0"
                  value={minRate}
                  onChange={(e) => setMinRate(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="max-rate">Max Rate ($/hour)</Label>
                <Input
                  id="max-rate"
                  type="number"
                  placeholder="1000"
                  min="0"
                  value={maxRate}
                  onChange={(e) => setMaxRate(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="min-experience">Min Experience (years)</Label>
                <Input
                  id="min-experience"
                  type="number"
                  placeholder="0"
                  min="0"
                  value={minExperience}
                  onChange={(e) => setMinExperience(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={isVerified}
                  onChange={(e) => setIsVerified(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm">Show only verified lawyers</span>
              </label>
            </div>
          </div>
        )}

        {/* Results Header */}
        {!loading && lawyers.length > 0 && (
          <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
            <span>
              Showing {lawyers.length} of {pagination?.total || 0} lawyers
              {debouncedSearchQuery && ` for "${debouncedSearchQuery}"`}
            </span>
            {activeFiltersCount > 0 && (
              <span className="text-blue-600">
                {activeFiltersCount} filter{activeFiltersCount !== 1 ? 's' : ''} active
              </span>
            )}
          </div>
        )}

        {/* Lawyers List */}
        <div className="space-y-4">
          {lawyers.map((lawyer) => {
            const averageRating = lawyer.averageRating || 0;
            const reviewCount = lawyer.totalReviews || 0;
            
            return (
              <div
                key={lawyer.id}
                className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-6 border rounded-lg hover:bg-gray-50 transition-colors shadow-sm hover:shadow-md"
              >
                <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 flex-1">
                  <Avatar className="h-20 w-20 flex-shrink-0">
                    <AvatarImage src={lawyer.user?.photoUrl} />
                    <AvatarFallback className="text-lg font-semibold bg-blue-100 text-blue-600">
                      {lawyer.user?.displayName
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("") || lawyer.user?.email?.[0]?.toUpperCase() || 'L'}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-semibold text-xl text-gray-900">
                            {lawyer.user?.displayName || 'Legal Professional'}
                          </h4>
                          {lawyer.isVerified && (
                            <Badge variant="default" className="text-xs bg-green-100 text-green-800">
                              <UserCheck className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                          {!lawyer.isAvailable && (
                            <Badge variant="secondary" className="text-xs">
                              Unavailable
                            </Badge>
                          )}
                        </div>
                        
                        <p className="text-blue-600 font-medium mb-1">
                          {lawyer.specialization || 'General Practice'}
                        </p>
                        
                        {lawyer.firmName && (
                          <div className="flex items-center text-sm text-gray-600 mb-1">
                            <Building2 className="h-4 w-4 mr-1" />
                            {lawyer.firmName}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bio */}
                    {lawyer.bio && (
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {lawyer.bio}
                      </p>
                    )}

                    {/* Rating */}
                    {reviewCount > 0 && (
                      <div className="flex items-center space-x-1 mb-3">
                        {renderStars(averageRating)}
                        <span className="text-sm text-gray-600 ml-2">
                          {averageRating} ({reviewCount} review{reviewCount !== 1 ? 's' : ''})
                        </span>
                      </div>
                    )}

                    {/* Details */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      {lawyer.yearsExperience && (
                        <div className="flex items-center">
                          <Award className="h-4 w-4 mr-1 text-amber-500" />
                          {lawyer.yearsExperience}+ years
                        </div>
                      )}
                      
                      {lawyer.address && (
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1 text-red-500" />
                          <span className="truncate max-w-[200px]">{lawyer.address}</span>
                        </div>
                      )}
                      
                      {lawyer.completedAppointments > 0 && (
                        <div className="flex items-center text-green-600">
                          <Clock className="h-4 w-4 mr-1" />
                          {lawyer.completedAppointments} completed
                        </div>
                      )}
                      
                      {lawyer.languages && lawyer.languages.length > 0 && (
                        <div className="flex items-center">
                          <Languages className="h-4 w-4 mr-1 text-blue-500" />
                          {lawyer.languages.slice(0, 2).join(', ')}
                          {lawyer.languages.length > 2 && ` +${lawyer.languages.length - 2}`}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right side - Rate and Actions */}
                <div className="mt-4 lg:mt-0 lg:ml-6 flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-start space-x-4 lg:space-x-0 lg:space-y-3">
                  <div className="text-right">
                    <div className="flex items-center lg:justify-end space-x-1">
                      <DollarSign className="h-5 w-5 text-green-600" />
                      <span className="font-bold text-2xl text-gray-900">
                        {formatCurrency(lawyer.hourlyRate)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">per hour</p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      className="min-w-[120px]"
                      disabled={!lawyer.isAvailable}
                      onClick={() => {
                        window.location.href = `/lawyers/${lawyer.id}/book`;
                      }}
                    >
                      Book Consultation
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
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
          <div className="text-center py-12">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-500" />
            <p className="text-gray-600 font-medium">Finding the best lawyers for you...</p>
            <p className="text-sm text-gray-500 mt-1">This may take a moment</p>
          </div>
        )}

        {/* No Results */}
        {!loading && lawyers.length === 0 && (
          <div className="text-center py-12">
            <div className="h-16 w-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="font-medium text-lg text-gray-900 mb-2">No lawyers found</h3>
            <p className="text-gray-600 mb-4">
              We couldn't find any lawyers matching your criteria.
            </p>
            <div className="space-x-2">
              <Button variant="outline" onClick={clearFilters}>
                Clear All Filters
              </Button>
              <Button variant="ghost" onClick={() => setShowFilters(true)}>
                Adjust Filters
              </Button>
            </div>
          </div>
        )}

        {/* Load More Button */}
        {!loading && lawyers.length > 0 && hasMore && (
          <div className="mt-8 text-center">
            <Button 
              variant="outline" 
              size="lg"
              onClick={handleLoadMore}
              disabled={loadingMore}
              className="min-w-[160px]"
            >
              {loadingMore ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Loading...
                </>
              ) : (
                'Load More Lawyers'
              )}
            </Button>
            {pagination && (
              <p className="text-sm text-gray-500 mt-2">
                Showing {lawyers.length} of {pagination.total} lawyers
              </p>
            )}
          </div>
        )}

        {/* End of Results */}
        {!loading && lawyers.length > 0 && !hasMore && (
          <div className="mt-8 text-center py-6 border-t">
            <p className="text-gray-600 font-medium mb-1">
              You've seen all available lawyers
            </p>
            <p className="text-sm text-gray-500">
              Try adjusting your search criteria to find more results
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ClientLawyerBrowser;