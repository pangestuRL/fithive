import axiosInstance from "@/lib/axiosInstance";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/footer";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useActivityStore } from "../../src/stores/activityStore";
import Breadcrumb from "@/src/components/Breadcrumb";

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const response = await axiosInstance.get(`/sport-activities/${id}`);

    const activity = response?.data?.result ?? null;

    return {
      props: {
        activity,
      },
    };
  } catch (error) {
    console.error("Error fetching activity detail:", error.message);
    return {
      notFound: true,
    };
  }
}

export default function ActivityDetailPage({ activity }) {
  const router = useRouter();
  const [formattedDate, setFormattedDate] = useState("");
  const [formattedTime, setFormattedTime] = useState("");
  const { setActivity } = useActivityStore();
  // const [token, setToken] = useState(null);

  if (!activity) {
    return <div className="p-10 text-center">Activity tidak ditemukan.</div>;
  }

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

  // useEffect(() => {
  //   const storedToken = localStorage.getItem("token");
  //   console.log(storedToken);
  //   setToken(storedToken);
  // }, []);

  const handleJoin = () => {
    const token = localStorage.getItem("accessToken");
    if(!token) {
      alert('Please login first!');
      router.push('/login');
      return;
    }
    setActivity(activity);
    router.push(`/checkout/${activity.id}`);
  }

  return (
    <div>
      <Navbar />
      <div className="px-6 md:px-20 pt-20 pb-10 md:py-14">
        <div className="bg-[#0E3B61] p-4 mt-4">
          <Breadcrumb/>
        </div>
        <div className="w-full bg-[#0E3B61] py-10 pl-6">
          <h2 className="text-white text-3xl font-bold tracking-wide">{activity.title}</h2>
          <div className="flex items-center text-sm text-white mb-4 mt-2">
            <span className="bg-[#F4811F] text-white px-2 py-0.5 rounded-l">{activity.sport_category?.name || "Olahraga"}</span>
            <span className="bg-[#F4811F] text-white px-2 py-0.5">•</span>
            <span className="bg-[#F4811F] text-white px-2 py-0.5 rounded-r">Newbie - Beginner</span>
          </div>
          <div className="flex items-center -space-x-3 mt-3 mb-1">
            {activity?.participants?.slice(0, 5).map((participant, index) => (
              <img
                key={index}
                src={`https://ui-avatars.com/api/?name=${participant.user.name}&background=0E3B61&color=fff`}
                alt={participant.user.name}
                className="w-10 h-10 rounded-full border-2 border-white object-cover"
              />
            ))}
            {activity?.participants?.length > 5 && (
              <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-sm font-semibold text-gray-600">
                +{activity.participants.length - 5}
              </div>
            )}
          </div>
          <span className="bg-white text-[#0E3B61] text-xs font-semibold px-3 rounded">
            {activity.participants.length}/{activity.slot} Bergabung
          </span>
        </div>

        <div className="flex flex-wrap md:justify-between gap-6">
          <div className="md:w-2/3 md:item-center">
            <p className="font-semibold text-xl pt-6">🧿 Tentang</p>
            <p className="pt-6 text-gray-600 text-justify">
              Aktivitas olahraga ini dirancang untuk memberikan pengalaman yang menyenangkan, menyehatkan, dan bermanfaat 
              bagi semua kalangan. Dengan fasilitas yang mendukung dan suasana yang nyaman, setiap sesi menjadi kesempatan 
              sempurna untuk meningkatkan kebugaran, menjalin kebersamaan, dan mengisi waktu luang secara positif. Cocok 
              untuk pemula maupun yang sudah berpengalaman, kegiatan ini dapat dinikmati sendiri maupun bersama teman dan 
              keluarga.
            </p>
            <div className="bg-white rounded-xl pl-12 pt-5 space-y-4 mt-6">
              <p className="text-gray-600">
                <span className="font-medium">🏅 :</span> {activity.sport_category?.name || "Tidak tersedia"}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">📅 :</span> {formattedDate}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">🕛 :</span> {formattedTime}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">💸 :</span> Rp. {activity.price?.toLocaleString("id-ID")}
              </p>
              <p className="text-base text-gray-800">📍 : {activity.address}</p>
              <p className="text-gray-600 whitespace-pre-wrap">
                <span className="font-medium">📝 :</span> {activity.description}
              </p>
              <div>
                <h3 className="text-base font-semibold text-gray-600">Kontak Penyelenggara:</h3>
                <p className="text-base text-gray-800">{activity.organizer.name}</p>
                <a href={`mailto:${activity.organizer.email}`} className="text-base">
                  {activity.organizer.email}
                </a>
              </div>
            </div>
          </div>

          <div className="bg-[#0E3B61] w-full md:w-1/4 rounded-2xl max-w-[350px] p-6 mt-7">
            <p className="font-bold text-2xl text-white">Rp. {activity.price?.toLocaleString("id-ID")} <span className="text-white text-base font-medium">/ peserta</span></p>
            <p className="text-white text-base font-medium pt-2">Hanya menyediakan {activity.slot} slot</p>
            <div className="flex justify-center">
              <button
                onClick={handleJoin}
                className="w-full m-4 bg-[#F4811F] hover:bg-amber-500 text-white justify-center font-semibold py-2 rounded-lg mb-6"
              >
                Gabung Main
              </button>
            </div>
            <div className="w-full h-px bg-gray-300"></div>
            <div className="flex ml-6 gap-2 mt-6">
              <p>🔸</p>
              <div>
                <p className="font-semibold text-white">Waktu & Tanggal</p>
                <p className="text-white text-sm font-extralight">{formattedDate}</p>
                <p className="text-white text-sm font-extralight">{formattedTime}</p>
              </div>
            </div>
            <div className="flex ml-6 gap-2 mt-2">
              <p>🔸</p>
              <div>
                <p className="font-semibold text-white">Lokasi</p>
                <p className="text-white text-sm font-extralight">{activity.address}</p>
              </div>
            </div>
          </div>
        </div>

        <p className="font-semibold text-xl pl-6 pt-6">🧿 Lokasi</p>
        <p className="ml-8 mt-6">{activity.address}</p>
        {activity.map_url && (
          <div className="mt-6 ml-6">
            <iframe
              width="100%"
              height="400"
              style={{ border: 0 }}
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3965.1188418891343!2d106.74067767499169!3d-6.378657193611667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNsKwMjInNDMuMiJTIDEwNsKwNDQnMzUuNyJF!5e0!3m2!1sen!2sid!4v1746152529220!5m2!1sen!2sid"/>
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
}
