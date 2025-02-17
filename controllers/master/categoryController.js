const Category = require("../../models").Category;
const { Op } = db.Sequelize;
const db = require("../../models");

module.exports = {
    // Create a new Category
    createCategory(req, res) {
        const { Name, SKUCode, Notes, Status } = req.body;

        // Check if a category with the same Name already exists
        Category.findOne({ where: { Name } })
            .then((existingCategory) => {
                if (existingCategory) {
                    return res.status(400).json({
                        status: {
                            code: 400,
                            message: "Category with this name already exists",
                        },
                    });
                }

                // Create new category if Name is unique
                return Category.create({
                    Name,
                    SKUCode,
                    Notes,
                    Status,
                });
            })
            .then((newCategory) => {
                if (newCategory) {
                    res.status(201).json({
                        status: {
                            code: 201,
                            message: "Category created successfully",
                        },
                        data: newCategory,
                    });
                }
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

    // Update a Category by Code
    updateCategory(req, res) {
        const { id } = req.params; // This should be 'Code' from request params
        const { Name, SKUCode, Notes, Status } = req.body;

        // Convert id to integer since 'Code' is an integer
        const categoryCode = parseInt(id, 10);
        if (isNaN(categoryCode)) {
            return res.status(400).json({
                status: { code: 400, message: "Invalid category Code" },
            });
        }

        // Check if the category exists
        Category.findByPk(categoryCode)
            .then((category) => {
                if (!category) {
                    return res.status(404).json({
                        status: { code: 404, message: "Category not found" },
                    });
                }

                // Check if another category with the same Name exists (excluding the current one)
                return Category.findOne({
                    where: {
                        Name,
                        Code: { [Op.ne]: categoryCode }, // Use 'Code' instead of 'id'
                    },
                }).then((existingCategory) => {
                    if (existingCategory) {
                        return res.status(400).json({
                            status: {
                                code: 400,
                                message:
                                    "Category with this name already exists",
                            },
                        });
                    }

                    // Update category if Name is unique
                    return category.update({
                        Name: Name ?? category.Name,
                        SKUCode: SKUCode ?? category.SKUCode,
                        Notes: Notes ?? category.Notes,
                        Status: Status ?? category.Status,
                    });
                });
            })
            .then((updatedCategory) => {
                if (updatedCategory) {
                    res.status(200).json({
                        status: {
                            code: 200,
                            message: "Category updated successfully",
                        },
                        data: updatedCategory,
                    });
                }
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
