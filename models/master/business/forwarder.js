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
            AddressChina: {
                type: DataTypes.TEXT, // Store as JSON
                allowNull: true,
                get() {
                    return JSON.parse(
                        this.getDataValue("AddressChina") || "[]"
                    );
                },
                set(value) {
                    this.setDataValue("AddressChina", JSON.stringify(value));
                },
            },
            AddressIndonesia: {
                type: DataTypes.TEXT, // Store as JSON
                allowNull: true,
                get() {
                    return JSON.parse(
                        this.getDataValue("AddressIndonesia") || "[]"
                    );
                },
                set(value) {
                    this.setDataValue(
                        "AddressIndonesia",
                        JSON.stringify(value)
                    );
                },
            },
            CoordinateIndonesia: {
                type: DataTypes.TEXT, // Store as JSON
                allowNull: true,
                get() {
                    return JSON.parse(
                        this.getDataValue("CoordinateIndonesia") || "[]"
                    );
                },
                set(value) {
                    this.setDataValue(
                        "CoordinateIndonesia",
                        JSON.stringify(value)
                    );
                },
            },
            NamePIC: {
                type: DataTypes.TEXT, // Store as JSON
                allowNull: true,
                get() {
                    return JSON.parse(this.getDataValue("NamePIC") || "[]");
                },
                set(value) {
                    this.setDataValue("NamePIC", JSON.stringify(value));
                },
            },
            Department: {
                type: DataTypes.TEXT, // Store as JSON
                allowNull: true,
                get() {
                    return JSON.parse(this.getDataValue("Department") || "[]");
                },
                set(value) {
                    this.setDataValue("Department", JSON.stringify(value));
                },
            },
            ContactMethod: {
                type: DataTypes.TEXT, // Store as JSON (Previously ENUM)
                allowNull: true,
                get() {
                    return JSON.parse(
                        this.getDataValue("ContactMethod") || "[]"
                    );
                },
                set(value) {
                    this.setDataValue("ContactMethod", JSON.stringify(value));
                },
            },
            Description: {
                type: DataTypes.TEXT, // Store as JSON
                allowNull: true,
                get() {
                    return JSON.parse(this.getDataValue("Description") || "[]");
                },
                set(value) {
                    this.setDataValue("Description", JSON.stringify(value));
                },
            },
            BankId: {
                type: DataTypes.TEXT, // Store multiple bank IDs as JSON (no FK constraint)
                allowNull: true,
                get() {
                    return JSON.parse(this.getDataValue("BankId") || "[]");
                },
                set(value) {
                    this.setDataValue("BankId", JSON.stringify(value));
                },
            },
            AccountNumber: {
                type: DataTypes.TEXT, // Store multiple account numbers as JSON (integer format)
                allowNull: true,
                get() {
                    return JSON.parse(
                        this.getDataValue("AccountNumber") || "[]"
                    ).map(Number);
                },
                set(value) {
                    this.setDataValue(
                        "AccountNumber",
                        JSON.stringify(value.map(Number))
                    );
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
        // Forwarder.belongsTo(models.Bank, {
        //     foreignKey: "BankId",
        //     as: "Bank",
        // });
    };

    return Forwarder;
};
