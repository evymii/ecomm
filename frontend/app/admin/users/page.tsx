export default function AdminUsers() {
  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#5D688A]">
          Хэрэглэгчдийн удирдлага
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Системийн бүх хэрэглэгчдийг удирдах
        </p>
      </div>

      <div className="overflow-hidden rounded-lg border border-[#4A4947]/20 bg-white shadow-sm">
        <div className="px-4 py-5 sm:p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[#4A4947]/10">
              <thead className="bg-[#F7F7F7]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                    Нэр
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                    Имэйл
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                    Эрх
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                    Үйлдлүүд
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#4A4947]/10 bg-white">
                <tr className="hover:bg-[#FFF2EF]">
                  <td
                    colSpan={4}
                    className="px-6 py-4 text-center text-sm text-gray-600"
                  >
                    Хэрэглэгч олдсонгүй
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
