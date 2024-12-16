module.exports = (sequelize, DataTypes) => {
    const TransaksiCxInvoiceDetails = sequelize.define(
        "TransaksiCxInvoiceDetails",
        {
            Id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            TransaksiCxInvoiceId: {
                type: DataTypes.INTEGER, // Foreign key to TransaksiCxInvoice
                references: {
                    model: "TransaksiCxInvoice",
                    key: "Code",
                },
                allowNull: false,
            },
            CXCode: {
                type: DataTypes.INTEGER, // Browse outstanding CX Quot from Forwarder
                references: {
                    model: "TransaksiCxQuotation",
                    key: "Code",
                },
                allowNull: false,
            },
            AWB: {
                type: DataTypes.BIGINT, // Integer
                allowNull: true,
            },
            FreightCode: {
                type: DataTypes.BIGINT, // Integer
                allowNull: true,
            },
            Rate: {
                type: DataTypes.DECIMAL(10, 2), // Editable
                allowNull: false,
            },
            FinalCBM: {
                type: DataTypes.DECIMAL(10, 2), // Editable
                allowNull: true,
            },
            CXCostRupiah: {
                type: DataTypes.DECIMAL(10, 2), // Autofill from PI Code
                allowNull: true,
            },
            CXCostRMB: {
                type: DataTypes.DECIMAL(10, 2), // Auto-calculated
                allowNull: true,
            },
            PaymentRupiah: {
                type: DataTypes.DECIMAL(10, 2), // Editable
                allowNull: true,
            },
            PaymentRMB: {
                type: DataTypes.DECIMAL(10, 2), // Editable
                allowNull: true,
            },
            RemainingPaymentRupiah: {
                type: DataTypes.DECIMAL(10, 2), // Auto-calculated
                allowNull: true,
            },
            RemainingPaymentRMB: {
                type: DataTypes.DECIMAL(10, 2), // Auto-calculated
                allowNull: true,
            },
            TotalPaymentRupiah: {
                type: DataTypes.DECIMAL(10, 2), // Auto-calculated
                allowNull: true,
            },
            TotalPaymentRMB: {
                type: DataTypes.DECIMAL(10, 2), // Auto-calculated
                allowNull: true,
            },
        },
        {
            timestamps: true,
            tableName: "TransaksiCxInvoiceDetails",
        }
    );

    // Hooks for auto-calculations
    TransaksiCxInvoiceDetails.addHook("beforeSave", (details) => {
        // Auto-calculate CXCostRMB
        if (details.Rate && details.CXCostRupiah) {
            details.CXCostRMB = (details.CXCostRupiah / details.Rate).toFixed(
                2
            );
        }

        // Auto-calculate RemainingPaymentRupiah
        if (details.PaymentRupiah && details.CXCostRupiah) {
            details.RemainingPaymentRupiah = (
                parseFloat(details.CXCostRupiah) -
                parseFloat(details.PaymentRupiah)
            ).toFixed(2);
        }

        // Auto-calculate RemainingPaymentRMB
        if (details.PaymentRMB && details.CXCostRMB) {
            details.RemainingPaymentRMB = (
                parseFloat(details.CXCostRMB) - parseFloat(details.PaymentRMB)
            ).toFixed(2);
        }

        // Auto-calculate TotalPaymentRupiah
        if (details.PaymentRupiah) {
            details.TotalPaymentRupiah = parseFloat(
                details.PaymentRupiah
            ).toFixed(2);
        }

        // Auto-calculate TotalPaymentRMB
        if (details.PaymentRMB) {
            details.TotalPaymentRMB = parseFloat(details.PaymentRMB).toFixed(2);
        }
    });

    TransaksiCxInvoiceDetails.associate = (models) => {
        TransaksiCxInvoiceDetails.belongsTo(models.TransaksiCxInvoice, {
            foreignKey: "TransaksiCxInvoiceId",
            as: "TransaksiCxInvoice",
        });
        TransaksiCxInvoiceDetails.belongsTo(models.TransaksiCxQuotation, {
            foreignKey: "CXCode",
            as: "CxQuotation",
        });
    };

    return TransaksiCxInvoiceDetails;
};
