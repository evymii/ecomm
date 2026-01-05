export default function AdminDashboard() {
  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#5D688A]">
          Админ хяналтын самбар
        </h1>
        <p className="mt-1 text-sm text-gray-600">Админ панелд тавтай морил</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="overflow-hidden rounded-lg border border-[#4A4947]/20 bg-white px-4 py-5 shadow-sm">
          <dt className="truncate text-sm font-medium text-gray-600">
            Нийт хэрэглэгчид
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-[#5D688A]">
            0
          </dd>
        </div>

        <div className="overflow-hidden rounded-lg border border-[#4A4947]/20 bg-white px-4 py-5 shadow-sm">
          <dt className="truncate text-sm font-medium text-gray-600">
            Нийт бараа
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-[#5D688A]">
            0
          </dd>
        </div>

        <div className="overflow-hidden rounded-lg border border-[#4A4947]/20 bg-white px-4 py-5 shadow-sm">
          <dt className="truncate text-sm font-medium text-gray-600">
            Нийт захиалга
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-[#5D688A]">
            0
          </dd>
        </div>

        <div className="overflow-hidden rounded-lg border border-[#4A4947]/20 bg-white px-4 py-5 shadow-sm">
          <dt className="truncate text-sm font-medium text-gray-600">Орлого</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-[#5D688A]">
            $0
          </dd>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-[#5D688A]">
          Сүүлийн үйл ажиллагаа
        </h2>
        <div className="mt-4 rounded-lg border border-[#4A4947]/20 bg-white shadow-sm">
          <div className="px-4 py-5 sm:p-6">
            <p className="text-sm text-gray-600">
              Сүүлийн үйл ажиллагаа байхгүй
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
