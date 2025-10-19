
"use client";

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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Heart, User, Phone, Mail, Upload, CheckCircle, Activity } from 'lucide-react';
import { useFirebase } from "@/firebase/provider";
import { addHealthRequest, uploadFile } from "@/lib/services";
import { useState } from "react";

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  age: z.coerce.number().min(1, { message: "Age is required." }),
  gender: z.string().min(1, { message: "Please select a gender." }),
  mobile: z.string().regex(/^\d{10}$/, { message: "Please enter a valid 10-digit phone number." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  assistanceType: z.string().min(1, { message: "Please select an assistance type." }),
  description: z.string().min(20, { message: "Description must be at least 20 characters." }),
  document: z.instanceof(File).optional(),
});

export default function HealthSupportPage() {
    const { firestore } = useFirebase();
    const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      gender: "",
      mobile: "",
      email: "",
      assistanceType: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!firestore) return;
    setLoading(true);
    try {
        let documentUrl;
        if (values.document) {
            documentUrl = await uploadFile(values.document);
        }

        await addHealthRequest(firestore, { ...values, documentUrl });
        
        form.reset();
        alert('Health support request submitted successfully!');
    } catch (error) {
        console.error("Error submitting health request: ", error);
        alert('Failed to submit health request.');
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4 font-headline">Health Support</h1>
            <p className="text-gray-600 text-lg">Get medical assistance and health support services</p>
          </div>

          <Card className="mb-8 shadow-lg">
            <CardHeader>
                <CardTitle className="flex items-center text-xl font-semibold text-gray-800">
                    <Activity className="w-6 h-6 mr-3 text-green-600" />
                    Instructions
                </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-green-600 font-semibold text-sm">1</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Health Assistance Form</h3>
                      <p className="text-muted-foreground text-sm">Use this form for health-related assistance requests</p>
                    </div>
                  </div>
                   <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-green-600 font-semibold text-sm">2</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Quick Response</h3>
                      <p className="text-muted-foreground text-sm">You will be contacted via SMS/Email after submission</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-green-600 font-semibold text-sm">3</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Health Camp Updates</h3>
                      <p className="text-muted-foreground text-sm">Check for health camp updates on your dashboard</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-green-600 font-semibold text-sm">4</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Track Progress</h3>
                      <p className="text-muted-foreground text-sm">Monitor your request status in the dashboard</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
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
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                                    <Input placeholder="Enter your full name" {...field} className="pl-10" />
                                    </div>
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="age"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Age *</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="Enter your age" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="gender"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Gender *</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select gender" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                    <SelectItem value="Male">Male</SelectItem>
                                    <SelectItem value="Female">Female</SelectItem>
                                    <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="mobile"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Mobile Number *</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                                    <Input type="tel" placeholder="Enter your mobile number" {...field} className="pl-10" />
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
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                                        <Input type="email" placeholder="Enter your email address" {...field} className="pl-10" />
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
                                name="assistanceType"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Type of Assistance *</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                        <SelectValue placeholder="Select assistance type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Emergency">Emergency Medical Help</SelectItem>
                                        <SelectItem value="Medicine Request">Medicine Request</SelectItem>
                                        <SelectItem value="Doctor Consultation">Doctor Consultation</SelectItem>
                                        <SelectItem value="Health Camp Registration">Health Camp Registration</SelectItem>
                                        <SelectItem value="Medical Equipment">Medical Equipment Support</SelectItem>
                                        <SelectItem value="Health Insurance">Health Insurance Assistance</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                        </div>
                        <div className="md:col-span-2">
                             <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description *</FormLabel>
                                    <FormControl>
                                    <Textarea
                                        placeholder="Please provide detailed description of your health assistance requirement including symptoms, medical history, or specific needs"
                                        className="resize-y min-h-[150px]"
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
                                            <Upload className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                                            <Input type="file" onChange={(e) => onChange(e.target.files?.[0])} {...rest} className="pl-10" />
                                        </div>
                                    </FormControl>
                                    <FormDescription>
                                        Upload medical reports, prescriptions, or related documents (PDF, JPG, PNG, DOC - Max 5MB)
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                        </div>
                   </div>

                  <div className="bg-green-50 rounded-lg p-4">
                    <h3 className="font-medium text-green-800 mb-2">Available Health Services:</h3>
                    <ul className="text-sm text-green-700 space-y-1 list-disc list-inside">
                        <li>Free medical checkups at government health centers</li>
                        <li>Emergency medical assistance and ambulance services</li>
                        <li>Medicine distribution programs for chronic diseases</li>
                        <li>Specialist doctor consultations through telemedicine</li>
                        <li>Health insurance enrollment and claim assistance</li>
                        <li>Regular health camps in rural and urban areas</li>
                    </ul>
                  </div>

                   <div className="bg-red-50 rounded-lg p-4">
                        <h3 className="font-medium text-red-800 mb-2">Emergency Contact:</h3>
                        <p className="text-sm text-red-700">
                        For medical emergencies, please call <strong>108</strong> (Ambulance) or visit the nearest hospital immediately. This form is for non-emergency health support requests.
                        </p>
                    </div>

                  <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white py-3">
                    {loading ? 'Submitting...' : 'Submit Health Support Request'}
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
