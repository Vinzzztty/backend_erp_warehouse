module.exports = (sequelize, DataTypes) => {
    const Forwarder = sequelize.define(
        "Forwarder",
        {
            Code: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true, // Autogenerate the code
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
            CountryId: {
                type: DataTypes.INTEGER, // Foreign key from Country table
                references: {
                    model: "Country", // Table name
                    key: "Code",
                },
                allowNull: true,
            },
            AddressChina: {
                type: DataTypes.STRING(255), // Free text input
                allowNull: true,
            },
            AddressIndonesia: {
                type: DataTypes.STRING(255), // Free text input
                allowNull: true,
            },
            CoordinateIndonesia: {
                type: DataTypes.STRING(255), // Free text input
                allowNull: true,
            },
            NamePIC: {
                type: DataTypes.STRING(100), // Free text input
                allowNull: true,
            },
            Department: {
                type: DataTypes.STRING(255), // Free text input
                allowNull: true,
            },
            ContactMethod: {
                type: DataTypes.ENUM("Email", "Telephone", "WA"), // Dropdown
                allowNull: true,
            },
            Description: {
                type: DataTypes.STRING(255), // Free text input
                allowNull: true,
            },
            BankId: {
                type: DataTypes.INTEGER, // Foreign key from Bank table
                references: {
                    model: "Bank", // Table name
                    key: "Code",
                },
                allowNull: true,
            },
            AccountNumber: {
                type: DataTypes.BIGINT, // Integer input for account number
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
            Status: {
                type: DataTypes.ENUM("Active", "Non-Active"), // Dropdown
                allowNull: false,
                defaultValue: "Active", // Default value
            },
        },
        {
            timestamps: true, // Automatically adds createdAt and updatedAt fields
            tableName: "Forwarder", // Explicit table name
        }
    );

    // Define associations
    Forwarder.associate = (models) => {
        Forwarder.belongsTo(models.Country, {
            foreignKey: "CountryId",
            as: "Country",
        });
        Forwarder.belongsTo(models.Bank, {
            foreignKey: "BankId",
            as: "Bank",
        });
    };

    return Forwarder;
};
