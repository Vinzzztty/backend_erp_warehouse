module.exports = (sequelize, DataTypes) => {
    const GoodReceiving = sequelize.define(
        "GoodReceiving",
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
            tableName: "GoodReceiving",
        }
    );

    GoodReceiving.associate = (models) => {
        GoodReceiving.belongsTo(models.Forwarder, {
            foreignKey: "ForwarderId",
            as: "Forwarder",
        });
        GoodReceiving.belongsTo(models.LastMile, {
            foreignKey: "LMCode",
            as: "LastMile",
        });
        GoodReceiving.belongsTo(models.Warehouse, {
            foreignKey: "WarehouseId",
            as: "Warehouse",
        });
    };

    return GoodReceiving;
};
