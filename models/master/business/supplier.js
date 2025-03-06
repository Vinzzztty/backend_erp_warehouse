module.exports = (sequelize, DataTypes) => {
    const Supplier = sequelize.define(
        "Supplier",
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
            NamePIC: {
                type: DataTypes.TEXT, // Store JSON as a string
                allowNull: true,
                get() {
                    const value = this.getDataValue("NamePIC");
                    return value ? JSON.parse(value) : [];
                },
                set(value) {
                    this.setDataValue("NamePIC", JSON.stringify(value));
                },
            },
            Department: {
                type: DataTypes.TEXT, // Store JSON as a string
                allowNull: true,
                get() {
                    const value = this.getDataValue("Department");
                    return value ? JSON.parse(value) : [];
                },
                set(value) {
                    this.setDataValue("Department", JSON.stringify(value));
                },
            },
            ContactMethod: {
                type: DataTypes.TEXT, // Store JSON as a string (Previously ENUM)
                allowNull: true,
                get() {
                    const value = this.getDataValue("ContactMethod");
                    return value ? JSON.parse(value) : [];
                },
                set(value) {
                    this.setDataValue("ContactMethod", JSON.stringify(value));
                },
            },
            Description: {
                type: DataTypes.TEXT, // Store JSON as a string
                allowNull: true,
                get() {
                    const value = this.getDataValue("Description");
                    return value ? JSON.parse(value) : [];
                },
                set(value) {
                    this.setDataValue("Description", JSON.stringify(value));
                },
            },
            BankId: {
                type: DataTypes.TEXT, // Store JSON as a string but reference Bank model
                allowNull: true,
                get() {
                    const value = this.getDataValue("BankId");
                    return value ? JSON.parse(value) : [];
                },
                set(value) {
                    this.setDataValue("BankId", JSON.stringify(value));
                },
            },
            AccountNumber: {
                type: DataTypes.TEXT, // Store JSON as a string
                allowNull: true,
                get() {
                    const value = this.getDataValue("AccountNumber");
                    return value ? JSON.parse(value) : [];
                },
                set(value) {
                    this.setDataValue("AccountNumber", JSON.stringify(value));
                },
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
            tableName: "Supplier", // Explicit table name
        }
    );

    // Define associations
    Supplier.associate = (models) => {
        Supplier.belongsTo(models.City, {
            foreignKey: "CityId",
            as: "City",
        });
        Supplier.belongsTo(models.Province, {
            foreignKey: "ProvinceId",
            as: "Province",
        });
        Supplier.belongsTo(models.Country, {
            foreignKey: "CountryId",
            as: "Country",
        });
        // Supplier.belongsTo(models.Bank, {
        //     foreignKey: "BankId",
        //     as: "Bank",
        // });
    };

    return Supplier;
};
