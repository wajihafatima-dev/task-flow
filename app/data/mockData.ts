// Mock data for the dashboard
// Replace this with actual API calls to your Neon + Prisma backend

import type {
  Task,
  Project,
  Activity,
  User,
  DashboardStats,
  PerformanceData,
} from '../types/page';

export const currentUser: User = {
  id: '1',
  name: 'Megan Norton',
  username: '@meganorton',
  avatar:
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
  email: 'megan@example.com',
};

export const dashboardStats: DashboardStats = {
  finishedTasks: 26,
  totalTasks: 34,
  trackedHours: 48,
  hoursChange: 7,
  efficiency: 91,
  efficiencyChange: 3,
};

export const tasks: Task[] = [
  {
    id: '1',
    title: 'Product Review for UIB Market',
    status: 'in progress',
    timeEstimate: '4h',
    createdAt: new Date('2023-05-20'),
    updatedAt: new Date('2023-05-23'),
  },
  {
    id: '2',
    title: 'UX Research for Product',
    status: 'on hold',
    timeEstimate: '8h',
    createdAt: new Date('2023-05-19'),
    updatedAt: new Date('2023-05-22'),
  },
  {
    id: '3',
    title: 'App design and development',
    status: 'done',
    timeEstimate: '32h',
    createdAt: new Date('2023-05-15'),
    updatedAt: new Date('2023-05-22'),
  },
  {
    id: '4',
    title: 'API Integration with Backend',
    status: 'in progress',
    timeEstimate: '6h',
    createdAt: new Date('2023-05-21'),
    updatedAt: new Date('2023-05-24'),
  },
  {
    id: '5',
    title: 'Fix UI bugs on dashboard',
    status: 'done',
    timeEstimate: '3h',
    createdAt: new Date('2023-05-18'),
    updatedAt: new Date('2023-05-21'),
  },
  {
    id: '6',
    title: 'Write unit tests',
    status: 'pending',
    timeEstimate: '5h',
    createdAt: new Date('2023-05-24'),
    updatedAt: new Date('2023-05-24'),
  },
];

export const projects: Project[] = [
  {
    id: '1',
    name: 'Stark Project',
    status: 'active',
    taskCount: 14,
    completedTasks: 10,
    createdAt: new Date('2023-05-01'),
    updatedAt: new Date('2023-05-23'),
  },
  {
    id: '2',
    name: 'Thanos Project',
    status: 'active',
    taskCount: 10,
    completedTasks: 7,
    createdAt: new Date('2023-05-10'),
    updatedAt: new Date('2023-05-23'),
  },
  {
    id: '3',
    name: 'Avengers Dashboard',
    status: 'completed',
    taskCount: 8,
    completedTasks: 8,
    createdAt: new Date('2023-04-15'),
    updatedAt: new Date('2023-05-05'),
  },
];

export const activities: Activity[] = [
  {
    id: '1',
    userId: '2',
    userName: 'Floyd Miles',
    userAvatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    action: 'Commented on',
    projectName: 'Stark Project',
    timestamp: new Date('2023-05-23T10:15:00'),
  },
  {
    id: '2',
    userId: '3',
    userName: 'Guy Hawkins',
    userAvatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    action: 'Added a file to',
    projectName: 'Thanos Project',
    timestamp: new Date('2023-05-23T11:00:00'),
  },
  {
    id: '3',
    userId: '4',
    userName: 'Kristin Watson',
    userAvatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    action: 'Completed task in',
    projectName: 'Avengers Dashboard',
    timestamp: new Date('2023-05-23T11:30:00'),
  },
  {
    id: '4',
    userId: '1',
    userName: 'Megan Norton',
    userAvatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    action: 'Updated project',
    projectName: 'Stark Project',
    timestamp: new Date('2023-05-23T12:00:00'),
  },
];

export const performanceData: PerformanceData[] = [
  { date: '01', thisMonth: 4, lastMonth: 3 },
  { date: '02', thisMonth: 5, lastMonth: 4 },
  { date: '03', thisMonth: 6, lastMonth: 5 },
  { date: '04', thisMonth: 4, lastMonth: 6 },
  { date: '05', thisMonth: 7, lastMonth: 6 },
  { date: '06', thisMonth: 6, lastMonth: 7 },
  { date: '07', thisMonth: 8, lastMonth: 5 },
  { date: '08', thisMonth: 6, lastMonth: 4 },
  { date: '09', thisMonth: 7, lastMonth: 6 },
  { date: '10', thisMonth: 9, lastMonth: 7 },
];
