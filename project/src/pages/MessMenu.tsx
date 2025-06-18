import React from "react";
import { UtensilsCrossed } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { useAuth } from "../contexts/AuthContext";

export const MessMenu: React.FC = () => {
  const { user } = useAuth();
  // Example menu data
  const menu = [
    {
      day: "Monday",
      breakfast: "Idli & Sambar",
      lunch: "Rice, Dal, Paneer",
      dinner: "Chapati, Veg Curry",
    },
    {
      day: "Tuesday",
      breakfast: "Poha",
      lunch: "Rice, Rajma",
      dinner: "Paratha, Aloo Sabzi",
    },
    {
      day: "Wednesday",
      breakfast: "Upma",
      lunch: "Rice, Chole",
      dinner: "Dosa, Chutney",
    },
    {
      day: "Thursday",
      breakfast: "Bread Butter",
      lunch: "Rice, Sambar",
      dinner: "Chapati, Mixed Veg",
    },
    {
      day: "Friday",
      breakfast: "Aloo Paratha",
      lunch: "Rice, Dal Fry",
      dinner: "Pulao, Raita",
    },
    {
      day: "Saturday",
      breakfast: "Puri Bhaji",
      lunch: "Rice, Kadhi",
      dinner: "Chapati, Paneer",
    },
    {
      day: "Sunday",
      breakfast: "Chole Bhature",
      lunch: "Biryani",
      dinner: "Dosa, Sambar",
    },
  ];

  if (user?.role !== "Student") {
    return (
      <div className="p-8 text-center text-gray-500">
        Only students can view the mess menu.
      </div>
    );
  }

  return (
    <div className="p-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UtensilsCrossed className="w-6 h-6 text-blue-500" /> Mess Menu
          </CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="p-2 border">Day</th>
                <th className="p-2 border">Breakfast</th>
                <th className="p-2 border">Lunch</th>
                <th className="p-2 border">Dinner</th>
              </tr>
            </thead>
            <tbody>
              {menu.map((item) => (
                <tr key={item.day}>
                  <td className="p-2 border font-semibold">{item.day}</td>
                  <td className="p-2 border">{item.breakfast}</td>
                  <td className="p-2 border">{item.lunch}</td>
                  <td className="p-2 border">{item.dinner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default MessMenu;
