const connection = require("../server/database-connection");

const VerifyOwner = (username) => {
  return new Promise((resolve, reject) => {
    const queryGetUser = `SELECT store FROM accounts WHERE username = ?`;
    connection.query(queryGetUser, [username], (error, user) => {
      if (error) reject(error);
      else if (user.length > 0) {
        return resolve(user[0]);
      } else {
        return resolve(false);
      }
    });
  });
};
module.exports = VerifyOwner;
