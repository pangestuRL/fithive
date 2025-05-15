import Image from "next/image";
import Link from "next/link";
import { UserCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [hasMounted, setHasMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setHasMounted(true);
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      const name = localStorage.getItem("userName");

      if (token && name) {
        setIsLoggedIn(true);
        setUserName(name);
      }
    }
  }, []);

  if (!hasMounted) return null;

  const handleSignOut = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        await axiosInstance.post("/logout");
      }
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userName");
      localStorage.removeItem("userRole");

      setIsLoggedIn(false);
      router.push("/");
    }catch (error) {
      console.error("Logout failed: ", error);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userName");
      localStorage.removeItem("userRole");

      setIsLoggedIn(false);
      router.push("/");
    } 
  };

  const handleUserClick = () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token) {
        router.push("/profile");
      } else {
        router.push("/login");
      }
    }
  };

  return (
    <nav className="fixed top-0 mb-20 left-0 w-full bg-white shadow-md z-50 flex justify-between items-center py-4 px-6 md:px-20 font-saira">
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
      <div className="flex items-center gap-4">
        <div onClick={handleUserClick} className="cursor-pointer flex items-center gap-2 group">
          {isLoggedIn ? (
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F4811F] text-white font-bold text-lg group-hover:brightness-110 transition">
              {userName.charAt(0).toUpperCase()}
            </div>
          ) : (
            <UserCircle className="w-8 h-8 text-[#002D55] group-hover:text-[#F4811F] transition" />
          )}
          {isLoggedIn && (
            <span className="max-w-[100px] truncate text-[#002D55] font-semibold text-sm md:text-base group-hover:text-[#F4811F] transition">
              {userName}
            </span>
          )}
        </div>

        {isLoggedIn ? (
          <button
            onClick={handleSignOut}
            className="bg-red-600 text-white text-sm md:text-base px-4 py-2 rounded-md font-bold hover:bg-red-800 transition"
          >
            SIGN OUT
          </button>
        ) : (
          <button
            onClick={() => router.push("/login")}
            className="bg-[#F4811F] text-[#002D55] text-sm md:text-base px-4 py-2 rounded-md font-bold hover:bg-orange-700 hover:text-white transition"
          >
            SIGN IN
          </button>
        )}
      </div>
    </nav>
  );
}