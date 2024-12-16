module.exports = (sequelize, DataTypes) => {
    const BuyingPrice = sequelize.define(
        "BuyingPrice",
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
            tableName: "BuyingPrice",
        }
    );

    BuyingPrice.associate = (models) => {
        BuyingPrice.belongsTo(models.Warehouse, {
            foreignKey: "WarehouseId",
            as: "Warehouse",
        });
    };

    return BuyingPrice;
};
