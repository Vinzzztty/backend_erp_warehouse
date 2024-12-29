const db = require("../../models");

// Models
const CxQuotationDetails = db.CxQuotationDetil;
const CxQuotation = db.CxQuotation;
const ProformaInvoice = db.ProformaInvoice;

exports.createCxQuotationDetail = async (req, res) => {
    try {
        const {
            CxQuotationId,
            PICode,
            ProductName,
            Variant,
            ProductImage,
            QTY,
            CartonP,
            CartonL,
            CartonT,
            CartonQty,
            TotalPriceInPI,
            EstimatedCBMTotal,
            RatePerCBM,
            MarkingNumber,
            CrossBorderFee,
            ImportDuties,
            DiscountAndFees,
            LastMileTrackingNumber,
            CXCost,
            TotalCXCost,
        } = req.body;

        // 1. Validate CxQuotation
        const cxQuotation = await CxQuotation.findByPk(CxQuotationId);
        if (!cxQuotation) {
            return res.status(404).json({
                status: { code: 404, message: "CxQuotation not found" },
            });
        }

        // 2. Validate ProformaInvoice
        const proformaInvoice = await ProformaInvoice.findByPk(PICode);
        if (!proformaInvoice) {
            return res.status(404).json({
                status: { code: 404, message: "ProformaInvoice not found" },
            });
        }

        // 3. Create CxQuotationDetails record
        const newDetail = await CxQuotationDetails.create({
            CxQuotationId,
            PICode,
            ProductName,
            Variant,
            ProductImage,
            QTY,
            CartonP,
            CartonL,
            CartonT,
            CartonQty,
            TotalPriceInPI,
            EstimatedCBMTotal,
            RatePerCBM,
            MarkingNumber,
            CrossBorderFee,
            ImportDuties,
            DiscountAndFees,
            LastMileTrackingNumber,
            CXCost,
            TotalCXCost,
        });

        // Reload to get updated hook calculations
        await newDetail.reload();

        return res.status(201).json({
            status: {
                code: 201,
                message: "CxQuotationDetail created successfully",
            },
            data: newDetail,
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

exports.getAllCxQuotationDetails = async (req, res) => {
    try {
        const details = await CxQuotationDetails.findAll({
            include: [
                { model: CxQuotation, as: "CxQuotation" },
                { model: ProformaInvoice, as: "ProformaInvoice" },
            ],
        });

        return res.status(200).json({
            status: {
                code: 200,
                message: "CxQuotationDetails retrieved successfully",
            },
            data: details,
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

exports.getCxQuotationDetailById = async (req, res) => {
    try {
        const { id } = req.params;
        const detail = await CxQuotationDetails.findByPk(id, {
            include: [
                { model: CxQuotation, as: "CxQuotation" },
                { model: ProformaInvoice, as: "ProformaInvoice" },
            ],
        });

        if (!detail) {
            return res.status(404).json({
                status: { code: 404, message: "CxQuotationDetail not found" },
            });
        }

        return res.status(200).json({
            status: {
                code: 200,
                message: "CxQuotationDetail retrieved successfully",
            },
            data: detail,
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

exports.updateCxQuotationDetail = async (req, res) => {
    try {
        const { id } = req.params;

        const detail = await CxQuotationDetails.findByPk(id);
        if (!detail) {
            return res.status(404).json({
                status: { code: 404, message: "CxQuotationDetail not found" },
            });
        }

        const {
            CxQuotationId,
            PICode,
            ProductName,
            Variant,
            ProductImage,
            QTY,
            CartonP,
            CartonL,
            CartonT,
            CartonQty,
            TotalPriceInPI,
            EstimatedCBMTotal,
            RatePerCBM,
            MarkingNumber,
            CrossBorderFee,
            ImportDuties,
            DiscountAndFees,
            LastMileTrackingNumber,
            CXCost,
            TotalCXCost,
        } = req.body;

        // If CxQuotationId changes
        if (CxQuotationId && CxQuotationId !== detail.CxQuotationId) {
            const cxQuotation = await CxQuotation.findByPk(CxQuotationId);
            if (!cxQuotation) {
                return res.status(404).json({
                    status: { code: 404, message: "CxQuotation not found" },
                });
            }
        }

        // If PICode changes
        if (PICode && PICode !== detail.PICode) {
            const proformaInvoice = await ProformaInvoice.findByPk(PICode);
            if (!proformaInvoice) {
                return res.status(404).json({
                    status: { code: 404, message: "ProformaInvoice not found" },
                });
            }
        }

        // Update record
        await detail.update({
            CxQuotationId: CxQuotationId ?? detail.CxQuotationId,
            PICode: PICode ?? detail.PICode,
            ProductName: ProductName ?? detail.ProductName,
            Variant: Variant ?? detail.Variant,
            ProductImage: ProductImage ?? detail.ProductImage,
            QTY: QTY ?? detail.QTY,
            CartonP: CartonP ?? detail.CartonP,
            CartonL: CartonL ?? detail.CartonL,
            CartonT: CartonT ?? detail.CartonT,
            CartonQty: CartonQty ?? detail.CartonQty,
            TotalPriceInPI: TotalPriceInPI ?? detail.TotalPriceInPI,
            EstimatedCBMTotal: EstimatedCBMTotal ?? detail.EstimatedCBMTotal,
            RatePerCBM: RatePerCBM ?? detail.RatePerCBM,
            MarkingNumber: MarkingNumber ?? detail.MarkingNumber,
            CrossBorderFee: CrossBorderFee ?? detail.CrossBorderFee,
            ImportDuties: ImportDuties ?? detail.ImportDuties,
            DiscountAndFees: DiscountAndFees ?? detail.DiscountAndFees,
            LastMileTrackingNumber:
                LastMileTrackingNumber ?? detail.LastMileTrackingNumber,
            CXCost: CXCost ?? detail.CXCost,
            TotalCXCost: TotalCXCost ?? detail.TotalCXCost,
        });

        // Reload to get updated calculations from beforeSave hook
        await detail.reload();

        return res.status(200).json({
            status: {
                code: 200,
                message: "CxQuotationDetail updated successfully",
            },
            data: detail,
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

exports.deleteCxQuotationDetail = async (req, res) => {
    try {
        const { id } = req.params;

        const detail = await CxQuotationDetails.findByPk(id);
        if (!detail) {
            return res.status(404).json({
                status: { code: 404, message: "CxQuotationDetail not found" },
            });
        }

        await detail.destroy();

        return res.status(200).json({
            status: {
                code: 200,
                message: "CxQuotationDetail deleted successfully",
            },
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};
