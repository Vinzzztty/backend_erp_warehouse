const db = require("../../models");

// Model
const GoodsReceiptDetil = db.GoodsReceiptDetil;
const GoodsReceipt = db.GoodsReceipt;

/**
 * Create a new GoodsReceiptDetil
 */
exports.createGoodsReceiptDetil = async (req, res) => {
    try {
        const {
            GoodsReceiptId, // referencing T.GoodsReceipt (Code)
            CXCode,
            PICode,
            SKUCode,
            ProductName,
            LastMileTracking,
            FreightCode,
            OrderedQty,
            ReceivedQty,
            RemainQty, // will be auto-calculated if both OrderedQty and ReceivedQty exist
            Condition,
            Notes,
        } = req.body;

        // 1. Validate GoodsReceipt
        const goodsReceipt = await GoodsReceipt.findByPk(GoodsReceiptId);
        if (!goodsReceipt) {
            return res.status(404).json({
                status: { code: 404, message: "GoodsReceipt not found" },
            });
        }

        // 2. Create GoodsReceiptDetil
        const newDetil = await GoodsReceiptDetil.create({
            GoodsReceiptId,
            CXCode,
            PICode,
            SKUCode,
            ProductName,
            LastMileTracking,
            FreightCode,
            OrderedQty,
            ReceivedQty,
            RemainQty,
            Condition,
            Notes,
        });

        // Reload to ensure the hook recalculates RemainQty
        await newDetil.reload();

        return res.status(201).json({
            status: {
                code: 201,
                message: "GoodsReceiptDetil created successfully",
            },
            data: newDetil,
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

/**
 * Get all GoodsReceiptDetils
 */
exports.getAllGoodsReceiptDetils = async (req, res) => {
    try {
        const detils = await GoodsReceiptDetil.findAll({
            include: [{ model: GoodsReceipt, as: "GoodsReceipt" }],
        });

        return res.status(200).json({
            status: {
                code: 200,
                message: "GoodsReceiptDetils retrieved successfully",
            },
            data: detils,
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

/**
 * Get GoodsReceiptDetils by GoodsReceiptId
 */
exports.getGoodsReceiptDetilsByGoodsReceiptId = async (req, res) => {
    try {
        const { GoodsReceiptId } = req.params;

        // Step 1: Fetch GoodsReceiptDetil first
        const detils = await GoodsReceiptDetil.findAll({
            where: { GoodsReceiptId },
            include: [{ model: GoodsReceipt, as: "GoodsReceipt" }],
        });

        if (!detils || detils.length === 0) {
            return res.status(404).json({
                status: {
                    code: 404,
                    message:
                        "No GoodsReceiptDetils found for the given GoodsReceiptId",
                },
            });
        }

        // Step 2: Extract GoodsReceipt and fetch Forwarder & Warehouse separately
        for (const detil of detils) {
            const goodsReceipt = detil.GoodsReceipt;

            if (goodsReceipt) {
                // Fetch Forwarder Name
                const forwarder = await db.Forwarder.findOne({
                    where: { Id: goodsReceipt.ForwarderId },
                    attributes: ["Id", "Name"],
                });

                // Fetch Warehouse Name
                const warehouse = await db.Warehouse.findOne({
                    where: { Id: goodsReceipt.WarehouseId },
                    attributes: ["Id", "Name"],
                });

                // Attach Forwarder & Warehouse to response
                detil.GoodsReceipt = {
                    ...goodsReceipt.toJSON(),
                    Forwarder: forwarder || {
                        Id: goodsReceipt.ForwarderId,
                        Name: "Unknown Forwarder",
                    },
                    Warehouse: warehouse || {
                        Id: goodsReceipt.WarehouseId,
                        Name: "Unknown Warehouse",
                    },
                };
            }
        }

        return res.status(200).json({
            status: {
                code: 200,
                message: "GoodsReceiptDetils retrieved successfully",
            },
            data: detils,
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

/**
 * Get a GoodsReceiptDetil by ID
 */
exports.getGoodsReceiptDetilById = async (req, res) => {
    try {
        const { id } = req.params;
        const detil = await GoodsReceiptDetil.findByPk(id, {
            include: [{ model: GoodsReceipt, as: "GoodsReceipt" }],
        });

        if (!detil) {
            return res.status(404).json({
                status: { code: 404, message: "GoodsReceiptDetil not found" },
            });
        }

        return res.status(200).json({
            status: {
                code: 200,
                message: "GoodsReceiptDetil retrieved successfully",
            },
            data: detil,
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

/**
 * Update a GoodsReceiptDetil
 */
exports.updateGoodsReceiptDetil = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            GoodsReceiptId,
            CXCode,
            PICode,
            SKUCode,
            ProductName,
            LastMileTracking,
            FreightCode,
            OrderedQty,
            ReceivedQty,
            RemainQty,
            Condition,
            Notes,
        } = req.body;

        // 1. Find the existing record
        const detil = await GoodsReceiptDetil.findByPk(id);
        if (!detil) {
            return res.status(404).json({
                status: { code: 404, message: "GoodsReceiptDetil not found" },
            });
        }

        // 2. If GoodsReceiptId changes, validate it
        if (GoodsReceiptId && GoodsReceiptId !== detil.GoodsReceiptId) {
            const goodsReceipt = await GoodsReceipt.findByPk(GoodsReceiptId);
            if (!goodsReceipt) {
                return res.status(404).json({
                    status: { code: 404, message: "GoodsReceipt not found" },
                });
            }
        }

        // 3. Update the record
        await detil.update({
            GoodsReceiptId: GoodsReceiptId ?? detil.GoodsReceiptId,
            CXCode: CXCode ?? detil.CXCode,
            PICode: PICode ?? detil.PICode,
            SKUCode: SKUCode ?? detil.SKUCode,
            ProductName: ProductName ?? detil.ProductName,
            LastMileTracking: LastMileTracking ?? detil.LastMileTracking,
            FreightCode: FreightCode ?? detil.FreightCode,
            OrderedQty: OrderedQty ?? detil.OrderedQty,
            ReceivedQty: ReceivedQty ?? detil.ReceivedQty,
            RemainQty: RemainQty ?? detil.RemainQty,
            Condition: Condition ?? detil.Condition,
            Notes: Notes ?? detil.Notes,
        });

        // 4. Reload to get updated calculations from the hook
        await detil.reload();

        return res.status(200).json({
            status: {
                code: 200,
                message: "GoodsReceiptDetil updated successfully",
            },
            data: detil,
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

/**
 * Delete a GoodsReceiptDetil
 */
exports.deleteGoodsReceiptDetil = async (req, res) => {
    try {
        const { id } = req.params;

        const detil = await GoodsReceiptDetil.findByPk(id);
        if (!detil) {
            return res.status(404).json({
                status: { code: 404, message: "GoodsReceiptDetil not found" },
            });
        }

        await detil.destroy();

        return res.status(200).json({
            status: {
                code: 200,
                message: "GoodsReceiptDetil deleted successfully",
            },
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};
