"use client";

import { useRouter, usePathname } from "next/navigation";
import { User, Package, Heart, Bell, LogOut } from "lucide-react";
import { useState, useEffect } from "react";

export default function ProfileSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          setUser(JSON.parse(userStr));
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isGuest");
    router.push("/hereglegch/home");
  };

  const menuItems = [
    {
      id: "profile",
      title: "Профайл",
      icon: <User className="h-5 w-5" />,
      path: "/hereglegch/profile",
    },
    {
      id: "orders",
      title: "Захиалгууд",
      icon: <Package className="h-5 w-5" />,
      path: "/hereglegch/orders",
    },
    {
      id: "favorites",
      title: "Зүрхэлсэн",
      icon: <Heart className="h-5 w-5" />,
      path: "/hereglegch/favorites",
    },
    {
      id: "notifications",
      title: "Мэдэгдэл",
      icon: <Bell className="h-5 w-5" />,
      path: "/hereglegch/notifications",
    },
  ];

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <div className="w-64 bg-white border-r border-black/20 min-h-screen p-6">
      <div className="flex flex-col items-center mb-8">
        <div className="w-20 h-20 rounded-full bg-[#E0E0E0] flex items-center justify-center mb-4">
          <User className="h-10 w-10 text-black/70" />
        </div>
        <h2 className="text-lg font-semibold text-black">
          {user?.name || "Зочин"}
        </h2>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => router.push(item.path)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-500 ease-out ${
              isActive(item.path)
                ? "bg-black text-white"
                : "text-black/70 hover:text-black hover:bg-[#F3F4F4]"
            }`}
          >
            {item.icon}
            {item.title}
          </button>
        ))}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-black/70 hover:text-black hover:bg-[#F3F4F4] rounded-lg transition-all duration-500 ease-out mt-8"
        >
          <LogOut className="h-5 w-5" />
          Системээс гарах
        </button>
      </nav>
    </div>
  );
}

