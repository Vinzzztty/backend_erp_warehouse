const { Sequelize } = require("sequelize");
const mysql2 = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.USER,
    process.env.USER_PASSWORD,
    {
        host: process.env.USER_HOST,
        port: process.env.USER_PORT, // Enable when use AIVEN
        dialect: "mysql", // Specify the dialect explicitly
        dialectModule: mysql2,
        timezone: "+07:00", // Set the timezone to Jakarta
        logging: false,
        define: {
            timestamps: true, // Enable timestamps globally
        },
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false, // Allow self-signed certificates
            },
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
