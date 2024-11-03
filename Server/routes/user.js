const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsyc = require("../utils/wrapAsyc");
const passport = require("passport");
const ensureAuthenticated  = require("../middleware");
// const { saveRedirectUrl } = require("../middleware");

// router.get("/signup", (req, res) => {
//   res.render("users/signup.ejs");
// });

router.post(
  "/signup",
  wrapAsyc(async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ email, username });
      const registeroedUser = await User.register(newUser, password);
      // console.log(registeroedUser);
    //   req.login(registeroedUser, (err)=>{  //After signup auto login
        // if(err){
        //   return next(err);
        // }
    //     req.flash("success", "Welcome to IdeaShare");
    //     res.redirect("/listings");
    //   })
      return res.status(200).json({newUser, message: "Welcome to DigitalNote!", user: registeroedUser });
    } catch (e) {
    //   req.flash("error", e.message);
    //   res.redirect("/signup");
        // res.send("some error occured!");
        // return res.status(400).json({ message: e.message });
        return res.status(400).json({ 
          flashMessage: { type: "error", text: e.message } 
      });
    }
  })
);




// router.post('/signin', 
//   passport.authenticate('local', { session: true }), 
//   (req, res) => {
//     // console.log(req.user._id);
    
//     res.status(200).json({  user: req.user });
//   }
// );
router.post('/signin', 
  passport.authenticate('local', { session: true }), 
  (req, res) => {
    // console.log(req.user._id);
    
    res.status(200).json({  user: req.user });
  }
);

// Route to check if a user is currently authenticated
router.get("/current-user", (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: "No user is authenticated" });
  }
});


// Profile update route
router.put("/dashboard/profile", async (req, res) => {
  try {
    
    // Get profile data from request body
    const { _id, username, email, regdNo, phoneNo, dob, gender, branch, year, sem } = req.body;
    const userId = _id; // Ensure req.user is defined

    // Update user profile
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email, regdNo, phoneNo, dob, gender, branch, year, sem },
      { new: true, runValidators: true } // Return the updated user with validation
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "Profile updated successfully!",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({ message: "An error occurred while updating the profile." });
  }
});


router.post("/dashboard/note/view", async (req, res) => {
  try {
    
    // Get profile data from request body
    const { _id, username } = req.body;
    const userId = _id; // Ensure req.user is defined

    console.log(req.body);
    

    return res.status(200).json({
      message: "Profile updated successfully!",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({ message: "An error occurred while updating the profile." });
  }
});






router.get("/logout", (req, res) => {
  req.logout(err => {
    if (err) {
      return res.status(500).json({ message: "Failed to log out" });
    }
    // res.clearCookie("connect.sid"); // Clear the session cookie if using sessions
    res.status(200).json({ message: "Logged out successfully" });
  });
})

// // Profile update route
// router.put("/profile",  async (req, res) => {
//   try {
//     console.log(req.user._id);
    
//     // Assuming req.user contains the logged-in user's information
//     const userId = req.user._id;

//     // Get profile data from request body
//     const { regdNo, phoneNo, dob, gender, branch,year, sem } = req.body;

//     // Find the user and update their profile
//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       {
//         regdNo,
//         phoneNo,
//         dob,
//         gender,
//         branch,
//         year,
//         sem,
//       },
//       { new: true } // Return the updated user
//     );

//     if (!updatedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     return res.status(200).json({
//       message: "Profile updated successfully!",
//       user: updatedUser,
//     });
//   } catch (error) {
//     console.error("Error updating profile:", error);
//     return res.status(500).json({ message: "An error occurred while updating the profile." });
//   }
// });





module.exports = router;