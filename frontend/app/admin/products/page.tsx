export default function AdminProducts() {
  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#5D688A]">
            Барааны удирдлага
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Дэлгүүрийн бүх барааг удирдах
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center rounded-lg border border-[#4A4947]/20 bg-[#5D688A] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#5D688A]/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5D688A]/50"
        >
          Бараа нэмэх
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="overflow-hidden rounded-lg border border-[#4A4947]/20 bg-white shadow-sm transition-shadow hover:shadow-md">
          <div className="p-6">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-[#F7F7F7]">
              <div className="flex h-48 items-center justify-center text-gray-400">
                Зураг байхгүй
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-medium text-[#5D688A]">
                Барааны нэр
              </h3>
              <p className="mt-1 text-sm text-gray-600">Барааны тайлбар</p>
              <p className="mt-2 text-lg font-semibold text-[#5D688A]">$0.00</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">Бараа олдсонгүй</p>
      </div>
    </div>
  );
}
