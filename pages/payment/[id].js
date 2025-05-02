import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/footer";

export default function PaymentPage() {
  const router = useRouter();
  const { id } = router.query;
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      axiosInstance.get(`/sport-activities/${id}`)
        .then((res) => {
          setActivity(res.data.result);
        })
        .catch((err) => {
          console.error("Failed to fetch activity:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  const handlePayment = () => {
    // Simulasi proses pembayaran atau redirect ke payment gateway
    alert("Pembayaran berhasil! 🎉");
    router.push("/success"); // Bisa arahkan ke halaman success
  };

  if (loading) return <div className="text-center p-10">Loading...</div>;

  if (!activity) return <div className="text-center p-10">Aktivitas tidak ditemukan.</div>;

  return (
    <div>
      <Navbar />
      <div className="p-10">
        <h1 className="text-2xl font-bold mb-4">Pembayaran</h1>
        <p className="mb-2">Aktivitas: <strong>{activity.title}</strong></p>
        <p className="mb-2">Harga: Rp {activity.price.toLocaleString("id-ID")}</p>
        <p className="mb-6">Tanggal: {new Date(activity.activity_date).toLocaleDateString("id-ID")}</p>
        <button
          onClick={handlePayment}
          className="bg-[#F4811F] hover:bg-amber-500 text-white font-semibold py-2 px-4 rounded"
        >
          Bayar Sekarang
        </button>
      </div>
      <Footer />
    </div>
  );
}
