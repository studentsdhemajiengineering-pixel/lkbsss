'use client';

import React, { useState, useEffect } from 'react';
import { useUser, useFirebase } from '@/firebase/provider';
import { useRouter } from 'next/navigation';
import { 
  getAppointments, 
  getGrievances, 
  getHealthRequests, 
  getEducationRequests, 
  getRealEstateRequests, 
  getInvitationRequests 
} from '@/lib/services';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { getStatusColor } from '@/lib/status-helpers';
import { Home, User, BarChart2, Loader2, LogOut, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { signOut } from 'firebase/auth';
import type { Appointment, Grievance, HealthRequest, EducationRequest, RealEstateRequest, InvitationRequest } from '@/lib/types';

type ServiceRequest = {
  id: string;
  type: string;
  status: string;
  submittedAt: string;
  details: string;
  reference: string;
};

export default function UserDashboardPage() {
  const { user, isUserLoading } = useUser();
  const { firestore, auth } = useFirebase();
  const router = useRouter();
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  useEffect(() => {
    if (user && firestore) {
      const fetchRequests = async () => {
        setLoading(true);
        
        try {
          // Fetch all request types for the current user
          const [appointments, grievances, health, education, realEstate, invitations] = await Promise.all([
            getAppointments(firestore, user.uid),
            getGrievances(firestore, user.uid),
            getHealthRequests(firestore, user.uid),
            getEducationRequests(firestore, user.uid),
            getRealEstateRequests(firestore, user.uid),
            getInvitationRequests(firestore, user.uid),
          ]);

          const allRequests: ServiceRequest[] = [];

          // Process and combine all requests into a single list
          appointments.forEach((req: Appointment) => allRequests.push({ id: req.id, type: 'Appointment', status: req.status, submittedAt: req.submittedAt, details: req.purpose, reference: req.id.slice(0,8) }));
          grievances.forEach((req: Grievance) => allRequests.push({ id: req.id, type: 'Grievance', status: req.status, submittedAt: req.submittedAt, details: req.grievanceType, reference: req.ticketNumber }));
          health.forEach((req: HealthRequest) => allRequests.push({ id: req.id, type: 'Health Support', status: req.status, submittedAt: req.submittedAt, details: req.assistanceType, reference: req.id.slice(0,8) }));
          education.forEach((req: EducationRequest) => allRequests.push({ id: req.id, type: 'Education Support', status: req.status, submittedAt: req.submittedAt, details: req.requestType, reference: req.id.slice(0,8) }));
          realEstate.forEach((req: RealEstateRequest) => allRequests.push({ id: req.id, type: 'Real Estate', status: req.status, submittedAt: req.submittedAt, details: req.consultationType, reference: req.id.slice(0,8) }));
          invitations.forEach((req: InvitationRequest) => allRequests.push({ id: req.id, type: 'Invitation', status: req.status, submittedAt: req.submittedAt, details: req.eventName, reference: req.id.slice(0,8) }));

          // Sort all requests by submission date, most recent first
          allRequests.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
          setRequests(allRequests);

        } catch (error) {
            console.error("Failed to fetch user requests:", error);
        } finally {
            setLoading(false);
        }
      };

      fetchRequests();
    } else if (!isUserLoading && !user) {
      setLoading(false);
    }
  }, [user, firestore, isUserLoading]);

  const handleLogout = async () => {
    if(auth){
        await signOut(auth);
        router.push('/');
    }
  };

  if (isUserLoading || loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }
  
  if (!user) {
     return (
      <div className="flex h-screen items-center justify-center">
        <p>Please log in to see your dashboard.</p>
      </div>
    );
  }
  
  const totalRequests = requests.length;
  const pendingRequests = requests.filter(r => ['pending', 'submitted', 'under_review', 'processing', 'in_progress'].includes(r.status.toLowerCase())).length;
  const completedRequests = totalRequests - pendingRequests;

  return (
    <div className="min-h-screen bg-secondary/50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <Card className="mb-8 bg-card shadow-lg">
          <CardHeader className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary-light rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-primary-foreground" />
                </div>
                <div>
                    <CardTitle className="text-2xl font-bold font-headline">Welcome, {user.displayName || 'User'}</CardTitle>
                    <p className="text-muted-foreground">{user.email || user.phoneNumber}</p>
                </div>
            </div>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
                    <BarChart2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent><div className="text-2xl font-bold">{totalRequests}</div></CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
                    <Loader2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent><div className="text-2xl font-bold">{pendingRequests}</div></CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Completed/Resolved</CardTitle>
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent><div className="text-2xl font-bold">{completedRequests}</div></CardContent>
            </Card>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>My Service Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Reference</TableHead>
                            <TableHead>Service Type</TableHead>
                            <TableHead>Details</TableHead>
                            <TableHead>Submitted On</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {requests.length > 0 ? requests.map(req => (
                            <TableRow key={req.id}>
                                <TableCell className="font-mono text-xs">{req.reference.toUpperCase()}</TableCell>
                                <TableCell>{req.type}</TableCell>
                                <TableCell className="text-muted-foreground">{req.details}</TableCell>
                                <TableCell>{new Date(req.submittedAt).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <Badge variant="outline" className={`${getStatusColor(req.status)} capitalize`}>
                                        {req.status.replace(/_/g, ' ')}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center h-24">You have not submitted any service requests yet.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
              </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
