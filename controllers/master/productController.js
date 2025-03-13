const db = require("../../models");
const ImageKit = require("imagekit");
const { Op } = db.Sequelize;

// ImageKit setup
const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

// Helper function for uploading multiple images
const uploadImagesToImageKit = async (files) => {
    try {
        const imageUrls = [];

        for (const file of files) {
            const result = await imagekit.upload({
                file: file.buffer,
                fileName: file.originalname,
            });
            imageUrls.push(result.url);
        }

        return imageUrls;
    } catch (error) {
        throw new Error(
            "Failed to upload images to ImageKit: " + error.message
        );
    }
};

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
            VariantId_2,
            Content,
            UoM,
            Notes,
            Status,
            Length,
            Width,
            Height,
            Weight,
            Length_UoM,
            Width_UoM,
            Height_UoM,
            Weight_UoM,
            Keyword,
            StoreName_1,
            Channel_1,
            CodeNumber_1,
            StoreName_2,
            Channel_2,
            CodeNumber_2,
            StoreName_3,
            Channel_3,
            CodeNumber_3,
            StoreName_4,
            Channel_4,
            CodeNumber_4,
            StoreName_5,
            Channel_5,
            CodeNumber_5,
        } = req.body;

        console.log("🚀 Received SKUCode:", SKUCode);
        console.log("🚀 Received Name:", Name);

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

        // ✅ Validate Channels
        const channelIds = [
            Channel_1,
            Channel_2,
            Channel_3,
            Channel_4,
            Channel_5,
        ].filter((id) => id !== undefined);

        const existingChannels = await db.Channel.findAll({
            where: { Code: channelIds },
            attributes: ["Code", "Name", "Initial", "Category"],
        });

        const channelMap = new Map(existingChannels.map((c) => [c.Code, c]));

        // ✅ Autofill Initial Channel & CategoryFromChannel
        const InitialChannel_1 = channelMap.get(Channel_1)?.Initial || null;
        const CategoryFromChannel_1 =
            channelMap.get(Channel_1)?.Category || null;

        const InitialChannel_2 = channelMap.get(Channel_2)?.Initial || null;
        const CategoryFromChannel_2 =
            channelMap.get(Channel_2)?.Category || null;

        const InitialChannel_3 = channelMap.get(Channel_3)?.Initial || null;
        const CategoryFromChannel_3 =
            channelMap.get(Channel_3)?.Category || null;

        const InitialChannel_4 = channelMap.get(Channel_4)?.Initial || null;
        const CategoryFromChannel_4 =
            channelMap.get(Channel_4)?.Category || null;

        const InitialChannel_5 = channelMap.get(Channel_5)?.Initial || null;
        const CategoryFromChannel_5 =
            channelMap.get(Channel_5)?.Category || null;

        // ✅ Generate SKU Code E-Commerce
        const SKUCodeEcommerce_1 =
            Name && Channel_1
                ? `${Name}_${
                      channelMap.get(Channel_1)?.Name
                  }_${InitialChannel_1}_${CategoryFromChannel_1}_SKU`
                : null;

        const SKUCodeEcommerce_2 =
            Name && Channel_2
                ? `${Name}_${
                      channelMap.get(Channel_2)?.Name
                  }_${InitialChannel_2}_${CategoryFromChannel_2}_SKU`
                : null;

        const SKUCodeEcommerce_3 =
            Name && Channel_3
                ? `${Name}_${
                      channelMap.get(Channel_3)?.Name
                  }_${InitialChannel_3}_${CategoryFromChannel_3}_SKU`
                : null;

        const SKUCodeEcommerce_4 =
            Name && Channel_4
                ? `${Name}_${
                      channelMap.get(Channel_4)?.Name
                  }_${InitialChannel_4}_${CategoryFromChannel_4}_SKU`
                : null;

        const SKUCodeEcommerce_5 =
            Name && Channel_5
                ? `${Name}_${
                      channelMap.get(Channel_5)?.Name
                  }_${InitialChannel_5}_${CategoryFromChannel_5}_SKU`
                : null;

        // Handle multiple image uploads
        let imageUrls = [];
        if (req.files && req.files.length > 0) {
            if (req.files.length > 8) {
                return res.status(400).json({
                    status: {
                        code: 400,
                        message: "You can upload up to 8 images only.",
                    },
                });
            }

            imageUrls = await uploadImagesToImageKit(req.files);
        }
        const formattedKeyword =
            typeof Keyword === "string"
                ? Keyword.split(",").map((item) => item.trim()) // Convert CSV-like string to array
                : Array.isArray(Keyword)
                ? Keyword
                : [];

        // ✅ Store `Channel` as JSON array
        const newProduct = await Product.create({
            Name,
            CodeName,
            SKUCode,
            SKUFull: `${Name}_${CategoryCode}_${CodeName}`,
            SKUParent: `${Name}_PARENT`,
            SKUCodeChild: `${Name}_CHILD`,
            CompanyCode,
            CategoryCode,
            SKUCodeCategory: CategoryCode,
            VariantId,
            VariantId_2,
            Content,
            UoM,
            Notes,
            ImageURL: JSON.stringify(imageUrls),
            Status,
            Length,
            Width,
            Height,
            Weight,
            Length_UoM,
            Width_UoM,
            Height_UoM,
            Weight_UoM,
            Keyword: formattedKeyword,
            StoreName_1,
            Channel_1,
            InitialChannel_1,
            CategoryFromChannel_1,
            CodeNumber_1,
            SKUCodeEcommerce_1,
            StoreName_2,
            Channel_2,
            InitialChannel_2,
            CategoryFromChannel_2,
            CodeNumber_2,
            SKUCodeEcommerce_2,
            StoreName_3,
            Channel_3,
            InitialChannel_3,
            CategoryFromChannel_3,
            CodeNumber_3,
            SKUCodeEcommerce_3,
            StoreName_4,
            Channel_4,
            InitialChannel_4,
            CategoryFromChannel_4,
            CodeNumber_4,
            SKUCodeEcommerce_4,
            StoreName_5,
            Channel_5,
            InitialChannel_5,
            CategoryFromChannel_5,
            CodeNumber_5,
            SKUCodeEcommerce_5,
        });

        res.status(201).json({
            status: { code: 201, message: "Product created successfully" },
            data: {
                ...newProduct.toJSON(),
                ImageURL: JSON.parse(newProduct.ImageURL), // ✅ Return as an array
                Keyword: formattedKeyword,
            },
        });
    } catch (error) {
        res.status(500).json({ status: { code: 500, message: error.message } });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        // ✅ Include all necessary associations
        const products = await Product.findAll({
            include: [
                { model: Company, as: "Company" },
                { model: Category, as: "Category" },
                { model: Variant, as: "Variant" },
                { model: Variant, as: "Variant_2" },
                { model: UoM, as: "UnitOfMeasure" },
                { model: Store, as: "Store1" },
                { model: Channel, as: "Channel1" },
                { model: Store, as: "Store2" },
                { model: Channel, as: "Channel2" },
                { model: Store, as: "Store3" },
                { model: Channel, as: "Channel3" },
                { model: Store, as: "Store4" },
                { model: Channel, as: "Channel4" },
                { model: Store, as: "Store5" },
                { model: Channel, as: "Channel5" },
            ],
        });

        // ✅ Safely parse JSON fields before sending response
        const parsedProducts = products.map((product) => {
            const productJSON = product.toJSON();

            // Safely parse Keyword field
            let keywordArray = [];
            try {
                if (product.Keyword) {
                    // Check if it's already an array
                    if (Array.isArray(product.Keyword)) {
                        keywordArray = product.Keyword;
                    } else {
                        keywordArray = JSON.parse(product.Keyword);
                    }
                }
            } catch (e) {
                // If parsing fails, it might be a single string
                if (typeof product.Keyword === "string") {
                    keywordArray = [product.Keyword];
                }
            }

            // Safely parse ImageURL field
            let imageURLArray = [];
            try {
                if (product.ImageURL) {
                    imageURLArray = JSON.parse(product.ImageURL);
                }
            } catch (e) {
                // If parsing fails, it might be a single URL
                if (
                    typeof product.ImageURL === "string" &&
                    product.ImageURL.trim() !== ""
                ) {
                    imageURLArray = [product.ImageURL];
                }
            }

            return {
                ...productJSON,
                Keyword: keywordArray,
                ImageURL: imageURLArray,
                Store1: product.Store1 ? product.Store1.Name : null,
                Channel1: product.Channel1 ? product.Channel1.Name : null,
                Store2: product.Store2 ? product.Store2.Name : null,
                Channel2: product.Channel2 ? product.Channel2.Name : null,
                Store3: product.Store3 ? product.Store3.Name : null,
                Channel3: product.Channel3 ? product.Channel3.Name : null,
                Store4: product.Store4 ? product.Store4.Name : null,
                Channel4: product.Channel4 ? product.Channel4.Name : null,
                Store5: product.Store5 ? product.Store5.Name : null,
                Channel5: product.Channel5 ? product.Channel5.Name : null,
            };
        });

        res.status(200).json({
            status: { code: 200, message: "Products retrieved successfully" },
            data: parsedProducts,
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
                { model: Variant, as: "Variant_2" }, // Added second variant
                { model: UoM, as: "UnitOfMeasure" },

                // Include Stores & Channels for each manual SKU entry
                { model: Store, as: "Store1" },
                { model: Channel, as: "Channel1" },
                { model: Store, as: "Store2" },
                { model: Channel, as: "Channel2" },
                { model: Store, as: "Store3" },
                { model: Channel, as: "Channel3" },
                { model: Store, as: "Store4" },
                { model: Channel, as: "Channel4" },
                { model: Store, as: "Store5" },
                { model: Channel, as: "Channel5" },
            ],
        });

        if (!product) {
            return res.status(404).json({
                status: { code: 404, message: "Product not found" },
            });
        }

        // Safely parse JSON fields
        const productJSON = product.toJSON();

        // Safely parse Keyword field
        let keywordArray = [];
        try {
            if (product.Keyword) {
                // Check if it's already an array
                if (Array.isArray(product.Keyword)) {
                    keywordArray = product.Keyword;
                } else {
                    keywordArray = JSON.parse(product.Keyword);
                }
            }
        } catch (e) {
            // If parsing fails, it might be a single string
            if (typeof product.Keyword === "string") {
                keywordArray = [product.Keyword];
            }
        }

        // Safely parse ImageURL field
        let imageURLArray = [];
        try {
            if (product.ImageURL) {
                imageURLArray = JSON.parse(product.ImageURL);
            }
        } catch (e) {
            // If parsing fails, it might be a single URL
            if (
                typeof product.ImageURL === "string" &&
                product.ImageURL.trim() !== ""
            ) {
                imageURLArray = [product.ImageURL];
            }
        }

        const parsedProduct = {
            ...productJSON,
            Keyword: keywordArray,
            ImageURL: imageURLArray,
            Store1: product.Store1 ? product.Store1.Name : null,
            Channel1: product.Channel1 ? product.Channel1.Name : null,
            Store2: product.Store2 ? product.Store2.Name : null,
            Channel2: product.Channel2 ? product.Channel2.Name : null,
            Store3: product.Store3 ? product.Store3.Name : null,
            Channel3: product.Channel3 ? product.Channel3.Name : null,
            Store4: product.Store4 ? product.Store4.Name : null,
            Channel4: product.Channel4 ? product.Channel4.Name : null,
            Store5: product.Store5 ? product.Store5.Name : null,
            Channel5: product.Channel5 ? product.Channel5.Name : null,
        };

        res.status(200).json({
            status: { code: 200, message: "Product retrieved successfully" },
            data: parsedProduct,
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
            VariantId_2,
            Content,
            UoM,
            Notes,
            Status,
            Length,
            Width,
            Height,
            Weight,
            Length_UoM,
            Width_UoM,
            Height_UoM,
            Weight_UoM,
            Keyword,
            StoreName_1,
            Channel_1,
            CodeNumber_1,
            StoreName_2,
            Channel_2,
            CodeNumber_2,
            StoreName_3,
            Channel_3,
            CodeNumber_3,
            StoreName_4,
            Channel_4,
            CodeNumber_4,
            StoreName_5,
            Channel_5,
            CodeNumber_5,
            deleteImages,
        } = req.body;

        const imagesToDelete = deleteImages ? JSON.parse(deleteImages) : [];

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

        // ✅ Handle multiple image uploads
        let currentImageUrls = existingProduct.ImageURL
            ? JSON.parse(existingProduct.ImageURL)
            : [];

        if (req.files && req.files.length > 0) {
            const newImageUrls = await uploadImagesToImageKit(req.files);
            currentImageUrls = [...currentImageUrls, ...newImageUrls];
        }

        // ✅ Remove images that the user wants to delete
        currentImageUrls = currentImageUrls.filter(
            (url) => !imagesToDelete.includes(url)
        );

        // ✅ Convert back to JSON string for storage
        const updatedImageURL = JSON.stringify(currentImageUrls);

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

        // ✅ Validate Channels
        const channelIds = [
            Channel_1,
            Channel_2,
            Channel_3,
            Channel_4,
            Channel_5,
        ].filter((id) => id !== undefined);

        const existingChannels = await db.Channel.findAll({
            where: { Code: channelIds },
            attributes: ["Code", "Name", "Initial", "Category"],
        });

        const channelMap = new Map(existingChannels.map((c) => [c.Code, c]));

        // ✅ Autofill Initial Channel & CategoryFromChannel
        const InitialChannel_1 = channelMap.get(Channel_1)?.Initial || null;
        const CategoryFromChannel_1 =
            channelMap.get(Channel_1)?.Category || null;

        const InitialChannel_2 = channelMap.get(Channel_2)?.Initial || null;
        const CategoryFromChannel_2 =
            channelMap.get(Channel_2)?.Category || null;

        const InitialChannel_3 = channelMap.get(Channel_3)?.Initial || null;
        const CategoryFromChannel_3 =
            channelMap.get(Channel_3)?.Category || null;

        const InitialChannel_4 = channelMap.get(Channel_4)?.Initial || null;
        const CategoryFromChannel_4 =
            channelMap.get(Channel_4)?.Category || null;

        const InitialChannel_5 = channelMap.get(Channel_5)?.Initial || null;
        const CategoryFromChannel_5 =
            channelMap.get(Channel_5)?.Category || null;

        // ✅ Generate SKU Code E-Commerce
        const SKUCodeEcommerce_1 =
            Name && Channel_1
                ? `${Name}_${
                      channelMap.get(Channel_1)?.Name
                  }_${InitialChannel_1}_${CategoryFromChannel_1}_SKU`
                : null;

        const SKUCodeEcommerce_2 =
            Name && Channel_2
                ? `${Name}_${
                      channelMap.get(Channel_2)?.Name
                  }_${InitialChannel_2}_${CategoryFromChannel_2}_SKU`
                : null;

        const SKUCodeEcommerce_3 =
            Name && Channel_3
                ? `${Name}_${
                      channelMap.get(Channel_3)?.Name
                  }_${InitialChannel_3}_${CategoryFromChannel_3}_SKU`
                : null;

        const SKUCodeEcommerce_4 =
            Name && Channel_4
                ? `${Name}_${
                      channelMap.get(Channel_4)?.Name
                  }_${InitialChannel_4}_${CategoryFromChannel_4}_SKU`
                : null;

        const SKUCodeEcommerce_5 =
            Name && Channel_5
                ? `${Name}_${
                      channelMap.get(Channel_5)?.Name
                  }_${InitialChannel_5}_${CategoryFromChannel_5}_SKU`
                : null;

        // Process Keyword field
        let formattedKeyword;
        if (Keyword !== undefined) {
            formattedKeyword =
                typeof Keyword === "string"
                    ? Keyword.split(",").map((item) => item.trim())
                    : Array.isArray(Keyword)
                    ? Keyword
                    : [];
        }

        // ✅ Proceed with update
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
            VariantId_2: VariantId_2 ?? existingProduct.VariantId_2,
            Content: Content ?? existingProduct.Content,
            UoM: UoM ?? existingProduct.UoM,
            Notes: Notes ?? existingProduct.Notes,
            ImageURL: updatedImageURL,
            Status: Status ?? existingProduct.Status,
            Length: Length ?? existingProduct.Length,
            Width: Width ?? existingProduct.Width,
            Height: Height ?? existingProduct.Height,
            Weight: Weight ?? existingProduct.Weight,
            Length_UoM: Length_UoM ?? existingProduct.Length_UoM,
            Width_UoM: Width_UoM ?? existingProduct.Width_UoM,
            Height_UoM: Height_UoM ?? existingProduct.Height_UoM,
            Weight_UoM: Weight_UoM ?? existingProduct.Weight_UoM,
            Keyword: formattedKeyword,
            StoreName_1: StoreName_1 ?? existingProduct.StoreName_1,
            Channel_1: Channel_1 ?? existingProduct.Channel_1,
            InitialChannel_1:
                InitialChannel_1 ?? existingProduct.InitialChannel_1,
            CategoryFromChannel_1:
                CategoryFromChannel_1 ?? existingProduct.CategoryFromChannel_1,
            CodeNumber_1: CodeNumber_1 ?? existingProduct.CodeNumber_1,
            SKUCodeEcommerce_1:
                SKUCodeEcommerce_1 ?? existingProduct.SKUCodeEcommerce_1,
            StoreName_2: StoreName_2 ?? existingProduct.StoreName_2,
            Channel_2: Channel_2 ?? existingProduct.Channel_2,
            InitialChannel_2:
                InitialChannel_2 ?? existingProduct.InitialChannel_2,
            CategoryFromChannel_2:
                CategoryFromChannel_2 ?? existingProduct.CategoryFromChannel_2,
            CodeNumber_2: CodeNumber_2 ?? existingProduct.CodeNumber_2,
            SKUCodeEcommerce_2:
                SKUCodeEcommerce_2 ?? existingProduct.SKUCodeEcommerce_2,
            StoreName_3: StoreName_3 ?? existingProduct.StoreName_3,
            Channel_3: Channel_3 ?? existingProduct.Channel_3,
            InitialChannel_3:
                InitialChannel_3 ?? existingProduct.InitialChannel_3,
            CategoryFromChannel_3:
                CategoryFromChannel_3 ?? existingProduct.CategoryFromChannel_3,
            CodeNumber_3: CodeNumber_3 ?? existingProduct.CodeNumber_3,
            SKUCodeEcommerce_3:
                SKUCodeEcommerce_3 ?? existingProduct.SKUCodeEcommerce_3,
            StoreName_4: StoreName_4 ?? existingProduct.StoreName_4,
            Channel_4: Channel_4 ?? existingProduct.Channel_4,
            InitialChannel_4:
                InitialChannel_4 ?? existingProduct.InitialChannel_4,
            CategoryFromChannel_4:
                CategoryFromChannel_4 ?? existingProduct.CategoryFromChannel_4,
            CodeNumber_4: CodeNumber_4 ?? existingProduct.CodeNumber_4,
            SKUCodeEcommerce_4:
                SKUCodeEcommerce_4 ?? existingProduct.SKUCodeEcommerce_4,
            StoreName_5: StoreName_5 ?? existingProduct.StoreName_5,
            Channel_5: Channel_5 ?? existingProduct.Channel_5,
            InitialChannel_5:
                InitialChannel_5 ?? existingProduct.InitialChannel_5,
            CategoryFromChannel_5:
                CategoryFromChannel_5 ?? existingProduct.CategoryFromChannel_5,
            CodeNumber_5: CodeNumber_5 ?? existingProduct.CodeNumber_5,
            SKUCodeEcommerce_5:
                SKUCodeEcommerce_5 ?? existingProduct.SKUCodeEcommerce_5,
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
