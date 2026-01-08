"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProfileSidebar from "../components/ProfileSidebar";
import { Bell } from "lucide-react";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  date: string;
  read: boolean;
}

export default function NotificationsPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      if (!token && !user) {
        router.push("/hereglegch/home");
      }
    }
  }, [router]);

  useEffect(() => {
    // TODO: Fetch notifications from API
    // For now, using mock data
    const mockNotifications: Notification[] = [
      {
        id: "1",
        title: "Захиалга хүлээн авлаа",
        message: "Таны захиалга амжилттай хүлээн авлаа. Бараа 2-3 хоногийн дотор хүргэгдэнэ.",
        type: "info",
        date: "2024-01-15T10:30:00",
        read: false,
      },
      {
        id: "2",
        title: "Захиалга илгээгдлээ",
        message: "Таны захиалга илгээгдлээ. Хяналтын дугаар: #12345",
        type: "success",
        date: "2024-01-14T14:20:00",
        read: false,
      },
      {
        id: "3",
        title: "Шинэ бараа нэмэгдлээ",
        message: "Таны дуртай ангилалд шинэ бараа нэмэгдлээ. Шалгаж үзээрэй!",
        type: "warning",
        date: "2024-01-13T09:15:00",
        read: true,
      },
      {
        id: "4",
        title: "Захиалга хүргэгдлээ",
        message: "Таны захиалга амжилттай хүргэгдлээ. Амтлаж үзээрэй!",
        type: "success",
        date: "2024-01-12T16:45:00",
        read: true,
      },
    ];
    setNotifications(mockNotifications);
    setLoading(false);
  }, []);

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "info":
        return "border-l-4 border-blue-500 bg-blue-50";
      case "success":
        return "border-l-4 border-green-500 bg-green-50";
      case "warning":
        return "border-l-4 border-yellow-500 bg-yellow-50";
      case "error":
        return "border-l-4 border-red-500 bg-red-50";
      default:
        return "border-l-4 border-gray-500 bg-gray-50";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("mn-MN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-[#F3F4F4] text-black">
      <div className="flex">
        <ProfileSidebar />
        <div className="flex-1 p-8">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-black">Мэдэгдэл</h1>
              <p className="mt-2 text-black/70">
                Бүх мэдэгдлийн түүх
              </p>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-black/50">Уншиж байна...</p>
              </div>
            ) : notifications.length > 0 ? (
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`rounded-r-lg p-4 ${getNotificationColor(
                      notification.type
                    )} ${!notification.read ? "font-semibold" : ""}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Bell className="h-4 w-4 text-black/70" />
                          <h3 className="text-base font-semibold text-black">
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                          )}
                        </div>
                        <p className="text-sm text-black/70 mb-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-black/50">
                          {formatDate(notification.date)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-lg bg-white p-12 text-center shadow-sm border border-black/10">
                <Bell className="mx-auto h-16 w-16 text-black/30" />
                <h2 className="mt-4 text-xl font-semibold text-black">
                  Мэдэгдэл байхгүй
                </h2>
                <p className="mt-2 text-black/60">
                  Одоогоор мэдэгдэл байхгүй байна
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

