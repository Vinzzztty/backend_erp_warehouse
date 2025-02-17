module.exports = (sequelize, DataTypes) => {
    const PPNSetting = sequelize.define(
        "PPNSetting",
        {
            Name: {
                type: DataTypes.STRING(100), // Free text input
                allowNull: false,
            },
            Rate: {
                type: DataTypes.DECIMAL(5, 2), // Decimal with up to 2 decimal places
                allowNull: false,
            },
            Status: {
                type: DataTypes.ENUM("Active", "Non-Active"), // Dropdown for Active/Non-active
                allowNull: false,
                defaultValue: "Active", // Default value for new entries
            },
        },
        {
            timestamps: true, // Automatically adds createdAt and updatedAt fields
            tableName: "PPNSetting", // Explicit table name
        }
    );

    return PPNSetting;
};
