module.exports = (sequelize, DataTypes) => {
    const GoodsReceipt = sequelize.define(
        "GoodsReceipt",
        {
            Code: {
                type: DataTypes.INTEGER, // Autogenerate, counting
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            Date: {
                type: DataTypes.DATEONLY, // Date picker/Calendar
                allowNull: false,
            },
            ForwarderId: {
                type: DataTypes.INTEGER, // Foreign key to M.Forwarder
                references: {
                    model: "Forwarder",
                    key: "Code",
                },
                allowNull: false,
            },
            LMCode: {
                type: DataTypes.INTEGER, // Foreign key to T.LMilePay (Paid status)
                references: {
                    model: "LastMile",
                    key: "Code",
                },
                allowNull: false,
            },
            WarehouseId: {
                type: DataTypes.INTEGER, // Foreign key to M.Warehouse
                references: {
                    model: "Warehouse",
                    key: "Code",
                },
                allowNull: false,
            },
            Note: {
                type: DataTypes.TEXT, // Free text
                allowNull: true,
            },
        },
        {
            timestamps: true,
            tableName: "GoodsReceipt",
        }
    );

    GoodsReceipt.associate = (models) => {
        GoodsReceipt.belongsTo(models.Forwarder, {
            foreignKey: "ForwarderId",
            as: "Forwarder",
        });
        GoodsReceipt.belongsTo(models.LastMile, {
            foreignKey: "LMCode",
            as: "LastMile",
        });
        GoodsReceipt.belongsTo(models.Warehouse, {
            foreignKey: "WarehouseId",
            as: "Warehouse",
        });
    };

    return GoodsReceipt;
};
