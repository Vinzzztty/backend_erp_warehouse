module.exports = (sequelize, DataTypes) => {
    const GoodsReceiptDetil = sequelize.define(
        "GoodsReceiptDetil",
        {
            Id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            GoodsReceiptId: {
                type: DataTypes.INTEGER, // Foreign key to GoodsReceiving
                references: {
                    model: "GoodsReceipt",
                    key: "Code",
                },
                allowNull: false,
            },
            CXCode: {
                type: DataTypes.INTEGER, // Autofill from LM Code
                allowNull: false,
            },
            PICode: {
                type: DataTypes.INTEGER, // Autofill from LM Code
                allowNull: false,
            },
            SKUCode: {
                type: DataTypes.STRING(255), // Autofill from LM Code
                allowNull: false,
            },
            ProductName: {
                type: DataTypes.STRING(255), // Autofill from LM Code
                allowNull: false,
            },
            LastMileTracking: {
                type: DataTypes.STRING(255), // Autofill from LM Code
                allowNull: true,
            },
            FreightCode: {
                type: DataTypes.STRING(255), // Autofill from CX Code
                allowNull: true,
            },
            OrderedQty: {
                type: DataTypes.DECIMAL(10, 2), // Autofill from CX Code
                allowNull: true,
            },
            ReceivedQty: {
                type: DataTypes.DECIMAL(10, 2), // Editable
                allowNull: true,
            },
            RemainQty: {
                type: DataTypes.DECIMAL(10, 2), // Auto-calculated
                allowNull: true,
            },
            Condition: {
                type: DataTypes.STRING(255), // Free text
                allowNull: true,
            },
            Notes: {
                type: DataTypes.STRING(255), // Free text
                allowNull: true,
            },
        },
        {
            timestamps: true,
            tableName: "GoodsReceiptDetil",
        }
    );

    // Hooks for auto-calculations
    GoodsReceiptDetil.addHook("beforeSave", (details) => {
        // Auto-calculate RemainQty
        if (details.OrderedQty && details.ReceivedQty) {
            details.RemainQty = (
                details.OrderedQty - details.ReceivedQty
            ).toFixed(2);
        }
    });

    GoodsReceiptDetil.associate = (models) => {
        GoodsReceiptDetil.belongsTo(models.GoodsReceipt, {
            foreignKey: "GoodsReceiptId",
            as: "GoodsReceipt",
        });
    };

    return GoodsReceiptDetil;
};
