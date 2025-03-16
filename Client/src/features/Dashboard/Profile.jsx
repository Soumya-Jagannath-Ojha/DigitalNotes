import React, { useContext, useEffect } from "react";
import {
  FaUser,
  FaEdit,
  FaSave,
  FaEnvelope,
  FaIdCard,
  FaPhone,
  FaBirthdayCake,
  FaVenusMars,
  FaGraduationCap,
  FaCalendarAlt,
  FaExclamationTriangle,
} from "react-icons/fa";
import { useState } from "react";
import { toast } from "sonner";
import { GlobalContext } from "../../context/GlobalState";


import ProfileDisplay from "../../components/profile/ProfileDisplay";
import ProfileUpdate from "../../components/profile/ProfileUpdate";

const Profile = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeSection, setActiveSection] = useState("profile");
  const {
    currUser,
    setCurrUser,
    showImportantMessage,
    setShowImportantMessage,
  } = useContext(GlobalContext);


  // const [showImportantMessage, setShowImportantMessage] = useState(true);
  const [tempRegdNo, setTempRegdNo] = useState(currUser?.regdNo || ""); // Temporary state for editing



 const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [regdNo, setRegdNo] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [branch, setBranch] = useState("");
  const [sem, setSem] = useState("");
  const [year, setYear] = useState(""); // New state for year


  // const handleUpdateProfile = async (e) => {
  //   e.preventDefault();
  //   const profileData = {
  //     regdNo: regdNo,
  //     phoneNo: phoneNo,
  //     dob,
  //     gender,
  //     branch,
  //     year,
  //     sem,
  //   };

  //   try {
  //     const response = await fetch(
  //       `http://localhost:8080/dashboard/${currUser._id}/profile`,
  //       {
  //         method: "PUT",
  //         headers: { "Content-Type": "application/json" },
  //         credentials: "include",
  //         body: JSON.stringify({ ...profileData, userId: currUser._id }),
  //       }
  //     );

  //     if (response.ok) {
  //       const responseData = await response.json();
  //       const updatedUser = responseData.user;
  //       // console.log(updatedUser);

  //       setCurrUser(updatedUser);
  //       toast.success("Profile Update successfully!");

  //       // console.log(response.);
  //     } else {
  //       const errorData = await response.json();
  //       toast.error(errorData.message || "Failed to update profile");
  //     }
  //   } catch (error) {
  //     toast.error("An error occurred while updating the profile.");
  //   }
  //   setIsEditing(false);
  //   const allFieldsFilled = regdNo && phoneNo && dob && gender && branch && sem;
  //   // console.log(allFieldsFilled);

  //   setShowImportantMessage(!allFieldsFilled);
  // };


  const handleUpdateProfile = async (updatedProfile) => {
    try {
      const response = await fetch(
        `http://localhost:8080/dashboard/${currUser._id}/profile`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ ...updatedProfile, userId: currUser._id }),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        setCurrUser(responseData.user);
        toast.success("Profile Updated Successfully!");
        setIsEditing(false);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to update profile");
      }
    } catch (error) {
      toast.error("An error occurred while updating the profile.");
    }
  };


  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSave = () => {
    setRegdNo(tempRegdNo); // Commit the edited value to the main state
    setIsEditing(false); // Exit editing mode
  };

  const handleCancel = () => {
    setTempRegdNo(regdNo); // Revert temporary state to the original value
    setIsEditing(false); // Exit editing mode
  };

  // Function to format ISO date string to "dd-mm-yyyy"
  const formatDateToDDMMYYYY = (isoDate) => {
    if (!isoDate) return ""; // Handle empty or null values
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Function to format "yyyy-MM-dd" back to ISO date string
  const formatToISO = (dateString) => {
    if (!dateString) return ""; // Handle empty or null values
    const [year, month, day] = dateString.split("-"); // Assumes input is in yyyy-MM-dd format
    return new Date(`${year}-${month}-${day}`).toISOString();
  };


  useEffect(() => {
    const allFieldsFilled =
      currUser?.regdNo &&
      currUser?.phoneNo &&
      currUser?.dob &&
      currUser?.gender &&
      currUser?.branch &&
      currUser?.sem;
    setShowImportantMessage(!allFieldsFilled);
  }, [currUser, setShowImportantMessage]);



  return (
    <>
      {/* Profile section */}
      {/* <div className="flex-1 p-8 ">


        <h1 className="text-2xl font-bold mb-2 text-center">Profile Details</h1>
        {showImportantMessage && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 mx-4 sm:mx-0 rounded-r">
            <div className="flex flex-col sm:flex-row items-center sm:items-center">
              <FaExclamationTriangle className="flex-shrink-0 mr-2 mb-2 sm:mb-0 text-yellow-500 text-xl" />
              <p className="font-bold text-sm sm:text-base text-center sm:text-left">
                Please complete all profile details to access notes specific to
                your branch and semester.
              </p>
            </div>
          </div>
        )}

        {currUser ? (
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-50 to-indigo-100 shadow-md rounded-lg overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:gap-x-12 gap-6 p-8">
              <ProfileField
                label="Name"
                value={username}
                isEditing={false}
                onChange={setUsername}
                type="text"
                icon={<FaUser className="mr-2 text-green-500" />}
              />
              <ProfileField
                label="Email"
                value={email}
                isEditing={false}
                onChange={setEmail}
                type="email"
                icon={<FaEnvelope className="mr-2 text-red-500" />}
              />
              <ProfileField
                label="Regd. No."
                value={regdNo}
                isEditing={isEditing}
                onChange={setRegdNo}
                // onChange={(e) => setTempRegdNo(e.target.value)} // Update only temporary state
                type="text"
                icon={<FaIdCard className="mr-2 text-purple-500" />}
              />
              <ProfileField
                label="Phone No."
                value={phoneNo}
                isEditing={isEditing}
                // onChange={setPhoneNo}
                onChange={(value) => {
                  // Allow only numeric input and limit to 10 digits
                  const sanitizedValue = value.replace(/\D/g, "").slice(0, 10); // Remove non-numeric and limit length
                  setPhoneNo(sanitizedValue);
                }}
                type="tel"
                icon={
                  <FaPhone className="mr-2 text-blue-500 transform rotate-90" />
                }
              />

              <ProfileField
                label="Date of Birth"
                value={
                  isEditing ? dob.split("T")[0] : formatDateToDDMMYYYY(dob)
                } // Show formatted value only when not editing
                isEditing={isEditing}
                onChange={(value) => {
                  const isoDate = new Date(value).toISOString(); // Convert to ISO format
                  setDob(isoDate); // Update state
                }}
                type="date"
                icon={<FaBirthdayCake className="mr-2 text-pink-500" />}
              />

              <ProfileField
                label="Gender"
                value={gender}
                isEditing={isEditing}
                onChange={setGender}
                type="select"
                options={["Male", "Female", "Other"]}
                icon={<FaVenusMars className="mr-2 text-indigo-500" />}
              />
              <ProfileField
                label="Branch"
                value={branch}
                isEditing={isEditing}
                onChange={setBranch}
                type="select"
                options={["CSE", "EE", "EEE", "CE", "ME"]}
                icon={<FaGraduationCap className="mr-2 text-yellow-500" />}
              />
              <ProfileField
                label="Semester"
                value={sem}
                isEditing={isEditing}
                onChange={setSem}
                type="select"
                options={[
                  "1st",
                  "2nd",
                  "3rd",
                  "4th",
                  "5th",
                  "6th",
                  "7th",
                  "8th",
                ]}
                icon={<FaCalendarAlt className="mr-2 text-orange-500" />}
              />
            </div>
            <div className="flex justify-center p-4">
              <button
                onClick={
                  isEditing ? handleUpdateProfile : () => setIsEditing(true)
                }
                className={`${
                  isEditing
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white font-bold py-2 px-4 rounded-full flex items-center`}
              >
                {isEditing ? (
                  <FaSave className="mr-2" />
                ) : (
                  <FaEdit className="mr-2" />
                )}
                {isEditing ? "Save Profile" : "Edit Profile"}
              </button>
            </div>
          </div>
        ) : (
          <p className="lg:text-4xl text-center text-xl text-black font-extrabold">
            You are not Login!
          </p>
        )}

         <form
          onSubmit={handleUpdateProfile}
          className="max-w-lg mx-auto p-8 bg-white rounded shadow"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            Update Profile
          </h2>

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
              value={sem}
              onChange={(e) => setSem(e.target.value)}
              className="w-full px-4 py-2 border rounded"
            >
              <option value="">Select Year</option>
              <option value="1st">1st</option>
              <option value="2nd">2nd</option>
              <option value="3rd">3rd</option>
              <option value="4th">4th</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700"
          >
            Save Profile
          </button>
        </form> 
      </div> */}





      <div className="p-8">
      {/* <h1 className="text-2xl font-bold mb-4 text-center">Profile Details</h1> */}
    
      {showImportantMessage && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded">
          <p>Please complete all profile details to access notes specific to your branch and semester.</p>
        </div>
      )}

      {!isEditing ? (
        <ProfileDisplay user={currUser} onEdit={() => setIsEditing(true)} />
      ) : (
        <ProfileUpdate user={currUser} onUpdate={handleUpdateProfile} onCancel={() => setIsEditing(false)} />
      )}
    </div>
    </>
  );
};

export default Profile;
