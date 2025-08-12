import {insertDataService,createPricesAndAcreages} from '../services/insert';
export const insertData = async (req,res)=>{
    try {
        const response = await insertDataService();
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json(error)
    }
}