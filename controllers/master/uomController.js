const { UoM } = require("../../models");

// Create a new UoM
exports.createUoM = async (req, res) => {
    try {
        const { Code, Name, Notes, Status } = req.body;

        // Check if a UoM with the same Code already exists
        const existingUoM = await UoM.findByPk(Code);
        if (existingUoM) {
            return res.status(400).json({
                status: { code: 400, message: "UoM code already exists" },
            });
        }

        const newUoM = await UoM.create({
            Code,
            Name,
            Notes,
            Status,
        });

        res.status(201).json({
            status: { code: 201, message: "UoM created successfully" },
            data: newUoM,
        });
    } catch (error) {
        res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

// Get all UoMs
exports.getAllUoMs = async (req, res) => {
    try {
        const uoms = await UoM.findAll();
        res.status(200).json({
            status: { code: 200, message: "UoMs retrieved successfully" },
            data: uoms,
        });
    } catch (error) {
        res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

// Get UoM by Code
exports.getUoMByCode = async (req, res) => {
    try {
        const { code } = req.params;
        const uom = await UoM.findByPk(code);

        if (!uom) {
            return res.status(404).json({
                status: { code: 404, message: "UoM not found" },
            });
        }

        res.status(200).json({
            status: { code: 200, message: "UoM retrieved successfully" },
            data: uom,
        });
    } catch (error) {
        res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

// Update UoM
exports.updateUoM = async (req, res) => {
    try {
        const { code } = req.params;
        const { Name, Notes, Status } = req.body;

        const uom = await UoM.findByPk(code);
        if (!uom) {
            return res.status(404).json({
                status: { code: 404, message: "UoM not found" },
            });
        }

        await uom.update({ Name, Notes, Status });
        res.status(200).json({
            status: { code: 200, message: "UoM updated successfully" },
            data: uom,
        });
    } catch (error) {
        res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

// Delete UoM
exports.deleteUoM = async (req, res) => {
    try {
        const { code } = req.params;
        const uom = await UoM.findByPk(code);

        if (!uom) {
            return res.status(404).json({
                status: { code: 404, message: "UoM not found" },
            });
        }

        await uom.destroy();
        res.status(200).json({
            status: { code: 200, message: "UoM deleted successfully" },
        });
    } catch (error) {
        res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};
