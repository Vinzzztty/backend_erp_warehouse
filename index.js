const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/auth", require("./routes/auth/authRoutes"));
app.use("/api/v1/master", require("./routes/master/companyRoutes"));
app.use("/api/v1/master", require("./routes/master/bankRoutes"));
app.use("/api/v1/master", require("./routes/master/costRoutes"));
app.use("/api/v1/master", require("./routes/master/currencyRoute"));
app.use("/api/v1/master", require("./routes/master/ppnSettingRoutes"));
app.use("/api/v1/master", require("./routes/master/warehouseRoutes"));
app.use("/api/v1/master", require("./routes/master/countryRoutes"));
app.use("/api/v1/master", require("./routes/master/provinceRoutes"));
app.use("/api/v1/master", require("./routes/master/cityRoutes"));

app.get("/", (req, res) => {
    res.send("Welcome to API");
});

// Wildcard route for handling all other requests
app.get("*", (req, res) => {
    res.status(404).send("404 Not Found");
});

// Sync database
sequelize
    .sync()
    .then(() => {
        console.log("Database synchronized");
    })
    .catch((err) => {
        console.error("Error syncing database:", err);
    });

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
