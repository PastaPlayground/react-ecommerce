const connection = require("../server/database-connection");

const getItems = function (app) {
  app.get("/get-items", (req, res) => {
    const queryGetItems = `SELECT storename, itemname, quantity, price FROM items`;
    connection.query(queryGetItems, (error, items) => {
      if (error) throw error;
      res.send(items);
    });
  });
};

module.exports = getItems;
