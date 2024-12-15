module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define(
        "Category",
        {
            Code: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true, // Autogenerate and increment code
                allowNull: false,
            },
            Name: {
                type: DataTypes.STRING(100), // Free text input for category name
                allowNull: false,
            },
            SKUCode: {
                type: DataTypes.STRING(100), // Free text input for SKU code
                allowNull: true,
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
            tableName: "Category", // Explicit table name
        }
    );

    return Category;
};
