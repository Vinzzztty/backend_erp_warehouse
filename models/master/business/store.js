module.exports = (sequelize, DataTypes) => {
    const Store = sequelize.define(
        "Store",
        {
            Code: {
                type: DataTypes.STRING(10),
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
            tableName: "Store",
            charset: "utf8mb4", // Ensure consistent charset
            collate: "utf8mb4_general_ci", // Ensure consistent collation
        }
    );

    return Store;
};
