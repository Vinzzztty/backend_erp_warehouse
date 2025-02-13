const db = require("../../models");
const Country = db.Country;

// Create a new country
exports.createCountry = async (req, res) => {
    try {
        const { Name, Status } = req.body;

        // Check if a country with the same Name already exists
        const existingCountry = await Country.findOne({ where: { Name } });

        if (existingCountry) {
            return res.status(400).json({
                status: {
                    code: 400,
                    message: "Country with this name already exists",
                },
            });
        }

        // Create new country if Name is unique
        const newCountry = await Country.create({ Name, Status });

        res.status(201).json({
            status: { code: 201, message: "Country created successfully" },
            data: newCountry,
        });
    } catch (error) {
        res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

// Retrieve all countries
exports.getAllCountries = async (req, res) => {
    try {
        const countries = await Country.findAll();

        res.status(200).json({
            status: { code: 200, message: "Country retrieved successfully" },
            data: countries,
        });
    } catch (error) {
        res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

// Retrieve a single country by ID
exports.getCountryById = async (req, res) => {
    try {
        const { id } = req.params;
        const country = await Country.findByPk(id);
        if (!country) {
            return res.status(404).json({
                status: { code: 404, message: "Country not found" },
            });
        }

        res.status(200).json({
            status: { code: 200, message: "Country retrieved successfully" },
            data: country,
        });
    } catch (error) {
        res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

// Update a country by ID
exports.updateCountry = async (req, res) => {
    try {
        const { id } = req.params;
        const { Name, Status } = req.body;

        // Check if the country exists
        const country = await Country.findByPk(id);
        if (!country) {
            return res.status(404).json({
                status: { code: 404, message: "Country not found" },
            });
        }

        // Check if another country with the same Name exists (excluding the current one)
        if (Name) {
            const existingCountry = await Country.findOne({
                where: { Name, id: { [db.Sequelize.Op.ne]: id } }, // Exclude the current country
            });

            if (existingCountry) {
                return res.status(400).json({
                    status: {
                        code: 400,
                        message: "Country with this name already exists",
                    },
                });
            }
        }

        // Update country if Name is unique
        await country.update({
            Name: Name ?? country.Name,
            Status: Status ?? country.Status,
        });

        res.status(200).json({
            status: { code: 200, message: "Country updated successfully" },
            data: country,
        });
    } catch (error) {
        res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

// Delete a country by ID
exports.deleteCountry = async (req, res) => {
    try {
        const { id } = req.params;

        const country = await Country.findByPk(id);
        if (!country) {
            return res.status(404).json({ error: "Country not found" });
        }

        await country.destroy();
        res.status(200).json({
            status: { code: 200, message: "Country deleted successfully" },
        });
    } catch (error) {
        res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};
