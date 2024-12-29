const db = require("../../models");
const CxQuotation = db.CxQuotation;
const Forwarder = db.Forwarder;

/**
 * Create a new CxQuotation
 */
exports.createCxQuotation = async (req, res) => {
    try {
        const { Date, ForwarderId, Note } = req.body;

        // Validate forwarder
        const forwarder = await Forwarder.findByPk(ForwarderId);
        if (!forwarder) {
            return res.status(404).json({
                status: { code: 404, message: "Forwarder not found" },
            });
        }

        // Create new quotation
        const newQuotation = await CxQuotation.create({
            Date,
            ForwarderId,
            Note,
        });

        return res.status(201).json({
            status: { code: 201, message: "CxQuotation created successfully" },
            data: newQuotation,
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

/**
 * Get all CxQuotations
 */
exports.getAllCxQuotations = async (req, res) => {
    try {
        const cxQuotations = await CxQuotation.findAll({
            include: [{ model: Forwarder, as: "Forwarder" }],
        });

        return res.status(200).json({
            status: {
                code: 200,
                message: "CxQuotations retrieved successfully",
            },
            data: cxQuotations,
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

/**
 * Get a single CxQuotation by ID
 */
exports.getCxQuotationById = async (req, res) => {
    try {
        const { id } = req.params;
        const cxQuotation = await CxQuotation.findByPk(id, {
            include: [{ model: Forwarder, as: "Forwarder" }],
        });

        if (!cxQuotation) {
            return res.status(404).json({
                status: { code: 404, message: "CxQuotation not found" },
            });
        }

        return res.status(200).json({
            status: {
                code: 200,
                message: "CxQuotation retrieved successfully",
            },
            data: cxQuotation,
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

/**
 * Update a CxQuotation
 */
exports.updateCxQuotation = async (req, res) => {
    try {
        const { id } = req.params;
        const { Date, ForwarderId, Note } = req.body;

        // Find existing record
        const cxQuotation = await CxQuotation.findByPk(id);
        if (!cxQuotation) {
            return res.status(404).json({
                status: { code: 404, message: "CxQuotation not found" },
            });
        }

        // If ForwarderId changes, validate forwarder
        if (ForwarderId && ForwarderId !== cxQuotation.ForwarderId) {
            const forwarder = await Forwarder.findByPk(ForwarderId);
            if (!forwarder) {
                return res.status(404).json({
                    status: { code: 404, message: "Forwarder not found" },
                });
            }
        }

        // Proceed with update
        await cxQuotation.update({
            Date: Date ?? cxQuotation.Date,
            ForwarderId: ForwarderId ?? cxQuotation.ForwarderId,
            Note: Note ?? cxQuotation.Note,
        });

        return res.status(200).json({
            status: { code: 200, message: "CxQuotation updated successfully" },
            data: cxQuotation,
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

/**
 * Delete a CxQuotation
 */
exports.deleteCxQuotation = async (req, res) => {
    try {
        const { id } = req.params;
        const cxQuotation = await CxQuotation.findByPk(id);

        if (!cxQuotation) {
            return res.status(404).json({
                status: { code: 404, message: "CxQuotation not found" },
            });
        }

        await cxQuotation.destroy();

        return res.status(200).json({
            status: { code: 200, message: "CxQuotation deleted successfully" },
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};
