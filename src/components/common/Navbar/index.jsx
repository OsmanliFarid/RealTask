import React from "react";
import { FaUserPlus, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-purple-900 w-[300px] min-h-screen">
      <div className="w-[200px] mx-auto">
        <h1 className="text-white font-bold text-[26px] text-center pt-[30px] pb-[30px]">
          CRM Paneli
        </h1>

        <Link
          to={"/"}
          className="flex gap-3 items-center cursor-pointer transition-all duration-300 rounded-md p-[8px_10px] hover:bg-[#9c9a9a] hover:text-red-700"
        >
          <FaUserPlus className="text-white text-[20px] " />
          <span className="text-white hover:text-red-700">
            Yeni müştəri əlavə et
          </span>
        </Link>

        <Link
          to={"/all-customer"}
          className="flex gap-3 items-center cursor-pointer mt-[16px] transition-all duration-300 rounded-md p-[8px_10px] hover:bg-[#9c9a9a]"
        >
          <FaUsers className="text-white text-[20px]" />
          <span className="text-white">Bütün müştərilər</span>
        </Link>

        <Link
          to={"/arcive"}
          className="flex gap-3 items-center cursor-pointer mt-[16px] transition-all duration-300 rounded-md p-[8px_10px] hover:bg-[#9c9a9a]"
        >
          <FaUserPlus className="text-white text-[20px]" />
          <span className="text-white">Arxiv</span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
