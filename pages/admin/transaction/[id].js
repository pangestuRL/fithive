import axiosInstance from "@/lib/axiosInstance";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "@/src/components/admin/layout";

export default function TransactionDetail() {
    const router = useRouter();
    const { id } = router.query; 
    const [transaction, setTransaction] = useState(null);
    const [status, setStatus] = useState(""); 
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (id) {
        const fetchTransactionDetail = async () => {
            try {
            const response = await axiosInstance.get(`/transaction/${id}`);
            setTransaction(response.data.result); 
            } catch (error) {
            console.error("Error fetching transaction detail:", error);
            }
        };

        fetchTransactionDetail();
        }
    }, [id]);

    const handleApproveStatus = async () => {
        setLoading(true); // Set loading menjadi true saat proses update
    
        try {
          const response = await axiosInstance.post(`/transaction/update-status/${id}`,
            {
              status: "success", 
            }
          );
    
          setTransaction((prevTransaction) => ({
            ...prevTransaction,
            status: response.data.message,
          }));
    
          alert("Status updated to Success!");
        } catch (error) {
          console.error("Error updating status:", error);
          alert("Failed to update status.");
        }
    
        setLoading(false); // Set loading kembali menjadi false
    };

    return (
        <Layout>
        <h1 className="text-3xl font-bold mb-6">Transaction Detail</h1>

        {transaction ? (
            <div>
            <p><strong>Invoice ID:</strong> {transaction.invoice_id}</p>
            <p><strong>Amount:</strong> {transaction.total_amount}</p>
            <p><strong>Status:</strong> {transaction.status}</p>
            <p><strong>Date:</strong> {transaction.order_date}</p>
            <p><strong>Title:</strong> {transaction.transaction_items?.sport_activities?.title}</p>
            <p><strong>proof_payment_url:</strong> {transaction.proof_payment_url}</p>
                <div className="mt-6">
                    <button
                    onClick={handleApproveStatus}
                    className="ml-4 bg-green-500 text-white p-2 rounded"
                    disabled={loading} // Disable tombol saat sedang loading
                    >
                    {loading ? "Approving..." : "Approve"}
                    </button>
                </div>
            </div>
            
        ) : (
            <p>Loading transaction details...</p>
        )}
        </Layout>
    );
}
