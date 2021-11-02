const User = require("../models/User");
const bcrypt = require("bcrypt");
const {createToken, createRefreshToken } = require("../auth/jwt");

const comparePassword = async (password, hashedPassword) => {
  const match = await bcrypt.compare(password, hashedPassword);
  return match;
};

const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    // checking if email or password is empty
    if (!email || !password) {
      res
        .status(400)
        .json({message: "Please enter a valid username and password"});
    }
    
    //finding user with given email
    const user = await User.findOne({email: email});
    if (!user) {
      res.status(404).json({message: "No user with the email found"});
    }
    
    //matching entered password with DB password
    const match = await comparePassword(password, user.password);
    if (!match) {
      res.send({message: "Username or Password incorrect"});
    }

    // generating Refresh and Access Tokens
    const accessToken = await createToken(user);
    const refreshToken = await createRefreshToken(user);
    res.json({accessToken, refreshToken});
  } catch (err) {
    console.log(err.message);
    res.json({message: err.message});
  }
};

module.exports = login;
