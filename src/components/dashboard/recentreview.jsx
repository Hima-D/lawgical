// components/dashboard/RecentReviews.jsx
'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Star, ChevronRight, RefreshCw } from "lucide-react";
import { useRouter } from 'next/navigation';

const RecentReviews = ({ user }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Fetch reviews from API
  const fetchReviews = async () => {
    if (!user?.lawyerProfile?.id) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        `/api/reviews?lawyerProfileId=${user.lawyerProfile.id}&limit=3&sortBy=createdAt&order=desc`
      );
      
      const data = await response.json();
      
      if (data.success) {
        setReviews(data.data.reviews);
      } else {
        setError(data.error || 'Failed to fetch reviews');
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [user?.lawyerProfile?.id]);

  const handleViewAllReviews = () => {
    router.push('/dashboard/reviews');
  };

  const LoadingSkeleton = () => (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="border-b pb-4 last:border-b-0">
          <div className="flex items-start space-x-3">
            <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="flex items-center space-x-2">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, j) => (
                    <div key={j} className="h-3 w-3 bg-gray-200 rounded animate-pulse" />
                  ))}
                </div>
              </div>
              <div className="h-3 w-full bg-gray-200 rounded animate-pulse" />
              <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Recent Reviews</CardTitle>
            <CardDescription>
              What clients are saying about you
            </CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={fetchReviews}
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
            {reviews.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleViewAllReviews}
              >
                View All
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <LoadingSkeleton />
        ) : error ? (
          <div className="text-center py-8">
            <div className="text-red-500 mb-4">
              <Star className="h-12 w-12 mx-auto mb-2" />
              <p className="text-sm">{error}</p>
            </div>
            <Button variant="outline" size="sm" onClick={fetchReviews}>
              Try Again
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="border-b pb-4 last:border-b-0"
              >
                <div className="flex items-start space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={review.client.photoUrl} />
                    <AvatarFallback className="text-xs">
                      {review.client.displayName?.charAt(0) ||
                        review.client.email.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="text-sm font-medium">
                        {review.client.displayName || 
                         review.client.email.split('@')[0]}
                      </p>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    {review.comment && (
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {review.comment}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(review.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {reviews.length === 0 && (
              <div className="text-center py-8">
                <Star className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">No reviews yet</p>
                <p className="text-sm text-gray-400">
                  Complete your first appointment to get reviews
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentReviews;


// // components/reviews/ReviewForm.jsx
// 'use client';
// import React, { useState } from 'react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { Star, Send, Loader2 } from "lucide-react";
// import { toast } from "sonner";

// const ReviewForm = ({ lawyerProfile, clientId, onReviewSubmitted }) => {
//   const [rating, setRating] = useState(0);
//   const [hoverRating, setHoverRating] = useState(0);
//   const [comment, setComment] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (rating === 0) {
//       toast.error('Please select a rating');
//       return;
//     }

//     try {
//       setLoading(true);
      
//       const response = await fetch('/api/reviews', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           clientId,
//           lawyerProfileId: lawyerProfile.id,
//           rating,
//           comment: comment.trim() || null,
//         }),
//       });

//       const data = await response.json();

//       if (data.success) {
//         toast.success('Review submitted successfully!');
//         setRating(0);
//         setComment('');
//         onReviewSubmitted?.(data.data.review);
//       } else {
//         toast.error(data.error || 'Failed to submit review');
//       }
//     } catch (error) {
//       console.error('Error submitting review:', error);
//       toast.error('Failed to submit review');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Leave a Review</CardTitle>
//         <CardDescription>
//           Share your experience with {lawyerProfile.user?.displayName || 'this lawyer'}
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Rating Stars */}
//           <div>
//             <label className="block text-sm font-medium mb-2">Rating</label>
//             <div className="flex items-center space-x-1">
//               {[...Array(5)].map((_, i) => {
//                 const starValue = i + 1;
//                 return (
//                   <Star
//                     key={i}
//                     className={`h-8 w-8 cursor-pointer transition-colors ${
//                       starValue <= (hoverRating || rating)
//                         ? "fill-yellow-400 text-yellow-400"
//                         : "text-gray-300 hover:text-yellow-400"
//                     }`}
//                     onClick={() => setRating(starValue)}
//                     onMouseEnter={() => setHoverRating(starValue)}
//                     onMouseLeave={() => setHoverRating(0)}
//                   />
//                 );
//               })}
//               {rating > 0 && (
//                 <span className="ml-2 text-sm text-gray-600">
//                   {rating} star{rating !== 1 ? 's' : ''}
//                 </span>
//               )}
//             </div>
//           </div>

//           {/* Comment */}
//           <div>
//             <label className="block text-sm font-medium mb-2">
//               Comment (Optional)
//             </label>
//             <Textarea
//               value={comment}
//               onChange={(e) => setComment(e.target.value)}
//               placeholder="Share details about your experience..."
//               rows={4}
//               maxLength={500}
//             />
//             <div className="text-xs text-gray-500 mt-1">
//               {comment.length}/500 characters
//             </div>
//           </div>

//           {/* Submit Button */}
//           <Button
//             type="submit"
//             disabled={rating === 0 || loading}
//             className="w-full"
//           >
//             {loading ? (
//               <>
//                 <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//                 Submitting...
//               </>
//             ) : (
//               <>
//                 <Send className="h-4 w-4 mr-2" />
//                 Submit Review
//               </>
//             )}
//           </Button>
//         </form>
//       </CardContent>
//     </Card>
//   );
// };

// export default ReviewForm;


// // components/reviews/ReviewsList.jsx
// 'use client';
// import React, { useState, useEffect } from 'react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Star, Filter, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

// const ReviewsList = ({ lawyerProfileId, showClientInfo = false }) => {
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [pagination, setPagination] = useState({});
//   const [filters, setFilters] = useState({
//     page: 1,
//     limit: 10,
//     sortBy: 'createdAt',
//     order: 'desc',
//     minRating: 1
//   });

//   const fetchReviews = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const params = new URLSearchParams({
//         ...filters,
//         ...(lawyerProfileId && { lawyerProfileId })
//       });

//       const response = await fetch(`/api/reviews?${params}`);
//       const data = await response.json();

//       if (data.success) {
//         setReviews(data.data.reviews);
//         setPagination(data.data.pagination);
//       } else {
//         setError(data.error || 'Failed to fetch reviews');
//       }
//     } catch (err) {
//       console.error('Error fetching reviews:', err);
//       setError('Failed to load reviews');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchReviews();
//   }, [filters, lawyerProfileId]);

//   const handleFilterChange = (key, value) => {
//     setFilters(prev => ({
//       ...prev,
//       [key]: value,
//       page: key !== 'page' ? 1 : value // Reset to page 1 when changing filters
//     }));
//   };

//   const handlePageChange = (newPage) => {
//     setFilters(prev => ({ ...prev, page: newPage }));
//   };

//   if (loading && reviews.length === 0) {
//     return (
//       <Card>
//         <CardHeader>
//           <CardTitle>Reviews</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="flex items-center justify-center py-8">
//             <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
//           </div>
//         </CardContent>
//       </Card>
//     );
//   }

//   return (
//     <Card>
//       <CardHeader>
//         <div className="flex items-center justify-between">
//           <div>
//             <CardTitle>All Reviews</CardTitle>
//             <CardDescription>
//               {pagination.totalCount || 0} reviews total
//             </CardDescription>
//           </div>
          
//           {/* Filters */}
//           <div className="flex items-center space-x-2">
//             <Select
//               value={filters.minRating.toString()}
//               onValueChange={(value) => handleFilterChange('minRating', parseInt(value))}
//             >
//               <SelectTrigger className="w-32">
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="1">1+ Stars</SelectItem>
//                 <SelectItem value="2">2+ Stars</SelectItem>
//                 <SelectItem value="3">3+ Stars</SelectItem>
//                 <SelectItem value="4">4+ Stars</SelectItem>
//                 <SelectItem value="5">5 Stars</SelectItem>
//               </SelectContent>
//             </Select>

//             <Select
//               value={`${filters.sortBy}-${filters.order}`}
//               onValueChange={(value) => {
//                 const [sortBy, order] = value.split('-');
//                 setFilters(prev => ({ ...prev, sortBy, order, page: 1 }));
//               }}
//             >
//               <SelectTrigger className="w-40">
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="createdAt-desc">Newest First</SelectItem>
//                 <SelectItem value="createdAt-asc">Oldest First</SelectItem>
//                 <SelectItem value="rating-desc">Highest Rated</SelectItem>
//                 <SelectItem value="rating-asc">Lowest Rated</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>
//       </CardHeader>
//       <CardContent>
//         {error ? (
//           <div className="text-center py-8">
//             <div className="text-red-500 mb-4">
//               <p className="text-sm">{error}</p>
//             </div>
//             <Button variant="outline" size="sm" onClick={fetchReviews}>
//               Try Again
//             </Button>
//           </div>
//         ) : reviews.length === 0 ? (
//           <div className="text-center py-8">
//             <Star className="h-12 w-12 text-gray-300 mx-auto mb-4" />
//             <p className="text-gray-500 mb-2">No reviews found</p>
//             <p className="text-sm text-gray-400">
//               Try adjusting your filters or check back later
//             </p>
//           </div>
//         ) : (
//           <>
//             {/* Reviews List */}
//             <div className="space-y-6">
//               {reviews.map((review) => (
//                 <div key={review.id} className="border-b pb-6 last:border-b-0">
//                   <div className="flex items-start space-x-4">
//                     <Avatar className="h-10 w-10">
//                       <AvatarImage src={review.client.photoUrl} />
//                       <AvatarFallback>
//                         {review.client.displayName?.charAt(0) ||
//                           review.client.email.charAt(0)}
//                       </AvatarFallback>
//                     </Avatar>
                    
//                     <div className="flex-1">
//                       <div className="flex items-center justify-between mb-2">
//                         <div className="flex items-center space-x-3">
//                           {showClientInfo && (
//                             <p className="font-medium">
//                               {review.client.displayName || 
//                                review.client.email.split('@')[0]}
//                             </p>
//                           )}
//                           <div className="flex items-center">
//                             {[...Array(5)].map((_, i) => (
//                               <Star
//                                 key={i}
//                                 className={`h-4 w-4 ${
//                                   i < review.rating
//                                     ? "fill-yellow-400 text-yellow-400"
//                                     : "text-gray-300"
//                                 }`}
//                               />
//                             ))}
//                           </div>
//                           <Badge variant="secondary">
//                             {review.rating} star{review.rating !== 1 ? 's' : ''}
//                           </Badge>
//                         </div>
//                         <p className="text-sm text-gray-500">
//                           {new Date(review.createdAt).toLocaleDateString('en-US', {
//                             year: 'numeric',
//                             month: 'long',
//                             day: 'numeric'
//                           })}
//                         </p>
//                       </div>
                      
//                       {review.comment && (
//                         <p className="text-gray-700 leading-relaxed">
//                           {review.comment}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Pagination */}
//             {pagination.totalPages > 1 && (
//               <div className="flex items-center justify-between mt-6 pt-6 border-t">
//                 <p className="text-sm text-gray-600">
//                   Showing {((pagination.currentPage - 1) * filters.limit) + 1} to{' '}
//                   {Math.min(pagination.currentPage * filters.limit, pagination.totalCount)} of{' '}
//                   {pagination.totalCount} reviews
//                 </p>
                
//                 <div className="flex items-center space-x-2">
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={() => handlePageChange(pagination.currentPage - 1)}
//                     disabled={!pagination.hasPrevPage || loading}
//                   >
//                     <ChevronLeft className="h-4 w-4" />
//                     Previous
//                   </Button>
                  
//                   <span className="text-sm">
//                     Page {pagination.currentPage} of {pagination.totalPages}
//                   </span>
                  
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={() => handlePageChange(pagination.currentPage + 1)}
//                     disabled={!pagination.hasNextPage || loading}
//                   >
//                     Next
//                     <ChevronRight className="h-4 w-4" />
//                   </Button>
//                 </div>
//               </div>
//             )}
//           </>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// export default ReviewsList;


// // components/reviews/ReviewStats.jsx
// 'use client';
// import React, { useState, useEffect } from 'react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Progress } from "@/components/ui/progress";
// import { Star, TrendingUp } from "lucide-react";

// const ReviewStats = ({ lawyerProfileId }) => {
//   const [stats, setStats] = useState({
//     totalReviews: 0,
//     averageRating: 0,
//     ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
//     recentReviews: 0
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchStats = async () => {
//       if (!lawyerProfileId) return;
      
//       try {
//         const response = await fetch(`/api/reviews/lawyer/${lawyerProfileId}/stats`);
//         const data = await response.json();
        
//         if (data.success) {
//           setStats(data.data);
//         }
//       } catch (error) {
//         console.error('Error fetching review stats:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, [lawyerProfileId]);

//   if (loading) {
//     return (
//       <Card>
//         <CardHeader>
//           <CardTitle>Review Statistics</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             {[...Array(3)].map((_, i) => (
//               <div key={i} className="h-4 bg-gray-200 rounded animate-pulse" />
//             ))}
//           </div>
//         </CardContent>
//       </Card>
//     );
//   }

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle className="flex items-center space-x-2">
//           <Star className="h-5 w-5" />
//           <span>Review Statistics</span>
//         </CardTitle>
//         <CardDescription>
//           Your review performance overview
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-6">
//           {/* Overall Stats */}
//           <div className="grid grid-cols-2 gap-4">
//             <div className="text-center">
//               <div className="text-3xl font-bold text-yellow-600">
//                 {stats.averageRating.toFixed(1)}
//               </div>
//               <div className="text-sm text-gray-500">Average Rating</div>
//               <div className="flex justify-center mt-1">
//                 {[...Array(5)].map((_, i) => (
//                   <Star
//                     key={i}
//                     className={`h-4 w-4 ${
//                       i < Math.floor(stats.averageRating)
//                         ? "fill-yellow-400 text-yellow-400"
//                         : "text-gray-300"
//                     }`}
//                   />
//                 ))}
//               </div>
//             </div>
            
//             <div className="text-center">
//               <div className="text-3xl font-bold">{stats.totalReviews}</div>
//               <div className="text-sm text-gray-500">Total Reviews</div>
//               {stats.recentReviews > 0 && (
//                 <Badge variant="secondary" className="mt-1">
//                   <TrendingUp className="h-3 w-3 mr-1" />
//                   {stats.recentReviews} this month
//                 </Badge>
//               )}
//             </div>
//           </div>

//           {/* Rating Distribution */}
//           {stats.totalReviews > 0 && (
//             <div>
//               <h4 className="font-medium mb-3">Rating Distribution</h4>
//               <div className="space-y-2">
//                 {[5, 4, 3, 2, 1].map((rating) => {
//                   const count = stats.ratingDistribution[rating];
//                   const percentage = stats.totalReviews > 0 
//                     ? (count / stats.totalReviews) * 100 
//                     : 0;
                  
//                   return (
//                     <div key={rating} className="flex items-center space-x-3">
//                       <div className="flex items-center space-x-1 w-12">
//                         <span className="text-sm">{rating}</span>
//                         <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
//                       </div>
//                       <div className="flex-1">
//                         <Progress value={percentage} className="h-2" />
//                       </div>
//                       <div className="text-xs text-gray-500 w-12 text-right">
//                         {count} ({percentage.toFixed(0)}%)
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           )}
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default ReviewStats;