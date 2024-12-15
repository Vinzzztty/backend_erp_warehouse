module.exports = (sequelize, DataTypes) => {
    const City = sequelize.define(
        "City",
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
            ProvinceId: {
                type: DataTypes.INTEGER, // Foreign key from Province
                references: {
                    model: "Province", // Table name
                    key: "Code",
                },
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
            tableName: "City", // Explicitly set the table name
        }
    );

    // Establish relationships
    City.associate = (models) => {
        City.belongsTo(models.Province, {
            foreignKey: "ProvinceId",
            as: "Province",
        });
        City.belongsTo(models.Country, {
            foreignKey: "CountryId",
            as: "Country",
        });
    };

    return City;
};
