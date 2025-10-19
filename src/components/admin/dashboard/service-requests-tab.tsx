
"use client";

import React, { useState, useMemo } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { getStatusColor } from "@/lib/status-helpers.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useFirebase } from '@/firebase/provider';
import { updateServiceRequestStatus, deleteServiceRequest } from '@/lib/services';
import type { Appointment, Grievance, HealthRequest, EducationRequest, RealEstateRequest, InvitationRequest } from '@/lib/types';


type ServiceRequestsTabProps = {
    appointments: Appointment[];
    grievances: Grievance[];
    healthRequests: HealthRequest[];
    educationRequests: EducationRequest[];
    realEstateRequests: RealEstateRequest[];
    invitationRequests: InvitationRequest[];
    onDataChange: () => void;
};

type RequestType = 'appointments' | 'grievances' | 'health' | 'education' | 'realestate' | 'invitation';

const requestTypes: { id: RequestType, label: string, collection: string }[] = [
    { id: 'appointments', label: 'Appointments', collection: 'appointments' },
    { id: 'grievances', label: 'Grievances', collection: 'grievances' },
    { id: 'health', label: 'Health Support', collection: 'health-requests' },
    { id: 'education', label: 'Education Support', collection: 'education-requests' },
    { id: 'realestate', label: 'Real Estate', collection: 'real-estate-requests' },
    { id: 'invitation', label: 'Invitations', collection: 'invitation-requests' },
];

const statusOptions: Record<RequestType, string[]> = {
    appointments: ['pending', 'confirmed', 'completed', 'cancelled'],
    grievances: ['submitted', 'under_review', 'resolved', 'closed'],
    health: ['submitted', 'processing', 'approved', 'completed'],
    education: ['submitted', 'under_review', 'approved', 'rejected'],
    realestate: ['submitted', 'under_review', 'in_progress', 'completed'],
    invitation: ['submitted', 'under_review', 'approved', 'rejected'],
};


const ServiceRequestsTab: React.FC<ServiceRequestsTabProps> = ({
    appointments,
    grievances,
    healthRequests,
    educationRequests,
    realEstateRequests,
    invitationRequests,
    onDataChange,
}) => {
    const { firestore } = useFirebase();
    const [activeRequestType, setActiveRequestType] = useState<RequestType>('appointments');
    const [loading, setLoading] = useState(false);

    const dataMap = useMemo(() => ({
        appointments,
        grievances,
        health: healthRequests,
        education: educationRequests,
        realestate: realEstateRequests,
        invitation: invitationRequests,
    }), [appointments, grievances, healthRequests, educationRequests, realEstateRequests, invitationRequests]);

    const activeData = dataMap[activeRequestType];
    const activeStatusOptions = statusOptions[activeRequestType];
    const activeCollection = requestTypes.find(rt => rt.id === activeRequestType)?.collection || '';


    const handleUpdateStatus = async (id: string, status: string) => {
        if (!firestore || !activeCollection) return;
        setLoading(true);
        try {
            await updateServiceRequestStatus(firestore, activeCollection, id, status);
            onDataChange();
        } catch (error) {
            console.error(`Error updating status for ${activeCollection}:`, error);
        }
        setLoading(false);
    };

    const handleDeleteItem = async (id: string) => {
        if (!firestore || !activeCollection) return;
        if (!confirm('Are you sure you want to delete this item?')) return;
        setLoading(true);
        try {
            await deleteServiceRequest(firestore, activeCollection, id);
            onDataChange();
        } catch (error) {
             console.error(`Error deleting item from ${activeCollection}:`, error);
        }
        setLoading(false);
    };

    const getRequestDetails = (item: any, type: RequestType) => {
        const details = {
            name: item.fullName || item.studentName,
            description: '',
            contact: item.mobile || item.contactNumber,
            email: item.email,
            date: item.submittedAt ? new Date(item.submittedAt).toLocaleDateString() : 'N/A'
        };

        switch(type) {
            case 'appointments':
                details.description = item.purpose;
                break;
            case 'grievances':
                details.description = `Ticket: ${item.ticketNumber}`;
                break;
            case 'health':
                details.description = item.assistanceType;
                break;
            case 'education':
                details.description = item.requestType;
                break;
            case 'realestate':
                details.description = item.consultationType;
                break;
            case 'invitation':
                details.description = item.eventName;
                break;
        }
        return details;
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-xl font-semibold text-foreground">Service Request Management</h2>
                <div className="flex space-x-2 overflow-x-auto pb-2">
                    {requestTypes.map((type) => (
                        <Button
                            key={type.id}
                            variant={activeRequestType === type.id ? 'default' : 'outline'}
                            onClick={() => setActiveRequestType(type.id)}
                            className="shrink-0"
                        >
                            {type.label}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-muted/50">
                            <TableRow>
                                <TableHead className="px-6 py-4">Details</TableHead>
                                <TableHead className="px-6 py-4">Contact</TableHead>
                                <TableHead className="px-6 py-4">Status</TableHead>
                                <TableHead className="px-6 py-4">Date</TableHead>
                                <TableHead className="px-6 py-4">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-8">
                                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                        <p className="mt-2 text-muted-foreground">Loading...</p>
                                    </TableCell>
                                </TableRow>
                            ) : activeData && activeData.length > 0 ? (
                                activeData.map((item) => {
                                    const details = getRequestDetails(item, activeRequestType);
                                    return (
                                    <TableRow key={item.id} className="hover:bg-muted/50">
                                        <TableCell className="px-6 py-4">
                                            <h3 className="text-sm font-medium text-foreground">{details.name}</h3>
                                            <p className="text-sm text-muted-foreground">{details.description}</p>
                                        </TableCell>
                                        <TableCell className="px-6 py-4">
                                            <p className="text-sm text-foreground">{details.contact}</p>
                                            <p className="text-sm text-muted-foreground">{details.email}</p>
                                        </TableCell>
                                        <TableCell className="px-6 py-4">
                                            <Select
                                                value={item.status}
                                                onValueChange={(value) => handleUpdateStatus(item.id, value)}
                                            >
                                                <SelectTrigger className={`w-36 h-auto text-xs font-medium border-0 focus:ring-0 ${getStatusColor(item.status)}`}>
                                                    <SelectValue placeholder="Select Status"/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {activeStatusOptions.map(option => (
                                                         <SelectItem key={option} value={option}>
                                                            <span className="capitalize">{option.replace('_', ' ')}</span>
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                        <TableCell className="px-6 py-4 text-sm text-muted-foreground">{details.date}</TableCell>
                                        <TableCell className="px-6 py-4">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDeleteItem(item.id)}
                                                className="text-destructive hover:text-destructive/80"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )})
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                        No requests found for this category.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default ServiceRequestsTab;
