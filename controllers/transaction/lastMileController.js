const db = require("../../models");
const LastMile = db.LastMile;
const Forwarder = db.Forwarder;

/**
 * Create a new LastMile entry
 */
exports.createLastMile = async (req, res) => {
    try {
        const { Date, ForwarderId, Note } = req.body;

        // 1. Validate Forwarder
        const forwarder = await Forwarder.findByPk(ForwarderId);
        if (!forwarder) {
            return res.status(404).json({
                status: { code: 404, message: "Forwarder not found" },
            });
        }

        // 2. Create the LastMile record
        const newLastMile = await LastMile.create({
            Date,
            ForwarderId,
            Note,
        });

        return res.status(201).json({
            status: { code: 201, message: "LastMile created successfully" },
            data: newLastMile,
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

/**
 * Get all LastMile entries
 */
exports.getAllLastMile = async (req, res) => {
    try {
        const lastMileEntries = await LastMile.findAll({
            include: [{ model: Forwarder, as: "Forwarder" }],
        });

        return res.status(200).json({
            status: {
                code: 200,
                message: "LastMile entries retrieved successfully",
            },
            data: lastMileEntries,
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

/**
 * Get LastMile by ID
 */
exports.getLastMileById = async (req, res) => {
    try {
        const { id } = req.params;

        const lastMile = await LastMile.findByPk(id, {
            include: [{ model: Forwarder, as: "Forwarder" }],
        });

        if (!lastMile) {
            return res.status(404).json({
                status: { code: 404, message: "LastMile not found" },
            });
        }

        return res.status(200).json({
            status: { code: 200, message: "LastMile retrieved successfully" },
            data: lastMile,
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

/**
 * Update LastMile
 */
exports.updateLastMile = async (req, res) => {
    try {
        const { id } = req.params;
        const { Date, ForwarderId, Note } = req.body;

        const lastMile = await LastMile.findByPk(id);
        if (!lastMile) {
            return res.status(404).json({
                status: { code: 404, message: "LastMile not found" },
            });
        }

        // If ForwarderId changes, validate it
        if (ForwarderId && ForwarderId !== lastMile.ForwarderId) {
            const forwarder = await Forwarder.findByPk(ForwarderId);
            if (!forwarder) {
                return res.status(404).json({
                    status: { code: 404, message: "Forwarder not found" },
                });
            }
        }

        await lastMile.update({
            Date: Date ?? lastMile.Date,
            ForwarderId: ForwarderId ?? lastMile.ForwarderId,
            Note: Note ?? lastMile.Note,
        });

        return res.status(200).json({
            status: { code: 200, message: "LastMile updated successfully" },
            data: lastMile,
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

/**
 * Delete LastMile
 */
exports.deleteLastMile = async (req, res) => {
    try {
        const { id } = req.params;
        const lastMile = await LastMile.findByPk(id);

        if (!lastMile) {
            return res.status(404).json({
                status: { code: 404, message: "LastMile not found" },
            });
        }

        await lastMile.destroy();

        return res.status(200).json({
            status: { code: 200, message: "LastMile deleted successfully" },
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};
