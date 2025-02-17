module.exports = (sequelize, DataTypes) => {
    const PPNSetting = sequelize.define(
        "PPNSetting",
        {
            Code: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            Name: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            Rate: {
                type: DataTypes.DECIMAL(5, 2),
                allowNull: false,
            },
            Status: {
                type: DataTypes.ENUM("Active", "Non-Active"),
                allowNull: false,
                defaultValue: "Active",
            },
        },
        {
            timestamps: true,
            tableName: "PPNSetting",
        }
    );

    return PPNSetting;
};
