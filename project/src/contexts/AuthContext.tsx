import React, { createContext, useContext, useState, useEffect } from "react";
import { User, AuthContextType } from "../types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Dummy users for demonstration
const dummyUsers: User[] = [
  {
    id: "1",
    email: "superadmin@hostel.com",
    name: "John Doe",
    role: "SuperAdmin",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    email: "admin@hostel.com",
    name: "Jane Smith",
    role: "HostelAdmin",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b72cf3cc?w=150&h=150&fit=crop&crop=face",
    createdAt: "2024-01-20",
  },
  {
    id: "3",
    email: "student@hostel.com",
    name: "Mike Johnson",
    role: "Student",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    createdAt: "2024-02-01",
  },
  {
    id: "4",
    email: "receptionist@hostel.com",
    name: "Sarah Wilson",
    role: "Receptionist",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    createdAt: "2024-01-25",
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth data
    const storedUser = localStorage.getItem("hostel_user");
    const storedToken = localStorage.getItem("hostel_token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const foundUser = dummyUsers.find((u) => u.email === email);

    if (foundUser && password === "password") {
      // Generate fake JWT token
      const token = btoa(
        JSON.stringify({
          userId: foundUser.id,
          role: foundUser.role,
          exp: Date.now() + 24 * 60 * 60 * 1000,
        })
      );
      localStorage.setItem("hostel_user", JSON.stringify(foundUser));
      localStorage.setItem("hostel_token", token);
      setUser(foundUser);
      setIsLoading(false);
      // No reload, let UI handle navigation and loader
      return true;
    }

    setIsLoading(false);
    return false;
  };

  const logout = () => {
    localStorage.removeItem("hostel_user");
    localStorage.removeItem("hostel_token");
    setUser(null);
    setIsLoading(false);
    // No reload, let UI handle navigation and loader
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
