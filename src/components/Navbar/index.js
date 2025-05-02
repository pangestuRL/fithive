import Image from "next/image";
import Link from "next/link";
import { User } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50 flex justify-between items-center py-4 px-6 md:px-20 font-saira">
      <div className="flex items-center gap-2">
        <Link href="/">
          <Image
            src="/images/Navbar/fithive.png"
            alt="FitHive Logo"
            width={125}
            height={50}
            className="cursor-pointer"
          />
        </Link>
      </div>
      <div className="flex items-center gap-8">
        <User className="text-white text-5xl bg-[#002D55] rounded-full" />
        <button className="bg-[#F4811F] text-[#002D55] text-xl px-4 py-1 rounded-md font-bold hover:bg-orange-700 hover:text-white">
        SIGN IN
        </button>
    </div>
    </nav>
  );
}