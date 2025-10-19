
'use client';

import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
  limit
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useFirestore } from '@/firebase/provider';
import type { 
    Appointment,
    Grievance,
    HealthRequest,
    EducationRequest,
    RealEstateRequest,
    InvitationRequest,
    NewsArticle,
    GalleryImage,
    Resource,
    InterviewAndPodcast,
    SocialMediaPost,
    Content,
    ServiceRequest
} from './types';


const addDocument = async (db: any, collectionName: string, data: any) => {
  try {
    await addDoc(collection(db, collectionName), {
      ...data,
      submittedAt: serverTimestamp(),
      status: 'submitted', // or 'pending'
    });
  } catch (e: any) {
    console.error(`Error adding document to ${collectionName}:`, e);
    throw new Error(`Failed to submit: ${e.message}`);
  }
};

export const addAppointment = (db: any, data: Omit<Appointment, 'id' | 'submittedAt' | 'status'>) => addDocument(db, 'appointments', data);
export const addGrievance = (db: any, data: Omit<Grievance, 'id' | 'submittedAt' | 'status' | 'ticketNumber'>) => addDocument(db, 'grievances', { ...data, ticketNumber: `GRV-${Date.now()}` });
export const addHealthRequest = (db: any, data: Omit<HealthRequest, 'id' | 'submittedAt' | 'status'>) => addDocument(db, 'health-requests', data);
export const addEducationRequest = (db: any, data: Omit<EducationRequest, 'id' | 'submittedAt' | 'status'>) => addDocument(db, 'education-requests', data);
export const addRealEstateRequest = (db: any, data: Omit<RealEstateRequest, 'id' | 'submittedAt' | 'status'>) => addDocument(db, 'real-estate-requests', data);
export const addInvitationRequest = (db: any, data: Omit<InvitationRequest, 'id' | 'submittedAt' | 'status'>) => addDocument(db, 'invitation-requests', data);


const getCollectionData = async (db: any, collectionName: string) => {
    const q = query(collection(db, collectionName), orderBy("published_at", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getNewsArticles = (db: any): Promise<NewsArticle[]> => getCollectionData(db, 'news-articles') as Promise<NewsArticle[]>;
export const getGalleryImages = (db: any): Promise<GalleryImage[]> => getCollectionData(db, 'gallery-images') as Promise<GalleryImage[]>;
export const getResources = (db: any): Promise<Resource[]> => getCollectionData(db, 'resources') as Promise<Resource[]>;
export const getInterviewsAndPodcasts = (db: any): Promise<InterviewAndPodcast[]> => getCollectionData(db, 'interviews-podcasts') as Promise<InterviewAndPodcast[]>;
export const getSocialMediaPosts = (db: any): Promise<SocialMediaPost[]> => getCollectionData(db, 'social-media-posts') as Promise<SocialMediaPost[]>;


const getServiceRequests = async (db: any, collectionName: string) => {
    const q = query(collection(db, collectionName), orderBy("submittedAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getAppointments = (db: any): Promise<Appointment[]> => getServiceRequests(db, 'appointments') as Promise<Appointment[]>;
export const getGrievances = (db: any): Promise<Grievance[]> => getServiceRequests(db, 'grievances') as Promise<Grievance[]>;
export const getHealthRequests = (db: any): Promise<HealthRequest[]> => getServiceRequests(db, 'health-requests') as Promise<HealthRequest[]>;
export const getEducationRequests = (db: any): Promise<EducationRequest[]> => getServiceRequests(db, 'education-requests') as Promise<EducationRequest[]>;
export const getRealEstateRequests = (db: any): Promise<RealEstateRequest[]> => getServiceRequests(db, 'real-estate-requests') as Promise<RealEstateRequest[]>;
export const getInvitationRequests = (db: any): Promise<InvitationRequest[]> => getServiceRequests(db, 'invitation-requests') as Promise<InvitationRequest[]>;


export const updateServiceRequestStatus = async (db: any, collectionName: string, id: string, status: string) => {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, { status });
};

export const deleteServiceRequest = async (db: any, collectionName: string, id: string) => {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
};


export const addContent = async (db: any, collectionName: string, data: Partial<Content>) => {
    await addDoc(collection(db, collectionName), {
        ...data,
        published_at: serverTimestamp()
    });
};

export const updateContent = async (db: any, collectionName: string, id: string, data: Partial<Content>) => {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, data);
};

export const deleteContent = async (db: any, collectionName: string, id: string) => {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
};

export const uploadFile = async (file: File) => {
    const storage = getStorage();
    const storageRef = ref(storage, `uploads/${Date.now()}-${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
};
