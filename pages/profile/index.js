import axiosInstance from "@/lib/axiosInstance";
import Navbar from "@/src/components/Navbar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import Breadcrumb from "@/src/components/Breadcrumb";

export default function Profile (){
    const [transactions, setTransactions] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchProfileData = async () => {
        try {
          const userResponse = await axiosInstance.get("/me");
          const transactionsResponse = await axiosInstance.get("/my-transaction"); 
          console.log(userResponse);
    
          setUser(userResponse.data.data);
          setTransactions(transactionsResponse.data.result.data);
        } catch (error) {
          console.error("Error fetching profile data:", error);
          alert("Failed to load profile data.");
        }
        setLoading(false); 
    };

    useEffect(() => {
        fetchProfileData();
    }, []);

    console.log(transactions);

    return (
        <div className="mx-20 mt-24">
        <Navbar />
        <Breadcrumb/>
        <h1 className="text-3xl font-bold mb-6">User Profile</h1>
        
        {loading ? (
          <p>Loading profile...</p>
        ) : (
            
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">User Info</h2>
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
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Transactions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-yellow-600 mb-4">Pending</h3>
                  <div className="space-y-4">
                    {transactions
                      .filter((transaction) => transaction.status === "pending")
                      .map((transaction) => (
                        <div
                          key={transaction.id}
                          className="bg-yellow-100 p-4 rounded-lg shadow-lg border border-gray-200"
                        >
                          <p className="text-sm text-gray-500">No. Invoice {transaction.invoice_id}</p>
                          <p className="text-xl font-bold text-gray-800">Rp {transaction.total_amount}</p>
                          <p className="text-lg font-semibold">{transaction.transaction_items.title}</p>
                          <span className="text-yellow-600 bg-yellow-200 px-3 py-1 rounded-full text-xs">
                            Pembelian Tertunda
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-green-600 mb-4">Success</h3>
                  <div className="space-y-4">
                    {transactions
                      .filter((transaction) => transaction.status === "success")
                      .map((transaction) => (
                        <div
                          key={transaction.id}
                          className="bg-green-100 p-4 rounded-lg shadow-lg border border-gray-200"
                        >
                          <p className="text-sm text-gray-500">No. Invoice {transaction.invoice_id}</p>
                          <p className="text-xl font-bold text-gray-800">Rp {transaction.total_amount}</p>
                          <p className="text-lg font-semibold">{transaction.transaction_items.title}</p>
                          <span className="text-green-600 bg-green-200 px-3 py-1 rounded-full text-xs">
                            Pembelian Berhasil
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
      
                <div>
                  <h3 className="text-xl font-semibold text-red-600 mb-4">Cancelled</h3>
                  <div className="space-y-4">
                    {transactions
                      .filter((transaction) => transaction.status === "cancelled")
                      .map((transaction) => (
                        <div
                          key={transaction.id}
                          className="bg-red-100 p-4 rounded-lg shadow-lg border border-gray-200"
                        >
                          <p className="text-sm text-gray-500">No. Invoice {transaction.invoice_id}</p>
                          <p className="text-xl font-bold text-gray-800">Rp {transaction.total_amount}</p>
                          <p className="text-lg font-semibold">{transaction.transaction_items.title}</p>
                          <span className="text-red-600 bg-red-200 px-3 py-1 rounded-full text-xs">
                            Pembelian Dibatalkan
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      

    )
}