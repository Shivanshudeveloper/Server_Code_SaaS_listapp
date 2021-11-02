const User = require("../models/User");
const bcrypt = require("bcrypt");
const {createToken, verifyToken, createRefreshToken} = require("../auth/jwt");

const registerUser = async (req, res) => {
  try {
    // checking if username, password or firstname field is empty
    if (!req.body.firstname || !req.body.email || !req.body.password) {
      res.status(400).json({message: "Please enter a valid user"});
    }

    // finding if a user with the given mail already exixts
    const userFind = await User.findOne({email: req.body.email});
    if (userFind) {
      res.status(400).json({message: "Email already exists. Please login"});
    }

    // hashing password before storing in DB
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // creating new DB entry
    const newUser = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    // creating access and refresh tokens
    const accessToken = await createToken(user);
    const refreshToken = await createRefreshToken(user);

    // response to be sent
    const displayUser = {
      userId: user._id,
      firstName: user.firstname,
      lastName: user.lastname,
      email: user.email,
      accessToken,
      refreshToken
    };

    res.json(displayUser);
  } catch (err) {
    res.json({message: err.message});
  }
};

module.exports = registerUser;
