import { SELECT } from 'sequelize/lib/query-types';
import db from '../models';
export const getCategoryService = ()=>new Promise(async (resolve,reject)=>{
    try {
        const response = await db.category.findAll({
            raw: true,
           attributes : ['code','value','header','subheader']
        });
        resolve({
            err : response ? 0 : 1,
            message : response ? 'OK' : 'Failed to get categories.',
            response : response
        })
    } catch (error) {
        reject(error)
    }
})