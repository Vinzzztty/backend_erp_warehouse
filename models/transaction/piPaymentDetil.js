module.exports = (sequelize, DataTypes) => {
    const PiPaymentDetails = sequelize.define(
        "PiPaymentDetails",
        {
            Id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            PiPaymentId: {
                type: DataTypes.INTEGER, // Foreign key to PiPayment
                references: {
                    model: "PiPayment",
                    key: "Code",
                },
                allowNull: false,
            },
            PICode: {
                type: DataTypes.INTEGER, // Foreign key to ProformaInvoice
                references: {
                    model: "ProformaInvoice",
                    key: "Code",
                },
                allowNull: false,
            },
            Rate: {
                type: DataTypes.DECIMAL(10, 2), // Max 2 decimal places
                allowNull: false,
            },
            ProductPriceRupiah: {
                type: DataTypes.DECIMAL(10, 2), // Autofill from PI
                allowNull: false,
            },
            ProductPriceRMB: {
                type: DataTypes.DECIMAL(10, 2), // Auto-calculated
                allowNull: true,
            },
            FirstMileCostRupiah: {
                type: DataTypes.DECIMAL(10, 2), // Autofill from PI
                allowNull: true,
            },
            FirstMileRMB: {
                type: DataTypes.DECIMAL(10, 2), // Auto-calculated
                allowNull: true,
            },
            SubtotalToBePaidRupiah: {
                type: DataTypes.DECIMAL(10, 2), // Auto-calculated
                allowNull: true,
            },
            SubtotalToBePaidRMB: {
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
            tableName: "PiPaymentDetails",
        }
    );

    PiPaymentDetails.addHook("beforeSave", (details) => {
        // Auto-calculate ProductPriceRMB
        if (details.Rate && details.ProductPriceRupiah) {
            details.ProductPriceRMB = (
                details.ProductPriceRupiah / details.Rate
            ).toFixed(2);
        }

        // Auto-calculate FirstMileRMB
        if (details.Rate && details.FirstMileCostRupiah) {
            details.FirstMileRMB = (
                details.FirstMileCostRupiah / details.Rate
            ).toFixed(2);
        }

        // Auto-calculate SubtotalToBePaid (Rupiah and RMB)
        details.SubtotalToBePaidRupiah = (
            parseFloat(details.ProductPriceRupiah) +
            parseFloat(details.FirstMileCostRupiah || 0)
        ).toFixed(2);
        details.SubtotalToBePaidRMB = (
            parseFloat(details.ProductPriceRMB) +
            parseFloat(details.FirstMileRMB || 0)
        ).toFixed(2);

        // Auto-calculate Remaining Payments (Rupiah and RMB)
        if (details.PaymentRupiah) {
            details.RemainingPaymentRupiah = (
                parseFloat(details.SubtotalToBePaidRupiah) -
                parseFloat(details.PaymentRupiah)
            ).toFixed(2);
        }
        if (details.PaymentRMB) {
            details.RemainingPaymentRMB = (
                parseFloat(details.SubtotalToBePaidRMB) -
                parseFloat(details.PaymentRMB)
            ).toFixed(2);
        }

        // Auto-calculate Total Payment (Rupiah and RMB)
        details.TotalPaymentRupiah = (
            parseFloat(details.PaymentRupiah || 0) +
            parseFloat(details.FirstMileCostRupiah || 0)
        ).toFixed(2);
        details.TotalPaymentRMB = (
            parseFloat(details.PaymentRMB || 0) +
            parseFloat(details.FirstMileRMB || 0)
        ).toFixed(2);
    });

    PiPaymentDetails.associate = (models) => {
        PiPaymentDetails.belongsTo(models.PiPayment, {
            foreignKey: "PiPaymentId",
            as: "PiPayment",
        });
        PiPaymentDetails.belongsTo(models.ProformaInvoice, {
            foreignKey: "PICode",
            as: "ProformaInvoice",
        });
    };

    return PiPaymentDetails;
};
