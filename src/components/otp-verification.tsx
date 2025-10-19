
"use client";

import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';

interface OTPVerificationProps {
  phoneNumber: string;
  onPhoneNumberChange: (phone: string) => void;
  onVerificationSuccess: (verified: boolean) => void;
}

export const OTPVerification: React.FC<OTPVerificationProps> = ({ phoneNumber, onPhoneNumberChange, onVerificationSuccess }) => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(phoneNumber)) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }
    setError('');
    setLoading(true);
    // Simulate sending OTP
    console.log(`Sending OTP to ${phoneNumber}`);
    setTimeout(() => {
      setIsOtpSent(true);
      setLoading(false);
    }, 1000);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    if (enteredOtp.length !== 6) {
      setError('Please enter the complete 6-digit OTP.');
      return;
    }
    setLoading(true);
    // Simulate verifying OTP. In a real app, '123456' would be the OTP from your backend.
    console.log(`Verifying OTP: ${enteredOtp}`);
    setTimeout(() => {
      if (enteredOtp === '123456') {
        setError('');
        onVerificationSuccess(true);
      } else {
        setError('Invalid OTP. Please try again. (Hint: use 123456)');
      }
      setLoading(false);
    }, 1000);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return; // Only allow numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="space-y-6">
      {!isOtpSent ? (
        <form onSubmit={handleSendOtp} className="space-y-6">
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
              Mobile Number
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">+91</span>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => onPhoneNumberChange(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your mobile number"
                required
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3">
            {loading ? 'Sending OTP...' : 'Send OTP'}
          </Button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="space-y-6">
          <p className="text-center text-gray-600">
            Enter the 6-digit OTP sent to +91-{phoneNumber}.
          </p>
          <div className="flex justify-center space-x-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3">
            {loading ? 'Verifying...' : 'Verify & Continue'}
          </Button>
          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setIsOtpSent(false);
                setError('');
                setOtp(new Array(6).fill(''));
              }}
              className="text-sm text-blue-600 hover:underline"
            >
              Change Number
            </button>
            <span className="text-gray-400 mx-2">|</span>
            <button type="button" onClick={() => handleSendOtp(new Event('submit') as any)} className="text-sm text-blue-600 hover:underline">
              Resend OTP
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
