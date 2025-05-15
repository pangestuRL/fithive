import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const testimonies = [
  {
    name: "Opi Hovidin",
    title: "Backbone Indonesia",
    image: "/images/opi-hovidin-1.png",
    quote:
      "FitHive Indonesia membawa revolusi di kalangan penggemar olahraga. Aplikasi ini memudahkan pencarian aktivitas olahraga, mengembangkan komunitas olahraga, dan memesan tempat olahraga. Ini adalah ekosistem olahraga yang menyeluruh.",
  },
  {
    name: "Dita Sujana",
    title: "Komunitas Runners ID",
    image: "/images/dita-sujana-1.png",
    quote:
      "Fitur Aplikasi FitHive yang paling menarik buat gue itu fitur Mabar karena fitur ini ngebantu gue sebagai admin komunitas fun football buat nyari tambahan teman main baru yang sehobi lewat aplikasi.",
  },
  {
    name: "Bayu AP",
    title: "Kawan AYO",
    image: "/images/bayu-ap-1.png",
    quote:
      "Karena mabar di aplikasi FitHive indonesia jadi bisa seru-seruan dan dapet temen baru, bahkan bisa mewujudkan cita-cita gue main bareng Bayu Saptaji, kapten timnas. Pilihan mabarnya juga banyak jadi bisa main kapanpun mau main bola atau futsal.",
  },
];

const Testimoni = () => {
  const [index, setIndex] = useState(0);
  const total = testimonies.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % total);
    }, 10000);
    return () => clearInterval(interval);
  }, [total]);

  const prev = () => setIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  const next = () => setIndex((prev) => (prev + 1) % total);

  return (
    <section className="flex flex-col  mx-0 md:mx-10 md:flex-row items-center justify-center bg-[#002D55] text-white py-10 px-4 md:px-16 my-5"
        style={{ backgroundImage: "url('/images/testi-bg.avif')" }}>
        <div className="relative flex-1 text-center md:text-left mb-5">
            <div className="absolute top-2 left-2 text-[80px] opacity-10">“</div>
            <h2 className="text-2xl md:text-3xl font-bold relative z-10">
                Apa kata Kawan FitHive?
            </h2>
        </div>

        <div className="flex-1 bg-white text-black p-6 rounded-lg shadow-lg overflow-hidden relative h-[260px] md:h-auto">
            <AnimatePresence mode="wait">
            <motion.div
                key={index}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
            >
                <div className="flex items-center gap-4 mb-4">
                <Image
                    src={testimonies[index].image}
                    alt={testimonies[index].name}
                    width={50}
                    height={50}
                    className="rounded-full"
                />
                <div>
                    <p className="font-bold">{testimonies[index].name}</p>
                    <p className="text-sm text-gray-500">{testimonies[index].title}</p>
                </div>
                </div>
                <p className="text-sm leading-relaxed">
                “{testimonies[index].quote}”
                </p>
                <div className="absolute top-0 right-0 text-3xl text-[#002D55] font-bold">
                &rdquo;
                </div>
                <div className="flex items-center justify-between mt-6 text-xs text-gray-500">
                <span className="font-bold text-[#002D55]">
                    {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
                <div className="flex gap-2">
                    <button
                    onClick={prev}
                    className="p-1 hover:text-[#004e92] transition"
                    >
                    &larr;
                    </button>
                    <button
                    onClick={next}
                    className="p-1 hover:text-[#004e92] transition"
                    >
                    &rarr;
                    </button>
                </div>
                </div>
            </motion.div>
            </AnimatePresence>
        </div>
    </section>
  );
};

export default Testimoni;
