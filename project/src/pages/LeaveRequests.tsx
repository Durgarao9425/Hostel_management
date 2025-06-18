import React, { useState } from 'react';
import { Search, Filter, Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { mockLeaveRequests } from '../data/mockData';
import type { LeaveRequest } from '../types';

export const LeaveRequests: React.FC = () => {
  const [leaveRequests] = useState<LeaveRequest[]>(mockLeaveRequests);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Pending' | 'Approved' | 'Rejected'>('All');
  const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredRequests = leaveRequests.filter(request => {
    const matchesSearch = request.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || request.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalRequests = leaveRequests.length;
  const pendingRequests = leaveRequests.filter(r => r.status === 'Pending').length;
  const approvedRequests = leaveRequests.filter(r => r.status === 'Approved').length;
  const rejectedRequests = leaveRequests.filter(r => r.status === 'Rejected').length;

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Approved': return 'success';
      case 'Pending': return 'warning';
      case 'Rejected': return 'danger';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved': return CheckCircle;
      case 'Pending': return Clock;
      case 'Rejected': return XCircle;
      default: return Calendar;
    }
  };

  const handleViewRequest = (request: LeaveRequest) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  const calculateDays = (fromDate: string, toDate: string) => {
    const from = new Date(fromDate);
    const to = new Date(toDate);
    const diffTime = Math.abs(to.getTime() - from.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Leave Requests</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage student leave applications and approvals
          </p>
        </div>
        <Button className="mt-4 sm:mt-0">
          Export Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Requests</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalRequests}</p>
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{pendingRequests}</p>
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Approved</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{approvedRequests}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Rejected</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{rejectedRequests}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Leave Requests Table */}
      <Card>
        <CardHeader>
          <CardTitle>Leave Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Search by student name or reason..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<Search className="w-4 h-4" />}
              />
            </div>
            <div className="flex space-x-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as 'All' | 'Pending' | 'Approved' | 'Rejected')}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
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
                <TableHead>Student</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Days</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Request Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((request) => {
                const StatusIcon = getStatusIcon(request.status);
                const days = calculateDays(request.fromDate, request.toDate);
                return (
                  <TableRow key={request.id} onClick={() => handleViewRequest(request)}>
                    <TableCell>
                      <span className="font-medium text-gray-900 dark:text-white">{request.studentName}</span>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p className="text-gray-900 dark:text-white">
                          {new Date(request.fromDate).toLocaleDateString()}
                        </p>
                        <p className="text-gray-500 dark:text-gray-400">
                          to {new Date(request.toDate).toLocaleDateString()}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {days} {days === 1 ? 'day' : 'days'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-gray-900 dark:text-white truncate max-w-xs">
                        {request.reason}
                      </p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <StatusIcon className={`w-4 h-4 ${
                          request.status === 'Approved' ? 'text-green-600' :
                          request.status === 'Pending' ? 'text-orange-600' :
                          'text-red-600'
                        }`} />
                        <Badge variant={getStatusBadgeVariant(request.status)}>
                          {request.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-gray-900 dark:text-white">
                        {new Date(request.requestDate).toLocaleDateString()}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        {request.status === 'Pending' && (
                          <>
                            <Button size="sm" variant="secondary">
                              Approve
                            </Button>
                            <Button size="sm" variant="danger">
                              Reject
                            </Button>
                          </>
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

          {filteredRequests.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">No leave requests found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Leave Request Details Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Leave Request Details"
        maxWidth="2xl"
      >
        {selectedRequest && (
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {selectedRequest.studentName}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Request ID: #{selectedRequest.id}
                </p>
              </div>
              <Badge variant={getStatusBadgeVariant(selectedRequest.status)}>
                {selectedRequest.status}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Leave Details</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">From Date:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">
                      {new Date(selectedRequest.fromDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">To Date:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">
                      {new Date(selectedRequest.toDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Duration:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">
                      {calculateDays(selectedRequest.fromDate, selectedRequest.toDate)} days
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Request Date:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">
                      {new Date(selectedRequest.requestDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Approval Details</h4>
                <div className="space-y-2 text-sm">
                  {selectedRequest.approvedBy && (
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Approved By:</span>
                      <span className="ml-2 text-gray-900 dark:text-white">{selectedRequest.approvedBy}</span>
                    </div>
                  )}
                  {selectedRequest.approvedDate && (
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Approved Date:</span>
                      <span className="ml-2 text-gray-900 dark:text-white">
                        {new Date(selectedRequest.approvedDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  {selectedRequest.status === 'Pending' && (
                    <div className="space-y-2 pt-2">
                      <Button className="w-full" size="sm">
                        Approve Request
                      </Button>
                      <Button variant="danger" className="w-full" size="sm">
                        Reject Request
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">Reason for Leave</h4>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {selectedRequest.reason}
                </p>
              </div>
            </div>

            {selectedRequest.remarks && (
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Admin Remarks</h4>
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    {selectedRequest.remarks}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};