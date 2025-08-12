
import {GetOneUserService, UpdateUserService} from '../services/user';

export const getOneUserController = async (req,res)=>{
    try {
        const {id} = req.user;
        const response = await GetOneUserService(id);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error);
    }
};
export const UpdateUserController = async (req,res) =>{
    try {
        const {id} = req.user;
        const payload = req.body;
        if (!payload) {
            res.status(400).json(error);
        }
        const response = await UpdateUserService(payload,id);
        res.status(200).json(response); 
    } catch (error) {
        res.status(500).json({
            error : -1,
            message : 'failed at user controller' + error
        });
    }
}
