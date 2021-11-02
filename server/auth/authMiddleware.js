const {verifyToken} = require("../auth/jwt");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  try {
    // checking if auth error exists
    if (!req.headers["authorization"]) {
      res.status(401).json({message: "User not authorized to view this route"});
    }
    //retriveing auth header
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1];
    console.log(token);

    // verifying the token of the auth header
    const verify = await verifyToken(token);
    console.log(verify);
    if (!verify.userId) {
      res.status(401).json({message: "Some error occured. Please Login again"});
    }
    const id = verify.userId;

    //finding user with id of token
    const user = await User.findOne({_id: id});
    if (!user) {
      res.status(401).json({message: "Some error occured. Please Login again"});
    }
    // adding user to req obj
    req.user = user;
    next();
  } catch (err) {
    console.log(err.message);
    res.json({error: 'You are not authorized to view this route'});
  }
};

module.exports = authMiddleware;
