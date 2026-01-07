"use client";

import { useCart } from "../contexts/CartContext";
import { Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    getTotalPrice,
    getTotalItems,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Сагс</h1>
        <div className="text-center py-16">
          <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Сагс хоосон байна
          </h2>
          <p className="text-gray-500 mb-6">
            Сагсанд бараа нэмэхгүй байна
          </p>
          <Link
            href="/hereglegch/home"
            className="inline-flex items-center px-6 py-3 bg-[#5D688A] text-white rounded-lg hover:bg-[#5D688A]/90 transition-colors font-medium"
          >
            Бараа үзэх
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Сагс</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-200">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                {/* Product Info */}
                <div className="flex-grow flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-xl font-bold text-[#5D688A]">
                      ₮{item.price.toLocaleString()}
                    </p>
                  </div>

                  {/* Quantity Controls - Centered */}
                  <div className="flex items-center gap-2 border border-gray-300 rounded-lg mx-4">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 hover:bg-gray-100 transition-colors rounded-l-lg"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-4 py-2 min-w-[3rem] text-center font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 hover:bg-gray-100 transition-colors rounded-r-lg"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    <p className="text-lg font-semibold text-gray-900">
                      Нийт: ₮{(item.price * item.quantity).toLocaleString()}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      aria-label="Remove from cart"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Захиалгын дүн
            </h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Барааны тоо:</span>
                <span className="font-medium">{getTotalItems()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Нийт дүн:</span>
                <span className="font-bold text-xl text-[#5D688A]">
                  ₮{getTotalPrice().toLocaleString()}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <button className="w-full bg-[#5D688A] text-white py-3 px-4 rounded-lg hover:bg-[#5D688A]/90 transition-colors font-medium">
                Захиалах
              </button>
              <Link
                href="/hereglegch/home"
                className="block w-full text-center border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Цааш үзэх
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

