import React, { useState } from 'react';
import { Shield, Users, Settings, Edit, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import { Modal } from '../components/ui/Modal';
import { ROLE_PERMISSIONS } from '../utils/rolePermissions';

interface RoleData {
  role: string;
  description: string;
  userCount: number;
  permissions: string[];
  color: string;
}

export const RoleSettings: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<RoleData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const roleData: RoleData[] = [
    {
      role: 'SuperAdmin',
      description: 'Full system access with all administrative privileges',
      userCount: 1,
      permissions: ROLE_PERMISSIONS.SuperAdmin,
      color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
    },
    {
      role: 'HostelAdmin',
      description: 'Hostel management with student and facility oversight',
      userCount: 3,
      permissions: ROLE_PERMISSIONS.HostelAdmin,
      color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
    },
    {
      role: 'Student',
      description: 'Student access to personal information and services',
      userCount: 150,
      permissions: ROLE_PERMISSIONS.Student,
      color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
    },
    {
      role: 'Receptionist',
      description: 'Front desk operations and visitor management',
      userCount: 2,
      permissions: ROLE_PERMISSIONS.Receptionist,
      color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
    }
  ];

  const handleViewRole = (role: RoleData) => {
    setSelectedRole(role);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRole(null);
  };

  const permissionLabels: Record<string, string> = {
    'dashboard': 'Dashboard Access',
    'students': 'Student Management',
    'rooms': 'Room Management',
    'fees': 'Fee Management',
    'complaints': 'Complaint Management',
    'leave-requests': 'Leave Request Management',
    'visitor-logs': 'Visitor Log Management',
    'role-settings': 'Role & Permission Settings',
    'reports': 'Reports & Analytics',
    'settings': 'System Settings',
    'my-profile': 'Personal Profile',
    'my-fees': 'Personal Fee Records',
    'my-complaints': 'Personal Complaints',
    'my-leave-requests': 'Personal Leave Requests',
    'visitor-requests': 'Visitor Request Management'
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Role Settings</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage user roles and permissions across the system
          </p>
        </div>
        <Button className="mt-4 sm:mt-0">
          <Plus className="w-4 h-4 mr-2" />
          Create Role
        </Button>
      </div>

      {/* Role Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {roleData.map((role) => (
          <Card key={role.role} hover className="cursor-pointer" onClick={() => handleViewRole(role)}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <Shield className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${role.color}`}>
                  {role.role}
                </span>
              </div>
              
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {role.role}
              </h3>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {role.description}
              </p>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                  <Users className="w-4 h-4 mr-1" />
                  {role.userCount} users
                </div>
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                  <Settings className="w-4 h-4 mr-1" />
                  {role.permissions.length} permissions
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Role Management Table */}
      <Card>
        <CardHeader>
          <CardTitle>Role Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Users</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roleData.map((role) => (
                <TableRow key={role.role}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        <Shield className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{role.role}</p>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${role.color}`}>
                          {role.role}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs">
                      {role.description}
                    </p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-gray-900 dark:text-white">
                        {role.userCount}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="info">
                      {role.permissions.length} permissions
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="success">Active</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewRole(role)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        View Users
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Role Details Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={`${selectedRole?.role} Role Details`}
        maxWidth="2xl"
      >
        {selectedRole && (
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {selectedRole.role}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {selectedRole.description}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${selectedRole.color}`}>
                {selectedRole.role}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Role Information</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Role Name:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">{selectedRole.role}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Active Users:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">{selectedRole.userCount}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Total Permissions:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">{selectedRole.permissions.length}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Status:</span>
                    <Badge variant="success" className="ml-2">Active</Badge>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Quick Actions</h4>
                <div className="space-y-2">
                  <Button className="w-full" size="sm">
                    Edit Permissions
                  </Button>
                  <Button variant="secondary" className="w-full" size="sm">
                    View Users
                  </Button>
                  <Button variant="secondary" className="w-full" size="sm">
                    Duplicate Role
                  </Button>
                  {selectedRole.role !== 'SuperAdmin' && (
                    <Button variant="danger" className="w-full" size="sm">
                      Disable Role
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">Permissions</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {selectedRole.permissions.map((permission) => (
                  <div
                    key={permission}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <span className="text-sm text-gray-900 dark:text-white">
                      {permissionLabels[permission] || permission}
                    </span>
                    <Badge variant="success" size="sm">
                      Granted
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};