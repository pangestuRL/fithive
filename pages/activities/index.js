import Link from 'next/link';
import axiosInstance from '@/lib/axiosInstance';
import Footer from "@/src/components/footer";
import Navbar from "@/src/components/Navbar";
import { useState, useEffect } from 'react';
import Breadcrumb from '@/src/components/Breadcrumb';

export async function getServerSideProps(context) {
  const { query } = context;
  const { search = '', city = '', sport_category = '', page = 1 } = query;

  try {
    const resp = await axiosInstance.get('/sport-activities', {
      params: {
        per_page: 100,
        page,
        search,
        city,
        sport_category
      }
    });
    const activities = resp?.data?.result?.data ?? [];

    const citiesResp = await axiosInstance.get('/location/cities', {
      params: {
        is_paginate: true,
        per_page: 1000,
        page: 1,
      }
    });
    const cities = citiesResp?.data?.result?.data ?? [];
    
    const sportCategoriesResp = await axiosInstance.get('/sport-categories', {
      params: {
        is_paginate: true,
        per_page: 100,
        page: 1,
      }
    });
    const sportCategories = sportCategoriesResp?.data?.result?.data ?? [];

    return {
      props: {
        activities,
        cities,
        sportCategories,
      },
    };
  } catch (error) {
    console.error('Error fetching activities:', error.message);
    return {
      props: {
        activities: [],
        cities: [],
        sportCategories: [],
      },
    };
  }
}

export default function ActivitiesPage({ activities, cities, sportCategories }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [city, setCity] = useState("");
  const [sportCategory, setSportCategory] = useState("");
  const [filteredActivities, setFilteredActivities] = useState(activities);

  useEffect(() => {
    const formattedData = activities.map(activity => {
      const date = new Date(activity.activity_date);
      const formattedDate = date.toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const formattedTime = `${activity.start_time?.slice(0, 5)} - ${activity.end_time?.slice(0, 5)}`;
      
      return {
        ...activity,
        formattedDate,
        formattedTime,
      };
    });

    setFilteredActivities(formattedData);
  }, [activities]);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleCityChange = (e) => setCity(e.target.value);
  const handleSportCategoryChange = (e) => setSportCategory(e.target.value);

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    const filtered = activities.filter(activity => {
      const matchesSearch = activity.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCity = city ? activity.city_id === parseInt(city) : true;
      const matchesCategory = sportCategory ? activity.sport_category_id === parseInt(sportCategory) : true;

      return matchesSearch && matchesCity && matchesCategory;
    });

    const formattedFilteredData = filtered.map(activity => {
      const date = new Date(activity.activity_date);
      const formattedDate = date.toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const formattedTime = `${activity.start_time?.slice(0, 5)} - ${activity.end_time?.slice(0, 5)}`;

      return {
        ...activity,
        formattedDate,
        formattedTime,
      };
    });

    setFilteredActivities(formattedFilteredData);
  };

  return (
    <div>
      <Navbar />
      <div className="px-6 md:px-20 pt-20 pb-10 md:py-14">
        <div className="bg-[#0E3B61] p-4 mt-4">
          <Breadcrumb />
        </div>
        <div className="w-full bg-[#0E3B61] pb-20 pt-10 flex justify-center items-center">
          <h2 className="text-white text-3xl font-bold tracking-wide">
            ACTIVITY
          </h2>
        </div>

        <form onSubmit={handleSearchSubmit} className="flex flex-wrap justify-center gap-5 my-6">
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Masukkan nama aktivitas"
              className="p-4 border rounded-lg"
            />
          </div>

          <div className="flex items-center gap-3">
            <select
              value={city}
              onChange={handleCityChange}
              className="p-4 border rounded-lg"
            >
              <option value="">Pilih Kota</option>
              {cities.map((cityItem) => (
                <option key={cityItem.city_id} value={cityItem.city_id}>
                  {cityItem.city_name_full}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={sportCategory}
              onChange={handleSportCategoryChange}
              className="p-4 border rounded-lg"
            >
              <option value="">Pilih Cabang Olahraga</option>
              {sportCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="bg-blue-500 text-white p-3 rounded-lg"
              >
                Cari Aktivitas
              </button>
            </div>
          </div> 
        </form>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredActivities.length > 0 ? (
            filteredActivities.map((activity) => {
              return (
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
                  <p className="text-gray-600 mb-2">📅 : {activity.formattedDate}</p>
                  <p className="text-gray-600 mb-2">🕛 : {activity.formattedTime}</p>
                  <p className="text-gray-600 mb-2">💸 : Rp. {activity.price?.toLocaleString("id-ID")}</p>
                </Link>
              );
            })
          ) : (
            <p className="text-center col-span-3">No activities found.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
