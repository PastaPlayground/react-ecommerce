const jwt = require("jsonwebtoken");

const generateJWT = ({ username, store }) => {
  return new Promise((resolve, reject) => {
    // create JWT token
    jwt.sign(
      { username, store },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_REFRESH_TOKEN,
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
  });
};
module.exports = generateJWT;
