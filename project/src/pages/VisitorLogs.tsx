import React, { useState } from 'react';
import { Search, Filter, UserCheck, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { mockVisitorLogs } from '../data/mockData';
import type { VisitorLog } from '../types';

export const VisitorLogs: React.FC = () => {
  const [visitorLogs] = useState<VisitorLog[]>(mockVisitorLogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Checked In' | 'Checked Out'>('All');
  const [selectedLog, setSelectedLog] = useState<VisitorLog | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredLogs = visitorLogs.filter(log => {
    const matchesSearch = log.visitorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.purpose.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || log.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalVisitors = visitorLogs.length;
  const checkedInVisitors = visitorLogs.filter(v => v.status === 'Checked In').length;
  const checkedOutVisitors = visitorLogs.filter(v => v.status === 'Checked Out').length;

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Checked In': return 'warning';
      case 'Checked Out': return 'success';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Checked In': return Clock;
      case 'Checked Out': return CheckCircle;
      default: return UserCheck;
    }
  };

  const handleViewLog = (log: VisitorLog) => {
    setSelectedLog(log);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLog(null);
  };

  const formatDateTime = (dateTime: string) => {
    return new Date(dateTime).toLocaleString();
  };

  const calculateDuration = (checkIn: string, checkOut?: string) => {
    if (!checkOut) return 'Ongoing';
    
    const checkInTime = new Date(checkIn);
    const checkOutTime = new Date(checkOut);
    const diffMs = checkOutTime.getTime() - checkInTime.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffHours > 0) {
      return `${diffHours}h ${diffMinutes}m`;
    }
    return `${diffMinutes}m`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Visitor Logs</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track and manage visitor check-ins and check-outs
          </p>
        </div>
        <Button className="mt-4 sm:mt-0">
          New Visitor Entry
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <UserCheck className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Visitors</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalVisitors}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Currently Inside</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{checkedInVisitors}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Checked Out</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{checkedOutVisitors}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Visitor Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Visitor Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Search by visitor name, student, or purpose..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<Search className="w-4 h-4" />}
              />
            </div>
            <div className="flex space-x-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as 'All' | 'Checked In' | 'Checked Out')}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="All">All Status</option>
                <option value="Checked In">Checked In</option>
                <option value="Checked Out">Checked Out</option>
              </select>
              <Button variant="secondary">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Visitor</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead>Check In</TableHead>
                <TableHead>Check Out</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => {
                const StatusIcon = getStatusIcon(log.status);
                return (
                  <TableRow key={log.id} onClick={() => handleViewLog(log)}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{log.visitorName}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{log.visitorPhone}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-gray-900 dark:text-white">{log.studentName}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-gray-900 dark:text-white">{log.purpose}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-900 dark:text-white">
                        {formatDateTime(log.checkInTime)}
                      </span>
                    </TableCell>
                    <TableCell>
                      {log.checkOutTime ? (
                        <span className="text-sm text-gray-900 dark:text-white">
                          {formatDateTime(log.checkOutTime)}
                        </span>
                      ) : (
                        <span className="text-sm text-gray-400 dark:text-gray-500">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-900 dark:text-white">
                        {calculateDuration(log.checkInTime, log.checkOutTime)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <StatusIcon className={`w-4 h-4 ${
                          log.status === 'Checked In' ? 'text-orange-600' : 'text-green-600'
                        }`} />
                        <Badge variant={getStatusBadgeVariant(log.status)}>
                          {log.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        {log.status === 'Checked In' && (
                          <Button size="sm">
                            Check Out
                          </Button>
                        )}
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          {filteredLogs.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">No visitor logs found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Visitor Log Details Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Visitor Log Details"
        maxWidth="2xl"
      >
        {selectedLog && (
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {selectedLog.visitorName}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Log ID: #{selectedLog.id}
                </p>
              </div>
              <Badge variant={getStatusBadgeVariant(selectedLog.status)}>
                {selectedLog.status}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Visitor Information</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Name:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">{selectedLog.visitorName}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Phone:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">{selectedLog.visitorPhone}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Purpose:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">{selectedLog.purpose}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Approved By:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">{selectedLog.approvedBy}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Visit Details</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Student:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">{selectedLog.studentName}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Check In:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">
                      {formatDateTime(selectedLog.checkInTime)}
                    </span>
                  </div>
                  {selectedLog.checkOutTime && (
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Check Out:</span>
                      <span className="ml-2 text-gray-900 dark:text-white">
                        {formatDateTime(selectedLog.checkOutTime)}
                      </span>
                    </div>
                  )}
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Duration:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">
                      {calculateDuration(selectedLog.checkInTime, selectedLog.checkOutTime)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {selectedLog.status === 'Checked In' && (
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button variant="secondary" onClick={closeModal}>
                  Cancel
                </Button>
                <Button onClick={closeModal}>
                  Check Out Visitor
                </Button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};