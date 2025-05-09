import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { useRouter } from "next/router";
import Layout from "@/src/components/admin/layout";
import Cookies from "js-cookie";

export default function AdminDashboard() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axiosInstance.get('/me');
                setUser(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleLogout = () => {
        Cookies.remove("accessToken");
        Cookies.remove("userName");
        Cookies.remove("userRole");
        router.push("/login");
      };

    if (loading) {
        return <p>Loading user data...</p>;
    }

    return (
      <Layout>
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Welcome to Admin Dashboard, {user?.name}</h1>

            {user ? (
                <div>
                    <div className="flex items-center">
                      <img
                          src={user?.avatar || "/images/avatar.png"} 
                          alt="User Avatar"
                          className="w-16 h-16 rounded-full mr-4"
                      />
                      <div>
                          <h3 className="text-xl">{user?.name}</h3>
                          <p className="text-gray-600">{user?.email}</p>
                      </div>
                    </div>
                </div>
            ) : (
                <p>No user data available.</p>
            )}

            <button
                onClick={handleLogout}
                className="mt-6 px-4 py-2 bg-red-500 text-white rounded-lg"
            >
                Logout
            </button>
        </div>
      </Layout>
    );
}
