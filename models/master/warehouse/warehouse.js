module.exports = (sequelize, DataTypes) => {
    const Warehouse = sequelize.define(
        "Warehouse",
        {
            Code: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true, // Autogenerate the code
                allowNull: false,
            },
            Name: {
                type: DataTypes.STRING(255), // Free text input
                allowNull: false,
            },
            Address: {
                type: DataTypes.STRING(255), // Free text input
                allowNull: false,
            },
            Notes: {
                type: DataTypes.TEXT, // Free text for a larger input
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
            tableName: "Warehouse",
        }
    );
    return Warehouse;
};
