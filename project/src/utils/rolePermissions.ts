import { User } from '../types';

export const ROLE_PERMISSIONS = {
  SuperAdmin: [
    'dashboard',
    'students',
    'rooms', 
    'fees',
    'complaints',
    'leave-requests',
    'visitor-logs',
    'role-settings',
    'reports',
    'settings',
    'analytics',
    'maintenance',
    'notifications',
    'backup'
  ],
  HostelAdmin: [
    'dashboard',
    'students',
    'rooms',
    'fees',
    'complaints',
    'leave-requests',
    'visitor-logs',
    'reports',
    'maintenance'
  ],
  Student: [
    'dashboard',
    'my-profile',
    'my-fees',
    'my-complaints',
    'my-leave-requests',
    'visitor-requests',
    'my-room',
    'announcements',
    'mess-menu',
    'laundry'
  ],
  Receptionist: [
    'dashboard',
    'visitor-logs',
    'students',
    'leave-requests',
    'announcements'
  ]
};

export const hasPermission = (user: User | null, permission: string): boolean => {
  if (!user) return false;
  const userPermissions = ROLE_PERMISSIONS[user.role];
  if (!userPermissions) return false;
  return userPermissions.includes(permission);
};

export const getMenuItems = (user: User | null) => {
  if (!user) return [];

  const allMenuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'LayoutDashboard',
      path: '/dashboard',
      permission: 'dashboard'
    },
    {
      id: 'students',
      label: 'Students',
      icon: 'Users',
      path: '/students',
      permission: 'students'
    },
    {
      id: 'rooms',
      label: 'Rooms',
      icon: 'Home',
      path: '/rooms',
      permission: 'rooms'
    },
    {
      id: 'fees',
      label: 'Fees',
      icon: 'CreditCard',
      path: '/fees',
      permission: 'fees'
    },
    {
      id: 'complaints',
      label: 'Complaints',
      icon: 'MessageSquare',
      path: '/complaints',
      permission: 'complaints'
    },
    {
      id: 'leave-requests',
      label: 'Leave Requests',
      icon: 'Calendar',
      path: '/leave-requests',  
      permission: 'leave-requests'
    },
    {
      id: 'visitor-logs',
      label: 'Visitor Logs',
      icon: 'UserCheck',
      path: '/visitor-logs',
      permission: 'visitor-logs'
    },
    {
      id: 'role-settings',
      label: 'Role Settings',
      icon: 'Settings',
      path: '/role-settings',
      permission: 'role-settings'
    },
    // SuperAdmin specific pages
    {
      id: 'analytics',
      label: 'Analytics',
      icon: 'BarChart3',
      path: '/analytics',
      permission: 'analytics'
    },
    {
      id: 'maintenance',
      label: 'Maintenance',
      icon: 'Wrench',
      path: '/maintenance',
      permission: 'maintenance'
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: 'Bell',
      path: '/notifications',
      permission: 'notifications'
    },
    {
      id: 'backup',
      label: 'Backup & Restore',
      icon: 'Database',
      path: '/backup',
      permission: 'backup'
    },
    // Student specific pages
    {
      id: 'my-profile',
      label: 'My Profile',
      icon: 'User',
      path: '/my-profile',
      permission: 'my-profile'
    },
    {
      id: 'my-fees',
      label: 'My Fees',
      icon: 'CreditCard',
      path: '/my-fees',
      permission: 'my-fees'
    },
    {
      id: 'my-complaints',
      label: 'My Complaints',
      icon: 'MessageSquare',
      path: '/my-complaints',
      permission: 'my-complaints'
    },
    {
      id: 'my-leave-requests',
      label: 'My Leave Requests',
      icon: 'Calendar',
      path: '/my-leave-requests',
      permission: 'my-leave-requests'
    },
    {
      id: 'my-room',
      label: 'My Room',
      icon: 'Home',
      path: '/my-room',
      permission: 'my-room'
    },
    {
      id: 'announcements',
      label: 'Announcements',
      icon: 'Megaphone',
      path: '/announcements',
      permission: 'announcements'
    },
    {
      id: 'mess-menu',
      label: 'Mess Menu',
      icon: 'UtensilsCrossed',
      path: '/mess-menu',
      permission: 'mess-menu'
    },
    {
      id: 'laundry',
      label: 'Laundry',
      icon: 'Shirt',
      path: '/laundry',
      permission: 'laundry'
    }
  ];

  return allMenuItems.filter(item => hasPermission(user, item.permission));
};