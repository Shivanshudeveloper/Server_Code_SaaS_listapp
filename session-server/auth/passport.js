const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/User");

const options = {
  usernameField: "email",
  passwordField: "password",
};

const verifyCallback = async (email, password, done) => {
  try {
    const user = await User.findOne({email: email});
    if (!user) {
      done(null, false);
    }

    const result = await bcrypt.compare(password, user.password);

    if (result) {
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

passport.use(new LocalStrategy(options, verifyCallback));
