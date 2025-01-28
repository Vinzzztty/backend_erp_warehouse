const db = require("../../models");

exports.getTotalsMaster = async (req, res) => {
    try {
        // Count totals for each entity
        const productTotal = await db.Product.count();
        const financeTotal = await db.Cost.count(); // Example for finance-related data
        const businessTotal = await db.Company.count();
        const warehouseTotal = await db.Warehouse.count();
        const wilayahTotal = await db.City.count();

        // Return the totals
        res.status(200).json({
            success: true,
            data: {
                product: productTotal,
                finance: financeTotal,
                business: businessTotal,
                warehouse: warehouseTotal,
                wilayah: wilayahTotal,
            },
        });
    } catch (error) {
        console.error("Error fetching dashboard totals:", error);
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
