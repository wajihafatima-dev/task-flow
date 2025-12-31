// Types for the project management dashboard
// Ready for integration with Neon + Prisma + Next.js backend

export type TaskStatus = 'in progress' | 'on hold' | 'done' | 'todo';
export type ProjectStatus = 'active' | 'completed' | 'archived';

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  timeEstimate: string;
  projectId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  taskCount: number;
  completedTasks: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Activity {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  action: string;
  projectName?: string;
  timestamp: Date;
}

export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  email?: string;
}

export interface DashboardStats {
  finishedTasks: number;
  totalTasks: number;
  trackedHours: number;
  hoursChange: number;
  efficiency: number;
  efficiencyChange: number;
}

export interface PerformanceData {
  date: string;
  thisMonth: number;
  lastMonth: number;
}
