import express from 'express';
import cors from 'cors';
import initRouters from './src/routers';
import bodyParser from 'body-parser';
import {getNumberFromString} from './src/heldpers/Common';
require('dotenv').config();
require('./src/config/connection_DataBase');
const app = express();
app.use(cors({
    origin : process.env.CLIENT_URL,
    methods : ['POST','GET','PUT','DELETE'],
}))
app.use(express.json({limit : '10mb'})); // reading JSON
app.use(express.urlencoded({extended : true,limit : '10mb'})); // reading BODY , FORM DATA
app.use(bodyParser.json()); // reading JSON => Javascript object
// router
initRouters(app)

const port = process.env.PORT || 8888
app.listen(port, () => console.log((`Server is listening on port ${port}`))); 
