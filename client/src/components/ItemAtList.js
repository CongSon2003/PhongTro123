import React, { memo, useEffect, useState } from "react";
import icons from "../unltils/icon";
import Button from "./Button";
import * as actions from '../store/actions'
import { json, Link, useNavigate } from "react-router-dom";
import {DETAIL_POST__TITLE__POSTID,DETAIL} from '../constants/path';
import {normalizedString} from '../constants/function/formatVietnam';
import { useDispatch, useSelector } from "react-redux";
const { MdOutlineStar, BsFillBookmarkStarFill } = icons;
const ItemAnList = ({
  title,
  address,
  attributes,
  description,
  images,
  star,
  user,
  id,
  isLovePost
}) => {

  const [isHoverHeart, SetisHoverHeart] = useState(false);
  const [OnClickHeart, SetOnClickHeart] = useState();
  const {idPost} = useSelector(state => state.lovepost);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const handleStar = (star) =>{
    let Stars = []
    for (let index = 0; index < parseInt(star); index++) {
      Stars.push(index)
    }
    return Stars
  }
  let addressData = address.split(",");
  let descriptionContent = JSON.parse(description);
  const handleClickHeart = () => {
    if (OnClickHeart === true) {
      SetOnClickHeart(false);
    } else {
      SetOnClickHeart(true);
    }
  };
  useEffect(() => {
    OnClickHeart === true && dispatch(actions.idPost(id))
    if (idPost.length > 0 && OnClickHeart === false) {
      dispatch(actions.Delete_idPost(id))
    }
  },[OnClickHeart]);
  useEffect(()=>{
    for (let index = 0; index < idPost.length; index++) {
      const element = idPost[index];
      element === id && SetOnClickHeart(true);
    }
  },[])
  // [...Array(4).keys()] => [1,2,3,4] <=> [0,1,2,3]
  return (
    (star >= 4 && !isLovePost) ? <div className="mx-[-20px] item flex items-start py-4 px-5 border-t border-[#E13427] bg-[#fff9f3]">
      {images.length > 4 ? <div className="relative w-2/5">
        <Link to={`${DETAIL}${normalizedString(title)}/${id}`} 
          className="flex flex-wrap gap-[2px] items-center cursor-pointer">
          {images
            .filter((i, index) => [...Array(4).keys()].some((i) => i === index))
            ?.map((item,index) => {
              return (
                <img
                  src={item}
                  key={index}
                  className="w-[47%] rounded h-[120px] object-cover bg-center"
                  alt="priviwe"
                />
              );
            })}
        </Link>
        <span className="bg-black bg-opacity-50 text-[#ffffff] absolute bottom-[8px] left-[5px] rounded-sm text-sm px-2 pointer-events-none">{`${images.length} ảnh`}</span>
          <span
            onMouseEnter={() => SetisHoverHeart(true)}
            onMouseLeave={() => SetisHoverHeart(false)}
            onClick={handleClickHeart}
            className="absolute right-5 cursor-pointer bottom-0 w-10 h-10 flex z-10 items-center justify-center"
          >
            {OnClickHeart ? (
              <i className="bg-HEARTFILL bg-center w-[23px] h-[23px] bg-no-repeat inline-block bg-contain"></i>
            ) : isHoverHeart ? (
              <i className="bg-HEARTFILL bg-center w-[23px] h-[23px] bg-no-repeat inline-block bg-contain"></i>
            ) : (
              <i className="bg-NOHEARTFILL bg-center w-[23px] h-[23px] bg-no-repeat inline-block bg-contain"></i>
            )}
        </span>
      </div> : <div className="relative w-2/5">
        <Link to={`${DETAIL}${normalizedString(title)}/${id}`} 
          className="flex items-center cursor-pointer h-[242px] pr-[18px]">
          <img
            src={images[0]}
            className="w-full h-full object-cover bg-center rounded"
            alt="priviwe"
          /> 
        </Link>
        <span className="bg-black bg-opacity-50 text-[#ffffff] absolute bottom-[8px] left-[5px] rounded-sm text-sm px-2 pointer-events-none">{`${images.length} ảnh`}</span>
          <span
            onMouseEnter={() => SetisHoverHeart(true)}
            onMouseLeave={() => SetisHoverHeart(false)}
            onClick={handleClickHeart}
            className="absolute right-5 cursor-pointer bottom-0 w-10 h-10 flex z-10 items-center justify-center"
          >
            {OnClickHeart ? (
              <i className="bg-HEARTFILL bg-center w-[23px] h-[23px] bg-no-repeat inline-block bg-contain"></i>
            ) : isHoverHeart ? (
              <i className="bg-HEARTFILL bg-center w-[23px] h-[23px] bg-no-repeat inline-block bg-contain"></i>
            ) : (
              <i className="bg-NOHEARTFILL bg-center w-[23px] h-[23px] bg-no-repeat inline-block bg-contain"></i>
            )}
        </span>
      </div>}
    <div className="w-3/5">
      <div className="flex justify-between gap-4 w-full">
        <div className="flex items-start">
          <span className="text-[#e13427] font-bold text-base cursor-pointer hover:underline uppercase line-clamp-2">
            {handleStar(star).length > 0 && handleStar(star).map((item,index) =>{
              return <MdOutlineStar key={index} size={18} className="star-item" color="#febb02" />
            })}
            <Link to={`${DETAIL}${normalizedString(title)}/${id}`} className="ml-[3px]">{title && title}</Link>
          </span>
        </div>
        <div className="w-[10%] flex justify-end">
          <BsFillBookmarkStarFill size={24} color="#febb02" />
        </div>
      </div>
      <div className="flex flex-col justify-between my-2 text-base gap-2">
        <div className="flex items-center gap-4">
          <span className="font-bold flex-3 whitespace-nowrap overflow-hidden text-ellipsis text-[#16c784]">{attributes.price}</span>
          <span className="flex-1">{attributes.acreage}</span>
          <span className="flex-3 whitespace-nowrap overflow-hidden text-ellipsis">
            <a>
              {addressData[addressData.length - 2] +
                "," +
                addressData[addressData.length - 1]}
            </a>
          </span>
        </div>
        <div className="flex justify-end text-sm text-[#aaa] leading-5">
          <time>{attributes.published}</time>
        </div>
      </div>
      <div className="mb-3">
        <p className="text-[#8a8d91] w-full h-[70px] overflow-hidden  line-clamp-3">
        {typeof descriptionContent !== `string` ? descriptionContent?.map((item) => {
            return item;
          }) : descriptionContent}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[5px] text-[#8a8d91]">
          <img
            className="w-8 h-8 rounded-[50%]"
            src="https://khoinguonsangtao.vn/wp-content/uploads/2022/07/anh-avatar-facebook-ngau-hot-nhat-hien-nay.jpg"
          ></img>
          <span>{user.name}</span>
        </div>
        <div className="contact-zalo items-center flex gap-[5px]">
          <button
            type="button"
            className="bg-[#1266dd] px-2 py-1 text-sm rounded-md text-white"
          >{`Gọi ${user.phone}`}</button>
          <a href={`https://zalo.me/${user.zalo}`}
            type="button"
            target="_blank"
            className="text-[#1266dd] border border-[#1266dd] px-2 py-1 rounded-md text-sm hover:bg-[#1266dd] hover:text-white"
          >
            Nhắn Zalo
          </a>
        </div>
      </div>
    </div>
  </div> : <div className={`item flex items-start ${isLovePost ? 'p-4' : 'py-4'} border-t bg-white border-[#ea2e9d]`}>
      <div className="w-[25%] relative">
        <Link to={`${DETAIL}${normalizedString(title)}/${id}`} 
          className="w-full flex flex-wrap gap-[2px] items-center cursor-pointer">
          <img
            src={images[0]}
            className="w-[100%] rounded h-[180px] object-cover bg-center"
            alt="priviwe"
          />
        </Link>
        <span className="bg-black bg-opacity-50 text-[#ffffff] absolute bottom-[8px] left-[5px] rounded-sm text-sm px-2 pointer-events-none">{`${images.length} ảnh`}</span>
        <span
          onMouseEnter={() => SetisHoverHeart(true)}
          onMouseLeave={() => SetisHoverHeart(false)}
          onClick={handleClickHeart}
          className="absolute right-0 cursor-pointer bottom-0 w-10 h-10 flex z-10 items-center justify-center"
        >
          {OnClickHeart ? (
            <i className="bg-HEARTFILL bg-center w-[23px] h-[23px] bg-no-repeat inline-block bg-contain"></i>
          ) : isHoverHeart ? (
            <i className="bg-HEARTFILL bg-center w-[23px] h-[23px] bg-no-repeat inline-block bg-contain"></i>
          ) : (
            <i className="bg-NOHEARTFILL bg-center w-[23px] h-[23px] bg-no-repeat inline-block bg-contain"></i>
          )}
        </span>
      </div>
      <div className="w-[75%] ml-4">
        <div className="flex justify-between gap-4 w-full">
          <div className="flex items-start">
            <span className="text-[#ea2e9d] font-bold text-sm cursor-pointer hover:underline uppercase line-clamp-2">
              {handleStar(star).length > 0 && handleStar(star).map((item,index) =>{
                return <MdOutlineStar key={index} size={18} className="star-item" color="#febb02" />
              })}
              <Link to={`${DETAIL}${normalizedString(title)}/${id}`} className="ml-[3px]">{title && title}</Link>
            </span>
          </div>
        </div>
      <div className="flex justify-between my-2 text-base gap-2">
        <div className="flex items-center gap-4 text-sm">
          <span className="font-bold text-[#16c784] text-base">{attributes.price}</span>
          <span>{attributes.acreage}</span>
          <span className="flex-3 whitespace-nowrap overflow-hidden text-ellipsis text-sm">
            <a>
              {addressData[addressData.length - 2] +
                "," +
                addressData[addressData.length - 1]}
            </a>
          </span>
        </div>
        <div className="flex justify-end text-sm text-[#aaa] leading-5">
          <time>{attributes.published}</time>
        </div>
      </div>
      <div className="mb-3">
        <p className="text-[#8a8d91] w-full h-[50px] overflow-hidden line-clamp-2">
          {typeof descriptionContent !== `string` ? descriptionContent?.map((item) => {
            return item;
          }) : descriptionContent}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[5px] text-[#8a8d91]">
          <img
            className="w-8 h-8 rounded-[50%]"
            src="https://khoinguonsangtao.vn/wp-content/uploads/2022/07/anh-avatar-facebook-ngau-hot-nhat-hien-nay.jpg"
          ></img>
          <span>{user.name}</span>
        </div>
      </div>
    </div>
  </div>
  )
};
export default memo(ItemAnList);
