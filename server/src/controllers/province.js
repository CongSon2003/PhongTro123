import {getProvincesService} from '../services/province';

export const getProvincesController = async (req,res)=>{
    try {
        const response = await getProvincesService();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error);
    }
};
