import { Student, Room, Fee, Complaint, LeaveRequest, VisitorLog } from '../types';

export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex@student.com',
    phone: '+1-234-567-8901',
    roomNumber: 'A101',
    admissionDate: '2024-01-15',
    course: 'Computer Science',
    year: '2nd Year',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    guardianName: 'Robert Johnson', 
    guardianPhone: '+1-234-567-8902',
    address: '123 Main St, City, State 12345'
  },
  {
    id: '2',
    name: 'Emily Davis',
    email: 'emily@student.com',
    phone: '+1-234-567-8903',
    roomNumber: 'A102',
    admissionDate: '2024-01-20',
    course: 'Business Administration',
    year: '1st Year',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b72cf3cc?w=150&h=150&fit=crop&crop=face',
    guardianName: 'Michael Davis',
    guardianPhone: '+1-234-567-8904',
    address: '456 Oak Ave, City, State 12345'
  },
  {
    id: '3',
    name: 'David Wilson',
    email: 'david@student.com',
    phone: '+1-234-567-8905',
    roomNumber: 'B201',
    admissionDate: '2024-02-01',
    course: 'Engineering',
    year: '3rd Year',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    guardianName: 'Sarah Wilson',
    guardianPhone: '+1-234-567-8906',
    address: '789 Pine St, City, State 12345'
  },
  {
    id: '4',
    name: 'Sophie Brown',
    email: 'sophie@student.com',
    phone: '+1-234-567-8907',
    roomNumber: 'B202',
    admissionDate: '2024-01-10',
    course: 'Medicine',
    year: '4th Year',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    guardianName: 'James Brown',
    guardianPhone: '+1-234-567-8908',
    address: '321 Elm Dr, City, State 12345'
  },
  {
    id: '5',
    name: 'Chris Taylor',
    email: 'chris@student.com',
    phone: '+1-234-567-8909',
    roomNumber: 'C301',
    admissionDate: '2023-12-15',
    course: 'Arts',
    year: '2nd Year',
    status: 'Inactive',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    guardianName: 'Linda Taylor',
    guardianPhone: '+1-234-567-8910',
    address: '654 Maple Rd, City, State 12345'
  }
];

export const mockRooms: Room[] = [
  {
    id: '1',
    number: 'A101',
    type: 'Double',
    capacity: 2,
    occupied: 1,
    floor: 1,
    rent: 5000,
    status: 'Occupied',
    amenities: ['AC', 'WiFi', 'Attached Bathroom', 'Study Table'],
    students: ['1']
  },
  {
    id: '2',
    number: 'A102',
    type: 'Single',
    capacity: 1,
    occupied: 1,
    floor: 1,
    rent: 7000,
    status: 'Occupied',
    amenities: ['AC', 'WiFi', 'Attached Bathroom', 'Study Table', 'Wardrobe'],
    students: ['2']
  },
  {
    id: '3',
    number: 'B201',
    type: 'Double',
    capacity: 2,
    occupied: 1,
    floor: 2,
    rent: 5000,
    status: 'Occupied',
    amenities: ['AC', 'WiFi', 'Shared Bathroom', 'Study Table'],
    students: ['3']
  },
  {
    id: '4',
    number: 'B202',
    type: 'Triple',
    capacity: 3,
    occupied: 1,
    floor: 2,
    rent: 4000,
    status: 'Occupied',
    amenities: ['Fan', 'WiFi', 'Shared Bathroom', 'Study Table'],
    students: ['4']
  },
  {
    id: '5',
    number: 'C301',
    type: 'Single',
    capacity: 1,
    occupied: 0,
    floor: 3,
    rent: 7000,
    status: 'Available',
    amenities: ['AC', 'WiFi', 'Attached Bathroom', 'Study Table', 'Wardrobe'],
    students: []
  },
  {
    id: '6',
    number: 'C302',
    type: 'Quad',
    capacity: 4,
    occupied: 0,
    floor: 3,
    rent: 3500,
    status: 'Maintenance',
    amenities: ['Fan', 'WiFi', 'Shared Bathroom', 'Study Table'],
    students: []
  }
];

export const mockFees: Fee[] = [
  {
    id: '1',
    studentId: '1',
    studentName: 'Alex Johnson',
    amount: 5000,
    type: 'Room Rent',
    dueDate: '2024-03-01',
    status: 'Paid',
    paidDate: '2024-02-28',
    description: 'Monthly room rent for March 2024'
  },
  {
    id: '2',
    studentId: '2',
    studentName: 'Emily Davis',
    amount: 3000,
    type: 'Mess Fee',
    dueDate: '2024-03-01',
    status: 'Pending',
    description: 'Monthly mess fee for March 2024'
  },
  {
    id: '3',
    studentId: '3',
    studentName: 'David Wilson',
    amount: 7000,
    type: 'Room Rent',
    dueDate: '2024-02-15',
    status: 'Overdue',
    description: 'Monthly room rent for February 2024'
  },
  {
    id: '4',
    studentId: '4',
    studentName: 'Sophie Brown',
    amount: 10000,
    type: 'Security Deposit',
    dueDate: '2024-01-15',
    status: 'Paid',
    paidDate: '2024-01-10',
    description: 'One-time security deposit'
  },
  {
    id: '5',
    studentId: '1',
    studentName: 'Alex Johnson',
    amount: 3000,
    type: 'Mess Fee',
    dueDate: '2024-03-01',
    status: 'Paid',
    paidDate: '2024-03-01',
    description: 'Monthly mess fee for March 2024'
  }
];

export const mockComplaints: Complaint[] = [
  {
    id: '1',
    studentId: '1',
    studentName: 'Alex Johnson',
    title: 'AC Not Working',
    description: 'The air conditioning in room A101 has not been working for the past 3 days. It gets very hot during the afternoon.',
    category: 'Maintenance',
    priority: 'High',
    status: 'In Progress',
    createdAt: '2024-02-20',
    assignedTo: 'Maintenance Team'
  },
  {
    id: '2',
    studentId: '2',
    studentName: 'Emily Davis',
    title: 'Poor Food Quality',
    description: 'The food served in the mess has been consistently poor in quality. Many students have complained about stomach issues.',
    category: 'Food',
    priority: 'Medium',
    status: 'Open',
    createdAt: '2024-02-22'
  },
  {
    id: '3',
    studentId: '3',
    studentName: 'David Wilson',
    title: 'Bathroom Cleaning Issue',
    description: 'The shared bathroom on the 2nd floor is not being cleaned regularly. It needs immediate attention.',
    category: 'Cleanliness',
    priority: 'High',
    status: 'Resolved',
    createdAt: '2024-02-18',
    resolvedAt: '2024-02-25',
    assignedTo: 'Housekeeping'
  },
  {
    id: '4',
    studentId: '4',
    studentName: 'Sophie Brown',
    title: 'Loud Music at Night',
    description: 'Students in the adjacent room play loud music late at night, disturbing sleep and study time.',
    category: 'Noise',
    priority: 'Medium',
    status: 'Open',
    createdAt: '2024-02-24'
  },
  {
    id: '5',
    studentId: '1',
    studentName: 'Alex Johnson',
    title: 'WiFi Connection Issues',
    description: 'WiFi connection keeps dropping frequently, affecting online classes and assignments.',
    category: 'Other',
    priority: 'Critical',
    status: 'In Progress',
    createdAt: '2024-02-25',
    assignedTo: 'IT Support'
  }
];

export const mockLeaveRequests: LeaveRequest[] = [
  {
    id: '1',
    studentId: '1',
    studentName: 'Alex Johnson',
    fromDate: '2024-03-15',
    toDate: '2024-03-20',
    reason: 'Family wedding ceremony',
    status: 'Approved',
    requestDate: '2024-02-28',
    approvedBy: 'HostelAdmin',
    approvedDate: '2024-03-01',
    remarks: 'Approved. Please submit return confirmation.'
  },
  {
    id: '2',
    studentId: '2',
    studentName: 'Emily Davis',
    fromDate: '2024-03-10',
    toDate: '2024-03-12',
    reason: 'Medical emergency at home',
    status: 'Pending',
    requestDate: '2024-03-01'
  },
  {
    id: '3',
    studentId: '3',
    studentName: 'David Wilson',
    fromDate: '2024-02-20',
    toDate: '2024-02-25',
    reason: 'Job interview',
    status: 'Rejected',
    requestDate: '2024-02-15',
    approvedBy: 'HostelAdmin',
    approvedDate: '2024-02-16',
    remarks: 'Need more details about interview. Please reapply with documentation.'
  },
  {
    id: '4',
    studentId: '4',
    studentName: 'Sophie Brown',
    fromDate: '2024-03-25',
    toDate: '2024-03-30',
    reason: 'Conference presentation',
    status: 'Approved',
    requestDate: '2024-03-01',
    approvedBy: 'HostelAdmin',
    approvedDate: '2024-03-02',
    remarks: 'Approved for academic conference.'
  }
];

export const mockVisitorLogs: VisitorLog[] = [
  {
    id: '1',
    visitorName: 'Robert Johnson',
    visitorPhone: '+1-234-567-8902',
    studentId: '1',
    studentName: 'Alex Johnson',
    purpose: 'Parent visit',
    checkInTime: '2024-02-25T14:30:00',
    checkOutTime: '2024-02-25T18:00:00',
    status: 'Checked Out',
    approvedBy: 'Receptionist'
  },
  {
    id: '2',
    visitorName: 'Sarah Miller',
    visitorPhone: '+1-234-567-8915',
    studentId: '2',
    studentName: 'Emily Davis',
    purpose: 'Friend visit',
    checkInTime: '2024-02-26T16:00:00',
    status: 'Checked In',
    approvedBy: 'Receptionist'
  },
  {
    id: '3',
    visitorName: 'Dr. Michael Smith',
    visitorPhone: '+1-234-567-8920',
    studentId: '3',
    studentName: 'David Wilson',
    purpose: 'Academic consultation',
    checkInTime: '2024-02-24T10:00:00',
    checkOutTime: '2024-02-24T12:30:00',
    status: 'Checked Out',
    approvedBy: 'Receptionist'
  },
  {
    id: '4',
    visitorName: 'Lisa Brown',
    visitorPhone: '+1-234-567-8925',
    studentId: '4',
    studentName: 'Sophie Brown',
    purpose: 'Sister visit',
    checkInTime: '2024-02-27T12:00:00',
    status: 'Checked In',
    approvedBy: 'Receptionist'
  }
];