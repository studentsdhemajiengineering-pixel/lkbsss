
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon, Clock, User, Phone, Mail, FileText, Upload, CheckCircle, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { useFirebase, useUser } from "@/firebase/provider";
import { addAppointment, uploadFile } from "@/lib/services";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  dateOfBirth: z.date({
    required_error: "Date of birth is required.",
  }),
  mobile: z.string().regex(/^\d{10}$/, { message: "Please enter a valid 10-digit phone number." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  appointmentDate: z.date({
    required_error: "An appointment date is required.",
  }),
  purpose: z.string().min(10, { message: "Purpose must be at least 10 characters." }),
  document: z.instanceof(File).optional(),
});

export default function AppointmentBookingPage() {
  const { firestore } = useFirebase();
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      mobile: "",
      purpose: "",
    },
  });

  useEffect(() => {
    if (!isUserLoading && user) {
      form.setValue('fullName', user.displayName || '');
      form.setValue('email', user.email || '');
      form.setValue('mobile', user.phoneNumber ? user.phoneNumber.replace('+91', '') : '');
    }
  }, [user, isUserLoading, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!firestore || !user) {
        toast({ variant: 'destructive', title: 'Authentication Required', description: 'Please log in to book an appointment.' });
        router.push('/login');
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
            appointmentDate: values.appointmentDate.toISOString(),
        };
        if (documentUrl) {
            payload.documentUrl = documentUrl;
        }
        delete payload.document;


        await addAppointment(firestore, payload, user.uid);
        
        form.reset();
        toast({ title: 'Success!', description: 'Appointment booked successfully! Track its status in your dashboard.' });
        router.push('/user-dashboard');
    } catch (error) {
        console.error("Error submitting appointment:", error);
        toast({ variant: 'destructive', title: 'Submission Failed', description: 'Could not book appointment. Please try again.' });
    } finally {
        setLoading(false);
    }
  }
  
  const getMinDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 2);
    return date;
  };

  if (isUserLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CalendarIcon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4 font-headline">
              Appointment Booking
            </h1>
            <p className="text-gray-600 text-lg">
              Book your appointment online with ease
            </p>
          </div>

          <Card className="mb-8 shadow-lg">
            <CardHeader>
                <CardTitle className="flex items-center text-xl font-semibold text-gray-800">
                    <FileText className="w-6 h-6 mr-3 text-primary" />
                    Instructions
                </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary font-semibold text-sm">1</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Fill in Details</h3>
                      <p className="text-muted-foreground text-sm">
                        Complete all required fields with accurate information
                      </p>
                    </div>
                  </div>
                   <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary font-semibold text-sm">2</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Select Date</h3>
                      <p className="text-muted-foreground text-sm">
                        Choose appointment date (minimum 2 days from today)
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary font-semibold text-sm">3</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Submit & Confirm</h3>
                      <p className="text-muted-foreground text-sm">
                        You'll receive confirmation SMS/Email with details
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary font-semibold text-sm">4</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Track Status</h3>
                      <p className="text-muted-foreground text-sm">
                        Check appointment status in your dashboard
                      </p>
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
                      name="dateOfBirth"
                      render={({ field }) => (
                        <FormItem>
                           <FormLabel>Date of Birth *</FormLabel>
                            <Popover>
                            <PopoverTrigger asChild>
                                <FormControl>
                                <div className="relative">
                                    <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                                    <Input
                                        className="pl-10"
                                        readOnly
                                        value={field.value ? format(field.value, "PPP") : ""}
                                        placeholder="dd-mm-yyyy"
                                    />
                                </div>
                                </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                    date > new Date() || date < new Date("1900-01-01")
                                }
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
                    <div className="md:col-span-2">
                        <FormField
                        control={form.control}
                        name="appointmentDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Appointment Date *</FormLabel>
                                <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                    <div className="relative">
                                        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                                        <Input
                                            className="pl-10"
                                            readOnly
                                            value={field.value ? format(field.value, "PPP") : ""}
                                            placeholder="dd-mm-yyyy"
                                        />
                                    </div>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                        date < getMinDate()
                                    }
                                    initialFocus
                                    />
                                </PopoverContent>
                                </Popover>
                                <p className="text-sm text-muted-foreground mt-1">Minimum 2 days from today required</p>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>
                     <div className="md:col-span-2">
                        <FormField
                            control={form.control}
                            name="purpose"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Purpose of Appointment *</FormLabel>
                                <FormControl>
                                <Textarea
                                    placeholder="Please describe the purpose of your appointment in detail"
                                    className="resize-none"
                                    rows={4}
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
                                <p className="text-sm text-muted-foreground mt-1">
                                    Upload medical documents, ID proof, or related files (PDF, JPG, PNG, DOC - Max 5MB)
                                </p>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="font-medium text-primary mb-2">Important Notes:</h3>
                    <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
                    <li>Please arrive 15 minutes before your scheduled appointment</li>
                    <li>Bring original documents and ID proof</li>
                    <li>Appointments can be rescheduled up to 24 hours in advance</li>
                    <li>You will receive SMS/Email confirmation within 24 hours</li>
                    </ul>
                  </div>

                  <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-primary to-purple-600 text-white py-3">
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : null}
                    Book Appointment
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

    