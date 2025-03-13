import React, { useState, useRef } from "react";
import { IoMdClose } from "react-icons/io";

const EmailCode = () => {
  const [focusedInput, setFocusedInput] = useState(null);
  const codeRef = useRef(null);

  const handleFocus = (inputId) => {
    setFocusedInput(inputId);
  };

  const handleBlur = () => {
    setFocusedInput(null);
  };

  const handleCode = (e) => {
    e.preventDefault();
    const formdata = {
      Passcode: codeRef.current.value
    };
    console.log(formdata);

    codeRef.current.value = '';
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 sm:px-6 lg:px-8">
      <div className="relative w-full max-w-md p-4 sm:p-6 bg-white rounded-lg shadow-md">
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          <IoMdClose size={24} />
        </button>
        <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-center">PassCode</h2>
        <p className="text-sm sm:text-base text-gray-800 mb-3">
        <span className="text-red-500">*</span>Note: Enter passcode from email
        </p>
        <form onSubmit={handleCode}>
          <div className="mb-3 sm:mb-4 relative">
            <input
              type="text"
              id="email"
              ref={codeRef}
              className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
              placeholder=" "
              required
              onFocus={() => handleFocus("email")}
              onBlur={handleBlur}
            />
            <label
              htmlFor="email"
              className={`absolute left-3 transition-all duration-200 ${
                focusedInput === "email" || (codeRef.current && codeRef.current.value)
                  ? "text-xs text-blue-500 top-[-0.5rem] bg-white px-1"
                  : "text-sm text-gray-700 top-2"
              }`}
            >
              Passcode
            </label>
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-sm sm:text-base"
            >
              Verify
            </button>
            
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailCode;