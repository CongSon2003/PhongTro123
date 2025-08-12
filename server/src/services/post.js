import db from "../models"
import { Op, or, where } from "sequelize";
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
export const GetPostsLimitService = (page,{limitPost,order,...query},{priceNumber,acreageNumber}) => new Promise(async (resolve,reject)=>{
    try {
        let offset = page && parseInt(page) > 1 ? parseInt(page - 1) : 0;
        const queries = {...query};
        if (priceNumber) {
            query.priceNumber = {[Op.between] : [parseInt(priceNumber[0]),parseInt(priceNumber[1])]}
        }
        if (acreageNumber) {
            query.acreageNumber = {[Op.between] : [parseInt(acreageNumber[0]),parseInt(acreageNumber[1])]}
        }
        const limit = +limitPost || +process.env.LIMIT;
        if (order) {
            queries.order = [order];
        }
        queries.limit = limit;
        const response = await db.post.findAndCountAll({
            where : query,
            raw : true,
            nest : true,
            offset : parseInt(offset) * parseInt(process.env.LIMIT),
            ...queries,
            attributes : {exclude : ['createdAt','updatedAt']},
            include : [
                {model : db.images , as : 'imagesData',attributes : {exclude : ['createdAt','updatedAt','id']}},
                {model : db.attribute, as : 'attributesData',attributes : {exclude : ['createdAt','updatedAt','id']}},
                {model : db.User , as : 'userData',attributes : {exclude : ['updatedAt','id','password','fbUrl']}},
                {model : db.overview, as : 'overviewData'},
                {model : db.label, as : 'labelData', attributes : {exclude : ['createdAt','updatedAt']}}
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
        const attributesID = v4();
        const imagesID = v4();
        const overviewID = v4();
        const postID = v4();
        const currentDate = generateDate();
        const labelCode = generateCode(body.label);
        const provinceCode = generateCode(body.province);
        const hashtag = `${Math.floor(Math.random() * Math.pow(10,6) - 1) + Math.pow(10,5)}`;
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
            type : body?.categoryValue,
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
                {model : db.overview , as : 'overviewData'},
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
export const UpdatePostService = ({postID,imagesID,overviewID,attributesID,...payload}) => new Promise(async (resolve, reject)=>{
    try {
        const labelCode = generateCode(payload.label);
        const provinceCode = generateCode(payload.province);
        const response = await db.post.update(
            {
                title : payload.title || null,
                labelCode : labelCode,
                address : payload.address || null,
                categoryCode : payload.categoryCode,
                description : JSON.stringify(payload.description) || null,
                acreageCode : payload.acreageCode,
                priceCode : payload.priceCode,
                provinceCode,
                priceNumber : payload.priceNumber || 0,
                acreageNumber :  payload.acreageNumber || 0
            },
            {
                where: {
                    id: postID,
                },
            },
        )
        await db.attribute.update({
            price : +payload.priceNumber < 1 ? `${(+payload.priceNumber * 1000000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đồng/tháng` : `${+payload.priceNumber}  triệu/tháng`,
            acreage	: `${+payload.acreageNumber}m2`,
        },{where : {id : attributesID}});
        await db.images.update({
            images : JSON.stringify(payload?.images)
        },{where : {id : imagesID}});
        await db.overview.update({
            area : payload?.label,
            type : payload?.categoryValue,
            target : payload?.target,
            expired : payload?.expired,
            bonus : payload?.bonus,
        },{where : {id : overviewID}});
        await db.Province.findOrCreate({
            where : {
                code : provinceCode
            },
            defaults :{
                code : provinceCode,
                value : payload?.province
            }
        })
        await db.label.findOrCreate({
            where : {
                code : labelCode
            },
            defaults : {
                code : labelCode,
                value : payload?.label
            }
        })
        await db.User.update({
            accountBalance : payload?.accountBalance
        },{where : {id : payload?.userID}})
        resolve({
            error : 0,
            message : 'Update Success yehhh!'
        })
    } catch (error) {
        reject(error)
    }
})
export const DeletePostService = (postID) => new Promise(async (resolve,reject)=>{
    const response = await db.post.destroy({
        where : { id : postID }
    });
    resolve({
        error : response ? 0 : 1,
        message : response ? "DELETE SUCCESS!" : "DELETE WRONG",
        response
    })
})