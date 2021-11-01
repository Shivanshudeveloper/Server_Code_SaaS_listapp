const User = require("../models/User");
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
  try {
    if(!req.body.firstname || !req.body.email || !req.body.password){
      res.status(400).json({message: 'Please enter a valid user'});
    }

    const userFind = await User.findOne({email: req.body.email});
    if(userFind){
      res.status(400).json({message: 'Email already exists. Please login'});
    }
    
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    res.json({message: 'User successfully created'});
  } catch (err) {
    res.json({message: err.message});
  }
};

module.exports = registerUser;
