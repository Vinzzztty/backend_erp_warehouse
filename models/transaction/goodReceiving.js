module.exports = (sequelize, DataTypes) => {
    const TransaksiGoodsReceiving = sequelize.define(
        "TransaksiGoodsReceiving",
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
                    model: "TransaksiLastMile",
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
            tableName: "TransaksiGoodsReceiving",
        }
    );

    TransaksiGoodsReceiving.associate = (models) => {
        TransaksiGoodsReceiving.belongsTo(models.Forwarder, {
            foreignKey: "ForwarderId",
            as: "Forwarder",
        });
        TransaksiGoodsReceiving.belongsTo(models.TransaksiLastMile, {
            foreignKey: "LMCode",
            as: "LastMile",
        });
        TransaksiGoodsReceiving.belongsTo(models.Warehouse, {
            foreignKey: "WarehouseId",
            as: "Warehouse",
        });
    };

    return TransaksiGoodsReceiving;
};
