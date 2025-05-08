import Image from "next/image";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);
  return (
    <div className={`w-64 h-screen bg-gray-800 text-white p-4 ${isClient ? "sticky top-0" : ""}`}>
            <div className="bg-blue-100 p-5 mb-5 rounded">
            <Image
              src="/images/Navbar/fithive.png"
              alt="FitHive Logo"
              width={125}
              height={50}
              className="items-center ml-8"
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