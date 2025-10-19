
export type SocialPost = {
  id: number;
  platform: 'Twitter' | 'Facebook' | 'Instagram';
  username: string;
  content: string;
  timestamp: string;
  imageUrl?: string;
  likes: number;
  comments: number;
  shares: number;
  url?: string;
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
        thumbnail: 'https://picsum.photos/seed/podcast3/960/960',
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
      platform: 'Facebook',
      username: 'Luit Kumar Barman',
      content: 'Happy to share Trust deed of “ ৰক্ষা” has been registered today. ৰাইজৰ আশীৰ্বাদত আমি আশা কৰো যে আমি ৰাইজক সেৱা কৰিব পাৰিম ',
      timestamp: '1 Day ago',
      imageUrl: '/images/followus/post1.jpg',
      likes: 245,
      comments: 32,
      shares: 18,
      url: 'https://www.facebook.com/story.php?story_fbid=24046877708310007&id=100002433417790&mibextid=wwXIfr&rdid=cY5Q3TlpDYqLhx7L#',
    },
    {
      id: 2,
      platform: 'Facebook',
      username: 'Luit Kumar Barman',
      content: 'Rahul Gandhi is not given the contract of the country alone. He has raised such a sensitive issue. As responsible citizens, we also have duty.',
      timestamp: '4 hours ago',
      imageUrl: '/images/followus/post2.jpg',
      likes: 189,
      comments: 24,
      shares: 12,
      url: 'https://www.facebook.com/share/p/16HchpD5Hg/?mibextid=wwXIfr',
    },
    {
      id: 3,
      platform: 'Facebook',
      username: 'Luit Kumar Barman',
      content: 'Occupancy certificate দিওঁতে GMC বছৰ বছৰ যাব পাৰে কিন্তু RTI ৰ first appeal ৰ তাৰিখ কিন্তু ২ দিনতে hearing ৰ date দিছে। যদিও RTI Act 2005 মতে appellant মাতিব লাগে বুলি নিয়ম নাই কিন্তু natural justice ৰ বাবে সকলোৱে মাতে।',
      timestamp: '6 hours ago',
      imageUrl: '/images/followus/post3.jpg',
      likes: 156,
      comments: 18,
      shares: 28,
      url: 'https://www.facebook.com/story.php?story_fbid=9778770168880666&id=100002433417790&mibextid=wwXIfr&rdid=kKZNm31VU1GMamyV#',
    },
    {
      id: 4,
      platform: 'Facebook',
      username: 'Luit Kumar Barman',
      content: 'GMC ত অফিচাৰৰ চহী হয় ২৫/০৩/২০২৫ ত আৰু issue হয় ২৩/৪/২০২৫। এনেকৈ চলি আছে GMC File ৰ date of application 13/3/2024 ત আৰু ১ বছৰ পিছত হে গম পালে যে FAR বেছি আছে। তাকো কিমান বেছি আছে সেইটোও লিখিব নোৱাৰিলে।',
      timestamp: '8 hours ago',
      imageUrl: '/images/followus/post4.jpg',
      likes: 312,
      comments: 45,
      shares: 67,
      url: 'https://www.facebook.com/story.php?story_fbid=9714556611968689&id=100002433417790&mibextid=wwXIfr&rdid=N8N9iDPuwK9koMdt#',
    },
    {
      id: 5,
      platform: 'Facebook',
      username: 'Luit Kumar Barman',
      content: 'ED Guwahati য়ে কালি কামাখ্যা দেৱোত্তৰ বৰ্ডৰ বিষয়ববীয়া কিছুমানৰ ঘৰত অভিযান চলায়। ২০০৩ ৰ পৰা ২০১৯ চনলৈ ৭.৬২ কোটিৰ অনিয়ম হৈছিল।',
      timestamp: '1 day ago',
      imageUrl: '/images/followus/post5.jpg',
      likes: 198,
      comments: 29,
      shares: 15,
      url: 'https://www.facebook.com/story.php?story_fbid=9153866098037746&id=100002433417790&mibextid=wwXIfr&rdid=8u6EOG8yUFiywVi4#',
    },
    {
      id: 6,
      platform: 'Facebook',
      username: 'Luit Kumar Barman',
      content: 'নিজৰ কলমৰ বাবে আজি ২০২৪ বৰ্ষৰ e শিৰোমনি বটা প্ৰদান কৰে e সংবাদে। ধন্যবাদ থাকিল আৰু এই সন্মান যিহেতু চচিয়েল মেডিয়াৰ বাবে আহিছে, গতিকে এই সন্মান মই social media ৰ সকলো বন্ধু, followers ক dedicate কৰিলোঁ',
      timestamp: '1 day ago',
      imageUrl: '/images/followus/post6.jpg',
      likes: 2267,
      comments: 38,
      shares: 22,
      url: 'https://www.facebook.com/story.php?story_fbid=8997734850317539&id=100002433417790&mibextid=wwXIfr&rdid=RGkQfMDsVlGPZAKl#',
    }
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
  { id: 1, title: 'Community Day', imageId: 'gallery-1.jpg' },
  { id: 2, title: 'Tech Conference 2024', imageId: 'gallery-2.jpg' },
  { id: 3, title: 'Volunteer Drive', imageId: 'gallery-3.jpg' },
  { id: 4, title: 'New Office Inauguration', imageId: 'gallery-4.jpg' },
  { id: 5, title: 'Kids Coding Camp', imageId: 'gallery-5.jpg' },
  { id: 6, title: 'Art & Tech Expo', imageId: 'gallery-6.jpg' },
  { id: 7, title: 'Service Launch', imageId: 'gallery-7.jpg' },
  { id: 8, title: 'Annual Awards', imageId: 'gallery-8.jpg' },
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
