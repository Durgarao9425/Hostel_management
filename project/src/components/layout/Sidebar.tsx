import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Home,
  CreditCard,
  MessageSquare,
  Calendar,
  UserCheck,
  Settings,
  ChevronLeft,
  Building2,
  BarChart3,
  Wrench,
  Bell,
  Database,
  User,
  Megaphone,
  UtensilsCrossed,
  Shirt,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { getMenuItems } from "../../utils/rolePermissions";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const iconMap: Record<string, React.ComponentType<any>> = {
  LayoutDashboard,
  Users,
  Home,
  CreditCard,
  MessageSquare,
  Calendar,
  UserCheck,
  Settings,
  BarChart3,
  Wrench,
  Bell,
  Database,
  User,
  Megaphone,
  UtensilsCrossed,
  Shirt,
};

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const { user } = useAuth();
  const menuItems = getMenuItems(user);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-900 shadow-xl transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                  HostelMS
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {user?.role}
                </p>
              </div>
            </div>
            <button
              onClick={onToggle}
              className="lg:hidden p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>

          {/* Scrollable menu area */}
          <nav className="mt-6 px-4 flex-1 overflow-y-auto">
            <div className="space-y-1">
              {menuItems.map((item) => {
                const Icon = iconMap[item.icon];
                return (
                  <NavLink
                    key={item.id}
                    to={item.path}
                    onClick={() => window.innerWidth < 1024 && onToggle()}
                    className={({ isActive }) => `
                      flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200
                      ${
                        isActive
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }
                    `}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </NavLink>
                );
              })}
            </div>
          </nav>

          {/* User info at bottom */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <img
                src={
                  user?.avatar ||
                  `https://ui-avatars.com/api/?name=${user?.name}&background=3B82F6&color=fff`
                }
                alt={user?.name}
                className="w-8 h-8 rounded-full"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
