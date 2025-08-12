import React, { useEffect, useState } from 'react'
import {SmallItem} from '../components';
import * as actions from '../store/actions'
import { useDispatch, useSelector } from 'react-redux';
const RelatedBox = ({isnewPost}) => {
  const dispatch = useDispatch();
  const {NewPosts,OustandingPosts} = useSelector(state => state.post);
  useEffect(()=>{
    isnewPost ? dispatch(actions.getNewPosts()) : dispatch(actions.getOutstandingPosts());
  },[]);
  return (
    <div className={`w-full p-[20px] bg-white border border-solid border-[#dedede] rounded-lg`}>
        <div className='mb-4'>
          <h3 className='text-lg font-semibold'>{isnewPost ? 'Tin mới đăng' : 'Tin đăng nổi bật'}</h3>
        </div>
        <div className='flex flex-col'>
          {isnewPost ? NewPosts?.length > 0 && NewPosts?.map((item,index)=>{
            return (
            <SmallItem 
              key={item?.id || index} 
              title={item?.title} 
              image={JSON.parse(item?.imagesData?.images)} 
              price={item?.attributesData?.price}
              time={item?.createdAt}
              id = {item?.id}
              isnewPost = {isnewPost}
            />)
          }) : (OustandingPosts?.rows?.length || OustandingPosts) > 0 && OustandingPosts?.rows.map((item,index)=>{
            return (
              <SmallItem 
              key={item?.id || index} 
              title={item?.title} 
              image={JSON.parse(item?.imagesData?.images)} 
              price={item?.attributesData?.price}
              time={item?.createdAt}
              star = {item?.star}
              id = {item?.id}
              priceNumber = {item?.priceNumber}
              isnewPost = {isnewPost}
            />
            )
          })}
        </div>
    </div>
  )
}

export default RelatedBox