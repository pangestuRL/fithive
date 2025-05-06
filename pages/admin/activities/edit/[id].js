import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axiosInstance from "@/lib/axiosInstance";
import Layout from "@/src/components/admin/layout"; 

export default function EditActivity() {
  const router = useRouter();
  const { id } = router.query; 
  const [activity, setActivity] = useState(null); 
  const [sportCategories, setSportCategories] = useState([]); 
  const [cities, setCities] = useState([]);
  const [formData, setFormData] = useState({
    sport_category_id: "",
    city_id: "",
    title: "",
    description: "",
    slot: "",
    price: "",
    address: "",
    activity_date: "",
    start_time: "",
    end_time: "",
    map_url: "",
  }); 

  useEffect(() => {
    if (id) {
      const fetchActivity = async () => {
        try {
          const response = await axiosInstance.get(`/sport-activities/${id}`);
          console.lo
          setActivity(response.data.result);
          setFormData(response.data.result);
        } catch (error) {
          console.error("Error fetching activity:", error);
        }
      };

      const fetchSportCategories = async () => {
        try {
          const response = await axiosInstance.get("/sport-categories");
          setSportCategories(response.data.result.data);
        } catch (error) {
          console.error("Error fetching sport categories:", error);
        }
      };

      const fetchCities = async () => {
        try {
          const response = await axiosInstance.get("/location/cities");
          setCities(response.data.result.data);
        } catch (error) {
          console.error("Error fetching cities:", error);
        }
      };

      fetchActivity();
      fetchSportCategories();
      fetchCities();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Fungsi untuk handle submit form (update activity)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
        sport_category_id: parseInt(formData.sport_category_id),
        city_id: parseInt(formData.city_id),
        title: formData.title,
        description: formData.description,
        slot: parseInt(formData.slot),
        price: parseInt(formData.price),
        address: formData.address,
        activity_date: formData.activity_date,
        start_time: formData.start_time.length == 8 ? formData.start_time.slice(0,5) : formData.start_time,
        end_time: formData.end_time.length == 8 ? formData.end_time.slice(0,5) : formData.end_time,
        map_url: formData.map_url,
    };

    try {
        console.log(payload);
        await axiosInstance.post(`/sport-activities/update/${id}`, payload);
        alert("Activity updated successfully!");
        router.push("/admin/activities"); 
    } catch (error) {
        console.error("Error updating activity:", error);
        alert("Failed to update activity.");
    }
  };

  if (!activity) return <p>Loading...</p>;

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Edit Activity</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Activity Information</h2>

        {/* Sport Category Dropdown */}
        <div className="mb-4">
          <label className="block text-lg mb-2">Sport Category</label>
          <select
            name="sport_category_id"
            value={formData.sport_category_id}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Sport Category</option>
            {sportCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-lg mb-2">City</label>
          <select
            name="city_id"
            value={formData.city_id}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city.city_id} value={city.city_id}>
                {city.city_name}
              </option>
            ))}
          </select>
        </div>

        {/* Other Form Inputs */}
        <div className="mb-4">
          <label className="block text-lg mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg mb-2">Slot</label>
          <input
            type="number"
            name="slot"
            value={formData.slot}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg mb-2">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg mb-2">Activity Date</label>
          <input
            type="date"
            name="activity_date"
            value={formData.activity_date}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg mb-2">Start Time</label>
          <input
            type="time"
            name="start_time"
            value={formData.start_time}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg mb-2">End Time</label>
          <input
            type="time"
            name="end_time"
            value={formData.end_time}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg mb-2">Map URL</label>
          <input
            type="url"
            name="map_url"
            value={formData.map_url}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Update Activity
        </button>
      </form>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  return {
    props: {
      activityId: params.id, 
    },
  };
}
