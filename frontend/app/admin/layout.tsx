export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <nav className="border-b border-[#4A4947]/20 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="flex shrink-0 items-center">
                <h1 className="text-xl font-bold text-[#5D688A]">
                  Админ панел
                </h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <a
                  href="/admin"
                  className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-600 hover:border-[#5D688A]/30 hover:text-[#5D688A]"
                >
                  Хяналтын самбар
                </a>
                <a
                  href="/admin/users"
                  className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-600 hover:border-[#5D688A]/30 hover:text-[#5D688A]"
                >
                  Хэрэглэгчид
                </a>
                <a
                  href="/admin/products"
                  className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-600 hover:border-[#5D688A]/30 hover:text-[#5D688A]"
                >
                  Бараа
                </a>
                <a
                  href="/admin/orders"
                  className="inline-flex items-center border-b-2 border-[#5D688A] px-1 pt-1 text-sm font-medium text-[#5D688A]"
                >
                  Захиалга
                </a>
              </div>
            </div>
            <div className="flex items-center">
              <a
                href="/"
                className="text-sm font-medium text-gray-600 hover:text-[#5D688A]"
              >
                Нүүр хуудас руу буцах
              </a>
            </div>
          </div>
        </div>
      </nav>
      <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
