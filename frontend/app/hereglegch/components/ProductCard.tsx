import Link from "next/link";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image?: string;
  description?: string;
}

export default function ProductCard({
  id,
  name,
  price,
  image,
  description,
}: ProductCardProps) {
  return (
    <Link href={`/hereglegch/products/${id}`}>
      <div className="group overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-100">
          {image ? (
            <img
              src={image}
              alt={name}
              className="h-48 w-full object-cover object-center group-hover:opacity-75 transition-opacity"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.innerHTML = '<div class="flex h-48 w-full items-center justify-center text-gray-400">Зураг байхгүй</div>';
                }
              }}
            />
          ) : (
            <div className="flex h-48 w-full items-center justify-center text-gray-400">
              Зураг байхгүй
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 line-clamp-2">
            {name}
          </h3>
          {description && (
            <p className="mt-1 text-sm text-gray-500 line-clamp-2">
              {description}
            </p>
          )}
          <p className="mt-2 text-lg font-semibold text-[#5D688A]">
            ₮{price.toLocaleString()}
          </p>
        </div>
      </div>
    </Link>
  );
}

