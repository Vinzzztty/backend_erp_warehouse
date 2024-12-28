const db = require("../../models");
const City = db.City;
const Province = db.Province;
const Country = db.Country;

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

// Update a city by ID
exports.updateCity = async (req, res) => {
    try {
        const { id } = req.params;
        const { Name, ProvinceId, CountryId, Status } = req.body;

        const city = await City.findByPk(id);
        if (!city) {
            return res.status(404).json({ error: "City not found" });
        }

        // Check if ProvinceId exists
        if (ProvinceId) {
            const provinceExists = await Province.findByPk(ProvinceId);
            if (!provinceExists) {
                return res.status(404).json({ error: "Province not found" });
            }
        }

        // Check if CountryId exists
        if (CountryId) {
            const countryExists = await Country.findByPk(CountryId);
            if (!countryExists) {
                return res.status(404).json({ error: "Country not found" });
            }
        }

        city.Name = Name ?? city.Name;
        city.ProvinceId = ProvinceId ?? city.ProvinceId;
        city.CountryId = CountryId ?? city.CountryId;
        city.Status = Status ?? city.Status;
        await city.save();

        res.status(200).json({
            status: { code: 200, message: "City updated successfully" },
            data: city,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
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
