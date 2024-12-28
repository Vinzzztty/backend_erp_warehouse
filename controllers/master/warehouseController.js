const db = require("../../models");
const Warehouse = db.Warehouse;

// Create a new warehouse
exports.createWarehouse = async (req, res) => {
    try {
        const { Name, Address, Notes, Status } = req.body;

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

// Update a warehouse
exports.updateWarehouse = async (req, res) => {
    try {
        const { id } = req.params;
        const { Name, Address, Notes, Status } = req.body;

        const warehouse = await Warehouse.findByPk(id);

        if (!warehouse) {
            return res.status(404).json({
                status: { code: 404, message: "Warehouse not found" },
            });
        }

        await warehouse.update({ Name, Address, Notes, Status });

        res.status(200).json({
            status: { code: 200, message: "Warehouse updated successfully" },
            data: warehouse,
        });
    } catch (error) {
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
