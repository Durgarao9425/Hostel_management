import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Home,
  Megaphone,
  UtensilsCrossed,
  Shirt,
  Users,
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
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { getMenuItems } from "../../utils/rolePermissions";

const iconMap = {
  LayoutDashboard,
  Home,
  Megaphone,
  UtensilsCrossed,
  Shirt,
  Users,
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
};

export const MobileMenuBar: React.FC = () => {
  const { user } = useAuth();
  let menuItems = getMenuItems(user);
  if (!user) return null;

  // Find dashboard, rooms, user profile/role page, and fees
  const dashboard = menuItems.find((item) => item.id === "dashboard");
  const rooms = menuItems.find((item) => item.id === "rooms");
  // Show user-specific page: my-profile for Student, role-settings for Admin, etc.
  let userPage: (typeof menuItems)[0] | undefined;
  if (user.role === "Student") {
    userPage = menuItems.find((item) => item.id === "my-profile");
  } else if (user.role === "HostelAdmin" || user.role === "SuperAdmin") {
    userPage = menuItems.find((item) => item.id === "role-settings");
  } else {
    userPage = menuItems.find(
      (item) =>
        item.id !== "dashboard" && item.id !== "rooms" && item.id !== "fees"
    );
  }
  const fees = menuItems.find(
    (item) => item.id === "fees" || item.id === "my-fees"
  );

  // Compose the menu for mobile
  const mobileMenus = [dashboard, rooms, userPage, fees].filter(
    (item): item is (typeof menuItems)[0] => !!item
  );

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex justify-around items-center py-2 shadow-lg lg:hidden md:max-w-md md:mx-auto">
      {mobileMenus.map((item) => {
        const Icon =
          iconMap[item.icon as keyof typeof iconMap] || LayoutDashboard;
        return (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center text-xs px-2 py-1 ${
                isActive ? "text-blue-600" : "text-gray-500 dark:text-gray-300"
              }`
            }
          >
            <Icon className="w-6 h-6 mb-1" />
            {item.label}
          </NavLink>
        );
      })}
    </nav>
  );
};
