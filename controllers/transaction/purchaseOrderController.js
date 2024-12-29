const db = require("../../models");
const PurchaseOrder = db.PurchaseOrder;
const Supplier = db.Supplier;

// Create a new Purchase Order
exports.createPurchaseOrder = async (req, res) => {
    try {
        const { Date, SupplierId, Notes } = req.body;

        // Validate supplier existence
        const supplierExists = await Supplier.findByPk(SupplierId);
        if (!supplierExists) {
            return res.status(404).json({
                status: { code: 404, message: "Supplier not found" },
            });
        }

        const newPurchaseOrder = await PurchaseOrder.create({
            Date,
            SupplierId,
            Notes,
        });

        res.status(201).json({
            status: {
                code: 201,
                message: "Purchase Order created successfully",
            },
            data: newPurchaseOrder,
        });
    } catch (error) {
        res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

// Get All Purchase Orders
exports.getAllPurchaseOrders = async (req, res) => {
    try {
        const purchaseOrders = await PurchaseOrder.findAll({
            include: [
                {
                    model: Supplier,
                    as: "Supplier",
                },
            ],
        });

        res.status(200).json({
            status: {
                code: 200,
                message: "Purchase Orders retrieved successfully",
            },
            data: purchaseOrders,
        });
    } catch (error) {
        res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

// Get Purchase Order by ID
exports.getPurchaseOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const purchaseOrder = await PurchaseOrder.findByPk(id, {
            include: [
                {
                    model: Supplier,
                    as: "Supplier",
                },
            ],
        });

        if (!purchaseOrder) {
            return res.status(404).json({
                status: { code: 404, message: "Purchase Order not found" },
            });
        }

        res.status(200).json({
            status: {
                code: 200,
                message: "Purchase Order retrieved successfully",
            },
            data: purchaseOrder,
        });
    } catch (error) {
        res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

// Update Purchase Order
exports.updatePurchaseOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { Date, SupplierId, Notes } = req.body;

        const purchaseOrder = await PurchaseOrder.findByPk(id);
        if (!purchaseOrder) {
            return res.status(404).json({
                status: { code: 404, message: "Purchase Order not found" },
            });
        }

        // If SupplierId is provided, validate it
        if (SupplierId && SupplierId !== purchaseOrder.SupplierId) {
            const supplierExists = await Supplier.findByPk(SupplierId);
            if (!supplierExists) {
                return res.status(404).json({
                    status: { code: 404, message: "Supplier not found" },
                });
            }
        }

        await purchaseOrder.update({
            Date: Date ?? purchaseOrder.Date,
            SupplierId: SupplierId ?? purchaseOrder.SupplierId,
            Notes: Notes ?? purchaseOrder.Notes,
        });

        res.status(200).json({
            status: {
                code: 200,
                message: "Purchase Order updated successfully",
            },
            data: purchaseOrder,
        });
    } catch (error) {
        res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

// Delete Purchase Order
exports.deletePurchaseOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const purchaseOrder = await PurchaseOrder.findByPk(id);
        if (!purchaseOrder) {
            return res.status(404).json({
                status: { code: 404, message: "Purchase Order not found" },
            });
        }

        await purchaseOrder.destroy();

        res.status(200).json({
            status: {
                code: 200,
                message: "Purchase Order deleted successfully",
            },
        });
    } catch (error) {
        res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};
