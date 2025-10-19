import { CheckCircle, Clock, AlertCircle, RefreshCw, XCircle } from "lucide-react";
import type { ReactElement } from "react";

export const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
        case 'pending':
        case 'submitted':
            return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case 'confirmed':
        case 'approved':
            return 'bg-green-100 text-green-800 border-green-200';
        case 'under_review':
        case 'processing':
        case 'in_progress':
            return 'bg-blue-100 text-blue-800 border-blue-200';
        case 'completed':
        case 'resolved':
            return 'bg-green-100 text-green-800 border-green-200';
        case 'cancelled':
        case 'rejected':
        case 'closed':
            return 'bg-red-100 text-red-800 border-red-200';
        default:
            return 'bg-gray-100 text-gray-800 border-gray-200';
    }
};

export const getStatusIcon = (status: string): ReactElement => {
    switch (status.toLowerCase()) {
        case 'completed':
        case 'resolved':
        case 'approved':
        case 'confirmed':
            return <CheckCircle className="w-4 h-4 text-green-600" />;
        case 'pending':
        case 'submitted':
            return <Clock className="w-4 h-4 text-yellow-600" />;
        case 'under_review':
        case 'processing':
        case 'in_progress':
            return <RefreshCw className="w-4 h-4 text-blue-600" />;
        case 'cancelled':
        case 'rejected':
        case 'closed':
             return <XCircle className="w-4 h-4 text-red-600" />;
        default:
            return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
};
