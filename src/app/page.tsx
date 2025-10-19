
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowRight, 
  Facebook, 
  Instagram, 
  Rss, 
  Twitter, 
  Youtube,
  Calendar, 
  FileText, 
  Heart, 
  GraduationCap, 
  Mail, 
  Home as HomeIcon, 
  Play, 
  Headphones, 
  ExternalLink, 
  Award, 
  Trophy, 
  Star, 
  Medal, 
  Users, 
  Target, 
  ChevronLeft, 
  ChevronRight, 
  BookOpen,
  BookOpenCheck,
  CalendarCheck,
  FileWarning,
  HeartPulse,
  MessageCircle,
  Share2,
  Eye
} from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { newsArticles, socialPosts, galleryImages, resources, interviewsAndPodcasts } from '@/lib/placeholder-data';
import type { SocialPost, NewsArticle, GalleryImage, Resource, InterviewAndPodcast } from '@/lib/placeholder-data';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';

const socialIcons: { [key: string]: React.ReactNode } = {
  Twitter: <Twitter className="h-6 w-6 text-sky-500" />,
  Facebook: <Facebook className="h-6 w-6 text-blue-600" />,
  Instagram: <Instagram className="h-6 w-6 text-pink-500" />,
};

const services = [
  { name: 'Appointment Booking', icon: CalendarCheck, color: 'bg-blue-500', description: 'Schedule appointments online with automated confirmation and reminders.', href: '/services/appointment-booking' },
  { name: 'Grievance Redressal', icon: FileWarning, color: 'bg-red-500', description: 'Submit complaints and track resolution status with unique ticket numbers.', href: '/services/grievance-system' },
  { name: 'Health Support', icon: HeartPulse, color: 'bg-green-500', description: 'Access medical assistance, health camps, and healthcare resources.', href: '/services/health-support' },
  { name: 'Education Support', icon: BookOpenCheck, color: 'bg-purple-500', description: 'Apply for scholarships, educational aid, and skill development programs.', href: '/services/education-support' },
  { name: 'Invitation Request', icon: Mail, color: 'bg-orange-500', description: 'Request official invitations for events and ceremonial functions.', href: '/services/invitation-request' },
  { name: 'Real Estate Consultancy', icon: HomeIcon, color: 'bg-teal-500', description: 'Get guidance on property matters, land records, and real estate procedures.', href: '/services/real-estate-consultancy' },
];

const awards = [
    {
      id: '1',
      year: '2023',
      title: 'Rajat Kamal Award',
      subtitle: '69th National Film Festival',
      description: 'Prestigious national recognition for excellence in cinema and film production.',
      icon: Trophy,
      color: 'from-yellow-400 to-yellow-600',
      side: 'left'
    },
    {
      id: '2',
      year: '2022',
      title: 'Cannes Film Festival',
      subtitle: '75th Edition Screening',
      description: 'Boomba Ride screened at the world\'s most prestigious film festival.',
      icon: Star,
      color: 'from-red-400 to-red-600',
      side: 'right'
    },
    {
      id: '3',
      year: '2021',
      title: 'Social Impact Award',
      subtitle: 'Community Service Excellence',
      description: 'Recognition for outstanding contribution to social welfare and community development.',
      icon: Heart,
      color: 'from-green-400 to-green-600',
      side: 'left'
    },
    {
      id: '4',
      year: '2020',
      title: 'Business Excellence Award',
      subtitle: 'Pharmaceutical Industry',
      description: 'Outstanding leadership in pharmaceutical business and healthcare innovation.',
      icon: Medal,
      color: 'from-blue-400 to-blue-600',
      side: 'right'
    }
];

const slides = [
  PlaceHolderImages.find(p => p.id === 'gallery-1'),
  PlaceHolderImages.find(p => p.id === 'gallery-2'),
  PlaceHolderImages.find(p => p.id === 'gallery-3'),
].filter(Boolean) as (typeof PlaceHolderImages[0])[];


export default function Home() {
    const [activeTab, setActiveTab] = React.useState('All');
    const [activeInterviewTab, setActiveInterviewTab] = React.useState('All');

    const filteredSocialPosts = socialPosts.filter(post => {
        if (activeTab === 'All') return true;
        return post.platform === activeTab;
    });

    const filteredInterviews = interviewsAndPodcasts.filter(item => {
        if (activeInterviewTab === 'All') return true;
        return item.category === activeInterviewTab;
    });
  return (
    <div className="flex flex-col min-h-[100dvh] bg-gray-50">
        
       {/* Banner Slider Section */}
      <section className="relative h-[600px] overflow-hidden bg-gray-100">
        <Carousel className="w-full h-full"
            opts={{
                loop: true,
            }}
        >
          <CarouselContent>
            {slides.map((slide, index) => (
              <CarouselItem key={index}>
                <div className="h-[600px] relative">
                  <Image
                    src={slide.imageUrl}
                    alt={slide.description}
                    fill
                    className="w-full h-full object-cover"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-black/50" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm border-none" />
          <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm border-none" />
        </Carousel>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary to-purple-600 rounded-2xl opacity-20 blur-lg"></div>
              <Image
                src="https://picsum.photos/seed/about/800/1000"
                alt="About Luit Kumar Barman"
                width={800}
                height={1000}
                className="relative w-full h-[500px] object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-r from-primary to-purple-600 rounded-full flex items-center justify-center shadow-xl">
                <Users className="w-12 h-12 text-white" />
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full text-sm font-bold mb-4 shadow-lg">
                  <Trophy className="w-4 h-4 mr-2" />
                  Rajat Kamal Award Winner
                </div>
                <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6 ml-2">
                  <Target className="w-4 h-4 mr-2" />
                  About Me
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6 font-headline">
                  Luit Kumar Barman
                  <span className="text-base text-primary font-normal block">Engineer • Film Producer • Social Activist</span>
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Luit Kumar Barman is an engineer by education. Presently, he is the Managing Director of Medishine 
                  Pharmaceuticals Pvt Ltd and Director of Genix India Developers Pvt Ltd. He is a renowned film producer 
                  in Assam, whose most recent film, Boomba Ride, was screened at the 75th Cannes Film Festival. He is a 
                  recipient of Rajat Kamal Award of 69th National Film Festival. He is a well-known social activist in Assam.
                  His appearance in acting in a musical video is appreciated by all sections of people. Above all, he is a novelist also whose last novel “Damn It” is widely appreciated from India.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-primary/10 to-blue-100 rounded-xl p-6">
                  <Trophy className="w-8 h-8 text-primary mb-3" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Film Producer</h3>
                  <p className="text-gray-600 text-sm">Renowned film producer with Boomba Ride screened at 75th Cannes Film Festival and Rajat Kamal Award winner.</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
                  <Heart className="w-8 h-8 text-purple-600 mb-3" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Social Activist</h3>
                  <p className="text-gray-600 text-sm">Well-known social activist in Assam, dedicated to community service and social welfare initiatives.</p>
                </div>
              </div>
              
              <Link 
                href="/about" 
                className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
              >
                Learn More About Me
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* Awards & Recognition Roadmap */}
      <section className="py-20 bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium mb-4">
              <Award className="w-4 h-4 mr-2" />
              Recognition Timeline
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-headline">Awards & Recognition</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A journey of excellence marked by prestigious awards and recognition for outstanding contributions.
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full hidden md:block"></div>
            
            <div className="space-y-2 md:space-y-0">
              {awards.map((award, index) => {
                const IconComponent = award.icon;
                const isLeft = award.side === 'left';
                return (
                <div key={index} className={`flex items-center w-full ${isLeft ? 'justify-start' : 'justify-end'}`}>
                  <div className={`w-full md:max-w-md ${isLeft ? 'md:mr-8' : 'md:ml-8'}`}>
                    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${award.color} rounded-full flex items-center justify-center`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div className="bg-gray-100 px-3 py-1 rounded-full">
                          <span className="text-gray-800 font-bold text-sm">{award.year}</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 font-headline">{award.title}</h3>
                      <p className="text-primary font-medium mb-3">{award.subtitle}</p>
                      <p className="text-gray-600">{award.description}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-4 border-yellow-400 rounded-full shadow-lg hidden md:block"></div>
                </div>
              )})}
            </div>
          </div>
        </div>
      </section>

      {/* Social Feed Section */}
      <section id="social" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Follow Us</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">Stay connected with us on social media for the latest updates, announcements, and community engagement.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
                <button onClick={() => setActiveTab('All')} className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === 'All' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}>All</button>
                <button onClick={() => setActiveTab('Facebook')} className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === 'Facebook' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}>Facebook</button>
                <button onClick={() => setActiveTab('Instagram')} className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === 'Instagram' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}>Instagram</button>
                <button onClick={() => setActiveTab('Twitter')} className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === 'Twitter' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}>Twitter</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {filteredSocialPosts.map((post: SocialPost) => {
                    return (
                        <Link key={post.id} href={post.url || '#'} target="_blank" rel="noopener noreferrer" className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group">
                            {post.imageUrl &&
                                <div className="relative">
                                    <Image src={post.imageUrl} alt={post.content} width={600} height={400} className="w-full h-48 object-cover" />
                                    <span className="absolute top-3 left-3 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">{post.platform}</span>
                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                                </div>
                            }
                            <div className="p-4">
                                <p className="text-gray-800 font-medium mb-3 h-20 line-clamp-3">{post.content}</p>
                                <div className="flex items-center justify-between text-sm text-gray-500">
                                    <div className="flex items-center space-x-4">
                                        <span className="flex items-center"><Heart className="w-4 h-4 mr-1" />{post.likes}</span>
                                        <span className="flex items-center"><MessageCircle className="w-4 h-4 mr-1" />{post.comments}</span>
                                        <span className="flex items-center"><Share2 className="w-4 h-4 mr-1" />{post.shares}</span>
                                    </div>
                                    <span>{post.timestamp}</span>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
            <div className="text-center">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full font-medium transition-colors">Load More Posts</Button>
            </div>
        </div>
    </section>

       {/* Services Section */}
       <section className="py-20" style={{backgroundColor: '#e0e7ff'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              <Heart className="w-4 h-4 mr-2" />
              Our Services
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-headline">How We Can Help You</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access our comprehensive range of public services designed to serve you better with efficiency and transparency.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
                <div className={`${service.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 font-headline">{service.name}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <Link 
                  href={service.href}
                  className="text-primary hover:text-primary/80 font-medium flex items-center group-hover:translate-x-2 transition-transform duration-300"
                >
                  Access Service
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News & Articles Section */}
      <section id="news" className="w-full py-12 md:py-20 lg:py-24 bg-secondary">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-12">
             <div className="inline-flex items-center px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-medium mb-4">
              <FileText className="w-4 h-4 mr-2" />
              Latest Updates
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-headline tracking-tighter">
              News & Articles
            </h2>
            <p className="max-w-2xl mx-auto text-muted-foreground md:text-xl/relaxed">
              Stay informed with the latest news, policy updates, and community announcements.
            </p>
          </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {newsArticles.map((article: NewsArticle) => {
                const articleImage = PlaceHolderImages.find(p => p.id === article.imageId);
                return (
                    <Link
                        key={article.id}
                        href={`/news/${article.id}`}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group"
                    >
                        <div className="relative">
                            {articleImage && (
                                <Image
                                    src={articleImage.imageUrl}
                                    alt={article.title}
                                    width={600}
                                    height={400}
                                    className="w-full h-48 object-cover"
                                />
                            )}
                             <span className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">News Articles</span>
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                        </div>
                        <div className="p-4">
                            <h3 className="font-bold text-gray-900 mb-2 h-12 line-clamp-2">{article.title}</h3>
                            <p className="text-gray-600 text-sm mb-3 h-20 line-clamp-4">{article.excerpt}</p>
                            <div className="flex items-center justify-between text-sm text-gray-500">
                                <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-1" />
                                    {new Date(article.date).toLocaleDateString()}
                                </div>
                                <div className="flex items-center">
                                    <Eye className="w-4 h-4 mr-1" />
                                    {Math.floor(Math.random() * 50)}k
                                </div>
                            </div>
                            <div className="mt-3 text-blue-500 group-hover:text-blue-600 text-sm font-medium flex items-center">
                                Read More
                                <ChevronRight className="w-4 h-4 ml-1" />
                            </div>
                        </div>
                    </Link>
                )
                })}
            </div>
        </div>
      </section>

      {/* Interview and Podcast Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Interview and podcast </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Watch the latest video updates, press conferences, and important announcements.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
              <button onClick={() => setActiveInterviewTab('All')} className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${activeInterviewTab === 'All' ? 'bg-red-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}>All</button>
              <button onClick={() => setActiveInterviewTab('Podcast')} className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${activeInterviewTab === 'Podcast' ? 'bg-red-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}>Podcasts</button>
              <button onClick={() => setActiveInterviewTab('Interview')} className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${activeInterviewTab === 'Interview' ? 'bg-red-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}>Interview</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredInterviews.map((item) => (
                  <Link key={item.id} href={item.url} target="_blank" rel="noopener noreferrer" className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group">
                      <div className="relative">
                          <Image src={item.thumbnail} alt={item.title} width={600} height={400} className="w-full h-48 object-cover"/>
                          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <Play className="w-12 h-12 text-white" />
                          </div>
                          {item.category && <span className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">{item.category}</span>}
                          {item.duration && <span className="absolute bottom-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">{item.duration}</span>}
                      </div>
                      <div className="p-4">
                          <h3 className="font-bold text-gray-900 mb-2 h-12 line-clamp-2">{item.title}</h3>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                              <div className="flex items-center">
                                  <Eye className="w-4 h-4 mr-1" />{item.views}
                              </div>
                              <span>{item.age}</span>
                          </div>
                      </div>
                  </Link>
              ))}
          </div>
          <div className="text-center">
              <Button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full font-medium transition-colors">Load More Videos</Button>
          </div>
        </div>
      </section>

      {/* Published Book Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium mb-4">
              <BookOpen className="w-4 h-4 mr-2" />
              Published Work
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-headline">My Published Book</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A comprehensive journey through cinema, community service, and personal experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
            <div className="lg:col-span-2 relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl opacity-20 blur-lg"></div>
              <div className="relative bg-white p-4 rounded-2xl shadow-2xl">
                 <Image
                      src="/images/book-cover.jpg"
                      alt="Book Cover"
                      width={280}
                      height={380}
                      className="rounded-xl shadow-2xl mx-auto"
                    />
              </div>
            </div>

            <div className="lg:col-span-3 space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4 font-headline">
                  Journey Through Cinema and Community
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                 Rahul, the male protagonist is surrounded by three ladies. While Jharna and Disha fall in love with him, he’s saved by his personal assistant, Arushi, who has devoted her life to her boss. He was born to serve the public without joining politics. Rahul and his team exposes the nexus between a powerful politician and a drugs mafia. The story also showcases the unity among the various religious factions of India. Rahul, a businessman, has tremendous public support and thus the government, and bureaucrats fear him. He is a hero in society. Love, hate, and politics make this thrilling page turner colourful and exciting.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6">
                  <BookOpen className="w-8 h-8 text-indigo-600 mb-3" />
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Genre</h4>
                  <p className="text-gray-600 text-sm">Literature &amp; Fiction</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
                  <FileText className="w-8 h-8 text-purple-600 mb-3" />
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Pages</h4>
                  <p className="text-gray-600 text-sm">228 Pages</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-2xl font-bold mb-2">₹599</h4>
                    <p className="text-indigo-100">Buy On Amazon</p>
                  </div>
                  <Button asChild className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold transition-colors">
                    <Link href="#">
                        Buy Now
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="w-full py-12 md:py-20 lg:py-24 bg-gray-50">
        <div className="container px-4 md:px-6">
           <div className="text-center space-y-4 mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
              <Image className="w-4 h-4 mr-2" />
              Photo Gallery
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-headline tracking-tighter">
              From Our Gallery
            </h2>
            <p className="max-w-2xl mx-auto text-muted-foreground md:text-xl/relaxed">
              A glimpse into our latest events and initiatives.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.slice(0, 8).map((image: GalleryImage, index: number) => {
              return (
                <div key={image.id} className={`relative aspect-square rounded-lg overflow-hidden group ${index >= 4 ? 'hidden md:block' : ''}`}>
                    <Image
                      src={`/images/gallery/${image.imageId}`}
                      alt={image.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                   <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <p className="text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity">{image.title}</p>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
              <Link href="/gallery">View Full Gallery <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 font-headline">Ready to Get Started?</h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Whether you need assistance with our services or want to get involved in community initiatives, 
            we're here to help you every step of the way.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" variant="secondary">
              <Link href="/services">
                Explore Services
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary">
              <Link href="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}
