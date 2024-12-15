const { Sequelize } = require("sequelize");
const mysql2 = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = new Sequelize(
    process.env.LOCAL_DB_NAME,
    process.env.LOCAL_DB_USER,
    process.env.LOCAL_DB_PASSWORD,
    {
        host: process.env.LOCAL_DB_HOST,
        dialect: "mysql", // Specify the dialect explicitly
        dialectModule: mysql2,
        timezone: "+07:00", // Set the timezone to Jakarta
        logging: false,
        define: {
            timestamps: true, // Enable timestamps globally
        },
    }
);

sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });

module.exports = sequelize;
