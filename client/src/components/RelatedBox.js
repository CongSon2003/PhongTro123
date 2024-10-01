import React, { useEffect } from 'react'
import {SmallItem} from '../components';
import * as actions from '../store/actions'
import { useDispatch, useSelector } from 'react-redux';
const RelatedBox = () => {
  const dispatch = useDispatch();
  const {NewPosts} = useSelector(state => state.post);
  useEffect(()=>{
    dispatch(actions.getNewPosts());
  },[])
  return (
    <div className='w-full p-[20px] bg-white border border-solid border-[#dedede] rounded-lg'>
        <div className='mb-4'>
            <h3 className='text-lg font-semibold'>Tin mới đăng</h3>
        </div>
        <div className='flex flex-col'>
          {NewPosts?.length > 0 && NewPosts?.map((item,index)=>{
            return (
            <SmallItem 
              key={item?.id || index} 
              title={item?.title} 
              image={JSON.parse(item?.imagesData?.images)} 
              price={item?.attributesData?.price}
              time={item?.createdAt}
            />)
          })}
        </div>
    </div>
  )
}

export default RelatedBox