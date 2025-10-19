
// This is a temporary data provider that mimics fetching data.
// In a real application, this would be replaced with API calls to a database.

export const appointments = [
    { id: '1', fullName: 'John Doe', purpose: 'General Inquiry', status: 'confirmed', submittedAt: '2024-07-20T10:00:00Z', mobile: '1234567890', email: 'john@example.com' },
    { id: '2', fullName: 'Jane Smith', purpose: 'Passport Renewal', status: 'pending', submittedAt: '2024-07-21T11:30:00Z', mobile: '0987654321', email: 'jane@example.com' },
];

export const grievances = [
    { id: 'g1', ticketNumber: 'GRV-001', fullName: 'Peter Jones', status: 'resolved', submittedAt: '2024-07-18T09:00:00Z', mobile: '1122334455', email: 'peter@example.com' },
    { id: 'g2', ticketNumber: 'GRV-002', fullName: 'Mary White', status: 'under_review', submittedAt: '2024-07-22T14:00:00Z', mobile: '5566778899', email: 'mary@example.com' },
];

export const healthRequests = [
    { id: 'h1', fullName: 'Chris Green', assistanceType: 'Emergency Medical Help', status: 'completed', submittedAt: '2024-07-19T08:00:00Z', mobile: '1231231234', email: 'chris@example.com' },
];

export const educationRequests = [
    { id: 'e1', studentName: 'Alex Johnson', requestType: 'Scholarship', status: 'approved', submittedAt: '2024-07-15T16:00:00Z', mobile: '4321432143', email: 'alex@example.com' },
];

export const realEstateRequests = [
    { id: 'r1', fullName: 'Sam Brown', consultationType: 'Property Buying', status: 'in_progress', submittedAt: '2024-07-20T12:00:00Z', mobile: '5432167890', email: 'sam@example.com' },
];

export const invitationRequests = [
    { id: 'i1', fullName: 'Emily Davis', eventName: 'Annual Charity Gala', status: 'approved', submittedAt: '2024-07-10T10:00:00Z', mobile: '6789054321', email: 'emily@example.com' },
];

export const newsArticles = [
    { id: 'n1', title: 'Digital Connect Launches New Portal', category: 'Latest', published_at: '2024-07-20T10:00:00Z', content: 'The new portal aims to streamline access to essential services.', views: 1200 },
    { id: 'n2', title: 'Annual Tech Summit Highlights', category: 'Events', published_at: '2024-07-18T09:00:00Z', content: 'Experts discussed the future of digital governance.', views: 2500 },
];

export const videoNews = [
    { id: 'v1', title: 'Interview with Luit Kumar Barman', category: 'Interview', published_at: '2024-07-22T10:00:00Z', thumbnail_url: 'https://img.youtube.com/vi/WMlhLpSGHSg/maxresdefault.jpg', views: 5200 },
];

export const podcasts = [
    { id: 'p1', title: 'The Future of Digital Governance', category: 'Technology', published_at: '2024-07-21T11:00:00Z', audio_url: '#', listens: '1.5k' },
];

export const galleryImages = [
    { id: 'gl1', title: 'Community Day', category: 'Events', published_at: '2024-07-17T10:00:00Z', image_url: '/images/gallery/gallery-1.jpg' },
];

export const resources = [
    { id: 'res1', title: 'New Healthcare Scheme PDF', category: 'Scheme', published_at: '2024-07-21T10:00:00Z', link: '#' },
];

export const socialPosts = [
    { id: 's1', platform: 'Facebook', content: 'Happy to share Trust deed of “ ৰক্ষা” has been registered today.', published_at: '2024-07-23T10:00:00Z', likes: 245, comments: 32 },
];
