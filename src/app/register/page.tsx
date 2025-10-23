
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser, useFirebase, errorEmitter, FirestorePermissionError } from '@/firebase';
import { createUserWithEmailAndPassword, updateProfile, signInWithPhoneNumber, RecaptchaVerifier, ConfirmationResult } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, User as UserIcon, Mail, Lock, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
    confirmationResult: ConfirmationResult;
  }
}

export default function RegisterPage() {
  const [step, setStep] = useState<'details' | 'otp'>('details');
  
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();
  const { toast } = useToast();
  const { user, isUserLoading } = useUser();
  const { auth, firestore } = useFirebase();

  useEffect(() => {
    if (!isUserLoading && user) {
      router.push('/user-dashboard');
    }
  }, [user, isUserLoading, router]);

  const setupRecaptcha = () => {
    if (!auth) return;
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {
          // reCAPTCHA solved
        },
      });
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!fullName || !email || !password || !phoneNumber) {
      setError('Please fill in all fields.');
      return;
    }
    if (!/^\d{10}$/.test(phoneNumber)) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }
    setLoading(true);

    try {
       if (!auth) {
        throw new Error('Firebase Auth not initialized');
      }
      setupRecaptcha();
      const appVerifier = window.recaptchaVerifier;
      const fullPhoneNumber = `+91${phoneNumber}`;
      
      const confirmationResult = await signInWithPhoneNumber(auth, fullPhoneNumber, appVerifier);
      window.confirmationResult = confirmationResult;
      setStep('otp');
      toast({ title: 'OTP Sent', description: `An OTP has been sent to ${fullPhoneNumber}.` });
    } catch (err: any) {
      console.error('Error sending OTP:', err);
      setError('Failed to send OTP. Please check the number or try again.');
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to send OTP.' });
    } finally {
      setLoading(false);
    }
  };
  
  const handleCreateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP.');
      return;
    }
    setLoading(true);

    try {
      if (!auth || !firestore) {
        throw new Error('Firebase is not initialized.');
      }
      
      // First, confirm the OTP
      await window.confirmationResult.confirm(otp);

      // If OTP is correct, create the user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const createdUser = userCredential.user;
      
      // Update the user's profile
      await updateProfile(createdUser, { displayName: fullName });
      
      const userDocRef = doc(firestore, 'users', createdUser.uid);
      const userProfileData = {
        uid: createdUser.uid,
        displayName: fullName,
        email: email,
        phoneNumber: `+91${phoneNumber}`,
        createdAt: new Date().toISOString(),
      };

      setDoc(userDocRef, userProfileData)
        .catch(serverError => {
            const permissionError = new FirestorePermissionError({
                path: userDocRef.path,
                operation: 'create',
                requestResourceData: userProfileData,
            });
            errorEmitter.emit('permission-error', permissionError);
        });

      toast({ title: 'Registration Successful!', description: 'Redirecting to your dashboard.' });
      router.push('/user-dashboard');

    } catch (authError: any) {
      console.error('Error creating profile:', authError);
      if (authError.code === 'auth/email-already-in-use') {
        setError('This email address is already in use.');
      } else if (authError.code === 'auth/invalid-verification-code') {
        setError('Invalid OTP. Please try again.');
      }
      else {
        setError('Failed to create account. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };
  
  if (isUserLoading || (!isUserLoading && user)) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4">
      <div id="recaptcha-container"></div>
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
          <p className="text-gray-500">
            {step === 'details' ? 'Join our platform to access all services.' : 'Enter the OTP to verify your number.'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {step === 'details' ? (
          <form onSubmit={handleSendOtp} className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input type="text" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full pl-10 pr-4 py-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Enter your full name" required />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Enter your email" required />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-10 pr-4 py-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Create a password (min. 6 characters)" required minLength={6} />
                </div>
              </div>
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">+91</span>
                  <Input type="tel" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="w-full pl-12 pr-4 py-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Enter your 10-digit number" required />
                </div>
              </div>
              <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-blue-500 to-indigo-500">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Send OTP
              </Button>
            </form>
        ) : (
          <form onSubmit={handleCreateProfile} className="space-y-6">
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">One-Time Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input type="text" id="otp" value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full pl-10 pr-4 py-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Enter 6-digit OTP" required maxLength={6} />
                </div>
              </div>
              <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-green-500 to-blue-500">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Verify & Create Account
              </Button>
              <Button variant="link" onClick={() => setStep('details')} className="w-full text-gray-600">Back to details</Button>
            </form>
        )}

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
