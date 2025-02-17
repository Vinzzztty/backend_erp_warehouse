const ImageKit = require("imagekit");
const sharp = require("sharp");
const { Op } = db.Sequelize;
const db = require("../../models");

// ImageKit setup
const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

// Helper function for image upload
const uploadImageToImageKit = async (fileBuffer, fileName) => {
    try {
        const result = await imagekit.upload({
            file: fileBuffer,
            fileName: fileName,
        });
        return result.url;
    } catch (error) {
        throw new Error("Failed to upload image to ImageKit: " + error.message);
    }
};

const db = require("../../models");
const Product = db.Product;

// The associated models
const Company = db.Company;
const Category = db.Category;
const Variant = db.Variant;
const UoM = db.UoM;
const Store = db.Store;
const Channel = db.Channel;

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

        // Check if a product with the same Name already exists
        const existingProduct = await Product.findOne({ where: { Name } });
        if (existingProduct) {
            return res.status(400).json({
                status: {
                    code: 400,
                    message: "Product with this name already exists",
                },
            });
        }

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
        let dimensions = { width: null, height: null };
        if (req.file) {
            imageUrl = await uploadImageToImageKit(
                req.file.buffer,
                req.file.originalname
            );

            // Extract image dimensions
            const metadata = await sharp(req.file.buffer).metadata();
            dimensions = { width: metadata.width, height: metadata.height };
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
            Length: dimensions.height,
            Width: dimensions.width,
            Height: dimensions.height,
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
        const { id } = req.params; // This should be 'Code' from request params

        // Convert id to integer since 'Code' is an integer
        const productCode = parseInt(id, 10);
        if (isNaN(productCode)) {
            return res.status(400).json({
                status: { code: 400, message: "Invalid product Code" },
            });
        }

        // Check if the product exists
        const existingProduct = await Product.findByPk(productCode);
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

        // Check if another product with the same Name exists (excluding the current one)
        if (Name) {
            const existingProductByName = await Product.findOne({
                where: {
                    Name,
                    Code: { [Op.ne]: productCode }, // Use 'Code' instead of 'id'
                },
            });

            if (existingProductByName) {
                return res.status(400).json({
                    status: {
                        code: 400,
                        message: "Product with this name already exists",
                    },
                });
            }
        }

        // Handle image upload if a new image is provided
        let imageUrl = existingProduct.ImageURL; // Keep the existing URL if no new image is uploaded
        let dimensions = {
            width: existingProduct.Width,
            height: existingProduct.Height,
        };

        if (req.file) {
            imageUrl = await uploadImageToImageKit(
                req.file.buffer,
                req.file.originalname
            );

            // Extract image dimensions
            const metadata = await sharp(req.file.buffer).metadata();
            dimensions = { width: metadata.width, height: metadata.height };
        }

        // Validate associations if provided
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

        // Proceed with update
        await existingProduct.update({
            Name: Name ?? existingProduct.Name,
            CodeName: CodeName ?? existingProduct.CodeName,
            SKUCode: SKUCode ?? existingProduct.SKUCode,
            SKUFull: SKUFull ?? existingProduct.SKUFull,
            SKUParent: SKUParent ?? existingProduct.SKUParent,
            SKUCodeChild: SKUCodeChild ?? existingProduct.SKUCodeChild,
            CompanyCode: CompanyCode ?? existingProduct.CompanyCode,
            CategoryCode: CategoryCode ?? existingProduct.CategoryCode,
            VariantId: VariantId ?? existingProduct.VariantId,
            Content: Content ?? existingProduct.Content,
            UoM: UoM ?? existingProduct.UoM,
            Notes: Notes ?? existingProduct.Notes,
            ImageURL: imageUrl,
            Status: Status ?? existingProduct.Status,
            Length: Length ?? dimensions.height, // Auto-fill Length if not provided
            Width: Width ?? dimensions.width, // Auto-fill Width if not provided
            Height: Height ?? existingProduct.Height, // Keep the original if not updated
            Weight: Weight ?? existingProduct.Weight,
            Parameter: Parameter ?? existingProduct.Parameter,
            Keyword: Keyword ?? existingProduct.Keyword,
            StoreName: StoreName ?? existingProduct.StoreName,
            Channel: ChannelCode ?? existingProduct.Channel,
            InitialChannel: InitialChannel ?? existingProduct.InitialChannel,
            CategoryFromChannel:
                CategoryFromChannel ?? existingProduct.CategoryFromChannel,
            CodeNumber: CodeNumber ?? existingProduct.CodeNumber,
            SKUCodeEcommerce:
                SKUCodeEcommerce ?? existingProduct.SKUCodeEcommerce,
        });

        res.status(200).json({
            status: { code: 200, message: "Product updated successfully" },
            data: existingProduct,
        });
    } catch (error) {
        console.error("Error updating product:", error);
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
