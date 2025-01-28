const db = require("../../models");

exports.getTotalsMaster = async (req, res) => {
    try {
        // Count data for all entities
        const totals = {
            bank: await db.Bank.count(),
            category: await db.Category.count(),
            channel: await db.Channel.count(),
            city: await db.City.count(),
            company: await db.Company.count(),
            cost: await db.Cost.count(),
            country: await db.Country.count(),
            currency: await db.Currency.count(),
            forwarder: await db.Forwarder.count(),
            ppnSetting: await db.PPNSetting.count(),
            product: await db.Product.count(),
            province: await db.Province.count(),
            store: await db.Store.count(),
            supplier: await db.Supplier.count(),
            uom: await db.UoM.count(),
            variant: await db.Variant.count(),
            warehouse: await db.Warehouse.count(),
        };

        // Respond with the aggregated totals
        res.status(200).json({
            success: true,
            data: totals,
        });
    } catch (error) {
        console.error("Error fetching totals:", error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Retrieve totals for transactions
exports.getTransactionTotals = async (req, res) => {
    try {
        // Count totals for main transaction models
        const totals = {
            purchaseOrder: await db.PurchaseOrder.count(),
            proformaInvoice: await db.ProformaInvoice.count(),
            piPayment: await db.PiPayment.count(),
            cxQuotation: await db.CxQuotation.count(),
            cxInvoice: await db.CxInvoice.count(),
            lastMile: await db.LastMile.count(),
            goodsReceipt: await db.GoodsReceipt.count(),
        };

        // Return the totals
        res.status(200).json({
            success: true,
            data: totals,
        });
    } catch (error) {
        console.error("Error fetching transaction totals:", error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
