const db = require("../../models");
const SettingPriceDetails = db.SettingPriceDetil;
const SettingPrice = db.SettingPrice;
const Product = db.Product;

/**
 * Create a new SettingPriceDetails
 */
exports.createSettingPriceDetails = async (req, res) => {
    try {
        const {
            SettingPriceId,
            SKUFull,
            SKUParent,
            SKUCode,
            SKUCodeChild,
            ProductName,
            SellingPrice,
            NormalPrice,
            StrikethroughPrice,
            CampaignPrice,
            BottomPrice,
            Platform1,
            Platform2,
            Platform3,
            Platform4,
        } = req.body;

        // 1. Validate SettingPrice
        const settingPrice = await SettingPrice.findByPk(SettingPriceId);
        if (!settingPrice) {
            return res.status(404).json({
                status: { code: 404, message: "SettingPrice not found" },
            });
        }

        // 2. Validate Product
        const product = await Product.findOne({ where: { SKUCode } });
        if (!product) {
            return res.status(404).json({
                status: { code: 404, message: "Product not found by SKUCode" },
            });
        }

        // 3. Create SettingPriceDetails record
        const newDetail = await SettingPriceDetails.create({
            SettingPriceId,
            SKUFull,
            SKUParent,
            SKUCode,
            SKUCodeChild,
            ProductName,
            SellingPrice,
            NormalPrice,
            StrikethroughPrice,
            CampaignPrice,
            BottomPrice,
            Platform1,
            Platform2,
            Platform3,
            Platform4,
        });

        // Reload to ensure the hook auto-fills platform fields if needed
        await newDetail.reload();

        return res.status(201).json({
            status: {
                code: 201,
                message: "SettingPriceDetails created successfully",
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
 * Get all SettingPriceDetails
 */
exports.getAllSettingPriceDetails = async (req, res) => {
    try {
        const details = await SettingPriceDetails.findAll({
            include: [
                { model: db.SettingPrice, as: "SettingPrice" },
                { model: db.Product, as: "Product" },
            ],
        });

        return res.status(200).json({
            status: {
                code: 200,
                message: "SettingPriceDetails retrieved successfully",
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
 * Get a single SettingPriceDetails by ID
 */
exports.getSettingPriceDetailsById = async (req, res) => {
    try {
        const { id } = req.params;

        const detail = await SettingPriceDetails.findByPk(id, {
            include: [
                { model: db.SettingPrice, as: "SettingPrice" },
                { model: db.Product, as: "Product" },
            ],
        });

        if (!detail) {
            return res.status(404).json({
                status: { code: 404, message: "SettingPriceDetails not found" },
            });
        }

        return res.status(200).json({
            status: {
                code: 200,
                message: "SettingPriceDetails retrieved successfully",
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
 * Get a single SettingPriceDetails by Code
 */
exports.getSettingPriceDetailsByCode = async (req, res) => {
    try {
        const { code } = req.params;

        const detail = await SettingPriceDetails.findOne({
            where: { code }, // Assuming 'code' is a field in SettingPriceDetails
            include: [
                { model: db.SettingPrice, as: "SettingPrice" },
                { model: db.Product, as: "Product" },
            ],
        });

        if (!detail) {
            return res.status(404).json({
                status: { code: 404, message: "SettingPriceDetails not found" },
            });
        }

        return res.status(200).json({
            status: {
                code: 200,
                message: "SettingPriceDetails retrieved successfully",
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
 * Update SettingPriceDetails
 */
exports.updateSettingPriceDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            SettingPriceId,
            SKUFull,
            SKUParent,
            SKUCode,
            SKUCodeChild,
            ProductName,
            SellingPrice,
            NormalPrice,
            StrikethroughPrice,
            CampaignPrice,
            BottomPrice,
            Platform1,
            Platform2,
            Platform3,
            Platform4,
        } = req.body;

        const detail = await SettingPriceDetails.findByPk(id);
        if (!detail) {
            return res.status(404).json({
                status: { code: 404, message: "SettingPriceDetails not found" },
            });
        }

        // Check if SettingPriceId changes
        if (SettingPriceId && SettingPriceId !== detail.SettingPriceId) {
            const settingPrice = await SettingPrice.findByPk(SettingPriceId);
            if (!settingPrice) {
                return res.status(404).json({
                    status: { code: 404, message: "SettingPrice not found" },
                });
            }
        }

        // Check if SKUCode changes
        if (SKUCode && SKUCode !== detail.SKUCode) {
            const product = await Product.findOne({ where: { SKUCode } });
            if (!product) {
                return res.status(404).json({
                    status: {
                        code: 404,
                        message: "Product not found by SKUCode",
                    },
                });
            }
        }

        await detail.update({
            SettingPriceId: SettingPriceId ?? detail.SettingPriceId,
            SKUFull: SKUFull ?? detail.SKUFull,
            SKUParent: SKUParent ?? detail.SKUParent,
            SKUCode: SKUCode ?? detail.SKUCode,
            SKUCodeChild: SKUCodeChild ?? detail.SKUCodeChild,
            ProductName: ProductName ?? detail.ProductName,
            SellingPrice: SellingPrice ?? detail.SellingPrice,
            NormalPrice: NormalPrice ?? detail.NormalPrice,
            StrikethroughPrice: StrikethroughPrice ?? detail.StrikethroughPrice,
            CampaignPrice: CampaignPrice ?? detail.CampaignPrice,
            BottomPrice: BottomPrice ?? detail.BottomPrice,
            Platform1: Platform1 ?? detail.Platform1,
            Platform2: Platform2 ?? detail.Platform2,
            Platform3: Platform3 ?? detail.Platform3,
            Platform4: Platform4 ?? detail.Platform4,
        });

        // Reload for hook updates
        await detail.reload();

        return res.status(200).json({
            status: {
                code: 200,
                message: "SettingPriceDetails updated successfully",
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
 * Delete SettingPriceDetails
 */
exports.deleteSettingPriceDetails = async (req, res) => {
    try {
        const { id } = req.params;

        const detail = await SettingPriceDetails.findByPk(id);
        if (!detail) {
            return res.status(404).json({
                status: { code: 404, message: "SettingPriceDetails not found" },
            });
        }

        await detail.destroy();

        return res.status(200).json({
            status: {
                code: 200,
                message: "SettingPriceDetails deleted successfully",
            },
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};
