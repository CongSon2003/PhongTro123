import {GetPostsLimitService, GetPostsService,GetNewPostsService, CreateNewPostsService , GetPostsLimitAdminService} from '../services/post'
export const GetPostsController = async (req,res)=>{
    try {
        const response = await GetPostsService();
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json(error)
    }
}
export const GetPostsLimitController = async (req,res)=>{
    const {page,priceNumber,acreageNumber,...query} = req.query;
    console.log(query);
    try {
        
        const response = await GetPostsLimitService(page,query,{priceNumber,acreageNumber});
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json(error)
    }
}
export const GetNewPostsController = async (req,res)=>{
    try {  
        console.log("Controller");
        const response = await GetNewPostsService();
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json(error)
    }
}
export const createNewPostController = async (req,res) =>{
    try {
        const {
            title, 
            label, 
            categoryCode, 
            userID,
            acreageNumber,
            priceNumber,    
        } = req.body;
        const { id } = req.user;
        console.log(title, 
            label, 
            categoryCode, 
            userID,
            acreageNumber,
            priceNumber,
            title);
        if (!categoryCode || !id || !priceNumber || !label || !categoryCode || !acreageNumber || !userID || !title) {
            return res.status(400).json({
                error : 1,
                message : "Missed payload"
            })
        };
        const response = await CreateNewPostsService(req.body,id);
        return res.status(200).json(response)
    } catch (error) {
        res.status(500).json(error);
    }
}
export const GetPostsLimitAdminController = async (req,res)=>{
    console.log("A");
    const {page,...query} = req.query;
    // const {id} = req.user;
    const id = '003e2bf3-e645-4b37-a3fe-5fee2ff6e9ba';
    try {
        if (!id) {
            return res.status(400).json({
                error : 1,
                message : "Missing Input"
            }) 
        }
        const response = await GetPostsLimitAdminService(page,id,query);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error)
    }
}