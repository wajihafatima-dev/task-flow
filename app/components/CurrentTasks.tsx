import { CircleCheck, Clock, Ellipsis } from 'lucide-react';
import type { Task } from '../types/page';

interface CurrentTasksProps {
  tasks: Task[];
  onTaskClick?: (taskId: string) => void;
}

export function CurrentTasks({ tasks, onTaskClick }: CurrentTasksProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in progress':
        return 'bg-orange-100 text-orange-700';
      case 'on hold':
        return 'bg-blue-100 text-blue-700';
      case 'done':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in progress':
        return '🔄';
      case 'on hold':
        return '⏸️';
      case 'done':
        return '✓';
      default:
        return '○';
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-lg">Current Tasks</h2>
          <span className="text-sm text-gray-500">Done 30%</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Week</span>
          <button className="text-sm text-gray-400 hover:text-gray-600">▼</button>
        </div>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            onClick={() => onTaskClick?.(task.id)}
          >
            {/* Task Icon */}
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              {task.status === 'done' ? (
                <CircleCheck className="w-5 h-5 text-green-600" />
              ) : task.status === 'on hold' ? (
                <div className="w-5 h-5 flex items-center justify-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
              ) : (
                <div className="w-5 h-5 flex items-center justify-center">
                  <svg className="w-5 h-5" viewBox="0 0 20 20">
                    <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400"/>
                  </svg>
                </div>
              )}
            </div>

            {/* Task Title */}
            <div className="flex-1">
              <div className="text-sm mb-1">{task.title}</div>
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs ${getStatusColor(task.status)}`}>
                  <span>{getStatusIcon(task.status)}</span>
                  <span className="capitalize">{task.status}</span>
                </span>
              </div>
            </div>

            {/* Time Estimate */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{task.timeEstimate}</span>
            </div>

            {/* More Options */}
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Ellipsis className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
