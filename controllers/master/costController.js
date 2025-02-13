const db = require("../../models");

// Create Cost
exports.createCost = async (req, res) => {
    try {
        const { Name, Percentage, Note, Status } = req.body;

        // Check if a cost with the same Name already exists
        const existingCost = await db.Cost.findOne({ where: { Name } });

        if (existingCost) {
            return res.status(400).json({
                status: {
                    code: 400,
                    message: "Cost with this name already exists",
                },
            });
        }

        // Create new cost if Name is unique
        const newCost = await db.Cost.create({
            Name,
            Percentage,
            Note,
            Status,
        });

        res.status(201).json({
            status: { code: 201, message: "Cost created successfully" },
            data: newCost,
        });
    } catch (error) {
        res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

// Get All Costs
exports.getAllCosts = async (req, res) => {
    try {
        const costs = await db.Cost.findAll();

        res.status(200).json({
            status: { code: 200, message: "Costs retrieved successfully" },
            data: costs,
        });
    } catch (error) {
        res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

// Get Cost by ID
exports.getCostById = async (req, res) => {
    try {
        const { Code } = req.params;

        const cost = await db.Cost.findByPk(Code);

        if (!cost) {
            return res.status(404).json({
                status: { code: 404, message: "Cost not found" },
            });
        }

        res.status(200).json({
            status: { code: 200, message: "Cost retrieved successfully" },
            data: cost,
        });
    } catch (error) {
        res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

// Update Cost
exports.updateCost = async (req, res) => {
    try {
        const { Code } = req.params;
        const { Name, Percentage, Note, Status } = req.body;

        // Check if the cost exists
        const cost = await db.Cost.findByPk(Code);

        if (!cost) {
            return res.status(404).json({
                status: { code: 404, message: "Cost not found" },
            });
        }

        // Check if another cost with the same Name exists (excluding the current one)
        if (Name) {
            const existingCost = await db.Cost.findOne({
                where: { Name, Code: { [db.Sequelize.Op.ne]: Code } }, // Exclude the current cost
            });

            if (existingCost) {
                return res.status(400).json({
                    status: { code: 400, message: "Cost with this name already exists" },
                });
            }
        }

        // Update cost if Name is unique
        await cost.update({ 
            Name: Name ?? cost.Name, 
            Percentage: Percentage ?? cost.Percentage, 
            Note: Note ?? cost.Note, 
            Status: Status ?? cost.Status 
        });

        res.status(200).json({
            status: { code: 200, message: "Cost updated successfully" },
            data: cost,
        });
    } catch (error) {
        res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};


// Delete Cost
exports.deleteCost = async (req, res) => {
    try {
        const { Code } = req.params;

        const cost = await db.Cost.findByPk(Code);

        if (!cost) {
            return res.status(404).json({
                status: { code: 404, message: "Cost not found" },
            });
        }

        await cost.destroy();

        res.status(200).json({
            status: { code: 200, message: "Cost deleted successfully" },
        });
    } catch (error) {
        res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};
