import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { Layout } from "./components/layout/Layout";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Students } from "./pages/Students";
import { Rooms } from "./pages/Rooms";
import { Fees } from "./pages/Fees";
import { Complaints } from "./pages/Complaints";
import { LeaveRequests } from "./pages/LeaveRequests";
import { VisitorLogs } from "./pages/VisitorLogs";
import { RoleSettings } from "./pages/RoleSettings";
import { Analytics } from "./pages/Analytics";
import { Maintenance } from "./pages/Maintenance";
import { Notifications } from "./pages/Notifications";
import { Backup } from "./pages/Backup";
import { MyProfile } from "./pages/MyProfile";
import { MyRoom } from "./pages/MyRoom";
import { Unauthorized } from "./pages/Unauthorized";
import { MessMenu } from "./pages/MessMenu";
import { Laundry } from "./pages/Laundry";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route
                path="dashboard"
                element={
                  <ProtectedRoute permission="dashboard">
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="students"
                element={
                  <ProtectedRoute permission="students">
                    <Students />
                  </ProtectedRoute>
                }
              />

              <Route
                path="rooms"
                element={
                  <ProtectedRoute permission="rooms">
                    <Rooms />
                  </ProtectedRoute>
                }
              />

              <Route
                path="fees"
                element={
                  <ProtectedRoute permission="fees">
                    <Fees />
                  </ProtectedRoute>
                }
              />

              <Route
                path="complaints"
                element={
                  <ProtectedRoute permission="complaints">
                    <Complaints />
                  </ProtectedRoute>
                }
              />

              <Route
                path="leave-requests"
                element={
                  <ProtectedRoute permission="leave-requests">
                    <LeaveRequests />
                  </ProtectedRoute>
                }
              />

              <Route
                path="visitor-logs"
                element={
                  <ProtectedRoute permission="visitor-logs">
                    <VisitorLogs />
                  </ProtectedRoute>
                }
              />

              <Route
                path="role-settings"
                element={
                  <ProtectedRoute permission="role-settings">
                    <RoleSettings />
                  </ProtectedRoute>
                }
              />

              {/* SuperAdmin specific routes */}
              <Route
                path="analytics"
                element={
                  <ProtectedRoute permission="analytics">
                    <Analytics />
                  </ProtectedRoute>
                }
              />

              <Route
                path="maintenance"
                element={
                  <ProtectedRoute permission="maintenance">
                    <Maintenance />
                  </ProtectedRoute>
                }
              />

              <Route
                path="notifications"
                element={
                  <ProtectedRoute permission="notifications">
                    <Notifications />
                  </ProtectedRoute>
                }
              />

              <Route
                path="backup"
                element={
                  <ProtectedRoute permission="backup">
                    <Backup />
                  </ProtectedRoute>
                }
              />

              {/* Student specific routes */}
              <Route
                path="my-profile"
                element={
                  <ProtectedRoute permission="my-profile">
                    <MyProfile />
                  </ProtectedRoute>
                }
              />

              <Route
                path="my-room"
                element={
                  <ProtectedRoute permission="my-room">
                    <MyRoom />
                  </ProtectedRoute>
                }
              />

              <Route
                path="my-fees"
                element={
                  <ProtectedRoute permission="my-fees">
                    <Fees />
                  </ProtectedRoute>
                }
              />

              <Route
                path="my-complaints"
                element={
                  <ProtectedRoute permission="my-complaints">
                    <Complaints />
                  </ProtectedRoute>
                }
              />

              <Route
                path="my-leave-requests"
                element={
                  <ProtectedRoute permission="my-leave-requests">
                    <LeaveRequests />
                  </ProtectedRoute>
                }
              />

              <Route
                path="announcements"
                element={
                  <ProtectedRoute permission="announcements">
                    <Notifications />
                  </ProtectedRoute>
                }
              />

              <Route
                path="mess-menu"
                element={
                  <ProtectedRoute permission="mess-menu">
                    <MessMenu />
                  </ProtectedRoute>
                }
              />

              <Route
                path="laundry"
                element={
                  <ProtectedRoute permission="laundry">
                    <Laundry />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
