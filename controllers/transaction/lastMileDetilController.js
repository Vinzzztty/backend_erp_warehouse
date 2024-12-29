const db = require("../../models");

// Models
const LastMileDetails = db.LastMileDetil;
const LastMile = db.LastMile;
const CxInvoice = db.CxInvoice;
const Warehouse = db.Warehouse;

exports.createLastMileDetail = async (req, res) => {
    try {
        const {
            TransaksiLastMileId, // references LastMile (Code)
            CXCode, // references CxInvoice (Code)
            LastMileTracking,
            FreightCode,
            WarehouseCode, // references Warehouse (Code)
            WarehouseAddress,
            Courier,
            ShippingCost,
            AdditionalCost,
            Subtotal,
            Total,
        } = req.body;

        // 1. Validate LastMile
        const lastMile = await LastMile.findByPk(TransaksiLastMileId);
        if (!lastMile) {
            return res.status(404).json({
                status: { code: 404, message: "LastMile not found" },
            });
        }

        // 2. Validate CxInvoice
        const cxInvoice = await CxInvoice.findByPk(CXCode);
        if (!cxInvoice) {
            return res.status(404).json({
                status: { code: 404, message: "CxInvoice not found" },
            });
        }

        // 3. Validate Warehouse
        const warehouse = await Warehouse.findByPk(WarehouseCode);
        if (!warehouse) {
            return res.status(404).json({
                status: { code: 404, message: "Warehouse not found" },
            });
        }

        // 4. Create LastMileDetails record
        const newDetail = await LastMileDetails.create({
            TransaksiLastMileId,
            CXCode,
            LastMileTracking,
            FreightCode,
            WarehouseCode,
            WarehouseAddress,
            Courier,
            ShippingCost,
            AdditionalCost,
            Subtotal,
            Total,
        });

        // Reload to ensure the hook recalculates Subtotal/Total
        await newDetail.reload();

        return res.status(201).json({
            status: {
                code: 201,
                message: "LastMileDetail created successfully",
            },
            data: newDetail,
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

exports.getAllLastMileDetails = async (req, res) => {
    try {
        const details = await LastMileDetails.findAll({
            include: [
                { model: LastMile, as: "LastMile" },
                { model: CxInvoice, as: "CxInvoice" },
                { model: Warehouse, as: "Warehouse" },
            ],
        });

        return res.status(200).json({
            status: {
                code: 200,
                message: "LastMileDetails retrieved successfully",
            },
            data: details,
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

exports.getLastMileDetailById = async (req, res) => {
    try {
        const { id } = req.params;

        const detail = await LastMileDetails.findByPk(id, {
            include: [
                { model: LastMile, as: "LastMile" },
                { model: CxInvoice, as: "CxInvoice" },
                { model: Warehouse, as: "Warehouse" },
            ],
        });

        if (!detail) {
            return res.status(404).json({
                status: { code: 404, message: "LastMileDetail not found" },
            });
        }

        return res.status(200).json({
            status: {
                code: 200,
                message: "LastMileDetail retrieved successfully",
            },
            data: detail,
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

exports.updateLastMileDetail = async (req, res) => {
    try {
        const { id } = req.params;

        const detail = await LastMileDetails.findByPk(id);
        if (!detail) {
            return res.status(404).json({
                status: { code: 404, message: "LastMileDetail not found" },
            });
        }

        const {
            TransaksiLastMileId,
            CXCode,
            LastMileTracking,
            FreightCode,
            WarehouseCode,
            WarehouseAddress,
            Courier,
            ShippingCost,
            AdditionalCost,
            Subtotal,
            Total,
        } = req.body;

        // If LastMile changed
        if (
            TransaksiLastMileId &&
            TransaksiLastMileId !== detail.TransaksiLastMileId
        ) {
            const lastMile = await LastMile.findByPk(TransaksiLastMileId);
            if (!lastMile) {
                return res.status(404).json({
                    status: { code: 404, message: "LastMile not found" },
                });
            }
        }

        // If CXCode changed
        if (CXCode && CXCode !== detail.CXCode) {
            const cxInvoice = await CxInvoice.findByPk(CXCode);
            if (!cxInvoice) {
                return res.status(404).json({
                    status: { code: 404, message: "CxInvoice not found" },
                });
            }
        }

        // If WarehouseCode changed
        if (WarehouseCode && WarehouseCode !== detail.WarehouseCode) {
            const warehouse = await Warehouse.findByPk(WarehouseCode);
            if (!warehouse) {
                return res.status(404).json({
                    status: { code: 404, message: "Warehouse not found" },
                });
            }
        }

        await detail.update({
            TransaksiLastMileId:
                TransaksiLastMileId ?? detail.TransaksiLastMileId,
            CXCode: CXCode ?? detail.CXCode,
            LastMileTracking: LastMileTracking ?? detail.LastMileTracking,
            FreightCode: FreightCode ?? detail.FreightCode,
            WarehouseCode: WarehouseCode ?? detail.WarehouseCode,
            WarehouseAddress: WarehouseAddress ?? detail.WarehouseAddress,
            Courier: Courier ?? detail.Courier,
            ShippingCost: ShippingCost ?? detail.ShippingCost,
            AdditionalCost: AdditionalCost ?? detail.AdditionalCost,
            Subtotal: Subtotal ?? detail.Subtotal,
            Total: Total ?? detail.Total,
        });

        // Reload to get updated hook calculations
        await detail.reload();

        return res.status(200).json({
            status: {
                code: 200,
                message: "LastMileDetail updated successfully",
            },
            data: detail,
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

exports.deleteLastMileDetail = async (req, res) => {
    try {
        const { id } = req.params;

        const detail = await LastMileDetails.findByPk(id);
        if (!detail) {
            return res.status(404).json({
                status: { code: 404, message: "LastMileDetail not found" },
            });
        }

        await detail.destroy();

        return res.status(200).json({
            status: {
                code: 200,
                message: "LastMileDetail deleted successfully",
            },
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};
