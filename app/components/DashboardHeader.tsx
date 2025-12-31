import { Calendar } from 'lucide-react';

interface DashboardHeaderProps {
  userName: string;
  date?: string;
}

export function DashboardHeader({ userName, date }: DashboardHeaderProps) {
  const currentDate = date || new Date().toLocaleDateString('en-US', { 
    day: 'numeric',
    month: 'short',
    year: 'numeric' 
  });

  return (
    <div className="mb-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl mb-1">Hello, {userName}</h1>
          <p className="text-sm text-gray-500">Track team progress here. You almost reach a goal!</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg">
          <span className="text-sm text-gray-600">{currentDate}</span>
          <Calendar className="w-4 h-4 text-gray-400" />
        </div>
      </div>
    </div>
  );
}
