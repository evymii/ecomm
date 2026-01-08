"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ProfileSidebar from "../components/ProfileSidebar";
import { useFavorites } from "../contexts/FavoritesContext";
import ProductCard from "../components/ProductCard";

export default function FavoritesPage() {
  const router = useRouter();
  const { favorites } = useFavorites();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      if (!token && !user) {
        router.push("/hereglegch/home");
      }
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-[#F3F4F4] text-black">
      <div className="flex">
        <ProfileSidebar />
        <div className="flex-1 p-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-black">Зүрхэлсэн</h1>
              <p className="mt-2 text-black/70">
                Таны дуртай бараанууд ({favorites.length})
              </p>
            </div>

            {favorites.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {favorites.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            ) : (
              <div className="rounded-lg bg-white p-12 text-center shadow-sm border border-black/10">
                <div className="mx-auto h-16 w-16 rounded-full bg-[#E0E0E0] flex items-center justify-center mb-4">
                  <svg
                    className="h-8 w-8 text-black/50"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-black">Зүрхэлсэн бараа байхгүй</h2>
                <p className="mt-2 text-black/60">
                  Бараа дээрх зүрхэн дээр дараад дуртай бараануудаа хадгална уу
                </p>
                <a
                  href="/hereglegch/products"
                  className="mt-6 inline-block rounded-lg bg-black px-6 py-3 text-white transition-all duration-500 ease-out hover:bg-black/80"
                >
                  Бараа үзэх
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

