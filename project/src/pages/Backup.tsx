import React, { useState } from 'react';
import { Database, Download, Upload, RefreshCw, Shield, Calendar, HardDrive, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

interface BackupRecord {
  id: string;
  name: string;
  type: 'full' | 'incremental' | 'differential';
  size: string;
  createdAt: string;
  status: 'completed' | 'in-progress' | 'failed';
  location: string;
}

export const Backup: React.FC = () => {
  const [backups] = useState<BackupRecord[]>([
    {
      id: '1',
      name: 'Full System Backup - March 2024',
      type: 'full',
      size: '2.4 GB',
      createdAt: '2024-03-01T02:00:00',
      status: 'completed',
      location: 'Cloud Storage'
    },
    {
      id: '2',
      name: 'Daily Incremental - Feb 28',
      type: 'incremental',
      size: '156 MB',
      createdAt: '2024-02-28T23:30:00',
      status: 'completed',
      location: 'Local Server'
    },
    {
      id: '3',
      name: 'Weekly Differential - Feb 25',
      type: 'differential',
      size: '890 MB',
      createdAt: '2024-02-25T01:00:00',
      status: 'completed',
      location: 'Cloud Storage'
    },
    {
      id: '4',
      name: 'Emergency Backup - Feb 24',
      type: 'full',
      size: '2.3 GB',
      createdAt: '2024-02-24T15:45:00',
      status: 'completed',
      location: 'External Drive'
    },
    {
      id: '5',
      name: 'Daily Incremental - Feb 23',
      type: 'incremental',
      size: '203 MB',
      createdAt: '2024-02-23T23:30:00',
      status: 'failed',
      location: 'Local Server'
    }
  ]);

  const [isBackupInProgress, setIsBackupInProgress] = useState(false);

  const totalBackups = backups.length;
  const completedBackups = backups.filter(b => b.status === 'completed').length;
  const failedBackups = backups.filter(b => b.status === 'failed').length;
  const totalSize = backups
    .filter(b => b.status === 'completed')
    .reduce((total, backup) => {
      const size = parseFloat(backup.size);
      const unit = backup.size.includes('GB') ? 1024 : 1;
      return total + (size * unit);
    }, 0);

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'warning';
      case 'failed': return 'danger';
      default: return 'default';
    }
  };

  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case 'full': return 'info';
      case 'incremental': return 'default';
      case 'differential': return 'warning';
      default: return 'default';
    }
  };

  const handleCreateBackup = (type: 'full' | 'incremental' | 'differential') => {
    setIsBackupInProgress(true);
    // Simulate backup process
    setTimeout(() => {
      setIsBackupInProgress(false);
    }, 3000);
  };

  const formatSize = (sizeInMB: number) => {
    if (sizeInMB >= 1024) {
      return `${(sizeInMB / 1024).toFixed(1)} GB`;
    }
    return `${sizeInMB.toFixed(0)} MB`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Backup & Restore</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage system backups and data recovery
          </p>
        </div>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <Badge variant={isBackupInProgress ? 'warning' : 'success'}>
            {isBackupInProgress ? 'Backup in Progress' : 'System Ready'}
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Database className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Backups</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalBackups}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Successful</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{completedBackups}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Failed</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{failedBackups}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <HardDrive className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Size</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatSize(totalSize)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Backup Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Create New Backup</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                <Button 
                  className="w-full justify-start h-auto p-4"
                  onClick={() => handleCreateBackup('full')}
                  disabled={isBackupInProgress}
                >
                  <div className="flex items-center space-x-3">
                    <Database className="w-6 h-6" />
                    <div className="text-left">
                      <p className="font-medium">Full System Backup</p>
                      <p className="text-sm opacity-90">Complete backup of all data and settings</p>
                    </div>
                  </div>
                </Button>
                
                <Button 
                  variant="secondary" 
                  className="w-full justify-start h-auto p-4"
                  onClick={() => handleCreateBackup('incremental')}
                  disabled={isBackupInProgress}
                >
                  <div className="flex items-center space-x-3">
                    <RefreshCw className="w-6 h-6" />
                    <div className="text-left">
                      <p className="font-medium">Incremental Backup</p>
                      <p className="text-sm opacity-90">Backup only changed data since last backup</p>
                    </div>
                  </div>
                </Button>
                
                <Button 
                  variant="secondary" 
                  className="w-full justify-start h-auto p-4"
                  onClick={() => handleCreateBackup('differential')}
                  disabled={isBackupInProgress}
                >
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-6 h-6" />
                    <div className="text-left">
                      <p className="font-medium">Differential Backup</p>
                      <p className="text-sm opacity-90">Backup changes since last full backup</p>
                    </div>
                  </div>
                </Button>
              </div>
              
              {isBackupInProgress && (
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />
                    <div>
                      <p className="text-sm font-medium text-blue-900 dark:text-blue-300">
                        Backup in progress...
                      </p>
                      <p className="text-xs text-blue-700 dark:text-blue-400">
                        This may take several minutes to complete
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Backup Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">Daily Incremental</h4>
                  <Badge variant="success">Active</Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Every day at 11:30 PM
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  Last run: Feb 28, 2024 at 11:30 PM
                </p>
              </div>

              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">Weekly Full Backup</h4>
                  <Badge variant="success">Active</Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Every Sunday at 2:00 AM
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  Next run: Mar 3, 2024 at 2:00 AM
                </p>
              </div>

              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">Monthly Archive</h4>
                  <Badge variant="info">Scheduled</Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  First Sunday of every month
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  Next run: Mar 5, 2024 at 1:00 AM
                </p>
              </div>

              <Button variant="secondary" className="w-full">
                Manage Schedule
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Backup History */}
      <Card>
        <CardHeader>
          <CardTitle>Backup History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {backups.map((backup) => (
              <div
                key={backup.id}
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg ${
                    backup.status === 'completed' ? 'bg-green-100 dark:bg-green-900' :
                    backup.status === 'failed' ? 'bg-red-100 dark:bg-red-900' :
                    'bg-orange-100 dark:bg-orange-900'
                  }`}>
                    <Database className={`w-5 h-5 ${
                      backup.status === 'completed' ? 'text-green-600' :
                      backup.status === 'failed' ? 'text-red-600' :
                      'text-orange-600'
                    }`} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{backup.name}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <span>{new Date(backup.createdAt).toLocaleString()}</span>
                      <span>{backup.size}</span>
                      <span>{backup.location}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant={getTypeBadgeVariant(backup.type)}>
                    {backup.type}
                  </Badge>
                  <Badge variant={getStatusBadgeVariant(backup.status)}>
                    {backup.status}
                  </Badge>
                  <div className="flex space-x-2">
                    {backup.status === 'completed' && (
                      <>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Upload className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};