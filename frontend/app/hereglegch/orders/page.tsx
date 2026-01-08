"use client";

import { useEffect, useState } from "react";
import { Package, Calendar } from "lucide-react";

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  total: number;
  createdAt: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

      if (token) {
        const response = await fetch(`${apiUrl}/user/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setOrders(data.orders || []);
        }
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "Хүлээгдэж буй";
      case "processing":
        return "Боловсруулж байна";
      case "completed":
        return "Дууссан";
      case "cancelled":
        return "Цуцлагдсан";
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#5D688A] border-r-transparent"></div>
          <p className="text-gray-600">Ачааллаж байна...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Захиалга</h1>
          <p className="mt-2 text-gray-600">Таны захиалгын түүх</p>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-lg bg-white p-12 text-center shadow-sm">
            <Package className="mx-auto h-16 w-16 text-gray-400" />
            <h2 className="mt-4 text-xl font-semibold text-gray-900">Захиалга байхгүй</h2>
            <p className="mt-2 text-gray-600">Та одоогоор захиалга хийгээгүй байна</p>
            <a
              href="/hereglegch/products"
              className="mt-6 inline-block rounded-lg bg-[#5D688A] px-6 py-3 text-white transition-colors hover:bg-[#4a5670]"
            >
              Бараа үзэх
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="rounded-lg bg-white p-6 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Захиалга #{order.orderNumber}
                      </h3>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {getStatusText(order.status)}
                      </span>
                    </div>

                    <div className="mt-4 space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm text-gray-600">
                          <span>
                            {item.name} × {item.quantity}
                          </span>
                          <span>{(item.price * item.quantity).toLocaleString()}₮</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(order.createdAt).toLocaleDateString("mn-MN", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="ml-6 text-right">
                    <p className="text-2xl font-bold text-[#5D688A]">
                      {order.total.toLocaleString()}₮
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

