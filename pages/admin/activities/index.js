import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axiosInstance"; 
import Layout from "@/src/components/admin/layout"; 
import { useRouter } from "next/router";

export default function Activities() {
  const [activities, setActivities] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const router = useRouter(); 

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axiosInstance.get('/sport-activities');
        const activities = response?.data?.result?.data ?? [];
        console.log(activities);
        setActivities(activities);
      } catch (error) {
        console.error("Error fetching activities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const handleCreateActivity = () => {
    router.push("/admin/activities/create"); 
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this activity?")) {
      try {
        await axiosInstance.delete(`/sport-activities/delete/${id}`);
        alert("Activity deleted successfully!");
        setLoading(true);
        const response = await axiosInstance.get("/sport-activities");
        setActivities(response.data.result);
        setLoading(false);
      } catch (error) {
        console.error("Error deleting activity:", error);
      }
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Activities Management</h1>

      <button
        onClick={handleCreateActivity}
        className="bg-blue-500 text-white p-3 rounded mb-6"
      >
        Create New Activity
      </button>

      {loading ? (
        <p>Loading activities...</p>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">List of Activities</h2>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="border px-4 py-2">Title</th>
                <th className="border px-4 py-2">City</th>
                <th className="border px-4 py-2">Category</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {activities.length > 0 ? (
                activities.map((activity) => (
                  <tr key={activity.id}>
                    <td className="border px-4 py-2">{activity.title}</td>
                    <td className="border px-4 py-2">{activity.city.city_name}</td>
                    <td className="border px-4 py-2">{activity.sport_category == null ? "other sport" : activity.sport_category.name}</td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => window.location.href = `/admin/activities/edit/${activity.id}`}
                        className="bg-yellow-500 text-white p-2 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        // onClick={() => handleDelete(activity.id)}
                        className="bg-red-500 text-white p-2 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center border px-4 py-2">
                    No activities available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
}
