import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadOnCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "instapp_profiles" },
      (error, result) => {
        if (error) {
          console.log("Cloudinary Error:", error);
          return reject(error);
        }
        resolve(result.secure_url);
      }
    );

    stream.end(fileBuffer);
  });
};

export default uploadOnCloudinary;