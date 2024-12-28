const db = require("../../models");

// Create Company
exports.createCompany = async (req, res) => {
    try {
        const { Name, Notes, Status } = req.body;

        const newCompany = await db.Company.create({
            Name,
            Notes,
            Status,
        });

        res.status(201).json({
            status: { code: 201, message: "Company created successfully" },
            data: newCompany,
        });
    } catch (error) {
        res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

// Get All Companies
exports.getAllCompanies = async (req, res) => {
    try {
        const companies = await db.Company.findAll();

        res.status(200).json({
            status: { code: 200, message: "Companies retrieved successfully" },
            data: companies,
        });
    } catch (error) {
        res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

// Get Company by ID
exports.getCompanyById = async (req, res) => {
    try {
        const { Code } = req.params;

        const company = await db.Company.findByPk(Code);

        if (!company) {
            return res.status(404).json({
                status: { code: 404, message: "Company not found" },
            });
        }

        res.status(200).json({
            status: { code: 200, message: "Company retrieved successfully" },
            data: company,
        });
    } catch (error) {
        res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

// Update Company
exports.updateCompany = async (req, res) => {
    try {
        const { Code } = req.params;
        const { Name, Notes, Status } = req.body;

        const company = await db.Company.findByPk(Code);

        if (!company) {
            return res.status(404).json({
                status: { code: 404, message: "Company not found" },
            });
        }

        await company.update({ Name, Notes, Status });

        res.status(200).json({
            status: { code: 200, message: "Company updated successfully" },
            data: company,
        });
    } catch (error) {
        res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

// Delete Company
exports.deleteCompany = async (req, res) => {
    try {
        const { Code } = req.params;

        const company = await db.Company.findByPk(Code);

        if (!company) {
            return res.status(404).json({
                status: { code: 404, message: "Company not found" },
            });
        }

        await company.destroy();

        res.status(200).json({
            status: { code: 200, message: "Company deleted successfully" },
        });
    } catch (error) {
        res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};
