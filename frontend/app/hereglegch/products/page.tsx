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
  { id: "subject-supply", name: "Subject Supply", mongolian: "Сургалтын хэрэгсэл" },
  { id: "phone-supply", name: "Phone Supply", mongolian: "Утасны хэрэгсэл" },
  { id: "toys", name: "Toys", mongolian: "Тоглоом" },
  { id: "home-stuffs", name: "Home Stuffs", mongolian: "Гэрийн хэрэглэл" },
  { id: "electronics", name: "Electronics", mongolian: "Цахилгаан бараа" },
  { id: "frame", name: "Frame", mongolian: "Хүрээ" },
  { id: "clock", name: "Clock", mongolian: "Цаг" },
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
            { id: "1", name: "Бичгийн хэрэгсэл", price: 50000, description: "Сургалтын хэрэгсэл", category: "subject-supply" },
            { id: "2", name: "Хүснэгт", price: 75000, description: "Сургалтын хэрэгсэл", category: "subject-supply" },
            { id: "3", name: "Утасны бүрхүүл", price: 30000, description: "Утасны хэрэгсэл", category: "phone-supply" },
            { id: "4", name: "Утасны зай", price: 45000, description: "Утасны хэрэгсэл", category: "phone-supply" },
            { id: "5", name: "Лего тоглоом", price: 120000, description: "Тоглоом", category: "toys" },
            { id: "6", name: "Хүүхдийн тоглоом", price: 35000, description: "Тоглоом", category: "toys" },
            { id: "7", name: "Цаасны сав", price: 25000, description: "Гэрийн хэрэглэл", category: "home-stuffs" },
            { id: "8", name: "Цэвэрлэгээний хэрэгсэл", price: 15000, description: "Гэрийн хэрэглэл", category: "home-stuffs" },
            { id: "9", name: "Утас", price: 500000, description: "Цахилгаан бараа", category: "electronics" },
            { id: "10", name: "Компьютер", price: 1500000, description: "Цахилгаан бараа", category: "electronics" },
            { id: "11", name: "Зургийн хүрээ", price: 40000, description: "Хүрээ", category: "frame" },
            { id: "12", name: "Гэрэлтэй хүрээ", price: 80000, description: "Хүрээ", category: "frame" },
            { id: "13", name: "Хананы цаг", price: 95000, description: "Цаг", category: "clock" },
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
        <h1 className="text-3xl font-bold text-gray-900">Бүх бараа</h1>
        <p className="mt-2 text-gray-600">
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
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? "bg-[#5D688A] text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
              }`}
            >
              {category.mongolian}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Уншиж байна...</p>
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">
            {selectedCategory === "all"
              ? "Бараа олдсонгүй"
              : `${CATEGORIES.find((c) => c.id === selectedCategory)?.mongolian} ангилалд бараа олдсонгүй`}
          </p>
        </div>
      )}
    </div>
  );
}
