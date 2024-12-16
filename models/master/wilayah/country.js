module.exports = (sequelize, DataTypes) => {
    const Country = sequelize.define(
        "Country",
        {
            Code: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            Name: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            Status: {
                type: DataTypes.ENUM("Active", "Non-Active"),
                allowNull: false,
                defaultValue: "Active",
            },
        },
        {
            tableName: "Country", // Ensure tableName matches
            timestamps: true,
        }
    );

    return Country;
};
