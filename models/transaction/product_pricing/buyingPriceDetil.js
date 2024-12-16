module.exports = (sequelize, DataTypes) => {
    const BuyingPriceDetails = sequelize.define(
        "BuyingPriceDetails",
        {
            Id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            BuyingPriceId: {
                type: DataTypes.INTEGER, // Foreign key to BuyingPrice
                references: {
                    model: "BuyingPrice",
                    key: "Code",
                },
                allowNull: false,
            },
            PICode: {
                type: DataTypes.INTEGER, // Browse from approved PI in GR
                references: {
                    model: "ProformaInvoice",
                    key: "Code",
                },
                allowNull: false,
            },
            SKUFull: {
                type: DataTypes.STRING(255), // Browse from PI
                allowNull: false,
            },
            SKUParent: {
                type: DataTypes.STRING(255), // Autofill from PI
                allowNull: true,
            },
            SKUCode: {
                type: DataTypes.STRING(255), // Autofill from PI
                allowNull: true,
            },
            SKUCodeChild: {
                type: DataTypes.STRING(255), // Autofill from PI
                allowNull: true,
            },
            Name: {
                type: DataTypes.STRING(255), // Autofill from PI
                allowNull: true,
            },
            ProdCost: {
                type: DataTypes.DECIMAL(10, 2), // Editable, autofill from PI
                allowNull: true,
            },
            FirstMileCost: {
                type: DataTypes.DECIMAL(10, 2), // Editable, autofill from PI
                allowNull: true,
            },
            LastMileCost: {
                type: DataTypes.DECIMAL(10, 2), // Editable, autofill from PI
                allowNull: true,
            },
            DDPCost: {
                type: DataTypes.DECIMAL(10, 2), // Auto-calculated (ProdCost + FirstMileCost + LastMileCost)
                allowNull: true,
            },
            Biaya: {
                type: DataTypes.INTEGER, // Foreign key to M.Cost
                references: {
                    model: "Cost",
                    key: "Code",
                },
                allowNull: true,
            },
            TrueCost: {
                type: DataTypes.DECIMAL(10, 2), // Auto-calculated (DDPCost + Biaya)
                allowNull: true,
            },
            TrueCostEach: {
                type: DataTypes.DECIMAL(10, 2), // Auto-calculated (TrueCost / Actual goods received)
                allowNull: true,
            },
            DDPCostEach: {
                type: DataTypes.DECIMAL(10, 2), // Auto-calculated (DDPCost / Actual goods received)
                allowNull: true,
            },
            SellingPrice: {
                type: DataTypes.DECIMAL(10, 2), // Input manually
                allowNull: true,
            },
        },
        {
            timestamps: true,
            tableName: "BuyingPriceDetails",
        }
    );

    // Hooks for auto-calculations
    BuyingPriceDetails.addHook("beforeSave", (details) => {
        // Auto-calculate DDPCost
        details.DDPCost = (
            parseFloat(details.ProdCost || 0) +
            parseFloat(details.FirstMileCost || 0) +
            parseFloat(details.LastMileCost || 0)
        ).toFixed(2);

        // Auto-calculate TrueCost
        if (details.DDPCost && details.Biaya) {
            details.TrueCost = (
                parseFloat(details.DDPCost) + parseFloat(details.Biaya || 0)
            ).toFixed(2);
        }

        // Auto-calculate TrueCostEach
        if (details.TrueCost && details.OrderedQty) {
            details.TrueCostEach = (
                parseFloat(details.TrueCost) / parseFloat(details.OrderedQty)
            ).toFixed(2);
        }

        // Auto-calculate DDPCostEach
        if (details.DDPCost && details.OrderedQty) {
            details.DDPCostEach = (
                parseFloat(details.DDPCost) / parseFloat(details.OrderedQty)
            ).toFixed(2);
        }
    });

    BuyingPriceDetails.associate = (models) => {
        BuyingPriceDetails.belongsTo(models.BuyingPrice, {
            foreignKey: "BuyingPriceId",
            as: "BuyingPrice",
        });
        BuyingPriceDetails.belongsTo(models.ProformaInvoice, {
            foreignKey: "PICode",
            as: "ProformaInvoice",
        });
        BuyingPriceDetails.belongsTo(models.Cost, {
            foreignKey: "Biaya",
            as: "Cost",
        });
    };

    return BuyingPriceDetails;
};
