import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { useRouter } from "next/router";
import Layout from "@/src/components/admin/layout";

export default function AdminDashboard() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("accessToken");

            if(!token){
                router.replace("/login");
                return;
            }

            try {
                const response = await axiosInstance.get('/me');
                const userData = response.data.data;
                
                if(userData.role !== 'admin'){
                    router.replace('/unauthorized');
                    return;
                }
                setUser(userData);
            } catch (error) {
                console.error("Error fetching user data:", error);
                router.replace("/login");
            } finally{
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userName");
        localStorage.removeItem("userRole");
        router.replace("/login");
      };

    if (loading) {
        return (
        <div className="flex justify-center items-center h-screen">
            <p className="text-xl font-semibold">Loading user data...</p>
        </div>
        );
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
