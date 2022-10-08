const connection = require("../../server/database-connection");
const errorHandler = require("../../middleware/errorHandler");
const VerifyOwner = require("../../middleware/verifyOwner");

const removeItem = function (app) {
  app.post("/remove-item", async (req, res) => {
    const { username, item } = req.body;

    // Verify user is owner
    const isOwner = await VerifyOwner(username);
    if (!isOwner) {
      return errorHandler({ code: 400, message: "Unauthorised Actions" }, req, res);
    } else {
      const store = isOwner.store;
      const queryGetItem = `DELETE FROM items WHERE storename = ? AND itemname = ? `;
      connection.query(queryGetItem, [store, item], (error, result) => {
        if (error) throw error;
        else if (result.affectedRows > 0) {
          res.send({ code: 200, message: "Removed item from shop!" });
        } else {
          return errorHandler({ code: 400, message: "Item dont exist in shop!" }, req, res);
        }
      });
    }
  });
};

module.exports = removeItem;
