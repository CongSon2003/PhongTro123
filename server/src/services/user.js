import db from '../models';
export const GetOneUserService = (id) => new Promise(async (resolve,reject)=>{
    try {
        console.log("id:",id);
        const response = await db.User.findOne({
            where: { id },
            raw: true,
            attributes: {
              exclude: ['password']
            }
        });
        resolve({
            error : response ? 0 : 1,
            message : response ? 'OK' : 'FAIL GET Province',
            response
        });
    } catch (error) {
        reject(error)
    }
})