export default function AdminDashboard() {
  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome to the admin panel
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">
            Total Users
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            0
          </dd>
        </div>

        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">
            Total Products
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            0
          </dd>
        </div>

        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">
            Total Orders
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            0
          </dd>
        </div>

        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">
            Revenue
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            $0
          </dd>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
        <div className="mt-4 rounded-lg bg-white shadow">
          <div className="px-4 py-5 sm:p-6">
            <p className="text-sm text-gray-500">No recent activity</p>
          </div>
        </div>
      </div>
    </div>
  );
}

