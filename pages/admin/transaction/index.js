import axiosInstance from "@/lib/axiosInstance";
import Layout from "@/src/components/admin/layout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Transaction() {
    const router = useRouter();
    const [transactions, setTransactions] = useState([]); 
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); 
    const [selectedStatus, setSelectedStatus] = useState(""); 
    const [loading, setLoading] = useState(false); 

    const fetchTransactions = async (search = "") => {
        setLoading(true); 
        try {
            const response = await axiosInstance.get('/all-transaction', {
                params: {
                    is_paginate:true,
                    page:1,
                    per_page:1000,
                    search, 
                }
            });

            setTransactions(response?.data?.result?.data ?? []); 
            setFilteredTransactions(response?.data?.result?.data ?? []); 
        } catch (error) {
            console.error("Error fetching transactions:", error);
            setTransactions([]);
            setFilteredTransactions([]);
        }
        setLoading(false); 
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleStatusChange = (e) => {
        setSelectedStatus(e.target.value);
    };

    const handleSearch = () => {
        fetchTransactions(searchQuery); 
    };

    const filterByStatus = (status) => {
        if (!status) {
            setFilteredTransactions(transactions); 
        } else {
            const filtered = transactions.filter((transaction) => transaction.status === status);
            setFilteredTransactions(filtered); 
        }
    };

    useEffect(() => {
        filterByStatus(selectedStatus);
    }, [selectedStatus, transactions]); 

    const handleViewDetails = (transactionId) => {
        router.push(`/admin/transaction/${transactionId}`); 
    };

    return (
        <Layout>
            <h1 className="text-3xl font-bold mb-6">Manage Transaction</h1>

            <div className="mb-4">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="border p-2"
                    placeholder="Search by Title"
                />
                <button
                    onClick={handleSearch}  
                    className="bg-blue-500 text-white p-2 ml-2 rounded-lg"
                >
                    Search
                </button>
            </div>

            <div className="mb-4">
                <select
                    value={selectedStatus}
                    onChange={handleStatusChange}
                    className="border p-2"
                >
                    <option value="">Filter by Status</option>
                    <option value="pending">Pending</option>
                    <option value="success">Success</option>
                    <option value="cancelled">Cancelled</option>
                </select>
            </div>

            {loading && <p>Loading...</p>}

            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">No</th>
                        <th className="border px-4 py-2">Invoice ID</th>
                        <th className="border px-4 py-2">Amount</th>
                        <th className="border px-4 py-2">Status</th>
                        <th className="border px-4 py-2">Date</th>
                        <th className="border px-4 py-2">Title</th>
                        <th className="border px-4 py-2">Actions</th> 
                    </tr>
                </thead>
                <tbody>
                    {filteredTransactions.length > 0 ? (
                        filteredTransactions.map((transaction, index) => (
                            <tr key={transaction.id}>
                                <td className="border px-4 py-2">{index + 1}</td>
                                <td className="border px-4 py-2">{transaction.invoice_id}</td>
                                <td className="border px-4 py-2">{transaction.total_amount}</td>
                                <td className="border px-4 py-2">{transaction.status}</td>
                                <td className="border px-4 py-2">{transaction.order_date}</td>
                                <td className="border px-4 py-2">
                                    {transaction.transaction_items?.sport_activities?.title || "No Title"}
                                </td>
                                <td className="border px-4 py-2"> 
                                    <button
                                        onClick={() => handleViewDetails(transaction.id)}
                                        className="bg-blue-500 text-white p-2"
                                    >
                                        View Details
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center border px-4 py-2">
                                No transactions found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </Layout>
    );
}
