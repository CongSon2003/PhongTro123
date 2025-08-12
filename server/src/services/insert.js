import db from '../models';
import { v4 } from 'uuid';
import chothuecaho from '../../data/chothuecanho.json';
import chothuematbang from '../../data/chothuematbang.json';
import nhachothue from '../../data/nhachothue.json';
import chothuephotro from '../../data/chothuephongtro.json'
import {generateCode} from '../heldpers/fn';
import {dataArea,dataPrice} from '../heldpers/Data';
import { getNumberFromString,getNumberFromStringV2 } from '../heldpers/Common';

const dataBody = [chothuecaho.body,chothuematbang.body,nhachothue.body,chothuephotro.body];
export const insertDataService =() => new Promise(async(resolve,reject)=>{
    try {
        
        const provinceCodes = [];
        const labelCodes = [];
        dataBody.forEach((cate,index) =>{
            const categoryCodeString = ['CTCH','CTMB','NCT','CTPT'];
            cate.forEach(async (item) =>{
                let labelCode = generateCode(item?.header?.class?.classType).trim();
                let provinceCode = generateCode(item?.header?.address?.split(',').at(-1).trim());
                provinceCodes?.every(item => item?.code !== provinceCode) && provinceCodes.push({
                    code : provinceCode,
                    value : item?.header?.address?.split(',')?.at(-1).trim()
                })
                labelCodes?.every(item => item?.code !== labelCode) && labelCodes.push({
                    code :  labelCode,
                    value : item?.header?.class?.classType?.trim()
                })
                let postID = v4();
                let attributesID  = v4();
                let userID = v4();
                let overviewID = v4();
                let imagesID = v4();
                let currentAcreage = getNumberFromStringV2(item?.header?.attributes?.acreage);
                let curentPrices = getNumberFromStringV2(item?.header?.attributes?.price);
                await db.post.create({
                    id : postID,
                    title : item?.header?.title,
                    star : item?.header?.star,
                    labelCode : labelCode,
                    address : item?.header?.address,
                    attributesID : attributesID,
                    categoryCode : categoryCodeString[index],
                    description : JSON.stringify(item?.mainContent?.content),
                    userID : userID,
                    overviewID: overviewID,
                    imagesID :imagesID,
                    acreageCode : dataArea.find(acreage => acreage.max > currentAcreage && acreage.min <= currentAcreage)?.code,
                    priceCode : dataPrice.find(Price => Price.max > curentPrices && Price.min <= curentPrices)?.code,
                    provinceCode,
                    priceNumber : getNumberFromStringV2(item?.header?.attributes?.price),
                    acreageNumber :  getNumberFromStringV2(item?.header?.attributes?.acreage)
                })
                await db.attribute.create({
                    id : attributesID,
                    price : item?.header?.attributes?.price,
                    acreage	: item?.header?.attributes?.acreage,
                    published : item?.header?.attributes?.published,
                    hashtag : item?.header?.attributes?.hashtag
                })
                await db.images.create({
                    id : imagesID,
                    images : JSON.stringify(item?.images)
                })
                await db.overview.create({
                    id : overviewID,
                    code : item?.overview?.content.find(e => e.name === 'Mã tin:').content,
                    area : item?.overview?.content.find(e => e.name === 'Khu vực').content,
                    type : item?.overview?.content.find(e => e.name === 'Loại tin rao:').content,
                    target : item?.overview?.content.find(e => e.name === 'Đối tượng thuê:').content,
                    created : item?.overview?.content.find(e => e.name === 'Ngày đăng:').content,
                    bonus : item?.overview?.content.find(e => e.name === 'Gói tin:').content,
                    expired : item?.overview?.content.find(e => e.name === 'Ngày hết hạn:').content,
                })
                await db.User.create({
                    id : userID,
                    name : item?.contact?.content?.find(e => e.name === 'Liên hệ:').content,
                    phone : item?.contact?.content?.find(e => e.name === 'Điện thoại:').content,
                    password : '123456',
                    zalo : item?.contact?.content?.find(e => e.name === 'Zalo').content,
                })

            })
        })
        provinceCodes?.forEach( async (item) =>{
            await db.Province.create(item)
        })
        labelCodes?.forEach( async (item) =>{
            await db.label.create(item)
        })
        resolve("Done")
    } catch (error) {
        reject(error)
    }
})
export const createPricesAndAcreages = () => new Promise((resolve,reject)=>{
    try {
        dataPrice.forEach(async(item,index) =>{
            await db.Price.create({
                code : item.code,
                value : item.value,
                order : index + 1
            })
        })
        dataArea.forEach(async(item,index) =>{
            await db.Acreage.create({
                code : item.code,
                value : item.value,
                order : index + 1
            })
        })
        resolve('ok')
    } catch (error) {
        reject(error)
    }
})