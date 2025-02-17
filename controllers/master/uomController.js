const { UoM } = require("../../models");
const { Op } = db.Sequelize;
const db = require("../../models");

// Create a new UoM
exports.createUoM = async (req, res) => {
    try {
        const { Code, Name, Notes, Status } = req.body;

        // Check if a UoM with the same Code already exists
        const existingUoMByCode = await UoM.findByPk(Code);
        if (existingUoMByCode) {
            return res.status(400).json({
                status: { code: 400, message: "UoM code already exists" },
            });
        }

        // Check if a UoM with the same Name already exists
        const existingUoMByName = await UoM.findOne({ where: { Name } });
        if (existingUoMByName) {
            return res.status(400).json({
                status: {
                    code: 400,
                    message: "UoM with this name already exists",
                },
            });
        }

        // Create new UoM if both Code and Name are unique
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

        // Convert code to integer since 'Code' is an integer
        const uomCode = parseInt(code, 10);
        if (isNaN(uomCode)) {
            return res.status(400).json({
                status: { code: 400, message: "Invalid UoM Code" },
            });
        }

        // Find UoM using the correct primary key ('Code')
        const uom = await UoM.findByPk(uomCode);
        if (!uom) {
            return res.status(404).json({
                status: { code: 404, message: "UoM not found" },
            });
        }

        // Check for duplicate UoM name (excluding the current UoM)
        if (Name) {
            const existingUoM = await UoM.findOne({
                where: {
                    Name,
                    Code: { [Op.ne]: uomCode }, // Use 'Code' instead of 'id'
                },
            });

            if (existingUoM) {
                return res.status(400).json({
                    status: {
                        code: 400,
                        message: "UoM with this name already exists",
                    },
                });
            }
        }

        // Update the UoM
        await uom.update({
            Name: Name ?? uom.Name,
            Notes: Notes ?? uom.Notes,
            Status: Status ?? uom.Status,
        });

        res.status(200).json({
            status: { code: 200, message: "UoM updated successfully" },
            data: uom,
        });
    } catch (error) {
        console.error("Error updating UoM:", error);
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
