const errorHandler = require("../middleware/errorHandler");

const AuthUser = require("../middleware/auth");
const GenerateJWT = require("../middleware/generateJWT");

const Login = function (app) {
  app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    if (username && password) {
      const login = await AuthUser(username, password);
      if (!login) {
        return errorHandler({ message: "Invalid Credentials", code: 400 }, req, res);
      } else {
        const jwt = await GenerateJWT({ username });
        res.send({ code: 200, username: login.username, message: "Success", token: jwt });
      }
    } else {
      return errorHandler({ message: "Please fill up all fields" }, req, res);
    }
  });
};
module.exports = Login;
