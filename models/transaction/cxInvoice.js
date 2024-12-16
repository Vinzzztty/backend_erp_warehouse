module.exports = (sequelize, DataTypes) => {
    const TransaksiCxInvoice = sequelize.define(
        "TransaksiCxInvoice",
        {
            Code: {
                type: DataTypes.INTEGER, // Autogenerate, counting
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            Date: {
                type: DataTypes.DATEONLY, // Date picker/Calendar
                allowNull: false,
            },
            ForwarderId: {
                type: DataTypes.INTEGER, // Foreign key to M.Forwarder
                references: {
                    model: "Forwarder",
                    key: "Code",
                },
                allowNull: false,
            },
            Note: {
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
            tableName: "TransaksiCxInvoice",
        }
    );

    TransaksiCxInvoice.associate = (models) => {
        TransaksiCxInvoice.belongsTo(models.Forwarder, {
            foreignKey: "ForwarderId",
            as: "Forwarder",
        });
    };

    return TransaksiCxInvoice;
};
