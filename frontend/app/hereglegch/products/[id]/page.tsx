"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useCart } from "../../contexts/CartContext";
import { Plus, Minus, ShoppingCart, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
  description?: string;
  category?: string;
}

export default function ProductDetailPage() {
  const params = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const productId = params.id as string;
        
        // TODO: Replace with actual API endpoint when backend is ready
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
        const response = await fetch(
          `${apiUrl}/products/${productId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        ).catch(() => null);

        if (response && response.ok) {
          const data = await response.json();
          setProduct(data.product || data);
        } else {
          // Mock data for development - matching home page products
          const mockProducts: Product[] = [
            {
              id: "1",
              name: "Шинэ бараа 1",
              price: 50000,
            },
            {
              id: "2",
              name: "Шинэ бараа 2",
              price: 75000,
            },
            {
              id: "3",
              name: "Шинэ бараа 3",
              price: 60000,
            },
            {
              id: "4",
              name: "Шинэ бараа 4",
              price: 80000,
            },
            {
              id: "5",
              name: "Шинэ бараа 5",
              price: 55000,
            },
            {
              id: "6",
              name: "Шинэ бараа 6",
              price: 65000,
            },
            {
              id: "7",
              name: "Хямдарсан бараа 1",
              price: 40000,
            },
            {
              id: "8",
              name: "Хямдарсан бараа 2",
              price: 55000,
            },
            {
              id: "9",
              name: "Хямдарсан бараа 3",
              price: 45000,
            },
            {
              id: "10",
              name: "Хямдарсан бараа 4",
              price: 70000,
            },
            {
              id: "11",
              name: "Хямдарсан бараа 5",
              price: 35000,
            },
            {
              id: "12",
              name: "Хямдарсан бараа 6",
              price: 60000,
            },
          ];

          const foundProduct = mockProducts.find((p) => p.id === productId);
          if (foundProduct) {
            setProduct(foundProduct);
          } else {
            // Default product if not found
            setProduct({
              id: productId,
              name: "Бараа",
              price: 100000,
            });
          }
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity,
        image: product.image,
        description: product.description,
      });
      setQuantity(1); // Reset quantity after adding
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center py-12">
          <p className="text-black/50">Уншиж байна...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center py-12">
          <p className="text-black/50 mb-4">Бараа олдсонгүй</p>
          <Link
            href="/hereglegch/home"
            className="inline-flex items-center gap-2 text-black/70 hover:text-black transition-all duration-500 ease-out"
          >
            <ArrowLeft className="h-4 w-4" />
            Буцах
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/hereglegch/home"
        className="inline-flex items-center gap-2 text-black/70 hover:text-black mb-6 transition-all duration-500 ease-out"
      >
        <ArrowLeft className="h-5 w-5" />
        Буцах
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image Placeholder */}
        <div className="aspect-square overflow-hidden rounded-lg bg-[#F3F4F4] border border-black/40">
          <div className="h-full w-full bg-[#F3F4F4]"></div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold text-black mb-4">
            {product.name}
          </h1>

          <p className="text-3xl font-bold text-black mb-6">
            ₮{product.price.toLocaleString()}
          </p>

          {/* Quantity Controls */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-black/70 mb-2">
              Тоо ширхэг
            </label>
            <div className="flex items-stretch gap-0 border border-black/50 rounded-lg w-fit overflow-hidden">
              <button
                onClick={handleDecrease}
                className="p-3 hover:bg-[#E0E0E0] transition-all duration-500 ease-out border-r border-black/50"
                aria-label="Decrease quantity"
              >
                <Minus className="h-5 w-5" />
              </button>
              <span className="px-6 py-3 min-w-[4rem] text-center font-medium text-lg bg-[#F3F4F4] border-r border-black/50">
                {quantity}
              </span>
              <button
                onClick={handleIncrease}
                className="p-3 hover:bg-[#E0E0E0] transition-all duration-500 ease-out"
                aria-label="Increase quantity"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center gap-2 bg-black text-white py-4 px-6 rounded-lg hover:bg-black/80 transition-all duration-500 ease-out font-medium text-lg"
          >
            <ShoppingCart className="h-5 w-5" />
            Сагсанд нэмэх
          </button>

          {/* Total Price */}
          <div className="mt-6 p-4 bg-[#F3F4F4] rounded-lg border border-black/40">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium text-black/70">
                Нийт дүн:
              </span>
              <span className="text-2xl font-bold text-black">
                ₮{(product.price * quantity).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

