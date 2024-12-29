const db = require("../../models");
const CxInvoice = db.CxInvoice;
const Forwarder = db.Forwarder;

/**
 * Create a new CxInvoice
 */
exports.createCxInvoice = async (req, res) => {
    try {
        const { Date, ForwarderId, Note, Status } = req.body;

        // 1. Validate Forwarder
        const forwarder = await Forwarder.findByPk(ForwarderId);
        if (!forwarder) {
            return res.status(404).json({
                status: { code: 404, message: "Forwarder not found" },
            });
        }

        // 2. Create the CxInvoice
        const newInvoice = await CxInvoice.create({
            Date,
            ForwarderId,
            Note,
            Status,
        });

        return res.status(201).json({
            status: { code: 201, message: "CxInvoice created successfully" },
            data: newInvoice,
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

/**
 * Get all CxInvoices
 */
exports.getAllCxInvoices = async (req, res) => {
    try {
        const invoices = await CxInvoice.findAll({
            include: [{ model: Forwarder, as: "Forwarder" }],
        });

        return res.status(200).json({
            status: { code: 200, message: "CxInvoices retrieved successfully" },
            data: invoices,
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

/**
 * Get a single CxInvoice by ID
 */
exports.getCxInvoiceById = async (req, res) => {
    try {
        const { id } = req.params;

        const invoice = await CxInvoice.findByPk(id, {
            include: [{ model: Forwarder, as: "Forwarder" }],
        });
        if (!invoice) {
            return res.status(404).json({
                status: { code: 404, message: "CxInvoice not found" },
            });
        }

        return res.status(200).json({
            status: { code: 200, message: "CxInvoice retrieved successfully" },
            data: invoice,
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

/**
 * Update a CxInvoice
 */
exports.updateCxInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        const { Date, ForwarderId, Note, Status } = req.body;

        // Find existing record
        const invoice = await CxInvoice.findByPk(id);
        if (!invoice) {
            return res.status(404).json({
                status: { code: 404, message: "CxInvoice not found" },
            });
        }

        // If ForwarderId changes, validate
        if (ForwarderId && ForwarderId !== invoice.ForwarderId) {
            const forwarder = await Forwarder.findByPk(ForwarderId);
            if (!forwarder) {
                return res.status(404).json({
                    status: { code: 404, message: "Forwarder not found" },
                });
            }
        }

        await invoice.update({
            Date: Date ?? invoice.Date,
            ForwarderId: ForwarderId ?? invoice.ForwarderId,
            Note: Note ?? invoice.Note,
            Status: Status ?? invoice.Status,
        });

        return res.status(200).json({
            status: { code: 200, message: "CxInvoice updated successfully" },
            data: invoice,
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

/**
 * Delete a CxInvoice
 */
exports.deleteCxInvoice = async (req, res) => {
    try {
        const { id } = req.params;

        const invoice = await CxInvoice.findByPk(id);
        if (!invoice) {
            return res.status(404).json({
                status: { code: 404, message: "CxInvoice not found" },
            });
        }

        await invoice.destroy();

        return res.status(200).json({
            status: { code: 200, message: "CxInvoice deleted successfully" },
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};
