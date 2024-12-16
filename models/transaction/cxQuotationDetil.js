module.exports = (sequelize, DataTypes) => {
    const CxQuotationDetails = sequelize.define(
        "CxQuotationDetails",
        {
            Id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            CxQuotationId: {
                type: DataTypes.INTEGER, // Foreign key to CxQuotation
                references: {
                    model: "CxQuotation",
                    key: "Code",
                },
                allowNull: false,
            },
            PICode: {
                type: DataTypes.INTEGER,
                references: {
                    model: "ProformaInvoice",
                    key: "Code",
                },
                allowNull: false,
            },
            ProductName: {
                type: DataTypes.STRING(255),
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
            tableName: "CxQuotationDetails",
        }
    );

    CxQuotationDetails.addHook("beforeSave", (details) => {
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

    CxQuotationDetails.associate = (models) => {
        CxQuotationDetails.belongsTo(models.CxQuotation, {
            foreignKey: "CxQuotationId",
            as: "CxQuotation",
        });
        CxQuotationDetails.belongsTo(models.ProformaInvoice, {
            foreignKey: "PICode",
            as: "ProformaInvoice",
        });
    };

    return CxQuotationDetails;
};
