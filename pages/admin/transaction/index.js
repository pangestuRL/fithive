import axiosInstance from "@/lib/axiosInstance";
import Layout from "@/src/components/admin/layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Transaction(){
    const router = useRouter();
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1); 
    const [totalPages, setTotalPages] = useState(1); 
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const [totalItems, setTotalItems] = useState(0);

    const fetchTransactions = async (page = 1) => {
        try {
          const response = await axiosInstance.get('/all-transaction', {
            params: {
              is_paginate: true, 
              per_page: itemsPerPage, 
              page,
            }
          });
          const { result } = response.data;
          
          setTransactions(result.data); 
          setTotalItems(result.total);
          setTotalPages(result.last_page); 
        } catch (error) {
          console.error("Error fetching transactions:", error);
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return; 
        setCurrentPage(newPage);
    
        router.push({
          pathname: router.pathname,
          query: { ...router.query, page: newPage },
        });
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value); 
    };
    

    useEffect(() => {
        const filtered = transactions.filter((transaction) => {
            const title = transaction.transaction_items?.sport_activities?.title || "";
            return title.toLowerCase().includes(searchQuery.toLowerCase());

        });
        setFilteredTransactions(filtered); 
    }, [searchQuery, transactions]);

    useEffect(() => {
        const { page = 1 } = router.query;
        fetchTransactions(parseInt(page)); 
    }, [router.query.page]);

    const handleViewDetails = (transactionId) => {
        router.push(`/admin/transaction/${transactionId}`); 
    };

    return(
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
            </div>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                <tr>
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
                    filteredTransactions.map((transaction) => (
                    <tr key={transaction.id}>
                        <td className="border px-4 py-2">{transaction.invoice_id}</td>
                        <td className="border px-4 py-2">{transaction.total_amount}</td>
                        <td className="border px-4 py-2">{transaction.status}</td>
                        <td className="border px-4 py-2">{transaction.order_date}</td>
                        <td className="border px-4 py-2">
                            {transaction.transaction_items?.sport_activities?.title || "No Title"}
                        </td>
                        <td className="border px-4 py-2"> 
                            <button
                                onClick={() => handleViewDetails(transaction.id)} // Redirect ke halaman detail
                                className="bg-blue-500 text-white p-2"
                            >
                                View Details
                            </button>
                        </td>
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
            <div className="mt-6 flex justify-between">
                <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                className="px-4 py-2 bg-blue-500 text-white disabled:bg-gray-400"
                >
                Previous
                </button>

                <span>
                Page {currentPage} of {totalPages}
                </span>

                <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="px-4 py-2 bg-blue-500 text-white disabled:bg-gray-400"
                >
                Next
                </button>
            </div>
        </Layout>
    )
}