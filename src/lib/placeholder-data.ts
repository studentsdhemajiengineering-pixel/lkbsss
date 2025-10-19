
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

export type InterviewAndPodcast = {
    id: string;
    title: string;
    thumbnail: string;
    url: string;
    duration: string;
    views: string;
    age: string;
    category: 'Interview' | 'Podcast';
};

export const interviewsAndPodcasts: InterviewAndPodcast[] = [
    {
        id: '1',
        title: 'আছুৰ প্ৰাক্তন সম্পাদক শংকৰজ্যোতি বৰুৱা সন্দৰ্ভত কি কলে লুইত কুমাৰ বৰ্মনে ?',
        thumbnail: 'https://img.youtube.com/vi/WMlhLpSGHSg/maxresdefault.jpg',
        url: 'https://www.youtube.com/watch?v=WMlhLpSGHSg',
        duration: '15:30',
        views: '5.2k',
        age: '2 days ago',
        category: 'Interview'
    },
    {
        id: '2',
        title: 'অসমীয়াৰ চিনেমাৰ ভাল দিন আহিছে নেকি? আজিৰ প্ৰশ্নত Boomba Ride ৰ প্ৰযোজক লুইত কুমাৰ বৰ্মন',
        thumbnail: 'https://img.youtube.com/vi/tTxxu8QJJ_4/maxresdefault.jpg',
        url: 'https://www.youtube.com/watch?v=tTxxu8QJJ_4',
        duration: '8:45',
        views: '3.8k',
        age: '3 days ago',
        category: 'Interview'
    },
    {
        id: '3',
        title: '📌লুইত কুমাৰ বৰ্মনৰ বহু নজনা কথা',
        thumbnail: 'https://scontent-fra3-1.xx.fbcdn.net/v/t15.5256-10/453892231_1237631371018307_2015268119694680216_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=101&ccb=1-7&_nc_sid=be8305&_nc_ohc=PlCoiMAXhKAQ7kNvwEr2Pf6&_nc_oc=AdlASjNwGdpRnnv5nBnv4masijed7Fzj5zQ4Zajg1pGfuBoff5d3196OJk7Pcp0ccm0&_nc_zt=23&_nc_ht=scontent-fra3-1.xx&_nc_gid=7pAoaw8rtBKXeWFVpxsKSQ&oh=00_AfatBCA2IMinX2_U5JLcEhNJgDF1J1HIa4dXiK_G8VIxGw&oe=68BF6FA8',
        url: 'https://www.facebook.com/watch/?mibextid=WC7FNe&v=1011876583509983&rdid=39P36saVknGSc5sl',
        duration: '22:15',
        views: '7.1k',
        age: '5 days ago',
        category: 'Podcast'
    }
];

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
