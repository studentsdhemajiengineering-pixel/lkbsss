

export type Appointment = {
  id: string;
  userId: string;
  fullName: string;
  dateOfBirth: string;
  mobile: string;
  email: string;
  appointmentDate: string;
  purpose: string;
  documentUrl?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  submittedAt: string;
};

export type Grievance = {
  id: string;
  userId: string;
  ticketNumber: string;
  fullName: string;
  contactNumber: string;
  email: string;
  address: string;
  grievanceType: string;
  description: string;
  documentUrl?: string;
  status: 'submitted' | 'under_review' | 'resolved' | 'closed';
  submittedAt: string;
};

export type HealthRequest = {
    id: string;
    userId: string;
    fullName: string;
    age: number;
    gender: string;
    mobile: string;
    email: string;
    assistanceType: string;
    description: string;
    documentUrl?: string;
    status: 'submitted' | 'processing' | 'approved' | 'completed';
    submittedAt: string;
};

export type EducationRequest = {
    id: string;
    userId: string;
    studentName: string;
    dateOfBirth: string;
    parentName: string;
    contactNumber: string;
    email: string;
    institutionName: string;
    requestType: string;
    details: string;
    documentUrl?: string;
    status: 'submitted' | 'under_review' | 'approved' | 'rejected';
    submittedAt: string;
};

export type RealEstateRequest = {
    id: string;
    userId: string;
    fullName: string;
    contactNumber: string;
    email: string;
    address: string;
    propertyType: string;
    consultationType: string;
    propertyLocation: string;
    budgetRange?: string;
    description: string;
    documentUrl?: string;
    status: 'submitted' | 'under_review' | 'in_progress' | 'completed';
    submittedAt: string;
};

export type InvitationRequest = {
    id: string;
    userId: string;
    fullName: string;
    organization: string;
    designation: string;
    contactNumber: string;
    email: string;
    eventType: string;
    eventName: string;
    eventDate: string;
    eventVenue: string;
    numberOfInvitees: string;
    purpose: string;
    specialRequirements?: string;
    documentUrl?: string;
    status: 'submitted' | 'under_review' | 'approved' | 'rejected';
    submittedAt: string;
};

export type NewsArticle = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  imageId: string;
  category: 'Latest' | 'Video' | 'Podcast' | 'Book';
  published_at: string;
};

export type GalleryImage = {
  id: string;
  title: string;
  imageId: string;
  imageUrl: string;
  published_at: string;
};

export type Resource = {
  id: string;
  title: string;
  category: 'Announcement' | 'Scheme' | 'Press Release';
  date: string;
  link: string;
  published_at: string;
};

export type InterviewAndPodcast = {
    id: string;
    title: string;
    thumbnail: string;
    url: string;
    duration: string;
    views: string;
    age: string;
    category: 'Interview' | 'Podcast';
    published_at: string;
};

export type SocialMediaPost = {
  id: string;
  platform: 'Twitter' | 'Facebook' | 'Instagram';
  username: string;
  content: string;
  timestamp: string;
  imageUrl?: string;
  likes: number;
  comments: number;
  shares: number;
  url?: string;
  published_at: string;
};

export type ServiceRequest = Appointment | Grievance | HealthRequest | EducationRequest | RealEstateRequest | InvitationRequest;

export type Content = NewsArticle | GalleryImage | Resource | InterviewAndPodcast | SocialMediaPost;
