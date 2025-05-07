import Image from "next/image";
import Link from "next/link";
import { User } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [hasMounted, setHasMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setHasMounted(true);
    const token = Cookies.get("accessToken");
    const name = Cookies.get("userName");

    if (token && name) {
      setIsLoggedIn(true);
      setUserName(name);
    }
  }, []);

  if (!hasMounted) return null;

  const handleSignOut = () => {
    Cookies.remove("accessToken");
    Cookies.remove("userName");
    Cookies.remove("userRole");
    setIsLoggedIn(false);
    router.push("/");
  };

  const handleUserClick = () => {
    const token = Cookies.get("accessToken");
    if (token) {
      router.push("/profile");
    } else {
      router.push("/login");
    }
  };

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
      <div className="flex items-center gap-4">
        <div onClick={handleUserClick} className="cursor-pointer flex items-center gap-2">
          <User className="text-white text-5xl bg-[#002D55] rounded-full p-2" />
          {isLoggedIn && (
            <span className="text-[#002D55] font-bold text-lg">{userName}</span>
          )}
        </div>
        {isLoggedIn ? (
          <button
            onClick={handleSignOut}
            className="bg-red-600 text-white text-xl px-4 py-1 rounded-md font-bold hover:bg-red-800"
          >
            SIGN OUT
          </button>
        ) : (
          <button
            onClick={() => router.push("/login")}
            className="bg-[#F4811F] text-[#002D55] text-xl px-4 py-1 rounded-md font-bold hover:bg-orange-700 hover:text-white"
          >
            SIGN IN
          </button>
        )}
      </div>
    </nav>
  );
}