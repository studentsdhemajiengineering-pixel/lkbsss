
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, FileText, Heart, GraduationCap, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { getStatusColor, getStatusIcon } from "@/lib/status-helpers.tsx";

type Request = {
    id: string;
    status: string;
    type: string;
    submittedAt: string;
    fullName?: string;
    studentName?: string;
    ticketNumber?: string;
};

type OverviewTabProps = {
    appointments: any[];
    grievances: any[];
    healthRequests: any[];
    educationRequests: any[];
    allRequests: Request[];
};

const OverviewTab: React.FC<OverviewTabProps> = ({ appointments, grievances, healthRequests, educationRequests, allRequests }) => {

    const sortedRecentActivity = allRequests
        .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
        .slice(0, 5);

    return (
        <div className="space-y-8">
            <h2 className="text-xl font-semibold text-foreground">Dashboard Overview</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-blue-100">Total Appointments</CardTitle>
                        <Calendar className="h-4 w-4 text-blue-200" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{appointments.length}</div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
                     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-red-100">Grievances</CardTitle>
                        <FileText className="h-4 w-4 text-red-200" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{grievances.length}</div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-green-100">Health Requests</CardTitle>
                        <Heart className="h-4 w-4 text-green-200" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{healthRequests.length}</div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-purple-100">Education Requests</CardTitle>
                        <GraduationCap className="h-4 w-4 text-purple-200" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{educationRequests.length}</div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {sortedRecentActivity.length > 0 ? sortedRecentActivity.map((item, index) => (
                            <div key={index} className="flex items-center space-x-4 p-3 bg-secondary rounded-lg">
                                <div className={`p-2 rounded-full ${getStatusColor(item.status)}`}>
                                    {getStatusIcon(item.status)}
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-foreground">
                                        New {item.type} Request
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        from {item.fullName || item.studentName}
                                    </p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                                    {item.status.replace('_', ' ')}
                                </span>
                            </div>
                        )) : (
                            <p className="text-muted-foreground text-center">No recent activity.</p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default OverviewTab;
