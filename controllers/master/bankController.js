const db = require("../../models");

// Create Bank
exports.createBank = async (req, res) => {
    try {
        const { Name, Notes, Status } = req.body;

        const newBank = await db.Bank.create({
            Name,
            Notes,
            Status,
        });

        res.status(201).json({
            status: { code: 201, message: "Bank created successfully" },
            data: newBank,
        });
    } catch (error) {
        res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

// Get All Banks
exports.getAllBanks = async (req, res) => {
    try {
        const banks = await db.Bank.findAll();

        res.status(200).json({
            status: { code: 200, message: "Banks retrieved successfully" },
            data: banks,
        });
    } catch (error) {
        res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

// Get Bank by ID
exports.getBankById = async (req, res) => {
    try {
        const { Code } = req.params;

        const bank = await db.Bank.findByPk(Code);

        if (!bank) {
            return res.status(404).json({
                status: { code: 404, message: "Bank not found" },
            });
        }

        res.status(200).json({
            status: { code: 200, message: "Bank retrieved successfully" },
            data: bank,
        });
    } catch (error) {
        res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

// Update Bank
exports.updateBank = async (req, res) => {
    try {
        const { Code } = req.params;
        const { Name, Notes, Status } = req.body;

        const bank = await db.Bank.findByPk(Code);

        if (!bank) {
            return res.status(404).json({
                status: { code: 404, message: "Bank not found" },
            });
        }

        await bank.update({ Name, Notes, Status });

        res.status(200).json({
            status: { code: 200, message: "Bank updated successfully" },
            data: bank,
        });
    } catch (error) {
        res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

// Delete Bank
exports.deleteBank = async (req, res) => {
    try {
        const { Code } = req.params;

        const bank = await db.Bank.findByPk(Code);

        if (!bank) {
            return res.status(404).json({
                status: { code: 404, message: "Bank not found" },
            });
        }

        await bank.destroy();

        res.status(200).json({
            status: { code: 200, message: "Bank deleted successfully" },
        });
    } catch (error) {
        res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};
