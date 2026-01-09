"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X, User, Package, Heart, LogOut } from "lucide-react";
import { useFavorites } from "../contexts/FavoritesContext";
import ProductCard from "./ProductCard";

interface ProfileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

type MenuSection = "profile" | "orders" | "favorites";

export default function ProfileMenu({ isOpen, onClose }: ProfileMenuProps) {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<MenuSection | null>(null);
  const [user, setUser] = useState<any>(null);
  const { favorites } = useFavorites();

  useEffect(() => {
    const loadUser = () => {
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
    };

    loadUser();
    // Reload user data when modal opens
    if (isOpen) {
      loadUser();
    }
  }, [isOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isGuest");
    localStorage.removeItem("favorites");
    // Dispatch custom event to notify context
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("logout"));
    }
    onClose();
    window.location.reload();
  };

  const menuItems = [
    {
      id: "profile" as MenuSection,
      title: "Профайл",
      icon: <User className="h-5 w-5 text-black" />,
      description: "Овог нэр, утас болон хүргэлтийн хаяг солих",
    },
    {
      id: "orders" as MenuSection,
      title: "Захиалгын түүх",
      icon: <Package className="h-5 w-5 text-black" />,
      description: "Захиалгын түүх харах, захиалгаа хянах",
    },
    {
      id: "favorites" as MenuSection,
      title: "Зүрхэлсэн",
      icon: <Heart className="h-5 w-5 text-black" />,
      description: "Таны дуртай бараанууд",
    },
  ];

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 transition-opacity duration-500 ease-out"
          onClick={onClose}
        />
      )}

      {/* Modal */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-[#F3F4F4] shadow-xl z-50 transform transition-transform duration-500 ease-in-out border-l border-black/40 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-black/40 bg-white/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center">
                <User className="h-6 w-6 text-black/70" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-black">
                  {user?.name || "Хэрэглэгч"}
                </h2>
                {user?.email && (
                  <p className="text-sm text-black/60">{user.email}</p>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[#E0E0E0] rounded-lg transition-all duration-500 ease-out"
              aria-label="Close modal"
            >
              <X className="h-6 w-6 text-black" />
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="flex flex-col gap-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onClose();
                    if (item.id === "profile") {
                      router.push("/hereglegch/profile");
                    } else if (item.id === "orders") {
                      router.push("/hereglegch/orders");
                    } else if (item.id === "favorites") {
                      router.push("/hereglegch/favorites");
                    } else {
                      setActiveSection(item.id);
                    }
                  }}
                  className={`flex items-start gap-4 p-4 rounded-lg transition-all duration-500 ease-out text-left ${
                    activeSection === item.id && item.id !== "profile"
                      ? "bg-[#E0E0E0] border border-black/20"
                      : "bg-white hover:bg-[#F3F4F4] border border-black/10"
                  }`}
                >
                  <div className="flex-shrink-0 mt-0.5">{item.icon}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-black mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-black/60">{item.description}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Content Section */}
            <div className="mt-6">
              {activeSection === "orders" && (
                <div className="bg-white p-6 rounded-lg border border-black/10">
                  <h3 className="text-lg font-bold text-black mb-4">
                    Захиалгын түүх
                  </h3>
                  <div className="space-y-4">
                    {/* Example order - replace with actual data from API */}
                    <div className="border border-black/20 rounded-lg p-4 hover:bg-[#F3F4F4] transition-all duration-500 ease-out">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-semibold text-black">Захиалга #12345</p>
                          <p className="text-sm text-black/60">2024-01-15</p>
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                          Дууссан
                        </span>
                      </div>
                      <div className="mt-3 pt-3 border-t border-black/10">
                        <p className="text-sm text-black/70">Нийт: ₮150,000</p>
                        <button className="mt-2 text-sm text-black/70 hover:text-black underline">
                          Дэлгэрэнгүй харах
                        </button>
                      </div>
                    </div>
                    <p className="text-black/60 text-center py-4 text-sm">
                      Бүх захиалгаа харахын тулд захиалгын хуудас руу очно уу
                    </p>
                    <button
                      onClick={() => {
                        onClose();
                        router.push("/hereglegch/orders");
                      }}
                      className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-black/80 transition-all duration-500 ease-out font-medium"
                    >
                      Бүх захиалга харах
                    </button>
                  </div>
                </div>
              )}

              {activeSection === "favorites" && (
                <div className="bg-white p-6 rounded-lg border border-black/10">
                  <h3 className="text-lg font-bold text-black mb-4">
                    Зүрхэлсэн ({favorites.length})
                  </h3>
                  {favorites.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {favorites.map((product) => (
                        <ProductCard key={product.id} {...product} />
                      ))}
                    </div>
                  ) : (
                    <p className="text-black/60 text-center py-8">
                      Зүрхэлсэн бараа байхгүй байна
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Footer - Logout Button */}
          <div className="border-t border-black/40 p-4 bg-white/50">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-all duration-500 ease-out font-medium"
            >
              <LogOut className="h-5 w-5" />
              Системээс гарах
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

