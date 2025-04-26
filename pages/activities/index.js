import Link from 'next/link';
import axios from 'axios';
import Footer from "@/src/components/footer";
import Navbar from "@/src/components/Navbar";

export async function getServerSideProps() {
    try {
      const resp = await axios.get(
        'https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/sport-activities?per_page=100&page=1'
      );
  
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
                <div key={activity.id} className="border rounded-lg p-4 shadow">
                    <h2 className="text-xl font-semibold mb-2">{activity.title}</h2>
                    <p className="text-gray-600 mb-2">📅{activity.activity_date}, {activity.start_time.slice(0,5)} - {activity.end_time.slice(0,5)}</p>
                    <p className="text-gray-600 mb-2">Rp. {activity.price.toLocaleString('id-ID')}</p>
                    <Link href={`/activities/${activity.id}`} className="text-blue-600 hover:underline">
                        Lihat Detail
                    </Link>
                </div>
                ))}
            </div>
        </div>
        <Footer/>
    </div>
    
  );
}
