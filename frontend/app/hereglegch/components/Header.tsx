"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingCart, User } from "lucide-react";
import LoginModal from "./LoginModal";

export default function Header() {
  const pathname = usePathname();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    checkAuthStatus();
    // Listen for storage changes (login/logout from other tabs)
    window.addEventListener("storage", checkAuthStatus);
    return () => window.removeEventListener("storage", checkAuthStatus);
  }, []);

  const checkAuthStatus = async () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
          const response = await fetch(`${apiUrl}/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            const user = data.user || data;
            setUserName(user.name || user.email || null);
            setIsLoggedIn(true);
          } else {
            localStorage.removeItem("token");
            setIsLoggedIn(false);
            setUserName(null);
          }
        } catch (error) {
          console.error("Error checking auth:", error);
          setIsLoggedIn(false);
          setUserName(null);
        }
      } else {
        setIsLoggedIn(false);
        setUserName(null);
      }
    }
  };

  const handleLoginSuccess = () => {
    checkAuthStatus();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserName(null);
    setIsLoginModalOpen(false);
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <header className="border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between relative">
          {/* Logo on the left */}
          <div className="flex items-center">
            <Link href="/hereglegch/home" className="flex items-center">
              <span className="text-2xl font-bold text-[#5D688A]">
                ECOMM
              </span>
            </Link>
          </div>

          {/* Navigation links in the middle */}
          <nav className="flex items-center space-x-8">
            <Link
              href="/hereglegch/home"
              className={`group relative inline-flex items-center px-1 text-sm font-medium transition-colors ${
                isActive("/hereglegch/home")
                  ? "text-[#5D688A]"
                  : "text-gray-600 hover:text-[#5D688A]"
              }`}
            >
              <span className="relative z-10">Нүүр</span>
              <span
                className="absolute -bottom-px left-0 h-0.5 w-0 bg-[#5D688A] transition-all duration-300 ease-out group-hover:w-full"
              />
            </Link>
            <Link
              href="/hereglegch/products"
              className={`group relative inline-flex items-center px-1 text-sm font-medium transition-colors ${
                isActive("/hereglegch/products")
                  ? "text-[#5D688A]"
                  : "text-gray-600 hover:text-[#5D688A]"
              }`}
            >
              <span className="relative z-10">Бараа</span>
              <span
                className="absolute -bottom-px left-0 h-0.5 w-0 bg-[#5D688A] transition-all duration-300 ease-out group-hover:w-full"
              />
            </Link>
          </nav>

          {/* Icons on the right */}
          <div className="flex items-center gap-4">
            <Link
              href="/hereglegch/search"
              className="group relative p-2 text-gray-600 transition-all duration-300 ease-out hover:text-[#5D688A]/60"
              aria-label="Search"
            >
              <Search className="h-6 w-6 transition-all duration-300 group-hover:scale-110 group-hover:opacity-80" />
              <span className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-xl transition-all duration-300 ease-out group-hover:opacity-100 group-hover:-translate-y-1 pointer-events-none z-[100]">
                Хайх
                <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
                  <span className="block h-2 w-2 rotate-45 bg-gray-900" />
                </span>
              </span>
            </Link>
            <Link
              href="/hereglegch/cart"
              className="group relative p-2 text-gray-600 transition-all duration-300 ease-out hover:text-[#5D688A]/60"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="h-6 w-6 transition-all duration-300 group-hover:scale-110 group-hover:opacity-80" />
              <span className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-xl transition-all duration-300 ease-out group-hover:opacity-100 group-hover:-translate-y-1 pointer-events-none z-[100]">
                Сагс
                <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
                  <span className="block h-2 w-2 rotate-45 bg-gray-900" />
                </span>
              </span>
            </Link>
            <div className="group relative">
              {isLoggedIn ? (
                <div className="relative">
                  <Link
                    href="/hereglegch/profile"
                    className="flex items-center space-x-2 p-2 text-gray-600 transition-all duration-300 ease-out hover:text-[#5D688A]/60"
                    aria-label="User Profile"
                  >
                    <User className="h-6 w-6 transition-all duration-300 group-hover:scale-110 group-hover:opacity-80" />
                    {userName && (
                      <span className="hidden text-sm sm:block">{userName}</span>
                    )}
                  </Link>
                  <span className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-xl transition-all duration-300 ease-out group-hover:opacity-100 group-hover:-translate-y-1 pointer-events-none z-[100]">
                    Профайл
                    <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
                      <span className="block h-2 w-2 rotate-45 bg-gray-900" />
                    </span>
                  </span>
                </div>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="p-2 text-gray-600 transition-all duration-300 ease-out hover:text-[#5D688A]/60"
                  aria-label="Нэвтрэх"
                >
                  <User className="h-6 w-6 transition-all duration-300 group-hover:scale-110 group-hover:opacity-80" />
                  <span className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-xl transition-all duration-300 ease-out group-hover:opacity-100 group-hover:-translate-y-1 pointer-events-none z-[100]">
                    Нэвтрэх
                    <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
                      <span className="block h-2 w-2 rotate-45 bg-gray-900" />
                    </span>
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </header>
  );
}

