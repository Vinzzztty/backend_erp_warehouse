module.exports = (sequelize, DataTypes) => {
    const Cost = sequelize.define(
        "Cost",
        {
            Code: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true, // Autogenerate and increment code
                allowNull: false,
            },
            Name: {
                type: DataTypes.STRING(255), // Free text input
                allowNull: false,
            },
            Percentage: {
                type: DataTypes.FLOAT(5, 2), // Float with up to 2 decimal places
                allowNull: false,
            },
            Note: {
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
            tableName: "Cost", // Explicit table name
        }
    );

    return Cost;
};
