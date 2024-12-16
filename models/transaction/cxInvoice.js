module.exports = (sequelize, DataTypes) => {
    const CxInvoice = sequelize.define(
        "CxInvoice",
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
            tableName: "CxInvoice",
        }
    );

    CxInvoice.associate = (models) => {
        CxInvoice.belongsTo(models.Forwarder, {
            foreignKey: "ForwarderId",
            as: "Forwarder",
        });
    };

    return CxInvoice;
};
