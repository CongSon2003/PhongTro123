import db from '../models';
export const getAcreageService = () => new Promise(async (resolve,reject)=>{
    try {
        const response = await db.Acreage.findAll({
            raw : true,
            attributes : ['code','value','order']
        })
        resolve({
            error : response ? 0 : 1,
            message : response ? 'OK' : 'FAIL GET API ACREAGE',
            response
        });
    } catch (error) {
        reject(error)
    }
})