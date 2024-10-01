import { DeleteCloudService, uploadCloudService } from "../services/uploadCloud";
const cloudinary = require('cloudinary').v2;
export const uploadCloudController = async (req,res) =>{
    try {
        const images = req.files;
        if (!images) {
            return res.status(200).json({
                error : 1,
                message : "Miss images!"
            });
        }
        const response = await uploadCloudService();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error);
    }
}
export const DeleteCloudController = async (req,res) =>{
    try {
        const filename = req.body;
        if (Object.keys(filename).length === 0) {
            return res.status(200).json({
                error : 1,
                message : "Miss filename!"
            });
        }
        const response = await DeleteCloudService(filename.filename)
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error);
    }
}