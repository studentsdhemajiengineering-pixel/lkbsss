
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
  limit,
  Timestamp,
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useFirestore } from '@/firebase/provider';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
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
    const collRef = collection(db, collectionName);
    const payload = {
        ...data,
        submittedAt: serverTimestamp(),
        status: data.status || 'submitted', 
    };
    
    addDoc(collRef, payload)
        .catch(error => {
            errorEmitter.emit(
                'permission-error',
                new FirestorePermissionError({
                    path: collRef.path,
                    operation: 'create',
                    requestResourceData: payload,
                })
            );
            console.error(`Error adding document to ${collectionName}:`, error);
            throw new Error(`Failed to submit: ${error.message}`);
        });
};

export const addAppointment = (db: any, data: Omit<Appointment, 'id' | 'submittedAt' | 'status'>) => addDocument(db, 'appointments', {...data, status: 'pending'});
export const addGrievance = (db: any, data: Omit<Grievance, 'id' | 'submittedAt' | 'status' | 'ticketNumber'>) => addDocument(db, 'grievances', { ...data, ticketNumber: `GRV-${Date.now()}` });
export const addHealthRequest = (db: any, data: Omit<HealthRequest, 'id' | 'submittedAt' | 'status'>) => addDocument(db, 'health-requests', data);
export const addEducationRequest = (db: any, data: Omit<EducationRequest, 'id' | 'submittedAt' | 'status'>) => addDocument(db, 'education-requests', data);
export const addRealEstateRequest = (db: any, data: Omit<RealEstateRequest, 'id' | 'submittedAt' | 'status'>) => addDocument(db, 'real-estate-requests', data);
export const addInvitationRequest = (db: any, data: Omit<InvitationRequest, 'id' | 'submittedAt' | 'status'>) => addDocument(db, 'invitation-requests', data);


const getCollectionData = async (db: any, collectionName: string) => {
    const q = query(collection(db, collectionName), orderBy("published_at", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), published_at: (doc.data().published_at as Timestamp)?.toDate().toISOString() }));
};

export const getNewsArticles = (db: any): Promise<NewsArticle[]> => getCollectionData(db, 'news-articles') as Promise<NewsArticle[]>;
export const getGalleryImages = (db: any): Promise<GalleryImage[]> => getCollectionData(db, 'gallery-images') as Promise<GalleryImage[]>;
export const getResources = (db: any): Promise<Resource[]> => getCollectionData(db, 'resources') as Promise<Resource[]>;
export const getInterviewsAndPodcasts = (db: any): Promise<InterviewAndPodcast[]> => getCollectionData(db, 'interviews-podcasts') as Promise<InterviewAndPodcast[]>;
export const getSocialMediaPosts = (db: any): Promise<SocialMediaPost[]> => getCollectionData(db, 'social-media-posts') as Promise<SocialMediaPost[]>;


const getServiceRequests = async (db: any, collectionName: string) => {
    const q = query(collection(db, collectionName), orderBy("submittedAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), submittedAt: (doc.data().submittedAt as Timestamp)?.toDate().toISOString() }));
};

export const getAppointments = (db: any): Promise<Appointment[]> => getServiceRequests(db, 'appointments') as Promise<Appointment[]>;
export const getGrievances = (db: any): Promise<Grievance[]> => getServiceRequests(db, 'grievances') as Promise<Grievance[]>;
export const getHealthRequests = (db: any): Promise<HealthRequest[]> => getServiceRequests(db, 'health-requests') as Promise<HealthRequest[]>;
export const getEducationRequests = (db: any): Promise<EducationRequest[]> => getServiceRequests(db, 'education-requests') as Promise<EducationRequest[]>;
export const getRealEstateRequests = (db: any): Promise<RealEstateRequest[]> => getServiceRequests(db, 'real-estate-requests') as Promise<RealEstateRequest[]>;
export const getInvitationRequests = (db: any): Promise<InvitationRequest[]> => getServiceRequests(db, 'invitation-requests') as Promise<InvitationRequest[]>;


export const updateServiceRequestStatus = async (db: any, collectionName: string, id: string, status: string) => {
    const docRef = doc(db, collectionName, id);
    const payload = { status };
    updateDoc(docRef, payload)
        .catch(error => {
            errorEmitter.emit(
                'permission-error',
                new FirestorePermissionError({
                    path: docRef.path,
                    operation: 'update',
                    requestResourceData: payload,
                })
            );
        });
};

export const deleteServiceRequest = async (db: any, collectionName: string, id: string) => {
    const docRef = doc(db, collectionName, id);
    deleteDoc(docRef)
        .catch(error => {
            errorEmitter.emit(
                'permission-error',
                new FirestorePermissionError({
                    path: docRef.path,
                    operation: 'delete',
                })
            );
        });
};


export const addContent = async (db: any, collectionName: string, data: Partial<Content>) => {
    const collRef = collection(db, collectionName);
    const payload = {
        ...data,
        published_at: serverTimestamp()
    };
    addDoc(collRef, payload)
        .catch(error => {
            errorEmitter.emit(
                'permission-error',
                new FirestorePermissionError({
                    path: collRef.path,
                    operation: 'create',
                    requestResourceData: payload,
                })
            );
        });
};

export const updateContent = async (db: any, collectionName: string, id: string, data: Partial<Content>) => {
    const docRef = doc(db, collectionName, id);
    updateDoc(docRef, data)
        .catch(error => {
            errorEmitter.emit(
                'permission-error',
                new FirestorePermissionError({
                    path: docRef.path,
                    operation: 'update',
                    requestResourceData: data,
                })
            );
        });
};

export const deleteContent = async (db: any, collectionName: string, id: string) => {
    const docRef = doc(db, collectionName, id);
    deleteDoc(docRef)
        .catch(error => {
            errorEmitter.emit(
                'permission-error',
                new FirestorePermissionError({
                    path: docRef.path,
                    operation: 'delete',
                })
            );
        });
};

export const uploadFile = async (file: File) => {
    const storage = getStorage();
    const storageRef = ref(storage, `uploads/${Date.now()}-${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
};
