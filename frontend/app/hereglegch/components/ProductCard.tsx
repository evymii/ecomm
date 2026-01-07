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
      className="group cursor-pointer overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:shadow-lg"
    >
      {/* Image placeholder space */}
      <div className="relative aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-100">
        <div className="h-64 w-full bg-gray-100"></div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900 line-clamp-2 mb-2">
          {name}
        </h3>
        <p className="text-xl font-semibold text-[#5D688A] mb-4">
          ₮{price.toLocaleString()}
        </p>

        {/* Quantity Controls */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 border border-gray-300 rounded-lg">
            <button
              onClick={handleDecrease}
              className="p-2 hover:bg-gray-100 transition-colors rounded-l-lg"
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="px-4 py-2 min-w-[3rem] text-center font-medium">
              {quantity}
            </span>
            <button
              onClick={handleIncrease}
              className="p-2 hover:bg-gray-100 transition-colors rounded-r-lg"
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="w-full flex items-center justify-center gap-2 bg-[#5D688A] text-white py-2 px-4 rounded-lg hover:bg-[#5D688A]/90 transition-colors font-medium"
        >
          <ShoppingCart className="h-4 w-4" />
          Сагсанд нэмэх
        </button>
      </div>
    </div>
  );
}

