module.exports = (sequelize, DataTypes) => {
    const Currency = sequelize.define(
        "Currency",
        {
            Code: {
                type: DataTypes.STRING(10), // Free text input for code
                primaryKey: true,
                allowNull: false,
            },
            Name: {
                type: DataTypes.STRING(100), // Free text input for name
                allowNull: false,
            },
            Notes: {
                type: DataTypes.TEXT, // Free text input (textarea)
                allowNull: true,
            },
            Status: {
                type: DataTypes.ENUM("Active", "Non-Active"), // Dropdown for Active/Non-active
                allowNull: false,
                defaultValue: "Active", // Default value for new entries
            },
        },
        {
            timestamps: true, // Automatically adds createdAt and updatedAt fields
            tableName: "Currency", // Explicit table name
        }
    );

    return Currency;
};
