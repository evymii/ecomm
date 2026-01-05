"use client";

import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";

interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
  description?: string;
  isOnSale?: boolean;
}

export default function ForSalePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // TODO: Replace with actual API endpoint when backend is ready
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
        const response = await fetch(
          `${apiUrl}/products?category=for-sale`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        ).catch(() => null);
        
        if (response && response.ok) {
          const data = await response.json();
          const allProducts: Product[] = data.products || [];
          // Filter products that are on sale
          const filtered = allProducts.filter((p) => p.isOnSale);
          setProducts(filtered);
        } else {
          // Mock data for development
          setProducts([
            {
              id: "5",
              name: "Хямдарсан бараа 1",
              price: 40000,
              description: "Хямдарсан барааны тайлбар",
              isOnSale: true,
            },
            {
              id: "6",
              name: "Хямдарсан бараа 2",
              price: 55000,
              description: "Хямдарсан барааны тайлбар",
              isOnSale: true,
            },
            {
              id: "7",
              name: "Хямдарсан бараа 3",
              price: 45000,
              description: "Хямдарсан барааны тайлбар",
              isOnSale: true,
            },
            {
              id: "8",
              name: "Хямдарсан бараа 4",
              price: 70000,
              description: "Хямдарсан барааны тайлбар",
              isOnSale: true,
            },
            {
              id: "9",
              name: "Хямдарсан бараа 5",
              price: 35000,
              description: "Хямдарсан барааны тайлбар",
              isOnSale: true,
            },
            {
              id: "10",
              name: "Хямдарсан бараа 6",
              price: 60000,
              description: "Хямдарсан барааны тайлбар",
              isOnSale: true,
            },
          ]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        // Mock data fallback
        setProducts([
          {
            id: "5",
            name: "Хямдарсан бараа 1",
            price: 40000,
            description: "Хямдарсан барааны тайлбар",
            isOnSale: true,
          },
          {
            id: "6",
            name: "Хямдарсан бараа 2",
            price: 55000,
            description: "Хямдарсан барааны тайлбар",
            isOnSale: true,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Хямдарсан бараа</h1>
        <p className="mt-2 text-gray-600">
          Манай дэлгүүрийн хямдарсан бараанууд
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Уншиж байна...</p>
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">Бараа олдсонгүй</p>
        </div>
      )}
    </div>
  );
}

