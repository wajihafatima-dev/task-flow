import { House, FolderKanban, ListTodo, Users, Settings, Plus, Info, LogOut } from 'lucide-react';
import { Button } from './ui-components/Button';

interface SidebarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export function Sidebar({ activeTab = 'home', onTabChange }: SidebarProps) {
  const navItems = [
    { id: 'home', label: 'Home', icon: House },
    { id: 'projects', label: 'Projects', icon: FolderKanban, hasAdd: true },
    { id: 'tasks', label: 'Tasks', icon: ListTodo, hasAdd: true },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 2L3 7V13L10 18L17 13V7L10 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="font-bold">logip</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange?.(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    <span className="text-sm">{item.label}</span>
                  </div>
                  {item.hasAdd && (
                    <Plus className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Upgrade Section */}
      <div className="p-4">
        <div className="bg-blue-50 rounded-lg p-4 mb-4">
          <h3 className="text-sm mb-2">Upgrade to Pro</h3>
          <p className="text-xs text-gray-600 mb-4">
            Get 1 month free and unlock
          </p>
          <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
            Upgrade
          </Button>
        </div>

        {/* Bottom Navigation */}
        <ul className="space-y-1">
          <li>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
              <Info className="w-5 h-5" />
              <span className="text-sm">Help & Information</span>
            </button>
          </li>
          <li>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
              <LogOut className="w-5 h-5" />
              <span className="text-sm">Log out</span>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
}
