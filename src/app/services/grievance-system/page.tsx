
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
import { FileText, User, Phone, Mail, MapPin, Upload, AlertCircle, Loader2 } from "lucide-react";
import { useFirebase, useUser } from "@/firebase/provider";
import { addGrievance, uploadFile } from "@/lib/services";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  contactNumber: z.string().regex(/^\d{10}$/, { message: "Please enter a valid 10-digit phone number." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  address: z.string().min(10, { message: "Address must be at least 10 characters." }),
  grievanceType: z.string().min(1, { message: "Please select a grievance type." }),
  description: z.string().min(20, { message: "Description must be at least 20 characters." }),
  document: z.instanceof(File).optional(),
});

export default function PublicGrievancePage() {
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
      grievanceType: "",
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
      form.setValue('contactNumber', user.phoneNumber ? user.phoneNumber.replace('+91', '') : '');
    }
  }, [user, isUserLoading, router, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!firestore || !user) {
        toast({ variant: 'destructive', title: 'Error', description: 'You must be logged in to submit a grievance.' });
        return;
    }
    setLoading(true);

    let documentUrl: string | undefined;
    if (values.document) {
        documentUrl = await uploadFile(values.document);
    }
    
    const payload: any = { 
        ...values,
        ...(documentUrl && { documentUrl }),
    };
    delete payload.document;

    await addGrievance(firestore, payload, user.uid);
    
    form.reset();
    toast({ title: 'Success!', description: 'Grievance submitted successfully! Track its status in your dashboard.' });
    router.push('/user-dashboard');
    setLoading(false);
  }

  if (isUserLoading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4 font-headline">Public Complaint</h1>
            <p className="text-gray-600 text-lg">Submit your complaints and track resolution status</p>
          </div>

          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-semibold text-gray-800">
                <AlertCircle className="w-6 h-6 mr-3 text-red-600" />
                Instructions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-red-600 font-semibold text-sm">1</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Fill Details</h3>
                      <p className="text-muted-foreground text-sm">Provide complete information about your grievance</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-red-600 font-semibold text-sm">2</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Auto Ticket Generation</h3>
                      <p className="text-muted-foreground text-sm">System assigns unique ticket number automatically</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-red-600 font-semibold text-sm">3</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Acknowledgment</h3>
                      <p className="text-muted-foreground text-sm">You'll get SMS/Email with ticket ID for tracking</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-red-600 font-semibold text-sm">4</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Track Status</h3>
                      <p className="text-muted-foreground text-sm">Monitor grievance status in your dashboard</p>
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
                      name="contactNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Number *</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                              <Input type="tel" placeholder="Enter your contact number" {...field} className="pl-10" />
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
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Address *</FormLabel>
                            <FormControl>
                                <div className="relative">
                                     <MapPin className="absolute left-3 top-3 text-muted-foreground w-5 h-5" />
                                    <Textarea
                                        placeholder="Enter your complete address"
                                        className="resize-y min-h-[100px] pl-10"
                                        {...field}
                                    />
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
                        name="grievanceType"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Grievance Type *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select grievance type" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Government">Government Services</SelectItem>
                                    <SelectItem value="Administration">Administration Issues</SelectItem>
                                    <SelectItem value="Infrastructure">Infrastructure Problems</SelectItem>
                                    <SelectItem value="Healthcare">Healthcare Services</SelectItem>
                                    <SelectItem value="Education">Education Related</SelectItem>
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
                            <FormLabel>Description of Grievance *</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Please provide detailed description of your grievance including dates, locations, and any relevant information"
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
                                <Input 
                                  type="file" 
                                  onChange={(e) => onChange(e.target.files?.[0])}
                                  className="pl-10" 
                                  {...rest} 
                                />
                              </div>
                            </FormControl>
                            <FormDescription>
                              Upload supporting documents, photos, or ID proof (PDF, JPG, PNG, DOC - Max 5MB)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="bg-red-50 rounded-lg p-4">
                    <h3 className="font-medium text-red-800 mb-2">Important Information:</h3>
                    <ul className="text-sm text-red-700 space-y-1 list-disc list-inside">
                      <li>All grievances are reviewed within 7 working days</li>
                      <li>You will receive regular updates via SMS/Email</li>
                      <li>False or frivolous complaints may result in action</li>
                      <li>For urgent matters, please contact emergency helpline</li>
                      <li>Keep your ticket number safe for future reference</li>
                    </ul>
                  </div>

                  <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white py-3">
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : null}
                    Submit Grievance
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

    