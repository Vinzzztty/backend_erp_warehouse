const db = require("../../models");

// Create Currency
exports.createCurrency = async (req, res) => {
    try {
        const { Code, Name, Notes, Status } = req.body;

        // Check if the currency Code already exists
        const existingCurrencyByCode = await db.Currency.findByPk(Code);
        if (existingCurrencyByCode) {
            return res.status(400).json({
                status: { code: 400, message: "Currency code already exists" },
            });
        }

        // Check if the currency Name already exists
        const existingCurrencyByName = await db.Currency.findOne({
            where: { Name },
        });
        if (existingCurrencyByName) {
            return res.status(400).json({
                status: {
                    code: 400,
                    message: "Currency with this name already exists",
                },
            });
        }

        // Create new currency if both Code and Name are unique
        const newCurrency = await db.Currency.create({
            Code,
            Name,
            Notes,
            Status,
        });

        res.status(201).json({
            status: { code: 201, message: "Currency created successfully" },
            data: newCurrency,
        });
    } catch (error) {
        res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

// Get All Currencies
exports.getAllCurrencies = async (req, res) => {
    try {
        const currencies = await db.Currency.findAll();

        res.status(200).json({
            status: { code: 200, message: "Currencies retrieved successfully" },
            data: currencies,
        });
    } catch (error) {
        res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

// Get Currency by Code
exports.getCurrencyByCode = async (req, res) => {
    try {
        const { Code } = req.params;

        const currency = await db.Currency.findByPk(Code);

        if (!currency) {
            return res.status(404).json({
                status: { code: 404, message: "Currency not found" },
            });
        }

        res.status(200).json({
            status: { code: 200, message: "Currency retrieved successfully" },
            data: currency,
        });
    } catch (error) {
        res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

// Update Currency
exports.updateCurrency = async (req, res) => {
    try {
        const { Code } = req.params;
        const { Name, Notes, Status } = req.body;

        // Check if the currency exists
        const currency = await db.Currency.findByPk(Code);
        if (!currency) {
            return res.status(404).json({
                status: { code: 404, message: "Currency not found" },
            });
        }

        // Check if another currency with the same Name exists (excluding the current one)
        if (Name) {
            const existingCurrency = await db.Currency.findOne({
                where: { Name, Code: { [db.Sequelize.Op.ne]: Code } }, // Exclude the current currency
            });

            if (existingCurrency) {
                return res.status(400).json({
                    status: {
                        code: 400,
                        message: "Currency with this name already exists",
                    },
                });
            }
        }

        // Update currency if Name is unique
        await currency.update({
            Name: Name ?? currency.Name,
            Notes: Notes ?? currency.Notes,
            Status: Status ?? currency.Status,
        });

        res.status(200).json({
            status: { code: 200, message: "Currency updated successfully" },
            data: currency,
        });
    } catch (error) {
        res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

// Delete Currency
exports.deleteCurrency = async (req, res) => {
    try {
        const { Code } = req.params;

        const currency = await db.Currency.findByPk(Code);

        if (!currency) {
            return res.status(404).json({
                status: { code: 404, message: "Currency not found" },
            });
        }

        await currency.destroy();

        res.status(200).json({
            status: { code: 200, message: "Currency deleted successfully" },
        });
    } catch (error) {
        res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};
