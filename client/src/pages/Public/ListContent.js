import React, { useRef, useEffect, useState } from 'react';
import { Button, ItemAtList} from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts,getPostsLimit} from '../../store/actions/post';
import { useSearchParams } from 'react-router-dom';
const ListContent= ({categoryCode}) => {
  const {posts,count} = useSelector(state => state.post);
  let [searchParams, setSearchParams] = useSearchParams();
  let [sort,Setsort] = useState(0);
  const dispatch = useDispatch();
  useEffect(()=>{
    let param = [];
    for (const entry of searchParams.entries()) {
      param.push(entry)
    }
    let searchParamsObject = {};
    param?.forEach(i => {
      if (Object.keys(searchParamsObject)?.some(item => item === i[0])) {
        searchParamsObject[i[0]] = [...searchParamsObject[i[0]],i[1]]
      }else{
        searchParamsObject = {...searchParamsObject,[i[0]] : [i[1]]}
      }
    });
    if(categoryCode){
      searchParamsObject.categoryCode = categoryCode
    }
    if (sort === 1) {
      searchParamsObject.order = ['createdAt','DESC'];
    }
    dispatch(getPostsLimit(searchParamsObject));
  },[searchParams,categoryCode,sort]);
  let sortStar = posts.sort((a,b) => b.star - a.star);
  return (
    <div className='rounded-md border p-5 bg-white'>
        <div className='flex justify-between items-center mb-4'>
          <h4 className='text-xl font-semibold'>Danh sách tin đăng</h4>
          <span className='text-sm'>Cập nhật: 12:00 07/04/2024</span>
        </div>
        <div className='flex items-center gap-2 my-2'>
            <span className='text-sm'>Sắp xếp:</span>
            <span onClick={() => Setsort(0)} className={`bg-[#f1f1f1] ${sort === 0 && 'underline'} text-sm py-[5px] px-[10px] rounded-md cursor-pointer hover:underline`}>Mặc định</span>
            <span onClick={() => Setsort(1)} className={`bg-[#f1f1f1] ${sort === 1 && 'underline'} text-sm py-[5px] px-[10px] rounded-md cursor-pointer hover:underline`}>Mới nhất</span>
        </div>
        <div>
          <div className='flex flex-col gap-[1px]'>
            {(sortStar?.length) > 0 && sortStar?.map(item => {
              return (
                <ItemAtList 
                  title={item?.title} 
                  key={item?.id} 
                  address={item?.address} 
                  attributes = {item?.attributesData}
                  description = {item?.description}
                  images={JSON.parse(item?.imagesData.images)}
                  star = {+item?.star}
                  user = {item?.userData}
                  id = {item?.id}
                />
              )})}
          </div>
        </div>
    </div>
  )
}

export default ListContent