module.exports = (sequelize, DataTypes) => {
    const CxQuotation = sequelize.define(
        "CxQuotation",
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
        },
        {
            timestamps: true,
            tableName: "CxQuotation",
        }
    );

    CxQuotation.associate = (models) => {
        CxQuotation.belongsTo(models.Forwarder, {
            foreignKey: "ForwarderId",
            as: "Forwarder",
        });
    };

    return CxQuotation;
};
