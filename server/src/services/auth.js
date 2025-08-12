import db from '../models';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
export const Login = ({phone,password}) => new Promise(async (resolve,reject)=>{
    try {
        const user = await db.User.findOne({
            where : {phone : phone}
        });
        const compareCorrectPassword = user && bcrypt.compareSync(password,user.password);
        const access_Token = compareCorrectPassword && jwt.sign({id : user.id,name : user.name,phone : user.phone},process.env.JWT_SECRET,{expiresIn:'2d'});
        resolve({
            error : access_Token ? 0 : 1,
            message : access_Token ? 'Login sucesss' : user ? 'Password incorrect!' : 'Số điện thoại không tồn tại!',
            access_Token : access_Token ? `Bearer ${access_Token}` : null
        });
    } catch (error) {
        reject(error)
    }
})
const hashPassword = (password) => bcrypt.hashSync(password,bcrypt.genSaltSync(8));
export const Register = ({phone,name,password}) => new Promise( async (resolve,reject)=>{
    try {
        const uuid = uuidv4();
        const shortCode = uuid.replace(/'/g, '').slice(0, 6);

        const accountCode = shortCode;
        const [user, created] = await db.User.findOrCreate({
            where : {phone},
            defaults:{
                id : uuidv4(),
                accountCode,
                name : name,
                phone : phone,
                password : hashPassword(password)
            }
        });
        const access_Token = created && jwt.sign({id : user.id,name : user.name,phone : user.phone},process.env.JWT_SECRET,{expiresIn:'2d'});
        resolve({
            error : access_Token ? 0 : 1,
            message : access_Token ? 'Regester is success!' : "Số điện thoại đã được sử dụng! Vui lòng chọn số khác",
            access_Token : access_Token ? `Bearer ${access_Token}` : access_Token  
        });
    } catch (error) {
        reject(error)
    }
})