
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

type ServiceRequestsTabProps = {
    appointments: any[];
    grievances: any[];
    healthRequests: any[];
    educationRequests: any[];
    realEstateRequests: any[];
    invitationRequests: any[];
};

type RequestType = 'appointments' | 'grievances' | 'health' | 'education' | 'realestate' | 'invitation';

const requestTypes: { id: RequestType, label: string }[] = [
    { id: 'appointments', label: 'Appointments' },
    { id: 'grievances', label: 'Grievances' },
    { id: 'health', label: 'Health Support' },
    { id: 'education', label: 'Education Support' },
    { id: 'realestate', label: 'Real Estate' },
    { id: 'invitation', label: 'Invitations' },
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
}) => {
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


    const updateStatus = async (type: string, id: string, status: string) => {
        setLoading(true);
        console.log(`Updating ${type} ID ${id} to ${status}`);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        // Here you would refetch or update state
        setLoading(false);
    };

    const deleteItem = async (type: string, id: string) => {
        if (!confirm('Are you sure you want to delete this item?')) return;
        setLoading(true);
        console.log(`Deleting ${type} ID ${id}`);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        // Here you would refetch or update state
        setLoading(false);
    };

    const getRequestDetails = (item: any, type: RequestType) => {
        const details = {
            name: item.full_name || item.fullName || item.student_name || item.studentName,
            description: '',
            contact: item.mobile || item.contact_number || item.contactNumber,
            email: item.email,
            date: new Date(item.created_at || item.submittedAt).toLocaleDateString()
        };

        switch(type) {
            case 'appointments':
                details.description = item.purpose;
                break;
            case 'grievances':
                details.description = `Ticket: ${item.ticket_number || item.ticketNumber}`;
                break;
            case 'health':
                details.description = item.assistance_type || item.assistanceType;
                break;
            case 'education':
                details.description = item.request_type || item.requestType;
                break;
            case 'realestate':
                details.description = item.consultation_type || item.consultationType;
                break;
            case 'invitation':
                details.description = item.event_name || item.eventName;
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
                                                onValueChange={(value) => updateStatus(activeRequestType, item.id, value)}
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
                                                onClick={() => deleteItem(activeRequestType, item.id)}
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
