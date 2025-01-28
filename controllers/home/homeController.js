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
            ppnSetting: await db.PpnSetting.count(),
            product: await db.Product.count(),
            province: await db.Province.count(),
            store: await db.Store.count(),
            supplier: await db.Supplier.count(),
            uom: await db.Uom.count(),
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
        // Count data for transaction-related entities
        const totals = {
            cxl: await db.Cxl.count(),
            cxInvoice: await db.CxInvoice.count(),
            cxQDetail: await db.CxQDetail.count(),
            cxQuotation: await db.CxQuotation.count(),
            gr: await db.Gr.count(),
            grDetail: await db.GrDetail.count(),
            lastMile: await db.LastMile.count(),
            lastMileDetail: await db.LastMileDetail.count(),
            pi: await db.Pi.count(),
            piDetail: await db.PiDetail.count(),
            piPayment: await db.PiPayment.count(),
            purchaseOrder: await db.PurchaseOrder.count(),
            purchaseOrderDetail: await db.PurchaseOrderDetail.count(),
        };

        // Respond with the aggregated totals
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
