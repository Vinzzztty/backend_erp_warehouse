module.exports = (sequelize, DataTypes) => {
    const LastMileDetails = sequelize.define(
        "LastMileDetails",
        {
            Id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            TransaksiLastMileId: {
                type: DataTypes.INTEGER, // Foreign key to LastMile
                references: {
                    model: "LastMile",
                    key: "Code",
                },
                allowNull: false,
            },
            CXCode: {
                type: DataTypes.INTEGER, // Browse from approved CX Invoice with status Paid
                references: {
                    model: "CxInvoice",
                    key: "Code",
                },
                allowNull: false,
            },
            LastMileTracking: {
                type: DataTypes.STRING(255), // Autofill from CX Invoice
                allowNull: true,
            },
            FreightCode: {
                type: DataTypes.STRING(255), // Autofill from CX Invoice
                allowNull: true,
            },
            WarehouseCode: {
                type: DataTypes.INTEGER, // Browse from M.Warehouse
                references: {
                    model: "Warehouse",
                    key: "Code",
                },
                allowNull: false,
            },
            WarehouseAddress: {
                type: DataTypes.STRING(255), // Autofill from Warehouse
                allowNull: true,
            },
            Courier: {
                type: DataTypes.STRING(255), // Free text
                allowNull: true,
            },
            ShippingCost: {
                type: DataTypes.DECIMAL(10, 2), // Editable, max 2 decimal places
                allowNull: true,
            },
            AdditionalCost: {
                type: DataTypes.DECIMAL(10, 2), // Editable, max 2 decimal places
                allowNull: true,
            },
            Subtotal: {
                type: DataTypes.DECIMAL(10, 2), // Auto-calculated
                allowNull: true,
            },
            Total: {
                type: DataTypes.DECIMAL(10, 2), // Auto-calculated
                allowNull: true,
            },
        },
        {
            timestamps: true,
            tableName: "LastMileDetails",
        }
    );

    // Hooks for auto-calculations
    LastMileDetails.addHook("beforeSave", (details) => {
        // Auto-calculate Subtotal
        details.Subtotal = (
            parseFloat(details.ShippingCost || 0) +
            parseFloat(details.AdditionalCost || 0)
        ).toFixed(2);

        // Auto-calculate Total
        details.Total = details.Subtotal; // Add additional logic if required
    });

    LastMileDetails.associate = (models) => {
        LastMileDetails.belongsTo(models.LastMile, {
            foreignKey: "LastMileId",
            as: "LastMile",
        });
        LastMileDetails.belongsTo(models.CxInvoice, {
            foreignKey: "CXCode",
            as: "CxInvoice",
        });
        LastMileDetails.belongsTo(models.Warehouse, {
            foreignKey: "WarehouseCode",
            as: "Warehouse",
        });
    };

    return LastMileDetails;
};
