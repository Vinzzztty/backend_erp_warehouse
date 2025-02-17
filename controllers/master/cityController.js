const db = require("../../models");
const City = db.City;
const Province = db.Province;
const Country = db.Country;
const { Op } = db.Sequelize;

// Create a new city
exports.createCity = async (req, res) => {
    try {
        const { Name, ProvinceId, CountryId, Status } = req.body;

        // Check if the provided ProvinceId exists
        const provinceExists = await Province.findByPk(ProvinceId);
        if (!provinceExists) {
            return res.status(404).json({ error: "Province not found" });
        }

        // Check if the provided CountryId exists
        const countryExists = await Country.findByPk(CountryId);
        if (!countryExists) {
            return res.status(404).json({ error: "Country not found" });
        }

        // Check if a city with the same Name already exists
        const existingCity = await City.findOne({ where: { Name } });
        if (existingCity) {
            return res.status(400).json({
                status: {
                    code: 400,
                    message: "City with this name already exists",
                },
            });
        }

        // Create new city if Name is unique
        const newCity = await City.create({
            Name,
            ProvinceId,
            CountryId,
            Status,
        });

        res.status(201).json({
            status: { code: 201, message: "City created successfully" },
            data: newCity,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Retrieve all cities
exports.getAllCities = async (req, res) => {
    try {
        const cities = await City.findAll({
            include: [
                { model: db.Province, as: "Province" },
                { model: db.Country, as: "Country" },
            ],
        });
        res.status(200).json({ data: cities });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Retrieve a single city by ID
exports.getCityById = async (req, res) => {
    try {
        const { id } = req.params;
        const city = await City.findByPk(id, {
            include: [
                { model: db.Province, as: "Province" },
                { model: db.Country, as: "Country" },
            ],
        });
        if (!city) {
            return res.status(404).json({ error: "City not found" });
        }
        res.status(200).json({ data: city });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateCity = async (req, res) => {
    try {
        const { id } = req.params; // This should be 'Code' from request params
        const { Name, ProvinceId, CountryId, Status } = req.body;

        // Convert id to integer since 'Code' is an integer
        const cityCode = parseInt(id, 10);
        if (isNaN(cityCode)) {
            return res.status(400).json({
                status: { code: 400, message: "Invalid city Code" },
            });
        }

        // Find city using the correct primary key ('Code')
        const city = await City.findByPk(cityCode);
        if (!city) {
            return res.status(404).json({
                status: { code: 404, message: "City not found" },
            });
        }

        // Check if ProvinceId exists
        if (ProvinceId) {
            const provinceExists = await Province.findByPk(ProvinceId);
            if (!provinceExists) {
                return res.status(404).json({
                    status: { code: 404, message: "Province not found" },
                });
            }
        }

        // Check if CountryId exists
        if (CountryId) {
            const countryExists = await Country.findByPk(CountryId);
            if (!countryExists) {
                return res.status(404).json({
                    status: { code: 404, message: "Country not found" },
                });
            }
        }

        // Check for duplicate city name (excluding the current city)
        if (Name) {
            const existingCity = await City.findOne({
                where: {
                    Name,
                    Code: { [Op.ne]: cityCode }, // Use 'Code' instead of 'id'
                },
            });

            if (existingCity) {
                return res.status(400).json({
                    status: {
                        code: 400,
                        message: "City with this name already exists",
                    },
                });
            }
        }

        // Update the city
        await city.update({
            Name: Name ?? city.Name,
            ProvinceId: ProvinceId ?? city.ProvinceId,
            CountryId: CountryId ?? city.CountryId,
            Status: Status ?? city.Status,
        });

        res.status(200).json({
            status: { code: 200, message: "City updated successfully" },
            data: city,
        });
    } catch (error) {
        console.error("Error updating city:", error);
        res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

// Delete a city by ID
exports.deleteCity = async (req, res) => {
    try {
        const { id } = req.params;

        const city = await City.findByPk(id);
        if (!city) {
            return res.status(404).json({ error: "City not found" });
        }

        await city.destroy();
        res.status(200).json({
            status: { code: 200, message: "City deleted successfully" },
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
