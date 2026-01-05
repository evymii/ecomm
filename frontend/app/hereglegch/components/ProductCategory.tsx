import Link from "next/link";
import ProductCard from "./ProductCard";

interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
  description?: string;
}

interface ProductCategoryProps {
  title: string;
  products: Product[];
  viewMoreLink: string;
}

export default function ProductCategory({
  title,
  products,
  viewMoreLink,
}: ProductCategoryProps) {
  return (
    <div className="mb-12">
      <div className="mb-6 flex items-center gap-4">
        <Link
          href={viewMoreLink}
          className="inline-flex items-center text-sm font-medium text-[#5D688A] hover:text-[#5D688A]/80 transition-colors whitespace-nowrap"
        >
          Дэлгэрэнгүй үзэх →
        </Link>
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-gray-500">
            Бараа олдсонгүй
          </div>
        )}
      </div>
    </div>
  );
}

