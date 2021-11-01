const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require('../models/User');

const verifyCallback = async (username, password, done) => {
  try {
    console.log(username, password);
   const user = await User.findOne({ username: username });
   console.log(user, 200);
   if(!user){
     done(null, false);
   }

  const result = await bcrypt.compare(password, user.password);

   if(result){
     done(null, user);
   } else {
     done(null, false);
   }
  } catch (err) {
    done(err);
  }
};

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(new LocalStrategy(verifyCallback));