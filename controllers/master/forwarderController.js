const db = require("../../models");
const { Forwarder, Country, Bank } = db;
const { Op } = db.Sequelize;

// Create a new forwarder
exports.createForwarder = async (req, res) => {
    try {
        const {
            Name,
            CountryId,
            BankId,
            Notes,
            AddressChina,
            AddressIndonesia,
            CoordinateIndonesia,
            NamePIC,
            Department,
            ContactMethod,
            Description,
            AccountNumber,
            Website,
            Wechat,
            ShippingMark,
            Status,
        } = req.body;

        // Check if a forwarder with the same Name already exists
        const existingForwarder = await Forwarder.findOne({ where: { Name } });
        if (existingForwarder) {
            return res.status(400).json({
                status: {
                    code: 400,
                    message: "Forwarder with this name already exists",
                },
            });
        }

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
            AddressChina,
            AddressIndonesia,
            CoordinateIndonesia,
            NamePIC,
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
            include: ["Bank"],
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
            AddressChina,
            AddressIndonesia,
            CoordinateIndonesia,
            NamePIC,
            Department,
            ContactMethod,
            Description,
            AccountNumber,
            Website,
            Wechat,
            ShippingMark,
            Status,
        } = req.body;
        const { id } = req.params; // This should be 'Code' now

        // Convert id to integer since 'Code' is an integer
        const forwarderCode = parseInt(id, 10);
        if (isNaN(forwarderCode)) {
            return res.status(400).json({
                status: { code: 400, message: "Invalid forwarder Code" },
            });
        }

        // Check if the forwarder exists
        const forwarder = await Forwarder.findByPk(forwarderCode);
        if (!forwarder) {
            return res.status(404).json({
                status: { code: 404, message: "Forwarder not found" },
            });
        }

        // Check if another forwarder with the same Name exists (excluding the current one)
        if (Name) {
            const existingForwarder = await Forwarder.findOne({
                where: {
                    Name,
                    Code: { [Op.ne]: forwarderCode }, // Use 'Code' instead of 'id'
                },
            });

            if (existingForwarder) {
                return res.status(400).json({
                    status: {
                        code: 400,
                        message: "Forwarder with this name already exists",
                    },
                });
            }
        }

        // Check if CountryId exists (only if provided)
        if (CountryId) {
            const countryExists = await Country.findByPk(CountryId);
            if (!countryExists) {
                return res.status(400).json({
                    status: { code: 400, message: "CountryId does not exist" },
                });
            }
        }

        // Check if BankId exists (only if provided)
        if (BankId) {
            const bankExists = await Bank.findByPk(BankId);
            if (!bankExists) {
                return res.status(400).json({
                    status: { code: 400, message: "BankId does not exist" },
                });
            }
        }

        // Proceed with forwarder update
        await forwarder.update({
            Name: Name ?? forwarder.Name,
            CountryId: CountryId ?? forwarder.CountryId,
            BankId: BankId ?? forwarder.BankId,
            Notes: Notes ?? forwarder.Notes,
            AddressChina: AddressChina ?? forwarder.AddressChina,
            AddressIndonesia: AddressIndonesia ?? forwarder.AddressIndonesia,
            CoordinateIndonesia:
                CoordinateIndonesia ?? forwarder.CoordinateIndonesia,
            NamePIC: NamePIC ?? forwarder.NamePIC,
            Department: Department ?? forwarder.Department,
            ContactMethod: ContactMethod ?? forwarder.ContactMethod,
            Description: Description ?? forwarder.Description,
            AccountNumber: AccountNumber ?? forwarder.AccountNumber,
            Website: Website ?? forwarder.Website,
            Wechat: Wechat ?? forwarder.Wechat,
            ShippingMark: ShippingMark ?? forwarder.ShippingMark,
            Status: Status ?? forwarder.Status,
        });

        res.status(200).json({
            status: { code: 200, message: "Forwarder updated successfully" },
            data: forwarder,
        });
    } catch (error) {
        console.error("Error updating forwarder:", error);
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
