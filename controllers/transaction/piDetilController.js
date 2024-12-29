const db = require("../../models");

// Models
const ProformaInvoiceDetails = db.ProformaInvoiceDetil;
const ProformaInvoice = db.ProformaInvoice;
const Product = db.Product;

exports.createProformaInvoiceDetail = async (req, res) => {
    try {
        const {
            ProformaInvoiceId,
            SKUCode,
            ProductName,
            Variant,
            ProductImage,
            QTYOrdered,
            QTYApproved,
            UnitPriceOrdered,
            UnitPriceApproved,
            FirstMile,
            CartonP,
            CartonL,
            CartonT,
            CartonQty,
            PricePerCarton,
            EstimatedCBMTotal,
            CartonWeight,
            MarkingNumber,
            Credit,
            Note,
            Total,
        } = req.body;

        // 1. Check ProformaInvoice
        const invoice = await ProformaInvoice.findByPk(ProformaInvoiceId);
        if (!invoice) {
            return res.status(404).json({
                status: { code: 404, message: "ProformaInvoice not found" },
            });
        }

        // 2. Check Product by SKUCode
        const product = await Product.findOne({ where: { SKUCode } });
        if (!product) {
            return res.status(404).json({
                status: {
                    code: 404,
                    message: "Product not found by the given SKUCode",
                },
            });
        }

        // 3. Create the detail
        const newDetail = await ProformaInvoiceDetails.create({
            ProformaInvoiceId,
            SKUCode,
            // Optionally override user input with product data
            ProductName: ProductName || product.Name,
            Variant: Variant || product.Variant,
            ProductImage: ProductImage || product.Image,
            QTYOrdered,
            QTYApproved,
            UnitPriceOrdered,
            UnitPriceApproved,
            FirstMile,
            CartonP,
            CartonL,
            CartonT,
            CartonQty,
            PricePerCarton,
            EstimatedCBMTotal,
            CartonWeight,
            MarkingNumber,
            Credit,
            Note,
            Total,
        });

        // Reload to get any hook-calculated values
        await newDetail.reload();

        return res.status(201).json({
            status: {
                code: 201,
                message: "ProformaInvoiceDetail created successfully",
            },
            data: newDetail,
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

exports.getAllProformaInvoiceDetails = async (req, res) => {
    try {
        const details = await ProformaInvoiceDetails.findAll({
            include: [
                { model: ProformaInvoice, as: "ProformaInvoice" },
                { model: Product, as: "Product" },
            ],
        });

        return res.status(200).json({
            status: {
                code: 200,
                message: "ProformaInvoiceDetails retrieved successfully",
            },
            data: details,
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

exports.getProformaInvoiceDetailById = async (req, res) => {
    try {
        const { id } = req.params;

        const detail = await ProformaInvoiceDetails.findByPk(id, {
            include: [
                { model: ProformaInvoice, as: "ProformaInvoice" },
                { model: Product, as: "Product" },
            ],
        });

        if (!detail) {
            return res.status(404).json({
                status: {
                    code: 404,
                    message: "ProformaInvoiceDetail not found",
                },
            });
        }

        return res.status(200).json({
            status: {
                code: 200,
                message: "ProformaInvoiceDetail retrieved successfully",
            },
            data: detail,
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

exports.updateProformaInvoiceDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            ProformaInvoiceId,
            SKUCode,
            ProductName,
            Variant,
            ProductImage,
            QTYOrdered,
            QTYApproved,
            UnitPriceOrdered,
            UnitPriceApproved,
            FirstMile,
            CartonP,
            CartonL,
            CartonT,
            CartonQty,
            PricePerCarton,
            EstimatedCBMTotal,
            CartonWeight,
            MarkingNumber,
            Credit,
            Note,
            Total,
        } = req.body;

        // 1. Check if detail exists
        const detail = await ProformaInvoiceDetails.findByPk(id);
        if (!detail) {
            return res.status(404).json({
                status: {
                    code: 404,
                    message: "ProformaInvoiceDetail not found",
                },
            });
        }

        // 2. If user wants to change ProformaInvoiceId
        if (
            ProformaInvoiceId &&
            ProformaInvoiceId !== detail.ProformaInvoiceId
        ) {
            const invoice = await ProformaInvoice.findByPk(ProformaInvoiceId);
            if (!invoice) {
                return res.status(404).json({
                    status: { code: 404, message: "ProformaInvoice not found" },
                });
            }
        }

        // 3. If user wants to change SKUCode
        if (SKUCode && SKUCode !== detail.SKUCode) {
            const product = await Product.findOne({ where: { SKUCode } });
            if (!product) {
                return res.status(404).json({
                    status: {
                        code: 404,
                        message: "Product not found by the given SKUCode",
                    },
                });
            }
        }

        // 4. Update record
        await detail.update({
            ProformaInvoiceId: ProformaInvoiceId ?? detail.ProformaInvoiceId,
            SKUCode: SKUCode ?? detail.SKUCode,
            ProductName: ProductName ?? detail.ProductName,
            Variant: Variant ?? detail.Variant,
            ProductImage: ProductImage ?? detail.ProductImage,
            QTYOrdered: QTYOrdered ?? detail.QTYOrdered,
            QTYApproved: QTYApproved ?? detail.QTYApproved,
            UnitPriceOrdered: UnitPriceOrdered ?? detail.UnitPriceOrdered,
            UnitPriceApproved: UnitPriceApproved ?? detail.UnitPriceApproved,
            FirstMile: FirstMile ?? detail.FirstMile,
            CartonP: CartonP ?? detail.CartonP,
            CartonL: CartonL ?? detail.CartonL,
            CartonT: CartonT ?? detail.CartonT,
            CartonQty: CartonQty ?? detail.CartonQty,
            PricePerCarton: PricePerCarton ?? detail.PricePerCarton,
            EstimatedCBMTotal: EstimatedCBMTotal ?? detail.EstimatedCBMTotal,
            CartonWeight: CartonWeight ?? detail.CartonWeight,
            MarkingNumber: MarkingNumber ?? detail.MarkingNumber,
            Credit: Credit ?? detail.Credit,
            Note: Note ?? detail.Note,
            Total: Total ?? detail.Total,
        });

        // Reload to get fresh data from model hook recalculations
        await detail.reload();

        return res.status(200).json({
            status: {
                code: 200,
                message: "ProformaInvoiceDetail updated successfully",
            },
            data: detail,
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

exports.deleteProformaInvoiceDetail = async (req, res) => {
    try {
        const { id } = req.params;

        const detail = await ProformaInvoiceDetails.findByPk(id);
        if (!detail) {
            return res.status(404).json({
                status: {
                    code: 404,
                    message: "ProformaInvoiceDetail not found",
                },
            });
        }

        await detail.destroy();

        return res.status(200).json({
            status: {
                code: 200,
                message: "ProformaInvoiceDetail deleted successfully",
            },
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};
