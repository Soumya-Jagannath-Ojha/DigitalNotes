import React from "react";
import { FaUser, FaEnvelope, FaIdCard, FaPhone, FaBirthdayCake, FaVenusMars, FaGraduationCap, FaCalendarAlt, FaEdit } from "react-icons/fa";

const ProfileDisplay = ({ user, onEdit }) => {

  const ProfileField = ({ label, value, icon }) => {
    return (
      <div className="flex flex-col items-center bg-gray-100 rounded-lg p-4 shadow-sm w-full sm:w-auto">
        <div className="text-xl text-gray-600 mb-2">{icon}</div>
        <p className="text-gray-500 text-sm font-semibold">{label}</p>
        <p className="text-gray-900 font-medium text-base">{value || "N/A"}</p>
      </div>
    );
  };

  return (

    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6 border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center justify-center">
        <FaUser className="text-blue-500 mr-2" /> Profile Details
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <ProfileField label="Name" value={user.username} icon={<FaUser className="text-green-500" />} />
        <ProfileField label="Email" value={user.email} icon={<FaEnvelope className="text-red-500" />} />
        <ProfileField label="Regd. No." value={user.regdNo} icon={<FaIdCard className="text-purple-500" />} />
        <ProfileField label="Phone No." value={user.phoneNo} icon={<FaPhone className="text-blue-500" />} />
        <ProfileField label="Date of Birth" value={user.dob?.split("T")[0]} icon={<FaBirthdayCake className="text-pink-500" />} />
        <ProfileField label="Gender" value={user.gender} icon={<FaVenusMars className="text-indigo-500" />} />
        <ProfileField label="Branch" value={user.branch} icon={<FaGraduationCap className="text-yellow-500" />} />
        <ProfileField label="Year" value={user.year} icon={<FaCalendarAlt className="text-gray-500" />} />
        <ProfileField label="Semester" value={user.sem} icon={<FaCalendarAlt className="text-gray-500" />} />
      </div>

      <div className="flex justify-center mt-6">
        <button 
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center shadow-md transition-transform transform hover:scale-105"
          onClick={onEdit}
        >
          <FaEdit className="mr-2" /> Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileDisplay;
