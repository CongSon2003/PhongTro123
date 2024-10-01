import db from "../models"
import { Op, where } from "sequelize";
import { v4 } from 'uuid';
import {generateCode} from '../heldpers/fn';
import moment from 'moment';
import generateDate from "../heldpers/generateDate";
export const GetPostsService = () => new Promise(async (resolve,reject)=>{
    try {
        const response = await db.post.findAll({
            raw : true,
            nest : true,
            attributes : {exclude : ['createdAt','updatedAt']},
            include : [
                {model : db.images , as : 'imagesData',attributes : {exclude : ['createdAt','updatedAt','id']}},
                {model : db.attribute, as : 'attributesData',attributes : {exclude : ['createdAt','updatedAt','id']}},
                {model : db.User , as : 'userData',attributes : {exclude : ['createdAt','updatedAt','id','password','avatar','fbUrl']}},
            ]
        });
        resolve({
            error : response ? 0 : 1,
            message : response ? 'OK' : 'GET ALL POST FAIL',
            response : response ? response : null
        })
    } catch (error) {
        reject(error)
    }
})
export const GetPostsLimitService = (page,query,{priceNumber,acreageNumber}) => new Promise(async (resolve,reject)=>{
    try {
        console.log(parseInt(process.env.LIMIT))
        let offset = page && parseInt(page) > 1 ? parseInt(page - 1) : 0;
        const queries = {...query}
        if (priceNumber) {
            queries.priceNumber = {[Op.between] : [parseInt(priceNumber[0]),parseInt(priceNumber[1])]}
        }
        if (acreageNumber) {
            queries.acreageNumber = {[Op.between] : [parseInt(acreageNumber[0]),parseInt(acreageNumber[1])]}
        }
        const response = await db.post.findAndCountAll({
            where : queries,
            raw : true,
            nest : true,
            offset : parseInt(offset) * parseInt(process.env.LIMIT),
            limit : parseInt(process.env.LIMIT),
            order: [['createdAt','DESC']],
            attributes : {exclude : ['createdAt','updatedAt']},
            include : [
                {model : db.images , as : 'imagesData',attributes : {exclude : ['createdAt','updatedAt','id']}},
                {model : db.attribute, as : 'attributesData',attributes : {exclude : ['createdAt','updatedAt','id']}},
                {model : db.User , as : 'userData',attributes : {exclude : ['createdAt','updatedAt','id','password','avatar','fbUrl']}},
            ]
        });
        resolve({
            error : response ? 0 : 1,
            message : response ? 'OK' : 'GET LIMIT POST FAIL',
            response : response ? response : null
        })
    } catch (error) {
        reject(error)
    }
})
export const GetNewPostsService = () => new Promise(async (resolve,reject)=>{
    try {
        const response = await db.post.findAll({
            raw : true,
            nest : true,
            offset : 0,
            order: [['createdAt','DESC']],
            limit : parseInt(process.env.LIMIT_NEW_POSTS),
            attributes: ['id','title','star','createdAt'],
            include : [
                {model : db.images , as : 'imagesData',attributes : {exclude : ['image']}},
                {model : db.attribute, as : 'attributesData',attributes : {exclude : ['createdAt','updatedAt','id']}},
            ]
        });
        resolve({
            error : response ? 0 : 1,
            message : response ? 'OK' : 'GET ALL POST FAIL',
            response : response ? response : null
        })
    } catch (error) {
        reject(error)
    }
});
export const CreateNewPostsService = (body,userID) => new Promise(async (resolve,reject)=>{
    try {
        console.log(body);
        const attributesID = v4();
        const imagesID = v4();
        const overviewID = v4();
        const postID = v4();
        const currentDate = generateDate();
        const labelCode = generateCode(body.label);
        const provinceCode = generateCode(body.province);
        const hashtag = `${Math.floor(Math.random() * Math.pow(10,6) - 1) + Math.pow(10,5)}`;
        console.log("Hello world");
        const response = await db.post.create({
            id : postID,
            title : body.title || null,
            labelCode : labelCode,
            address : body.address || null,
            attributesID : attributesID,
            categoryCode : body.categoryCode,
            description : JSON.stringify(body.description) || null,
            userID : userID,
            overviewID: overviewID,
            imagesID :imagesID,
            acreageCode : body.acreageCode,
            priceCode : body.priceCode,
            provinceCode,
            priceNumber : body.priceNumber || 0,
            acreageNumber :  body.acreageNumber || 0
        })
        await db.attribute.create({
            id : attributesID,
            price : +body.priceNumber < 1 ? `${(+body.priceNumber * 1000000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đồng/tháng` : `${+body.priceNumber}  triệu/tháng`,
            acreage	: `${+body.acreageNumber}m2`,
            published : moment(new Date).format('DD/MM/YYYY'),
            hashtag : hashtag
        })
        await db.images.create({
            id : imagesID,
            images : JSON.stringify(body?.images)
        })
        await db.overview.create({
            id : overviewID,
            code : `#${hashtag}`,
            area : body?.label,
            type : body?.categoryCode,
            target : body?.target,
            created : currentDate.created,
            bonus : 'Tin thường',
            expired : currentDate.expired,
        })
        await db.Province.findOrCreate({
            where : {
                code : provinceCode
            },
            defaults :{
                code : provinceCode,
                value : body.province
            }
        })
        await db.label.findOrCreate({
            where : {
                code : labelCode
            },
            defaults : {
                code : labelCode,
                value : body?.label
            }
        })
        resolve({
            error : 0,
            message : "Create Success"
        })
    } catch (error) {
        reject(error)
    }
});
export const GetPostsLimitAdminService = (page,id,query) => new Promise(async (resolve,reject)=>{
    try {
        let offset = page && parseInt(page) > 1 ? parseInt(page - 1) : 0;
        const queries = {...query, userID:id};
        console.log(queries);
        const response = await db.post.findAndCountAll({
            where : queries,
            raw : true,
            nest : true,
            offset : parseInt(offset) * parseInt(process.env.LIMIT),
            limit : parseInt(process.env.LIMIT),
            order: [['createdAt','DESC']],
            attributes : {exclude : ['createdAt','updatedAt']},
            include : [
                {model : db.images , as : 'imagesData',attributes : {exclude : ['createdAt','updatedAt','id']}},
                {model : db.attribute, as : 'attributesData',attributes : {exclude : ['createdAt','updatedAt','id']}},
                {model : db.User , as : 'userData',attributes : {exclude : ['createdAt','updatedAt','id','password','avatar','fbUrl']}},
            ]
        });
        resolve({
            error : response ? 0 : 1,
            message : response ? 'OK' : 'GET LIMIT POST FAIL',
            response : response ? response : null
        })
    } catch (error) {
        reject(error)
    }
})