const ImageKit = require("imagekit");
require("dotenv").config();

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

// Utility for uploading images
const uploadImage = async (fileBuffer, fileName) => {
    try {
        const response = await imagekit.upload({
            file: fileBuffer, // File buffer from the request
            fileName: fileName, // Original file name
        });
        return response.url; // Return the uploaded image URL
    } catch (error) {
        throw new Error(`Image upload failed: ${error.message}`);
    }
};

module.exports = {
    uploadImage,
};
