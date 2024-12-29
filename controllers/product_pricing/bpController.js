const db = require("../../models");
const BuyingPrice = db.BuyingPrice;
const Warehouse = db.Warehouse;

/**
 * Create a new BuyingPrice
 */
exports.createBuyingPrice = async (req, res) => {
    try {
        const { Date, WarehouseId, Note } = req.body;

        // 1. Validate Warehouse
        const warehouse = await Warehouse.findByPk(WarehouseId);
        if (!warehouse) {
            return res.status(404).json({
                status: { code: 404, message: "Warehouse not found" },
            });
        }

        // 2. Create BuyingPrice
        const newBuyingPrice = await BuyingPrice.create({
            Date,
            WarehouseId,
            Note,
        });

        return res.status(201).json({
            status: { code: 201, message: "BuyingPrice created successfully" },
            data: newBuyingPrice,
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

/**
 * Get all BuyingPrices
 */
exports.getAllBuyingPrices = async (req, res) => {
    try {
        const buyingPrices = await BuyingPrice.findAll({
            include: [{ model: Warehouse, as: "Warehouse" }],
        });

        return res.status(200).json({
            status: {
                code: 200,
                message: "BuyingPrices retrieved successfully",
            },
            data: buyingPrices,
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

/**
 * Get a single BuyingPrice by ID
 */
exports.getBuyingPriceById = async (req, res) => {
    try {
        const { id } = req.params;

        const buyingPrice = await BuyingPrice.findByPk(id, {
            include: [{ model: Warehouse, as: "Warehouse" }],
        });

        if (!buyingPrice) {
            return res.status(404).json({
                status: { code: 404, message: "BuyingPrice not found" },
            });
        }

        return res.status(200).json({
            status: {
                code: 200,
                message: "BuyingPrice retrieved successfully",
            },
            data: buyingPrice,
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

/**
 * Update a BuyingPrice
 */
exports.updateBuyingPrice = async (req, res) => {
    try {
        const { id } = req.params;
        const { Date, WarehouseId, Note } = req.body;

        // 1. Find existing record
        const buyingPrice = await BuyingPrice.findByPk(id);
        if (!buyingPrice) {
            return res.status(404).json({
                status: { code: 404, message: "BuyingPrice not found" },
            });
        }

        // 2. If WarehouseId changes, validate it
        if (WarehouseId && WarehouseId !== buyingPrice.WarehouseId) {
            const warehouse = await Warehouse.findByPk(WarehouseId);
            if (!warehouse) {
                return res.status(404).json({
                    status: { code: 404, message: "Warehouse not found" },
                });
            }
        }

        // 3. Update record
        await buyingPrice.update({
            Date: Date ?? buyingPrice.Date,
            WarehouseId: WarehouseId ?? buyingPrice.WarehouseId,
            Note: Note ?? buyingPrice.Note,
        });

        return res.status(200).json({
            status: { code: 200, message: "BuyingPrice updated successfully" },
            data: buyingPrice,
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

/**
 * Delete a BuyingPrice
 */
exports.deleteBuyingPrice = async (req, res) => {
    try {
        const { id } = req.params;

        const buyingPrice = await BuyingPrice.findByPk(id);
        if (!buyingPrice) {
            return res.status(404).json({
                status: { code: 404, message: "BuyingPrice not found" },
            });
        }

        await buyingPrice.destroy();

        return res.status(200).json({
            status: { code: 200, message: "BuyingPrice deleted successfully" },
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};
