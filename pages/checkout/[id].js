import axiosInstance from "@/lib/axiosInstance";
import { useActivityStore } from "../../src/stores/activityStore";
import Navbar from "@/src/components/Navbar";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";


export default function CheckoutPage () {
  const router = useRouter();
  const { activity } = useActivityStore();
  const [formattedDate, setFormattedDate] = useState("");
  const [formattedTime, setFormattedTime] = useState("");
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  console.log("paymentMethods:", paymentMethods);
  useEffect(() => {
    if (activity?.activity_date) {
      const date = new Date(activity.activity_date);
      setFormattedDate(date.toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }));
      setFormattedTime(`${activity.start_time?.slice(0, 5)} - ${activity.end_time?.slice(0, 5)}`);
    }
  }, [activity]);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await axiosInstance.get(`/payment-methods`);
        setPaymentMethods(response.data.result);
      } catch (error) {
        console.error("Gagal mengambil metode pembayaran:", error);
      }
    };

    fetchPaymentMethods();
  }, []);

  const handleConfirmOrder = async () => {
    if (!selectedPaymentMethod) return;

    try {
      const response = await axiosInstance.post("/transaction/create", {
        sport_activity_id: activity.id,
        payment_method_id: selectedPaymentMethod.id,
      });

      console.log("Transaksi berhasil:", response.data);
      router.push(`/profile`)
    } catch (error) {
      console.error("Gagal membuat transaksi:", error);
    }
  };

  if (!activity) return <p>Activity tidak ditemukan.</p>;

  return (
    <div>
      <Navbar/>
      <div className="mx-20 mt-20">
        <h2 className="pt-6 font-bold text-xl">Gabung Aktivitas Seru!</h2>
        <p className="pt-2 text-gray-600">Segera lakukan konfirmasi registrasi aktivitas yang akan Kamu ikuti.
          <br/>Berikut detail pembayaran yang harus Kamu selesaikan:
        </p>
      </div>
      
      

      <div className="max-w-sm mx-auto border rounded-xl p-4 shadow-lg">
        <div className="flex items-start space-x-2 mb-4">
          <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 4l8 6-8 6V4z" clipRule="evenodd" />
          </svg>
          <h2 className="font-bold text-lg">Rincian Biaya</h2>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Biaya Main Bareng</span>
          </div>
          <div className="flex justify-between font-medium">
            <span>Regular (x1)</span>
            <span>Rp.{" "}{activity.price?.toLocaleString("id-ID")}</span>
          </div>
          <div className="flex justify-between">
            <span>Convenience Fee</span>
            <span>Rp0</span>
          </div>
          <div className="flex justify-between">
            <span>Biaya Layanan</span>
            <span>Rp0</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between font-semibold">
            <span>Total Bayar</span>
            <span>Rp.{" "}{activity.price?.toLocaleString("id-ID")}</span>
          </div>
        </div>

        <div className="mt-4">
          <select
            className="w-full p-2 border rounded bg-gray-100 text-gray-700"
            value={selectedPaymentMethod?.id ?? ""}
            onChange={(e) => {
              const selected = paymentMethods.find(method => method.id === parseInt(e.target.value));
              setSelectedPaymentMethod(selected);
            }}>
            <option value="">Pilih metode pembayaran</option>
            {paymentMethods.map((method) => (
              <option key={method.id}  value={method.id} className="flex items-center gap-2 py-1">
                <img src={method.image_url} alt={method.name} className="w-6 h-6 object-contain" />
                <span>{method.name}</span>
              </option>
            ))}
          </select>
        </div>

        <p className="text-xs text-gray-600 mt-2">
          Dengan mengklik tombol berikut,<br />
          Anda menyetujui{" "}
          <a href="#" className="font-semibold underline">Syarat dan Ketentuan</a> serta{" "}
          <a href="#" className="font-semibold underline">Kebijakan privasi</a>.
        </p>

        <button 
          onClick={handleConfirmOrder}
          className="mt-4 w-full bg-[#003c5e] text-white font-semibold py-2 rounded hover:bg-[#002c45]">
          Konfirmasi
        </button>
      </div>

    </div>
  )
}