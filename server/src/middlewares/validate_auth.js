import joi from '@hapi/joi';
const validateAuth =  (schema) =>{
    return (req,res,next)=>{
        const validatorResult = schema.validate(req.body);
        if (validatorResult.error) {
            res.status(400).json({
                error : -1,
                message : validatorResult.error.message
            })
        }else{
            if (!req.value) {
                req.value = {};
            }
            req.value.body = validatorResult.value;
            next()
        }
    }
}
const schemas = {
    authRegisterShema : joi.object().keys({
        phone: joi.string().min(10).required(),
        password : joi.string().min(6).required(),
        name : joi.string().min(4).max(15).required()
    }),
    authLoginShema : joi.object().keys({
        password : joi.string().min(6).required(),
        phone : joi.string().min(9).required()
    })
}
module.exports = {
    validateAuth,
    schemas
}