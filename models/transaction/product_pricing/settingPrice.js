module.exports = (sequelize, DataTypes) => {
    const SettingPrice = sequelize.define(
        "SettingPrice",
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
            BPCode: {
                type: DataTypes.INTEGER, // Browse from approved BP (Buying Price)
                references: {
                    model: "BuyingPrice",
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
            tableName: "SettingPrice",
        }
    );

    SettingPrice.associate = (models) => {
        SettingPrice.belongsTo(models.BuyingPrice, {
            foreignKey: "BPCode",
            as: "BuyingPrice",
        });
    };

    return SettingPrice;
};
