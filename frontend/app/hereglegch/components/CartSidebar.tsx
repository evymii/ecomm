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
          className="fixed inset-0 bg-black/40 z-40 transition-opacity duration-500 ease-out"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-[#F3F4F4] shadow-xl z-50 transform transition-transform duration-500 ease-in-out border-l border-black/40 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-black/40 bg-white/50">
            <h2 className="text-xl font-bold text-black">Таны сагс</h2>
            <div className="flex items-center gap-4">
              {cartItems.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-sm text-black/70 hover:text-black flex items-center gap-1 transition-all duration-500 ease-out"
                >
                  <X className="h-4 w-4" />
                  Хоослох
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 hover:bg-[#E0E0E0] rounded-lg transition-all duration-500 ease-out"
                aria-label="Close cart"
              >
                <X className="h-5 w-5 text-black" />
              </button>
            </div>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto min-h-0">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-8">
                <ShoppingBag className="h-16 w-16 text-black/30 mb-4" />
                <h3 className="text-lg font-semibold text-black/70 mb-2">
                  Сагс хоосон байна
                </h3>
                <p className="text-sm text-black/50 text-center">
                  Сагсанд бараа нэмэхгүй байна
                </p>
              </div>
            ) : (
              <div className="divide-y divide-black/40">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 hover:bg-[#E0E0E0] transition-all duration-500 ease-out"
                  >
                    <div className="flex items-start gap-4">
                      {/* Product Image Placeholder */}
                      <div className="flex-shrink-0 w-20 h-20 bg-[#E0E0E0] rounded-lg"></div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-black mb-1 truncate">
                          {item.name}
                        </h3>
                        <p className="text-sm font-semibold text-black mb-3">
                          ₮{item.price.toLocaleString()}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-center gap-4">
                          <div className="flex items-stretch gap-0 border border-black/50 rounded-lg overflow-hidden">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="p-1.5 hover:bg-[#E0E0E0] transition-all duration-500 ease-out border-r border-black/50"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="px-3 py-1.5 min-w-[2rem] text-center text-sm font-medium bg-[#F3F4F4] border-r border-black/50">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="p-1.5 hover:bg-[#E0E0E0] transition-all duration-500 ease-out"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <p className="text-sm font-semibold text-black">
                            ₮{(item.price * item.quantity).toLocaleString()}
                          </p>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="ml-auto p-1.5 text-black/40 hover:text-black transition-all duration-500 ease-out"
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
            <div className="border-t border-black/40 p-6 bg-white/50">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-medium text-black">
                  Захиалгын дүн
                </span>
                <span className="text-xl font-bold text-black">
                  ₮{getTotalPrice().toLocaleString()}
                </span>
              </div>
              <button
                onClick={() => {
                  // TODO: Handle checkout
                  console.log("Checkout");
                }}
                className="w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-black/80 transition-all duration-500 ease-out font-medium"
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

