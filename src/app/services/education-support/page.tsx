
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, GraduationCap, User, Phone, Mail, Upload, BookOpen, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useFirebase, useUser } from "@/firebase/provider";
import { addEducationRequest, uploadFile } from "@/lib/services";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  studentName: z.string().min(2, { message: "Student name must be at least 2 characters." }),
  dateOfBirth: z.date({ required_error: "Date of birth is required." }),
  parentName: z.string().min(2, { message: "Parent/Guardian name must be at least 2 characters." }),
  contactNumber: z.string().regex(/^\d{10}$/, { message: "Please enter a valid 10-digit phone number." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  institutionName: z.string().min(3, { message: "Institution name is required." }),
  requestType: z.string().min(1, { message: "Please select a request type." }),
  details: z.string().min(20, { message: "Details must be at least 20 characters." }),
  document: z.instanceof(File).optional(),
});

export default function EducationSupportPage() {
    const { firestore } = useFirebase();
    const { user, isUserLoading } = useUser();
    const router = useRouter();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentName: "",
      parentName: "",
      contactNumber: "",
      email: "",
      institutionName: "",
      requestType: "",
      details: "",
    },
  });

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
     if (user) {
      form.setValue('parentName', user.displayName || '');
      form.setValue('email', user.email || '');
      form.setValue('contactNumber', user.phoneNumber ? user.phoneNumber.replace('+91', '') : '');
    }
  }, [user, isUserLoading, router, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!firestore || !user) {
        toast({ variant: 'destructive', title: 'Error', description: 'You must be logged in to submit a request.' });
        return;
    }
    setLoading(true);
    try {
        let documentUrl: string | undefined;
        if (values.document) {
            documentUrl = await uploadFile(values.document);
        }
        
        const payload: any = {
            ...values,
            dateOfBirth: values.dateOfBirth.toISOString(),
            ...(documentUrl && { documentUrl }),
        };
        delete payload.document;

        await addEducationRequest(firestore, payload, user.uid);
        
        form.reset();
        toast({ title: 'Success!', description: 'Education support request submitted. Track its status in your dashboard.' });
        router.push('/user-dashboard');
    } catch (error) {
        console.error("Error submitting education request: ", error);
        toast({ variant: 'destructive', title: 'Error', description: 'Failed to submit education request. Check permissions and try again.' });
    } finally {
      setLoading(false);
    }
  }

  if (isUserLoading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4 font-headline">Education Support</h1>
            <p className="text-gray-600 text-lg">Apply for scholarships and educational support programs</p>
          </div>

          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-semibold text-gray-800">
                <BookOpen className="w-6 h-6 mr-3 text-purple-600" />
                Instructions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-purple-600 font-semibold text-sm">1</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Submit Request</h3>
                      <p className="text-muted-foreground text-sm">Submit this form for scholarship, educational support, or skill program requests</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-purple-600 font-semibold text-sm">2</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Application ID</h3>
                      <p className="text-muted-foreground text-sm">You will get acknowledgment with unique Application ID</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-purple-600 font-semibold text-sm">3</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Track Status</h3>
                      <p className="text-muted-foreground text-sm">Track your request status in dashboard</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-purple-600 font-semibold text-sm">4</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Get Updates</h3>
                      <p className="text-muted-foreground text-sm">Receive updates on application status and next steps</p>
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
                      name="studentName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Student Name *</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                              <Input placeholder="Enter student's full name" {...field} className="pl-10" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="dateOfBirth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date of Birth *</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? format(field.value, "PPP") : <span>dd-mm-yyyy</span>}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="parentName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Parent/Guardian Name *</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                              <Input placeholder="Enter parent/guardian name" {...field} className="pl-10" />
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
                              <Input type="tel" placeholder="Enter contact number" {...field} className="pl-10" />
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
                                <Input type="email" placeholder="Enter email address" {...field} className="pl-10" />
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
                            name="institutionName"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Institution Name *</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                    <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                                    <Input placeholder="Enter school/college/university name" {...field} className="pl-10" />
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
                        name="requestType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Type of Request *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select request type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Scholarship">Scholarship</SelectItem>
                                <SelectItem value="Fee Waiver">Fee Waiver</SelectItem>
                                <SelectItem value="Educational Material">Educational Material Support</SelectItem>
                                <SelectItem value="Skill Program">Skill Development Program</SelectItem>
                                <SelectItem value="Book Grant">Book Grant</SelectItem>
                                <SelectItem value="Laptop/Tablet">Laptop/Tablet Support</SelectItem>
                                <SelectItem value="Uniform Grant">Uniform Grant</SelectItem>
                                <SelectItem value="Transportation">Transportation Support</SelectItem>
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
                        name="details"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Details of Request *</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Please provide detailed information about your educational support requirement including academic performance, financial situation, and specific needs"
                                className="resize-y min-h-[120px]"
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
                              Upload marksheet, ID proof, income certificate, or related documents (PDF, JPG, PNG, DOC - Max 5MB)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h3 className="font-medium text-purple-800 mb-2">Available Education Support Programs:</h3>
                    <ul className="text-sm text-purple-700 space-y-1 list-disc list-inside">
                        <li>Merit-based scholarships for outstanding students</li>
                        <li>Need-based financial assistance for economically disadvantaged students</li>
                        <li>Free textbooks and educational materials</li>
                        <li>Digital device support (laptops/tablets) for online learning</li>
                        <li>Skill development and vocational training programs</li>
                        <li>Career guidance and counseling services</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="font-medium text-blue-800 mb-2">Required Documents (if applicable):</h3>
                    <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
                        <li>Latest marksheet/grade report</li>
                        <li>Income certificate (for need-based support)</li>
                        <li>Caste certificate (if applicable)</li>
                        <li>Bank account details</li>
                        <li>Aadhaar card copy</li>
                        <li>Passport size photographs</li>
                    </ul>
                  </div>

                  <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3">
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : null}
                    Submit Education Support Request
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
