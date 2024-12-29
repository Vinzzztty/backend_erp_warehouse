const db = require("../../models");
const GoodsReceipt = db.GoodsReceipt;
const Forwarder = db.Forwarder;
const LastMile = db.LastMile;
const Warehouse = db.Warehouse;

/**
 * Create a new GoodsReceipt
 */
exports.createGoodsReceipt = async (req, res) => {
    try {
        const { Date, ForwarderId, LMCode, WarehouseId, Note } = req.body;

        // 1. Validate Forwarder
        const forwarder = await Forwarder.findByPk(ForwarderId);
        if (!forwarder) {
            return res.status(404).json({
                status: { code: 404, message: "Forwarder not found" },
            });
        }

        // 2. Validate LastMile
        const lastMile = await LastMile.findByPk(LMCode);
        if (!lastMile) {
            return res.status(404).json({
                status: { code: 404, message: "LastMile not found" },
            });
        }

        // 3. Validate Warehouse
        const warehouse = await Warehouse.findByPk(WarehouseId);
        if (!warehouse) {
            return res.status(404).json({
                status: { code: 404, message: "Warehouse not found" },
            });
        }

        // 4. Create GoodsReceipt
        const newGoodsReceipt = await GoodsReceipt.create({
            Date,
            ForwarderId,
            LMCode,
            WarehouseId,
            Note,
        });

        return res.status(201).json({
            status: { code: 201, message: "GoodsReceipt created successfully" },
            data: newGoodsReceipt,
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

/**
 * Get all GoodsReceipts
 */
exports.getAllGoodsReceipts = async (req, res) => {
    try {
        const goodsReceipts = await GoodsReceipt.findAll({
            include: [
                { model: Forwarder, as: "Forwarder" },
                { model: LastMile, as: "LastMile" },
                { model: Warehouse, as: "Warehouse" },
            ],
        });

        return res.status(200).json({
            status: {
                code: 200,
                message: "GoodsReceipts retrieved successfully",
            },
            data: goodsReceipts,
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

/**
 * Get a single GoodsReceipt by ID
 */
exports.getGoodsReceiptById = async (req, res) => {
    try {
        const { id } = req.params;
        const goodsReceipt = await GoodsReceipt.findByPk(id, {
            include: [
                { model: Forwarder, as: "Forwarder" },
                { model: LastMile, as: "LastMile" },
                { model: Warehouse, as: "Warehouse" },
            ],
        });

        if (!goodsReceipt) {
            return res.status(404).json({
                status: { code: 404, message: "GoodsReceipt not found" },
            });
        }

        return res.status(200).json({
            status: {
                code: 200,
                message: "GoodsReceipt retrieved successfully",
            },
            data: goodsReceipt,
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

/**
 * Update a GoodsReceipt
 */
exports.updateGoodsReceipt = async (req, res) => {
    try {
        const { id } = req.params;
        const { Date, ForwarderId, LMCode, WarehouseId, Note } = req.body;

        const goodsReceipt = await GoodsReceipt.findByPk(id);
        if (!goodsReceipt) {
            return res.status(404).json({
                status: { code: 404, message: "GoodsReceipt not found" },
            });
        }

        // If ForwarderId changes
        if (ForwarderId && ForwarderId !== goodsReceipt.ForwarderId) {
            const forwarder = await Forwarder.findByPk(ForwarderId);
            if (!forwarder) {
                return res.status(404).json({
                    status: { code: 404, message: "Forwarder not found" },
                });
            }
        }

        // If LMCode changes
        if (LMCode && LMCode !== goodsReceipt.LMCode) {
            const lastMile = await LastMile.findByPk(LMCode);
            if (!lastMile) {
                return res.status(404).json({
                    status: { code: 404, message: "LastMile not found" },
                });
            }
        }

        // If WarehouseId changes
        if (WarehouseId && WarehouseId !== goodsReceipt.WarehouseId) {
            const warehouse = await Warehouse.findByPk(WarehouseId);
            if (!warehouse) {
                return res.status(404).json({
                    status: { code: 404, message: "Warehouse not found" },
                });
            }
        }

        await goodsReceipt.update({
            Date: Date ?? goodsReceipt.Date,
            ForwarderId: ForwarderId ?? goodsReceipt.ForwarderId,
            LMCode: LMCode ?? goodsReceipt.LMCode,
            WarehouseId: WarehouseId ?? goodsReceipt.WarehouseId,
            Note: Note ?? goodsReceipt.Note,
        });

        return res.status(200).json({
            status: { code: 200, message: "GoodsReceipt updated successfully" },
            data: goodsReceipt,
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

/**
 * Delete a GoodsReceipt
 */
exports.deleteGoodsReceipt = async (req, res) => {
    try {
        const { id } = req.params;

        const goodsReceipt = await GoodsReceipt.findByPk(id);
        if (!goodsReceipt) {
            return res.status(404).json({
                status: { code: 404, message: "GoodsReceipt not found" },
            });
        }

        await goodsReceipt.destroy();

        return res.status(200).json({
            status: { code: 200, message: "GoodsReceipt deleted successfully" },
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};
