import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./components/Auth/SignUp";
import SignIn from "./components/Auth/SignIn";
import Forgetpass from "./components/Auth/PasswordReset/Forgetpass";
import EmailCode from "./components/Auth/PasswordReset/EmailCode";
import SetNewpassword from "./components/Auth/PasswordReset/SetNewpassword";
import Contact from "./components/Pages/Contact";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Pages/Home";
import Dashboard from "./components/Pages/Dashboard";
import AboutUs from "./components/Pages/About";
import View from "./components/Pages/View";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route  path="/" element={<Home />} />
        <Route  path="/view" element={<View/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/forget-password" element={<Forgetpass />} />
        <Route path="/email-code" element={<EmailCode />} />
        <Route path="/set-new-password" element={<SetNewpassword />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
      {/* <Footer /> */}
    </div>


    // <div>
    //   {/* <Header/> */}
    //   <div className='container'>
    //   <Routes>
    //     <Route  path='/' element={<Home/>}/>
    //     {/* <Route  path='/add-blog' element={<AddBlog/>} /> */}
    //     {/* <Route path="*" element={<div>404 not fount</div>}></Route> */}
    //   </Routes>
    //   </div>
    // </div>
  );
}

export default App;
