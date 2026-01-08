"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProfileSidebar from "../components/ProfileSidebar";

export default function ProfilePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    phone: "",
    email: "",
    city: "Улаанбаатар",
    district: "",
    khoroo: "",
    deliveryAddress: "",
    additionalInfo: "",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      
      if (!token && !userStr) {
        router.push("/hereglegch/home");
        return;
      }

      if (userStr) {
        try {
          const userData = JSON.parse(userStr);
          // Split name if it exists
          if (userData.name) {
            const nameParts = userData.name.split(" ");
            setFormData((prev) => ({
              ...prev,
              lastName: nameParts[0] || "",
              firstName: nameParts.slice(1).join(" ") || "",
              email: userData.email || "",
            }));
          }
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
      }
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Save profile data to backend
    console.log("Saving profile:", formData);
    alert("Профайл амжилттай хадгалагдлаа");
  };

  const cities = ["Улаанбаатар", "Дархан", "Эрдэнэт", "Чойбалсан"];
  const districts = ["Сум/Дүүрэг сонгох", "Баянзүрх", "Сүхбаатар", "Хан-Уул"];
  const khoroo = ["Баг/Хороо сонгох", "1-р хороо", "2-р хороо", "3-р хороо"];

  return (
    <div className="min-h-screen bg-[#F3F4F4] text-black">
      <div className="flex">
        {/* Left Sidebar */}
        <ProfileSidebar />

        {/* Main Content */}
        <div className="flex-1 p-8">
          <h1 className="text-3xl font-bold mb-8 text-black">Миний профайл</h1>

          <form onSubmit={handleSubmit} className="max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Овог */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Овог <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white border border-black/20 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black/30 focus:border-transparent"
                  required
                />
              </div>

              {/* Нэр */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Нэр <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white border border-black/20 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black/30 focus:border-transparent"
                  required
                />
              </div>

              {/* Утасны дугаар */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Утасны дугаар <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white border border-black/20 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black/30 focus:border-transparent"
                  required
                />
              </div>

              {/* Имэйл хаяг */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Имэйл хаяг <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white border border-black/20 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black/30 focus:border-transparent"
                  required
                />
              </div>

              {/* Хот / Аймаг */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Хот / Аймаг <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white border border-black/20 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black/30 focus:border-transparent"
                  required
                >
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              {/* Сум / Дүүрэг */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Сум / Дүүрэг <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.district}
                  onChange={(e) =>
                    setFormData({ ...formData, district: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white border border-black/20 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black/30 focus:border-transparent"
                  required
                >
                  {districts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>

              {/* Баг / Хороо */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Баг / Хороо <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.khoroo}
                  onChange={(e) =>
                    setFormData({ ...formData, khoroo: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white border border-black/20 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black/30 focus:border-transparent"
                  required
                >
                  {khoroo.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Хүргэлтийн хаяг */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-black mb-2">
                Хүргэлтийн хаяг <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.deliveryAddress}
                onChange={(e) =>
                  setFormData({ ...formData, deliveryAddress: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-3 bg-white border border-black/20 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black/30 focus:border-transparent"
                required
              />
            </div>

            {/* Нэмэлт мэдээлэл */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-black mb-2">
                Нэмэлт мэдээлэл
              </label>
              <textarea
                value={formData.additionalInfo}
                onChange={(e) =>
                  setFormData({ ...formData, additionalInfo: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-3 bg-white border border-black/20 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black/30 focus:border-transparent"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-black/80 transition-all duration-500 ease-out"
            >
              Хадгалах
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

