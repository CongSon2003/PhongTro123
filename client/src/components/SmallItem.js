import React from 'react'
import moment from 'moment';
import 'moment/locale/vi';
const SmallItem = ({title,price,image,time}) => {
  
  return (
    <div className='flex w-full gap-[15px] py-[10px] border-b border-solid border-[#eee]'>
        <div className='w-[65px] h-[65px]'><img className='w-full h-full rounded object-cover' src={image[0]}></img></div>
        <div className='text-sm w-[70%] flex flex-col justify-between'>
            <p className='text-[#055699] overflow-hidden line-clamp-2 text-ellipsis whitespace-normal'>{title}</p>
            <div className='flex justify-between'>
                <span className='font-bold text-[#16c784]'>{price}</span>
                <span className='text-[#aaa]'>{moment(time).fromNow()}</span>
            </div>
        </div>
    </div>
  )
}

export default SmallItem