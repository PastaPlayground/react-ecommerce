const connection = require("../server/database-connection");
const errorHandler = require("../middleware/errorHandler");

const getItem = function (app) {
  app.get("/get-item", (req, res) => {
    const name = req.query.name;
    const queryGetItem = `SELECT storename, itemname, quantity, price FROM items WHERE itemname = ?`;
    connection.query(queryGetItem, [name], (error, info) => {
      if (error) throw error;
      else if (info.length > 0) {
        res.send(info);
      } else {
        return errorHandler({ code: 404, message: "Item not found" }, req, res);
      }
    });
  });
};

module.exports = getItem;
