"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingCart, User } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import CartSidebar from "./CartSidebar";

export default function Header() {
  const pathname = usePathname();
  const { getTotalItems } = useCart();
  const cartItemCount = getTotalItems();
  const [isCartOpen, setIsCartOpen] = useState(false);

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
              className="p-2 text-gray-600 transition-all duration-300 ease-out hover:text-[#5D688A]/60"
              aria-label="Search"
            >
              <Search className="h-6 w-6 transition-all duration-300 hover:scale-110 hover:opacity-80" />
            </Link>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-gray-600 transition-all duration-300 ease-out hover:text-[#5D688A]/60"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="h-6 w-6 transition-all duration-300 hover:scale-110 hover:opacity-80" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount > 99 ? "99+" : cartItemCount}
                </span>
              )}
            </button>
            <Link
              href="/hereglegch/profile"
              className="p-2 text-gray-600 transition-all duration-300 ease-out hover:text-[#5D688A]/60"
              aria-label="User Profile"
            >
              <User className="h-6 w-6 transition-all duration-300 hover:scale-110 hover:opacity-80" />
            </Link>
          </div>
        </div>
      </div>
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
}

