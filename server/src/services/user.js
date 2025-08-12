import { where } from 'sequelize';
import db from '../models';
export const GetOneUserService = (id) => new Promise(async (resolve,reject)=>{
    try {
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
export const UpdateUserService = (payload,id) => new Promise(async (resolve, reject) =>{
    try {
        const response = await db.User.update({
            name : payload.name,
            fbUrl : JSON.stringify(payload.fbUrl) || null,
            email : payload.email || '',
            phone : payload.phone,
            zalo : payload.zalo,
            avatar : payload.avatar,
        },{where :{id}});
        resolve({
            error : response[0] > 0 ? 0 : 1,
            message : response[0] > 0 ? "Update user success, OK!" : "Update user wrong, Don't",
            response
        })
    } catch (error) {
        reject(error)
    }
})