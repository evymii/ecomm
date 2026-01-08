"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../contexts/CartContext";
import { Plus, Minus, ShoppingCart } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image?: string;
  description?: string;
}

export default function ProductCard({
  id,
  name,
  price,
  image,
  description,
}: ProductCardProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuantity(quantity + 1);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      id,
      name,
      price,
      quantity,
      image,
      description,
    });
    setQuantity(1); // Reset quantity after adding
  };

  const handleCardClick = () => {
    router.push(`/hereglegch/products/${id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group cursor-pointer overflow-hidden rounded-lg bg-white shadow-sm border border-black/40 transition-all duration-500 ease-out hover:shadow-md hover:border-black/60"
    >
      {/* Image placeholder space */}
      <div className="relative aspect-h-1 aspect-w-1 w-full overflow-hidden bg-[#F3F4F4]">
        <div className="h-40 sm:h-52 lg:h-64 w-full bg-[#F3F4F4] group-hover:bg-[#E0E0E0] transition-colors duration-500"></div>
      </div>
      <div className="p-3 sm:p-4">
        <h3 className="text-base sm:text-lg font-medium text-black line-clamp-2 mb-2 text-center">
          {name}
        </h3>
        <p className="text-lg sm:text-xl font-semibold text-black mb-3 sm:mb-4 text-center">
          ₮{price.toLocaleString()}
        </p>

        {/* Quantity Controls */}
        <div className="flex items-center justify-center mb-2 sm:mb-3">
          <div className="flex items-stretch gap-0 border border-black/50 rounded-lg overflow-hidden">
            <button
              onClick={handleDecrease}
              className="p-1.5 sm:p-2 hover:bg-[#E0E0E0] transition-all duration-500 ease-out border-r border-black/50"
              aria-label="Decrease quantity"
            >
              <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
            </button>
            <span className="px-3 sm:px-4 py-1.5 sm:py-2 min-w-[2.5rem] sm:min-w-[3rem] text-sm sm:text-base text-center font-medium bg-[#F3F4F4] border-r border-black/50">
              {quantity}
            </span>
            <button
              onClick={handleIncrease}
              className="p-1.5 sm:p-2 hover:bg-[#E0E0E0] transition-all duration-500 ease-out"
              aria-label="Increase quantity"
            >
              <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
            </button>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="w-full flex items-center justify-center gap-2 bg-black text-white py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg hover:bg-black/80 transition-all duration-500 ease-out font-medium text-sm sm:text-base"
        >
          <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4" />
          Сагсанд нэмэх
        </button>
      </div>
    </div>
  );
}

