const connection = require("../../server/database-connection");
const errorHandler = require("../../middleware/errorHandler");
const VerifyOwner = require("../../middleware/verifyOwner");

const updateItem = function (app) {
  app.post("/update-item", async (req, res) => {
    const { username, name, quantity, price } = req.body;

    // Verify user is owner
    const isOwner = await VerifyOwner(username);
    if (!isOwner) {
      return errorHandler({ code: 400, message: "Unauthorised Actions" }, req, res);
    } else {
      const store = isOwner.store;
      const queryGetItem = `UPDATE items SET quantity = ?, price = ? WHERE storename = ? AND itemname = ? `;
      connection.query(queryGetItem, [quantity, price, store, name], (error, result) => {
        if (error) throw error;
        else if (result.changedRows > 0) {
          res.send({ code: 200, message: "Updated item in shop!" });
        } else {
          return errorHandler({ code: 400, message: "Unable to update item in shop!" }, req, res);
        }
      });
    }
  });
};

module.exports = updateItem;
