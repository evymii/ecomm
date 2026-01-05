"use client";

import { useState, useRef, useEffect } from "react";

type OrderStatus = "Дууссан" | "Хүлээгдэж буй" | "Цуцлагдсан" | "-";

interface OrderItem {
  name: string;
  quantity: number;
  image?: string;
}

interface OrderRow {
  id: number;
  status: OrderStatus;
  items?: OrderItem[];
}

export default function AdminOrders() {
  const [startDate, setStartDate] = useState<string>("2025-06-13");
  const [endDate, setEndDate] = useState<string>("2026-07-01");
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set([1]));
  const [showStatusDropdown, setShowStatusDropdown] = useState<boolean>(false);
  const [openItemsDropdown, setOpenItemsDropdown] = useState<number | null>(
    null
  );
  const dropdownRef = useRef<HTMLDivElement>(null);
  const itemsDropdownRef = useRef<HTMLDivElement>(null);

  const [orders, setOrders] = useState<OrderRow[]>([
    {
      id: 1,
      status: "Дууссан",
      items: [
        {
          name: "Sunshine Stackers",
          quantity: 2,
          image:
            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&h=100&fit=crop",
        },
        {
          name: "Бараа 2",
          quantity: 1,
          image:
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=100&h=100&fit=crop",
        },
        {
          name: "Бараа 3",
          quantity: 2,
          image:
            "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=100&h=100&fit=crop",
        },
      ],
    },
    { id: 2, status: "Хүлээгдэж буй", items: [] },
    { id: 3, status: "Цуцлагдсан", items: [] },
    { id: 4, status: "-", items: [] },
    { id: 5, status: "-", items: [] },
    { id: 6, status: "-", items: [] },
    { id: 7, status: "-", items: [] },
    { id: 8, status: "-", items: [] },
  ]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(new Set(orders.map((order) => order.id)));
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleRowSelect = (id: number, checked: boolean) => {
    const newSelected = new Set(selectedRows);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedRows(newSelected);
  };

  const handleStatusChange = (newStatus: OrderStatus) => {
    const updatedOrders = orders.map((order) =>
      selectedRows.has(order.id) ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    setShowStatusDropdown(false);
  };

  const getStatusStyle = (status: OrderStatus) => {
    switch (status) {
      case "Дууссан":
        return "bg-[#FFDBB6] text-[#5D688A]";
      case "Хүлээгдэж буй":
        return "bg-[#F7F7F7] text-[#45474B]";
      case "Цуцлагдсан":
        return "bg-[#F7A5A5] text-white";
      default:
        return "bg-[#F7F7F7] text-[#45474B]";
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowStatusDropdown(false);
      }
      if (
        itemsDropdownRef.current &&
        !itemsDropdownRef.current.contains(event.target as Node)
      ) {
        setOpenItemsDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="px-4 py-6 sm:px-0">
      {/* Header */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#5D688A]">Захиалга</h1>
          <p className="mt-1 text-sm text-gray-600">12 зүйлс</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 rounded-lg border border-[#4A4947]/20 bg-white px-4 py-2 text-sm">
            <label htmlFor="start-date" className="sr-only">
              Эхлэх огноо
            </label>
            <input
              id="start-date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-32 rounded border border-[#4A4947]/20 px-2 py-1 text-xs text-gray-700 focus:border-[#5D688A] focus:outline-none focus:ring-1 focus:ring-[#5D688A]/50"
            />
            <span className="text-gray-400">-</span>
            <label htmlFor="end-date" className="sr-only">
              Дуусах огноо
            </label>
            <input
              id="end-date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-32 rounded border border-[#4A4947]/20 px-2 py-1 text-xs text-gray-700 focus:border-[#5D688A] focus:outline-none focus:ring-1 focus:ring-[#5D688A]/50"
            />
          </div>
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setShowStatusDropdown(!showStatusDropdown)}
              disabled={selectedRows.size === 0}
              className="inline-flex items-center rounded-lg border border-[#4A4947]/20 bg-[#5D688A] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#5D688A]/90 focus:outline-none focus:ring-2 focus:ring-[#5D688A]/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Төлөв өөрчлөх
              <svg
                className="ml-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {showStatusDropdown && (
              <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-lg border border-[#4A4947]/20 bg-white shadow-lg">
                <div className="py-1">
                  <button
                    type="button"
                    onClick={() => handleStatusChange("Дууссан")}
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-[#FFF2EF]"
                  >
                    Дууссан
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStatusChange("Хүлээгдэж буй")}
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-[#FFF2EF]"
                  >
                    Хүлээгдэж буй
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStatusChange("Цуцлагдсан")}
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-[#FFF2EF]"
                  >
                    Цуцлагдсан
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-[#4A4947]/20 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#4A4947]/10">
            <thead className="bg-[#F7F7F7]">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={
                      selectedRows.size > 0 &&
                      selectedRows.size === orders.length
                    }
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="h-4 w-4 rounded border-[#4A4947]/30 text-[#5D688A] focus:ring-[#5D688A]/50"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                  №
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                  Худалдан авагч
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                  Авсан зүйлс (ширхэг)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                  Огноо
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                  Нийт
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                  Хүргэх хаяг
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                  Төлөв
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#4A4947]/10 bg-white">
              {orders.map((order, index) => {
                const isFirstRow = index === 0;
                return (
                  <tr key={order.id} className="hover:bg-[#FFF2EF]">
                    <td className="whitespace-nowrap px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedRows.has(order.id)}
                        onChange={(e) =>
                          handleRowSelect(order.id, e.target.checked)
                        }
                        className="h-4 w-4 rounded border-[#4A4947]/30 text-[#5D688A] focus:ring-[#5D688A]/50"
                      />
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                      {isFirstRow ? "1" : "-"}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                      {isFirstRow ? "mio1@gmail.com" : "-"}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                      {order.items && order.items.length > 0 ? (
                        <div className="relative" ref={itemsDropdownRef}>
                          <button
                            type="button"
                            onClick={() =>
                              setOpenItemsDropdown(
                                openItemsDropdown === order.id ? null : order.id
                              )
                            }
                            className="flex items-center gap-2 rounded bg-white px-2 py-1 text-xs hover:bg-[#FFF2EF] focus:outline-none focus:ring-1 focus:ring-[#5D688A]/50"
                          >
                            <span>
                              {order.items.reduce(
                                (sum, item) => sum + item.quantity,
                                0
                              )}{" "}
                              ширхэг
                            </span>
                            <svg
                              className={`h-3 w-3 text-gray-400 transition-transform ${
                                openItemsDropdown === order.id
                                  ? "rotate-180"
                                  : ""
                              }`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </button>
                          {openItemsDropdown === order.id && (
                            <div className="absolute left-0 z-10 mt-1 max-h-64 w-80 origin-top-left overflow-y-auto rounded-lg border border-[#4A4947]/20 bg-white shadow-lg">
                              <div className="py-2">
                                {order.items.map((item, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-center gap-3 px-4 py-3 hover:bg-[#FFF2EF]"
                                  >
                                    {item.image ? (
                                      <img
                                        src={item.image}
                                        alt={item.name}
                                        className="h-12 w-12 shrink-0 rounded object-cover"
                                      />
                                    ) : (
                                      <div className="h-12 w-12 shrink-0 rounded bg-[#F7F7F7] flex items-center justify-center">
                                        <svg
                                          className="h-6 w-6 text-gray-400"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                          />
                                        </svg>
                                      </div>
                                    )}
                                    <div className="flex flex-1 items-center justify-between gap-2 min-w-0">
                                      <span className="truncate text-sm font-medium text-gray-900">
                                        {item.name}
                                      </span>
                                      <span className="shrink-0 text-sm text-gray-700">
                                        {item.quantity}ш
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      -
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-[#5D688A]">
                      {isFirstRow ? "707'000₮" : "-"}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      -
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`mx-auto inline-flex w-24 justify-center rounded-full px-2 py-1 text-xs font-medium ${getStatusStyle(order.status)}`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
