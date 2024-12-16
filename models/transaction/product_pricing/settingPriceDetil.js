module.exports = (sequelize, DataTypes) => {
    const SettingPriceDetails = sequelize.define(
        "SettingPriceDetails",
        {
            Id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            SettingPriceId: {
                type: DataTypes.INTEGER, // Foreign key to SettingPrice
                references: {
                    model: "SettingPrice",
                    key: "Code",
                },
                allowNull: false,
            },
            SKUFull: {
                type: DataTypes.STRING(255), // Autofill from BP Code
                allowNull: false,
            },
            SKUParent: {
                type: DataTypes.STRING(255), // Autofill from BP Code
                allowNull: true,
            },
            SKUCode: {
                type: DataTypes.STRING(255), // Autofill from BP Code
                allowNull: true,
            },
            SKUCodeChild: {
                type: DataTypes.STRING(255), // Autofill from BP Code
                allowNull: true,
            },
            ProductName: {
                type: DataTypes.STRING(255), // Autofill from BP Code
                allowNull: true,
            },
            SellingPrice: {
                type: DataTypes.DECIMAL(10, 2), // Autofill from BP Code
                allowNull: true,
            },
            NormalPrice: {
                type: DataTypes.INTEGER, // Manual input
                allowNull: true,
            },
            StrikethroughPrice: {
                type: DataTypes.INTEGER, // Manual input
                allowNull: true,
            },
            CampaignPrice: {
                type: DataTypes.INTEGER, // Manual input
                allowNull: true,
            },
            BottomPrice: {
                type: DataTypes.INTEGER, // Manual input
                allowNull: true,
            },
            Platform1: {
                type: DataTypes.STRING(255), // Autofill from M.Product SKU number
                allowNull: true,
            },
            Platform2: {
                type: DataTypes.STRING(255), // Autofill from M.Product SKU number
                allowNull: true,
            },
            Platform3: {
                type: DataTypes.STRING(255), // Autofill from M.Product SKU number
                allowNull: true,
            },
            Platform4: {
                type: DataTypes.STRING(255), // Autofill from M.Product SKU number
                allowNull: true,
            },
        },
        {
            timestamps: true,
            tableName: "SettingPriceDetails",
        }
    );

    SettingPriceDetails.addHook("beforeSave", async (details) => {
        // Fetch SKU numbers from M.Product if Platform fields are not filled
        const product = await sequelize.models.Product.findOne({
            where: { SKUCode: details.SKUCode },
        });

        if (product) {
            details.Platform1 = product.Platform1 || details.Platform1;
            details.Platform2 = product.Platform2 || details.Platform2;
            details.Platform3 = product.Platform3 || details.Platform3;
            details.Platform4 = product.Platform4 || details.Platform4;
        }
    });

    SettingPriceDetails.associate = (models) => {
        SettingPriceDetails.belongsTo(models.SettingPrice, {
            foreignKey: "SettingPriceId",
            as: "SettingPrice",
        });
        SettingPriceDetails.belongsTo(models.Product, {
            foreignKey: "SKUCode",
            as: "Product",
        });
    };

    return SettingPriceDetails;
};
