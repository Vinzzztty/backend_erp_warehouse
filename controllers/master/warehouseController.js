const db = require("../../models");
const Warehouse = db.Warehouse;
const { Op } = db.Sequelize;

// Create a new warehouse
exports.createWarehouse = async (req, res) => {
    try {
        const { Name, Address, Notes, Status } = req.body;

        // Check if a warehouse with the same Name already exists
        const existingWarehouse = await Warehouse.findOne({ where: { Name } });

        if (existingWarehouse) {
            return res.status(400).json({
                status: {
                    code: 400,
                    message: "Warehouse with this name already exists",
                },
            });
        }

        // Create new warehouse if Name is unique
        const newWarehouse = await Warehouse.create({
            Name,
            Address,
            Notes,
            Status,
        });

        res.status(201).json({
            status: { code: 201, message: "Warehouse created successfully" },
            data: newWarehouse,
        });
    } catch (error) {
        res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

// Retrieve all warehouses
exports.getAllWarehouses = async (req, res) => {
    try {
        const warehouses = await Warehouse.findAll();

        res.status(200).json({
            status: { code: 200, message: "Warehouses retrieved successfully" },
            data: warehouses,
        });
    } catch (error) {
        res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

// Retrieve a single warehouse by ID
exports.getWarehouseById = async (req, res) => {
    try {
        const { id } = req.params;

        const warehouse = await Warehouse.findByPk(id);

        if (!warehouse) {
            return res.status(404).json({
                status: { code: 404, message: "Warehouse not found" },
            });
        }

        res.status(200).json({
            status: { code: 200, message: "Warehouse retrieved successfully" },
            data: warehouse,
        });
    } catch (error) {
        res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

exports.updateWarehouse = async (req, res) => {
    try {
        const { id } = req.params; // This should be 'Code' from request params
        const { Name, Address, Notes, Status } = req.body;

        // Convert id to integer since 'Code' is an integer
        const warehouseCode = parseInt(id, 10);
        if (isNaN(warehouseCode)) {
            return res.status(400).json({
                status: { code: 400, message: "Invalid warehouse Code" },
            });
        }

        // Find warehouse using the correct primary key ('Code')
        const warehouse = await Warehouse.findByPk(warehouseCode);
        if (!warehouse) {
            return res.status(404).json({
                status: { code: 404, message: "Warehouse not found" },
            });
        }

        // Check for duplicate warehouse name (excluding the current warehouse)
        if (Name) {
            const existingWarehouse = await Warehouse.findOne({
                where: {
                    Name,
                    Code: { [Op.ne]: warehouseCode }, // Use 'Code' instead of 'id'
                },
            });

            if (existingWarehouse) {
                return res.status(400).json({
                    status: {
                        code: 400,
                        message: "Warehouse with this name already exists",
                    },
                });
            }
        }

        // Update the warehouse
        await warehouse.update({
            Name: Name ?? warehouse.Name,
            Address: Address ?? warehouse.Address,
            Notes: Notes ?? warehouse.Notes,
            Status: Status ?? warehouse.Status,
        });

        res.status(200).json({
            status: { code: 200, message: "Warehouse updated successfully" },
            data: warehouse,
        });
    } catch (error) {
        console.error("Error updating warehouse:", error);
        res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

// Delete a warehouse
exports.deleteWarehouse = async (req, res) => {
    try {
        const { id } = req.params;

        const warehouse = await Warehouse.findByPk(id);

        if (!warehouse) {
            return res.status(404).json({
                status: { code: 404, message: "Warehouse not found" },
            });
        }

        await warehouse.destroy();

        res.status(200).json({
            status: { code: 200, message: "Warehouse deleted successfully" },
        });
    } catch (error) {
        res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};
