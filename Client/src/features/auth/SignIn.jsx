import React, { useState, useRef, useContext, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { IoMdClose } from "react-icons/io";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { GlobalContext } from "../../context/GlobalState";

const SignIn = ({ onLogin, googleLogin, currUser, setCurrUser }) => {
  const [flashMessage, setFlashMessage] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const nameRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const handleFocus = (inputId) => {
    setFocusedInput(inputId);
  };

  const handleBlur = () => {
    setFocusedInput(null);
  };

  const Loader = () => (
    <div className="flex items-center justify-center space-x-2">
      <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
    </div>
  );

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = {
      username: nameRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const response = await fetch("http://localhost:8080/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to sign in");
      }

      setCurrUser(data.user);
      navigate("/dashboard", {
        state: {
          flashMessage: {
            type: "success",
            text: "Welcome back to DigitalNote!",
          },
        },
      });

      nameRef.current.value = "";
      passwordRef.current.value = "";
    } catch (error) {
      toast.error(error.message || "Enter valid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 sm:px-6 lg:px-8 mt-16 sm:mt-14">
      <div className="relative w-full max-w-md p-6 sm:p-8 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl transform transition-all duration-300">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors duration-200">
          <IoMdClose size={24} />
        </button>

        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
          <p className="text-gray-600">Please sign in to continue</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-5">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="text-blue-500" />
              </div>
              <input
                type="text"
                id="username"
                ref={nameRef}
                className="w-full pl-10 pr-3 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder=" "
                required
                onFocus={() => handleFocus("username")}
                onBlur={handleBlur}
              />
              <label
                htmlFor="username"
                className={`absolute left-10 transition-all duration-200 ${
                  focusedInput === "username" || (nameRef.current && nameRef.current.value)
                    ? "text-xs text-blue-600 top-[-0.5rem] bg-white px-1"
                    : "text-sm text-gray-600 top-[0.85rem]"
                }`}
              >
                Email
              </label>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-red-500" />
              </div>
              <input
                type="password"
                id="password"
                ref={passwordRef}
                className="w-full pl-10 pr-3 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder=" "
                required
                onFocus={() => handleFocus("password")}
                onBlur={handleBlur}
              />
              <label
                htmlFor="password"
                className={`absolute left-10 transition-all duration-200 ${
                  focusedInput === "password" || (passwordRef.current && passwordRef.current.value)
                    ? "text-xs text-blue-600 top-[-0.5rem] bg-white px-1"
                    : "text-sm text-gray-600 top-[0.85rem]"
                }`}
              >
                Password
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg ${
                isLoading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? <Loader /> : 'Sign In'}
            </button>

            <p className="text-center text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-blue-600 hover:text-blue-800 font-medium hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </form>

        <div className="mt-6 flex items-center justify-center">
          <div className="border-t border-gray-300 flex-grow"></div>
          <span className="px-4 text-gray-500">OR</span>
          <div className="border-t border-gray-300 flex-grow"></div>
        </div>

        <div className="mt-6 flex justify-center" onClick={googleLogin}>
          <button className="w-full sm:w-auto py-3 px-6 border border-gray-300 rounded-lg flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-all duration-200 transform hover:scale-[1.02]">
            <FcGoogle className="mr-2 text-xl" />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
