'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Shield, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';

import Header from '@/components/header';
import Footer from '@/components/footer';

export default function PaymentPage() {
  const form = useForm({
    mode: 'onChange',
    defaultValues: {
      cardNumber: '',
      expiry: '',
      cvv: '',
      upiId: '',
      bank: '',
      billingFrequency: 'one-time',
    },
  });

  const { handleSubmit, control } = form;

  const onSubmit = (data) => {
    console.log('Payment data:', data);
    // Integrate with payment gateway (e.g., Razorpay, Stripe) here
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50">
      <Header />
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Complete Your Payment
          </h2>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span className="font-semibold">Step 1: Select Service</span>
              <span className="font-semibold">Step 2: Enter Details</span>
              <span>Step 3: Confirm Payment</span>
            </div>
            <Progress value={66} className="w-full h-2 bg-gray-200" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Payment Form */}
            <Card className="p-6 bg-white rounded-xl shadow-lg border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Payment Method</h3>
              
              <Form {...form}>
                <Tabs defaultValue="card" className="w-full">
                  <TabsList className="grid grid-cols-3 bg-gray-100 rounded-lg mb-4">
                    <TabsTrigger value="card">Credit/Debit Card</TabsTrigger>
                    <TabsTrigger value="upi">UPI</TabsTrigger>
                    <TabsTrigger value="netbanking">Net Banking</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="card">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={control}
                        name="cardNumber"
                        rules={{ 
                          required: "Card number is required",
                          pattern: {
                            value: /^[0-9\s]{13,19}$/,
                            message: "Please enter a valid card number"
                          }
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700">Card Number</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="1234 5678 9012 3456"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                maxLength={19}
                              />
                            </FormControl>
                            <FormMessage className="text-red-500 text-sm" />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={control}
                          name="expiry"
                          rules={{ 
                            required: "Expiry date is required",
                            pattern: {
                              value: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
                              message: "Please enter MM/YY format"
                            }
                          }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium text-gray-700">Expiry Date</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="MM/YY"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  maxLength={5}
                                />
                              </FormControl>
                              <FormMessage className="text-red-500 text-sm" />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={control}
                          name="cvv"
                          rules={{ 
                            required: "CVV is required",
                            pattern: {
                              value: /^[0-9]{3,4}$/,
                              message: "Please enter a valid CVV"
                            }
                          }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium text-gray-700">CVV</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="123"
                                  type="password"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  maxLength={4}
                                />
                              </FormControl>
                              <FormMessage className="text-red-500 text-sm" />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={control}
                        name="billingFrequency"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700">Billing Frequency</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                  <SelectValue placeholder="Select Billing Frequency" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="one-time">One-Time Payment</SelectItem>
                                <SelectItem value="monthly">Monthly Subscription</SelectItem>
                                <SelectItem value="yearly">Yearly Subscription</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage className="text-red-500 text-sm" />
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex gap-4 pt-4">
                        <Button
                          type="submit"
                          size="lg"
                          className="bg-blue-600 text-white hover:bg-blue-700 flex-1 py-3 px-6 rounded-md font-medium transition-colors"
                        >
                          Pay Now
                        </Button>
                        <Button
                          variant="outline"
                          size="lg"
                          className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white flex-1 py-3 px-6 rounded-md font-medium transition-colors"
                          asChild
                        >
                          <Link href="/get-started">Cancel</Link>
                        </Button>
                      </div>
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="upi">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={control}
                        name="upiId"
                        rules={{ 
                          required: "UPI ID is required",
                          pattern: {
                            value: /^[\w.-]+@[\w.-]+$/,
                            message: "Please enter a valid UPI ID"
                          }
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700">UPI ID</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="yourname@upi"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </FormControl>
                            <FormMessage className="text-red-500 text-sm" />
                          </FormItem>
                        )}
                      />
                      
                      <Button
                        type="submit"
                        size="lg"
                        className="bg-blue-600 text-white hover:bg-blue-700 w-full py-3 px-6 rounded-md font-medium transition-colors"
                      >
                        Pay Now
                      </Button>
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="netbanking">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={control}
                        name="bank"
                        rules={{ required: "Please select a bank" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700">Select Bank</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                  <SelectValue placeholder="Select your bank" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="sbi">State Bank of India</SelectItem>
                                <SelectItem value="hdfc">HDFC Bank</SelectItem>
                                <SelectItem value="icici">ICICI Bank</SelectItem>
                                <SelectItem value="axis">Axis Bank</SelectItem>
                                <SelectItem value="kotak">Kotak Mahindra Bank</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage className="text-red-500 text-sm" />
                          </FormItem>
                        )}
                      />
                      
                      <Button
                        type="submit"
                        size="lg"
                        className="bg-blue-600 text-white hover:bg-blue-700 w-full py-3 px-6 rounded-md font-medium transition-colors"
                      >
                        Proceed to Payment
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </Form>
            </Card>

            {/* Payment Summary */}
            <Card className="p-6 bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="mb-6">
                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertTitle>Security Notice</AlertTitle>
                  <AlertDescription>
                    Your payment is secured and all information is encrypted using industry-standard SSL technology.
                  </AlertDescription>
                </Alert>
              </div>
              
              <div className="text-center">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Order Summary</h4>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex justify-between">
                    <span>Service Fee</span>
                    <span>₹2,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Processing Fee</span>
                    <span>₹300</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (18%)</span>
                    <span>₹200</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between font-semibold text-lg text-gray-900">
                    <span>Total</span>
                    <span>₹2,500</span>
                  </div>
                </div>
                
                <div className="text-xs text-gray-500 text-left">
                  <p className="mb-2">By proceeding with payment, you agree to our:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Terms of Service</li>
                    <li>Privacy Policy</li>
                    <li>Refund Policy</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}