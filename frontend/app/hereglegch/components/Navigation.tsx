"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path
      ? "border-b-2 border-[#5D688A] text-[#5D688A]"
      : "border-b-2 border-transparent text-gray-600 hover:border-[#5D688A]/30 hover:text-[#5D688A]";
  };

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-12 items-center justify-center space-x-8">
          <Link
            href="/hereglegch/home"
            className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors ${isActive(
              "/hereglegch/home"
            )}`}
          >
            Нүүр
          </Link>
          <Link
            href="/hereglegch/products"
            className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors ${isActive(
              "/hereglegch/products"
            )}`}
          >
            Бараа
          </Link>
        </div>
      </div>
    </nav>
  );
}

