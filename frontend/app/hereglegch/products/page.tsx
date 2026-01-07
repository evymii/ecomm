"use client";

import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
  description?: string;
  category?: string;
}

const CATEGORIES = [
  { id: "all", name: "Бүх бараа", mongolian: "Бүх бараа" },
  { id: "subject-supply", name: "Subject Supply", mongolian: "Бичиг хэрэг" },
  { id: "phone-supply", name: "Phone Supply", mongolian: "Утасны дагалдах" },
  { id: "toys", name: "Toys", mongolian: "Тоглоом" },
  { id: "home-stuffs", name: "Home Stuffs", mongolian: "Гэр ахуй" },
  { id: "electronics", name: "Electronics", mongolian: "Цахилгаан бараа" },
  { id: "frame", name: "Frame", mongolian: "Жааз" },
  { id: "clock", name: "Clock", mongolian: "Бэлэг дурсгал" },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
        const response = await fetch(
          `${apiUrl}/products`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        ).catch(() => null);
        
        if (response && response.ok) {
          const data = await response.json();
          setProducts(data.products || []);
        } else {
          // Mock data for development with categories
          const mockProducts: Product[] = [
            { id: "1", name: "Дэвтэр", price: 50000, description: "Бичиг хэрэг", category: "subject-supply" },
            { id: "2", name: "Хүснэгт", price: 75000, description: "Бичиг хэрэг", category: "subject-supply" },
            { id: "3", name: "Утасны цэнэглэгч", price: 30000, description: "Утасны дагалдах", category: "phone-supply" },
            { id: "4", name: "Утас тогтоогч", price: 45000, description: "Утасны дагалдах", category: "phone-supply" },
            { id: "5", name: "Чихмэл тоглоом", price: 120000, description: "Тоглоом", category: "toys" },
            { id: "6", name: "Хүүхдийн тоглоом", price: 35000, description: "Тоглоом", category: "toys" },
            { id: "7", name: "Хогийн сав", price: 25000, description: "Гэр ахуй", category: "home-stuffs" },
            { id: "8", name: "Шүүр", price: 15000, description: "Гэр ахуй", category: "home-stuffs" },
            { id: "9", name: "Ус буцалгагч", price: 500000, description: "Цахилгаан бараа", category: "electronics" },
            { id: "10", name: "Будаа агшаагч", price: 1500000, description: "Цахилгаан бараа", category: "electronics" },
            { id: "11", name: "Эвтэй 4 амьтан", price: 40000, description: "Жааз", category: "frame" },
            { id: "13", name: "Ханын цаг", price: 95000, description: "Цаг", category: "clock" },
            { id: "14", name: "Ширээний цаг", price: 55000, description: "Цаг", category: "clock" },
          ];
          setProducts(mockProducts);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products by category
  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((p) => p.category === selectedCategory)
      );
    }
  }, [selectedCategory, products]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black">Бүх бараа</h1>
        <p className="mt-2 text-black/70">
          Манай дэлгүүрийн бүх бараанууд
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-500 ease-out ${
                selectedCategory === category.id
                  ? "bg-black text-white"
                  : "bg-white text-black/70 hover:bg-[#F3F4F4] hover:text-black border border-[#E8E8D3]"
              }`}
            >
              {category.mongolian}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-black/50">Уншиж байна...</p>
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-black/50">
            {selectedCategory === "all"
              ? "Бараа олдсонгүй"
              : `${CATEGORIES.find((c) => c.id === selectedCategory)?.mongolian} ангилалд бараа олдсонгүй`}
          </p>
        </div>
      )}
    </div>
  );
}
