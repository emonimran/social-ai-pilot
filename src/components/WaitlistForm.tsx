'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';

export const WaitlistForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulate API call for now
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitted(true);
    setIsLoading(false);
    setEmail('');
  };

  if (isSubmitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <div className="text-green-600 text-xl font-semibold mb-2">🎉 You're on the list!</div>
        <p className="text-green-700">
          We'll notify you as soon as Social AI Pilot launches. Get ready to transform your social media presence!
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email address"
        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        required
      />
      <Button 
        type="submit" 
        disabled={isLoading}
        className="whitespace-nowrap"
      >
        {isLoading ? 'Joining...' : 'Join Waitlist'}
      </Button>
    </form>
  );
};