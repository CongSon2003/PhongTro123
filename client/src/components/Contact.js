import React from 'react'
import { text } from '../unltils/dataContact'
import { Link } from 'react-router-dom'
import {getNumberInString} from '../constants/function/formatVietnam'
const {supportItem,title} = text;
const Contact = () => {
  return (
    <div className='w-11/12 lg:w-3/4 p-[30px] mt-[15px] rounded-lg bg-[#fff] border-[7px] border-dashed border-[#e8eefc]'>
        <div className='text-center'>
          <div className='bg-SUPPORT_IMAGE h-[150px] bg-center bg-no-repeat bg-contain'></div>
          <div className='mt-[30px] px-3 text-center'>
            <div className='mb-[20px]'>{title}</div>
            <div className='items-center flex justify-around'>
              {supportItem.length > 0 && supportItem.map((item,index)=>{
                return (
                  <div key={index} className='w-[25%] flex flex-col float-left' >
                    <span className='mb-2 text-[#f60] font-bold text-sm'>{item.ItemTitle}</span>
                    <Link className=' text-[#233762] text-xl font-bold'>{item.ItemPhone}</Link>
                    <Link to={`https://zalo.me/0${getNumberInString(item.ItemZalo)}`} className='text-[#233762] text-xl font-bold'>{item.ItemZalo}</Link>
                  </div>
                )
              })}
              <button className='bg-[#3961fb] float-start text-[#fff] py-[10px] px-[30px] text-sm font-bold rounded-md hover:underline'>Gửi liên hệ</button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Contact