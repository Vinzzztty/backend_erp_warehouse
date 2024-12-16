module.exports = (sequelize, DataTypes) => {
    const PiPayment = sequelize.define(
        "PiPayment",
        {
            Code: {
                type: DataTypes.INTEGER, // Autogenerate, counting
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            Date: {
                type: DataTypes.DATEONLY, // Format: YYYY-MM-DD
                allowNull: false,
            },
            SupplierId: {
                type: DataTypes.INTEGER, // Foreign key to Supplier
                references: {
                    model: "Supplier",
                    key: "Code",
                },
                allowNull: false,
            },
            Notes: {
                type: DataTypes.TEXT, // Free text
                allowNull: true,
            },
            Status: {
                type: DataTypes.ENUM(
                    "Unpaid",
                    "Paid",
                    "Shipped",
                    "Arrived",
                    "Inbound",
                    "Completed",
                    "Cancelled"
                ), // Dropdown options
                allowNull: false,
                defaultValue: "Unpaid",
            },
        },
        {
            timestamps: true,
            tableName: "PiPayment",
        }
    );

    PiPayment.associate = (models) => {
        PiPayment.belongsTo(models.Supplier, {
            foreignKey: "SupplierId",
            as: "Supplier",
        });
    };

    return PiPayment;
};
