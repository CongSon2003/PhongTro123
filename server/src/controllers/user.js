
import {GetOneUserService} from '../services/user';

export const getOneUserController = async (req,res)=>{
    try {
        const {id} = req.user;
        console.log(id);
        const response = await GetOneUserService(id);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error);
    }
};
