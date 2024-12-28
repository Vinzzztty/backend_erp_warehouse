const Category = require("../../models").Category;

module.exports = {
    // Create a new Category
    createCategory(req, res) {
        const { Name, SKUCode, Notes, Status } = req.body;

        Category.create({
            Name,
            SKUCode,
            Notes,
            Status,
        })
            .then((newCategory) => {
                res.status(201).json({
                    status: {
                        code: 201,
                        message: "Category created successfully",
                    },
                    data: newCategory,
                });
            })
            .catch((error) => {
                res.status(500).json({
                    status: { code: 500, message: error.message },
                });
            });
    },

    // Get all Categories
    getAllCategories(req, res) {
        Category.findAll()
            .then((categories) => {
                res.status(200).json({
                    status: {
                        code: 200,
                        message: "Categories retrieved successfully",
                    },
                    data: categories,
                });
            })
            .catch((error) => {
                res.status(500).json({
                    status: { code: 500, message: error.message },
                });
            });
    },

    // Get a single Category by ID
    getCategoryById(req, res) {
        const { id } = req.params;

        Category.findByPk(id)
            .then((category) => {
                if (!category) {
                    return res.status(404).json({
                        status: { code: 404, message: "Category not found" },
                    });
                }
                res.status(200).json({
                    status: {
                        code: 200,
                        message: "Category retrieved successfully",
                    },
                    data: category,
                });
            })
            .catch((error) => {
                res.status(500).json({
                    status: { code: 500, message: error.message },
                });
            });
    },

    // Update a Category by ID
    updateCategory(req, res) {
        const { id } = req.params;
        const { Name, SKUCode, Notes, Status } = req.body;

        Category.update(
            { Name, SKUCode, Notes, Status },
            { where: { Code: id } }
        )
            .then((updated) => {
                if (updated[0] === 0) {
                    return res.status(404).json({
                        status: { code: 404, message: "Category not found" },
                    });
                }
                res.status(200).json({
                    status: {
                        code: 200,
                        message: "Category updated successfully",
                    },
                });
            })
            .catch((error) => {
                res.status(500).json({
                    status: { code: 500, message: error.message },
                });
            });
    },

    // Delete a Category by ID
    deleteCategory(req, res) {
        const { id } = req.params;

        Category.destroy({ where: { Code: id } })
            .then((deleted) => {
                if (deleted === 0) {
                    return res.status(404).json({
                        status: { code: 404, message: "Category not found" },
                    });
                }
                res.status(200).json({
                    status: {
                        code: 200,
                        message: "Category deleted successfully",
                    },
                });
            })
            .catch((error) => {
                res.status(500).json({
                    status: { code: 500, message: error.message },
                });
            });
    },
};
