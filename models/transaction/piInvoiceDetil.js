module.exports = (sequelize, DataTypes) => {
    const ProformaProductDetails = sequelize.define(
        "ProformaProductDetails",
        {
            Id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            ProformaInvoiceId: {
                type: DataTypes.INTEGER, // Foreign key to ProformaInvoice
                references: {
                    model: "ProformaInvoice",
                    key: "Code",
                },
                allowNull: false,
            },
            SKUCode: {
                type: DataTypes.STRING(255), // Foreign key to M.Product
                references: {
                    model: "Product",
                    key: "SKUCode", // Ensure this matches your Product model
                },
                allowNull: false,
            },
            ProductName: {
                type: DataTypes.STRING(255), // Autofill from M.Product
                allowNull: false,
            },
            Variant: {
                type: DataTypes.STRING(255), // Autofill from M.Product
                allowNull: true,
            },
            ProductImage: {
                type: DataTypes.STRING(255), // Autofill from M.Product
                allowNull: true,
            },
            QTYOrdered: {
                type: DataTypes.DECIMAL(10, 2), // Original quantity from PO
                allowNull: false,
            },
            QTYApproved: {
                type: DataTypes.DECIMAL(10, 2), // Adjusted quantity
                allowNull: true,
            },
            UnitPriceOrdered: {
                type: DataTypes.DECIMAL(10, 2), // Original price from PO
                allowNull: false,
            },
            UnitPriceApproved: {
                type: DataTypes.DECIMAL(10, 2), // Adjusted price
                allowNull: true,
            },
            FirstMile: {
                type: DataTypes.DECIMAL(10, 2), // Editable
                allowNull: true,
            },
            CartonP: {
                type: DataTypes.DECIMAL(10, 2), // Editable
                allowNull: true,
            },
            CartonL: {
                type: DataTypes.DECIMAL(10, 2), // Editable
                allowNull: true,
            },
            CartonT: {
                type: DataTypes.DECIMAL(10, 2), // Editable
                allowNull: true,
            },
            CartonQty: {
                type: DataTypes.DECIMAL(10, 2), // Editable
                allowNull: true,
            },
            PricePerCarton: {
                type: DataTypes.DECIMAL(10, 2), // Auto-calculated
                allowNull: true,
            },
            EstimatedCBMTotal: {
                type: DataTypes.DECIMAL(10, 2), // Auto-calculated
                allowNull: true,
            },
            CartonWeight: {
                type: DataTypes.DECIMAL(10, 2), // Editable
                allowNull: true,
            },
            MarkingNumber: {
                type: DataTypes.DECIMAL(10, 2), // Editable
                allowNull: true,
            },
            Credit: {
                type: DataTypes.DECIMAL(10, 2), // Editable
                allowNull: true,
            },
            Note: {
                type: DataTypes.STRING(255), // Free text
                allowNull: true,
            },
            Total: {
                type: DataTypes.DECIMAL(10, 2), // Auto-calculated
                allowNull: true,
            },
        },
        {
            timestamps: true,
            tableName: "ProformaProductDetails",
        }
    );

    // Hooks for auto-filling fields
    ProformaProductDetails.addHook("beforeSave", async (details, options) => {
        // Fetch product details if SKUCode is provided
        if (details.SKUCode) {
            const Product = await sequelize.models.Product.findOne({
                where: { SKUCode: details.SKUCode },
            });

            if (Product) {
                details.ProductName = Product.Name;
                details.Variant = Product.Variant;
                details.ProductImage = Product.Image; // Assuming `Image` is a column in M.Product
            }
        }

        // Auto-calculate PricePerCarton, EstimatedCBMTotal, and Total
        if (details.CartonQty && details.UnitPriceApproved) {
            details.PricePerCarton = (
                details.UnitPriceApproved * details.CartonQty
            ).toFixed(2);
        }

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

        if (details.QTYApproved && details.UnitPriceApproved) {
            details.Total = (
                details.QTYApproved * details.UnitPriceApproved
            ).toFixed(2);
        }
    });

    // Associations
    ProformaProductDetails.associate = (models) => {
        ProformaProductDetails.belongsTo(models.ProformaInvoice, {
            foreignKey: "ProformaInvoiceId",
            as: "ProformaInvoice",
        });

        ProformaProductDetails.belongsTo(models.Product, {
            foreignKey: "SKUCode",
            as: "Product",
        });
    };

    return ProformaProductDetails;
};
