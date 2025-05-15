import Footer from "@/src/components/footer";
import Navbar from "@/src/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import Testimoni from "@/src/components/Testimoni";

function Home() {
  const [token, setToken] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCategoryImage = (categoryName) => {
    const categoryImages = {
      "Mini Soccer": "/images/categories/mini-soccer.PNG",
      "Badminton": "/images/categories/badminton.jpeg",
      "Baseball": "/images/categories/baseball.PNG",
      "Squash": "/images/categories/squash.jpg",
      "Hockey": "/images/categories/Hockey.PNG",
      "Running": "/images/categories/running.PNG",
      "Padel": "/images/categories/padel.jpg",
      "Tenis Meja": "/images/categories/tenis-meja.jpg",
      "Fitnes": "/images/categories/fitnes.jpg",
      "Billiard": "/images/categories/billiard.png",
      "Bulu Tangkis": "/images/categories/badminton.jpeg",
      "panah": "/images/categories/panah.jpg",
      "Futsal": "/images/categories/futsal.jpg",
      "Basketball": "/images/categories/basketball.PNG"
    };

    return categoryImages[categoryName] || "/images/categories/default.jpg";
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    setToken(storedToken);

    async function fetchCategories() {
      try {
        const response = await axiosInstance.get("/sport-categories");
        setCategories(response.data.result.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return (
    <div>
      <Navbar />
      <section className="relative h-screen flex items-center justify-start overflow-hidden pt-28">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/Navbar/sport.jpg"
            alt="Hero Background"
            fill
            className="object-cover object-center"
          />
        </div>
        <div className="text-left px-6 max-w-xl pl-20">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
            Super Sport
          </h1>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">Community App</h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 text-justify">
            Platform all-in-one untuk sewa lapangan, cari lawan sparring, atau cari kawan main bareng. Olahraga makin mudah dan menyenangkan!
          </p>
          <Link href="/activities" className="inline-block">
            <button
              className='bg-orange-500 hover:bg-primary/80 text-white font-semibold rounded-3xl transition p-3'>
              Gabung Sekarang
            </button>
          </Link>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          <div className="w-[400px] flex justify-center">
            <div className="relative w-full h-80 md:h-[500px] rounded-lg overflow-hidden shadow-md">
              <Image
                src="/images/lapangan.PNG"
                alt="Venue Hero"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="w-full md:w-1/2 text-gray-700 text-lg leading-relaxed space-y-6 text-justify">
            <p>
              <span className="font-bold">FitHive</span> adalah platform booking aktivitas olahraga yang dirancang untuk memudahkan kamu menemukan dan memesan kegiatan olahraga dengan cepat dan praktis dari olahraga favoritmu semua ada di ujung jari kamu.
            </p>
            <p>
              Kami percaya bahwa olahraga bukan hanya soal kebugaran, tapi juga soal komunitas dan kebersamaan. Di FitHive, kami menciptakan "sarang" bagi para pecinta olahraga—tempat di mana kamu bisa terhubung, beraktivitas, dan berkembang bersama.
            </p>
            <p className="font-bold">
              Olahraga jadi lebih mudah, seru, dan terorganisir. <br />
              FitHive, your active space!
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">
          Explore Categories
        </h2>
        {loading ? (
          <div className="text-center text-gray-500">Loading categories...</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
            {categories.map((category) => (
              <div
                key={category.id}
                className="relative flex flex-col items-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
              >
                <div className="relative w-full h-32 md:h-48 rounded-lg overflow-hidden group">
                  <Image
                    src={getCategoryImage(category.name)}
                    alt={category.name}
                    layout="fill"
                    objectFit="cover"
                    className="absolute inset-0 group-hover:brightness-125 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <h3 className="text-white text-xl font-semibold">{category.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      <Testimoni/>
      <Footer />
    </div>
  );
}

export default Home;
