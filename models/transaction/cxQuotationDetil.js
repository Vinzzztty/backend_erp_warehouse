module.exports = (sequelize, DataTypes) => {
    const TransaksiCxQuotationDetails = sequelize.define(
        "TransaksiCxQuotationDetails",
        {
            Id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            TransaksiCxQuotationId: {
                type: DataTypes.INTEGER, // Foreign key to TransaksiCxQuotation
                references: {
                    model: "TransaksiCxQuotation",
                    key: "Code",
                },
                allowNull: false,
            },
            PICode: {
                type: DataTypes.INTEGER, // Browse from approved and Paid PI
                references: {
                    model: "ProformaInvoice",
                    key: "Code",
                },
                allowNull: false,
            },
            ProductName: {
                type: DataTypes.STRING(255), // Browse from PI
                allowNull: false,
            },
            Variant: {
                type: DataTypes.STRING(255), // Autofill based on PI Code
                allowNull: true,
            },
            ProductImage: {
                type: DataTypes.STRING(255), // Autofill based on PI Code
                allowNull: true,
            },
            QTY: {
                type: DataTypes.DECIMAL(10, 2), // Editable, max 2 decimal places
                allowNull: false,
            },
            CartonP: {
                type: DataTypes.DECIMAL(10, 2), // Autofill based on PI Code
                allowNull: true,
            },
            CartonL: {
                type: DataTypes.DECIMAL(10, 2), // Autofill based on PI Code
                allowNull: true,
            },
            CartonT: {
                type: DataTypes.DECIMAL(10, 2), // Autofill based on PI Code
                allowNull: true,
            },
            CartonQty: {
                type: DataTypes.DECIMAL(10, 2), // Editable, max 2 decimal places
                allowNull: true,
            },
            TotalPriceInPI: {
                type: DataTypes.DECIMAL(10, 2), // Autofill from PI (QTY * Unit Price + First Mile)
                allowNull: true,
            },
            EstimatedCBMTotal: {
                type: DataTypes.DECIMAL(10, 2), // Auto-calculate (CBM formula)
                allowNull: true,
            },
            RatePerCBM: {
                type: DataTypes.DECIMAL(10, 2), // Editable
                allowNull: true,
            },
            MarkingNumber: {
                type: DataTypes.STRING(255), // Free text
                allowNull: true,
            },
            CrossBorderFee: {
                type: DataTypes.DECIMAL(10, 2), // Editable
                allowNull: true,
            },
            ImportDuties: {
                type: DataTypes.DECIMAL(10, 2), // Editable
                allowNull: true,
            },
            DiscountAndFees: {
                type: DataTypes.DECIMAL(10, 2), // Editable
                allowNull: true,
            },
            LastMileTrackingNumber: {
                type: DataTypes.BIGINT, // Integer for large numbers
                allowNull: true,
            },
            CXCost: {
                type: DataTypes.DECIMAL(10, 2), // Auto-calculate but editable
                allowNull: true,
            },
            TotalCXCost: {
                type: DataTypes.DECIMAL(10, 2), // Auto-calculate, read-only
                allowNull: true,
            },
        },
        {
            timestamps: true,
            tableName: "TransaksiCxQuotationDetails",
        }
    );

    TransaksiCxQuotationDetails.addHook("beforeSave", (details) => {
        // Auto-calculate EstimatedCBMTotal
        if (
            details.CartonP &&
            details.CartonL &&
            details.CartonT &&
            details.CartonQty
        ) {
            details.EstimatedCBMTotal = (
                (details.CartonP *
                    details.CartonL *
                    details.CartonT *
                    details.CartonQty) /
                1000000
            ).toFixed(2);
        }

        // Auto-calculate TotalCXCost
        details.TotalCXCost = (
            parseFloat(details.CXCost || 0) +
            parseFloat(details.CrossBorderFee || 0) +
            parseFloat(details.ImportDuties || 0) -
            parseFloat(details.DiscountAndFees || 0)
        ).toFixed(2);
    });

    TransaksiCxQuotationDetails.associate = (models) => {
        TransaksiCxQuotationDetails.belongsTo(models.TransaksiCxQuotation, {
            foreignKey: "TransaksiCxQuotationId",
            as: "TransaksiCxQuotation",
        });
        TransaksiCxQuotationDetails.belongsTo(models.ProformaInvoice, {
            foreignKey: "PICode",
            as: "ProformaInvoice",
        });
    };

    return TransaksiCxQuotationDetails;
};
