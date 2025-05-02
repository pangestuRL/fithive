import Link from 'next/link';
import axiosInstance from '@/lib/axiosInstance';
import Footer from "@/src/components/footer";
import Navbar from "@/src/components/Navbar";


export async function getServerSideProps() {
    try {
      const resp = await axiosInstance.get('/sport-activities');
  
      const activities = resp?.data?.result?.data ?? [];
  
      return {
        props: {
          activities,
        },
      };
    } catch (error) {
      console.error('Error fetching activities:', error.message);
      return {
        props: {
          activities: [],
        },
      };
    }
  }

  

export default function ActivitiesPage({ activities }) {

  return (
    <div>
        <Navbar/>
        <div className="px-20 pt-11 pb-10">
            <div className="w-full bg-[#0E3B61] py-14 flex justify-center items-center my-7">
                <h2 className="text-white text-3xl font-bold tracking-wide">
                    ACTIVITY
                </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {activities.map((activity) => (
                <Link
                  key={activity.id}
                  href={`/activities/${activity.id}`}
                  className="block border rounded-2xl p-5 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out cursor-pointer bg-white"
                >
                  <h2 className="text-xl font-semibold mb-2">{activity.title}</h2>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <span>{activity.sport_category?.name || "Olahraga"}</span>
                    <span>•</span>
                    <span>Newbie - Beginner</span>
                  </div>
                  <p className="text-gray-600 mb-2">
                    📅{activity.activity_date}, {activity.start_time.slice(0, 5)} - {activity.end_time.slice(0, 5)}
                  </p>
                  <p className="text-gray-600 mb-2">
                    Rp. {activity.price.toLocaleString('id-ID')}
                  </p>
                </Link>
              ))}
            </div>

        </div>
        <Footer/>
    </div>
    
  );
}
