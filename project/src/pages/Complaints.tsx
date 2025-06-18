import React, { useState } from 'react';
import { Search, Filter, Plus, MessageSquare, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { mockComplaints } from '../data/mockData';
import type { Complaint } from '../types';

export const Complaints: React.FC = () => {
  const [complaints] = useState<Complaint[]>(mockComplaints);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Open' | 'In Progress' | 'Resolved' | 'Closed'>('All');
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredComplaints = complaints.filter(complaint => {
    const matchesSearch = complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || complaint.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalComplaints = complaints.length;
  const openComplaints = complaints.filter(c => c.status === 'Open').length;
  const inProgressComplaints = complaints.filter(c => c.status === 'In Progress').length;
  const resolvedComplaints = complaints.filter(c => c.status === 'Resolved').length;

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Open': return 'danger';
      case 'In Progress': return 'warning';
      case 'Resolved': return 'success';
      case 'Closed': return 'default';
      default: return 'default';
    }
  };

  const getPriorityBadgeVariant = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'danger';
      case 'High': return 'warning';
      case 'Medium': return 'info';
      case 'Low': return 'default';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Open': return AlertTriangle;
      case 'In Progress': return Clock;
      case 'Resolved': return CheckCircle;
      case 'Closed': return CheckCircle;
      default: return MessageSquare;
    }
  };

  const handleViewComplaint = (complaint: Complaint) => {
    setSelectedComplaint(complaint);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedComplaint(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Complaints Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track and resolve student complaints and issues
          </p>
        </div>
        <Button className="mt-4 sm:mt-0">
          <Plus className="w-4 h-4 mr-2" />
          New Complaint
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Complaints</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalComplaints}</p>
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Open</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{openComplaints}</p>
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">In Progress</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{inProgressComplaints}</p>
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Resolved</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{resolvedComplaints}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Complaints Table */}
      <Card>
        <CardHeader>
          <CardTitle>Complaint Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Search complaints by title, student, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<Search className="w-4 h-4" />}
              />
            </div>
            <div className="flex space-x-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as 'All' | 'Open' | 'In Progress' | 'Resolved' | 'Closed')}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="All">All Status</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
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
                <TableHead>Complaint</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredComplaints.map((complaint) => {
                const StatusIcon = getStatusIcon(complaint.status);
                return (
                  <TableRow key={complaint.id} onClick={() => handleViewComplaint(complaint)}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{complaint.title}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">
                          {complaint.description}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{complaint.studentName}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="default">{complaint.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getPriorityBadgeVariant(complaint.priority)}>
                        {complaint.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <StatusIcon className={`w-4 h-4 ${
                          complaint.status === 'Open' ? 'text-red-600' :
                          complaint.status === 'In Progress' ? 'text-orange-600' :
                          'text-green-600'
                        }`} />
                        <Badge variant={getStatusBadgeVariant(complaint.status)}>
                          {complaint.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-gray-900 dark:text-white">
                        {new Date(complaint.createdAt).toLocaleDateString()}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        {complaint.status === 'Open' && (
                          <Button size="sm">
                            Assign
                          </Button>
                        )}
                        {complaint.status === 'In Progress' && (
                          <Button size="sm" variant="secondary">
                            Update
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

          {filteredComplaints.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">No complaints found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Complaint Details Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Complaint Details"
        maxWidth="2xl"
      >
        {selectedComplaint && (
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {selectedComplaint.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Complaint ID: #{selectedComplaint.id}
                </p>
              </div>
              <div className="flex space-x-2">
                <Badge variant={getPriorityBadgeVariant(selectedComplaint.priority)}>
                  {selectedComplaint.priority}
                </Badge>
                <Badge variant={getStatusBadgeVariant(selectedComplaint.status)}>
                  {selectedComplaint.status}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Complaint Information</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Student:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">{selectedComplaint.studentName}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Category:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">{selectedComplaint.category}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Created:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">
                      {new Date(selectedComplaint.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  {selectedComplaint.assignedTo && (
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Assigned to:</span>
                      <span className="ml-2 text-gray-900 dark:text-white">{selectedComplaint.assignedTo}</span>
                    </div>
                  )}
                  {selectedComplaint.resolvedAt && (
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Resolved:</span>
                      <span className="ml-2 text-gray-900 dark:text-white">
                        {new Date(selectedComplaint.resolvedAt).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Actions</h4>
                <div className="space-y-2">
                  {selectedComplaint.status === 'Open' && (
                    <>
                      <Button className="w-full" size="sm">
                        Assign to Team
                      </Button>
                      <Button variant="secondary" className="w-full" size="sm">
                        Mark In Progress
                      </Button>
                    </>
                  )}
                  {selectedComplaint.status === 'In Progress' && (
                    <>
                      <Button className="w-full" size="sm">
                        Mark Resolved
                      </Button>
                      <Button variant="secondary" className="w-full" size="sm">
                        Add Update
                      </Button>
                    </>
                  )}
                  <Button variant="ghost" className="w-full" size="sm">
                    Contact Student
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">Description</h4>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {selectedComplaint.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};