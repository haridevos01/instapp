import { v2 as cloudinary } from "cloudinary"
import fs from "fs"

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
})

const uploadOnCloudinary = async (filePath) => {
  try {
    if (!filePath) return null

    const response = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    })

    // ✅ Delete file AFTER successful upload
    fs.unlinkSync(filePath)

    return response
  } catch (error) {

    // ✅ Delete file if upload fails
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }

    console.log("Cloudinary Error:", error)
    return null
  }
}

export default uploadOnCloudinary