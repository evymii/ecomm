"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingCart, User } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import CartSidebar from "./CartSidebar";
import ProfileModal from "./ProfileModal";
import ProfileMenu from "./ProfileMenu";

export default function Header() {
  const pathname = usePathname();
  const { getTotalItems } = useCart();
  const cartItemCount = getTotalItems();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      setIsLoggedIn(!!(token || user));
    }
  }, []);

  // Listen for storage changes (when user logs in/out)
  useEffect(() => {
    const handleStorageChange = () => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");
        setIsLoggedIn(!!(token || user));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    // Also check on focus in case of same-tab logout
    window.addEventListener("focus", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("focus", handleStorageChange);
    };
  }, []);

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <header className="border-b border-black/40 bg-[#F3F4F4] shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between relative">
          {/* Logo on the left */}
          <div className="flex items-center">
            <Link href="/hereglegch/home" className="flex items-center group">
              <span className="text-2xl font-bold text-black transition-all duration-500 ease-out group-hover:opacity-80">
                AzSouviner
              </span>
            </Link>
          </div>

          {/* Navigation links in the middle */}
          <nav className="flex items-center space-x-8">
            <Link
              href="/hereglegch/home"
              className={`group relative inline-flex items-center px-1 text-sm font-medium transition-all duration-500 ease-out ${
                isActive("/hereglegch/home")
                  ? "text-black"
                  : "text-black/70 hover:text-black"
              }`}
            >
              <span className="relative z-10">Нүүр</span>
              <span
                className="absolute -bottom-px left-0 h-0.5 w-0 bg-black transition-all duration-500 ease-out group-hover:w-full"
              />
            </Link>
            <Link
              href="/hereglegch/products"
              className={`group relative inline-flex items-center px-1 text-sm font-medium transition-all duration-500 ease-out ${
                isActive("/hereglegch/products")
                  ? "text-black"
                  : "text-black/70 hover:text-black"
              }`}
            >
              <span className="relative z-10">Бараа</span>
              <span
                className="absolute -bottom-px left-0 h-0.5 w-0 bg-black transition-all duration-500 ease-out group-hover:w-full"
              />
            </Link>
          </nav>

          {/* Icons on the right */}
          <div className="flex items-center gap-4">
            <Link
              href="/hereglegch/search"
              className="p-2 text-black/70 transition-all duration-500 ease-out hover:text-black hover:bg-[#E0E0E0] rounded-lg"
              aria-label="Search"
            >
              <Search className="h-6 w-6" />
            </Link>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-black/70 transition-all duration-500 ease-out hover:text-black hover:bg-[#E8E8D3]/50 rounded-lg"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount > 99 ? "99+" : cartItemCount}
                </span>
              )}
            </button>
            <button
              onClick={() => {
                // Check login status when clicking profile icon
                if (typeof window !== "undefined") {
                  const token = localStorage.getItem("token");
                  const user = localStorage.getItem("user");
                  setIsLoggedIn(!!(token || user));
                }
                setIsProfileOpen(true);
              }}
              className="p-2 text-black/70 transition-all duration-500 ease-out hover:text-black hover:bg-[#E0E0E0] rounded-lg"
              aria-label="User Profile"
            >
              <User className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      {isLoggedIn ? (
        <ProfileMenu isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
      ) : (
        <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
      )}
    </header>
  );
}

