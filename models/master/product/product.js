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
                type: DataTypes.TEXT,
                allowNull: true,
                get() {
                    const value = this.getDataValue("Keyword");
                    try {
                        return value ? JSON.parse(value) : [];
                    } catch (error) {
                        console.error("Invalid JSON in Keyword:", value);
                        return []; // ✅ Return an empty array instead of crashing
                    }
                },
                set(value) {
                    this.setDataValue(
                        "Keyword",
                        JSON.stringify(Array.isArray(value) ? value : [])
                    );
                },
            },

            // SKU E-Commerce List

            // Store 1
            StoreName_1: {
                type: DataTypes.INTEGER,
                references: { model: "Store", key: "Code" },
                allowNull: true,
            },
            Channel_1: {
                type: DataTypes.INTEGER,
                references: { model: "Channel", key: "Code" },
                allowNull: true,
            },
            InitialChannel_1: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            CategoryFromChannel_1: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            CodeNumber_1: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            SKUCodeEcommerce_1: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },

            // Store 2
            StoreName_2: {
                type: DataTypes.INTEGER,
                references: { model: "Store", key: "Code" },
                allowNull: true,
            },
            Channel_2: {
                type: DataTypes.INTEGER,
                references: { model: "Channel", key: "Code" },
                allowNull: true,
            },
            InitialChannel_2: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            CategoryFromChannel_2: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            CodeNumber_2: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            SKUCodeEcommerce_2: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },

            // Store 3
            StoreName_3: {
                type: DataTypes.INTEGER,
                references: { model: "Store", key: "Code" },
                allowNull: true,
            },
            Channel_3: {
                type: DataTypes.INTEGER,
                references: { model: "Channel", key: "Code" },
                allowNull: true,
            },
            InitialChannel_3: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            CategoryFromChannel_3: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            CodeNumber_3: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            SKUCodeEcommerce_3: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },

            // Store 4
            StoreName_4: {
                type: DataTypes.INTEGER,
                references: { model: "Store", key: "Code" },
                allowNull: true,
            },
            Channel_4: {
                type: DataTypes.INTEGER,
                references: { model: "Channel", key: "Code" },
                allowNull: true,
            },
            InitialChannel_4: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            CategoryFromChannel_4: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            CodeNumber_4: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            SKUCodeEcommerce_4: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },

            // Store 5
            StoreName_5: {
                type: DataTypes.INTEGER,
                references: { model: "Store", key: "Code" },
                allowNull: true,
            },
            Channel_5: {
                type: DataTypes.INTEGER,
                references: { model: "Channel", key: "Code" },
                allowNull: true,
            },
            InitialChannel_5: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            CategoryFromChannel_5: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            CodeNumber_5: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            SKUCodeEcommerce_5: {
                type: DataTypes.STRING(255),
                allowNull: true,
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
        // Auto-generate SKUCodeEcommerce for each store-channel combination
        if (product.Name) {
            product.SKUCodeEcommerce_1 = product.Channel_1
                ? `${product.Name}_${product.Channel_1}_${product.InitialChannel_1}_${product.CategoryFromChannel_1}_SKU`
                : null;
            product.SKUCodeEcommerce_2 = product.Channel_2
                ? `${product.Name}_${product.Channel_2}_${product.InitialChannel_2}_${product.CategoryFromChannel_2}_SKU`
                : null;
            product.SKUCodeEcommerce_3 = product.Channel_3
                ? `${product.Name}_${product.Channel_3}_${product.InitialChannel_3}_${product.CategoryFromChannel_3}_SKU`
                : null;
            product.SKUCodeEcommerce_4 = product.Channel_4
                ? `${product.Name}_${product.Channel_4}_${product.InitialChannel_4}_${product.CategoryFromChannel_4}_SKU`
                : null;
            product.SKUCodeEcommerce_5 = product.Channel_5
                ? `${product.Name}_${product.Channel_5}_${product.InitialChannel_5}_${product.CategoryFromChannel_5}_SKU`
                : null;
        }
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

        Product.belongsTo(models.Variant, {
            foreignKey: "VariantId",
            as: "Variant_2",
        });

        Product.belongsTo(models.UoM, {
            foreignKey: "UoM",
            as: "UnitOfMeasure",
        });

        // Associate Store & Channel for each manual SKU entry
        Product.belongsTo(models.Store, {
            foreignKey: "StoreName_1",
            as: "Store1",
        });
        Product.belongsTo(models.Channel, {
            foreignKey: "Channel_1",
            as: "Channel1",
        });

        Product.belongsTo(models.Store, {
            foreignKey: "StoreName_2",
            as: "Store2",
        });
        Product.belongsTo(models.Channel, {
            foreignKey: "Channel_2",
            as: "Channel2",
        });

        Product.belongsTo(models.Store, {
            foreignKey: "StoreName_3",
            as: "Store3",
        });
        Product.belongsTo(models.Channel, {
            foreignKey: "Channel_3",
            as: "Channel3",
        });

        Product.belongsTo(models.Store, {
            foreignKey: "StoreName_4",
            as: "Store4",
        });
        Product.belongsTo(models.Channel, {
            foreignKey: "Channel_4",
            as: "Channel4",
        });

        Product.belongsTo(models.Store, {
            foreignKey: "StoreName_5",
            as: "Store5",
        });
        Product.belongsTo(models.Channel, {
            foreignKey: "Channel_5",
            as: "Channel5",
        });
    };

    return Product;
};
