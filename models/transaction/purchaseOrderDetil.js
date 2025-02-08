module.exports = (sequelize, DataTypes) => {
    const PurchaseOrderDetails = sequelize.define(
        "PurchaseOrderDetails",
        {
            Id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            PurchaseOrderId: {
                type: DataTypes.INTEGER, // Foreign key to PurchaseOrder
                references: {
                    model: "PurchaseOrder",
                    key: "Code",
                },
                allowNull: false,
            },
            SKUCode: {
                type: DataTypes.STRING(255), // Match the data type in Product
                references: {
                    model: "Product",
                    key: "SKUCode", // Ensure this matches the indexed column in Product
                },
                allowNull: false,
            },
            ProductName: {
                type: DataTypes.STRING(255), // Autofill from Product
                allowNull: false,
            },
            Variant: {
                type: DataTypes.STRING(255), // Autofill from Product
                allowNull: true,
            },
            ProductImage: {
                type: DataTypes.STRING(255), // Autofill from Product
                allowNull: true,
            },
            QTY: {
                type: DataTypes.DECIMAL(10, 2), // Max 2 decimal places
                allowNull: false,
            },
            UnitPrice: {
                type: DataTypes.DECIMAL(10, 2), // Max 2 decimal places
                allowNull: false,
            },
            FirstMile: {
                type: DataTypes.DECIMAL(10, 2), // Max 2 decimal places
                allowNull: true,
            },
            CartonP: {
                type: DataTypes.DECIMAL(10, 2), // Max 2 decimal places
                allowNull: true,
            },
            CartonL: {
                type: DataTypes.DECIMAL(10, 2), // Max 2 decimal places
                allowNull: true,
            },
            CartonT: {
                type: DataTypes.DECIMAL(10, 2), // Max 2 decimal places
                allowNull: true,
            },
            CartonQty: {
                type: DataTypes.DECIMAL(10, 2), // Max 2 decimal places
                allowNull: true,
            },
            PricePerCarton: {
                type: DataTypes.DECIMAL(10, 2), // Auto-calculate, max 2 decimal places
                allowNull: true,
            },
            EstimatedCBMTotal: {
                type: DataTypes.DECIMAL(10, 6), // Increased precision for small CBM values
                allowNull: true,
            },
            CartonWeight: {
                type: DataTypes.DECIMAL(10, 2), // Max 2 decimal places
                allowNull: true,
            },
            MarkingNumber: {
                type: DataTypes.STRING(255), // Change to STRING for compatibility
                allowNull: true,
            },
            Credit: {
                type: DataTypes.STRING(255), // Change to STRING for compatibility
                allowNull: true,
            },
            Note: {
                type: DataTypes.STRING(255), // Free text
                allowNull: true,
            },
        },
        {
            timestamps: true,
            tableName: "PurchaseOrderDetails", // Explicit table name
        }
    );

    // ✅ Fix Before Save Hook for Calculations
    PurchaseOrderDetails.addHook("beforeSave", (details) => {
        if (details.CartonQty && details.UnitPrice) {
            details.PricePerCarton = parseFloat(
                (details.UnitPrice * details.CartonQty).toFixed(2)
            );
        }

        if (
            details.CartonP &&
            details.CartonL &&
            details.CartonT &&
            details.CartonQty
        ) {
            details.EstimatedCBMTotal = parseFloat(
                (
                    (details.CartonP / 100) *
                    (details.CartonL / 100) *
                    (details.CartonT / 100) *
                    details.CartonQty
                ).toFixed(6)
            );
        }
    });

    PurchaseOrderDetails.associate = (models) => {
        PurchaseOrderDetails.belongsTo(models.PurchaseOrder, {
            foreignKey: "PurchaseOrderId",
            as: "PurchaseOrder",
        });
        PurchaseOrderDetails.belongsTo(models.Product, {
            foreignKey: "SKUCode",
            as: "Product",
        });
    };

    return PurchaseOrderDetails;
};
