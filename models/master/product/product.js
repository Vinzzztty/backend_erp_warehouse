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
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            CodeName: {
                type: DataTypes.STRING(100),
                allowNull: true,
                set(value) {
                    this.setDataValue("CodeName", value.toUpperCase());
                },
            },
            SKUFull: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            SKUParent: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            SKUCode: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            SKUCodeChild: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            CompanyCode: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            CategoryCode: {
                type: DataTypes.INTEGER,
                references: {
                    model: "Category",
                    key: "Code",
                },
                allowNull: false,
            },
            VariantId: {
                type: DataTypes.INTEGER,
                references: {
                    model: "Variant",
                    key: "Code",
                },
                allowNull: true,
            },
            UoM: {
                type: DataTypes.STRING(10), // Match UoM.Code
                references: {
                    model: "UoM",
                    key: "Code",
                },
                allowNull: true,
            },
            Notes: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            Status: {
                type: DataTypes.ENUM("Active", "Non-Active"),
                allowNull: false,
                defaultValue: "Active",
            },
            Length: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            Width: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            Height: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            Weight: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            Parameter: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            Keyword: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            StoreName: {
                type: DataTypes.INTEGER, // Match Store.Code as integer
                references: {
                    model: "Store", // Reference the Store table
                    key: "Code",
                },
                allowNull: true,
            },

            Channel: {
                type: DataTypes.INTEGER,
                references: {
                    model: "Channel",
                    key: "Code",
                },
                allowNull: true,
            },
            InitialChannel: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            CategoryFromChannel: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            CodeNumber: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            SKUCodeEcommerce: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
        },
        {
            timestamps: true,
            tableName: "Product",
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
