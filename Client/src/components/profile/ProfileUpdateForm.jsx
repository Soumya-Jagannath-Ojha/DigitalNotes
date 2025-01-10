import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { GlobalContext } from "../../context/GlobalState";

const ProfileUpdateForm = ({ initialData }) => {


  // if(initialData){
  //   console.log(initialData.username);
    
  // }
  const [username, setUsername] = useState(initialData?.username || "");
  const [email, setEmail] = useState(initialData?.email || "");
  const [regdNo, setRegdNo] = useState(initialData?.regdNo || "");
  const [phoneNo, setPhoneNo] = useState(initialData?.phoneNo || "");
  const [dob, setDob] = useState(initialData?.dob || "");
  const [gender, setGender] = useState(initialData?.gender || "");
  const [branch, setBranch] = useState(initialData?.branch || "");
  const [sem, setSem] = useState(initialData?.sem || "");
  const [year, setYear] = useState(initialData?.year || ""); // New state for year


  // const { currUser } = useContext(GlobalContext); // Access setCurrUser from context
    
  // Define semester options based on the selected year
  const semesterOptions = {
    "1st": ["1st", "2nd"],
    "2nd": ["3rd", "4th"],
    "3rd": ["5th", "6th"],
    "4th": ["7th", "8th"],
  };

  // const handleUpdateProfile = async (e) => {
  //   e.preventDefault();
  //   const profileData = {
  //     username,
  //     email,
  //     regdNo,
  //     phoneNo,
  //     dob,
  //     gender,
  //     branch,
  //     year,
  //     sem,
  //   };

  //   try {
  //     const response = await fetch("http://localhost:8080/dashboard/profile", {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json" },
  //       credentials: "include",
  //       body: JSON.stringify(profileData),
  //     });

  //     if (response.ok) {
  //       // alert("Profile updated successfully!");
  //       toast.success("Profile updated successfully!")
  //     } else {
  //       const errorData = await response.json();
  //       // alert(errorData.message || "Failed to update profile");
  //       toast.error(errorData.message || "Failed to update profile");
  //     }
  //   } catch (error) {
  //     toast.error("An error occurred while updating the profile.");
  //   }
  // };



  const { currUser, setCurrUser } = useContext(GlobalContext); // Access currUser and setCurrUser from context
  
  // // Set initial state from currUser
  // const [username, setUsername] = useState(currUser.username || "");
  // const [email, setEmail] = useState(currUser.email || "");
  // const [regdNo, setRegdNo] = useState(currUser.regdNo || ""); // Use proper field names from your user schema
  // const [phoneNo, setPhoneNo] = useState(currUser.phoneNo || ""); // Adjusted to match schema
  // const [dob, setDob] = useState(currUser.dob || "");
  // const [gender, setGender] = useState(currUser.gender || "");
  // const [branch, setBranch] = useState(currUser.branch || "");
  // const [sem, setSem] = useState(currUser.sem || "");
  // const [year, setYear] = useState(currUser.year || ""); // New state for year

  // // Define semester options based on the selected year
  // const semesterOptions = {
  //   "1st": ["1st", "2nd"],
  //   "2nd": ["3rd", "4th"],
  //   "3rd": ["5th", "6th"],
  //   "4th": ["7th", "8th"],
  // };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const profileData = {
      _id: currUser._id,
      username,
      email,
      regdNo,
      phoneNo,
      dob,
      gender,
      branch,
      year,
      sem,
    };

    try {
      const response = await fetch("http://localhost:8080/dashboard/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        // Update the currUser state with the new data
        setCurrUser((prevUser) => ({
          ...prevUser,
          username,
          email,
          regdNo,
          phoneNo,
          dob,
          gender,
          branch,
          year,
          sem,
        }));
        
        toast.success("Profile updated successfully!");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to update profile");
      }
    } catch (error) {
      toast.error("An error occurred while updating the profile.");
    }
  };

  // useEffect(() => {
  //   console.log("Initial Data updated:", initialData);
  // }, [initialData]);

  return (
    <div>
      
    <form
      onSubmit={handleUpdateProfile}
      className="max-w-lg mx-auto p-8 bg-white rounded shadow"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Update Profile</h2>

      <div className="mb-4">
        <label className="block text-gray-700">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />
      </div>


      <div className="mb-4">
        <label className="block text-gray-700">Regd. No.</label>
        <input
          type="text"
          value={regdNo}
          onChange={(e) => setRegdNo(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Phone No.</label>
        <input
          type="tel"
          value={phoneNo}
          onChange={(e) => setPhoneNo(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Date of Birth</label>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Gender</label>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Branch</label>
        <select
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        >
          <option value="">Select Branch</option>
          <option value="CSE">CSE</option>
          <option value="EE">EE</option>
          <option value="EEE">EEE</option>
          <option value="CE">CE</option>
          <option value="ME">ME</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Year</label>
        <select
          value={year}
          onChange={(e) => {
            setYear(e.target.value);
            setSem(""); // Reset semester when year changes
          }}
          className="w-full px-4 py-2 border rounded"
        >
          <option value="">Select Year</option>
          <option value="1st">1st</option>
          <option value="2nd">2nd</option>
          <option value="3rd">3rd</option>
          <option value="4th">4th</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Semester</label>
        <select
          value={sem}
          onChange={(e) => setSem(e.target.value)}
          className="w-full px-4 py-2 border rounded"
          disabled={!year} // Disable if no year is selected
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

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700"
      >
        Save Profile
      </button>
    </form>
    </div>
  );
};

export default ProfileUpdateForm;
