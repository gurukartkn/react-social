import React from "react";
import { NavLink, Link } from "react-router-dom";
import { RiHomeFill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { MdFaceRetouchingNatural } from "react-icons/md";
import { categories } from "../utils/data";

const isNotActiveStyle =
  "group flex items-center px-5 gap-3 text-sky-700 hover:text-sky-900 transition-all duration-200 ease-in-out capitalize";
const isActiveStyle =
  "group flex items-center px-5 gap-3 text-sky-900 font-extrabold border-r-2 border-sky-900 hover:text-sky-900 transition-all duration-200 ease-in-out capitalize";

const Sidebar = ({ user, closeToggle }) => {
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };
  return (
    <div className="flex flex-col justify-between bg-sky-200 h-full overflow-y-scroll min-w-210 hide-scrollbar">
      <div className="flex flex-col">
        <Link
          to="/"
          className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
          onClick={handleCloseSidebar}
        >
          <p className="flex text-cyan-900 text-4xl font-bold">
            <MdFaceRetouchingNatural />
            NOVA
          </p>
        </Link>
        <div className="flex flex-col gap-5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
          >
            <RiHomeFill />
            Home
          </NavLink>
          <h3 className="mt-2 px-5 text-base 2xl:text-xl">Discover</h3>
          {categories.slice(0, categories.length - 1).map((category) => (
            <NavLink
              to={`/category/${category.name}`}
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
              onClick={handleCloseSidebar}
              key={category.name}
            >
              <img
                src={category.image}
                alt="category"
                className="group-hover:animate-bounce object-cover w-8 h-8 rounded-full shadow-sm"
              />
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>
      {user && (
        <Link
          to={`user-profile/${user._id}`}
          className="group flex my-5 mb-3 gap-2 p-2 items-center bg-sky-100 rounded-lg shadow-lg mx-3"
          onClick={handleCloseSidebar}
        >
          <img
            src={user.image}
            className="group-hover:animate-spin w-10 h-10 rounded-full"
            alt="user-profile"
          />
          <p>{user.username}</p>
        </Link>
      )}
    </div>
  );
};

export default Sidebar;
