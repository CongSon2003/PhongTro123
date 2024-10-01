import authRouter from './auth';
import insertRouter from './insert';
import categoryRouter from './category';
import postRouter from './post';
import priceRouter from './price';
import acreageRouter from './areage';
import provinceRouter from './province';
import userRouter from './user';
import uploadCloud from './uploadCloud';
const initRouters = (app)=>{
    app.use('/api/v1/auth',authRouter);
    app.use('/api/v1/insert',insertRouter);
    app.use('/api/v1/category',categoryRouter);
    app.use('/api/v1/post',postRouter);
    app.use('/api/v1/price',priceRouter);
    app.use('/api/v1/acreage',acreageRouter);
    app.use('/api/v1/province',provinceRouter);
    app.use('/api/v1/user',userRouter);
    app.use('/api/v1/Cloudinary',uploadCloud);
    return app.use('/',(req,res)=>{
        res.send('Server Go On...')
    })
}
export default initRouters