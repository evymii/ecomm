"use client";

import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";

interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
  description?: string;
  isNew?: boolean;
  isBestseller?: boolean;
}

export default function NewBestsellerPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // TODO: Replace with actual API endpoint when backend is ready
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
        const response = await fetch(
          `${apiUrl}/products?category=new-bestseller`,
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
          // Filter products that are new or bestseller
          const filtered = allProducts.filter(
            (p) => p.isNew || p.isBestseller
          );
          setProducts(filtered);
        } else {
          // Mock data for development
          setProducts([
            {
              id: "1",
              name: "Шинэ бараа 1",
              price: 50000,
              description: "Шинэ барааны тайлбар",
              isNew: true,
            },
            {
              id: "2",
              name: "Шинэ бараа 2",
              price: 75000,
              description: "Шинэ барааны тайлбар",
              isNew: true,
            },
            {
              id: "3",
              name: "Онцлох бараа 1",
              price: 60000,
              description: "Онцлох барааны тайлбар",
              isBestseller: true,
            },
            {
              id: "4",
              name: "Онцлох бараа 2",
              price: 80000,
              description: "Онцлох барааны тайлбар",
              isBestseller: true,
            },
            {
              id: "5",
              name: "Шинэ бараа 3",
              price: 45000,
              description: "Шинэ барааны тайлбар",
              isNew: true,
            },
            {
              id: "6",
              name: "Онцлох бараа 3",
              price: 90000,
              description: "Онцлох барааны тайлбар",
              isBestseller: true,
            },
          ]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        // Mock data fallback
        setProducts([
          {
            id: "1",
            name: "Шинэ бараа 1",
            price: 50000,
            description: "Шинэ барааны тайлбар",
            isNew: true,
          },
          {
            id: "2",
            name: "Онцлох бараа 1",
            price: 75000,
            description: "Онцлох барааны тайлбар",
            isBestseller: true,
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
        <h1 className="text-3xl font-bold text-gray-900">
          Шинэ / Онцлох бараа
        </h1>
        <p className="mt-2 text-gray-600">
          Манай дэлгүүрийн шинэ болон онцлох бараанууд
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

