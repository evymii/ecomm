"use client";

import { useCart } from "../contexts/CartContext";
import { Plus, Minus, X, ShoppingBag } from "lucide-react";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    getTotalPrice,
    getTotalItems,
    clearCart,
  } = useCart();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Таны сагс</h2>
            <div className="flex items-center gap-4">
              {cartItems.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
                >
                  <X className="h-4 w-4" />
                  Хоослох
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Close cart"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-8">
                <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Сагс хоосон байна
                </h3>
                <p className="text-sm text-gray-500 text-center">
                  Сагсанд бараа нэмэхгүй байна
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      {/* Product Image Placeholder */}
                      <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg"></div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 mb-1 truncate">
                          {item.name}
                        </h3>
                        <p className="text-sm font-semibold text-[#5D688A] mb-3">
                          ₮{item.price.toLocaleString()}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1 border border-gray-300 rounded-lg">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="p-1.5 hover:bg-gray-100 transition-colors rounded-l-lg"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="px-3 py-1.5 min-w-[2rem] text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="p-1.5 hover:bg-gray-100 transition-colors rounded-r-lg"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <p className="text-sm font-semibold text-gray-900">
                            ₮{(item.price * item.quantity).toLocaleString()}
                          </p>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="ml-auto p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                            aria-label="Remove from cart"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer - Order Summary */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-medium text-gray-900">
                  Захиалгын дүн
                </span>
                <span className="text-xl font-bold text-[#5D688A]">
                  ₮{getTotalPrice().toLocaleString()}
                </span>
              </div>
              <button
                onClick={() => {
                  // TODO: Handle checkout
                  console.log("Checkout");
                }}
                className="w-full bg-[#5D688A] text-white py-3 px-4 rounded-lg hover:bg-[#5D688A]/90 transition-colors font-medium"
              >
                Захиалах
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

