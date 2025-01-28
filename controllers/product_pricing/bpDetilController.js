const db = require("../../models");

// Models
const BuyingPriceDetails = db.BuyingPriceDetil;
const BuyingPrice = db.BuyingPrice;
const ProformaInvoice = db.ProformaInvoice;
const Cost = db.Cost;

/**
 * Create BuyingPriceDetails
 */
exports.createBuyingPriceDetails = async (req, res) => {
    try {
        const {
            BuyingPriceId,
            PICode,
            SKUFull,
            SKUParent,
            SKUCode,
            SKUCodeChild,
            Name,
            ProdCost,
            FirstMileCost,
            LastMileCost,
            Biaya, // references M.Cost (Code)
            OrderedQty, // This field isn't in the model definition but is implied in your hook usage
            SellingPrice,
        } = req.body;

        // 1. Validate BuyingPrice
        const buyingPrice = await BuyingPrice.findByPk(BuyingPriceId);
        if (!buyingPrice) {
            return res.status(404).json({
                status: { code: 404, message: "BuyingPrice not found" },
            });
        }

        // 2. Validate ProformaInvoice
        const proformaInvoice = await ProformaInvoice.findByPk(PICode);
        if (!proformaInvoice) {
            return res.status(404).json({
                status: { code: 404, message: "ProformaInvoice not found" },
            });
        }

        // 3. Validate Cost if Biaya is provided
        if (Biaya) {
            const cost = await Cost.findByPk(Biaya);
            if (!cost) {
                return res.status(404).json({
                    status: { code: 404, message: "Cost not found" },
                });
            }
        }

        // 4. Create record
        const newDetail = await BuyingPriceDetails.create({
            BuyingPriceId,
            PICode,
            SKUFull,
            SKUParent,
            SKUCode,
            SKUCodeChild,
            Name,
            ProdCost,
            FirstMileCost,
            LastMileCost,
            Biaya,
            OrderedQty,
            SellingPrice,
        });

        // Reload to ensure hook calculations are applied
        await newDetail.reload();

        return res.status(201).json({
            status: {
                code: 201,
                message: "BuyingPriceDetails created successfully",
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
 * Get All BuyingPriceDetails
 */
exports.getAllBuyingPriceDetails = async (req, res) => {
    try {
        const details = await BuyingPriceDetails.findAll({
            include: [
                { model: BuyingPrice, as: "BuyingPrice" },
                { model: ProformaInvoice, as: "ProformaInvoice" },
                { model: Cost, as: "Cost" },
            ],
        });

        return res.status(200).json({
            status: {
                code: 200,
                message: "BuyingPriceDetails retrieved successfully",
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
 * Get BuyingPriceDetails by BuyingPriceId
 */
exports.getBuyingPriceDetailsByBuyingPriceId = async (req, res) => {
    try {
        const { buyingPriceId } = req.params;

        const detail = await BuyingPriceDetails.findOne({
            where: { BuyingPriceId: buyingPriceId }, // Assuming "BuyingPriceId" is the foreign key
            include: [
                { model: BuyingPrice, as: "BuyingPrice" },
                { model: ProformaInvoice, as: "ProformaInvoice" },
                { model: Cost, as: "Cost" },
            ],
        });

        if (!detail) {
            return res.status(404).json({
                status: { code: 404, message: "BuyingPriceDetails not found" },
            });
        }

        return res.status(200).json({
            status: {
                code: 200,
                message: "BuyingPriceDetails retrieved successfully",
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
 * Get BuyingPriceDetails by ID
 */
exports.getBuyingPriceDetailsById = async (req, res) => {
    try {
        const { id } = req.params;

        const detail = await BuyingPriceDetails.findByPk(id, {
            include: [
                { model: BuyingPrice, as: "BuyingPrice" },
                { model: ProformaInvoice, as: "ProformaInvoice" },
                { model: Cost, as: "Cost" },
            ],
        });
        if (!detail) {
            return res.status(404).json({
                status: { code: 404, message: "BuyingPriceDetails not found" },
            });
        }

        return res.status(200).json({
            status: {
                code: 200,
                message: "BuyingPriceDetails retrieved successfully",
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
 * Update BuyingPriceDetails
 */
exports.updateBuyingPriceDetails = async (req, res) => {
    try {
        const { id } = req.params;

        const detail = await BuyingPriceDetails.findByPk(id);
        if (!detail) {
            return res.status(404).json({
                status: { code: 404, message: "BuyingPriceDetails not found" },
            });
        }

        const {
            BuyingPriceId,
            PICode,
            SKUFull,
            SKUParent,
            SKUCode,
            SKUCodeChild,
            Name,
            ProdCost,
            FirstMileCost,
            LastMileCost,
            Biaya,
            OrderedQty,
            SellingPrice,
        } = req.body;

        // If BuyingPriceId changes, validate
        if (BuyingPriceId && BuyingPriceId !== detail.BuyingPriceId) {
            const buyingPrice = await BuyingPrice.findByPk(BuyingPriceId);
            if (!buyingPrice) {
                return res.status(404).json({
                    status: { code: 404, message: "BuyingPrice not found" },
                });
            }
        }

        // If PICode changes, validate
        if (PICode && PICode !== detail.PICode) {
            const proformaInvoice = await ProformaInvoice.findByPk(PICode);
            if (!proformaInvoice) {
                return res.status(404).json({
                    status: { code: 404, message: "ProformaInvoice not found" },
                });
            }
        }

        // If Biaya changes
        if (Biaya && Biaya !== detail.Biaya) {
            const cost = await Cost.findByPk(Biaya);
            if (!cost) {
                return res.status(404).json({
                    status: { code: 404, message: "Cost not found" },
                });
            }
        }

        await detail.update({
            BuyingPriceId: BuyingPriceId ?? detail.BuyingPriceId,
            PICode: PICode ?? detail.PICode,
            SKUFull: SKUFull ?? detail.SKUFull,
            SKUParent: SKUParent ?? detail.SKUParent,
            SKUCode: SKUCode ?? detail.SKUCode,
            SKUCodeChild: SKUCodeChild ?? detail.SKUCodeChild,
            Name: Name ?? detail.Name,
            ProdCost: ProdCost ?? detail.ProdCost,
            FirstMileCost: FirstMileCost ?? detail.FirstMileCost,
            LastMileCost: LastMileCost ?? detail.LastMileCost,
            Biaya: Biaya ?? detail.Biaya,
            OrderedQty: OrderedQty ?? detail.OrderedQty,
            SellingPrice: SellingPrice ?? detail.SellingPrice,
        });

        // Reload to get updated hook calculations
        await detail.reload();

        return res.status(200).json({
            status: {
                code: 200,
                message: "BuyingPriceDetails updated successfully",
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
 * Delete BuyingPriceDetails
 */
exports.deleteBuyingPriceDetails = async (req, res) => {
    try {
        const { id } = req.params;

        const detail = await BuyingPriceDetails.findByPk(id);
        if (!detail) {
            return res.status(404).json({
                status: { code: 404, message: "BuyingPriceDetails not found" },
            });
        }

        await detail.destroy();

        return res.status(200).json({
            status: {
                code: 200,
                message: "BuyingPriceDetails deleted successfully",
            },
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};
