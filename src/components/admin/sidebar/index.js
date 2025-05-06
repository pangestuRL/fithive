export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4">
        <h2 className="text-2xl mb-6">Admin Dashboard</h2>
        <ul>
          <li className="mb-4 hover:bg-gray-700 p-2 rounded">
            <a href="/admin">Dashboard</a>
          </li>
          <li className="mb-4 hover:bg-gray-700 p-2 rounded">
            <a href="/admin/activities">Activities</a>
          </li>
          <li className="mb-4 hover:bg-gray-700 p-2 rounded">
            <a href="/admin/transaction">Transaction</a>
          </li>
          <li className="mb-4 hover:bg-gray-700 p-2 rounded">
            <a href="/admin/categories">Categories</a>
          </li>
        </ul>
    </div>
  );
}