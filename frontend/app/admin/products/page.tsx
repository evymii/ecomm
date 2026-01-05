export default function AdminProducts() {
  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage all products in the store
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200">
              <div className="flex h-48 items-center justify-center text-gray-400">
                No Image
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-900">Product Name</h3>
              <p className="mt-1 text-sm text-gray-500">Product description</p>
              <p className="mt-2 text-lg font-semibold text-gray-900">$0.00</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">No products found</p>
      </div>
    </div>
  );
}

