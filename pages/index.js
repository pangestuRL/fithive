import Footer from "@/src/components/footer";
import Navbar from "@/src/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";

function Home () {
  const token = Cookies.get('accessToken');

  return (
    <div>
      <Navbar/>
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
            Sport Community App
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8">
          Temukan Komunitas Olahraga di sini, Olahraga makin mudah dan menyenangkan!
          </p>
          <Link href="/activities" className="inline-block">
            <button disabled={!token} className="px-6 py-3 bg-orange-500 hover:bg-primary/80 text-white font-semibold rounded-3xl transition">
              Gabung Sekarang
            </button>
          </Link>
        </div>
      </section>
      

      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          
          <div className="w-[400px] flex justify-center">
            <div className="relative w-full h-80 md:h-[500px] rounded-lg overflow-hidden shadow-md">
              <Image src="/images/lapangan.png" alt="Venue Hero" fill className="object-cover" />
            </div>
          </div>

          <div className="w-full md:w-1/2 text-gray-700 text-lg leading-relaxed space-y-6">
            <p>
              <span className="font-bold">FitHive</span> adalah platform booking aktivitas olahraga yang dirancang untuk memudahkan kamu menemukan dan memesan kegiatan olahraga dengan cepat dan praktis dari olahraga favoritmu semua ada di ujung jari kamu.
            </p>
            <p>
              Kami percaya bahwa olahraga bukan hanya soal kebugaran, tapi juga soal komunitas dan kebersamaan.
              Di FitHive, kami menciptakan "sarang" bagi para pecinta olahraga—tempat di mana kamu bisa terhubung, beraktivitas, dan berkembang bersama.
            </p>
            <p className="font-bold">
              Olahraga jadi lebih mudah, seru, dan terorganisir. <br />
              FitHive, your active space!
            </p>
          </div>

        </div>
      </section>
      <Footer/>
    </div>
  )
}

export default Home;