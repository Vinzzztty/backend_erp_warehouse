const { Store } = require("../../models");

module.exports = {
    // Create Store
    createStore: async (req, res) => {
        try {
            const { Name, Notes, Status } = req.body;

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
            const { id } = req.params;

            const store = await Store.findByPk(id);

            if (!store) {
                return res.status(404).json({
                    status: { code: 404, message: "Store not found" },
                });
            }

            await store.update({
                Name,
                Notes,
                Status,
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
