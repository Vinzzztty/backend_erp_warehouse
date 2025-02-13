const { Variant } = require("../../models");

// Create a new Variant
exports.createVariant = async (req, res) => {
    try {
        const { Name, Notes, Status } = req.body;

        // Check if a Variant with the same Name already exists
        const existingVariant = await Variant.findOne({ where: { Name } });

        if (existingVariant) {
            return res.status(400).json({
                status: {
                    code: 400,
                    message: "Variant with this name already exists",
                },
            });
        }

        // Create the new Variant if Name is unique
        const newVariant = await Variant.create({
            Name,
            Notes,
            Status,
        });

        return res.status(201).json({
            status: { code: 201, message: "Variant created successfully" },
            data: newVariant,
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

// Get all Variants
exports.getAllVariants = async (req, res) => {
    try {
        const variants = await Variant.findAll();

        return res.status(200).json({
            status: { code: 200, message: "Variants retrieved successfully" },
            data: variants,
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

// Get a Variant by ID
exports.getVariantById = async (req, res) => {
    try {
        const { id } = req.params;
        const variant = await Variant.findByPk(id);

        if (!variant) {
            return res.status(404).json({
                status: { code: 404, message: "Variant not found" },
            });
        }

        return res.status(200).json({
            status: { code: 200, message: "Variant retrieved successfully" },
            data: variant,
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

// Update a Variant
exports.updateVariant = async (req, res) => {
    try {
        const { id } = req.params;
        const { Name, Notes, Status } = req.body;

        // Check if the Variant exists
        const variant = await Variant.findByPk(id);
        if (!variant) {
            return res.status(404).json({
                status: { code: 404, message: "Variant not found" },
            });
        }

        // Check if another Variant with the same Name exists (excluding the current one)
        if (Name) {
            const existingVariant = await Variant.findOne({
                where: { Name, id: { [db.Sequelize.Op.ne]: id } }, // Exclude the current variant
            });

            if (existingVariant) {
                return res.status(400).json({
                    status: {
                        code: 400,
                        message: "Variant with this name already exists",
                    },
                });
            }
        }

        // Update Variant if Name is unique
        await variant.update({
            Name: Name ?? variant.Name,
            Notes: Notes ?? variant.Notes,
            Status: Status ?? variant.Status,
        });

        return res.status(200).json({
            status: { code: 200, message: "Variant updated successfully" },
            data: variant,
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

// Delete a Variant
exports.deleteVariant = async (req, res) => {
    try {
        const { id } = req.params;
        const variant = await Variant.findByPk(id);

        if (!variant) {
            return res.status(404).json({
                status: { code: 404, message: "Variant not found" },
            });
        }

        await variant.destroy();

        return res.status(200).json({
            status: { code: 200, message: "Variant deleted successfully" },
        });
    } catch (error) {
        return res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};
