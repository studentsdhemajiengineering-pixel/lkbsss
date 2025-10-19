
"use client";

import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  Settings,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OverviewTab from '@/components/admin/dashboard/overview-tab';
import ServiceRequestsTab from '@/components/admin/dashboard/service-requests-tab';
import ContentManagementTab from '@/components/admin/dashboard/content-management-tab';
import { useFirebase } from '@/firebase/provider';
import { 
    getAppointments, getGrievances, getHealthRequests, getEducationRequests, 
    getRealEstateRequests, getInvitationRequests, getNewsArticles, 
    getInterviewsAndPodcasts, getGalleryImages, getResources, getSocialMediaPosts
} from '@/lib/services';
import type { Appointment, Grievance, HealthRequest, EducationRequest, RealEstateRequest, InvitationRequest, NewsArticle, InterviewAndPodcast, GalleryImage, Resource, SocialMediaPost } from '@/lib/types';


export default function AdminDashboardPage() {
    const { firestore } = useFirebase();

    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [grievances, setGrievances] = useState<Grievance[]>([]);
    const [healthRequests, setHealthRequests] = useState<HealthRequest[]>([]);
    const [educationRequests, setEducationRequests] = useState<EducationRequest[]>([]);
    const [realEstateRequests, setRealEstateRequests] = useState<RealEstateRequest[]>([]);
    const [invitationRequests, setInvitationRequests] = useState<InvitationRequest[]>([]);
    const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
    const [videoNews, setVideoNews] = useState<InterviewAndPodcast[]>([]);
    const [podcasts, setPodcasts] = useState<InterviewAndPodcast[]>([]);
    const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
    const [resources, setResources] = useState<Resource[]>([]);
    const [socialPosts, setSocialPosts] = useState<SocialMediaPost[]>([]);

    const loadData = async () => {
        if (!firestore) return;
        getAppointments(firestore).then(setAppointments);
        getGrievances(firestore).then(setGrievances);
        getHealthRequests(firestore).then(setHealthRequests);
        getEducationRequests(firestore).then(setEducationRequests);
        getRealEstateRequests(firestore).then(setRealEstateRequests);
        getInvitationRequests(firestore).then(setInvitationRequests);
        getNewsArticles(firestore).then(setNewsArticles);
        getInterviewsAndPodcasts(firestore).then(data => {
            setVideoNews(data.filter(item => item.category === 'Interview'));
            setPodcasts(data.filter(item => item.category === 'Podcast'));
        });
        getGalleryImages(firestore).then(setGalleryImages);
        getResources(firestore).then(setResources);
        getSocialMediaPosts(firestore).then(setSocialPosts);
    }
    
    useEffect(() => {
        loadData();
    }, [firestore]);


  const allRequests = [
    ...appointments.map(a => ({ ...a, type: 'Appointment' })),
    ...grievances.map(g => ({ ...g, type: 'Grievance' })),
    ...healthRequests.map(h => ({ ...h, type: 'Health Support' })),
    ...educationRequests.map(e => ({ ...e, type: 'Education Support' })),
    ...realEstateRequests.map(r => ({ ...r, type: 'Real Estate' })),
    ...invitationRequests.map(i => ({ ...i, type: 'Invitation' })),
  ];

  const allContent = {
    news: newsArticles,
    videos: videoNews,
    podcasts: podcasts,
    gallery: galleryImages,
    resources: resources,
    social: socialPosts,
  };


  return (
    <div className="min-h-screen bg-secondary/50 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-card rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary-light rounded-full flex items-center justify-center">
                <Settings className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground font-headline">Admin Dashboard</h1>
                <p className="text-muted-foreground">Manage all services and content</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Welcome back,</p>
              <p className="font-semibold text-foreground">Admin</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-8 h-auto">
            <TabsTrigger value="overview" className="py-3">
              <BarChart3 className="w-5 h-5 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="services" className="py-3">
              <Settings className="w-5 h-5 mr-2" />
              Service Requests
            </TabsTrigger>
            <TabsTrigger value="content" className="py-3">
              <Settings className="w-5 h-5 mr-2" />
              Content Management
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <OverviewTab
              appointments={appointments}
              grievances={grievances}
              healthRequests={healthRequests}
              educationRequests={educationRequests}
              allRequests={allRequests}
            />
          </TabsContent>
          <TabsContent value="services">
            <ServiceRequestsTab
              appointments={appointments}
              grievances={grievances}
              healthRequests={healthRequests}
              educationRequests={educationRequests}
              realEstateRequests={realEstateRequests}
              invitationRequests={invitationRequests}
              onDataChange={loadData}
            />
          </TabsContent>
          <TabsContent value="content">
            <ContentManagementTab content={allContent} onDataChange={loadData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
