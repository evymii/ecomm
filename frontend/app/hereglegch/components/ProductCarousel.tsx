"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";

interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
  description?: string;
}

interface ProductCarouselProps {
  title: string;
  products: Product[];
  viewMoreLink: string;
  itemsPerSlide?: number;
}

export default function ProductCarousel({
  title,
  products,
  viewMoreLink,
  itemsPerSlide = 4,
}: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Calculate how many slides we need
  const totalSlides = Math.ceil(products.length / itemsPerSlide);
  
  // Get products for current slide
  const getCurrentSlideProducts = () => {
    const start = currentIndex * itemsPerSlide;
    return products.slice(start, start + itemsPerSlide);
  };

  // Auto-rotate carousel
  useEffect(() => {
    if (totalSlides <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [totalSlides]);

  if (products.length === 0) {
    return (
      <div className="mb-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <Link
            href={viewMoreLink}
            className="inline-flex items-center text-sm font-medium text-[#5D688A] hover:text-[#5D688A]/80 transition-colors whitespace-nowrap"
          >
            Дэлгэрэнгүй үзэх →
          </Link>
        </div>
        <div className="text-center py-8 text-gray-500">
          Бараа олдсонгүй
        </div>
      </div>
    );
  }

  return (
    <div className="mb-12">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <Link
          href={viewMoreLink}
          className="inline-flex items-center text-sm font-medium text-[#5D688A] hover:text-[#5D688A]/80 transition-colors whitespace-nowrap"
        >
          Дэлгэрэнгүй үзэх →
        </Link>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {Array.from({ length: totalSlides }).map((_, slideIndex) => {
              const slideProducts = products.slice(
                slideIndex * itemsPerSlide,
                slideIndex * itemsPerSlide + itemsPerSlide
              );
              return (
                <div
                  key={slideIndex}
                  className="min-w-full grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
                >
                  {slideProducts.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        {/* Indicator Dots */}
        {totalSlides > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 bg-[#5D688A]"
                    : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

