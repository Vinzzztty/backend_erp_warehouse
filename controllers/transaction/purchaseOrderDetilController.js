const db = require("../../models");

// Models
const PurchaseOrderDetails = db.PurchaseOrderDetil;
const PurchaseOrder = db.PurchaseOrder;
const Product = db.Product;

exports.createPurchaseOrderDetail = async (req, res) => {
    try {
        const {
            PurchaseOrderId,
            SKUCode,
            ProductName,
            Variant,
            ProductImage,
            QTY,
            UnitPrice,
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
        } = req.body;

        // 1. Validate PurchaseOrder
        const purchaseOrder = await PurchaseOrder.findByPk(PurchaseOrderId);
        if (!purchaseOrder) {
            return res.status(404).json({
                status: { code: 404, message: "PurchaseOrder not found" },
            });
        }

        // 2. Validate Product by SKUCode
        const product = await Product.findOne({ where: { SKUCode } });
        if (!product) {
            return res.status(404).json({
                status: {
                    code: 404,
                    message: "Product not found by the given SKUCode",
                },
            });
        }

        // 3. If you want to auto-fill fields from the Product, do it here
        //    e.g., enforce product name from Product model.
        //    If "ProductName" is optional from user input, you can override it:
        // const autoFilledName = product.Name;
        // const autoFilledVariant = product.Variant?.Name ?? "Default Variant";
        // etc.

        const newDetails = await PurchaseOrderDetails.create({
            PurchaseOrderId,
            SKUCode,
            // If you want to override user input with the actual product name:
            ProductName: ProductName || product.Name,
            Variant,
            ProductImage,
            QTY,
            UnitPrice,
            FirstMile,
            CartonP,
            CartonL,
            CartonT,
            CartonQty,
            PricePerCarton, // The model hook will recalc anyway if CartonQty & UnitPrice exist
            EstimatedCBMTotal, // The model hook will also recalc if dimensions & CartonQty exist
            CartonWeight,
            MarkingNumber,
            Credit,
            Note,
        });

        // The "beforeSave" hook in your model will auto-calc PricePerCarton & EstimatedCBMTotal
        // so you may want to reload the instance:
        await newDetails.reload();

        return res.status(201).json({
            status: {
                code: 201,
                message: "PurchaseOrderDetail created successfully",
            },
            data: newDetails,
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

exports.getAllPurchaseOrderDetails = async (req, res) => {
    try {
        const details = await PurchaseOrderDetails.findAll({
            include: [
                { model: PurchaseOrder, as: "PurchaseOrder" },
                { model: Product, as: "Product" },
            ],
        });

        return res.status(200).json({
            status: {
                code: 200,
                message: "PurchaseOrderDetails retrieved successfully",
            },
            data: details,
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

exports.getPurchaseOrderDetailById = async (req, res) => {
    try {
        const { id } = req.params;

        const detail = await PurchaseOrderDetails.findByPk(id, {
            include: [
                { model: PurchaseOrder, as: "PurchaseOrder" },
                { model: Product, as: "Product" },
            ],
        });

        if (!detail) {
            return res.status(404).json({
                status: { code: 404, message: "PurchaseOrderDetail not found" },
            });
        }

        return res.status(200).json({
            status: {
                code: 200,
                message: "PurchaseOrderDetail retrieved successfully",
            },
            data: detail,
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

exports.updatePurchaseOrderDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            PurchaseOrderId,
            SKUCode,
            ProductName,
            Variant,
            ProductImage,
            QTY,
            UnitPrice,
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
        } = req.body;

        const detail = await PurchaseOrderDetails.findByPk(id);
        if (!detail) {
            return res.status(404).json({
                status: { code: 404, message: "PurchaseOrderDetail not found" },
            });
        }

        // If user wants to change the PurchaseOrderId
        if (PurchaseOrderId && PurchaseOrderId !== detail.PurchaseOrderId) {
            const po = await PurchaseOrder.findByPk(PurchaseOrderId);
            if (!po) {
                return res.status(404).json({
                    status: { code: 404, message: "PurchaseOrder not found" },
                });
            }
        }

        // If user wants to change the SKUCode
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

        // Update record
        await detail.update({
            PurchaseOrderId: PurchaseOrderId ?? detail.PurchaseOrderId,
            SKUCode: SKUCode ?? detail.SKUCode,
            ProductName: ProductName ?? detail.ProductName,
            Variant: Variant ?? detail.Variant,
            ProductImage: ProductImage ?? detail.ProductImage,
            QTY: QTY ?? detail.QTY,
            UnitPrice: UnitPrice ?? detail.UnitPrice,
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
        });

        // Reload to get fresh calculations from model hook
        await detail.reload();

        return res.status(200).json({
            status: {
                code: 200,
                message: "PurchaseOrderDetail updated successfully",
            },
            data: detail,
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

exports.deletePurchaseOrderDetail = async (req, res) => {
    try {
        const { id } = req.params;

        const detail = await PurchaseOrderDetails.findByPk(id);
        if (!detail) {
            return res.status(404).json({
                status: { code: 404, message: "PurchaseOrderDetail not found" },
            });
        }

        await detail.destroy();

        return res.status(200).json({
            status: {
                code: 200,
                message: "PurchaseOrderDetail deleted successfully",
            },
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};
