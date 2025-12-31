import { Phone, Video, Ellipsis } from 'lucide-react';
import type { User } from '../types/page';

interface UserProfileProps {
  user: User;
}

export function UserProfile({ user }: UserProfileProps) {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      {/* User Avatar */}
      <div className="flex flex-col items-center mb-4">
        <div className="relative">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 right-0 w-5 h-5 bg-pink-500 rounded-full border-2 border-white"></div>
        </div>
      </div>

      {/* User Info */}
      <div className="text-center mb-4">
        <h3 className="text-sm mb-1">{user.name}</h3>
        <p className="text-xs text-gray-500">{user.username}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <button className="p-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
          <Phone className="w-4 h-4 text-gray-700" />
        </button>
        <button className="p-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
          <Video className="w-4 h-4 text-gray-700" />
        </button>
        <button className="p-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
          <Ellipsis className="w-4 h-4 text-gray-700" />
        </button>
      </div>
    </div>
  );
}
