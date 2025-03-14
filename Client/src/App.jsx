import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  Navigate,
} from "react-router-dom";
import SignUp from "./features/auth/SignUp";
import SignIn from "./features/auth/SignIn";
import Forgetpass from "./features/auth/PasswordReset/Forgetpass";
import EmailCode from "./features/auth/PasswordReset/EmailCode";
import SetNewpassword from "./features/auth/PasswordReset/SetNewpassword";
import Contact from "./Pages/Contact";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./Pages/Home";
import AboutUs from "./Pages/About";
import NoteView from "./components/note/NoteView";
import Dashboard from "./components/layout/Dashboard";
import Notes from "./features/Dashboard/Notes";
import { Toaster } from "sonner";
// import GlobalState from "./context/GlobalState";
import LogoutButton from "./features/auth/LogoutButton";
import { createContext, useContext, useEffect, useState } from "react";
import { GlobalContext } from "./context/GlobalState";
// import Profile from "./components/functional/Profile";
import Profile from "./features/Dashboard/Profile";
import SavedNotes from "./features/Dashboard/SavedNotes";
export const UserContext = createContext(null);

function App() {
  // const [currUser, setCurrUser] = useState(null);

  const { currUser, setCurrUser } = useContext(GlobalContext);
  // const { currUser } = useContext(GlobalState);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/auth/current-user",
          {
            credentials: "include",
          }
        );
        if (response.ok) {
          const user = await response.json();
          setCurrUser(user);
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
      }finally {
        setIsLoading(false); // Set loading to false
      }
    };
    fetchCurrentUser();
  }, []);

  const handleLogin = async (formData) => {
    try {
      const response = await fetch("http://localhost:8080/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        setCurrUser(data.user);
        navigate("/", {
          state: {
            flashMessage: { type: "success", text: "Logged in successfully!" },
          },
        });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const googleLogin = () => {
    window.open("http://localhost:8080/auth/google", "_self");
  };

  

  if (isLoading) {
    // Show loading state while fetching user
    return <div className="text-center mt-20">Loading...</div>;
  }

  const handleSignup = async (formData) => {
    try {
      const response = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        setCurrUser(data.user);
        navigate("/", {
          state: {
            flashMessage: { type: "success", text: "Signup successful!" },
          },
        });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <UserContext.Provider value={{ currUser, setCurrUser }}>
      <div>
        <Toaster position="top-center" duration={3000} />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/view" element={<NoteView />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          {/* <Route path="/dashboard/notes" element={<Dashboard />} /> */}
          {/* <Route  element={<Dashboard />} /> */}
          {/* <Route path="/dashboard/savednotes" element={<Dashboard />} /> */}

          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Navigate to="/dashboard/personal-details" replace />} />
            <Route path="personal-details" element={<Profile />} />
            {/* <Route path="notes" element={<NoteView />} /> */}
            <Route path="notes" element={<Notes />} />
            <Route path="view" element={<NoteView />} />
            <Route path="saved-notes" element={<SavedNotes />} />
        </Route>

          <Route
            path="/signup"
            element={
              <SignUp
                onSignup={handleSignup}
                googleSignup={googleLogin}
                setCurrUser={setCurrUser}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <SignIn
                onLogin={handleLogin}
                googleLogin={googleLogin}
                currUser={currUser}
                setCurrUser={setCurrUser}
              />
            }
          />
          <Route path="/logout" element={<LogoutButton />} />
          <Route path="/forget-password" element={<Forgetpass />} />
          <Route path="/email-code" element={<EmailCode />} />
          <Route path="/set-new-password" element={<SetNewpassword />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<AboutUs />} />
          <Route
            path="*"
            element={<div className="mt-30">404 not fount</div>}
          ></Route>
        </Routes>
        <Footer />
      </div>

      
    </UserContext.Provider>
  );
}

export default App;
