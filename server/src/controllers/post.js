import {GetPostsLimitService, GetPostsService,GetNewPostsService, CreateNewPostsService , GetPostsLimitAdminService, UpdatePostService, DeletePostService} from '../services/post'
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
    try {
        
        const response = await GetPostsLimitService(page,query,{priceNumber,acreageNumber});
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json(error)
    }
}
export const GetNewPostsController = async (req,res)=>{
    try {  
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
        if (!categoryCode || !id || !priceNumber || !label || !categoryCode || !acreageNumber || !userID || !title) {
            return res.status(400).json({
                error : 1,
                message : "Missed payload"
            })
        };
        const response = await CreateNewPostsService(req.body,id);
        return res.status(201).json(response)
    } catch (error) {
        res.status(500).json(error);
    }
}
export const updatePostController = async  (req,res)=>{
    try {
        const {postID,imagesID,overviewID,attributesID,...payload} = req.body;
        const { id } = req.user;
        if (!postID || !id  || !attributesID || !overviewID || !imagesID) {
            res.status(400).json({
                error : 1,
                message : 'Missing update data'
            })
        };
        const response = await UpdatePostService(req.body);
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json(error)
    }
}
export const deletePostController = async  (req,res)=>{
    try {
        const { postID } = req.query;
        const { id } = req.user;
        if ( !postID || !id ) {
            res.status(400).json({
                error : 1,
                message : 'Missing data'
            });
        }
        const response = await DeletePostService(postID);
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json(error)
    }
}
export const GetPostsLimitAdminController = async (req,res)=>{
    const {page,...query} = req.query;
    const {id} = req.user;
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