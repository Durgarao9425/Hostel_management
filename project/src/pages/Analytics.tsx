import React from 'react';
import { BarChart3, TrendingUp, Users, Home, CreditCard, AlertTriangle, Calendar, UserCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

export const Analytics: React.FC = () => {
  const analyticsData = {
    occupancyRate: 85,
    revenueGrowth: 12.5,
    studentSatisfaction: 4.2,
    complaintResolutionRate: 92,
    monthlyRevenue: 450000,
    totalStudents: 180,
    availableRooms: 25,
    pendingComplaints: 8
  };

  const monthlyData = [
    { month: 'Jan', revenue: 420000, students: 165, complaints: 12 },
    { month: 'Feb', revenue: 435000, students: 172, complaints: 8 },
    { month: 'Mar', revenue: 450000, students: 180, complaints: 6 },
    { month: 'Apr', revenue: 465000, students: 185, complaints: 4 },
    { month: 'May', revenue: 480000, students: 190, complaints: 7 },
    { month: 'Jun', revenue: 495000, students: 195, complaints: 5 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Comprehensive insights and performance metrics
          </p>
        </div>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <Badge variant="success">Real-time Data</Badge>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Occupancy Rate</p>
                <p className="text-3xl font-bold">{analyticsData.occupancyRate}%</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span className="text-sm">+5% from last month</span>
                </div>
              </div>
              <Home className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Revenue Growth</p>
                <p className="text-3xl font-bold">{analyticsData.revenueGrowth}%</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span className="text-sm">₹{analyticsData.monthlyRevenue.toLocaleString()}</span>
                </div>
              </div>
              <CreditCard className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Student Satisfaction</p>
                <p className="text-3xl font-bold">{analyticsData.studentSatisfaction}/5</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span className="text-sm">+0.3 from last quarter</span>
                </div>
              </div>
              <Users className="w-8 h-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">Resolution Rate</p>
                <p className="text-3xl font-bold">{analyticsData.complaintResolutionRate}%</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span className="text-sm">Complaints resolved</span>
                </div>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Monthly Revenue Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyData.map((data, index) => (
                <div key={data.month} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-blue-600">{data.month}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        ₹{data.revenue.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {data.students} students
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={data.complaints <= 5 ? 'success' : data.complaints <= 10 ? 'warning' : 'danger'}>
                      {data.complaints} complaints
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Indicators</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Room Occupancy</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{analyticsData.occupancyRate}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${analyticsData.occupancyRate}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Complaint Resolution</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{analyticsData.complaintResolutionRate}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${analyticsData.complaintResolutionRate}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Student Satisfaction</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{(analyticsData.studentSatisfaction / 5 * 100).toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${analyticsData.studentSatisfaction / 5 * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <Calendar className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Avg Stay</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">2.3 years</p>
                </div>
                <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <UserCheck className="w-6 h-6 text-green-600 mx-auto mb-1" />
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Retention</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">94%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};