const db = require("../../models");
const Product = db.Product;

// The associated models
const Company = db.Company;
const Category = db.Category;
const Variant = db.Variant;
const UoM = db.UoM;
const Store = db.Store;
const Channel = db.Channel;

const { uploadImage } = require("../../utils/imageKit");

exports.createProduct = async (req, res) => {
    try {
        const {
            Name,
            CodeName,
            SKUCode,
            SKUFull,
            SKUParent,
            SKUCodeChild,
            CompanyCode,
            CategoryCode,
            VariantId,
            Content,
            UoM,
            Notes,
            Status,
            Length,
            Width,
            Height,
            Weight,
            Parameter,
            Keyword,
            StoreName,
            Channel: ChannelCode,
            InitialChannel,
            CategoryFromChannel,
            CodeNumber,
            SKUCodeEcommerce,
        } = req.body;

        // Validate associations (e.g., Company, Category)
        const company = await Company.findByPk(CompanyCode);
        if (!company) {
            return res
                .status(404)
                .json({ status: { code: 404, message: "Company not found" } });
        }

        const category = await Category.findByPk(CategoryCode);
        if (!category) {
            return res
                .status(404)
                .json({ status: { code: 404, message: "Category not found" } });
        }

        // Handle image upload if provided
        let imageUrl = null;
        if (req.file) {
            imageUrl = await uploadImage(
                req.file.buffer,
                req.file.originalname
            );
        }

        // Create the product
        const newProduct = await Product.create({
            Name,
            CodeName,
            SKUCode,
            SKUFull,
            SKUParent,
            SKUCodeChild,
            CompanyCode,
            CategoryCode,
            VariantId,
            Content,
            UoM,
            Notes,
            ImageURL: imageUrl,
            Status,
            Length,
            Width,
            Height,
            Weight,
            Parameter,
            Keyword,
            StoreName,
            Channel: ChannelCode,
            InitialChannel,
            CategoryFromChannel,
            CodeNumber,
            SKUCodeEcommerce,
        });

        res.status(201).json({
            status: { code: 201, message: "Product created successfully" },
            data: newProduct,
        });
    } catch (error) {
        res.status(500).json({ status: { code: 500, message: error.message } });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        // Include all associations
        const products = await Product.findAll({
            include: [
                { model: Company, as: "Company" },
                { model: Category, as: "Category" },
                { model: Variant, as: "Variant" },
                { model: UoM, as: "UnitOfMeasure" },
                { model: Store, as: "Store" },
                { model: Channel, as: "ChannelInfo" },
            ],
        });

        res.status(200).json({
            status: { code: 200, message: "Products retrieved successfully" },
            data: products,
        });
    } catch (error) {
        res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByPk(id, {
            include: [
                { model: Company, as: "Company" },
                { model: Category, as: "Category" },
                { model: Variant, as: "Variant" },
                { model: UoM, as: "UnitOfMeasure" },
                { model: Store, as: "Store" },
                { model: Channel, as: "ChannelInfo" },
            ],
        });

        if (!product) {
            return res.status(404).json({
                status: { code: 404, message: "Product not found" },
            });
        }

        res.status(200).json({
            status: { code: 200, message: "Product retrieved successfully" },
            data: product,
        });
    } catch (error) {
        res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const existingProduct = await Product.findByPk(id);
        if (!existingProduct) {
            return res.status(404).json({
                status: { code: 404, message: "Product not found" },
            });
        }

        const {
            Name,
            CodeName,
            SKUCode,
            SKUFull,
            SKUParent,
            SKUCodeChild,
            CompanyCode,
            CategoryCode,
            VariantId,
            Content,
            UoM,
            Notes,
            ImageURL,
            Status,
            Length,
            Width,
            Height,
            Weight,
            Parameter,
            Keyword,
            StoreName,
            Channel: ChannelCode,
            InitialChannel,
            CategoryFromChannel,
            CodeNumber,
            SKUCodeEcommerce,
        } = req.body;

        // Handle image upload if a new image is provided
        let imageUrl = existingProduct.ImageURL; // Keep the existing URL if no new image is uploaded
        if (req.file) {
            imageUrl = await uploadImage(
                req.file.buffer,
                req.file.originalname
            );
        }

        // Check required association changes (if provided)
        if (CompanyCode && CompanyCode !== existingProduct.CompanyCode) {
            const company = await Company.findByPk(CompanyCode);
            if (!company) {
                return res.status(404).json({
                    status: { code: 404, message: "Company not found" },
                });
            }
        }

        if (CategoryCode && CategoryCode !== existingProduct.CategoryCode) {
            const category = await Category.findByPk(CategoryCode);
            if (!category) {
                return res.status(404).json({
                    status: { code: 404, message: "Category not found" },
                });
            }
        }

        // Check optional associations
        if (VariantId) {
            const variant = await Variant.findByPk(VariantId);
            if (!variant) {
                return res.status(404).json({
                    status: { code: 404, message: "Variant not found" },
                });
            }
        }

        if (UoM) {
            const uom = await db.UoM.findByPk(UoM);
            if (!uom) {
                return res.status(404).json({
                    status: { code: 404, message: "UoM not found" },
                });
            }
        }

        if (StoreName) {
            const store = await Store.findByPk(StoreName);
            if (!store) {
                return res.status(404).json({
                    status: { code: 404, message: "Store not found" },
                });
            }
        }

        if (ChannelCode) {
            const channel = await Channel.findByPk(ChannelCode);
            if (!channel) {
                return res.status(404).json({
                    status: { code: 404, message: "Channel not found" },
                });
            }
        }

        // Proceed with update
        await existingProduct.update({
            Name,
            CodeName,
            SKUCode,
            SKUFull,
            SKUParent,
            SKUCodeChild,
            CompanyCode,
            CategoryCode,
            VariantId,
            Content,
            UoM,
            Notes,
            ImageURL: imageUrl,
            Status,
            Length,
            Width,
            Height,
            Weight,
            Parameter,
            Keyword,
            StoreName,
            Channel: ChannelCode,
            InitialChannel,
            CategoryFromChannel,
            CodeNumber,
            SKUCodeEcommerce,
        });

        // Reload to ensure afterUpdate hooks or changes are consistent
        await existingProduct.reload();

        res.status(200).json({
            status: { code: 200, message: "Product updated successfully" },
            data: existingProduct,
        });
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(400).json({
                status: { code: 400, message: "SKUCode must be unique" },
            });
        }
        res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({
                status: { code: 404, message: "Product not found" },
            });
        }

        await product.destroy();

        res.status(200).json({
            status: { code: 200, message: "Product deleted successfully" },
        });
    } catch (error) {
        res.status(500).json({
            status: { code: 500, message: error.message },
        });
    }
};
