import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Edit, Camera, Save, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { useAuth } from '../contexts/AuthContext';

export const MyProfile: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Alex Johnson',
    email: 'alex@student.com',
    phone: '+1-234-567-8901',
    roomNumber: 'A101',
    course: 'Computer Science',
    year: '2nd Year',
    admissionDate: '2024-01-15',
    address: '123 Main St, City, State 12345',
    guardianName: 'Robert Johnson',
    guardianPhone: '+1-234-567-8902',
    emergencyContact: '+1-234-567-8903',
    bloodGroup: 'O+',
    dateOfBirth: '2002-05-15',
    nationality: 'Indian',
    studentId: 'STU2024001'
  });

  const handleSave = () => {
    // Save profile data
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset changes
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Profile</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your personal information and account settings
          </p>
        </div>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          {isEditing ? (
            <>
              <Button variant="secondary" onClick={handleCancel}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture and Basic Info */}
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="relative inline-block">
                <img
                  src={user?.avatar || `https://ui-avatars.com/api/?name=${profileData.name}&background=3B82F6&color=fff&size=128`}
                  alt={profileData.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4"
                />
                {isEditing && (
                  <button className="absolute bottom-2 right-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                )}
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{profileData.name}</h2>
              <p className="text-gray-600 dark:text-gray-400">{profileData.course}</p>
              <div className="flex justify-center space-x-2 mt-3">
                <Badge variant="info">{profileData.year}</Badge>
                <Badge variant="success">Active</Badge>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <User className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600 dark:text-gray-400">Student ID:</span>
                <span className="font-medium text-gray-900 dark:text-white">{profileData.studentId}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600 dark:text-gray-400">Admission:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {new Date(profileData.admissionDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600 dark:text-gray-400">Room:</span>
                <span className="font-medium text-gray-900 dark:text-white">{profileData.roomNumber}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                {isEditing ? (
                  <Input
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                  />
                ) : (
                  <p className="text-gray-900 dark:text-white">{profileData.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                {isEditing ? (
                  <Input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    icon={<Mail className="w-4 h-4" />}
                  />
                ) : (
                  <p className="text-gray-900 dark:text-white">{profileData.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number
                </label>
                {isEditing ? (
                  <Input
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    icon={<Phone className="w-4 h-4" />}
                  />
                ) : (
                  <p className="text-gray-900 dark:text-white">{profileData.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Date of Birth
                </label>
                {isEditing ? (
                  <Input
                    type="date"
                    value={profileData.dateOfBirth}
                    onChange={(e) => setProfileData({...profileData, dateOfBirth: e.target.value})}
                  />
                ) : (
                  <p className="text-gray-900 dark:text-white">
                    {new Date(profileData.dateOfBirth).toLocaleDateString()}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Blood Group
                </label>
                {isEditing ? (
                  <select
                    value={profileData.bloodGroup}
                    onChange={(e) => setProfileData({...profileData, bloodGroup: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                ) : (
                  <p className="text-gray-900 dark:text-white">{profileData.bloodGroup}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nationality
                </label>
                {isEditing ? (
                  <Input
                    value={profileData.nationality}
                    onChange={(e) => setProfileData({...profileData, nationality: e.target.value})}
                  />
                ) : (
                  <p className="text-gray-900 dark:text-white">{profileData.nationality}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Address
                </label>
                {isEditing ? (
                  <Input
                    value={profileData.address}
                    onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                    icon={<MapPin className="w-4 h-4" />}
                  />
                ) : (
                  <p className="text-gray-900 dark:text-white">{profileData.address}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Academic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Academic Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Course
                </label>
                {isEditing ? (
                  <Input
                    value={profileData.course}
                    onChange={(e) => setProfileData({...profileData, course: e.target.value})}
                  />
                ) : (
                  <p className="text-gray-900 dark:text-white">{profileData.course}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Year
                </label>
                {isEditing ? (
                  <select
                    value={profileData.year}
                    onChange={(e) => setProfileData({...profileData, year: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                ) : (
                  <p className="text-gray-900 dark:text-white">{profileData.year}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Room Number
                </label>
                <p className="text-gray-900 dark:text-white">{profileData.roomNumber}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Contact admin to change room
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contacts */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Emergency Contacts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Guardian Name
                </label>
                {isEditing ? (
                  <Input
                    value={profileData.guardianName}
                    onChange={(e) => setProfileData({...profileData, guardianName: e.target.value})}
                  />
                ) : (
                  <p className="text-gray-900 dark:text-white">{profileData.guardianName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Guardian Phone
                </label>
                {isEditing ? (
                  <Input
                    value={profileData.guardianPhone}
                    onChange={(e) => setProfileData({...profileData, guardianPhone: e.target.value})}
                    icon={<Phone className="w-4 h-4" />}
                  />
                ) : (
                  <p className="text-gray-900 dark:text-white">{profileData.guardianPhone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Emergency Contact
                </label>
                {isEditing ? (
                  <Input
                    value={profileData.emergencyContact}
                    onChange={(e) => setProfileData({...profileData, emergencyContact: e.target.value})}
                    icon={<Phone className="w-4 h-4" />}
                  />
                ) : (
                  <p className="text-gray-900 dark:text-white">{profileData.emergencyContact}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};