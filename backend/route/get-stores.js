const connection = require("../server/database-connection");

const getStores = function (app) {
  app.get("/get-stores", (req, res) => {
    const queryGetStores = `SELECT storename, country, website FROM stores`;
    connection.query(queryGetStores, (error, stores) => {
      if (error) throw error;
      res.send(stores);
    });
  });
};

module.exports = getStores;
