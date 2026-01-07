"use client";

import { useEffect, useState } from "react";
import ProductCarousel from "../components/ProductCarousel";

interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
  description?: string;
  category?: string;
  isNew?: boolean;
  isBestseller?: boolean;
  isOnSale?: boolean;
}

export default function HomePage() {
  const [userName, setUserName] = useState<string>("Маргад");
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [saleProducts, setSaleProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user name from API
    const fetchUserData = async () => {
      try {
        if (typeof window !== "undefined") {
          const token = localStorage.getItem("token");
          if (token) {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
            const response = await fetch(
              `${apiUrl}/auth/me`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (response.ok) {
              const userData = await response.json();
              setUserName(userData.name || userData.email || "Хэрэглэгч");
            }
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Fetch products from API
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // TODO: Replace with actual API endpoint when backend is ready
        // For now, using mock data
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
          const products: Product[] = data.products || [];
          
          // Filter new/bestseller products
          const newBestseller = products.filter((p) => p.isNew || p.isBestseller);
          setNewProducts(newBestseller);
          
          // Filter sale products
          const onSale = products.filter((p) => p.isOnSale);
          setSaleProducts(onSale);
        } else {
          // Mock data for development - New/Bestseller products
          setNewProducts([
            {
              id: "1",
              name: "Шинэ бараа 1",
              price: 50000,
            },
            {
              id: "2",
              name: "Шинэ бараа 2",
              price: 75000,
            },
            {
              id: "3",
              name: "Шинэ бараа 3",
              price: 60000,
            },
            {
              id: "4",
              name: "Шинэ бараа 4",
              price: 80000,
            },
            {
              id: "5",
              name: "Шинэ бараа 5",
              price: 55000,
            },
            {
              id: "6",
              name: "Шинэ бараа 6",
              price: 65000,
            },
          ]);
          // Mock data for development - For Sale products
          setSaleProducts([
            {
              id: "7",
              name: "Хямдарсан бараа 1",
              price: 40000,
            },
            {
              id: "8",
              name: "Хямдарсан бараа 2",
              price: 55000,
            },
            {
              id: "9",
              name: "Хямдарсан бараа 3",
              price: 45000,
            },
            {
              id: "10",
              name: "Хямдарсан бараа 4",
              price: 70000,
            },
            {
              id: "11",
              name: "Хямдарсан бараа 5",
              price: 35000,
            },
            {
              id: "12",
              name: "Хямдарсан бараа 6",
              price: 60000,
            },
          ]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        // Mock data fallback
        setNewProducts([
          {
            id: "1",
            name: "Шинэ бараа 1",
            price: 50000,
          },
          {
            id: "2",
            name: "Шинэ бараа 2",
            price: 75000,
          },
        ]);
        setSaleProducts([
          {
            id: "3",
            name: "Хямдарсан бараа 1",
            price: 40000,
          },
          {
            id: "4",
            name: "Хямдарсан бараа 2",
            price: 55000,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
    fetchProducts();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Greeting */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-black text-center">
          Сайн байна уу, {userName}!
        </h1>
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-black/50">Уншиж байна...</p>
        </div>
      ) : (
        <>
          {/* New/Bestseller Products Carousel */}
          <ProductCarousel
            title="Шинэ / Онцлох бараа"
            products={newProducts}
            viewMoreLink="/hereglegch/products/new-bestseller"
            itemsPerSlide={4}
          />

          {/* For Sale Products Carousel */}
          <ProductCarousel
            title="Хямдарсан бараа"
            products={saleProducts}
            viewMoreLink="/hereglegch/products/for-sale"
            itemsPerSlide={4}
          />
        </>
      )}
    </div>
  );
}

