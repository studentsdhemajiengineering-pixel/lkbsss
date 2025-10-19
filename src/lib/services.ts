
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
    const newDocRef = doc(userSubcollectionRef); // Creates a reference with a new auto-generated ID

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
            // Reject the promise so the calling function's catch block is triggered
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
    if (!userId) return []; // Cannot fetch requests without a user ID

    // Path: /users/{userId}/{collectionName}
    const collectionRef = collection(db, 'users', userId, collectionName);
    const q = query(collectionRef, orderBy("submittedAt", "desc"));
    
    const snapshot = await getDocs(q);
     if (snapshot.empty) {
        return [];
    }
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), submittedAt: (doc.data().submittedAt as Timestamp)?.toDate().toISOString() }));
};

const getAllServiceRequestsForAdmin = async (db: any, collectionName: string) => {
    const usersSnapshot = await getDocs(collection(db, 'users'));
    const allRequests: any[] = [];
    for (const userDoc of usersSnapshot.docs) {
        const userId = userDoc.id;
        const requestsRef = collection(db, 'users', userId, collectionName);
        const requestsSnapshot = await getDocs(query(requestsRef, orderBy("submittedAt", "desc")));
        requestsSnapshot.forEach(doc => {
            allRequests.push({ id: doc.id, ...doc.data(), submittedAt: (doc.data().submittedAt as Timestamp)?.toDate().toISOString(), userId: userId });
        });
    }
    allRequests.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
    return allRequests;
};

export const getAppointments = (db: any, userId?: string): Promise<Appointment[]> => userId ? getServiceRequests(db, 'appointments', userId) as Promise<Appointment[]> : getAllServiceRequestsForAdmin(db, 'appointments');
export const getGrievances = (db: any, userId?: string): Promise<Grievance[]> => userId ? getServiceRequests(db, 'grievances', userId) as Promise<Grievance[]> : getAllServiceRequestsForAdmin(db, 'grievances');
export const getHealthRequests = (db: any, userId?: string): Promise<HealthRequest[]> => userId ? getServiceRequests(db, 'health-requests', userId) as Promise<HealthRequest[]> : getAllServiceRequestsForAdmin(db, 'health-requests');
export const getEducationRequests = (db: any, userId?: string): Promise<EducationRequest[]> => userId ? getServiceRequests(db, 'education-requests', userId) as Promise<EducationRequest[]> : getAllServiceRequestsForAdmin(db, 'education-requests');
export const getRealEstateRequests = (db: any, userId?: string): Promise<RealEstateRequest[]> => userId ? getServiceRequests(db, 'real-estate-requests', userId) as Promise<RealEstateRequest[]> : getAllServiceRequestsForAdmin(db, 'real-estate-requests');
export const getInvitationRequests = (db: any, userId?: string): Promise<InvitationRequest[]> => userId ? getServiceRequests(db, 'invitation-requests', userId) as Promise<InvitationRequest[]> : getAllServiceRequestsForAdmin(db, 'invitation-requests');


export const updateServiceRequestStatus = async (db: any, collectionName: string, id: string, status: string, userId: string) => {
    const docRef = doc(db, 'users', userId, collectionName, id);
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

export const deleteServiceRequest = async (db: any, collectionName: string, id: string, userId: string) => {
    const docRef = doc(db, 'users', userId, collectionName, id);
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
