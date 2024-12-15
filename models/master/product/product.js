module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define(
        "Product",
        {
            Code: {
                type: DataTypes.STRING(10),
                primaryKey: true,
                autoIncrement: true, // Autogenerate and increment code
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
            SKUFull: {
                type: DataTypes.STRING(255), // Autofill after save, read-only
                allowNull: true,
            },
            SKUParent: {
                type: DataTypes.STRING(255), // Autofill after save, read-only
                allowNull: true,
            },
            SKUCode: {
                type: DataTypes.STRING(255), // Autofill after save, read-only
                allowNull: true,
            },
            SKUCodeChild: {
                type: DataTypes.STRING(255), // Autofill after save, read-only
                allowNull: true,
            },
            CompanyCode: {
                type: DataTypes.INTEGER, // Foreign key from m.company
                allowNull: false,
            },
            CategoryCode: {
                type: DataTypes.INTEGER, // Foreign key from m.category
                allowNull: false,
            },
            VariantId: {
                type: DataTypes.INTEGER, // Foreign key from m.variant
                allowNull: true,
            },
            Content: {
                type: DataTypes.STRING(255), // Free text input
                allowNull: true,
            },
            UoM: {
                type: DataTypes.INTEGER, // Foreign key from m.uom
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
                type: DataTypes.STRING(255), // Browse from m.store
                allowNull: true,
            },
            Channel: {
                type: DataTypes.INTEGER, // Foreign key from m.channel
                allowNull: true,
            },
            InitialChannel: {
                type: DataTypes.STRING(100), // Autofill from channel
                allowNull: true,
            },
            CategoryFromChannel: {
                type: DataTypes.STRING(100), // Autofill from channel
                allowNull: true,
            },
            CodeNumber: {
                type: DataTypes.INTEGER, // Integer input
                allowNull: true,
            },
            SKUCodeEcommerce: {
                type: DataTypes.STRING(255), // Autogenerate
                allowNull: true,
            },
        },
        {
            timestamps: true,
            tableName: "Product", // Explicit table name
        }
    );

    // Hooks for autofill fields
    Product.addHook("afterCreate", async (product) => {
        product.SKUFull = `${product.Name}_${product.CategoryCode}_${product.CodeName}`;
        product.SKUParent = `${product.Name}_PARENT`;
        product.SKUCode = `${product.Name}_CODE`;
        product.SKUCodeChild = `${product.Name}_CHILD`;
        product.SKUCodeEcommerce = `${product.Name}_${product.Channel}_${product.InitialChannel}_${product.CategoryFromChannel}_SKU`;

        // Save the updated product
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
