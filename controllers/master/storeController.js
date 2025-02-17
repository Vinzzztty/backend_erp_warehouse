const db = require("../../models");
const { Store } = db;
const { Op } = db.Sequelize;

module.exports = {
    // Create Store
    createStore: async (req, res) => {
        try {
            const { Name, Notes, Status } = req.body;

            // Check if a store with the same Name already exists
            const existingStore = await Store.findOne({ where: { Name } });

            if (existingStore) {
                return res.status(400).json({
                    status: {
                        code: 400,
                        message: "Store with this name already exists",
                    },
                });
            }

            // Create new store if Name is unique
            const newStore = await Store.create({
                Name,
                Notes,
                Status,
            });

            res.status(201).json({
                status: { code: 201, message: "Store created successfully" },
                data: newStore,
            });
        } catch (error) {
            res.status(500).json({
                status: { code: 500, message: "Internal server error" },
                error: error.message,
            });
        }
    },

    // Get all Stores
    getAllStores: async (req, res) => {
        try {
            const stores = await Store.findAll();
            res.status(200).json({
                status: { code: 200, message: "Stores retrieved successfully" },
                data: stores,
            });
        } catch (error) {
            res.status(500).json({
                status: { code: 500, message: "Internal server error" },
                error: error.message,
            });
        }
    },

    // Get Store by ID
    getStoreById: async (req, res) => {
        try {
            const { id } = req.params;
            const store = await Store.findByPk(id);

            if (!store) {
                return res.status(404).json({
                    status: { code: 404, message: "Store not found" },
                });
            }

            res.status(200).json({
                status: { code: 200, message: "Store retrieved successfully" },
                data: store,
            });
        } catch (error) {
            res.status(500).json({
                status: { code: 500, message: "Internal server error" },
                error: error.message,
            });
        }
    },

    // Update Store
    updateStore: async (req, res) => {
        try {
            const { Name, Notes, Status } = req.body;
            const { id } = req.params; // This should be 'Code' now

            // Convert id to integer since 'Code' is an integer
            const storeCode = parseInt(id, 10);
            if (isNaN(storeCode)) {
                return res.status(400).json({
                    status: { code: 400, message: "Invalid store Code" },
                });
            }

            // Check if the store exists
            const store = await Store.findByPk(storeCode);
            if (!store) {
                return res.status(404).json({
                    status: { code: 404, message: "Store not found" },
                });
            }

            // Check if another store with the same Name exists (excluding the current one)
            if (Name) {
                const existingStore = await Store.findOne({
                    where: {
                        Name,
                        Code: { [Op.ne]: storeCode }, // Use 'Code' instead of 'id'
                    },
                });

                if (existingStore) {
                    return res.status(400).json({
                        status: {
                            code: 400,
                            message: "Store with this name already exists",
                        },
                    });
                }
            }

            // Update store
            await store.update({
                Name: Name ?? store.Name,
                Notes: Notes ?? store.Notes,
                Status: Status ?? store.Status,
            });

            res.status(200).json({
                status: { code: 200, message: "Store updated successfully" },
                data: store,
            });
        } catch (error) {
            res.status(500).json({
                status: { code: 500, message: "Internal server error" },
                error: error.message,
            });
        }
    },

    // Delete Store
    deleteStore: async (req, res) => {
        try {
            const { id } = req.params;
            const store = await Store.findByPk(id);

            if (!store) {
                return res.status(404).json({
                    status: { code: 404, message: "Store not found" },
                });
            }

            await store.destroy();

            res.status(200).json({
                status: { code: 200, message: "Store deleted successfully" },
            });
        } catch (error) {
            res.status(500).json({
                status: { code: 500, message: "Internal server error" },
                error: error.message,
            });
        }
    },
};
