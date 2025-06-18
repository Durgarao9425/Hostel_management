export interface User {
  id: string;
  email: string;
  name: string;
  role: 'SuperAdmin' | 'HostelAdmin' | 'Student' | 'Receptionist';
  avatar?: string;
  createdAt: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  roomNumber: string;
  admissionDate: string;
  course: string;
  year: string;
  status: 'Active' | 'Inactive';
  avatar?: string;
  guardianName: string;
  guardianPhone: string;
  address: string;
}

export interface Room {
  id: string;
  number: string;
  type: 'Single' | 'Double' | 'Triple' | 'Quad';
  capacity: number;
  occupied: number;
  floor: number;
  rent: number;
  status: 'Available' | 'Occupied' | 'Maintenance';
  amenities: string[];
  students: string[];
}

export interface Fee {
  id: string;
  studentId: string;
  studentName: string;
  amount: number;
  type: 'Room Rent' | 'Mess Fee' | 'Security Deposit' | 'Other';
  dueDate: string;
  paidDate?: string;
  status: 'Pending' | 'Paid' | 'Overdue';
  description?: string;
}

export interface Complaint {
  id: string;
  studentId: string;
  studentName: string;
  title: string;
  description: string;
  category: 'Maintenance' | 'Food' | 'Cleanliness' | 'Noise' | 'Other';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  createdAt: string;
  resolvedAt?: string;
  assignedTo?: string;
}

export interface LeaveRequest {
  id: string;
  studentId: string;
  studentName: string;
  fromDate: string;
  toDate: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  requestDate: string;
  approvedBy?: string;
  approvedDate?: string;
  remarks?: string;
}

export interface VisitorLog {
  id: string;
  visitorName: string;
  visitorPhone: string;
  studentId: string;
  studentName: string;
  purpose: string;
  checkInTime: string;
  checkOutTime?: string;
  status: 'Checked In' | 'Checked Out';
  approvedBy: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}