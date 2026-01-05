import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-between px-4 py-16 sm:px-6 lg:px-8">
        <div className="w-full">
          <h1 className="mb-8 text-center text-4xl font-bold text-gray-900 dark:text-zinc-50">
            Цахим дэлгүүр
          </h1>
          <p className="mb-12 text-center text-lg text-gray-600 dark:text-zinc-400">
            Манай онлайн дэлгүүрт тавтай морил
          </p>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="overflow-hidden rounded-lg bg-white shadow transition-shadow hover:shadow-lg dark:bg-gray-800">
              <div className="p-6">
                <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-zinc-50">
                  Бараа
                </h2>
                <p className="mb-4 text-sm text-gray-500 dark:text-zinc-400">
                  Манай цуглуулгыг үзэх
                </p>
                <Link
                  href="/products"
                  className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Бараа үзэх →
                </Link>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg bg-white shadow transition-shadow hover:shadow-lg dark:bg-gray-800">
              <div className="p-6">
                <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-zinc-50">
                  Сагс
                </h2>
                <p className="mb-4 text-sm text-gray-500 dark:text-zinc-400">
                  Таны дэлгүүрийн сагс
                </p>
                <Link
                  href="/cart"
                  className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Сагс үзэх →
                </Link>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg bg-white shadow transition-shadow hover:shadow-lg dark:bg-gray-800">
              <div className="p-6">
                <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-zinc-50">
                  Захиалга
                </h2>
                <p className="mb-4 text-sm text-gray-500 dark:text-zinc-400">
                  Таны захиалгын түүх
                </p>
                <Link
                  href="/orders"
                  className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Захиалга үзэх →
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/admin"
              className="text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-zinc-400 dark:hover:text-zinc-200"
            >
              Админ панел →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
