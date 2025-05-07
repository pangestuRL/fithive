import Image from "next/image";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4">
        <div className="bg-white p-7">
        <Image
          src="/images/Navbar/fithive.png"
          alt="FitHive Logo"
          width={125}
          height={50}
          className="items-center"
        />

        </div>
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