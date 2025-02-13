const db = require("../../models");

// Create Bank
exports.createBank = async (req, res) => {
    try {
        const { Name, Notes, Status } = req.body;

        // Check if a bank with the same Name already exists
        const existingBank = await db.Bank.findOne({ where: { Name } });

        if (existingBank) {
            return res.status(400).json({
                status: {
                    code: 400,
                    message: "Bank with this name already exists",
                },
            });
        }

        // Create new bank
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

        // Check if the bank exists
        const bank = await db.Bank.findByPk(Code);
        if (!bank) {
            return res.status(404).json({
                status: { code: 404, message: "Bank not found" },
            });
        }

        // Check if another bank with the same Name exists (excluding the current one)
        if (Name) {
            const existingBank = await db.Bank.findOne({
                where: { Name, Code: { [db.Sequelize.Op.ne]: Code } }, // Exclude the current bank
            });

            if (existingBank) {
                return res.status(400).json({
                    status: {
                        code: 400,
                        message: "Bank with this name already exists",
                    },
                });
            }
        }

        // Update bank if Name is unique
        await bank.update({
            Name: Name ?? bank.Name,
            Notes: Notes ?? bank.Notes,
            Status: Status ?? bank.Status,
        });

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
