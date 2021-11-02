const jwt = require("jsonwebtoken");
const {accessTokenSecret, refreshTokenSecret} = require("../config/keys");

const createToken = (user) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {userId: user._id},
      accessTokenSecret,
      {expiresIn: "1m"},
      (err, token) => {
        if (err) {
          console.log(err.message);
          reject(
            new Error("Internal Server Error. Please try again in some time")
          );
        }
        resolve(token);
      }
    );
  });
};

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, accessTokenSecret, (err, payload) => {
      if (err) {
        console.log(err.message);
        reject(new Error(err.message));
      }
      resolve({userId: payload.userId});
    });
  });
};

const createRefreshToken = (user) => {
  return new Promise((resolve, reject) => {
    jwt.sign({userId: user._id}, refreshTokenSecret, {expiresIn: "1y"}, (err, token) => {
      if (err) {
        console.log(err.message);
        reject(
          new Error("Internal Server Error. Please try again in some time")
        );
      }
      resolve(token);
    });
  });
};

const verifyRefreshToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, refreshTokenSecret, (err, payload) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(payload);
    });
  });
};

module.exports = {
  createToken,
  verifyToken,
  createRefreshToken,
  verifyRefreshToken,
};
