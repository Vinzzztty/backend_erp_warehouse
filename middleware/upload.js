const multer = require("multer");
const storage = multer.memoryStorage(); // File saved in memory for direct upload
const upload = multer({ storage });

module.exports = upload;
