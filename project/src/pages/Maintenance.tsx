import React, { useState } from 'react';
import { Wrench, AlertTriangle, CheckCircle, Clock, Plus, Search, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';

interface MaintenanceRequest {
  id: string;
  title: string;
  description: string;
  location: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Pending' | 'In Progress' | 'Completed' | 'On Hold';
  assignedTo?: string;
  requestedBy: string;
  requestDate: string;
  completedDate?: string;
  estimatedCost: number;
  actualCost?: number;
}

export const Maintenance: React.FC = () => {
  const [requests] = useState<MaintenanceRequest[]>([
    {
      id: '1',
      title: 'AC Repair - Room A101',
      description: 'Air conditioning unit not cooling properly. Needs immediate attention.',
      location: 'Room A101',
      priority: 'High',
      status: 'In Progress',
      assignedTo: 'John Technician',
      requestedBy: 'Alex Johnson',
      requestDate: '2024-02-25',
      estimatedCost: 5000,
      actualCost: 4500
    },
    {
      id: '2',
      title: 'Plumbing Issue - Floor 2 Bathroom',
      description: 'Water leakage in the shared bathroom. Multiple taps not working.',
      location: 'Floor 2 Bathroom',
      priority: 'Critical',
      status: 'Pending',
      requestedBy: 'Emily Davis',
      requestDate: '2024-02-26',
      estimatedCost: 8000
    },
    {
      id: '3',
      title: 'WiFi Router Replacement',
      description: 'WiFi router in common area needs replacement due to frequent disconnections.',
      location: 'Common Area - Floor 1',
      priority: 'Medium',
      status: 'Completed',
      assignedTo: 'IT Support Team',
      requestedBy: 'David Wilson',
      requestDate: '2024-02-20',
      completedDate: '2024-02-24',
      estimatedCost: 3000,
      actualCost: 2800
    },
    {
      id: '4',
      title: 'Door Lock Repair',
      description: 'Main entrance door lock is malfunctioning. Security concern.',
      location: 'Main Entrance',
      priority: 'High',
      status: 'On Hold',
      assignedTo: 'Security Team',
      requestedBy: 'Sophie Brown',
      requestDate: '2024-02-23',
      estimatedCost: 2000
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Pending' | 'In Progress' | 'Completed' | 'On Hold'>('All');
  const [selectedRequest, setSelectedRequest] = useState<MaintenanceRequest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.requestedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || request.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalRequests = requests.length;
  const pendingRequests = requests.filter(r => r.status === 'Pending').length;
  const inProgressRequests = requests.filter(r => r.status === 'In Progress').length;
  const completedRequests = requests.filter(r => r.status === 'Completed').length;
  const totalCost = requests.reduce((sum, r) => sum + (r.actualCost || r.estimatedCost), 0);

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Completed': return 'success';
      case 'In Progress': return 'info';
      case 'Pending': return 'warning';
      case 'On Hold': return 'danger';
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
      case 'Completed': return CheckCircle;
      case 'In Progress': return Clock;
      case 'Pending': return AlertTriangle;
      case 'On Hold': return AlertTriangle;
      default: return Wrench;
    }
  };

  const handleViewRequest = (request: MaintenanceRequest) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Maintenance Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track and manage facility maintenance requests
          </p>
        </div>
        <Button className="mt-4 sm:mt-0">
          <Plus className="w-4 h-4 mr-2" />
          New Request
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Wrench className="w-6 h-6 text-blue-600" />
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
                <AlertTriangle className="w-6 h-6 text-orange-600" />
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
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">In Progress</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{inProgressRequests}</p>
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{completedRequests}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <div className="w-6 h-6 bg-purple-600 rounded"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Cost</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">₹{totalCost.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Maintenance Requests Table */}
      <Card>
        <CardHeader>
          <CardTitle>Maintenance Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Search by title, location, or requester..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<Search className="w-4 h-4" />}
              />
            </div>
            <div className="flex space-x-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as 'All' | 'Pending' | 'In Progress' | 'Completed' | 'On Hold')}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="On Hold">On Hold</option>
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
                <TableHead>Request</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((request) => {
                const StatusIcon = getStatusIcon(request.status);
                return (
                  <TableRow key={request.id} onClick={() => handleViewRequest(request)}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{request.title}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          By {request.requestedBy} • {new Date(request.requestDate).toLocaleDateString()}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-gray-900 dark:text-white">{request.location}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getPriorityBadgeVariant(request.priority)}>
                        {request.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <StatusIcon className={`w-4 h-4 ${
                          request.status === 'Completed' ? 'text-green-600' :
                          request.status === 'In Progress' ? 'text-blue-600' :
                          request.status === 'Pending' ? 'text-orange-600' :
                          'text-red-600'
                        }`} />
                        <Badge variant={getStatusBadgeVariant(request.status)}>
                          {request.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      {request.assignedTo ? (
                        <span className="text-gray-900 dark:text-white">{request.assignedTo}</span>
                      ) : (
                        <span className="text-gray-400 dark:text-gray-500">Unassigned</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div>
                        <span className="font-medium text-gray-900 dark:text-white">
                          ₹{(request.actualCost || request.estimatedCost).toLocaleString()}
                        </span>
                        {!request.actualCost && (
                          <p className="text-xs text-gray-500 dark:text-gray-400">Estimated</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        {request.status === 'Pending' && (
                          <Button size="sm">
                            Assign
                          </Button>
                        )}
                        {request.status === 'In Progress' && (
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

          {filteredRequests.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">No maintenance requests found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Request Details Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Maintenance Request Details"
        maxWidth="2xl"
      >
        {selectedRequest && (
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {selectedRequest.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Request ID: #{selectedRequest.id}
                </p>
              </div>
              <div className="flex space-x-2">
                <Badge variant={getPriorityBadgeVariant(selectedRequest.priority)}>
                  {selectedRequest.priority}
                </Badge>
                <Badge variant={getStatusBadgeVariant(selectedRequest.status)}>
                  {selectedRequest.status}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Request Information</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Location:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">{selectedRequest.location}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Requested By:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">{selectedRequest.requestedBy}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Request Date:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">
                      {new Date(selectedRequest.requestDate).toLocaleDateString()}
                    </span>
                  </div>
                  {selectedRequest.assignedTo && (
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Assigned To:</span>
                      <span className="ml-2 text-gray-900 dark:text-white">{selectedRequest.assignedTo}</span>
                    </div>
                  )}
                  {selectedRequest.completedDate && (
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Completed:</span>
                      <span className="ml-2 text-gray-900 dark:text-white">
                        {new Date(selectedRequest.completedDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Cost Information</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Estimated Cost:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">
                      ₹{selectedRequest.estimatedCost.toLocaleString()}
                    </span>
                  </div>
                  {selectedRequest.actualCost && (
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Actual Cost:</span>
                      <span className="ml-2 text-gray-900 dark:text-white">
                        ₹{selectedRequest.actualCost.toLocaleString()}
                      </span>
                    </div>
                  )}
                  {selectedRequest.actualCost && (
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Variance:</span>
                      <span className={`ml-2 ${
                        selectedRequest.actualCost <= selectedRequest.estimatedCost 
                          ? 'text-green-600' 
                          : 'text-red-600'
                      }`}>
                        ₹{Math.abs(selectedRequest.actualCost - selectedRequest.estimatedCost).toLocaleString()}
                        {selectedRequest.actualCost <= selectedRequest.estimatedCost ? ' under' : ' over'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">Description</h4>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {selectedRequest.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};