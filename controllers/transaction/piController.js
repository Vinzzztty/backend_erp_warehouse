const db = require("../../models");

// Models
const ProformaInvoice = db.ProformaInvoice;
const PurchaseOrder = db.PurchaseOrder;
const Supplier = db.Supplier;

exports.createProformaInvoice = async (req, res) => {
    try {
        const { Date, PONumber, SupplierId, Notes } = req.body;

        // 1. Validate PurchaseOrder
        const purchaseOrder = await PurchaseOrder.findByPk(PONumber);
        if (!purchaseOrder) {
            return res.status(404).json({
                status: { code: 404, message: "PurchaseOrder not found" },
            });
        }

        // 2. Validate Supplier
        const supplier = await Supplier.findByPk(SupplierId);
        if (!supplier) {
            return res.status(404).json({
                status: { code: 404, message: "Supplier not found" },
            });
        }

        // 3. Create the ProformaInvoice
        const newProformaInvoice = await ProformaInvoice.create({
            Date,
            PONumber,
            SupplierId,
            Notes,
        });

        res.status(201).json({
            status: {
                code: 201,
                message: "ProformaInvoice created successfully",
            },
            data: newProformaInvoice,
        });
    } catch (error) {
        res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

exports.getAllProformaInvoices = async (req, res) => {
    try {
        const proformaInvoices = await ProformaInvoice.findAll({
            include: [
                {
                    model: PurchaseOrder,
                    as: "PurchaseOrder",
                },
                {
                    model: Supplier,
                    as: "Supplier",
                },
            ],
        });

        res.status(200).json({
            status: {
                code: 200,
                message: "ProformaInvoices retrieved successfully",
            },
            data: proformaInvoices,
        });
    } catch (error) {
        res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

exports.getProformaInvoiceById = async (req, res) => {
    try {
        const { id } = req.params;

        const proformaInvoice = await ProformaInvoice.findByPk(id, {
            include: [
                {
                    model: PurchaseOrder,
                    as: "PurchaseOrder",
                },
                {
                    model: Supplier,
                    as: "Supplier",
                },
            ],
        });

        if (!proformaInvoice) {
            return res.status(404).json({
                status: { code: 404, message: "ProformaInvoice not found" },
            });
        }

        res.status(200).json({
            status: {
                code: 200,
                message: "ProformaInvoice retrieved successfully",
            },
            data: proformaInvoice,
        });
    } catch (error) {
        res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

exports.updateProformaInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        const { Date, PONumber, SupplierId, Notes } = req.body;

        const proformaInvoice = await ProformaInvoice.findByPk(id);
        if (!proformaInvoice) {
            return res.status(404).json({
                status: { code: 404, message: "ProformaInvoice not found" },
            });
        }

        // Check if user wants to change PONumber
        if (PONumber && PONumber !== proformaInvoice.PONumber) {
            const purchaseOrder = await PurchaseOrder.findByPk(PONumber);
            if (!purchaseOrder) {
                return res.status(404).json({
                    status: { code: 404, message: "PurchaseOrder not found" },
                });
            }
        }

        // Check if user wants to change SupplierId
        if (SupplierId && SupplierId !== proformaInvoice.SupplierId) {
            const supplier = await Supplier.findByPk(SupplierId);
            if (!supplier) {
                return res.status(404).json({
                    status: { code: 404, message: "Supplier not found" },
                });
            }
        }

        await proformaInvoice.update({
            Date: Date ?? proformaInvoice.Date,
            PONumber: PONumber ?? proformaInvoice.PONumber,
            SupplierId: SupplierId ?? proformaInvoice.SupplierId,
            Notes: Notes ?? proformaInvoice.Notes,
        });

        res.status(200).json({
            status: {
                code: 200,
                message: "ProformaInvoice updated successfully",
            },
            data: proformaInvoice,
        });
    } catch (error) {
        res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

exports.deleteProformaInvoice = async (req, res) => {
    try {
        const { id } = req.params;

        const proformaInvoice = await ProformaInvoice.findByPk(id);
        if (!proformaInvoice) {
            return res.status(404).json({
                status: { code: 404, message: "ProformaInvoice not found" },
            });
        }

        await proformaInvoice.destroy();

        res.status(200).json({
            status: {
                code: 200,
                message: "ProformaInvoice deleted successfully",
            },
        });
    } catch (error) {
        res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};
