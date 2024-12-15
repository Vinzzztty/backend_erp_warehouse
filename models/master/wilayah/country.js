module.exports = (sequelize, DataTypes) => {
    const Country = sequelize.define(
        "Country",
        {
            Code: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true, // Autogenerate the code
                allowNull: false,
            },
            Name: {
                type: DataTypes.STRING(255), // Free text input
                allowNull: false,
            },
            Status: {
                type: DataTypes.ENUM("Active", "Non-Active"), // Dropdown for Active/Non-active
                allowNull: false,
                defaultValue: "Active",
            },
        },
        {
            timestamps: true,
        }
    );
    return Country;
};
