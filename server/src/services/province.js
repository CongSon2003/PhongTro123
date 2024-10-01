import db from '../models';
export const getProvincesService = () => new Promise(async (resolve,reject)=>{
    try {
        const response = await db.Province.findAll({
            raw : true,
            attributes : ['code','value']
        })
        resolve({
            error : response ? 0 : 1,
            message : response ? 'OK' : 'FAIL GET Province',
            response
        });
    } catch (error) {
        reject(error)
    }
})