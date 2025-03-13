import React from "react";
import {
  FaUser,
  FaTimes,
  FaEdit,
  FaSave,
  FaEnvelope,
  FaIdCard,
  FaPhone,
  FaBirthdayCake,
  FaVenusMars,
  FaGraduationCap,
  FaCalendarAlt,
  FaStickyNote,
  FaBookmark,
  FaSignOutAlt,
  FaInfoCircle,
} from "react-icons/fa";
import { useState } from "react";
import Notes from "../../features/Dashboard/Notes";
import Profile from "../../features/Dashboard/Profile";
import SavedNotes from "../../features/Dashboard/SavedNotes";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    // <div className="flex flex-col md:flex-row min-h-[calc(100vh-64px)] ml-64 bg-gray-100 mt-16">
    //   <div className="w-64 bg-white shadow-md fixed inset-y-0 left-0 transform">
    //     <div className="p-4 mt-20">
    //       <FaUser className="w-20  h-20 mx-auto text-gray-700" />
    //     </div>
    //     <hr className="border-t border-gray-200 my-2" />

    //     <nav className="mt-8 space-y-4">
    //       <a
    //         // href="/dashboard"
    //         onClick={() => setActiveSection("profile")}
    //         className={`block py-2 px-6 text-gray-700 hover:bg-blue-200 font-bold text-lg ${
    //           activeSection === "profile" ? "bg-blue-300" : ""
    //         }`}
    //       >
    //         <div className="flex items-center">
    //           <FaUser className="mr-2" />
    //           <span className="inline">Profile</span>
    //         </div>
    //       </a>
    //       <a
    //         // href="/dashboard/notes"
    //         onClick={() => setActiveSection("notes")}
    //         className={`block py-2 px-6 text-gray-700 hover:bg-yellow-200 font-bold text-lg ${
    //           activeSection === "notes" ? "bg-yellow-300" : ""
    //         }`}
    //       >
    //         <div className="flex items-center">
    //           <FaStickyNote className="mr-2" />
    //           <span className="inline">Notes</span>
    //         </div>
    //       </a>
    //       <a
    //         // href="/dashboard/savednotes"
    //         onClick={() => setActiveSection("saved-notes")}
    //         className={`block py-2 px-6 text-gray-700 hover:bg-green-200 font-bold text-lg ${
    //           activeSection === "saved-notes" ? "bg-green-300" : ""
    //         }`}
    //       >
    //         <div className="flex items-center">
    //           <FaBookmark className="mr-2" />
    //           <span className="inline">Saved Notes</span>
    //         </div>
    //       </a>
    //       <a
    //         href="/logout"
    //         className="block py-2 px-6 text-gray-700 hover:bg-red-200 font-bold text-lg"
    //       >
    //         <div className="flex items-center">
    //           <FaSignOutAlt className="mr-2" />
    //           <span className="inline">Logout</span>
    //         </div>
    //       </a>
    //     </nav>
    //   </div>
    //   <div>
    //   {activeSection === "profile" && <Profile />}
    //   {activeSection === "notes" && <Notes />}
    //   {activeSection === "saved-notes" && <SavedNotes />}
    //   </div>
      
    // </div>


    <div className="flex flex-col md:flex-row min-h-[calc(100vh-64px)] mt-14">
      <button
        className="md:hidden fixed top-20 left-4 z-20 p-2 rounded-md bg-indigo-700"
        onClick={toggleSidebar}
      >
        {sidebarOpen ? <FaTimes className="text-white"/> : <FaUser className="text-cyan-300"/>}
      </button>

      <Sidebar sidebarOpen={sidebarOpen} />

      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
