"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  House,
  FolderKanban,
  ListTodo,
  Users,
  Settings,
  Info,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { logoutUser } from "../apiServices";

interface SidebarProps {
  activeTab?: string;
  open: boolean;
  setOpen: (value: boolean) => void;
}

export function Sidebar({ activeTab = "home", open, setOpen }: SidebarProps) {
  const router = useRouter();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggle = (menuId: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuId]: !prev[menuId],
    }));
  };
  function handleLogout() {
  logoutUser();
  router.push("/login"); // redirect manually after logout
}
  const navItems = [
    { id: "home", label: "Home", icon: House, path: "/" },
    {
      id: "projects",
      label: "Projects",
      icon: FolderKanban,
      children: [
        { label: "All Projects", path: "/projects", icon: House },
        { label: "Add Project", path: "/projects/new", icon: House },
      ],
    },
    {
      id: "tasks",
      label: "Tasks",
      icon: ListTodo,
      children: [
        { label: "All Tasks", path: "/tasks", icon: House },
        { label: "Add Task", path: "/tasks/new", icon: House },
      ],
    },
    { id: "team", label: "Team", icon: Users, path: "/team" },
    { id: "settings", label: "Settings", icon: Settings, path: "/settings" },
  ];

  return (
    <aside
      className={`
          fixed top-0 left-0 h-full w-64 bg-black z-50
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          ${!isMobile ? "relative translate-x-0" : ""}
          flex flex-col
        `}
    >
      {/* Logo */}
      <div className="p-6 border-b text-white font-bold">logip</div>

      {/* Navigation */}
      <nav className="flex-1 bg-white p-2">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            const hasChildren = !!item.children;

            return (
              <li key={item.id}>
                <button
                  onClick={() => {
                    hasChildren
                      ? handleToggle(item.id)
                      : router.push(item.path!);

                    if (isMobile) setOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg ${
                    isActive
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    <span className="text-sm">{item.label}</span>
                  </div>

                  {hasChildren && (
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        openMenus[item.id] ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </button>

                {hasChildren && openMenus[item.id] && (
                  <ul className="ml-8 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <li key={child.label}>
                        <button
                          onClick={() => {
                            router.push(child.path);
                            if (isMobile) setOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg ${
                            isActive
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon className="w-5 h-5" />
                            <span className="text-sm">{child.label}</span>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom */}
      <div className="mt-auto p-4 bg-white border-t flex flex-col gap-2">
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-gray-700">
          <Info className="w-5 h-5 text-gray-500" />
          <span className="text-sm font-medium">Help & Information</span>
        </button>

        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-100 transition-colors duration-200 text-red-600">
          <LogOut className="w-5 h-5 text-red-500" />
          <span  className="text-sm font-medium">Log Out</span>
        </button>
      </div>
    </aside>
  );
}
