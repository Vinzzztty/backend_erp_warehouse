const { Supplier, City, Province, Country, Bank } = require("../../models");

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
            status: {
                code: 201,
                message: "Supplier created successfully",
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

        const supplier = await Supplier.findByPk(id);

        if (!supplier) {
            return res.status(404).json({
                status: {
                    code: 404,
                    message: "Supplier not found",
                },
            });
        }

        await Supplier.update(
            {
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
            },
            {
                where: { Code: id },
            }
        );

        res.status(200).json({
            status: {
                code: 200,
                message: "Supplier updated successfully",
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
