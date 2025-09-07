import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { User, Star, Search, AlertCircle } from 'lucide-react';

const ClientLawyerSelection = ({ onSelectLawyer, onBack }) => {
  const [lawyers, setLawyers] = useState([]);
  const [categories, setCategories] = useState(['all']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchParams, setSearchParams] = useState({
    search: '',
    specialization: 'all',
    location: '',
    minRate: '',
    maxRate: '',
    minExperience: '',
    language: '',
    isVerified: '',
    sortBy: 'createdAt',
    sortOrder: 'desc',
    page: 1,
    limit: 6
  });
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 1,
    hasNext: false,
    hasPrev: false
  });

  useEffect(() => {
    loadLawyers();
  }, [searchParams]);

  useEffect(() => {
    if (lawyers.length > 0) {
      const allSpecs = new Set(lawyers.flatMap(lawyer =>
        lawyer.specialization?.split(',').map(s => s.trim()).filter(Boolean) || []
      ));
      setCategories(['all', ...Array.from(allSpecs).sort()]);
    }
  }, [lawyers]);

  const loadLawyers = async () => {
    setIsLoading(true);
    setError('');
    try {
      const queryParams = new URLSearchParams();
      Object.entries(searchParams).forEach(([key, value]) => {
        if (value !== '' && value !== null && value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
      const response = await fetch(`/api/lawyer/search?${queryParams.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Type': 'client'
        },
        credentials: 'include'
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || 'Failed to load lawyers');
      }
      setLawyers(data.data.lawyers || []);
      setPagination(data.data.pagination || {
        total: 0,
        totalPages: 1,
        hasNext: false,
        hasPrev: false
      });
    } catch (err) {
      console.error('Failed to load lawyers:', err);
      setError(`Failed to load lawyers: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setSearchParams(prev => ({
      ...prev,
      [field]: value,
      page: 1
    }));
  };

  const handlePageChange = (newPage) => {
    setSearchParams(prev => ({ ...prev, page: newPage }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Select a Lawyer</h2>
        {onBack && (
          <Button variant="ghost" size="sm" onClick={onBack}>
            ← Back
          </Button>
        )}
      </div>
      {error && (
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">{error}</AlertDescription>
        </Alert>
      )}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search lawyers by name, specialization, or firm..."
            value={searchParams.search}
            onChange={(e) => handleInputChange('search', e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Specialization</label>
            <select
              value={searchParams.specialization}
              onChange={(e) => handleInputChange('specialization', e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Specializations' : category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Location</label>
            <input
              type="text"
              placeholder="Enter city or area"
              value={searchParams.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Minimum Experience (Years)</label>
            <input
              type="number"
              placeholder="e.g., 5"
              value={searchParams.minExperience}
              onChange={(e) => handleInputChange('minExperience', e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Hourly Rate (₹)</label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={searchParams.minRate}
                onChange={(e) => handleInputChange('minRate', e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <input
                type="number"
                placeholder="Max"
                value={searchParams.maxRate}
                onChange={(e) => handleInputChange('maxRate', e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Language</label>
            <input
              type="text"
              placeholder="e.g., English, Hindi"
              value={searchParams.language}
              onChange={(e) => handleInputChange('language', e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Sort By</label>
            <select
              value={searchParams.sortBy}
              onChange={(e) => handleInputChange('sortBy', e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="createdAt">Recently Added</option>
              <option value="experience">Experience</option>
              <option value="rate">Hourly Rate</option>
              <option value="rating">Rating</option>
              <option value="name">Name</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Verification Status</label>
            <select
              value={searchParams.isVerified}
              onChange={(e) => handleInputChange('isVerified', e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">All</option>
              <option value="true">Verified Only</option>
            </select>
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1,2,3,4].map(i => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="h-4 bg-muted rounded w-3/4 animate-pulse"></div>
                  <div className="h-3 bg-muted rounded w-full animate-pulse"></div>
                  <div className="h-3 bg-muted rounded w-1/2 animate-pulse"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : lawyers.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <User className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No lawyers found matching your criteria</p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lawyers.map(lawyer => (
              <Card key={lawyer.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4" onClick={() => onSelectLawyer(lawyer)}>
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{lawyer.user?.displayName || 'Unknown'}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {lawyer.yearsExperience} years experience
                      </p>
                      {lawyer.averageRating > 0 && (
                        <div className="flex items-center gap-1 mb-2">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{lawyer.averageRating}</span>
                          <span className="text-xs text-muted-foreground">
                            ({lawyer.totalReviews} reviews)
                          </span>
                        </div>
                      )}
                      <div className="flex flex-wrap gap-1 mb-2">
                        {lawyer.specialization?.split(',').slice(0, 2).map(spec => (
                          <Badge key={spec} variant="secondary" className="text-xs">
                            {spec.trim()}
                          </Badge>
                        ))}
                        {lawyer.specialization?.split(',').length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{lawyer.specialization.split(',').length - 2}
                          </Badge>
                        )}
                      </div>
                      {lawyer.isVerified && (
                        <Badge variant="outline" className="text-blue-600 border-blue-600 mb-2">
                          Verified
                        </Badge>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-green-600 font-medium">
                          From ₹{Math.min(...(lawyer.services?.map(s => s.price) || [lawyer.hourlyRate || 0]))}
                        </span>
                        <Button size="sm">
                          Select
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {pagination.totalPages > 1 && (
            <div className="flex justify-between items-center mt-4">
              <Button
                variant="outline"
                disabled={!pagination.hasPrev}
                onClick={() => handlePageChange(searchParams.page - 1)}
              >
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {pagination.page} of {pagination.totalPages} ({pagination.total} lawyers)
              </span>
              <Button
                variant="outline"
                disabled={!pagination.hasNext}
                onClick={() => handlePageChange(searchParams.page + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ClientLawyerSelection;
