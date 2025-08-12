import * as categoriesService from '../services/category'
export const  getCategoryController = async (req,res) =>{
    try {
        const response = await categoriesService.getCategoryService();
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err : -1,
            message : 'Failed at category' + error
        })
    }
}