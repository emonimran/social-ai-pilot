'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Calendar, Heart, Zap, Eye } from 'lucide-react';

interface StatsData {
  scheduledPosts: number;
  totalEngagement: number;
  aiPostsGenerated: number;
  reach: number;
}

interface StatsCardsProps {
  stats: StatsData | null;
  isLoading: boolean;
}

const StatCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: number;
  iconBgColor: string;
  isLoading: boolean;
}> = ({ icon, label, value, iconBgColor, isLoading }) => {
  if (isLoading) {
    return (
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className={`w-8 h-8 ${iconBgColor} rounded-lg flex items-center justify-center animate-pulse`}>
                <div className="w-4 h-4 bg-gray-300 rounded"></div>
              </div>
            </div>
            <div className="ml-4">
              <div className="h-4 bg-gray-200 rounded w-20 mb-2 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-12 animate-pulse"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className={`w-8 h-8 ${iconBgColor} rounded-lg flex items-center justify-center`}>
              {icon}
            </div>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">{label}</p>
            <p className="text-2xl font-semibold text-gray-900">
              {value.toLocaleString()}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const StatsCards: React.FC<StatsCardsProps> = ({ stats, isLoading }) => {
  const statsData = [
    {
      icon: <Calendar className="w-4 h-4 text-blue-600" />,
      label: "Posts Scheduled",
      value: stats?.scheduledPosts || 0,
      iconBgColor: "bg-blue-100"
    },
    {
      icon: <Heart className="w-4 h-4 text-green-600" />,
      label: "Total Engagement",
      value: stats?.totalEngagement || 0,
      iconBgColor: "bg-green-100"
    },
    {
      icon: <Zap className="w-4 h-4 text-purple-600" />,
      label: "AI Posts Generated",
      value: stats?.aiPostsGenerated || 0,
      iconBgColor: "bg-purple-100"
    },
    {
      icon: <Eye className="w-4 h-4 text-orange-600" />,
      label: "Reach",
      value: stats?.reach || 0,
      iconBgColor: "bg-orange-100"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {statsData.map((stat, index) => (
        <StatCard
          key={index}
          icon={stat.icon}
          label={stat.label}
          value={stat.value}
          iconBgColor={stat.iconBgColor}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
};