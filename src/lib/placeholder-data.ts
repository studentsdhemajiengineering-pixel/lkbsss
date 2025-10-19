
export type SocialPost = {
  id: number;
  platform: 'Twitter' | 'Facebook' | 'Instagram' | 'LinkedIn';
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
      platform: 'Facebook',
      username: 'Luit Kumar Barman',
      content: 'Happy to share Trust deed of “ ৰক্ষা” has been registered today. ৰাইজৰ আশীৰ্বাদত আমি আশা কৰো যে আমি ৰাইজক সেৱা কৰিব পাৰিম ',
      timestamp: '1 Day ago',
      imageUrl: 'https://scontent.fgau1-3.fna.fbcdn.net/v/t39.30808-6/515501124_24046878221643289_5983247591207682282_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_ohc=Tg2nLILBhOwQ7kNvwH9mIf6&_nc_oc=Adn2jvERWtPFQty4PPOlkK7OLmkn_-LLEL3OsV2MN0atd3j-_6Xzt7I8MgN-te6fR2Uoq_xA6nDc0utfH21XSxq6&_nc_zt=23&_nc_ht=scontent.fgau1-3.fna&_nc_gid=bRvg_ugcHXYbbWh9UjSing&oh=00_AfZhyNlflgfJstQww4Jov8LTRccD84kDWSCu4Ku055PgHg&oe=68BF548A',
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
      imageUrl: 'https://scontent.fgau1-4.fna.fbcdn.net/v/t39.30808-6/515502739_24401563529508088_3031132360328703751_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_ohc=Ct483EX0LawQ7kNvwHv3UMv&_nc_oc=AdmMtOgkjvg20IM9p7mMj6H3_NuElgTa1ufUw03DwW0fcnOftFjvAKxCLDhtOpBk5c3SSoWGp9wgQCAGJYmsVG-H&_nc_zt=23&_nc_ht=scontent.fgau1-4.fna&_nc_gid=VH0BqBy0bpRuKtGx9Csz6Q&oh=00_Afb7uw5H6kXJvczRW4-U_wGk3UFPYJ3GnZVYk2-7xTdbyg&oe=68BF6C90',
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
      imageUrl: 'https://scontent.fgau1-6.fna.fbcdn.net/v/t39.30808-6/514595096_24010862568578188_7607389513344244545_n.jpg?stp=dst-jpg_s600x600_tt6&_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_ohc=RSGSpcYrS_0Q7kNvwFpAeMM&_nc_oc=Adl9T2_AiAj0654zlZTsGvnyB66t78u7be1vxfDlRGJIk0gCzqbc4YKTj_z6090BaJ_RDVGU9vTZlqSHxOn1Jaa9&_nc_zt=23&_nc_ht=scontent.fgau1-6.fna&_nc_gid=B35hFYi0pkwNiChhBMjK5g&oh=00_AfYygdWpiCUhPKZIiHm0p9z8L8a-7IfalPndTogquTSqcg&oe=68BF46D7',
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
      imageUrl: 'https://scontent.fgau1-4.fna.fbcdn.net/v/t39.30808-6/515210104_24010455641952214_7258915501411600861_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_ohc=KUTdIwPocOAQ7kNvwF77ldV&_nc_oc=Admn5czVPquRA7l7WJafswiumFhryC5HppM54awcrNimKGHd51CoiyYe76UW3EHXAZJRmLguGefXohw1LepxRP5N&_nc_zt=23&_nc_ht=scontent.fgau1-4.fna&_nc_gid=n5M6om_GixLnPn6V3mNSkQ&oh=00_AfbqPf-xJlhloGD1INZp4OlHtopOVqRVBB8yW5IHHVn6YA&oe=68BF67BE',
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
      imageUrl: 'https://scontent.fgau1-5.fna.fbcdn.net/v/t39.30808-6/514411221_24005078895823222_5354757537042435130_n.jpg?stp=dst-jpg_s720x720_tt6&_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_ohc=2F2Ij0mkURMQ7kNvwG0ly2T&_nc_oc=AdnZBYKTw9GeaUs9E1kUbJFwT5716gOHqrgqsHa9Djs_t63ShKTEc8zUcZLjQ9m34ckHVSJ1HKMIQ2RBI6EipkOV&_nc_zt=23&_nc_ht=scontent.fgau1-5.fna&_nc_gid=zp7KpO6PYfmvyPU76t-vgg&oh=00_AfYI6LDx6hI6BDkPTT6reoP7BJg3Y4o7nnD3qOszls9SUQ&oe=68BF5DB1',
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
      imageUrl: 'https://scontent.fgau1-6.fna.fbcdn.net/v/t39.30808-6/514790871_24003903889274056_7951641828885792567_n.jpg?stp=dst-jpg_p526x395_tt6&_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_ohc=CUIIwxb80MkQ7kNvwEzBlc5&_nc_oc=AdljXVTP7zkhSMpZsDxYzaKS5tKrcHUHPjFNnSRT2Y_YMtUpXRq-O16Lco_J5I_53fQSsZtzpjEUVLjOeWoVM1iS&_nc_zt=23&_nc_ht=scontent.fgau1-6.fna&_nc_gid=C8xAENWjlXbL9KmPbh_KOw&oh=00_AfZGd9HOvfwIHqCxB2RJfjTFFwsUKHRKD0TgkIVvfgzhfA&oe=68BF5130',
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
