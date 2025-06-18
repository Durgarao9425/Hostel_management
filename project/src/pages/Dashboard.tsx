import React from 'react';
import { Users, Home, CreditCard, MessageSquare, TrendingUp, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { mockStudents, mockRooms, mockFees, mockComplaints } from '../data/mockData';

export const Dashboard: React.FC = () => {
  const totalStudents = mockStudents.length;
  const activeStudents = mockStudents.filter(s => s.status === 'Active').length;
  const totalRooms = mockRooms.length;
  const occupiedRooms = mockRooms.filter(r => r.status === 'Occupied').length;
  const pendingFees = mockFees.filter(f => f.status === 'Pending').length;
  const overdueFeesAmount = mockFees
    .filter(f => f.status === 'Overdue')
    .reduce((total, f) => total + f.amount, 0);
  const openComplaints = mockComplaints.filter(c => c.status === 'Open').length;
  const recentComplaints = mockComplaints.slice(0, 5);

  const stats = [
    {
      title: 'Total Students',
      value: totalStudents,
      subtitle: `${activeStudents} Active`,
      icon: Users,
      color: 'blue',
      trend: '+12%'
    },
    {
      title: 'Room Occupancy',
      value: `${occupiedRooms}/${totalRooms}`,
      subtitle: `${Math.round((occupiedRooms / totalRooms) * 100)}% Occupied`,
      icon: Home,
      color: 'green',
      trend: '+5%'
    },
    {
      title: 'Pending Fees',
      value: pendingFees,
      subtitle: `₹${overdueFeesAmount.toLocaleString()} Overdue`,
      icon: CreditCard,
      color: 'orange',
      trend: '-8%'
    },
    {
      title: 'Open Complaints',
      value: openComplaints,
      subtitle: 'Need Attention',
      icon: MessageSquare,
      color: 'red',
      trend: '+3%'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600',
      green: 'from-green-500 to-green-600',
      orange: 'from-orange-500 to-orange-600',
      red: 'from-red-500 to-red-600'
    };
    return colors[color as keyof typeof colors];
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'danger';
      case 'High': return 'warning';
      case 'Medium': return 'info';
      case 'Low': return 'default';
      default: return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'danger';
      case 'In Progress': return 'warning';
      case 'Resolved': return 'success';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Overview of your hostel management system
          </p>
        </div>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <Badge variant="success">All Systems Operational</Badge>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} hover className="relative overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                      {stat.value}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {stat.subtitle}
                    </p>
                  </div>
                  <div className={`p-3 bg-gradient-to-r ${getColorClasses(stat.color)} rounded-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-green-600 ml-1">
                    {stat.trend}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                    vs last month
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Complaints */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 text-orange-500" />
              Recent Complaints
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentComplaints.map((complaint) => (
                <div key={complaint.id} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {complaint.title}
                      </p>
                      <Badge 
                        variant={getPriorityColor(complaint.priority)} 
                        size="sm"
                      >
                        {complaint.priority}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                      By {complaint.studentName} • {complaint.category}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge 
                        variant={getStatusColor(complaint.status)} 
                        size="sm"
                      >
                        {complaint.status}
                      </Badge>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(complaint.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 text-left">
                <Users className="w-6 h-6 mb-2" />
                <p className="font-medium">Add Student</p>
                <p className="text-xs opacity-90">Register new student</p>
              </button>
              <button className="p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 text-left">
                <Home className="w-6 h-6 mb-2" />
                <p className="font-medium">Manage Rooms</p>
                <p className="text-xs opacity-90">Allocate rooms</p>
              </button>
              <button className="p-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 text-left">
                <CreditCard className="w-6 h-6 mb-2" />
                <p className="font-medium">Collect Fees</p>
                <p className="text-xs opacity-90">Process payments</p>
              </button>
              <button className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 text-left">
                <MessageSquare className="w-6 h-6 mb-2" />
                <p className="font-medium">View Reports</p>
                <p className="text-xs opacity-90">Analytics & insights</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};