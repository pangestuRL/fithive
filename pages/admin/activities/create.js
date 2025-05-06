import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axiosInstance"; 
import Layout from "@/src/components/admin/layout";
import { useRouter } from "next/router";

export default function CreateActivity() {
  const [sportCategories, setSportCategories] = useState([]); 
  const [cities, setCities] = useState([]);
  const router = useRouter();
  const [newActivity, setNewActivity] = useState({
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
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
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

    fetchSportCategories();
    fetchCities();
    setLoading(false); 
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewActivity({
      ...newActivity,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      sport_category_id: parseInt(newActivity.sport_category_id),
      city_id: parseInt(newActivity.city_id),
      title: newActivity.title,
      description: newActivity.description,
      slot: parseInt(newActivity.slot),
      price: parseInt(newActivity.price),
      address: newActivity.address,
      activity_date: newActivity.activity_date,
      start_time: newActivity.start_time,
      end_time: newActivity.end_time,
      map_url: newActivity.map_url,
    };

    try {
        console.log(payload);
        await axiosInstance.post("/sport-activities/create", payload);
        alert("Activity created successfully!");
        setNewActivity({
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
        router.push("/admin/activities");
    } catch (error) {
      console.error("Error creating activity:", error);
      alert("Failed to create activity.");
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Create Activity</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Activity Information</h2>

          {/* Sport Category Dropdown */}
          <div className="mb-4">
            <label className="block text-lg mb-2">Sport Category</label>
            <select
              name="sport_category_id"
              value={newActivity.sport_category_id}
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

          {/* City Dropdown */}
          <div className="mb-4">
            <label className="block text-lg mb-2">City</label>
            <select
              name="city_id"
              value={newActivity.city_id}
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
              value={newActivity.title}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg mb-2">Description</label>
            <textarea
              name="description"
              value={newActivity.description}
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
              value={newActivity.slot}
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
              value={newActivity.price}
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
              value={newActivity.address}
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
              value={newActivity.activity_date}
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
              value={newActivity.start_time}
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
              value={newActivity.end_time}
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
              value={newActivity.map_url}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Create Activity
          </button>
        </form>
      )}
    </Layout>
  );
}