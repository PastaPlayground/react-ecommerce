const connection = require("../../server/database-connection");
const errorHandler = require("../../middleware/errorHandler");
const VerifyOwner = require("../../middleware/verifyOwner");

const addItem = function (app) {
  app.post("/add-item", async (req, res) => {
    const { username, name, quantity, price } = req.body;

    // Verify user is owner
    const isOwner = await VerifyOwner(username);
    if (!isOwner) {
      return errorHandler({ code: 400, message: "Unauthorised Actions" }, req, res);
    } else {
      const store = isOwner.store;
      const queryGetItem = `INSERT INTO items (storename, itemname, quantity, price) VALUES (?, ?, ?, ?) `;
      connection.query(queryGetItem, [store, name, quantity, price], (error, result) => {
        if (error) throw error;
        else if (result.affectedRows > 0) {
          res.send({ code: 200, message: "Added new item to shop!" });
        } else {
          return errorHandler({ code: 400, message: "Unable to add item to shop!" }, req, res);
        }
      });
    }
  });
};

module.exports = addItem;
