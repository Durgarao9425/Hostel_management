import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Eye, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { mockStudents } from '../data/mockData';
import type { Student } from '../types';

export const Students: React.FC = () => {
  const [students] = useState<Student[]>(mockStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'view' | 'add' | 'edit'>('view');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Active' | 'Inactive'>('All');

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.roomNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || student.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleViewStudent = (student: Student) => {
    setSelectedStudent(student);
    setModalType('view');
    setIsModalOpen(true);
  };

  const handleEditStudent = (student: Student) => {
    setSelectedStudent(student);
    setModalType('edit');
    setIsModalOpen(true);
  };

  const handleAddStudent = () => {
    setSelectedStudent(null);
    setModalType('add');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  const getStatusBadgeVariant = (status: string) => {
    return status === 'Active' ? 'success' : 'warning';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Students</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage hostel students and their information
          </p>
        </div>
        <Button onClick={handleAddStudent} className="mt-4 sm:mt-0">
          <Plus className="w-4 h-4 mr-2" />
          Add Student
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <div className="w-6 h-6 bg-blue-600 rounded"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Students</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{students.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <div className="w-6 h-6 bg-green-600 rounded"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Students</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {students.filter(s => s.status === 'Active').length}
                </p>
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Inactive Students</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {students.filter(s => s.status === 'Inactive').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Student Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Search students by name, email, or room..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<Search className="w-4 h-4" />}
              />
            </div>
            <div className="flex space-x-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as 'All' | 'Active' | 'Inactive')}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <Button variant="secondary">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          {/* Students Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <img
                        src={student.avatar || `https://ui-avatars.com/api/?name=${student.name}&background=3B82F6&color=fff`}
                        alt={student.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{student.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{student.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{student.roomNumber}</span>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{student.course}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{student.year}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm">{student.phone}</p>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(student.status)}>
                      {student.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewStudent(student)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditStudent(student)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredStudents.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">No students found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Student Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={
          modalType === 'view' ? 'Student Details' :
          modalType === 'edit' ? 'Edit Student' : 'Add New Student'
        }
        maxWidth="2xl"
      >
        {selectedStudent && modalType === 'view' && (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <img
                src={selectedStudent.avatar || `https://ui-avatars.com/api/?name=${selectedStudent.name}&background=3B82F6&color=fff`}
                alt={selectedStudent.name}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {selectedStudent.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{selectedStudent.email}</p>
                <Badge variant={getStatusBadgeVariant(selectedStudent.status)}>
                  {selectedStudent.status}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Personal Information</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Phone:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">{selectedStudent.phone}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Address:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">{selectedStudent.address}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Admission Date:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">
                      {new Date(selectedStudent.admissionDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Academic Information</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Course:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">{selectedStudent.course}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Year:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">{selectedStudent.year}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Room:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">{selectedStudent.roomNumber}</span>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Guardian Information</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Guardian Name:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">{selectedStudent.guardianName}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Guardian Phone:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">{selectedStudent.guardianPhone}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {modalType === 'add' && (
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400">
              Add new student form would be implemented here with all required fields.
            </p>
            <div className="flex justify-end space-x-3">
              <Button variant="secondary" onClick={closeModal}>
                Cancel
              </Button>
              <Button onClick={closeModal}>
                Add Student
              </Button>
            </div>
          </div>
        )}

        {modalType === 'edit' && (
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400">
              Edit student form would be implemented here with pre-filled data.
            </p>
            <div className="flex justify-end space-x-3">
              <Button variant="secondary" onClick={closeModal}>
                Cancel
              </Button>
              <Button onClick={closeModal}>
                Save Changes
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};