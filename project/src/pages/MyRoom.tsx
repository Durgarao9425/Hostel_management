import React from 'react';
import { Home, Users, Wifi, Thermometer, Lightbulb, Wrench, MessageSquare, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export const MyRoom: React.FC = () => {
  const roomData = {
    number: 'A101',
    type: 'Double',
    floor: 1,
    capacity: 2,
    occupied: 1,
    rent: 5000,
    amenities: ['AC', 'WiFi', 'Attached Bathroom', 'Study Table', 'Wardrobe'],
    roommate: null,
    lastCleaned: '2024-02-26',
    nextInspection: '2024-03-05',
    wifiPassword: 'HostelWiFi2024',
    electricityUnits: 45,
    waterPressure: 'Good',
    acTemperature: 22
  };

  const recentIssues = [
    {
      id: '1',
      title: 'AC not cooling properly',
      status: 'Resolved',
      date: '2024-02-20',
      type: 'Maintenance'
    },
    {
      id: '2',
      title: 'WiFi connectivity issues',
      status: 'In Progress',
      date: '2024-02-25',
      type: 'Technical'
    }
  ];

  const upcomingEvents = [
    {
      id: '1',
      title: 'Room Inspection',
      date: '2024-03-05',
      time: '10:00 AM',
      type: 'Inspection'
    },
    {
      id: '2',
      title: 'Deep Cleaning',
      date: '2024-03-10',
      time: '2:00 PM',
      type: 'Cleaning'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Room - {roomData.number}</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Room information, amenities, and maintenance
          </p>
        </div>
        <Button>
          <MessageSquare className="w-4 h-4 mr-2" />
          Report Issue
        </Button>
      </div>

      {/* Room Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Home className="w-5 h-5 mr-2" />
              Room Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Room Number</label>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{roomData.number}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Room Type</label>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{roomData.type}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Floor</label>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{roomData.floor}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Monthly Rent</label>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">₹{roomData.rent.toLocaleString()}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Occupancy</label>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {roomData.occupied}/{roomData.capacity}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Roommate</label>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {roomData.roommate || 'None'}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Cleaned</label>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {new Date(roomData.lastCleaned).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Next Inspection</label>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {new Date(roomData.nextInspection).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Room Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Thermometer className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">AC Temperature</span>
                </div>
                <span className="text-lg font-bold text-green-600">{roomData.acTemperature}°C</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Wifi className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">WiFi Status</span>
                </div>
                <Badge variant="success">Connected</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Lightbulb className="w-5 h-5 text-orange-600" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Electricity</span>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{roomData.electricityUnits} units</span>
              </div>

              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Wifi className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">WiFi Password</span>
                </div>
                <p className="text-sm font-mono bg-white dark:bg-gray-700 p-2 rounded border">
                  {roomData.wifiPassword}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Amenities */}
      <Card>
        <CardHeader>
          <CardTitle>Room Amenities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {roomData.amenities.map((amenity, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
              >
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{amenity}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Issues and Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Wrench className="w-5 h-5 mr-2" />
              Recent Issues
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentIssues.map((issue) => (
                <div
                  key={issue.id}
                  className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
                >
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{issue.title}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {issue.type} • {new Date(issue.date).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge variant={issue.status === 'Resolved' ? 'success' : 'warning'}>
                    {issue.status}
                  </Badge>
                </div>
              ))}
              {recentIssues.length === 0 && (
                <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                  No recent issues reported
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
                >
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{event.title}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(event.date).toLocaleDateString()} at {event.time}
                    </p>
                  </div>
                  <Badge variant="info">{event.type}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};