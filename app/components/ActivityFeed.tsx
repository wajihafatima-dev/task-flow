import { ThumbsUp, FileText, Plus } from 'lucide-react';
// import { formatDistanceToNow } from 'date-fns';
import { Activity } from '../types/page';
import Image from 'next/image';

interface ActivityFeedProps {
  activities: Activity[];
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  };

  return (
    <div className="space-y-4">
      <h2 className="text-sm text-gray-600">Activity</h2>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3">
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
              {activity.userAvatar ? (
                <img
                  src={activity.userAvatar}
                  alt={activity.userName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-purple-500 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
              )}
            </div>

            {/* Activity Details */}
            <div className="flex-1 min-w-0">
              <div className="text-sm mb-1">
                <span className="font-medium">{activity.userName}</span>
                {activity.action && (
                  <>
                    <span className="text-gray-600"> {activity.action} </span>
                    {activity.projectName && (
                      <span className="text-blue-600">{activity.projectName}</span>
                    )}
                  </>
                )}
              </div>
              
              {activity.action.includes('new project') && (
                <div className="mt-2 text-sm text-gray-600">
                  Hi! Next week well start a new project. I willl tell you all the details later
                </div>
              )}

              {activity.id === '3' && (
                <div className="mt-2 p-3 bg-gray-50 rounded-lg flex items-center gap-2">
                  <FileText className="w-4 h-4 text-purple-600" />
                  <span className="text-sm">Homepage.fig</span>
                </div>
              )}
            </div>

            {/* Timestamp and Actions */}
            <div className="flex flex-col items-end gap-2 flex-shrink-0">
              <span className="text-xs text-gray-500">{formatTime(activity.timestamp)}</span>
              {activity.action && (
                <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                  {activity.id === '2' ? (
                    <Plus className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ThumbsUp className="w-4 h-4 text-yellow-500" />
                  )}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
