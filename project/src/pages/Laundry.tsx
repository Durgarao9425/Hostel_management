import React from "react";
import { Shirt } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { useAuth } from "../contexts/AuthContext";

export const Laundry: React.FC = () => {
  const { user } = useAuth();
  // Example laundry data
  const laundryStatus = [
    { date: "2025-06-15", status: "Collected", items: 8 },
    { date: "2025-06-10", status: "Delivered", items: 6 },
    { date: "2025-06-05", status: "Delivered", items: 7 },
  ];

  if (user?.role !== "Student") {
    return (
      <div className="p-8 text-center text-gray-500">
        Only students can view laundry status.
      </div>
    );
  }

  return (
    <div className="p-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shirt className="w-6 h-6 text-blue-500" /> Laundry Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Items</th>
              </tr>
            </thead>
            <tbody>
              {laundryStatus.map((item, idx) => (
                <tr key={idx}>
                  <td className="p-2 border font-semibold">{item.date}</td>
                  <td className="p-2 border">{item.status}</td>
                  <td className="p-2 border">{item.items}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Laundry;
