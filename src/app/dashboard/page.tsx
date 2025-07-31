'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Sidebar } from '@/components/ui/Sidebar';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { ContentGenerator } from '@/components/ContentGenerator';
import { ConnectedAccounts } from '@/components/dashboard/ConnectedAccounts';
import { RecentPosts } from '@/components/dashboard/RecentPosts';
import { Zap } from 'lucide-react';

// Mock data - replace with real API calls
const mockStats = {
  scheduledPosts: 24,
  totalEngagement: 12500,
  aiPostsGenerated: 156,
  reach: 45600
};

const mockSocialAccounts = [
  {
    id: '1',
    platform: 'linkedin',
    handle: 'company-profile',
    isConnected: true
  },
  {
    id: '2',
    platform: 'instagram',
    handle: 'brandname',
    isConnected: true
  },
  {
    id: '3',
    platform: 'twitter',
    handle: 'brandhandle',
    isConnected: true
  }
];

const mockPosts = [
  {
    id: '1',
    content: 'Excited to share our latest insights on digital marketing trends for 2024...',
    platform: 'linkedin',
    scheduledDate: '2024-01-15T10:00:00Z',
    likes: 245,
    comments: 18,
    reach: 3200,
    status: 'published' as const,
    isAiGenerated: true
  },
  {
    id: '2',
    content: 'Behind the scenes at our innovation lab! 🚀 #innovation #tech',
    platform: 'instagram',
    scheduledDate: '2024-01-14T14:30:00Z',
    likes: 892,
    comments: 45,
    reach: 5600,
    status: 'published' as const,
    isAiGenerated: false
  },
  {
    id: '3',
    content: 'Quick tips for boosting productivity while working remotely...',
    platform: 'twitter',
    scheduledDate: '2024-01-16T09:15:00Z',
    likes: 156,
    comments: 12,
    reach: 2100,
    status: 'scheduled' as const,
    isAiGenerated: true
  }
];

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [socialAccounts, setSocialAccounts] = useState(null);
  const [posts, setPosts] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [accountsLoading, setAccountsLoading] = useState(true);
  const [postsLoading, setPostsLoading] = useState(true);

  // Mock loading and data fetching
  useEffect(() => {
    // Simulate API calls with delays
    setTimeout(() => {
      setStats(mockStats);
      setStatsLoading(false);
    }, 1000);

    setTimeout(() => {
      setSocialAccounts(mockSocialAccounts);
      setAccountsLoading(false);
    }, 1200);

    setTimeout(() => {
      setPosts(mockPosts);
      setPostsLoading(false);
    }, 1500);
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar user={user} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Dashboard</h2>
              <p className="text-sm text-gray-600">Manage your social media presence with AI</p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Weekly Limit Badge */}
              <div className="flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-full">
                <Zap className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium text-blue-700">
                  {user.weeklyCreditsUsed || 3}/{user.weeklyCreditsLimit || 10} AI posts this week
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Stats Cards */}
          <StatsCards stats={stats} isLoading={statsLoading} />
          
          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Content Generator */}
            <div className="lg:col-span-2">
              <ContentGenerator user={user} />
            </div>
            
            {/* Connected Accounts */}
            <div>
              <ConnectedAccounts 
                accounts={socialAccounts || []} 
                isLoading={accountsLoading}
                userPlan={user.planType || "free"}
              />
            </div>
          </div>

          {/* Recent Posts */}
          <RecentPosts posts={posts || []} isLoading={postsLoading} />
        </main>
      </div>
    </div>
  );
}