require("dotenv").config();
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require("./models/user");

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          // If user doesn't exist, create a new one
          user = new User({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
            //avatar: profile.photos[0].value, // Store avatar URL if needed
          });

          await user.save(); // Save the new user to MongoDB
        }

        // Return the user data with 'done' callback
        done(null, user, { message: "User created successfully!" });
      } catch (error) {
        console.error("Error in Google strategy:", error);
        done(error, null);
      }
      // const user = {
      //     username: profile.displayName,
      //     avatar: profile.photos[0],
      // };
      // user.save();
    }
  )
);

passport.serializeUser((user, done) => {
    // console.log("serialize:", user);
    
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    // console.log("deserializeUser",user);
    
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
