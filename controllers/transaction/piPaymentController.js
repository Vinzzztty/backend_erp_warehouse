const db = require("../../models");
const PiPayment = db.PiPayment;
const Supplier = db.Supplier;

/**
 * Create a new PiPayment
 */
exports.createPiPayment = async (req, res) => {
    try {
        const { Date, SupplierId, Notes, Status } = req.body;

        // Validate Supplier
        const supplier = await Supplier.findByPk(SupplierId);
        if (!supplier) {
            return res.status(404).json({
                status: { code: 404, message: "Supplier not found" },
            });
        }

        // Create new PiPayment
        const newPiPayment = await PiPayment.create({
            Date,
            SupplierId,
            Notes,
            Status,
        });

        return res.status(201).json({
            status: { code: 201, message: "PiPayment created successfully" },
            data: newPiPayment,
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

/**
 * Get all PiPayments
 */
exports.getAllPiPayments = async (req, res) => {
    try {
        const piPayments = await PiPayment.findAll({
            include: [{ model: Supplier, as: "Supplier" }],
        });

        return res.status(200).json({
            status: { code: 200, message: "PiPayments retrieved successfully" },
            data: piPayments,
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

/**
 * Get PiPayment by ID
 */
exports.getPiPaymentById = async (req, res) => {
    try {
        const { id } = req.params;
        const piPayment = await PiPayment.findByPk(id, {
            include: [{ model: Supplier, as: "Supplier" }],
        });

        if (!piPayment) {
            return res.status(404).json({
                status: { code: 404, message: "PiPayment not found" },
            });
        }

        return res.status(200).json({
            status: { code: 200, message: "PiPayment retrieved successfully" },
            data: piPayment,
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

/**
 * Update PiPayment
 */
exports.updatePiPayment = async (req, res) => {
    try {
        const { id } = req.params;
        const { Date, SupplierId, Notes, Status } = req.body;

        const piPayment = await PiPayment.findByPk(id);
        if (!piPayment) {
            return res.status(404).json({
                status: { code: 404, message: "PiPayment not found" },
            });
        }

        // If SupplierId changes, validate it
        if (SupplierId && SupplierId !== piPayment.SupplierId) {
            const supplier = await Supplier.findByPk(SupplierId);
            if (!supplier) {
                return res.status(404).json({
                    status: { code: 404, message: "Supplier not found" },
                });
            }
        }

        await piPayment.update({
            Date: Date ?? piPayment.Date,
            SupplierId: SupplierId ?? piPayment.SupplierId,
            Notes: Notes ?? piPayment.Notes,
            Status: Status ?? piPayment.Status,
        });

        return res.status(200).json({
            status: { code: 200, message: "PiPayment updated successfully" },
            data: piPayment,
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

/**
 * Delete PiPayment
 */
exports.deletePiPayment = async (req, res) => {
    try {
        const { id } = req.params;

        const piPayment = await PiPayment.findByPk(id);
        if (!piPayment) {
            return res.status(404).json({
                status: { code: 404, message: "PiPayment not found" },
            });
        }

        await piPayment.destroy();

        return res.status(200).json({
            status: { code: 200, message: "PiPayment deleted successfully" },
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};
