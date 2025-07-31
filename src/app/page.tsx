'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { WaitlistForm } from '@/components/WaitlistForm';
import { AuthModal } from '@/components/AuthModal';
import { ContentGenerator } from '@/components/ContentGenerator';
import { Button } from '@/components/ui/Button';
import { Sparkles, Calendar, Zap, BarChart3, Users, Target } from 'lucide-react';

export default function Home() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const { user, logout } = useAuth();

  const handleSignInClick = () => {
    setAuthMode('signin');
    setAuthModalOpen(true);
  };

  const handleSignUpClick = () => {
    setAuthMode('signup');
    setAuthModalOpen(true);
  };

  // If user is authenticated, redirect to dashboard
  if (user) {
    // Redirect to dashboard page
    window.location.href = '/dashboard';
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="container mx-auto px-6 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Social AI Pilot</span>
          </div>
          <Button variant="outline" size="sm" onClick={handleSignInClick}>
            Sign In
          </Button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Transform Your Social Media with 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> AI Power</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Stop struggling with content creation. Social AI Pilot generates engaging posts, 
            schedules them perfectly, and helps you grow your audience across all platforms.
          </p>
          
          <div className="mb-12">
            <WaitlistForm />
          </div>
          
          <div className="text-sm text-gray-500">
            🚀 Join 1,000+ creators already on the waitlist
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything you need to dominate social media
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From AI-powered content generation to smart scheduling, we've got every aspect of your social media strategy covered.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Sparkles className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">AI Content Generation</h3>
            <p className="text-gray-600">
              Generate engaging captions, hashtags, and post ideas tailored to your brand voice and audience.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Scheduling</h3>
            <p className="text-gray-600">
              Automatically schedule posts at optimal times when your audience is most active.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Multi-Platform</h3>
            <p className="text-gray-600">
              Manage all your social accounts from one dashboard. Instagram, LinkedIn, Twitter, and more.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Analytics & Insights</h3>
            <p className="text-gray-600">
              Track your performance with detailed analytics and get actionable insights to improve engagement.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Team Collaboration</h3>
            <p className="text-gray-600">
              Work together with your team, assign roles, and streamline your content approval process.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Target className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Brand Voice Training</h3>
            <p className="text-gray-600">
              Train our AI on your unique brand voice to ensure every post sounds authentically you.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to 10x your social media game?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of creators and businesses who are already transforming their social media presence.
          </p>
          <WaitlistForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 border-t border-gray-200">
        <div className="text-center text-gray-600">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-6 w-6 text-blue-600" />
            <span className="text-lg font-semibold text-gray-900">Social AI Pilot</span>
          </div>
          <p>&copy; 2024 Social AI Pilot. All rights reserved.</p>
        </div>
      </footer>
      
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </div>
  );
}
