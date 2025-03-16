import React, { useState } from "react";
import { FaSave, FaTimes, FaUser } from "react-icons/fa";

const ProfileUpdate = ({ user, onUpdate, onCancel }) => {
  const [regdNo, setRegdNo] = useState(user.regdNo || "");
  const [phoneNo, setPhoneNo] = useState(user.phoneNo || "");
  const [dob, setDob] = useState(user.dob?.split("T")[0] || "");
  const [gender, setGender] = useState(user.gender || "");
  const [branch, setBranch] = useState(user.branch || "");
  const [year, setYear] = useState(user.year || "");
  const [sem, setSem] = useState(user.sem || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ regdNo, phoneNo, dob, gender, branch, year, sem });
  };

  const semesterOptions = {
    "1st": ["1st", "2nd"],
    "2nd": ["3rd", "4th"],
    "3rd": ["5th", "6th"],
    "4th": ["7th", "8th"],
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6 border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center justify-center">
        <FaUser className="text-blue-500 mr-2" /> Update Profile
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            value={user.username}
            readOnly
            className="w-full px-4 py-2 border rounded bg-gray-100 cursor-not-allowed"
          />
          <input
            type="email"
            value={user.email}
            readOnly
            className="w-full px-4 py-2 border rounded bg-gray-100 cursor-not-allowed"
          />
          <input
            type="text"
            value={regdNo}
            onChange={(e) => setRegdNo(e.target.value)}
            placeholder="Regd. No."
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value.replace(/\D/g, "").slice(0, 10))}
            placeholder="Phone No."
            className="border p-2 rounded w-full"
          />
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <select
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="">Select Branch</option>
            <option value="CSE">CSE</option>
            <option value="EE">EE</option>
            <option value="EEE">EEE</option>
            <option value="CE">CE</option>
            <option value="ME">ME</option>
          </select>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="">Select Year</option>
            <option value="1st">1st</option>
            <option value="2nd">2nd</option>
            <option value="3rd">3rd</option>
            <option value="4th">4th</option>
          </select>
          <select
            value={sem}
            onChange={(e) => setSem(e.target.value)}
            className="border p-2 rounded w-full"
            disabled={!year}
          >
            <option value="">Select Semester</option>
            {year &&
              semesterOptions[year]?.map((semester) => (
                <option key={semester} value={semester}>
                  {semester}
                </option>
              ))}
          </select>
        </div>

        <div className="flex justify-center mt-6 space-x-4">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg flex items-center shadow-md transition-transform transform hover:scale-105"
          >
            <FaSave className="mr-2" /> Save
          </button>
          <button
            type="button"
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg flex items-center shadow-md transition-transform transform hover:scale-105"
            onClick={onCancel}
          >
            <FaTimes className="mr-2" /> Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileUpdate;
