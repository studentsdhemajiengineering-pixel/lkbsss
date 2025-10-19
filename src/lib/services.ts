
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
  Timestamp,
  where,
  Firestore,
  setDoc,
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


const addServiceRequest = <T extends Omit<ServiceRequest, 'id' | 'submittedAt' | 'userId' | 'status'>>(db: Firestore, collectionName: string, data: T, userId: string): Promise<void> => {
    if (!userId) {
        return Promise.reject(new Error("User must be authenticated to add a document."));
    }

    const userSubcollectionRef = collection(db, 'users', userId, collectionName);
    const newDocRef = doc(userSubcollectionRef);

    const payload = {
        ...data,
        id: newDocRef.id,
        submittedAt: serverTimestamp(),
        status: data.status || (collectionName === 'appointments' ? 'pending' : 'submitted'),
        userId: userId,
    };

    return setDoc(newDocRef, payload)
        .catch(error => {
            const permissionError = new FirestorePermissionError({
                path: newDocRef.path,
                operation: 'create',
                requestResourceData: payload,
            });
            errorEmitter.emit('permission-error', permissionError);
            return Promise.reject(permissionError);
        });
};


export const addAppointment = (db: any, data: Omit<Appointment, 'id' | 'submittedAt' | 'status' | 'userId'>, userId: string) => addServiceRequest(db, 'appointments', {...data, status: 'pending'}, userId);
export const addGrievance = (db: any, data: Omit<Grievance, 'id' | 'submittedAt' | 'status' | 'ticketNumber' | 'userId'>, userId: string) => addServiceRequest(db, 'grievances', { ...data, ticketNumber: `GRV-${Date.now()}` }, userId);
export const addHealthRequest = (db: any, data: Omit<HealthRequest, 'id' | 'submittedAt' | 'status' | 'userId'>, userId: string) => addServiceRequest(db, 'health-requests', data, userId);
export const addEducationRequest = (db: any, data: Omit<EducationRequest, 'id' | 'submittedAt' | 'status' | 'userId'>, userId: string) => addServiceRequest(db, 'education-requests', data, userId);
export const addRealEstateRequest = (db: any, data: Omit<RealEstateRequest, 'id' | 'submittedAt' | 'status' | 'userId'>, userId: string) => addServiceRequest(db, 'real-estate-requests', data, userId);
export const addInvitationRequest = (db: any, data: Omit<InvitationRequest, 'id' | 'submittedAt' | 'status' | 'userId'>, userId: string) => addServiceRequest(db, 'invitation-requests', data, userId);


const getCollectionData = async (db: any, collectionName: string) => {
    const q = query(collection(db, collectionName), orderBy("published_at", "desc"));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
        return [];
    }
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), published_at: (doc.data().published_at as Timestamp)?.toDate().toISOString() }));
};

export const getNewsArticles = (db: any): Promise<NewsArticle[]> => getCollectionData(db, 'news-articles') as Promise<NewsArticle[]>;
export const getGalleryImages = (db: any): Promise<GalleryImage[]> => getCollectionData(db, 'gallery-images') as Promise<GalleryImage[]>;
export const getResources = (db: any): Promise<Resource[]> => getCollectionData(db, 'resources') as Promise<Resource[]>;
export const getInterviewsAndPodcasts = (db: any): Promise<InterviewAndPodcast[]> => getCollectionData(db, 'interviews-podcasts') as Promise<InterviewAndPodcast[]>;
export const getSocialMediaPosts = (db: any): Promise<SocialMediaPost[]> => getCollectionData(db, 'social-media-posts') as Promise<SocialMediaPost[]>;


const getServiceRequests = async (db: any, collectionName: string, userId?: string) => {
    if (!userId) {
        // For admin: get all requests from all users for a specific collection
        const usersSnapshot = await getDocs(collection(db, 'users'));
        const allRequests: any[] = [];
        for (const userDoc of usersSnapshot.docs) {
            const userSubcollectionRef = collection(db, 'users', userDoc.id, collectionName);
            const q = query(userSubcollectionRef, orderBy("submittedAt", "desc"));
            const requestsSnapshot = await getDocs(q);
            requestsSnapshot.forEach(doc => {
                allRequests.push({ 
                    id: doc.id, 
                    ...doc.data(), 
                    submittedAt: (doc.data().submittedAt as Timestamp)?.toDate().toISOString(),
                    userId: userDoc.id // Ensure userId is included for admin
                });
            });
        }
        allRequests.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
        return allRequests;
    } else {
        // For a specific user: get their requests from a specific collection
        const userSubcollectionRef = collection(db, 'users', userId, collectionName);
        const q = query(userSubcollectionRef, orderBy("submittedAt", "desc"));
        const snapshot = await getDocs(q);
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => ({ 
            id: doc.id, 
            ...doc.data(), 
            submittedAt: (doc.data().submittedAt as Timestamp)?.toDate().toISOString() 
        }));
    }
};

export const getAppointments = (db: any, userId?: string): Promise<Appointment[]> => getServiceRequests(db, 'appointments', userId);
export const getGrievances = (db: any, userId?: string): Promise<Grievance[]> => getServiceRequests(db, 'grievances', userId);
export const getHealthRequests = (db: any, userId?: string): Promise<HealthRequest[]> => getServiceRequests(db, 'health-requests', userId);
export const getEducationRequests = (db: any, userId?: string): Promise<EducationRequest[]> => getServiceRequests(db, 'education-requests', userId);
export const getRealEstateRequests = (db: any, userId?: string): Promise<RealEstateRequest[]> => getServiceRequests(db, 'real-estate-requests', userId);
export const getInvitationRequests = (db: any, userId?: string): Promise<InvitationRequest[]> => getServiceRequests(db, 'invitation-requests', userId);


export const updateServiceRequestStatus = async (db: any, collectionName: string, id: string, status: string, userId: string) => {
    const docRef = doc(db, 'users', userId, collectionName, id);
    const payload = { status };
    await updateDoc(docRef, payload)
        .catch(error => {
            errorEmitter.emit(
                'permission-error',
                new FirestorePermissionError({
                    path: docRef.path,
                    operation: 'update',
                    requestResourceData: payload,
                })
            );
            return Promise.reject(error);
        });
};

export const deleteServiceRequest = async (db: any, collectionName: string, id: string, userId: string) => {
    const docRef = doc(db, 'users', userId, collectionName, id);
    await deleteDoc(docRef)
        .catch(error => {
            errorEmitter.emit(
                'permission-error',
                new FirestorePermissionError({
                    path: docRef.path,
                    operation: 'delete',
                })
            );
            return Promise.reject(error);
        });
};


export const addContent = async (db: any, collectionName: string, data: Partial<Content>) => {
    const collRef = collection(db, collectionName);
    const payload = {
        ...data,
        published_at: serverTimestamp()
    };
    await addDoc(collRef, payload)
        .catch(error => {
            errorEmitter.emit(
                'permission-error',
                new FirestorePermissionError({
                    path: collRef.path,
                    operation: 'create',
                    requestResourceData: payload,
                })
            );
             return Promise.reject(error);
        });
};

export const updateContent = async (db: any, collectionName: string, id: string, data: Partial<Content>) => {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, data)
        .catch(error => {
            errorEmitter.emit(
                'permission-error',
                new FirestorePermissionError({
                    path: docRef.path,
                    operation: 'update',
                    requestResourceData: data,
                })
            );
             return Promise.reject(error);
        });
};

export const deleteContent = async (db: any, collectionName: string, id: string) => {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef)
        .catch(error => {
            errorEmitter.emit(
                'permission-error',
                new FirestorePermissionError({
                    path: docRef.path,
                    operation: 'delete',
                })
            );
             return Promise.reject(error);
        });
};

export const uploadFile = async (file: File) => {
    const storage = getStorage();
    const storageRef = ref(storage, `uploads/${Date.now()}-${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
};
