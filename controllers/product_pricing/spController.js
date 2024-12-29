const db = require("../../models");

// Models
const SettingPrice = db.SettingPrice;
const BuyingPrice = db.BuyingPrice;

/**
 * Create a new SettingPrice
 */
exports.createSettingPrice = async (req, res) => {
    try {
        const { Date, BPCode, Note } = req.body;

        // 1. Validate BuyingPrice
        const buyingPrice = await BuyingPrice.findByPk(BPCode);
        if (!buyingPrice) {
            return res.status(404).json({
                status: { code: 404, message: "BuyingPrice not found" },
            });
        }

        // 2. Create SettingPrice
        const newSettingPrice = await SettingPrice.create({
            Date,
            BPCode,
            Note,
        });

        return res.status(201).json({
            status: { code: 201, message: "SettingPrice created successfully" },
            data: newSettingPrice,
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

/**
 * Get all SettingPrices
 */
exports.getAllSettingPrices = async (req, res) => {
    try {
        const settingPrices = await SettingPrice.findAll({
            include: [{ model: BuyingPrice, as: "BuyingPrice" }],
        });

        return res.status(200).json({
            status: {
                code: 200,
                message: "SettingPrices retrieved successfully",
            },
            data: settingPrices,
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

/**
 * Get a single SettingPrice by ID
 */
exports.getSettingPriceById = async (req, res) => {
    try {
        const { id } = req.params;

        const settingPrice = await SettingPrice.findByPk(id, {
            include: [{ model: BuyingPrice, as: "BuyingPrice" }],
        });

        if (!settingPrice) {
            return res.status(404).json({
                status: { code: 404, message: "SettingPrice not found" },
            });
        }

        return res.status(200).json({
            status: {
                code: 200,
                message: "SettingPrice retrieved successfully",
            },
            data: settingPrice,
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

/**
 * Update a SettingPrice
 */
exports.updateSettingPrice = async (req, res) => {
    try {
        const { id } = req.params;
        const { Date, BPCode, Note } = req.body;

        // 1. Find the existing record
        const settingPrice = await SettingPrice.findByPk(id);
        if (!settingPrice) {
            return res.status(404).json({
                status: { code: 404, message: "SettingPrice not found" },
            });
        }

        // 2. If BPCode changes, validate BuyingPrice
        if (BPCode && BPCode !== settingPrice.BPCode) {
            const buyingPrice = await BuyingPrice.findByPk(BPCode);
            if (!buyingPrice) {
                return res.status(404).json({
                    status: { code: 404, message: "BuyingPrice not found" },
                });
            }
        }

        // 3. Update record
        await settingPrice.update({
            Date: Date ?? settingPrice.Date,
            BPCode: BPCode ?? settingPrice.BPCode,
            Note: Note ?? settingPrice.Note,
        });

        return res.status(200).json({
            status: { code: 200, message: "SettingPrice updated successfully" },
            data: settingPrice,
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

/**
 * Delete a SettingPrice
 */
exports.deleteSettingPrice = async (req, res) => {
    try {
        const { id } = req.params;

        const settingPrice = await SettingPrice.findByPk(id);
        if (!settingPrice) {
            return res.status(404).json({
                status: { code: 404, message: "SettingPrice not found" },
            });
        }

        await settingPrice.destroy();

        return res.status(200).json({
            status: { code: 200, message: "SettingPrice deleted successfully" },
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};
