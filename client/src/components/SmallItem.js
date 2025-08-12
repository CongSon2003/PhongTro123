import React from 'react'
import moment from 'moment';
import 'moment/locale/vi';
import { useSelector } from 'react-redux';
import { MdOutlineStar } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { normalizedString } from '../constants/function/formatVietnam';
import { DETAIL } from '../constants/path';
const SmallItem = ({title,price,image,time,priceNumber,isnewPost,star,id}) => {
  const {posts} = useSelector(state => state?.post);
  const handleStar = (star) =>{
    let Stars = []
    for (let index = 0; index < parseInt(star); index++) {
      Stars.push(index)
    }
    return Stars
  }
  return (
    <Link to={`${DETAIL}${normalizedString(title)}/${id}`} >
      <div className='flex w-full gap-[10px] py-[10px] border-b border-solid border-[#eee]'>
        <div className={isnewPost == false ? `w-[80px] h-[80px]` : 'w-[65px] h-[65px]'}><img className='w-full h-full rounded object-cover' src={image[0]}></img></div>
        <div className='text-sm w-[70%] flex flex-col justify-between'>
            <div>
              {!isnewPost && (handleStar(star).length > 0 && posts && posts.length > 0) && handleStar(star).map((item,index) =>{
                return <MdOutlineStar key={index} size={18} className="star-item mt-[1px]" color="#febb02" />
              })}
              <p className={`${isnewPost ? 'text-[#055699]' : 'text-red-500'} overflow-hidden line-clamp-2 text-ellipsis whitespace-normal`}>{title}</p>
            </div>
            <div className='flex justify-between'>
                <span className='font-bold text-[#16c784]'>{priceNumber < 1 ? `${priceNumber * 1000} nghìn/tháng` : price}</span>
                <span className='text-[#aaa]'>{moment(time).fromNow()}</span>
            </div>
        </div>
      </div>
    </Link>
  )
}

export default SmallItem