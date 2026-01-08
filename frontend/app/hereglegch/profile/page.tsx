"use client";

import { useEffect, useState } from "react";
import { User, Mail, Edit2, Save, X } from "lucide-react";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function ProfilePage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", email: "" });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Та эхлээд нэвтэрнэ үү");
          setLoading(false);
          return;
        }

        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
        const response = await fetch(`${apiUrl}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          // Handle both response formats
          const user = data.user || data;
          setUserData({
            id: user.id || user._id,
            name: user.name || "",
            email: user.email || "",
            role: user.role || "user",
          });
          setEditForm({
            name: user.name || "",
            email: user.email || "",
          });
        } else {
          setError("Хэрэглэгчийн мэдээлэл авахад алдаа гарлаа");
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Хэрэглэгчийн мэдээлэл авахад алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setError(null);
    setSuccess(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (userData) {
      setEditForm({
        name: userData.name,
        email: userData.email,
      });
    }
    setError(null);
    setSuccess(null);
  };

  const handleSave = async () => {
    try {
      setError(null);
      setSuccess(null);

      if (!editForm.name.trim() || !editForm.email.trim()) {
        setError("Нэр болон имэйл хоосон байж болохгүй");
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        setError("Та эхлээд нэвтэрнэ үү");
        return;
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const response = await fetch(`${apiUrl}/auth/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: editForm.name.trim(),
          email: editForm.email.trim(),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const updatedUser = data.user || data;
        setUserData({
          id: updatedUser.id || userData?.id || "",
          name: updatedUser.name || editForm.name,
          email: updatedUser.email || editForm.email,
          role: updatedUser.role || userData?.role || "user",
        });
        setIsEditing(false);
        setSuccess("Профайл амжилттай шинэчлэгдлээ");
      } else {
        const errorData = await response.json().catch(() => ({ error: "Алдаа гарлаа" }));
        setError(errorData.error || "Профайл шинэчлэхэд алдаа гарлаа");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Профайл шинэчлэхэд алдаа гарлаа");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#5D688A] border-r-transparent"></div>
          <p className="text-gray-600">Ачааллаж байна...</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="mb-4 text-lg text-red-600">{error || "Хэрэглэгчийн мэдээлэл олдсонгүй"}</p>
          <a
            href="/hereglegch/home"
            className="text-[#5D688A] hover:underline"
          >
            Нүүр хуудас руу буцах
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Миний профайл</h1>
          <p className="mt-2 text-gray-600">Таны бүртгэлийн мэдээлэл</p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 rounded-lg bg-green-50 border border-green-200 p-4">
            <p className="text-sm text-green-800">{success}</p>
          </div>
        )}

        <div className="overflow-hidden rounded-lg bg-white shadow-sm border border-gray-200">
          <div className="px-6 py-8">
            {!isEditing ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#5D688A] text-white">
                      <User className="h-10 w-10" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold text-gray-900">{userData.name}</h2>
                      <p className="text-sm text-gray-500 capitalize">
                        {userData.role === "admin" ? "Админ" : "Хэрэглэгч"}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleEdit}
                    className="flex items-center space-x-2 rounded-lg bg-[#5D688A] px-4 py-2 text-white transition-colors hover:bg-[#4a5670]"
                  >
                    <Edit2 className="h-4 w-4" />
                    <span>Засах</span>
                  </button>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <User className="mt-1 h-5 w-5 text-gray-400" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-500">Нэр</p>
                        <p className="mt-1 text-base text-gray-900">{userData.name}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Mail className="mt-1 h-5 w-5 text-gray-400" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-500">Имэйл</p>
                        <p className="mt-1 text-base text-gray-900">{userData.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#5D688A] text-white">
                      <User className="h-10 w-10" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold text-gray-900">Профайл засах</h2>
                      <p className="text-sm text-gray-500">Мэдээлэлээ шинэчлэх</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={handleCancel}
                      className="flex items-center space-x-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
                    >
                      <X className="h-4 w-4" />
                      <span>Цуцлах</span>
                    </button>
                    <button
                      onClick={handleSave}
                      className="flex items-center space-x-2 rounded-lg bg-[#5D688A] px-4 py-2 text-white transition-colors hover:bg-[#4a5670]"
                    >
                      <Save className="h-4 w-4" />
                      <span>Хадгалах</span>
                    </button>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Нэр
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#5D688A] focus:outline-none focus:ring-2 focus:ring-[#5D688A] focus:ring-opacity-20"
                        placeholder="Таны нэр"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Имэйл
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#5D688A] focus:outline-none focus:ring-2 focus:ring-[#5D688A] focus:ring-opacity-20"
                        placeholder="Таны имэйл"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

