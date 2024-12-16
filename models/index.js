const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Master Warehouse
db.Warehouse = require("./master/warehouse/warehouse")(sequelize, Sequelize);

// Master Wilayah
db.Country = require("./master/wilayah/country")(sequelize, Sequelize);
db.Province = require("./master/wilayah/province")(sequelize, Sequelize);
db.City = require("./master/wilayah/city")(sequelize, Sequelize);

// Master Business
db.User = require("./user")(sequelize, Sequelize);
db.Company = require("./master/business/company")(sequelize, Sequelize);
db.Forward = require("./master/business/forwarder")(sequelize, Sequelize);
db.Store = require("./master/business/store")(sequelize, Sequelize);
db.Supplier = require("./master/business/supplier")(sequelize, Sequelize);

// Master Finance
db.Cost = require("./master/finance/cost")(sequelize, Sequelize);
db.Bank = require("./master/finance/bank")(sequelize, Sequelize);
db.Currency = require("./master/finance/currency")(sequelize, Sequelize);
db.PPN = require("./master/finance/ppn")(sequelize, Sequelize);

// Master Product
db.Category = require("./master/product/category")(sequelize, Sequelize);
db.Channel = require("./master/product/channel")(sequelize, Sequelize);
db.Product = require("./master/product/product")(sequelize, Sequelize);
db.UoM = require("./master/product/uom")(sequelize, Sequelize);
db.Variant = require("./master/product/variant")(sequelize, Sequelize);


// Define associations
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

module.exports = db;
