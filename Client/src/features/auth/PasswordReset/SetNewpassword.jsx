import React, { useState, useRef } from "react";
import { FaGoogle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const SetNewpassword = () => {
  const [focusedInput, setFocusedInput] = useState(null);
  const passRef = useRef(null);
  const npassRef = useRef(null);

  const handleFocus = (inputId) => {
    setFocusedInput(inputId);
  };

  const handleBlur = () => {
    setFocusedInput(null);
  };

  const handleNewpass = (e) => {
    e.preventDefault();
    const formdata = {
      password: passRef.current.value,
      Cpassword: npassRef.current.value
    }
    console.log(formdata);

    passRef.current.value = '';
    npassRef.current.value = '';
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 sm:px-6 lg:px-8">
      <div className="relative w-full max-w-md p-4 sm:p-6 bg-white rounded-lg shadow-md">
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          <IoMdClose size={24} />
        </button>
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">New Password</h2>
        <form onSubmit={handleNewpass}>
          <div className="mb-3 sm:mb-4 relative">
            <input
              type="text"
              id="password"
              ref={passRef}
              className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
              placeholder=" "
              required
              onFocus={() => handleFocus("password")}
              onBlur={handleBlur}
            />
            <label
              htmlFor="password"
              className={`absolute left-3 transition-all duration-200 ${
                focusedInput === "password" || (passRef.current && passRef.current.value)
                  ? "text-xs text-blue-500 top-[-0.5rem] bg-white px-1"
                  : "text-sm text-gray-700 top-2"
              }`}
            >
              New password
            </label>
          </div>
          <div className="mb-3 sm:mb-4 relative">
            <input
              type="text"
              id="apassword"
              ref={npassRef}
              className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
              placeholder=" "
              required
              onFocus={() => handleFocus("apassword")}
              onBlur={handleBlur}
            />
            <label
              htmlFor="email"
              className={`absolute left-3 transition-all duration-200 ${
                focusedInput === "apassword" || (npassRef.current && npassRef.current.value)
                  ? "text-xs text-blue-500 top-[-0.5rem] bg-white px-1"
                  : "text-sm text-gray-700 top-2"
              }`}
            >
              confirm password
            </label>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-sm sm:text-base"
          >
            Save
          </button>
        </form>
        
      </div>
    </div>
  );
};

export default SetNewpassword;