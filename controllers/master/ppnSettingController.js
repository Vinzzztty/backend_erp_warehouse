const db = require("../../models");

// Create PPN Setting
exports.createPPNSetting = async (req, res) => {
    try {
        const { Name, Rate, Status } = req.body;

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
        const { id } = req.params;

        const ppnSetting = await db.PPNSetting.findByPk(id);

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

        const ppnSetting = await db.PPNSetting.findByPk(id);

        if (!ppnSetting) {
            return res.status(404).json({
                status: { code: 404, message: "PPN Setting not found" },
            });
        }

        await ppnSetting.update({ Name, Rate, Status });

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
