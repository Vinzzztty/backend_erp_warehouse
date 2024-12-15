module.exports = (sequelize, DataTypes) => {
    const Channel = sequelize.define(
        "Channel",
        {
            Code: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true, // Autogenerate and increment code
                allowNull: false,
            },
            Name: {
                type: DataTypes.STRING(100), // Free text input
                allowNull: false,
            },
            Initial: {
                type: DataTypes.TEXT, // Free text input (textarea)
                allowNull: true,
            },
            Category: {
                type: DataTypes.ENUM("Parent", "Child"), // Dropdown with Parent/Child options
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
            tableName: "Channel", // Explicit table name
        }
    );

    return Channel;
};
