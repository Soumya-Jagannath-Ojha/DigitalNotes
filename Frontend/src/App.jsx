import { useState } from "react";
import SignUp from "./components/Auth/SignUp";
import SignIn from "./components/Auth/SignIn";
import Forgetpass from "./components/Auth/PasswordReset/Forgetpass";
import EmailCode from "./components/Auth/PasswordReset/EmailCode";
import SetNewpassword from "./components/Auth/PasswordReset/SetNewpassword";
import Contact from "./components/Pages/Contact";
import About from "./components/Pages/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Pages/Home";


function App() {
  return (
    <>
      <Navbar/>
      <Home/>
      {/* <SignUp/>
      <SignIn/>
      <Forgetpass/>
      <EmailCode/>
      <SetNewpassword/> */}
      {/* <Contact/> */}
      {/* <About/> */}
      <Footer/>
    </>
  );
}

export default App;
