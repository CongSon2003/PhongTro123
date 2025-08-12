import db from '../models';
export const getPricesService = () => new Promise(async (resolve,reject)=>{
    try {
        const response = await db.Price.findAll({
            raw : true,
            attributes : ['code','value','order']
        })
        resolve({
            error : response ? 0 : 1,
            message : response ? 'OK' : 'FAIL GET API PRICE',
            response
        });
    } catch (error) {
        reject(error)
    }
})