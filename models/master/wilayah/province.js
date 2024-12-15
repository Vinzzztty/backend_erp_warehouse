module.exports = (sequelize, DataTypes) => {
    const Province = sequelize.define(
        "Province",
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
            CountryId: {
                type: DataTypes.INTEGER, // Foreign key from Country
                references: {
                    model: "Country", // Table name
                    key: "Code",
                },
                allowNull: false,
            },
            Status: {
                type: DataTypes.ENUM("Active", "Non-Active"), // Dropdown for Active/Non-active
                allowNull: false,
                defaultValue: "Active",
            },
        },
        {
            timestamps: true, // Enable createdAt and updatedAt
            tableName: "Province", // Explicitly set table name
        }
    );

    // Establish relationship
    Province.associate = (models) => {
        Province.belongsTo(models.Country, {
            foreignKey: "CountryId",
            as: "Country",
        });
    };

    return Province;
};
