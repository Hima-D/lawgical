// components/dashboard/LawyerProfile.jsx
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { 
  Settings, UserCheck, BookOpen, Award, Languages, 
  MapPin, Globe, Phone, Mail, Save, X, Plus, Trash2, Loader2
} from "lucide-react";
import { toast } from "sonner"; // Make sure you have sonner installed

const LawyerProfile = ({ user, onProfileUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    bio: '',
    specialization: '',
    licenseNumber: '',
    firmName: '',
    address: '',
    websiteUrl: '',
    hourlyRate: '',
    yearsExperience: '',
    education: [],
    certifications: [],
    languages: []
  });

  if (!user.lawyerProfile) return null;

  // Initialize form data when entering edit mode
  const handleEditClick = () => {
    setFormData({
      bio: user.lawyerProfile.bio || '',
      specialization: user.lawyerProfile.specialization || '',
      licenseNumber: user.lawyerProfile.licenseNumber || '',
      firmName: user.lawyerProfile.firmName || '',
      address: user.lawyerProfile.address || '',
      websiteUrl: user.lawyerProfile.websiteUrl || '',
      hourlyRate: user.lawyerProfile.hourlyRate || '',
      yearsExperience: user.lawyerProfile.yearsExperience || '',
      education: user.lawyerProfile.education || [],
      certifications: user.lawyerProfile.certifications || [],
      languages: user.lawyerProfile.languages || []
    });
    setIsEditing(true);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayAdd = (field, value, inputRef) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field], value.trim()]
      }));
      if (inputRef && inputRef.current) {
        inputRef.current.value = '';
      }
    }
  };

  const handleArrayRemove = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/lawyer/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.message || 'Profile updated successfully');
        if (onProfileUpdate) {
          onProfileUpdate(result.data.profile);
        }
        setIsEditing(false);
      } else {
        toast.error(result.error || 'Failed to update profile');
        if (result.errors) {
          result.errors.forEach(error => toast.error(error));
        }
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      bio: '',
      specialization: '',
      licenseNumber: '',
      firmName: '',
      address: '',
      websiteUrl: '',
      hourlyRate: '',
      yearsExperience: '',
      education: [],
      certifications: [],
      languages: []
    });
  };

  const completionPercentage = Math.round(
    (((user.lawyerProfile.bio ? 1 : 0) +
      (user.lawyerProfile.firmName ? 1 : 0) +
      (user.lawyerProfile.address ? 1 : 0) +
      (user.lawyerProfile.websiteUrl ? 1 : 0) +
      (user.lawyerProfile.hourlyRate ? 1 : 0) +
      (user.lawyerProfile.services?.length > 0 ? 1 : 0)) /
      6) * 100
  );

  return (
    <Card className="mt-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Professional Profile</CardTitle>
            <CardDescription>
              Your public profile information
            </CardDescription>
          </div>
          {!isEditing ? (
            <Button variant="outline" size="sm" onClick={handleEditClick}>
              <Settings className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleCancel}
                disabled={isLoading}
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button 
                size="sm" 
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Save Changes
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="specialization">Specialization *</Label>
                <Input
                  id="specialization"
                  value={formData.specialization}
                  onChange={(e) => handleInputChange('specialization', e.target.value)}
                  placeholder="e.g., Corporate Law, Criminal Defense"
                  required
                />
              </div>
              <div>
                <Label htmlFor="licenseNumber">License Number *</Label>
                <Input
                  id="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                  placeholder="Your license number"
                  required
                />
              </div>
              <div>
                <Label htmlFor="firmName">Law Firm</Label>
                <Input
                  id="firmName"
                  value={formData.firmName}
                  onChange={(e) => handleInputChange('firmName', e.target.value)}
                  placeholder="Your law firm name"
                />
              </div>
              <div>
                <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                <Input
                  id="hourlyRate"
                  type="number"
                  min="0"
                  max="10000"
                  value={formData.hourlyRate}
                  onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                  placeholder="Your hourly rate"
                />
              </div>
              <div>
                <Label htmlFor="yearsExperience">Years of Experience</Label>
                <Input
                  id="yearsExperience"
                  type="number"
                  min="0"
                  max="70"
                  value={formData.yearsExperience}
                  onChange={(e) => handleInputChange('yearsExperience', e.target.value)}
                  placeholder="Years of experience"
                />
              </div>
              <div>
                <Label htmlFor="websiteUrl">Website URL</Label>
                <Input
                  id="websiteUrl"
                  type="url"
                  value={formData.websiteUrl}
                  onChange={(e) => handleInputChange('websiteUrl', e.target.value)}
                  placeholder="https://your-website.com"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <Label htmlFor="address">Office Address</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Your office address"
                rows={2}
              />
            </div>

            {/* Bio */}
            <div>
              <Label htmlFor="bio">Professional Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                placeholder="Tell clients about your background, experience, and approach..."
                rows={4}
                maxLength={2000}
              />
              <div className="text-sm text-gray-500 mt-1">
                {formData.bio.length}/2000 characters
              </div>
            </div>

            {/* Education */}
            <div>
              <Label>Education</Label>
              <ArrayField
                items={formData.education}
                onAdd={(value) => handleArrayAdd('education', value)}
                onRemove={(index) => handleArrayRemove('education', index)}
                placeholder="Add education (e.g., JD from Harvard Law School)"
                icon={BookOpen}
              />
            </div>

            {/* Certifications */}
            <div>
              <Label>Certifications</Label>
              <ArrayField
                items={formData.certifications}
                onAdd={(value) => handleArrayAdd('certifications', value)}
                onRemove={(index) => handleArrayRemove('certifications', index)}
                placeholder="Add certification (e.g., Certified Family Law Specialist)"
                icon={Award}
              />
            </div>

            {/* Languages */}
            <div>
              <Label>Languages</Label>
              <ArrayField
                items={formData.languages}
                onAdd={(value) => handleArrayAdd('languages', value)}
                onRemove={(index) => handleArrayRemove('languages', index)}
                placeholder="Add language (e.g., English, Spanish)"
                icon={Languages}
              />
            </div>
          </form>
        ) : (
          // Read-only view (your original content)
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <Label className="text-sm font-medium text-gray-500">
                  Specialization
                </Label>
                <p className="mt-1 font-medium">
                  {user.lawyerProfile.specialization}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">
                  License Number
                </Label>
                <p className="mt-1 font-medium">
                  {user.lawyerProfile.licenseNumber}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">
                  Hourly Rate
                </Label>
                <p className="mt-1 font-medium">
                  ${user.lawyerProfile.hourlyRate || "Not set"}
                </p>
              </div>
              {user.lawyerProfile.firmName && (
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Law Firm
                  </Label>
                  <p className="mt-1 font-medium">
                    {user.lawyerProfile.firmName}
                  </p>
                </div>
              )}
              {user.lawyerProfile.address && (
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Office Address
                  </Label>
                  <p className="mt-1 font-medium">
                    {user.lawyerProfile.address}
                  </p>
                </div>
              )}
              {user.lawyerProfile.websiteUrl && (
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Website
                  </Label>
                  <p className="mt-1 font-medium text-blue-600 hover:text-blue-800">
                    <a
                      href={user.lawyerProfile.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {user.lawyerProfile.websiteUrl}
                    </a>
                  </p>
                </div>
              )}
              {user.lawyerProfile.yearsExperience && (
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Experience
                  </Label>
                  <p className="mt-1 font-medium">
                    {user.lawyerProfile.yearsExperience}+ years
                  </p>
                </div>
              )}
              <div>
                <Label className="text-sm font-medium text-gray-500">
                  Member Since
                </Label>
                <p className="mt-1 font-medium">
                  {new Date(user.lawyerProfile.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">
                  Total Services
                </Label>
                <p className="mt-1 font-medium">
                  {user.lawyerProfile.services?.length || 0} Services
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">
                  Profile Status
                </Label>
                <div className="flex items-center mt-1">
                  <p className="font-medium mr-2">
                    {completionPercentage}% Complete
                  </p>
                  {user.lawyerProfile.isVerified && (
                    <Badge variant="default" className="text-xs">
                      <UserCheck className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Education & Certifications */}
            {(user.lawyerProfile.education?.length > 0 ||
              user.lawyerProfile.certifications?.length > 0) && (
              <>
                <Separator className="my-6" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {user.lawyerProfile.education?.length > 0 && (
                    <div>
                      <Label className="text-sm font-medium text-gray-500">
                        Education
                      </Label>
                      <div className="mt-2 space-y-1">
                        {user.lawyerProfile.education.map((edu, index) => (
                          <div key={index} className="flex items-center">
                            <BookOpen className="h-4 w-4 text-gray-400 mr-2" />
                            <p className="text-sm">{edu}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {user.lawyerProfile.certifications?.length > 0 && (
                    <div>
                      <Label className="text-sm font-medium text-gray-500">
                        Certifications
                      </Label>
                      <div className="mt-2 space-y-1">
                        {user.lawyerProfile.certifications.map((cert, index) => (
                          <div key={index} className="flex items-center">
                            <Award className="h-4 w-4 text-gray-400 mr-2" />
                            <p className="text-sm">{cert}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Languages */}
            {user.lawyerProfile.languages?.length > 0 && (
              <>
                <Separator className="my-6" />
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Languages
                  </Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {user.lawyerProfile.languages.map((language, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="flex items-center"
                      >
                        <Languages className="h-3 w-3 mr-1" />
                        {language}
                      </Badge>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Professional Bio */}
            {user.lawyerProfile.bio && (
              <>
                <Separator className="my-6" />
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Professional Bio
                  </Label>
                  <p className="mt-2 text-gray-700 leading-relaxed">
                    {user.lawyerProfile.bio}
                  </p>
                </div>
              </>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

// Helper component for managing arrays (education, certifications, languages)
const ArrayField = ({ items, onAdd, onRemove, placeholder, icon: Icon }) => {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    if (inputValue.trim()) {
      onAdd(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="flex-1"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAdd}
          disabled={!inputValue.trim()}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      {items.length > 0 && (
        <div className="space-y-1">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-50 p-2 rounded-md"
            >
              <div className="flex items-center">
                <Icon className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-sm">{item}</span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onRemove(index)}
                className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LawyerProfile;