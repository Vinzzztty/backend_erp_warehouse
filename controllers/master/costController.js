const db = require("../../models");

// Create Cost
exports.createCost = async (req, res) => {
    try {
        const { Name, Percentage, Note, Status } = req.body;

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

        const cost = await db.Cost.findByPk(Code);

        if (!cost) {
            return res.status(404).json({
                status: { code: 404, message: "Cost not found" },
            });
        }

        await cost.update({ Name, Percentage, Note, Status });

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
