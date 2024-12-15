module.exports = (sequelize, DataTypes) => {
    const Company = sequelize.define(
        "Company",
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
            Notes: {
                type: DataTypes.TEXT, // Text area for larger input
                allowNull: true,
            },
            Status: {
                type: DataTypes.ENUM("Active", "Non-Active"), // Dropdown for Active/Non-active
                allowNull: false,
                defaultValue: "Active", // Default value for new entries
            },
        },
        {
            timestamps: true, // Automatically adds createdAt and updatedAt
            tableName: "Company", // Explicitly set table name
        }
    );

    return Company;
};
