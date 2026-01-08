"use client";

import { useState, useEffect } from "react";
import { X, Mail, User, Facebook } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export default function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"email" | "password">("email");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleEmailContinue = async () => {
    if (!email.trim()) {
      setError("Имэйл оруулна уу");
      return;
    }

    // If on email step, move to password step
    if (step === "email") {
      setStep("password");
      setError(null);
      return;
    }

    // If on password step, proceed with login/signup
    if (!password) {
      setError("Нууц үг оруулна уу");
      return;
    }

    if (isSignUp && !name) {
      setError("Нэр оруулна уу");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      
      if (isSignUp) {
        // Register
        const response = await fetch(`${apiUrl}/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            password: password,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("token", data.token);
          onLoginSuccess();
          handleClose();
        } else {
          const errorData = await response.json().catch(() => ({ error: "Бүртгэл амжилтгүй" }));
          setError(errorData.error || "Бүртгэл амжилтгүй");
        }
      } else {
        // Login
        const response = await fetch(`${apiUrl}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            password: password,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("token", data.token);
          onLoginSuccess();
          handleClose();
        } else {
          const errorData = await response.json().catch(() => ({ error: "Нэвтрэх амжилтгүй" }));
          setError(errorData.error || "Имэйл эсвэл нууц үг буруу байна");
        }
      }
    } catch (error) {
      console.error("Auth error:", error);
      setError("Алдаа гарлаа. Дахин оролдоно уу.");
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = () => {
    // Guest login - you can implement this based on your backend
    // For now, just close the modal
    onClose();
  };

  const handleFacebookLogin = () => {
    // Facebook login - implement based on your backend
    setError("Facebook нэвтрэх одоогоор боломжгүй");
  };

  const handleClose = () => {
    setEmail("");
    setPassword("");
    setName("");
    setError(null);
    setIsSignUp(false);
    setStep("email");
    onClose();
  };

  const handleBack = () => {
    setStep("email");
    setError(null);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-gray-900 text-white z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-700 px-6 py-4">
            <h2 className="text-xl font-semibold">
              {isSignUp ? "Бүртгүүлэх" : "Нэвтрэх"}
            </h2>
            <button
              onClick={handleClose}
              className="rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
              aria-label="Хаах"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {error && (
              <div className="mb-4 rounded-lg bg-red-900/30 border border-red-700 p-3 text-sm text-red-200">
                {error}
              </div>
            )}

            <div className="space-y-4">
              {step === "email" ? (
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-300">
                    Имэйл
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-lg border border-gray-700 bg-gray-800 py-3 pl-10 pr-4 text-white placeholder-gray-400 focus:border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-600"
                      placeholder="имэйл@жишээ.com"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleEmailContinue();
                      }}
                    />
                  </div>
                </div>
              ) : (
                <>
                  {isSignUp && (
                    <div>
                      <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-300">
                        Нэр
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full rounded-lg border border-gray-700 bg-gray-800 py-3 pl-10 pr-4 text-white placeholder-gray-400 focus:border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-600"
                          placeholder="Таны нэр"
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleEmailContinue();
                          }}
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-300">
                      Нууц үг
                    </label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-lg border border-gray-700 bg-gray-800 py-3 px-4 text-white placeholder-gray-400 focus:border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-600"
                      placeholder="Нууц үг"
                      autoFocus={!isSignUp}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleEmailContinue();
                      }}
                    />
                  </div>
                </>
              )}

              <button
                onClick={handleEmailContinue}
                disabled={loading}
                className="w-full rounded-lg bg-white py-3 px-4 font-medium text-gray-900 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Түр хүлээнэ үү..." : "Үргэлжлүүлэх"}
              </button>

              {step === "password" && (
                <button
                  onClick={handleBack}
                  className="w-full text-sm text-gray-400 hover:text-white transition-colors"
                >
                  ← Буцах
                </button>
              )}
            </div>

            {/* Separator */}
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-gray-700"></div>
              <span className="px-4 text-sm text-gray-400">эсвэл</span>
              <div className="flex-1 border-t border-gray-700"></div>
            </div>

            {/* Social Login */}
            <div className="space-y-3">
              <button
                onClick={handleFacebookLogin}
                className="flex w-full items-center justify-center space-x-2 rounded-lg border border-gray-700 bg-gray-800 py-3 px-4 text-white transition-colors hover:bg-gray-700"
              >
                <Facebook className="h-5 w-5 text-blue-400" />
                <span>Facebook-ээр нэвтрэх</span>
              </button>

              <button
                onClick={handleGuestLogin}
                className="flex w-full items-center justify-center space-x-2 rounded-lg border border-gray-700 bg-gray-800 py-3 px-4 text-white transition-colors hover:bg-gray-700"
              >
                <User className="h-5 w-5 text-gray-400" />
                <span>Зочноор нэвтрэх</span>
              </button>
            </div>

            {/* Toggle Sign Up / Sign In */}
            <div className="mt-6 text-center text-sm text-gray-400">
              {isSignUp ? (
                <span>
                  Аль хэдийн бүртгэлтэй юу?{" "}
                  <button
                    onClick={() => {
                      setIsSignUp(false);
                      setError(null);
                    }}
                    className="font-medium text-white hover:underline"
                  >
                    Нэвтрэх
                  </button>
                </span>
              ) : (
                <span>
                  Бүртгэлгүй юу?{" "}
                  <button
                    onClick={() => {
                      setIsSignUp(true);
                      setError(null);
                    }}
                    className="font-medium text-white hover:underline"
                  >
                    Бүртгүүлэх
                  </button>
                </span>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-700 px-6 py-4 text-center text-xs text-gray-500">
            Онлайн худалдааг хөгжүүлэгч{" "}
            <span className="font-semibold text-purple-400">ECOMM</span> платформ.
          </div>
        </div>
      </div>
    </>
  );
}

