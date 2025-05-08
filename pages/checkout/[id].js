import axiosInstance from "@/lib/axiosInstance";
import { useActivityStore } from "../../src/stores/activityStore";
import Navbar from "@/src/components/Navbar";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Breadcrumb from "@/src/components/Breadcrumb";


export default function CheckoutPage () {
  const router = useRouter();
  const { activity } = useActivityStore();
  const [formattedDate, setFormattedDate] = useState("");
  const [formattedTime, setFormattedTime] = useState("");
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [accountNumber, setAccountNumber] = useState("");

  const [image, setImage] = useState(null); 
  const [imageUrl, setImageUrl] = useState(""); 
  const [loading, setLoading] = useState(false);

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
    console.log(imageUrl);

    try {
      const response = await axiosInstance.post("/transaction/create", {
        sport_activity_id: activity.id,
        payment_method_id: selectedPaymentMethod.id,
      });

      console.log("Transaksi berhasil:", response.data);
      console.log(response.data.error);
      if(response.data.error === false){
        const transId = response.data.result.id;
        console.log(transId);
        try {
          const proofResp = await axiosInstance.post(`/transaction/update-proof-payment/${transId}`, {
            proof_payment_url: imageUrl,
          });
          console.log(proofResp.data);

          router.push(`/profile`);
        }catch(error){

        }
        
      }
      
    } catch (error) {
      console.error("Gagal membuat transaksi:", error);
    }
  };


  if (!activity) return <p>Activity tidak ditemukan.</p>;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleUploadImage = async () => {
    if (!image) {
      alert("Please select an image file first!");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await axios.post(
        "https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/upload-image",
        
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", 
            "Accept": "application/json",
          },
        }
      );

      if (!response.data.error) {
        setImageUrl(response.data.result);
        alert("Image uploaded successfully!");
      } else {
        alert("Failed to upload image.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image.");
    }

    setLoading(false);
  };

  const handleBack = () => {
    router.back(); 
  };

  return (
    <div className="mt-24">
      <Navbar/>
      <button onClick={handleBack} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 ml-20">
        Kembali
      </button>
      <div className="mb-10">
        <h2 className="pt-6 font-bold text-xl text-center">Gabung Aktivitas Seru!</h2>
        <p className="pt-2 text-gray-600 text-center">Segera lakukan konfirmasi registrasi aktivitas yang akan Kamu ikuti.
          <br/>Berikut detail pembayaran yang harus Kamu selesaikan:
        </p>
      </div>
      
      <div className="max-w-sm mx-auto border rounded-xl p-4 shadow-lg">
        <div className="flex items-start space-x-2 mb-4">
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

              setAccountNumber(selected?.account_number ?? ""); 
            }}
          >
            <option value="">Pilih metode pembayaran</option>
            {paymentMethods.map((method) => (
              <option key={method.id} value={method.id}>
                {method.name}
              </option>
            ))}
          </select>
        </div>

        {selectedPaymentMethod && (
          <div>
            <p className="mt-4">Silahkan upload bukti transfer ke :</p>
            <div className="flex items-center"><img
                src={selectedPaymentMethod.image_url}
                alt={selectedPaymentMethod.name}
                className="w-6 h-6 object-contain mr-2"
              />
              <span>{selectedPaymentMethod.virtual_account_number}</span>
            </div>
          </div>
          
        )}

        {selectedPaymentMethod && accountNumber && (
          <p className="mt-2 text-sm text-gray-600">
            Nomor Rekening: <strong>{accountNumber}</strong>
          </p>
        )}

        <div className="my-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="p-3 border rounded"
          />
        </div>

        <button
          onClick={handleUploadImage}
          className="bg-blue-500 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload Image"}
        </button>

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