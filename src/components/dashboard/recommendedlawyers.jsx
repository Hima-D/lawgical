// components/dashboard/RecommendedLawyers.jsx
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserCheck, Star, MapPin } from "lucide-react";

const RecommendedLawyers = () => {
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
      verified: true,
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
      verified: true,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommended Lawyers</CardTitle>
        <CardDescription>
          Top-rated lawyers in your area
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sampleLawyers.map((lawyer) => (
            <div
              key={lawyer.id}
              className="flex items-center space-x-4 p-3 border rounded-lg"
            >
              <Avatar className="h-12 w-12">
                <AvatarImage src={lawyer.avatar} />
                <AvatarFallback>
                  {lawyer.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
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
                <p className="text-sm text-gray-500">
                  {lawyer.specialization}
                </p>
                <div className="flex items-center space-x-4 mt-1">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < Math.floor(lawyer.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
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
                <p className="font-semibold">
                  ${lawyer.hourlyRate}/hr
                </p>
                <Button size="sm" className="mt-2">
                  Book
                </Button>
              </div>
            </div>
          ))}
          <Button variant="outline" className="w-full">
            View All Lawyers
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendedLawyers;