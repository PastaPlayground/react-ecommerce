const connection = require("../server/database-connection");
const bcrypt = require("bcrypt");

const AuthUser = (username, password) => {
  return new Promise((resolve, reject) => {
    const queryGetUser = `SELECT username, password FROM accounts WHERE username = ?`;
    connection.query(queryGetUser, [username], (error, user) => {
      if (error) reject(error);
      else if (user.length > 0) {
        const hash = user[0].password;

        bcrypt.compare(password, hash, (err, correctPassword) => {
          if (err) reject("Incorrect Credentials");
          else if (correctPassword) {
            return resolve(user[0]);
          } else {
            return resolve(false);
          }
        });
      }
    });
  });
};
module.exports = AuthUser;
