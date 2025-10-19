
import { CheckCircle, Clock, AlertCircle, RefreshCw, XCircle } from "lucide-react";

export const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
        case 'pending':
        case 'submitted':
            return 'bg-yellow-100 text-yellow-800';
        case 'confirmed':
        case 'approved':
            return 'bg-green-100 text-green-800';
        case 'under_review':
        case 'processing':
        case 'in_progress':
            return 'bg-blue-100 text-blue-800';
        case 'completed':
        case 'resolved':
            return 'bg-green-100 text-green-800';
        case 'cancelled':
        case 'rejected':
        case 'closed':
            return 'bg-red-100 text-red-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

export const getStatusIcon = (status: string) => {
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
            return <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />;
        case 'cancelled':
        case 'rejected':
        case 'closed':
             return <XCircle className="w-4 h-4 text-red-600" />;
        default:
            return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
};
