module.exports = (sequelize, DataTypes) => {
    const Store = sequelize.define(
        "Store",
        {
            Code: {
                type: DataTypes.INTEGER, // Autogenerate, counting
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            Name: {
                type: DataTypes.STRING(100), // Free text input
                allowNull: false,
            },
            Notes: {
                type: DataTypes.TEXT, // Free text input (textarea)
                allowNull: true,
            },
            Status: {
                type: DataTypes.ENUM("Active", "Non-Active"), // Dropdown for Active/Non-active
                allowNull: false,
                defaultValue: "Active", // Default value
            },
        },
        {
            timestamps: true,
            tableName: "Store",
        }
    );

    return Store;
};
