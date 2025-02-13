const db = require("../../models");
const Province = db.Province;
const Country = db.Country;

// Create a new province
exports.createProvince = async (req, res) => {
    try {
        const { Name, CountryId, Status } = req.body;

        // Check if a province with the same Name already exists
        const existingProvince = await Province.findOne({ where: { Name } });
        if (existingProvince) {
            return res.status(400).json({
                status: {
                    code: 400,
                    message: "Province with this name already exists",
                },
            });
        }

        // Check if the provided CountryId exists
        const countryExists = await Country.findByPk(CountryId);
        if (!countryExists) {
            return res.status(404).json({
                status: { code: 404, message: "Country not found" },
            });
        }

        // Create new province if Name is unique
        const newProvince = await Province.create({ Name, CountryId, Status });

        res.status(201).json({
            status: { code: 201, message: "Province created successfully" },
            data: newProvince,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Retrieve all provinces
exports.getAllProvinces = async (req, res) => {
    try {
        const provinces = await Province.findAll({
            include: [{ model: db.Country, as: "Country" }],
        });
        res.status(200).json({ data: provinces });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Retrieve a single province by ID
exports.getProvinceById = async (req, res) => {
    try {
        const { id } = req.params;
        const province = await Province.findByPk(id, {
            include: [{ model: db.Country, as: "Country" }],
        });
        if (!province) {
            return res.status(404).json({ error: "Province not found" });
        }
        res.status(200).json({ data: province });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a province by ID
exports.updateProvince = async (req, res) => {
    try {
        const { id } = req.params;
        const { Name, CountryId, Status } = req.body;

        // Check if the province exists
        const province = await Province.findByPk(id);
        if (!province) {
            return res.status(404).json({
                status: { code: 404, message: "Province not found" },
            });
        }

        // Check if another province with the same Name exists (excluding the current one)
        if (Name) {
            const existingProvince = await Province.findOne({
                where: { Name, id: { [db.Sequelize.Op.ne]: id } }, // Exclude the current province
            });

            if (existingProvince) {
                return res.status(400).json({
                    status: {
                        code: 400,
                        message: "Province with this name already exists",
                    },
                });
            }
        }

        // Check if the provided CountryId exists
        if (CountryId) {
            const countryExists = await Country.findByPk(CountryId);
            if (!countryExists) {
                return res.status(404).json({
                    status: { code: 404, message: "Country not found" },
                });
            }
        }

        // Update province if Name is unique
        await province.update({
            Name: Name ?? province.Name,
            CountryId: CountryId ?? province.CountryId,
            Status: Status ?? province.Status,
        });

        res.status(200).json({
            status: { code: 200, message: "Province updated successfully" },
            data: province,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a province by ID
exports.deleteProvince = async (req, res) => {
    try {
        const { id } = req.params;

        const province = await Province.findByPk(id);
        if (!province) {
            return res.status(404).json({ error: "Province not found" });
        }

        await province.destroy();
        res.status(200).json({ message: "Province deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
