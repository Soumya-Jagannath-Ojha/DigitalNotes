import React, { useState, useRef } from "react";
import { IoMdClose } from "react-icons/io";

const Forgetpass = () => {
  const [focusedInput, setFocusedInput] = useState(null);
  const emailRef = useRef(null);

  const handleFocus = (inputId) => {
    setFocusedInput(inputId);
  };

  const handleBlur = () => {
    setFocusedInput(null);
  };

  const handleForgetpass = (e) => {
    e.preventDefault();
    const formdata = {
      email: emailRef.current.value
    }
    console.log(formdata);

    emailRef.current.value = '';
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 sm:px-6 lg:px-8">
      <div className="relative w-full max-w-md p-4 sm:p-6 bg-white rounded-lg shadow-md">
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          <IoMdClose size={24} />
        </button>
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">Forget Password</h2>
        <form onSubmit={handleForgetpass}>
          <div className="mb-3 sm:mb-4 relative">
            <input
              type="email"
              id="email"
              ref={emailRef}
              className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
              placeholder=" "
              required
              onFocus={() => handleFocus("email")}
              onBlur={handleBlur}
            />
            <label
              htmlFor="email"
              className={`absolute left-3 transition-all duration-200 ${
                focusedInput === "email" || (emailRef.current && emailRef.current.value)
                  ? "text-xs text-blue-500 top-[-0.5rem] bg-white px-1"
                  : "text-sm text-gray-700 top-2"
              }`}
            >
              Email
            </label>
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm sm:text-base"
            >
              Send Code
            </button>
            <button
              type="button"
              className="flex-1 py-2 px-4 bg-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm sm:text-base"
            >
              Back to Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Forgetpass;