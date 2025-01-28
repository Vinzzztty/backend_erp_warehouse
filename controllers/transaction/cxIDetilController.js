const db = require("../../models");

// Models
const CxInvoiceDetails = db.CxInvoiceDetil;
const CxInvoice = db.CxInvoice;
const CxQuotation = db.CxQuotation;

/**
 * Create a new CxInvoiceDetails
 */
exports.createCxInvoiceDetail = async (req, res) => {
    try {
        const {
            TransaksiCxInvoiceId,
            CXCode,
            AWB,
            FreightCode,
            Rate,
            FinalCBM,
            CXCostRupiah,
            CXCostRMB,
            PaymentRupiah,
            PaymentRMB,
            RemainingPaymentRupiah,
            RemainingPaymentRMB,
            TotalPaymentRupiah,
            TotalPaymentRMB,
        } = req.body;

        // 1. Validate CxInvoice
        const cxInvoice = await CxInvoice.findByPk(TransaksiCxInvoiceId);
        if (!cxInvoice) {
            return res.status(404).json({
                status: { code: 404, message: "CxInvoice not found" },
            });
        }

        // 2. Validate CxQuotation
        const cxQuotation = await CxQuotation.findByPk(CXCode);
        if (!cxQuotation) {
            return res.status(404).json({
                status: { code: 404, message: "CxQuotation not found" },
            });
        }

        // 3. Create CxInvoiceDetails
        const newDetail = await CxInvoiceDetails.create({
            TransaksiCxInvoiceId,
            CXCode,
            AWB,
            FreightCode,
            Rate,
            FinalCBM,
            CXCostRupiah,
            CXCostRMB,
            PaymentRupiah,
            PaymentRMB,
            RemainingPaymentRupiah,
            RemainingPaymentRMB,
            TotalPaymentRupiah,
            TotalPaymentRMB,
        });

        // Reload to apply model hook calculations
        await newDetail.reload();

        return res.status(201).json({
            status: {
                code: 201,
                message: "CxInvoiceDetail created successfully",
            },
            data: newDetail,
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

/**
 * Get all CxInvoiceDetails
 */
exports.getAllCxInvoiceDetails = async (req, res) => {
    try {
        const details = await CxInvoiceDetails.findAll({
            include: [
                { model: CxInvoice, as: "TransaksiCxInvoice" },
                { model: CxQuotation, as: "CxQuotation" },
            ],
        });

        return res.status(200).json({
            status: {
                code: 200,
                message: "CxInvoiceDetails retrieved successfully",
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
 * Get CxInvoiceDetails by TransaksiCxInvoiceId
 */
exports.getCxInvoiceDetailsByTransaksiCxInvoiceId = async (req, res) => {
    try {
        const { TransaksiCxInvoiceId } = req.params;

        const details = await CxInvoiceDetails.findAll({
            where: { TransaksiCxInvoiceId },
            include: [
                { model: CxInvoice, as: "TransaksiCxInvoice" },
                { model: CxQuotation, as: "CxQuotation" },
            ],
        });

        if (!details || details.length === 0) {
            return res.status(404).json({
                status: {
                    code: 404,
                    message:
                        "No CxInvoiceDetails found for the given TransaksiCxInvoiceId",
                },
            });
        }

        return res.status(200).json({
            status: {
                code: 200,
                message: "CxInvoiceDetails retrieved successfully",
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
 * Get a single CxInvoiceDetails by ID
 */
exports.getCxInvoiceDetailById = async (req, res) => {
    try {
        const { id } = req.params;

        const detail = await CxInvoiceDetails.findByPk(id, {
            include: [
                { model: CxInvoice, as: "TransaksiCxInvoice" },
                { model: CxQuotation, as: "CxQuotation" },
            ],
        });

        if (!detail) {
            return res.status(404).json({
                status: { code: 404, message: "CxInvoiceDetail not found" },
            });
        }

        return res.status(200).json({
            status: {
                code: 200,
                message: "CxInvoiceDetail retrieved successfully",
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
 * Update a CxInvoiceDetails
 */
exports.updateCxInvoiceDetail = async (req, res) => {
    try {
        const { id } = req.params;

        // 1. Find existing record
        const detail = await CxInvoiceDetails.findByPk(id);
        if (!detail) {
            return res.status(404).json({
                status: { code: 404, message: "CxInvoiceDetail not found" },
            });
        }

        const {
            TransaksiCxInvoiceId,
            CXCode,
            AWB,
            FreightCode,
            Rate,
            FinalCBM,
            CXCostRupiah,
            CXCostRMB,
            PaymentRupiah,
            PaymentRMB,
            RemainingPaymentRupiah,
            RemainingPaymentRMB,
            TotalPaymentRupiah,
            TotalPaymentRMB,
        } = req.body;

        // 2. If CxInvoice changes
        if (
            TransaksiCxInvoiceId &&
            TransaksiCxInvoiceId !== detail.TransaksiCxInvoiceId
        ) {
            const cxInvoice = await CxInvoice.findByPk(TransaksiCxInvoiceId);
            if (!cxInvoice) {
                return res.status(404).json({
                    status: { code: 404, message: "CxInvoice not found" },
                });
            }
        }

        // 3. If CxQuotation changes
        if (CXCode && CXCode !== detail.CXCode) {
            const cxQuotation = await CxQuotation.findByPk(CXCode);
            if (!cxQuotation) {
                return res.status(404).json({
                    status: { code: 404, message: "CxQuotation not found" },
                });
            }
        }

        // 4. Update record
        await detail.update({
            TransaksiCxInvoiceId:
                TransaksiCxInvoiceId ?? detail.TransaksiCxInvoiceId,
            CXCode: CXCode ?? detail.CXCode,
            AWB: AWB ?? detail.AWB,
            FreightCode: FreightCode ?? detail.FreightCode,
            Rate: Rate ?? detail.Rate,
            FinalCBM: FinalCBM ?? detail.FinalCBM,
            CXCostRupiah: CXCostRupiah ?? detail.CXCostRupiah,
            CXCostRMB: CXCostRMB ?? detail.CXCostRMB,
            PaymentRupiah: PaymentRupiah ?? detail.PaymentRupiah,
            PaymentRMB: PaymentRMB ?? detail.PaymentRMB,
            RemainingPaymentRupiah:
                RemainingPaymentRupiah ?? detail.RemainingPaymentRupiah,
            RemainingPaymentRMB:
                RemainingPaymentRMB ?? detail.RemainingPaymentRMB,
            TotalPaymentRupiah: TotalPaymentRupiah ?? detail.TotalPaymentRupiah,
            TotalPaymentRMB: TotalPaymentRMB ?? detail.TotalPaymentRMB,
        });

        // Reload for hook calculations
        await detail.reload();

        return res.status(200).json({
            status: {
                code: 200,
                message: "CxInvoiceDetail updated successfully",
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
 * Delete a CxInvoiceDetails
 */
exports.deleteCxInvoiceDetail = async (req, res) => {
    try {
        const { id } = req.params;

        const detail = await CxInvoiceDetails.findByPk(id);
        if (!detail) {
            return res.status(404).json({
                status: { code: 404, message: "CxInvoiceDetail not found" },
            });
        }

        await detail.destroy();

        return res.status(200).json({
            status: {
                code: 200,
                message: "CxInvoiceDetail deleted successfully",
            },
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};
