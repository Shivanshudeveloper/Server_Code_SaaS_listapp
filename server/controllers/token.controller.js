const {
  verifyRefreshToken,
  createToken,
  createRefreshToken,
} = require("../auth/jwt");
const User = require("../models/User");

const getToken = async (req, res) => {
  try {
    //checking if the request has a refresh token
    if (!req.body.refreshToken) {
      res.status(404).json({error: "Refresh Token missing"});
    }
    const {refreshToken} = req.body;

    //verifying the refresh token
    const user = await verifyRefreshToken(refreshToken);

    //finding user having id present in refresh token
    const currentUser = await User.findOne({_id: user.userId});
    if (!currentUser) {
      res.status(400).json({error: "Please send a valid refresh token"});
    }

    //generating new access and refresh tokens
    const newAccessToken = await createToken(currentUser);
    const newRefreshToken = await createRefreshToken(currentUser);
    res
      .status(200)
      .json({accessToken: newAccessToken, refreshToken: newRefreshToken});
  } catch (err) {
    console.log(err.message);
    res.status(400).json({error: "Please send a valid refresh token"});
  }
};

module.exports = getToken;
