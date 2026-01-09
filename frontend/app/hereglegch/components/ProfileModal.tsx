"use client";

import { useState } from "react";
import { X, User } from "lucide-react";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState<"email" | "password">("email");

  // Reset form when modal closes
  const handleClose = () => {
    setEmail("");
    setPassword("");
    setStep("email");
    setError("");
    setShowPassword(false);
    setLoading(false);
    onClose();
  };

  const handleContinue = async () => {
    if (step === "email") {
      if (!email || !email.includes("@")) {
        setError("Хүчинтэй имэйл оруулна уу");
        return;
      }
      setStep("password");
      setError("");
      return;
    }

    // Step 2: Login with email and password
    if (!password) {
      setError("Нууц үг оруулна уу");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        // Store token in localStorage
        localStorage.setItem("token", data.token);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
        }
        
        // Reset form and close modal
        setEmail("");
        setPassword("");
        setStep("email");
        setError("");
        handleClose();
        
        // Reload page to update user state
        window.location.reload();
      } else {
        setError(data.error || "Нэвтрэхэд алдаа гарлаа");
      }
    } catch (err) {
      setError("Холболтын алдаа. Дахин оролдоно уу.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookLogin = () => {
    // Facebook OAuth would need to be configured on the backend
    setError("Facebook нэвтрэх нь одоогоор идэвхжээгүй байна. Утасны дугаар эсвэл имэйлээр нэвтрэнэ үү.");
  };

  const handleGuestLogin = () => {
    // Create a guest session
    const guestUser = {
      id: `guest_${Date.now()}`,
      name: "Зочин",
      email: "",
      role: "GUEST",
    };
    
    localStorage.setItem("user", JSON.stringify(guestUser));
    localStorage.setItem("isGuest", "true");
    
    setEmail("");
    setPassword("");
    setStep("email");
    setError("");
    handleClose();
    
    // Reload page to update user state
    window.location.reload();
  };

  const handleBack = () => {
    setStep("email");
    setPassword("");
    setError("");
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 transition-opacity duration-500 ease-out"
          onClick={handleClose}
        />
      )}

      {/* Modal */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-[#F3F4F4] shadow-xl z-50 transform transition-transform duration-500 ease-in-out border-l border-black/40 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-black/40 bg-white/50">
            <h2 className="text-2xl font-bold text-black">Нэвтрэх</h2>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-[#E0E0E0] rounded-lg transition-all duration-500 ease-out"
              aria-label="Close modal"
            >
              <X className="h-6 w-6 text-black" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="flex flex-col gap-6">
              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Email Input */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-black">
                  Имэйл
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder=""
                  disabled={step === "password"}
                  className="w-full px-4 py-3 bg-white border border-black/20 rounded-lg text-black placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-black/30 focus:border-transparent transition-all duration-500 ease-out disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>

              {/* Password Input - Show when step is password */}
              {step === "password" && (
                <div className="flex flex-col gap-2">
                  <label htmlFor="password" className="text-sm font-medium text-black">
                    Нууц үг
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError("");
                      }}
                      placeholder=""
                      className="w-full px-4 py-3 bg-white border border-black/20 rounded-lg text-black placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-black/30 focus:border-transparent transition-all duration-500 ease-out"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleContinue();
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-black/50 hover:text-black"
                    >
                      {showPassword ? "Нуух" : "Харуулах"}
                    </button>
                  </div>
                  <button
                    onClick={handleBack}
                    className="text-sm text-black/70 hover:text-black self-start"
                  >
                    ← Буцах
                  </button>
                </div>
              )}

              {/* Continue Button */}
              <button
                onClick={handleContinue}
                disabled={loading || (step === "email" && !email)}
                className="w-full bg-white text-black py-3 px-4 rounded-lg hover:bg-white/90 transition-all duration-500 ease-out font-medium border border-black/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Түр хүлээнэ үү..." : step === "password" ? "Нэвтрэх" : "Үргэлжлүүлэх"}
              </button>

              {/* Divider */}
              <div className="flex items-center justify-center">
                <span className="text-black/70 text-sm">эсвэл</span>
              </div>

              {/* Facebook Login Button */}
              <button
                onClick={handleFacebookLogin}
                className="w-full bg-[#1877F2] text-white py-3 px-4 rounded-lg hover:bg-[#166FE5] transition-all duration-500 ease-out font-medium flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
                Facebook-ээр нэвтрэх
              </button>

              {/* Guest Login Button */}
              <button
                onClick={handleGuestLogin}
                className="w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-black/80 transition-all duration-500 ease-out font-medium flex items-center justify-center gap-2"
              >
                <User className="h-5 w-5" />
                Зочноор нэвтрэх
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-black/40 p-6 bg-white/50">
            <p className="text-xs text-black/70 text-center">
              Онлайн худалдааг хөгжүүлэгч{" "}
              <span className="text-purple-600">MIO</span> платформ.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

