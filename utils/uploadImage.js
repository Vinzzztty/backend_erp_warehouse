// utils/uploadImage.js
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

/**
 * Decodes a Base64 image string, generates a unique filename,
 * and saves it to the local filesystem.
 *
 * @param {string} base64Image - The full Base64 data string, e.g. "data:image/jpeg;base64,/9j/4AAQ..."
 * @returns {string} - The filename that was generated and saved
 */
function uploadBase64Image(base64Image) {
    // 1. Check if the Base64 string includes the data prefix
    const matches = base64Image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
        throw new Error("Invalid Base64 image format");
    }

    // 2. Extract the file extension from MIME type
    const mimeType = matches[1]; // e.g. "image/jpeg"
    const extension = mimeType.split("/")[1]; // e.g. "jpeg"
    const data = matches[2]; // Base64 part only

    // 3. Convert Base64 to buffer
    const buffer = Buffer.from(data, "base64");

    // 4. Generate a unique filename
    const fileName = `${uuidv4()}.${extension}`;

    // 5. Define the path to save the file
    //    In this example, images are stored in ./uploads/
    const uploadsDir = path.join(__dirname, "../uploads");
    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const filePath = path.join(uploadsDir, fileName);

    // 6. Write the file to disk
    fs.writeFileSync(filePath, buffer);

    // 7. Return the filename or the full path
    return fileName;
    // or return `filePath` if you want the absolute path
}

module.exports = {
    uploadBase64Image,
};
