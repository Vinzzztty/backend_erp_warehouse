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
            Name: {
                type: DataTypes.STRING(100), // Free text input
                allowNull: false,
            },
            CodeName: {
                type: DataTypes.STRING(100), // Free text input, auto uppercase
                allowNull: true,
                set(value) {
                    this.setDataValue("CodeName", value.toUpperCase());
                },
            },
            SKUCode: {
                type: DataTypes.STRING(255), // Ensure the data type matches the reference
                unique: true, // Add a unique constraint
                allowNull: true,
            },
            SKUFull: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            SKUParent: {
                type: DataTypes.STRING(255),
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

            Status: {
                type: DataTypes.ENUM("Active", "Non-Active"), // Dropdown for Active/Non-active
                allowNull: false,
                defaultValue: "Active", // Default value
            },
            Length: {
                type: DataTypes.INTEGER, // Read-only detail
                allowNull: true,
            },
            Width: {
                type: DataTypes.INTEGER, // Read-only detail
                allowNull: true,
            },
            Height: {
                type: DataTypes.INTEGER, // Read-only detail
                allowNull: true,
            },
            Weight: {
                type: DataTypes.INTEGER, // Read-only detail
                allowNull: true,
            },
            Parameter: {
                type: DataTypes.INTEGER, // Integer input
                allowNull: true,
            },
            Keyword: {
                type: DataTypes.STRING(255), // Free text input
                allowNull: true,
            },
            StoreName: {
                type: DataTypes.INTEGER, // Foreign key from m.store
                references: {
                    model: "Store",
                    key: "Code",
                },
                allowNull: true,
            },
            Channel: {
                type: DataTypes.INTEGER, // Foreign key from m.channel
                references: {
                    model: "Channel",
                    key: "Code",
                },
                allowNull: true,
            },
            InitialChannel: {
                type: DataTypes.STRING(100), // Autofill from Channel
                allowNull: true,
            },
            CategoryFromChannel: {
                type: DataTypes.STRING(100), // Autofill from Channel
                allowNull: true,
            },
            CodeNumber: {
                type: DataTypes.INTEGER, // Integer input
                allowNull: true,
            },
            SKUCodeEcommerce: {
                type: DataTypes.STRING(255), // Autogenerate based on formula
                allowNull: true,
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
    Product.addHook("afterCreate", async (product) => {
        product.SKUFull = `${product.Name}_${product.CategoryCode}_${product.CodeName}`;
        product.SKUParent = `${product.Name}_PARENT`;
        product.SKUCode = `${product.Name}_CODE`;
        product.SKUCodeChild = `${product.Name}_CHILD`;
        product.SKUCodeEcommerce = `${product.Name}_${product.Channel}_${product.InitialChannel}_${product.CategoryFromChannel}_SKU`;

        await product.save();
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
