import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdAdd, IoMdSearch } from "react-icons/io";
import { Toggle } from "./Toggle";

const Navbar = ({ searchTerm, setSearchTerm, user }) => {
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div className="flex gap-2 w-full mt-5 pb-7">
      <div className="flex justify-start items-center w-full px-2 rounded-md bg-white dark:bg-slate-800 border-none outline-none shadow-xl">
        <IoMdSearch fontSize={21} className="ml-1 dark:text-slate-400" />
        <input
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search"
          value={searchTerm}
          onFocus={() => navigate("/search")}
          className="p-2 w-full bg-white dark:bg-slate-800 dark:text-slate-200 outline-none"
        />
      </div>
      <div className="flex gap-2 ">
        <Toggle />
        <Link
          to="create-pin"
          className="shadow-xl bg-sky-900 dark:bg-slate-800 text-sky-50 rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center"
        >
          <IoMdAdd />
        </Link>
        <Link
          to={`user-profile/${user?._id}`}
          className="hidden md:block shadow-xl"
        >
          <img src={user.image} alt="user" className="w-14 h-12 rounded-lg" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
