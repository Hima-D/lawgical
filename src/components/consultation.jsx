import React, { useState } from 'react';
import { X, CheckCircle, Mail, Phone, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button'; // shadcn/ui Button component
import { Card, CardContent } from '@/components/ui/card'; // shadcn/ui Card component
import { Link } from 'next/link'; // or use 'next/link' for Next.js

const ConsultationModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    serviceType: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (submitError) {
      setSubmitError("");
    }
  };

  const submitToHubSpot = async (data) => {
    try {
      const response = await fetch("/api/hubspot-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: data.firstName,
          lastname: data.lastName,
          email: data.email,
          phone: data.phone,
          company: data.company,
          message: data.message,
          service_type: data.serviceType,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        return {
          success: true,
          contactId: result.contactId,
          message: result.message,
        };
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }
    } catch (error) {
      console.error("HubSpot submission error:", error);
      return {
        success: false,
        error: error.message || "Network error occurred",
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const result = await submitToHubSpot(formData);

      if (result.success) {
        setIsSuccess(true);

        if (typeof window !== "undefined" && window.gtag) {
          window.gtag("event", "conversion", {
            send_to: "G-4H1WL5DLNM/consultation_request",
            value: 1,
            currency: "USD",
          });
        }

        if (typeof window !== "undefined" && window.analytics) {
          window.analytics.track("Consultation Requested", {
            service_type: formData.serviceType,
            company: formData.company,
            contact_id: result.contactId,
            timestamp: new Date().toISOString(),
          });
        }

        if (typeof window !== "undefined" && window.fbq) {
          window.fbq("track", "Lead", {
            content_name: "Legal Consultation",
            content_category: formData.serviceType,
            value: 1,
            currency: "USD",
          });
        }

        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          company: "",
          message: "",
          serviceType: "",
        });
      } else {
        setSubmitError(result.error);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetModal = () => {
    setIsSuccess(false);
    setSubmitError("");
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      message: "",
      serviceType: "",
    });
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-gray-100">
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Free Legal Consultation</h2>
            <Button
              variant="ghost"
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close modal"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          {isSuccess ? (
            <div className="text-center py-8">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Thank You!
              </h3>
              <p className="text-gray-600 mb-6">
                Your consultation request has been submitted successfully. Our legal expert will contact you within 24 hours.
              </p>
              <div className="space-y-2 mb-6">
                <p className="text-sm text-gray-500">
                  <Mail className="h-4 w-4 inline mr-2" />
                  Confirmation email sent to: <strong>{formData.email}</strong>
                </p>
                <p className="text-sm text-gray-500">
                  <Phone className="h-4 w-4 inline mr-2" />
                  We&apos;ll call you at: <strong>{formData.phone}</strong>
                </p>
              </div>
              <Button
                onClick={handleClose}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Close
              </Button>
            </div>
          ) : (
            <div>
              {submitError && (
                <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center">
                    <X className="h-5 w-5 text-red-500 mr-3" />
                    <div>
                      <p className="text-sm text-red-700">{submitError}</p>
                      <p className="text-xs text-red-600 mt-1">
                        Please try again or contact us at +91-8383801899
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                    placeholder="john.doe@domain.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Company/Organization
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                    placeholder="Your Company Name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="serviceType"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Service Required *
                  </label>
                  <select
                    id="serviceType"
                    name="serviceType"
                    required
                    value={formData.serviceType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                  >
                    <option value="">Select a service</option>
                    <option value="company-registration">Company Registration</option>
                    <option value="gst-services">GST Registration</option>
                    <option value="trademark">Trademark Registration</option>
                    <option value="legal-consultation">Legal Consultation</option>
                    <option value="compliance">POSH Compliance</option>
                    <option value="contract-drafting">Contract Drafting</option>
                    <option value="intellectual-property">Intellectual Property</option>
                    <option value="tax-planning">Tax Planning</option>
                    <option value="labor-law">Labor Law</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your legal requirements..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                  ></textarea>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-start">
                    <Shield className="h-5 w-5 text-blue-600 mt-1 mr-3" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium">Your information is secure</p>
                      <p className="text-xs text-blue-600 mt-1">
                        We use bank-level encryption and never share your data.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Submitting...
                      </div>
                    ) : (
                      "Request Free Consultation"
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClose}
                    className="flex-1 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                  >
                    Cancel
                  </Button>
                </div>

                <div className="text-center text-xs text-gray-500 mt-4">
                  By submitting this form, you agree to our{" "}
                  <Link href="/privacy-policy" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link href="/terms-of-service" className="text-blue-600 hover:underline">
                    Terms of Service
                  </Link>
                </div>
              </form>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ConsultationModal;