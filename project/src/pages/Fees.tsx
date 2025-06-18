import React, { useState } from 'react';
import { Search, Filter, DollarSign, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import { Badge } from '../components/ui/Badge';
import { mockFees } from '../data/mockData';
import type { Fee } from '../types';

export const Fees: React.FC = () => {
  const [fees] = useState<Fee[]>(mockFees);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Pending' | 'Paid' | 'Overdue'>('All');

  const filteredFees = fees.filter(fee => {
    const matchesSearch = fee.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fee.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || fee.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalFees = fees.reduce((sum, fee) => sum + fee.amount, 0);
  const paidFees = fees.filter(f => f.status === 'Paid').reduce((sum, fee) => sum + fee.amount, 0);
  const pendingFees = fees.filter(f => f.status === 'Pending').reduce((sum, fee) => sum + fee.amount, 0);
  const overdueFees = fees.filter(f => f.status === 'Overdue').reduce((sum, fee) => sum + fee.amount, 0);

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Paid': return 'success';
      case 'Pending': return 'warning';
      case 'Overdue': return 'danger';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Paid': return CheckCircle;
      case 'Pending': return Clock;
      case 'Overdue': return AlertCircle;
      default: return DollarSign;
    }
  };

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString()}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Fee Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track and manage student fee payments
          </p>
        </div>
        <Button className="mt-4 sm:mt-0">
          Generate Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Fees</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(totalFees)}
                </p>
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Collected</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(paidFees)}
                </p>
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
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(pendingFees)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Overdue</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(overdueFees)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fees Table */}
      <Card>
        <CardHeader>
          <CardTitle>Fee Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Search by student name or fee type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<Search className="w-4 h-4" />}
              />
            </div>
            <div className="flex space-x-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as 'All' | 'Pending' | 'Paid' | 'Overdue')}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="Overdue">Overdue</option>
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
                <TableHead>Fee Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFees.map((fee) => {
                const StatusIcon = getStatusIcon(fee.status);
                return (
                  <TableRow key={fee.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{fee.studentName}</p>
                        {fee.description && (
                          <p className="text-sm text-gray-500 dark:text-gray-400">{fee.description}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{fee.type}</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {formatCurrency(fee.amount)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`${
                        fee.status === 'Overdue' ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'
                      }`}>
                        {new Date(fee.dueDate).toLocaleDateString()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <StatusIcon className={`w-4 h-4 ${
                          fee.status === 'Paid' ? 'text-green-600' :
                          fee.status === 'Pending' ? 'text-orange-600' :
                          'text-red-600'
                        }`} />
                        <Badge variant={getStatusBadgeVariant(fee.status)}>
                          {fee.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      {fee.paidDate ? (
                        <span className="text-gray-900 dark:text-white">
                          {new Date(fee.paidDate).toLocaleDateString()}
                        </span>
                      ) : (
                        <span className="text-gray-400 dark:text-gray-500">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        {fee.status === 'Pending' && (
                          <Button size="sm">
                            Mark Paid
                          </Button>
                        )}
                        {fee.status === 'Overdue' && (
                          <Button size="sm" variant="danger">
                            Send Reminder
                          </Button>
                        )}
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          {filteredFees.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">No fee records found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};