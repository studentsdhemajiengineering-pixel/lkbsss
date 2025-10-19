
"use client";

import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Home, User, Phone, Mail, MapPin, Upload, Building, CheckCircle, Loader2 } from "lucide-react";
import { useFirebase, useUser } from "@/firebase/provider";
import { addRealEstateRequest, uploadFile } from "@/lib/services";
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  contactNumber: z.string().regex(/^\d{10}$/, { message: "Please enter a valid 10-digit phone number." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  address: z.string().min(10, { message: "Address must be at least 10 characters." }),
  propertyType: z.string().min(1, { message: "Please select a property type." }),
  consultationType: z.string().min(1, { message: "Please select a consultation type." }),
  propertyLocation: z.string().min(3, { message: "Property location is required." }),
  budgetRange: z.string().optional(),
  description: z.string().min(20, { message: "Description must be at least 20 characters." }),
  document: z.instanceof(File).optional(),
});

export default function RealEstateConsultancyPage() {
  const { firestore } = useFirebase();
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      contactNumber: "",
      email: "",
      address: "",
      propertyType: "",
      consultationType: "",
      propertyLocation: "",
      budgetRange: "",
      description: "",
    },
  });

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
    if (user) {
      form.setValue('fullName', user.displayName || '');
      form.setValue('email', user.email || '');
      form.setValue('contactNumber', user.phoneNumber ? user.phoneNumber.slice(3) : '');
    }
  }, [user, isUserLoading, router, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!firestore || !user) {
        toast({ variant: 'destructive', title: 'Error', description: 'You must be logged in to submit a request.' });
        return;
    }
    setLoading(true);
    try {
        let documentUrl;
        if (values.document) {
            documentUrl = await uploadFile(values.document);
        }

        await addRealEstateRequest(firestore, { ...values, documentUrl }, user.uid);
        
        form.reset();
        toast({ title: 'Success!', description: 'Real estate request submitted. Track its status in your dashboard.' });
        router.push('/user-dashboard');
    } catch (error) {
        console.error("Error submitting real estate request: ", error);
        toast({ variant: 'destructive', title: 'Error', description: 'Failed to submit request.' });
    }
    setLoading(false);
  }

  if (isUserLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-r from-teal-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Home className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4 font-headline">Real Estate Consultancy</h1>
            <p className="text-gray-600 text-lg">Get expert guidance on property matters and real estate transactions</p>
          </div>

          <Card className="mb-8 shadow-lg bg-white rounded-2xl">
            <CardHeader>
                <CardTitle className="flex items-center text-xl font-semibold text-gray-800">
                    <Building className="w-6 h-6 mr-3 text-teal-600" />
                    Instructions
                </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-teal-600 font-semibold text-sm">1</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Property Consultation</h3>
                      <p className="text-muted-foreground text-sm">Get expert advice on buying, selling, or renting properties</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-teal-600 font-semibold text-sm">2</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Expert Response</h3>
                      <p className="text-muted-foreground text-sm">Our real estate expert will contact you within 24-48 hours</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-teal-600 font-semibold text-sm">3</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Documentation Help</h3>
                      <p className="text-muted-foreground text-sm">Assistance with property documents and legal procedures</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-teal-600 font-semibold text-sm">4</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Track Progress</h3>
                      <p className="text-muted-foreground text-sm">Monitor your consultation status in the dashboard</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg bg-white rounded-2xl">
            <CardContent className="p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name *</FormLabel>
                          <FormControl>
                             <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <Input placeholder="Enter your full name" {...field} className="pl-10 pr-4 py-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="contactNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Number *</FormLabel>
                          <FormControl>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <Input type="tel" placeholder="Enter your contact number" {...field} className="pl-10 pr-4 py-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="md:col-span-2">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email ID *</FormLabel>
                            <FormControl>
                               <div className="relative">
                                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                  <Input type="email" placeholder="Enter your email address" {...field} className="pl-10 pr-4 py-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent" />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="md:col-span-2">
                       <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current Address *</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                                <Textarea
                                    placeholder="Enter your complete address"
                                    className="resize-y min-h-[100px] pl-10 pr-4 py-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                    {...field}
                                />
                               </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="propertyType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Property Type *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                                <SelectValue placeholder="Select property type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Residential">Residential</SelectItem>
                              <SelectItem value="Commercial">Commercial</SelectItem>
                              <SelectItem value="Industrial">Industrial</SelectItem>
                              <SelectItem value="Agricultural">Agricultural Land</SelectItem>
                              <SelectItem value="Plot">Plot/Land</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="consultationType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Consultation Type *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                                <SelectValue placeholder="Select consultation type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Buying">Property Buying</SelectItem>
                              <SelectItem value="Selling">Property Selling</SelectItem>
                              <SelectItem value="Renting">Property Renting</SelectItem>
                              <SelectItem value="Legal">Legal Documentation</SelectItem>
                              <SelectItem value="Valuation">Property Valuation</SelectItem>
                              <SelectItem value="Investment">Investment Advice</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="propertyLocation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Property Location *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter property location/area" {...field} className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="budgetRange"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Budget Range</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                                <SelectValue placeholder="Select budget range" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Under 10 Lakh">Under ₹10 Lakh</SelectItem>
                              <SelectItem value="10-25 Lakh">₹10-25 Lakh</SelectItem>
                              <SelectItem value="25-50 Lakh">₹25-50 Lakh</SelectItem>
                              <SelectItem value="50 Lakh - 1 Crore">₹50 Lakh - 1 Crore</SelectItem>
                              <SelectItem value="1-2 Crore">₹1-2 Crore</SelectItem>
                              <SelectItem value="Above 2 Crore">Above ₹2 Crore</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="md:col-span-2">
                       <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description of Requirement *</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Please provide detailed description of your real estate requirement, including specific needs, preferences, timeline, and any other relevant information"
                                className="resize-y min-h-[120px] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="md:col-span-2">
                       <FormField
                        control={form.control}
                        name="document"
                        render={({ field: { onChange, value, ...rest } }) => (
                          <FormItem>
                            <FormLabel>Optional Document Upload</FormLabel>
                            <FormControl>
                               <div className="relative">
                                <Upload className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <Input type="file" onChange={(e) => onChange(e.target.files?.[0])} className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent" {...rest} />
                              </div>
                            </FormControl>
                            <FormDescription className="text-sm text-gray-500 mt-1">
                              Upload property documents, ID proof, or related files (PDF, JPG, PNG, DOC - Max 5MB)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="bg-teal-50 rounded-lg p-4">
                    <h3 className="font-medium text-teal-800 mb-2">Our Real Estate Services:</h3>
                    <ul className="text-sm text-teal-700 space-y-1 list-disc list-inside">
                        <li>• Property buying and selling guidance</li>
                        <li>• Legal documentation and verification assistance</li>
                        <li>• Property valuation and market analysis</li>
                        <li>• Investment advisory and portfolio planning</li>
                        <li>• Rental property management consultation</li>
                        <li>• Land acquisition and development guidance</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="font-medium text-blue-800 mb-2">Important Information:</h3>
                    <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
                        <li>• Our certified real estate expert will contact you within 24-48 hours</li>
                        <li>• Initial consultation is free of charge</li>
                        <li>• All property transactions are handled with complete transparency</li>
                        <li>• We provide end-to-end support for all real estate needs</li>
                        <li>• Confidentiality of all client information is guaranteed</li>
                    </ul>
                  </div>

                  <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300">
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : null}
                    Submit Real Estate Consultancy Request
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
