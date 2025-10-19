export type SocialPost = {
  id: number;
  platform: 'Twitter' | 'Facebook' | 'Instagram' | 'LinkedIn';
  username: string;
  content: string;
  timestamp: string;
};

export type NewsArticle = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  imageId: string;
  category: 'Latest' | 'Video' | 'Podcast';
};

export type GalleryImage = {
  id: number;
  title: string;
  imageId: string;
};

export type Resource = {
  id: number;
  title: string;
  category: 'Announcement' | 'Scheme' | 'Press Release';
  date: string;
  link: string;
};

export const socialPosts: SocialPost[] = [
  {
    id: 1,
    platform: 'Twitter',
    username: '@DigitalConnect',
    content: 'Our new community portal is now live! Connect, share, and stay informed. #DigitalIndia',
    timestamp: '2h ago',
  },
  {
    id: 2,
    platform: 'Facebook',
    username: 'Digital Connect Official',
    content: 'We are excited to launch a new series of webinars on digital literacy. First session starts next Monday. Register now!',
    timestamp: '5h ago',
  },
  {
    id: 3,
    platform: 'Instagram',
    username: 'digital_connect',
    content: 'A sneak peek from our recent hackathon event. Innovation at its best!',
    timestamp: '1d ago',
  },
  {
    id: 4,
    platform: 'LinkedIn',
    username: 'Digital Connect',
    content: 'We are hiring! Looking for passionate individuals to join our mission of connecting communities digitally. Check our careers page.',
    timestamp: '3d ago',
  },
];

export const newsArticles: NewsArticle[] = [
  {
    id: '1',
    title: 'Digital Connect Launches New Citizen Services Portal',
    excerpt: 'The new portal aims to streamline access to essential services, providing a one-stop solution for citizens.',
    content: 'The new portal aims to streamline access to essential services, providing a one-stop solution for citizens. The platform integrates multiple departments and offers a seamless user experience.',
    author: 'Admin',
    date: '2024-07-20',
    imageId: 'news-1',
    category: 'Latest',
  },
  {
    id: '2',
    title: 'Record Participation in Annual Tech Summit',
    excerpt: 'This year\'s summit saw a 50% increase in participation, with experts discussing the future of digital governance.',
    content: 'This year\'s summit saw a 50% increase in participation, with experts discussing the future of digital governance. Key topics included AI, blockchain, and cybersecurity.',
    author: 'Admin',
    date: '2024-07-18',
    imageId: 'news-2',
    category: 'Latest',
  },
  {
    id: '3',
    title: 'New Initiative to Promote Digital Literacy in Rural Areas',
    excerpt: 'Digital Connect is partnering with local organizations to provide training and resources to bridge the digital divide.',
    content: 'Digital Connect is partnering with local organizations to provide training and resources to bridge the digital divide. The program will cover basic computer skills, internet safety, and access to online services.',
    author: 'Admin',
    date: '2024-07-15',
    imageId: 'news-3',
    category: 'Latest',
  },
    {
    id: '4',
    title: 'How Our Team is Building a More Connected Future',
    excerpt: 'An inside look at the people and processes behind Digital Connect\'s innovative projects.',
    content: 'An inside look at the people and processes behind Digital Connect\'s innovative projects. Our diverse team of engineers, designers, and strategists are dedicated to leveraging technology for social good.',
    author: 'Admin',
    date: '2024-07-12',
    imageId: 'news-4',
    category: 'Latest',
  },
];

export const galleryImages: GalleryImage[] = [
  { id: 1, title: 'Community Day', imageId: 'gallery-1' },
  { id: 2, title: 'Tech Conference 2024', imageId: 'gallery-2' },
  { id: 3, title: 'Volunteer Drive', imageId: 'gallery-3' },
  { id: 4, title: 'New Office Inauguration', imageId: 'gallery-4' },
  { id: 5, title: 'Kids Coding Camp', imageId: 'gallery-5' },
  { id: 6, title: 'Art & Tech Expo', imageId: 'gallery-6' },
  { id: 7, title: 'Service Launch', imageId: 'gallery-7' },
  { id: 8, title: 'Annual Awards', imageId: 'gallery-8' },
];

export const resources: Resource[] = [
    { id: 1, title: "New Healthcare Scheme for Senior Citizens", category: "Scheme", date: "2024-07-21", link: "#" },
    { id: 2, title: "Official Statement on Infrastructure Development", category: "Press Release", date: "2024-07-20", link: "#" },
    { id: 3, title: "Public Holiday Announcement for August", category: "Announcement", date: "2024-07-19", link: "#" },
    { id: 4, title: "Guidelines for Small Business Grants", category: "Scheme", date: "2024-07-18", link: "#" },
    { id: 5, title: "Press Briefing on Digital Transformation Goals", category: "Press Release", date: "2024-07-17", link: "#" },
    { id: 6, title: "Town Hall Meeting Schedule", category: "Announcement", date: "2024-07-16", link: "#" },
    { id: 7, title: "Educational Scholarship Program Details", category: "Scheme", date: "2024-07-15", link: "#" },
];
