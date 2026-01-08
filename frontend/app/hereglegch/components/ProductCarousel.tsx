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
  itemsPerSlide,
  icon,
}: ProductCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [cardWidth, setCardWidth] = useState(0);
  const [responsiveItemsPerSlide, setResponsiveItemsPerSlide] = useState(4);

  // Create infinite loop by duplicating products (3 sets for smooth looping)
  const duplicatedProducts = [...products, ...products, ...products];

  // Calculate responsive items per slide and card width
  useEffect(() => {
    const updateResponsiveSettings = () => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const containerWidth = container.offsetWidth;
        
        // Determine items per slide based on screen size
        let itemsToShow = itemsPerSlide || 4;
        if (!itemsPerSlide) {
          if (containerWidth < 640) {
            // Mobile: 1 item
            itemsToShow = 1;
          } else if (containerWidth < 768) {
            // Small tablets: 2 items
            itemsToShow = 2;
          } else if (containerWidth < 1024) {
            // Tablets: 3 items
            itemsToShow = 3;
          } else {
            // Desktop: 4 items
            itemsToShow = 4;
          }
        }
        
        setResponsiveItemsPerSlide(itemsToShow);
        
        // Calculate card width
        const gap = containerWidth < 640 ? 16 : 24; // Smaller gap on mobile
        const width = (containerWidth - (itemsToShow - 1) * gap) / itemsToShow;
        setCardWidth(width);
      }
    };

    updateResponsiveSettings();
    const timeoutId = setTimeout(updateResponsiveSettings, 100);
    window.addEventListener("resize", updateResponsiveSettings);
    return () => {
      window.removeEventListener("resize", updateResponsiveSettings);
      clearTimeout(timeoutId);
    };
  }, [itemsPerSlide, products.length]);

  // Get responsive gap based on screen size
  const getGap = () => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 640 ? 16 : 24;
    }
    return 24;
  };

  // Initialize scroll position to middle set
  useEffect(() => {
    if (scrollContainerRef.current && products.length > 0 && cardWidth > 0) {
      const gap = getGap();
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
    const gap = getGap();
    const singleSetWidth = products.length * (cardWidth + gap);
    const scrollLeft = container.scrollLeft;

    // If scrolled past the second set, jump back to middle
    if (scrollLeft >= singleSetWidth * 2 - 50) {
      container.scrollLeft = singleSetWidth;
    }
    // If scrolled before the first set, jump to middle
    else if (scrollLeft < singleSetWidth - 50) {
      container.scrollLeft = singleSetWidth;
    }
  };

  // Auto-scroll for circular motion
  useEffect(() => {
    if (!isAutoScrolling || products.length === 0 || cardWidth === 0) return;

    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const gap = getGap();
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
    const gap = getGap();
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
    const gap = getGap();
    const scrollAmount = cardWidth + gap;
    
    container.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
    
    setTimeout(() => setIsAutoScrolling(true), 5000);
  };

  if (products.length === 0) {
    return (
      <div className="mb-8 sm:mb-12">
        <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
          <div className="flex items-center gap-2">
            {icon && <span className="text-xl sm:text-2xl">{icon}</span>}
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-black">{title}</h2>
          </div>
          <Link
            href={viewMoreLink}
            className="inline-flex items-center text-xs sm:text-sm font-medium text-black/70 hover:text-black transition-all duration-500 ease-out whitespace-nowrap"
          >
            Цааш үзэх →
          </Link>
        </div>
        <div className="text-center py-6 sm:py-8 text-sm sm:text-base text-black/50">
          Бараа олдсонгүй
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8 sm:mb-12">
      <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
        <div className="flex items-center gap-2">
          {icon && <span className="text-xl sm:text-2xl">{icon}</span>}
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-black">{title}</h2>
        </div>
        <Link
          href={viewMoreLink}
          className="inline-flex items-center text-xs sm:text-sm font-medium text-black/70 hover:text-black transition-all duration-500 ease-out whitespace-nowrap"
        >
          Цааш үзэх →
        </Link>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Left Navigation Button */}
        {products.length > responsiveItemsPerSlide && (
          <button
            onClick={handlePrev}
            className="absolute left-0 sm:left-1 top-1/2 -translate-y-1/2 z-10 bg-[#F3F4F4]/95 hover:bg-[#E0E0E0] border border-black/40 shadow-lg rounded-full p-1.5 sm:p-2 transition-all duration-500 ease-out hover:scale-110"
            aria-label="Previous products"
          >
            <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6 text-black" />
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
          <div 
            className="flex gap-4 sm:gap-6" 
            style={{ width: "max-content" }}
          >
            {duplicatedProducts.map((product, index) => (
              <div
                key={`${product.id}-${index}`}
                className="flex-shrink-0"
                style={{ width: cardWidth > 0 ? `${cardWidth}px` : "280px" }}
              >
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        </div>

        {/* Right Navigation Button */}
        {products.length > responsiveItemsPerSlide && (
          <button
            onClick={handleNext}
            className="absolute right-0 sm:right-1 top-1/2 -translate-y-1/2 z-10 bg-[#F3F4F4]/95 hover:bg-[#E0E0E0] border border-black/40 shadow-lg rounded-full p-1.5 sm:p-2 transition-all duration-500 ease-out hover:scale-110"
            aria-label="Next products"
          >
            <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6 text-black" />
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

