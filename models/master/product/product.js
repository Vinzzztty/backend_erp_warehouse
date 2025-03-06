module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define(
        "Product",
        {
            Code: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true, // Enables auto_increment
                allowNull: false,
            },

            // SKUU
            SKUFull: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            SKUParent: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            SKUCode: {
                type: DataTypes.STRING(255), // Ensure the data type matches the reference
                unique: true, // Add a unique constraint
                allowNull: true,
            },
            SKUCodeChild: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },

            CompanyCode: {
                type: DataTypes.INTEGER, // Foreign key from m.company
                allowNull: false,
            },
            CategoryCode: {
                type: DataTypes.INTEGER, // Foreign key from m.category
                references: {
                    model: "Category",
                    key: "Code",
                },
                allowNull: false,
            },
            VariantId: {
                type: DataTypes.INTEGER, // Foreign key from m.variant
                references: {
                    model: "Variant",
                    key: "Code",
                },
                allowNull: true,
            },

            SKUCodeCategory: {
                type: DataTypes.INTEGER, // Autofilled from M.Category
                references: {
                    model: "Category", // Table name
                    key: "Code",
                },
                allowNull: false,
            },
            Name: {
                type: DataTypes.STRING(100), // Free text input
                allowNull: false,
            },
            CodeName: {
                type: DataTypes.STRING(100), // Free text input, auto uppercase
                allowNull: true,
                set(value) {
                    this.setDataValue(
                        "CodeName",
                        value ? value.toUpperCase() : null
                    );
                },
            },
            VariantId_2: {
                type: DataTypes.INTEGER, // Foreign key from m.variant
                references: {
                    model: "Variant",
                    key: "Code",
                },
                allowNull: true,
            },

            Content: {
                type: DataTypes.TEXT, // Free text input
                allowNull: true,
            },
            UoM: {
                type: DataTypes.STRING(10), // Foreign key from m.uom
                references: {
                    model: "UoM",
                    key: "Code",
                },
                allowNull: true,
            },
            Notes: {
                type: DataTypes.TEXT, // Free text input (textarea)
                allowNull: true,
            },

            Status: {
                type: DataTypes.ENUM("Active", "Non-Active"), // Dropdown for Active/Non-active
                allowNull: false,
                defaultValue: "Active", // Default value
            },

            // Detail Product

            Weight: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true,
            },
            Length: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true,
            },
            Width: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true,
            },
            Height: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true,
            },

            Length_UoM: {
                type: DataTypes.STRING(10), // Foreign key from m.uom
                references: {
                    model: "UoM",
                    key: "Code",
                },
                allowNull: true,
            },
            Width_UoM: {
                type: DataTypes.STRING(10), // Foreign key from m.uom
                references: {
                    model: "UoM",
                    key: "Code",
                },
                allowNull: true,
            },
            Height_UoM: {
                type: DataTypes.STRING(10), // Foreign key from m.uom
                references: {
                    model: "UoM",
                    key: "Code",
                },
                allowNull: true,
            },
            Weight_UoM: {
                type: DataTypes.STRING(10), // Foreign key from m.uom
                references: {
                    model: "UoM",
                    key: "Code",
                },
                allowNull: true,
            },

            Keyword: {
                type: DataTypes.TEXT, // Store JSON array of keywords
                allowNull: true,
                get() {
                    return JSON.parse(this.getDataValue("Keyword") || "[]");
                },
                set(value) {
                    this.setDataValue("Keyword", JSON.stringify(value));
                },
            },

            // SKU E-Commerce List
            StoreName: {
                type: DataTypes.TEXT, // Store multiple store names as JSON
                allowNull: true,
                get() {
                    return JSON.parse(this.getDataValue("StoreName") || "[]");
                },
                set(value) {
                    this.setDataValue("StoreName", JSON.stringify(value));
                },
            },
            Channel: {
                type: DataTypes.TEXT, // Store multiple channels as JSON
                allowNull: true,
                get() {
                    return JSON.parse(this.getDataValue("Channel") || "[]");
                },
                set(value) {
                    this.setDataValue("Channel", JSON.stringify(value));
                },
            },
            InitialChannel: {
                type: DataTypes.TEXT, // Store as JSON
                allowNull: true,
                get() {
                    return JSON.parse(
                        this.getDataValue("InitialChannel") || "[]"
                    );
                },
                set(value) {
                    this.setDataValue("InitialChannel", JSON.stringify(value));
                },
            },
            CategoryFromChannel: {
                type: DataTypes.TEXT, // Store as JSON
                allowNull: true,
                get() {
                    return JSON.parse(
                        this.getDataValue("CategoryFromChannel") || "[]"
                    );
                },
                set(value) {
                    this.setDataValue(
                        "CategoryFromChannel",
                        JSON.stringify(value)
                    );
                },
            },
            CodeNumber: {
                type: DataTypes.TEXT, // Store multiple code numbers as JSON
                allowNull: true,
                get() {
                    return JSON.parse(
                        this.getDataValue("CodeNumber") || "[]"
                    ).map(Number);
                },
                set(value) {
                    this.setDataValue(
                        "CodeNumber",
                        JSON.stringify(value.map(Number))
                    );
                },
            },
            SKUCodeEcommerce: {
                type: DataTypes.TEXT, // Store multiple SKU codes as JSON
                allowNull: true,
                get() {
                    return JSON.parse(
                        this.getDataValue("SKUCodeEcommerce") || "[]"
                    );
                },
                set(value) {
                    this.setDataValue(
                        "SKUCodeEcommerce",
                        JSON.stringify(value)
                    );
                },
            },

            ImageURL: {
                type: DataTypes.TEXT, // Store multiple ImageKit URLs as a JSON string
                allowNull: true,
                defaultValue: "[]", // Store as an empty JSON array string
                validate: {
                    isValidImageArray(value) {
                        try {
                            const parsedValue = JSON.parse(value); // Ensure it's a valid JSON array
                            if (!Array.isArray(parsedValue)) {
                                throw new Error(
                                    "ImageURL must be a valid JSON array."
                                );
                            }
                            if (parsedValue.length > 8) {
                                throw new Error(
                                    "You can upload a maximum of 8 images."
                                );
                            }
                            parsedValue.forEach((url) => {
                                if (
                                    typeof url !== "string" ||
                                    !url.startsWith("https://ik.imagekit.io")
                                ) {
                                    throw new Error(
                                        "Each image must be a valid ImageKit URL."
                                    );
                                }
                            });
                        } catch (error) {
                            throw new Error(
                                "ImageURL must be a valid JSON array stored as a string."
                            );
                        }
                    },
                },
            },
        },
        {
            timestamps: true,
            tableName: "Product",
            indexes: [
                {
                    unique: true, // Ensure this creates a unique index
                    fields: ["SKUCode"],
                },
            ],
        }
    );

    // Hooks for autofill fields
    Product.addHook("beforeCreate", (product) => {
        product.SKUFull = `${product.Name}_${product.CategoryCode}_${product.CodeName}`;
        product.SKUParent = `${product.Name}_PARENT`;
        product.SKUCode = `${product.Name}_CODE`;
        product.SKUCodeChild = `${product.Name}_CHILD`;
        product.SKUCodeEcommerce = `${product.Name}_${product.Channel}_${product.InitialChannel}_${product.CategoryFromChannel}_SKU`;
    });

    // Define associations
    Product.associate = (models) => {
        Product.belongsTo(models.Company, {
            foreignKey: "CompanyCode",
            as: "Company",
        });

        Product.belongsTo(models.Category, {
            foreignKey: "CategoryCode",
            as: "Category",
        });

        Product.belongsTo(models.Variant, {
            foreignKey: "VariantId",
            as: "Variant",
        });

        Product.belongsTo(models.UoM, {
            foreignKey: "UoM",
            as: "UnitOfMeasure",
        });

        Product.belongsTo(models.Store, {
            foreignKey: "StoreName",
            as: "Store",
        });

        Product.belongsTo(models.Channel, {
            foreignKey: "Channel",
            as: "ChannelInfo",
        });
    };

    return Product;
};
