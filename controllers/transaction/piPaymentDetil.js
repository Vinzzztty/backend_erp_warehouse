const db = require("../../models");

// Models
const PiPaymentDetails = db.PiPaymentDetil;
const PiPayment = db.PiPayment;
const ProformaInvoice = db.ProformaInvoice;

/**
 * Create a new PiPaymentDetails record
 */
exports.createPiPaymentDetails = async (req, res) => {
    try {
        const {
            PiPaymentId,
            PICode,
            Rate,
            ProductPriceRupiah,
            FirstMileCostRupiah,
            PaymentRupiah,
            PaymentRMB,
            // If you want to allow passing all fields, you can destructure them
            // but make sure you handle them carefully or sanitize inputs
            RemainingPaymentRupiah,
            RemainingPaymentRMB,
            TotalPaymentRupiah,
            TotalPaymentRMB,
        } = req.body;

        // 1. Validate PiPayment
        const piPayment = await PiPayment.findByPk(PiPaymentId);
        if (!piPayment) {
            return res.status(404).json({
                status: { code: 404, message: "PiPayment not found" },
            });
        }

        // 2. Validate ProformaInvoice
        const proformaInvoice = await ProformaInvoice.findByPk(PICode);
        if (!proformaInvoice) {
            return res.status(404).json({
                status: { code: 404, message: "ProformaInvoice not found" },
            });
        }

        // 3. Create PiPaymentDetails
        const newDetails = await PiPaymentDetails.create({
            PiPaymentId,
            PICode,
            Rate,
            ProductPriceRupiah,
            FirstMileCostRupiah,
            PaymentRupiah,
            PaymentRMB,
            RemainingPaymentRupiah,
            RemainingPaymentRMB,
            TotalPaymentRupiah,
            TotalPaymentRMB,
        });

        // Reload to ensure the beforeSave hook calculates everything
        await newDetails.reload();

        return res.status(201).json({
            status: {
                code: 201,
                message: "PiPaymentDetails created successfully",
            },
            data: newDetails,
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

/**
 * Get all PiPaymentDetails records
 */
exports.getAllPiPaymentDetails = async (req, res) => {
    try {
        const details = await PiPaymentDetails.findAll({
            include: [
                { model: PiPayment, as: "PiPayment" },
                { model: ProformaInvoice, as: "ProformaInvoice" },
            ],
        });

        return res.status(200).json({
            status: {
                code: 200,
                message: "PiPaymentDetails retrieved successfully",
            },
            data: details,
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

/**
 * Get PiPaymentDetails by PiPaymentId
 */
exports.getPiPaymentDetailsByPiPaymentId = async (req, res) => {
    try {
        const { PiPaymentId } = req.params;

        const details = await PiPaymentDetails.findAll({
            where: { PiPaymentId },
            include: [
                { model: PiPayment, as: "PiPayment" },
                { model: ProformaInvoice, as: "ProformaInvoice" },
            ],
        });

        if (!details || details.length === 0) {
            return res.status(404).json({
                status: {
                    code: 404,
                    message:
                        "No PiPaymentDetails found for the given PiPaymentId",
                },
            });
        }

        return res.status(200).json({
            status: {
                code: 200,
                message: "PiPaymentDetails retrieved successfully",
            },
            data: details,
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

/**
 * Get a single PiPaymentDetails by ID
 */
exports.getPiPaymentDetailsById = async (req, res) => {
    try {
        const { id } = req.params;
        const detail = await PiPaymentDetails.findByPk(id, {
            include: [
                { model: PiPayment, as: "PiPayment" },
                { model: ProformaInvoice, as: "ProformaInvoice" },
            ],
        });

        if (!detail) {
            return res.status(404).json({
                status: { code: 404, message: "PiPaymentDetails not found" },
            });
        }

        return res.status(200).json({
            status: {
                code: 200,
                message: "PiPaymentDetails retrieved successfully",
            },
            data: detail,
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

/**
 * Update PiPaymentDetails
 */
exports.updatePiPaymentDetails = async (req, res) => {
    try {
        const { id } = req.params;

        const detail = await PiPaymentDetails.findByPk(id);
        if (!detail) {
            return res.status(404).json({
                status: { code: 404, message: "PiPaymentDetails not found" },
            });
        }

        const {
            PiPaymentId,
            PICode,
            Rate,
            ProductPriceRupiah,
            FirstMileCostRupiah,
            PaymentRupiah,
            PaymentRMB,
            RemainingPaymentRupiah,
            RemainingPaymentRMB,
            TotalPaymentRupiah,
            TotalPaymentRMB,
        } = req.body;

        // If PiPaymentId changes, check existence
        if (PiPaymentId && PiPaymentId !== detail.PiPaymentId) {
            const piPayment = await PiPayment.findByPk(PiPaymentId);
            if (!piPayment) {
                return res.status(404).json({
                    status: { code: 404, message: "PiPayment not found" },
                });
            }
        }

        // If PICode changes, check existence
        if (PICode && PICode !== detail.PICode) {
            const proformaInvoice = await ProformaInvoice.findByPk(PICode);
            if (!proformaInvoice) {
                return res.status(404).json({
                    status: { code: 404, message: "ProformaInvoice not found" },
                });
            }
        }

        await detail.update({
            PiPaymentId: PiPaymentId ?? detail.PiPaymentId,
            PICode: PICode ?? detail.PICode,
            Rate: Rate ?? detail.Rate,
            ProductPriceRupiah: ProductPriceRupiah ?? detail.ProductPriceRupiah,
            FirstMileCostRupiah:
                FirstMileCostRupiah ?? detail.FirstMileCostRupiah,
            PaymentRupiah: PaymentRupiah ?? detail.PaymentRupiah,
            PaymentRMB: PaymentRMB ?? detail.PaymentRMB,
            RemainingPaymentRupiah:
                RemainingPaymentRupiah ?? detail.RemainingPaymentRupiah,
            RemainingPaymentRMB:
                RemainingPaymentRMB ?? detail.RemainingPaymentRMB,
            TotalPaymentRupiah: TotalPaymentRupiah ?? detail.TotalPaymentRupiah,
            TotalPaymentRMB: TotalPaymentRMB ?? detail.TotalPaymentRMB,
        });

        // Reload to get new calculations from the model hook
        await detail.reload();

        return res.status(200).json({
            status: {
                code: 200,
                message: "PiPaymentDetails updated successfully",
            },
            data: detail,
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

/**
 * Delete PiPaymentDetails
 */
exports.deletePiPaymentDetails = async (req, res) => {
    try {
        const { id } = req.params;

        const detail = await PiPaymentDetails.findByPk(id);
        if (!detail) {
            return res.status(404).json({
                status: { code: 404, message: "PiPaymentDetails not found" },
            });
        }

        await detail.destroy();

        return res.status(200).json({
            status: {
                code: 200,
                message: "PiPaymentDetails deleted successfully",
            },
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};
