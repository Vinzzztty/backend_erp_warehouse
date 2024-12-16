module.exports = (sequelize, DataTypes) => {
    const CxInvoiceDetails = sequelize.define(
        "CxInvoiceDetails",
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
                    model: "CxInvoice",
                    key: "Code",
                },
                allowNull: false,
            },
            CXCode: {
                type: DataTypes.INTEGER, // Browse outstanding CX Quot from Forwarder
                references: {
                    model: "CxQuotation",
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
            tableName: "CxInvoiceDetails",
        }
    );

    // Hooks for auto-calculations
    CxInvoiceDetails.addHook("beforeSave", (details) => {
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

    CxInvoiceDetails.associate = (models) => {
        CxInvoiceDetails.belongsTo(models.CxInvoice, {
            foreignKey: "TransaksiCxInvoiceId",
            as: "TransaksiCxInvoice",
        });
        CxInvoiceDetails.belongsTo(models.CxQuotation, {
            foreignKey: "CXCode",
            as: "CxQuotation",
        });
    };

    return CxInvoiceDetails;
};
