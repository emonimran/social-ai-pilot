'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from './Button';
import { Badge } from './Badge';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from './DropdownMenu';
import { 
  Home, 
  BookOpen, 
  Calendar, 
  BarChart3, 
  Settings, 
  Zap, 
  MoreVertical, 
  LogOut 
} from 'lucide-react';

interface SidebarProps {
  user: any;
}

export const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-semibold text-gray-900">Social AI Pilot</h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        <Button
          variant="ghost"
          className="w-full justify-start bg-blue-50 text-blue-700 hover:bg-blue-100"
        >
          <Home className="mr-3 h-5 w-5" />
          Dashboard
        </Button>
        
        <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-50">
          <BookOpen className="mr-3 h-5 w-5" />
          Content Library
        </Button>
        
        <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-50">
          <Calendar className="mr-3 h-5 w-5" />
          Schedule
        </Button>
        
        <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-50">
          <BarChart3 className="mr-3 h-5 w-5" />
          Analytics
        </Button>
        
        <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-50">
          <Settings className="mr-3 h-5 w-5" />
          Settings
        </Button>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <img
            src={user.profileImageUrl || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"}
            alt="User profile"
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user.firstName && user.lastName
                ? `${user.firstName} ${user.lastName}`
                : user.email?.split("@")[0] || "User"}
            </p>
            <div className="flex items-center space-x-1">
              <Badge variant="secondary" className="text-xs">
                {user.planType === "free" ? "Free Plan" : "Pro Plan"}
              </Badge>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};