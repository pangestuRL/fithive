import axiosInstance from "@/lib/axiosInstance";
import Layout from "@/src/components/admin/layout";
import { useEffect, useState } from "react";

export default function Transaction(){

    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [statusFilter, setStatusFilter] = useState("");

    useEffect(() => {
        const fetchTransactions = async() => {
            try {
                const response = await axiosInstance.get('/all-transaction', {
                    params : {
                        is_paginate : true,
                        per_page: itemsPerPages,
                        page,
                    }
                });
                console.log(response);
                setTransactions(response?.data?.result?.data ?? []);
            }catch(error){
                console.error("Error fetching transactions:", error);
            }
        };

        fetchTransactions();
    }, []);

    const handleStatusFilterChange = (e) => {
        const selectedStatus = e.target.value;
        setStatusFilter(selectedStatus);
    }

    useEffect(() => {
        if(statusFilter){
            const filtered = transactions.filter(
                (transaction) => transaction.status === statusFilter
            );
            setFilteredTransactions(filtered);
        } else {
            setFilteredTransactions(transactions);
        }
    }, [statusFilter, transactions]);

    console.log(statusFilter);

    return(
        <Layout>
            <h1 className="text-3xl font-bold mb-6">Manage Transaction</h1>

            <div className="mb-4">
                <select
                onChange={handleStatusFilterChange}
                value={statusFilter}
                className="border p-2"
                >
                <option value="">All</option>
                <option value="success">Success</option>
                <option value="pending">Pending</option>
                <option value="canceled">Canceled</option>
                </select>
            </div>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                <tr>
                    <th className="border px-4 py-2">Transaction ID</th>
                    <th className="border px-4 py-2">Amount</th>
                    <th className="border px-4 py-2">Status</th>
                    <th className="border px-4 py-2">Date</th>
                </tr>
                </thead>
                <tbody>
                {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((transaction) => (
                    <tr key={transaction.id}>
                        <td className="border px-4 py-2">{transaction.id}</td>
                        <td className="border px-4 py-2">{transaction.amount}</td>
                        <td className="border px-4 py-2">{transaction.status}</td>
                        <td className="border px-4 py-2">{transaction.date}</td>
                    </tr>
                    ))
                ) : (
                    <tr>
                    <td colSpan="4" className="text-center border px-4 py-2">
                        No transactions available.
                    </td>
                    </tr>
                )}
                </tbody>
            </table>
        </Layout>
    )
}