import { Link, NavLink } from "react-router-dom";
import { FaUser, FaStickyNote, FaBookmark, FaSignOutAlt } from "react-icons/fa";

import { UserContext } from "../../App";
import { GlobalContext } from "../../context/GlobalState";
import React, { useState, useEffect, useContext } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ sidebarOpen }) => {
  const { currUser, setCurrUser } = useContext(UserContext);
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8080/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        setCurrUser(null);
        toast.success("Logged out successfully!");
        navigate("/");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Logout failed.");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("An error occurred while logging out.");
    }
  };

  return (
    <div
      className={`w-64 bg-gradient-to-b from-indigo-500 via-purple-500 to-indigo-700 shadow-md fixed inset-y-0 left-0 transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:relative md:translate-x-0 transition duration-200 ease-in-out z-10 ${
        sidebarOpen ? "top-20" : ""
      }`}
    >
      <div className="p-4">
        <FaUser className="w-20 h-20 mx-auto text-cyan-300" />
      </div>
      <hr className="border-t border-gray-200 opacity-20 my-2" />
      <nav className="mt-8 space-y-4">
        <NavLink
          to="/dashboard/personal-details"
          className={({ isActive }) =>
            `block py-2 px-6 text-white hover:bg-white/10 font-bold text-lg ${
              isActive ? "bg-white/20" : ""
            }`
          }
        >
          <div className="flex items-center">
            <FaUser className="mr-2 text-cyan-300" />
            <span className="inline">Profile</span>
          </div>
        </NavLink>
        <NavLink
          to="/dashboard/notes"
          className={({ isActive }) =>
            `block py-2 px-6 text-white hover:bg-white/10 font-bold text-lg ${
              isActive ? "bg-white/20" : ""
            }`
          }
        >
          <div className="flex items-center">
            <FaStickyNote className="mr-2 text-yellow-300" />
            <span className="inline">Notes</span>
          </div>
        </NavLink>

        <NavLink
          to="/dashboard/saved-notes"
          className={({ isActive }) =>
            `block py-2 px-6 text-white hover:bg-white/10 font-bold text-lg ${
              isActive ? "bg-white/20" : ""
            }`
          }
        >
          <div className="flex items-center">
            <FaBookmark className="mr-2 text-green-400" />
            <span className="inline">Bookmarks</span>
          </div>
        </NavLink>

        <NavLink
          onClick={handleLogout}
          className="block py-2 px-6 text-white hover:bg-white/10 font-bold text-lg"
        >
          <div className="flex items-center">
            <FaSignOutAlt className="mr-2 text-red-400" />
            <span className="inline">Logout</span>
          </div>
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
