const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");

const app = express();
const PORT = process.env.PORT || 3001;

const allowedOrigins = [
    "http://localhost:3000", // Development
    "https://fe-erp-warehouse.vercel.app", // Production
];

app.use(
    cors({
        origin: (origin, callback) => {
            // Allow requests with no origin (like mobile apps or Postman)
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/auth", require("./routes/auth/authRoutes"));

// Master routes
app.use("/api/v1/master", require("./routes/master/companyRoutes"));
app.use("/api/v1/master", require("./routes/master/bankRoutes"));
app.use("/api/v1/master", require("./routes/master/costRoutes"));
app.use("/api/v1/master", require("./routes/master/currencyRoute"));
app.use("/api/v1/master", require("./routes/master/ppnSettingRoutes"));
app.use("/api/v1/master", require("./routes/master/warehouseRoutes"));
app.use("/api/v1/master", require("./routes/master/countryRoutes"));
app.use("/api/v1/master", require("./routes/master/provinceRoutes"));
app.use("/api/v1/master", require("./routes/master/cityRoutes"));
app.use("/api/v1/master", require("./routes/master/forwarderRoutes"));
app.use("/api/v1/master", require("./routes/master/storeRoutes"));
app.use("/api/v1/master", require("./routes/master/supplierRoutes"));
app.use("/api/v1/master", require("./routes/master/categoryRoutes"));
app.use("/api/v1/master", require("./routes/master/channelRotues"));
app.use("/api/v1/master", require("./routes/master/uomRoutes"));
app.use("/api/v1/master", require("./routes/master/variantRoutes"));
app.use("/api/v1/master", require("./routes/master/productRoutes"));

// Transaction Routes
app.use(
    "/api/v1/transaction",
    require("./routes/transaction/purchaseOrderRoutes")
);
app.use(
    "/api/v1/transaction",
    require("./routes/transaction/purchaseOrderDetilRoutes")
);
app.use("/api/v1/transaction", require("./routes/transaction/piRoutes"));
app.use("/api/v1/transaction", require("./routes/transaction/piDetilRoutes"));
app.use("/api/v1/transaction", require("./routes/transaction/piPaymentRoutes"));
app.use(
    "/api/v1/transaction",
    require("./routes/transaction/piPaymentDetilRoutes")
);
app.use(
    "/api/v1/transaction",
    require("./routes/transaction/cxQuotationRoutes")
);
app.use(
    "/api/v1/transaction",
    require("./routes/transaction/cxQuotationRoutes")
);
app.use("/api/v1/transaction", require("./routes/transaction/cxQDetilRoutes"));
app.use("/api/v1/transaction", require("./routes/transaction/cxInvoiceRoutes"));
app.use("/api/v1/transaction", require("./routes/transaction/cxIDetilRoutes"));

app.use("/api/v1/transaction", require("./routes/transaction/lastMileRoutes"));
app.use(
    "/api/v1/transaction",
    require("./routes/transaction/lastMileDetilRotues")
);
app.use("/api/v1/transaction", require("./routes/transaction/grRoutes"));
app.use("/api/v1/transaction", require("./routes/transaction/grDetilRoutes"));

// Product Pricing Route
app.use(
    "/api/v1/product_pricing",
    require("./routes/product_pricing/bpRoutes")
);

app.use(
    "/api/v1/product_pricing",
    require("./routes/product_pricing/bpDetilRoutes")
);
app.use(
    "/api/v1/product_pricing",
    require("./routes/product_pricing/spRoutes")
);
app.use(
    "/api/v1/product_pricing",
    require("./routes/product_pricing/spDetilRoutes")
);

// Default route
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
