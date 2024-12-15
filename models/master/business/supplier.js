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
            Address: {
                type: DataTypes.STRING(255), // Free text input
                allowNull: true,
            },
            CityId: {
                type: DataTypes.INTEGER, // Foreign key from M.City
                references: {
                    model: "City", // Table name
                    key: "Code",
                },
                allowNull: false,
            },
            ProvinceId: {
                type: DataTypes.INTEGER, // Autofilled from M.City
                references: {
                    model: "Province", // Table name
                    key: "Code",
                },
                allowNull: true,
            },
            CountryId: {
                type: DataTypes.INTEGER, // Autofilled from M.City
                references: {
                    model: "Country", // Table name
                    key: "Code",
                },
                allowNull: true,
            },
            PostalCode: {
                type: DataTypes.INTEGER, // Integer for postal code
                allowNull: true,
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
            Department: {
                type: DataTypes.STRING(255), // Free text input
                allowNull: true,
            },
            ContactMethod: {
                type: DataTypes.ENUM("Email", "Telephone", "WA"), // Dropdown for contact method
                allowNull: true,
            },
            Description: {
                type: DataTypes.STRING(255), // Free text input
                allowNull: true,
            },
            BankId: {
                type: DataTypes.INTEGER, // Foreign key from M.Bank
                references: {
                    model: "Bank", // Table name
                    key: "Code",
                },
                allowNull: true,
            },
            AccountNumber: {
                type: DataTypes.BIGINT, // Integer for account number
                allowNull: true,
            },
            Website: {
                type: DataTypes.STRING(255), // Free text input
                allowNull: true,
            },
            Wechat: {
                type: DataTypes.STRING(100), // Free text input
                allowNull: true,
            },
            ShippingMark: {
                type: DataTypes.STRING(255), // Free text input
                allowNull: true,
            },
        },
        {
            timestamps: true, // Automatically adds createdAt and updatedAt fields
            tableName: "Store", // Explicit table name
        }
    );

    // Define associations
    Store.associate = (models) => {
        Store.belongsTo(models.City, {
            foreignKey: "CityId",
            as: "City",
        });
        Store.belongsTo(models.Province, {
            foreignKey: "ProvinceId",
            as: "Province",
        });
        Store.belongsTo(models.Country, {
            foreignKey: "CountryId",
            as: "Country",
        });
        Store.belongsTo(models.Bank, {
            foreignKey: "BankId",
            as: "Bank",
        });
    };

    return Store;
};
