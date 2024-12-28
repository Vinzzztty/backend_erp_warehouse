const { Forwarder, Country, Bank } = require("../../models");

// Create a new forwarder
exports.createForwarder = async (req, res) => {
    try {
        const {
            Name,
            CountryId,
            BankId,
            Notes,
            AddressIndonesia,
            CoordinateIndonesia,
            Department,
            ContactMethod,
            Description,
            AccountNumber,
            Website,
            Wechat,
            ShippingMark,
            Status,
        } = req.body;

        // Check if CountryId exists
        const countryExists = await Country.findByPk(CountryId);
        if (!countryExists) {
            return res.status(400).json({
                status: { code: 400, message: "CountryId does not exist" },
            });
        }

        // Check if BankId exists
        const bankExists = await Bank.findByPk(BankId);
        if (!bankExists) {
            return res.status(400).json({
                status: { code: 400, message: "BankId does not exist" },
            });
        }

        // Proceed with forwarder creation
        const newForwarder = await Forwarder.create({
            Name,
            CountryId,
            BankId,
            Notes,
            AddressIndonesia,
            CoordinateIndonesia,
            Department,
            ContactMethod,
            Description,
            AccountNumber,
            Website,
            Wechat,
            ShippingMark,
            Status,
        });

        res.status(201).json({
            status: { code: 201, message: "Forwarder created successfully" },
            data: newForwarder,
        });
    } catch (error) {
        res.status(500).json({
            status: { code: 500, message: "Internal server error" },
            error: error.message,
        });
    }
};

// Retrieve all forwarders
exports.getAllForwarders = async (req, res) => {
    try {
        const forwarders = await Forwarder.findAll({
            include: ["Country", "Bank"],
        });
        res.status(200).json({
            status: { code: 200, message: "Forwarders retrieved successfully" },
            data: forwarders,
        });
    } catch (error) {
        res.status(500).json({
            status: { code: 500, message: "Internal server error" },
        });
    }
};

// Retrieve a single forwarder by ID
exports.getForwarderById = async (req, res) => {
    try {
        const forwarder = await Forwarder.findByPk(req.params.id, {
            include: ["Country", "Bank"],
        });
        if (!forwarder) {
            return res.status(404).json({
                status: { code: 404, message: "Forwarder not found" },
            });
        }
        res.status(200).json({
            status: { code: 200, message: "Forwarder retrieved successfully" },
            data: forwarder,
        });
    } catch (error) {
        res.status(500).json({
            status: { code: 500, message: "Internal server error" },
        });
    }
};

// Update a forwarder by ID
exports.updateForwarder = async (req, res) => {
    try {
        const {
            Name,
            CountryId,
            BankId,
            Notes,
            AddressIndonesia,
            CoordinateIndonesia,
            Department,
            ContactMethod,
            Description,
            AccountNumber,
            Website,
            Wechat,
            ShippingMark,
            Status,
        } = req.body;
        const { id } = req.params;

        // Check if CountryId exists
        const countryExists = await Country.findByPk(CountryId);
        if (!countryExists) {
            return res.status(400).json({
                status: { code: 400, message: "CountryId does not exist" },
            });
        }

        // Check if BankId exists
        const bankExists = await Bank.findByPk(BankId);
        if (!bankExists) {
            return res.status(400).json({
                status: { code: 400, message: "BankId does not exist" },
            });
        }

        // Proceed with forwarder update
        const forwarder = await Forwarder.findByPk(id);
        if (!forwarder) {
            return res.status(404).json({
                status: { code: 404, message: "Forwarder not found" },
            });
        }

        await forwarder.update({
            Name,
            CountryId,
            BankId,
            Notes,
            AddressIndonesia,
            CoordinateIndonesia,
            Department,
            ContactMethod,
            Description,
            AccountNumber,
            Website,
            Wechat,
            ShippingMark,
            Status,
        });

        res.status(200).json({
            status: { code: 200, message: "Forwarder updated successfully" },
            data: forwarder,
        });
    } catch (error) {
        res.status(500).json({
            status: { code: 500, message: "Internal server error" },
            error: error.message,
        });
    }
};

// Delete a forwarder by ID
exports.deleteForwarder = async (req, res) => {
    try {
        const forwarder = await Forwarder.findByPk(req.params.id);
        if (!forwarder) {
            return res.status(404).json({
                status: { code: 404, message: "Forwarder not found" },
            });
        }

        await forwarder.destroy();
        res.status(200).json({
            status: { code: 200, message: "Forwarder deleted successfully" },
        });
    } catch (error) {
        res.status(500).json({
            status: { code: 500, message: "Internal server error" },
        });
    }
};
