"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  icon?: React.ReactNode;
}

export default function ProductCarousel({
  title,
  products,
  viewMoreLink,
  itemsPerSlide = 4,
  icon,
}: ProductCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [cardWidth, setCardWidth] = useState(0);

  // Create infinite loop by duplicating products (3 sets for smooth looping)
  const duplicatedProducts = [...products, ...products, ...products];

  // Calculate card width based on container
  useEffect(() => {
    const updateCardWidth = () => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const gap = 24; // gap-6 = 1.5rem = 24px
        const width = (container.offsetWidth - (itemsPerSlide - 1) * gap) / itemsPerSlide;
        setCardWidth(width);
      }
    };

    updateCardWidth();
    const timeoutId = setTimeout(updateCardWidth, 100); // Delay to ensure container is rendered
    window.addEventListener("resize", updateCardWidth);
    return () => {
      window.removeEventListener("resize", updateCardWidth);
      clearTimeout(timeoutId);
    };
  }, [itemsPerSlide, products.length]);

  // Initialize scroll position to middle set
  useEffect(() => {
    if (scrollContainerRef.current && products.length > 0 && cardWidth > 0) {
      const gap = 24;
      const scrollPosition = products.length * (cardWidth + gap);
      // Use setTimeout to ensure DOM is ready
      setTimeout(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollLeft = scrollPosition;
        }
      }, 100);
    }
  }, [products.length, cardWidth]);

  // Handle scroll to create infinite loop
  const handleScroll = () => {
    if (!scrollContainerRef.current || !isAutoScrolling || cardWidth === 0) return;
    
    const container = scrollContainerRef.current;
    const gap = 24;
    const singleSetWidth = products.length * (cardWidth + gap);
    const scrollLeft = container.scrollLeft;

    // If scrolled past the second set, jump back to middle
    if (scrollLeft >= singleSetWidth * 2) {
      container.scrollLeft = singleSetWidth;
    }
    // If scrolled before the first set, jump to middle
    else if (scrollLeft < singleSetWidth - 10) {
      container.scrollLeft = singleSetWidth;
    }
  };

  // Auto-scroll for circular motion
  useEffect(() => {
    if (!isAutoScrolling || products.length === 0 || cardWidth === 0) return;

    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const gap = 24;
        const scrollAmount = cardWidth + gap;
        container.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    }, 3000); // Scroll every 3 seconds

    return () => clearInterval(interval);
  }, [products.length, cardWidth, isAutoScrolling]);

  const handlePrev = () => {
    if (!scrollContainerRef.current || cardWidth === 0) return;
    setIsAutoScrolling(false);
    
    const container = scrollContainerRef.current;
    const gap = 24;
    const scrollAmount = cardWidth + gap;
    
    container.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    });
    
    setTimeout(() => setIsAutoScrolling(true), 5000);
  };

  const handleNext = () => {
    if (!scrollContainerRef.current || cardWidth === 0) return;
    setIsAutoScrolling(false);
    
    const container = scrollContainerRef.current;
    const gap = 24;
    const scrollAmount = cardWidth + gap;
    
    container.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
    
    setTimeout(() => setIsAutoScrolling(true), 5000);
  };

  if (products.length === 0) {
    return (
      <div className="mb-12">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon && <span className="text-2xl">{icon}</span>}
            <h2 className="text-2xl font-bold text-black">{title}</h2>
          </div>
          <Link
            href={viewMoreLink}
            className="inline-flex items-center text-sm font-medium text-black/70 hover:text-black transition-all duration-500 ease-out whitespace-nowrap"
          >
            Цааш үзэх →
          </Link>
        </div>
        <div className="text-center py-8 text-black/50">
          Бараа олдсонгүй
        </div>
      </div>
    );
  }

  return (
    <div className="mb-12">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon && <span className="text-2xl">{icon}</span>}
          <h2 className="text-2xl font-bold text-black">{title}</h2>
        </div>
        <Link
          href={viewMoreLink}
          className="inline-flex items-center text-sm font-medium text-black/70 hover:text-black transition-all duration-500 ease-out whitespace-nowrap"
        >
          Цааш үзэх →
        </Link>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Left Navigation Button */}
        {products.length > itemsPerSlide && (
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#F3F4F4]/95 hover:bg-[#E0E0E0] border border-black/40 shadow-lg rounded-full p-2 transition-all duration-500 ease-out hover:scale-110"
            aria-label="Previous products"
          >
            <ChevronLeft className="h-6 w-6 text-black" />
          </button>
        )}

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="overflow-x-hidden scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <div className="flex gap-6" style={{ width: "max-content" }}>
            {duplicatedProducts.map((product, index) => (
              <div
                key={`${product.id}-${index}`}
                className="flex-shrink-0"
                style={{ width: cardWidth > 0 ? `${cardWidth}px` : "300px" }}
              >
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        </div>

        {/* Right Navigation Button */}
        {products.length > itemsPerSlide && (
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[#F3F4F4]/95 hover:bg-[#E0E0E0] border border-black/40 shadow-lg rounded-full p-2 transition-all duration-500 ease-out hover:scale-110"
            aria-label="Next products"
          >
            <ChevronRight className="h-6 w-6 text-black" />
          </button>
        )}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

