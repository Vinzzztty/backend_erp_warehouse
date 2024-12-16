module.exports = (sequelize, DataTypes) => {
    const UoM = sequelize.define(
        "UoM",
        {
            Code: {
                type: DataTypes.STRING(10), // Ensure this matches the Product model
                primaryKey: true,
                allowNull: false,
            },
            Name: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            Notes: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            Status: {
                type: DataTypes.ENUM("Active", "Non-Active"),
                allowNull: false,
                defaultValue: "Active",
            },
        },
        {
            timestamps: true,
            tableName: "UoM", // Explicit table name
        }
    );

    return UoM;
};
