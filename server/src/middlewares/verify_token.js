import jwt from 'jsonwebtoken'
const verify_Token = (req,res,next) =>{
    try {
        let access_Token = req.headers?.authorization?.split(' ')[1];
        if (!access_Token) {
            return res.status(401).json({errorr : 1,messages : 'Missing access_token'})
        }else{
            jwt.verify(access_Token,process.env.JWT_SECRET, (err,decode)=>{
                if (err) {
                    return res.status(401).json({error : 1,messages : 'Access token exprired'})
                }
                req.user = decode
                next()
            })
        }
        
    } catch (error) {
        return res.status(500).json({error : -1,messages : 'error serser'})
    }
}
export default verify_Token