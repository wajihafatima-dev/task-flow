"use client";
import { useState } from 'react';
import { DashboardHeader } from './components/DashboardHeader';
import { StatsCard } from './components/StatsCard';
import { CurrentTasks } from './components/CurrentTasks';
import { ActivityFeed } from './components/ActivityFeed';
import { MessageInput } from './components/MessageInput';
import { ProjectDialog } from './components/ProjectDialog';
import { CircleCheck, Clock, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';
import { PerformanceChart } from './components/PerformanceChart';
import { TaskDialog } from './components/TaskDialog';
import { Toaster } from './components/ui-components/Toaster';
import { UserProfile } from './components/UserProfile';
import {
  currentUser,
  dashboardStats,
  tasks,
  activities,
  performanceData,
} from './data/mockData';
import { Sidebar } from './components/Sidebar';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);

  // Handler functions ready for backend integration
  const handleTaskClick = (taskId: string) => {
    console.log('Task clicked:', taskId);
    // TODO: Implement task detail view or update
    // Example: router.push(`/tasks/${taskId}`)
    toast.info('Task clicked - ready for backend integration');
  };

  const handleSendMessage = (message: string) => {
    console.log('Message sent:', message);
    // TODO: Implement message sending to backend
    // Example: await fetch('/api/messages', { method: 'POST', body: JSON.stringify({ message }) })
    toast.success('Message sent - ready for backend integration');
  };

  const handleCreateTask = (taskData: []) => {
    console.log('Creating task:', taskData);
    // TODO: Call your Neon + Prisma backend API
    // Example: await fetch('/api/tasks', { method: 'POST', body: JSON.stringify(taskData) })
    toast.success('Task created - ready for backend integration');
  };

  const handleCreateProject = (projectData: []) => {
    console.log('Creating project:', projectData);
    // TODO: Call your Neon + Prisma backend API
    // Example: await fetch('/api/projects', { method: 'POST', body: JSON.stringify(projectData) })
    toast.success('Project created - ready for backend integration');
  };
  
  // Open dialogs based on sidebar interactions
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'tasks') {
      setTaskDialogOpen(true);
    } else if (tab === 'projects') {
      setProjectDialogOpen(true);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-[1400px] mx-auto p-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
            {/* Left Column - Main Dashboard */}
            <div>
              {/* Header */}
              <DashboardHeader userName="Margaret" date="18 May, 2023" />

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <StatsCard
                  type="finished"
                  value={dashboardStats.finishedTasks}
                  subtitle={`of ${dashboardStats.totalTasks} tasks`}
                  icon={CircleCheck}
                />
                <StatsCard
                  type="tracked"
                  value={`${dashboardStats.trackedHours}h`}
                  subtitle=""
                  change={dashboardStats.hoursChange}
                  icon={Clock}
                />
                <StatsCard
                  type="efficiency"
                  value={`${dashboardStats.efficiency}%`}
                  subtitle=""
                  change={dashboardStats.efficiencyChange}
                  icon={TrendingUp}
                />
              </div>

              {/* Performance Chart */}
              <div className="mb-8">
                <PerformanceChart data={performanceData} />
              </div>

              {/* Current Tasks */}
              <CurrentTasks tasks={tasks} onTaskClick={handleTaskClick} />
            </div>

            {/* Right Column - Activity & User Profile */}
            <div className="space-y-6">
              {/* User Profile */}
              <UserProfile user={currentUser} />

              {/* Activity Feed */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <ActivityFeed activities={activities} />
              </div>

              {/* Message Input */}
              <MessageInput onSend={handleSendMessage} />
            </div>
          </div>
        </div>
      </main>
      
      {/* Dialogs */}
      {/* <TaskDialog
        open={taskDialogOpen}
        onOpenChange={setTaskDialogOpen}
        onSubmit={handleCreateTask}
      />
      <ProjectDialog
        open={projectDialogOpen}
        onOpenChange={setProjectDialogOpen}
        onSubmit={handleCreateProject}
      /> */}
      <Toaster />
    </div>
  );
}