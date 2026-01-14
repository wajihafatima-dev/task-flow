// Types for the Project Management Dashboard
// Compatible with Neon + Prisma + Next.js

// ---------------------------
// Task Related Types
// ---------------------------
export type TaskStatus = 'IN_PROGRESS' | 'COMPLETED' | 'PENDING'; // Match Prisma enum

export interface Task {
  id: string;
  name: string;            // matches Prisma Task.name
  status: TaskStatus;      // Prisma Task.status
  timeSpent: number;       // in hours or minutes, matches Prisma Task.timeSpent
  progress: number;        // 0-100
  projectId: string;       // optional if task is unassigned
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  activities?: Activity[]; // relation to Activity
}

// ---------------------------
// Project Related Types
// ---------------------------
export type ProjectStatus = 'ACTIVE' | 'COMPLETED' | 'ARCHIVED';

export interface Project {
  id: string;
  name: string;
  description?: string;
  status?: ProjectStatus;      // Optional if not stored
  tasks?: Task[];              // Optional, relation
  createdAt: Date;
  updatedAt: Date;
  taskCount?: number;          // computed in frontend
  completedTasks?: number;     // computed in frontend
}

// ---------------------------
// Activity Related Types
// ---------------------------
export interface Activity {
  id: string;
  type: string;              // e.g., "comment", "update", "status change"
  content: string;           // e.g., "Marked task as completed"
  taskId: string;            // relation back to Task
  taskName?: string;         // optional, useful in frontend display
  userId: string;
  userName?: string;         // optional for display
  userAvatar?: string;       // optional
  projectName?: string;      // optional
  createdAt: Date;
}

// ---------------------------
// User Related Types
// ---------------------------
export interface User {
  id: string;
  name: string;
  email: string;
  username?: string;          // optional if you have usernames
  avatar?: string;            // optional for profile pics
  tasks?: Task[];             // optional, relation to tasks
  createdAt?: Date;
  updatedAt?: Date;
}

// ---------------------------
// Dashboard Statistics Types
// ---------------------------
export interface DashboardStats {
  finishedTasks: number;
  totalTasks: number;
  trackedHours: number;
  hoursChange: number;     // e.g., % change from last period
  efficiency: number;      // e.g., completed / assigned tasks %
  efficiencyChange: number;
}

// ---------------------------
// Performance Chart Data
// ---------------------------
export interface PerformanceData {
  date: string;             // e.g., "2026-01-07"
  thisMonth: number;        // e.g., tasks completed this month
  lastMonth: number;        // e.g., tasks completed last month
}
