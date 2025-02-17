const { Supplier, City, Province, Country, Bank } = require("../../models");
const db = require("../../models");

// Create a new supplier
exports.createSupplier = async (req, res) => {
    try {
        const {
            Name,
            Address,
            CityId,
            ProvinceId,
            CountryId,
            PostalCode,
            Notes,
            Status,
            Department,
            ContactMethod,
            Description,
            BankId,
            AccountNumber,
            Website,
            Wechat,
            ShippingMark,
        } = req.body;

        // Check if a supplier with the same Name already exists
        const existingSupplier = await Supplier.findOne({ where: { Name } });

        if (existingSupplier) {
            return res.status(400).json({
                status: {
                    code: 400,
                    message: "Supplier with this name already exists",
                },
            });
        }

        // Validate referenced entities
        if (CityId) {
            const cityExists = await City.findByPk(CityId);
            if (!cityExists) {
                return res.status(404).json({
                    status: { code: 404, message: "City not found" },
                });
            }
        }

        if (ProvinceId) {
            const provinceExists = await Province.findByPk(ProvinceId);
            if (!provinceExists) {
                return res.status(404).json({
                    status: { code: 404, message: "Province not found" },
                });
            }
        }

        if (CountryId) {
            const countryExists = await Country.findByPk(CountryId);
            if (!countryExists) {
                return res.status(404).json({
                    status: { code: 404, message: "Country not found" },
                });
            }
        }

        if (BankId) {
            const bankExists = await Bank.findByPk(BankId);
            if (!bankExists) {
                return res.status(404).json({
                    status: { code: 404, message: "Bank not found" },
                });
            }
        }

        // Create new supplier if Name is unique
        const supplier = await Supplier.create({
            Name,
            Address,
            CityId,
            ProvinceId,
            CountryId,
            PostalCode,
            Notes,
            Status,
            Department,
            ContactMethod,
            Description,
            BankId,
            AccountNumber,
            Website,
            Wechat,
            ShippingMark,
        });

        res.status(201).json({
            status: { code: 201, message: "Supplier created successfully" },
            data: supplier,
        });
    } catch (error) {
        res.status(500).json({
            status: { code: 500, message: "Internal server error" },
            error: error.message,
        });
    }
};

// Get all suppliers
exports.getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.findAll({
            include: [
                { model: City, as: "City" },
                { model: Province, as: "Province" },
                { model: Country, as: "Country" },
                { model: Bank, as: "Bank" },
            ],
        });

        res.status(200).json({
            status: {
                code: 200,
                message: "Suppliers retrieved successfully",
            },
            data: suppliers,
        });
    } catch (error) {
        res.status(500).json({
            status: {
                code: 500,
                message: error.message,
            },
        });
    }
};

// Get supplier by ID
exports.getSupplierById = async (req, res) => {
    try {
        const { id } = req.params;
        const supplier = await Supplier.findByPk(id, {
            include: [
                { model: City, as: "City" },
                { model: Province, as: "Province" },
                { model: Country, as: "Country" },
                { model: Bank, as: "Bank" },
            ],
        });

        if (!supplier) {
            return res.status(404).json({
                status: {
                    code: 404,
                    message: "Supplier not found",
                },
            });
        }

        res.status(200).json({
            status: {
                code: 200,
                message: "Supplier retrieved successfully",
            },
            data: supplier,
        });
    } catch (error) {
        res.status(500).json({
            status: {
                code: 500,
                message: error.message,
            },
        });
    }
};

// Update supplier by ID
exports.updateSupplier = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            Name,
            Address,
            CityId,
            ProvinceId,
            CountryId,
            PostalCode,
            Notes,
            Status,
            Department,
            ContactMethod,
            Description,
            BankId,
            AccountNumber,
            Website,
            Wechat,
            ShippingMark,
        } = req.body;

        // Check if the supplier exists
        const supplier = await Supplier.findByPk(id);
        if (!supplier) {
            return res.status(404).json({
                status: { code: 404, message: "Supplier not found" },
            });
        }

        // Check if another supplier with the same Name exists (excluding the current one)
        if (Name) {
            const existingSupplier = await Supplier.findOne({
                where: { Name, id: { [db.Sequelize.Op.ne]: id } }, // Exclude the current supplier
            });

            if (existingSupplier) {
                return res.status(400).json({
                    status: {
                        code: 400,
                        message: "Supplier with this name already exists",
                    },
                });
            }
        }

        // Validate referenced entities if provided
        if (CityId && CityId !== supplier.CityId) {
            const cityExists = await City.findByPk(CityId);
            if (!cityExists) {
                return res.status(404).json({
                    status: { code: 404, message: "City not found" },
                });
            }
        }

        if (ProvinceId && ProvinceId !== supplier.ProvinceId) {
            const provinceExists = await Province.findByPk(ProvinceId);
            if (!provinceExists) {
                return res.status(404).json({
                    status: { code: 404, message: "Province not found" },
                });
            }
        }

        if (CountryId && CountryId !== supplier.CountryId) {
            const countryExists = await Country.findByPk(CountryId);
            if (!countryExists) {
                return res.status(404).json({
                    status: { code: 404, message: "Country not found" },
                });
            }
        }

        if (BankId && BankId !== supplier.BankId) {
            const bankExists = await Bank.findByPk(BankId);
            if (!bankExists) {
                return res.status(404).json({
                    status: { code: 404, message: "Bank not found" },
                });
            }
        }

        // Proceed with supplier update
        await supplier.update({
            Name: Name ?? supplier.Name,
            Address: Address ?? supplier.Address,
            CityId: CityId ?? supplier.CityId,
            ProvinceId: ProvinceId ?? supplier.ProvinceId,
            CountryId: CountryId ?? supplier.CountryId,
            PostalCode: PostalCode ?? supplier.PostalCode,
            Notes: Notes ?? supplier.Notes,
            Status: Status ?? supplier.Status,
            Department: Department ?? supplier.Department,
            ContactMethod: ContactMethod ?? supplier.ContactMethod,
            Description: Description ?? supplier.Description,
            BankId: BankId ?? supplier.BankId,
            AccountNumber: AccountNumber ?? supplier.AccountNumber,
            Website: Website ?? supplier.Website,
            Wechat: Wechat ?? supplier.Wechat,
            ShippingMark: ShippingMark ?? supplier.ShippingMark,
        });

        res.status(200).json({
            status: { code: 200, message: "Supplier updated successfully" },
            data: supplier,
        });
    } catch (error) {
        res.status(500).json({
            status: { code: 500, message: "Internal server error" },
            error: error.message,
        });
    }
};

// Delete supplier by ID
exports.deleteSupplier = async (req, res) => {
    try {
        const { id } = req.params;
        const supplier = await Supplier.findByPk(id);

        if (!supplier) {
            return res.status(404).json({
                status: {
                    code: 404,
                    message: "Supplier not found",
                },
            });
        }

        await Supplier.destroy({
            where: { Code: id },
        });

        res.status(200).json({
            status: {
                code: 200,
                message: "Supplier deleted successfully",
            },
        });
    } catch (error) {
        res.status(500).json({
            status: {
                code: 500,
                message: error.message,
            },
        });
    }
};
