const Sequelize = require("sequelize");
const sequelize = require("../config/db_local");

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
db.Forwarder = require("./master/business/forwarder")(sequelize, Sequelize);
db.Store = require("./master/business/store")(sequelize, Sequelize);
db.Supplier = require("./master/business/supplier")(sequelize, Sequelize);

// Master Finance
db.Cost = require("./master/finance/cost")(sequelize, Sequelize);
db.Bank = require("./master/finance/bank")(sequelize, Sequelize);
db.Currency = require("./master/finance/currency")(sequelize, Sequelize);
db.PPNSetting = require("./master/finance/ppn")(sequelize, Sequelize);

// Master Product
db.Category = require("./master/product/category")(sequelize, Sequelize);
db.Channel = require("./master/product/channel")(sequelize, Sequelize);
db.Product = require("./master/product/product")(sequelize, Sequelize);
db.UoM = require("./master/product/uom")(sequelize, Sequelize);
db.Variant = require("./master/product/variant")(sequelize, Sequelize);

// Transaction
db.PurchaseOrder = require("./transaction/purchaseOrder")(sequelize, Sequelize);
db.PurchaseOrderDetil = require("./transaction/purchaseOrderDetil")(
    sequelize,
    Sequelize
);
db.ProformaInvoice = require("./transaction/piInvoice")(sequelize, Sequelize);
db.ProformaInvoiceDetil = require("./transaction/piInvoiceDetil")(
    sequelize,
    Sequelize
);

db.PiPayment = require("./transaction/piPayment")(sequelize, Sequelize);
db.PiPaymentDetil = require("./transaction/piPaymentDetil")(
    sequelize,
    Sequelize
);

db.CxQuotation = require("./transaction/cxQuotation")(sequelize, Sequelize);
db.CxQuotationDetil = require("./transaction/cxQuotationDetil")(
    sequelize,
    Sequelize
);

db.CxInvoice = require("./transaction/cxInvoice")(sequelize, Sequelize);
db.CxInvoiceDetil = require("./transaction/cxInvoiceDetil")(
    sequelize,
    Sequelize
);

db.LastMile = require("./transaction/lastMile")(sequelize, Sequelize);
db.LastMileDetil = require("./transaction/lastMileDetil")(sequelize, Sequelize);

db.GoodsReceipt = require("./transaction/goodsReceipt")(sequelize, Sequelize);
db.GoodsReceiptDetil = require("./transaction/goodsReceiptDetil")(
    sequelize,
    Sequelize
);

// Product Pricing
db.BuyingPrice = require("./transaction/product_pricing/buyingPrice")(
    sequelize,
    Sequelize
);
db.BuyingPriceDetil = require("./transaction/product_pricing/buyingPriceDetil")(
    sequelize,
    Sequelize
);

db.SettingPrice = require("./transaction/product_pricing/settingPrice")(
    sequelize,
    Sequelize
);
db.SettingPriceDetil =
    require("./transaction/product_pricing/settingPriceDetil")(
        sequelize,
        Sequelize
    );

// Define associations
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

console.log(Object.keys(db)); // Should include TransaksiCxQuotation, TransaksiCxQuotationDetails, and ProformaInvoice

module.exports = db;
