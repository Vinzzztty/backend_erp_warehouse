const db = require("../../models");
const { PPNSetting } = db;
const { Op } = db.Sequelize;

// Create PPN Setting
exports.createPPNSetting = async (req, res) => {
    try {
        const { Name, Rate, Status } = req.body;

        // Check if a PPN Setting with the same Name already exists
        const existingPPNSetting = await db.PPNSetting.findOne({
            where: { Name },
        });

        if (existingPPNSetting) {
            return res.status(400).json({
                status: {
                    code: 400,
                    message: "PPN Setting with this name already exists",
                },
            });
        }

        // Create new PPN Setting if Name is unique
        const newPPNSetting = await db.PPNSetting.create({
            Name,
            Rate,
            Status,
        });

        res.status(201).json({
            status: { code: 201, message: "PPN Setting created successfully" },
            data: newPPNSetting,
        });
    } catch (error) {
        res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

// Get All PPN Settings
exports.getAllPPNSettings = async (req, res) => {
    try {
        const ppnSettings = await db.PPNSetting.findAll();

        res.status(200).json({
            status: {
                code: 200,
                message: "PPN Settings retrieved successfully",
            },
            data: ppnSettings,
        });
    } catch (error) {
        res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

// Get PPN Setting by ID
exports.getPPNSettingById = async (req, res) => {
    try {
        const { id } = req.params; // Keep using 'id'

        // Convert id to integer since it's an auto-increment integer
        const ppnId = parseInt(id, 10);
        if (isNaN(ppnId)) {
            return res.status(400).json({
                status: { code: 400, message: "Invalid PPN Setting ID" },
            });
        }

        const ppnSetting = await PPNSetting.findByPk(ppnId);
        if (!ppnSetting) {
            return res.status(404).json({
                status: { code: 404, message: "PPN Setting not found" },
            });
        }

        res.status(200).json({
            status: {
                code: 200,
                message: "PPN Setting retrieved successfully",
            },
            data: ppnSetting,
        });
    } catch (error) {
        res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

// Update PPN Setting
exports.updatePPNSetting = async (req, res) => {
    try {
        const { id } = req.params;
        const { Name, Rate, Status } = req.body;

        // Convert id to integer since it's an auto-increment integer
        const ppnId = parseInt(id, 10);
        if (isNaN(ppnId)) {
            return res.status(400).json({
                status: { code: 400, message: "Invalid PPN Setting ID" },
            });
        }

        // Check if the PPN Setting exists
        const ppnSetting = await PPNSetting.findByPk(ppnId);
        if (!ppnSetting) {
            return res.status(404).json({
                status: { code: 404, message: "PPN Setting not found" },
            });
        }

        // Check if another PPN Setting with the same Name exists (excluding the current one)
        if (Name) {
            const existingPPNSetting = await PPNSetting.findOne({
                where: {
                    Name,
                    id: { [Op.ne]: ppnId }, // Use 'id' instead of 'Code'
                },
            });

            if (existingPPNSetting) {
                return res.status(400).json({
                    status: {
                        code: 400,
                        message: "PPN Setting with this name already exists",
                    },
                });
            }
        }

        // Update the PPN Setting
        await ppnSetting.update({
            Name: Name ?? ppnSetting.Name,
            Rate: Rate ?? ppnSetting.Rate,
            Status: Status ?? ppnSetting.Status,
        });

        res.status(200).json({
            status: { code: 200, message: "PPN Setting updated successfully" },
            data: ppnSetting,
        });
    } catch (error) {
        res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

// Delete PPN Setting
exports.deletePPNSetting = async (req, res) => {
    try {
        const { id } = req.params;

        const ppnSetting = await db.PPNSetting.findByPk(id);

        if (!ppnSetting) {
            return res.status(404).json({
                status: { code: 404, message: "PPN Setting not found" },
            });
        }

        await ppnSetting.destroy();

        res.status(200).json({
            status: { code: 200, message: "PPN Setting deleted successfully" },
        });
    } catch (error) {
        res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};
