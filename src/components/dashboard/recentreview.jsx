// components/dashboard/RecentReviews.jsx
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const RecentReviews = ({ user }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Reviews</CardTitle>
        <CardDescription>
          What clients are saying about you
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {user.lawyerProfile?.reviews
            .slice(0, 3)
            .map((review) => (
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
                        {review.client.displayName || review.client.email}
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
                      <p className="text-sm text-gray-600">
                        {review.comment}
                      </p>
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
              <p className="text-sm text-gray-400">
                Complete your first appointment to get reviews
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentReviews;