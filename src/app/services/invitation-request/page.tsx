
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { 
    Mail, 
    User, 
    Phone, 
    Calendar as CalendarIcon, 
    MapPin, 
    Upload, 
    Users,
    Loader2
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFirebase, useUser } from "@/firebase/provider";
import { addInvitationRequest, uploadFile } from "@/lib/services";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";


const formSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  organization: z.string().min(2, { message: "Organization name is required." }),
  designation: z.string().min(2, { message: "Designation is required." }),
  contactNumber: z.string().regex(/^\d{10}$/, { message: "Please enter a valid 10-digit phone number." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  eventType: z.string().min(1, { message: "Please select an event type." }),
  eventName: z.string().min(3, { message: "Event name is required." }),
  eventDate: z.date({ required_error: "An event date is required." }),
  eventVenue: z.string().min(10, { message: "Venue address is required." }),
  numberOfInvitees: z.string().min(1, { message: "Number of invitees is required." }),
  purpose: z.string().min(20, { message: "Purpose must be at least 20 characters." }),
  specialRequirements: z.string().optional(),
  document: z.instanceof(File).optional(),
});

export default function InvitationRequestPage() {
    const { firestore } = useFirebase();
    const { user, isUserLoading } = useUser();
    const router = useRouter();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      organization: "",
      designation: "",
      contactNumber: "",
      email: "",
      eventType: "",
      eventName: "",
      eventVenue: "",
      numberOfInvitees: "",
      purpose: "",
      specialRequirements: "",
    },
  });

  useEffect(() => {
    if (!isUserLoading && user) {
      form.setValue('fullName', user.displayName || '');
      form.setValue('email', user.email || '');
      form.setValue('contactNumber', user.phoneNumber ? user.phoneNumber.replace('+91', '') : '');
    }
  }, [user, isUserLoading, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!firestore || !user) {
        toast({ variant: 'destructive', title: 'Authentication Required', description: 'Please log in to submit a request.' });
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
            eventDate: values.eventDate.toISOString(),
            documentUrl,
        };
        
        delete payload.document;

        await addInvitationRequest(firestore, payload, user.uid);
        
        form.reset();
        toast({ title: 'Success!', description: 'Invitation request submitted. Track its status in your dashboard.' });
        router.push('/user-dashboard');
    } catch (error) {
        console.error("Error submitting invitation request:", error);
        toast({ variant: 'destructive', title: 'Submission Failed', description: 'Could not submit invitation request. Please try again.' });
    } finally {
        setLoading(false);
    }
  }

  const getMinDate = () => {
    return new Date();
  };

  if (isUserLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4 font-headline">Invitation Request</h1>
            <p className="text-gray-600 text-lg">Request invitations for official events and programs</p>
          </div>

          <Card className="mb-8 shadow-lg bg-white rounded-2xl p-8">
             <CardHeader className="p-0 mb-6">
                <CardTitle className="flex items-center text-xl font-semibold text-gray-800">
                    <Users className="w-6 h-6 mr-3 text-indigo-600" />
                    Instructions
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-indigo-600 font-semibold text-sm">1</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Event Details</h3>
                      <p className="text-muted-foreground text-sm">Provide complete information about your event</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-indigo-600 font-semibold text-sm">2</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Review Process</h3>
                      <p className="text-muted-foreground text-sm">Request will be reviewed within 5-7 working days</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-indigo-600 font-semibold text-sm">3</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Response</h3>
                      <p className="text-muted-foreground text-sm">You'll receive confirmation or further instructions</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-indigo-600 font-semibold text-sm">4</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Track Status</h3>
                      <p className="text-muted-foreground text-sm">Monitor request status in your dashboard</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg bg-white rounded-2xl">
            <CardContent className="p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="border-b border-gray-200 pb-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
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
                                            <Input placeholder="Enter your full name" {...field} className="pl-10 pr-4 py-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="organization"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Organization *</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your organization name" {...field} className="px-4 py-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="designation"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Designation *</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your designation" {...field} className="px-4 py-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
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
                                            <Input type="tel" placeholder="Enter contact number" {...field} className="pl-10 pr-4 py-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
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
                                            <Input type="email" placeholder="Enter your email address" {...field} className="pl-10 pr-4 py-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="border-b border-gray-200 pb-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Event Information</h3>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="eventType"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Event Type *</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                        <SelectTrigger className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent h-auto">
                                            <SelectValue placeholder="Select event type" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Conference">Conference</SelectItem>
                                            <SelectItem value="Seminar">Seminar</SelectItem>
                                            <SelectItem value="Workshop">Workshop</SelectItem>
                                            <SelectItem value="Cultural Event">Cultural Event</SelectItem>
                                            <SelectItem value="Award Ceremony">Award Ceremony</SelectItem>
                                            <SelectItem value="Inauguration">Inauguration</SelectItem>
                                            <SelectItem value="Meeting">Official Meeting</SelectItem>
                                            <SelectItem value="Other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="eventName"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Event Name *</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter event name" {...field} className="px-4 py-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="eventDate"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Event Date *</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full pl-10 pr-4 py-3 text-left font-normal border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent h-auto",
                                                !field.value && "text-muted-foreground"
                                            )}
                                            >
                                            <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                            {field.value ? format(field.value, "PPP") : <span>dd-mm-yyyy</span>}
                                            </Button>
                                        </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) => date < getMinDate()}
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
                                name="numberOfInvitees"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Number of Invitees *</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Enter number of invitees" {...field} onChange={e => field.onChange(parseInt(e.target.value, 10) || 0)} className="px-4 py-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <div className="md:col-span-2">
                                <FormField
                                    control={form.control}
                                    name="eventVenue"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Event Venue *</FormLabel>
                                        <FormControl>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                                            <Textarea
                                                placeholder="Enter complete venue address"
                                                className="resize-y min-h-[100px] pl-10 pr-4 py-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                {...field}
                                            />
                                        </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                             </div>
                        </div>
                    </div>
                     <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Additional Details</h3>
                        <div className="space-y-6">
                            <FormField
                                control={form.control}
                                name="purpose"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Purpose of Event *</FormLabel>
                                    <FormControl>
                                    <Textarea
                                        placeholder="Please describe the purpose and objectives of your event"
                                        className="resize-y min-h-[120px] px-4 py-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        {...field}
                                    />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="specialRequirements"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Special Requirements</FormLabel>
                                    <FormControl>
                                    <Textarea
                                        placeholder="Any special arrangements or requirements (optional)"
                                        className="resize-y min-h-[100px] px-4 py-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        {...field}
                                    />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="document"
                                render={({ field: { onChange, value, ...rest } }) => (
                                <FormItem>
                                    <FormLabel>Supporting Documents</FormLabel>
                                    <FormControl>
                                    <div className="relative">
                                        <Upload className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <Input type="file" onChange={(e) => onChange(e.target.files?.[0])} {...rest} className="pl-10 pr-4 py-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                                    </div>
                                    </FormControl>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Upload event proposal, organization details, or related documents (PDF, JPG, PNG, DOC - Max 5MB)
                                    </p>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <div className="bg-indigo-50 rounded-lg p-4">
                        <h3 className="font-medium text-indigo-800 mb-2">Important Notes:</h3>
                        <ul className="text-sm text-indigo-700 space-y-1 list-disc list-inside">
                            <li>Invitation requests should be submitted at least 15 days before the event</li>
                            <li>All requests are subject to approval based on availability and relevance</li>
                            <li>You will receive confirmation or alternative suggestions within 5-7 working days</li>
                            <li>For urgent requests, please contact the office directly</li>
                            <li>Provide accurate contact information for timely communication</li>
                        </ul>
                    </div>

                  <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300">
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : null}
                    Submit Invitation Request
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
