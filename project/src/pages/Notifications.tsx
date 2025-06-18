import React, { useState } from 'react';
import { Bell, Send, Users, Calendar, AlertTriangle, Info, CheckCircle, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  recipients: 'all' | 'students' | 'staff' | 'specific';
  recipientCount: number;
  sentBy: string;
  sentAt: string;
  status: 'draft' | 'sent' | 'scheduled';
  scheduledFor?: string;
  readCount: number;
}

export const Notifications: React.FC = () => {
  const [notifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Mess Menu Update',
      message: 'New vegetarian options have been added to the mess menu starting from next week. Please check the updated menu on the notice board.',
      type: 'info',
      recipients: 'all',
      recipientCount: 195,
      sentBy: 'Admin',
      sentAt: '2024-02-26T10:30:00',
      status: 'sent',
      readCount: 142
    },
    {
      id: '2',
      title: 'Maintenance Schedule',
      message: 'Water supply will be temporarily disrupted on Floor 2 tomorrow from 9 AM to 12 PM for maintenance work.',
      type: 'warning',
      recipients: 'students',
      recipientCount: 180,
      sentBy: 'Maintenance Team',
      sentAt: '2024-02-25T16:45:00',
      status: 'sent',
      readCount: 165
    },
    {
      id: '3',
      title: 'Fee Payment Reminder',
      message: 'Monthly fees for March are due by 5th March. Please make payments on time to avoid late fees.',
      type: 'warning',
      recipients: 'students',
      recipientCount: 180,
      sentBy: 'Accounts Department',
      sentAt: '2024-02-24T09:00:00',
      status: 'sent',
      readCount: 156
    },
    {
      id: '4',
      title: 'New WiFi Password',
      message: 'WiFi password has been updated for security reasons. New password: HostelWiFi2024. Please update your devices.',
      type: 'info',
      recipients: 'all',
      recipientCount: 195,
      sentBy: 'IT Support',
      sentAt: '2024-02-23T14:20:00',
      status: 'sent',
      readCount: 189
    },
    {
      id: '5',
      title: 'Holiday Notice',
      message: 'The hostel will remain open during the upcoming holiday. Special arrangements have been made for meals.',
      type: 'success',
      recipients: 'all',
      recipientCount: 195,
      sentBy: 'Admin',
      sentAt: '2024-02-22T11:15:00',
      status: 'sent',
      readCount: 178
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  const totalNotifications = notifications.length;
  const sentNotifications = notifications.filter(n => n.status === 'sent').length;
  const draftNotifications = notifications.filter(n => n.status === 'draft').length;
  const scheduledNotifications = notifications.filter(n => n.status === 'scheduled').length;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'info': return Info;
      case 'warning': return AlertTriangle;
      case 'success': return CheckCircle;
      case 'error': return AlertTriangle;
      default: return Bell;
    }
  };

  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case 'info': return 'info';
      case 'warning': return 'warning';
      case 'success': return 'success';
      case 'error': return 'danger';
      default: return 'default';
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'sent': return 'success';
      case 'draft': return 'warning';
      case 'scheduled': return 'info';
      default: return 'default';
    }
  };

  const handleViewNotification = (notification: Notification) => {
    setSelectedNotification(notification);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNotification(null);
  };

  const getReadPercentage = (notification: Notification) => {
    return Math.round((notification.readCount / notification.recipientCount) * 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notification Center</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Send and manage notifications to students and staff
          </p>
        </div>
        <Button className="mt-4 sm:mt-0">
          <Plus className="w-4 h-4 mr-2" />
          Create Notification
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Bell className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Notifications</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalNotifications}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <Send className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Sent</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{sentNotifications}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <div className="w-6 h-6 bg-orange-600 rounded"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Drafts</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{draftNotifications}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Scheduled</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{scheduledNotifications}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => {
              const TypeIcon = getTypeIcon(notification.type);
              const readPercentage = getReadPercentage(notification);
              
              return (
                <div
                  key={notification.id}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                  onClick={() => handleViewNotification(notification)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className={`p-2 rounded-lg ${
                        notification.type === 'info' ? 'bg-blue-100 dark:bg-blue-900' :
                        notification.type === 'warning' ? 'bg-orange-100 dark:bg-orange-900' :
                        notification.type === 'success' ? 'bg-green-100 dark:bg-green-900' :
                        'bg-red-100 dark:bg-red-900'
                      }`}>
                        <TypeIcon className={`w-5 h-5 ${
                          notification.type === 'info' ? 'text-blue-600' :
                          notification.type === 'warning' ? 'text-orange-600' :
                          notification.type === 'success' ? 'text-green-600' :
                          'text-red-600'
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {notification.title}
                          </h3>
                          <div className="flex items-center space-x-2">
                            <Badge variant={getTypeBadgeVariant(notification.type)}>
                              {notification.type}
                            </Badge>
                            <Badge variant={getStatusBadgeVariant(notification.status)}>
                              {notification.status}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center space-x-4">
                            <span>By {notification.sentBy}</span>
                            <span>{new Date(notification.sentAt).toLocaleDateString()}</span>
                            <div className="flex items-center space-x-1">
                              <Users className="w-4 h-4" />
                              <span>{notification.recipientCount} recipients</span>
                            </div>
                          </div>
                          {notification.status === 'sent' && (
                            <div className="flex items-center space-x-2">
                              <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${readPercentage}%` }}
                                ></div>
                              </div>
                              <span className="text-xs">{readPercentage}% read</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Notification Details Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Notification Details"
        maxWidth="2xl"
      >
        {selectedNotification && (
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {selectedNotification.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Notification ID: #{selectedNotification.id}
                </p>
              </div>
              <div className="flex space-x-2">
                <Badge variant={getTypeBadgeVariant(selectedNotification.type)}>
                  {selectedNotification.type}
                </Badge>
                <Badge variant={getStatusBadgeVariant(selectedNotification.status)}>
                  {selectedNotification.status}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Delivery Information</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Recipients:</span>
                    <span className="ml-2 text-gray-900 dark:text-white capitalize">
                      {selectedNotification.recipients} ({selectedNotification.recipientCount})
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Sent By:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">{selectedNotification.sentBy}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Sent At:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">
                      {new Date(selectedNotification.sentAt).toLocaleString()}
                    </span>
                  </div>
                  {selectedNotification.status === 'sent' && (
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Read Count:</span>
                      <span className="ml-2 text-gray-900 dark:text-white">
                        {selectedNotification.readCount} / {selectedNotification.recipientCount} 
                        ({getReadPercentage(selectedNotification)}%)
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Actions</h4>
                <div className="space-y-2">
                  {selectedNotification.status === 'sent' && (
                    <>
                      <Button className="w-full" size="sm">
                        View Read Receipts
                      </Button>
                      <Button variant="secondary" className="w-full" size="sm">
                        Send Reminder
                      </Button>
                    </>
                  )}
                  {selectedNotification.status === 'draft' && (
                    <>
                      <Button className="w-full" size="sm">
                        Send Now
                      </Button>
                      <Button variant="secondary" className="w-full" size="sm">
                        Schedule
                      </Button>
                    </>
                  )}
                  <Button variant="ghost" className="w-full" size="sm">
                    Duplicate
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">Message</h4>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {selectedNotification.message}
                </p>
              </div>
            </div>

            {selectedNotification.status === 'sent' && (
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Delivery Statistics</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">{selectedNotification.readCount}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Read</p>
                  </div>
                  <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <p className="text-2xl font-bold text-orange-600">
                      {selectedNotification.recipientCount - selectedNotification.readCount}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Unread</p>
                  </div>
                  <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">{getReadPercentage(selectedNotification)}%</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Read Rate</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};