const jwt = require("jsonwebtoken");

const generateJWT = ({ username }) => {
  return new Promise((resolve, reject) => {
    // create JWT token
    jwt.sign(
      { username },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_REFRESH_TOKEN,
      },
      (error, result) => {
        // console.log(result);
        if (error) reject(error);
        else resolve(result);
      }
    );
  });
};
module.exports = generateJWT;
