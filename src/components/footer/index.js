import Image from "next/image";
import { FaFacebookF, FaInstagram, FaTwitter, FaTiktok} from "react-icons/fa";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import logo from "@/public/images/Navbar/fithive.png";

export default function Footer() {
  return (
    <footer className="bg-[#f4f4f4] text-[#333] py-10 font-saira items-center">
      <div className="flex flex-col md:flex-row justify-between items-center mx-20">
        <div className="mb-8 md:mb-0">
            <Image src={logo} alt="FitHive Logo" width={275} height={98} />
        </div>

        <div className="mb-8 md:mb-0">
          <h4 className="font-semibold text-lg mb-2">Contacts</h4>
          <div className="flex flex-col items-start space-y-3 text-sm">
          <div className="flex items-start gap-2">
            <FiPhone className="text-primary" />
            <span>+62 812-3456-7890</span>
          </div>
          <div className="flex items-start gap-2">
            <FiMail className="text-primary" />
            <span>customer_care@fithive.com</span>
          </div>
          <div className="flex items-center gap-2">
            <FiMapPin className="text-primary" />
            <span>Jl. Thamrin No.13, Jakarta</span>
          </div>
        </div>
        </div>

        <div>
          <h4 className="font-semibold text-lg mb-2">Social</h4>
          <div className="flex gap-3 mt-2 text-lg">
            <a href="#" className="bg-black text-white p-2 rounded-full"><FaFacebookF /></a>
            <a href="#" className="bg-black text-white p-2 rounded-full"><FaInstagram /></a>
            <a href="#" className="bg-black text-white p-2 rounded-full"><FaTwitter /></a>
            <a href="#" className="bg-black text-white p-2 rounded-full"><FaTiktok /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-300 mt-10 pt-4 text-center text-sm">
        © Copyright 2025 Lestari Inc. All rights reserved.
      </div>
    </footer>
  );
}
