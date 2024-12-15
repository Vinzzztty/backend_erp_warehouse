module.exports = (sequelize, DataTypes) => {
    const Store = sequelize.define(
        "Store",
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
            Notes: {
                type: DataTypes.TEXT, // Free text input (textarea)
                allowNull: true,
            },
            Status: {
                type: DataTypes.ENUM("Active", "Non-Active"), // Dropdown for Active/Non-Active
                allowNull: false,
                defaultValue: "Active", // Default status for new entries
            },
        },
        {
            timestamps: true, // Automatically adds createdAt and updatedAt fields
            tableName: "Store", // Explicit table name
        }
    );

    return Store;
};
