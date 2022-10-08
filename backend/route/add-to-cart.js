const connection = require("../server/database-connection");
const errorHandler = require("../middleware/errorHandler");

const addCart = function (app) {
  app.post("/add-to-cart/:item", (req, res) => {
    const { item } = req.params;
    const { buyingQuantity } = req.body;
    const queryGetItem = `SELECT itemname, quantity FROM items WHERE itemname = ?`;
    connection.query(queryGetItem, [item], (error, info) => {
      if (error) throw error;
      else if (info.length > 0) {
        const quantity = info[0].quantity;
        if (buyingQuantity > quantity) {
          return errorHandler({ code: 500, message: `Invalid quantity amount. Please select < ${quantity}` }, req, res);
        } else {
          res.send({ code: 200, message: `Added to cart. Quantity: ${buyingQuantity}` });
        }
      } else {
        return errorHandler({ code: 404, message: "Item not found" }, req, res);
      }
    });
  });
};

module.exports = addCart;
