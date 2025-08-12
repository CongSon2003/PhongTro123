import React from 'react'
import {FilterItem, ItemSideBar, RelatedBox} from "../../components";
import {text} from '../../constants/path' ;
import TopLocation from './TopLocation';
import ListContent from './ListContent'; 
import Pagination from './Pagination';
import { useSelector } from 'react-redux';
const Homepage = () => {
  const {categories,prices,acreages,provinces} = useSelector(state => state.app);
  return (
    <div className='w-full flex flex-col gap-3 mb-[30px]'>
      <div className='mb-2'>
        <h1 className='text-center text-[1.8rem] leading-5 mb-[10px] font-bold'>
          {text.HOME_TEXT}
        </h1>
        <p className='text-sm text-[#65676b] leading-6 m-0 font-normal'>{text.HOME_DESCRIPTION}</p>
      </div>
      <TopLocation/>
      <div className='w-full flex gap-4'>
        <div className='left w-[70%]'>
          <ListContent />
          <Pagination/>
        </div>
        <div className='right w-[30%] gap-5 flex flex-col items-center justify-start'>
          <ItemSideBar title = 'Xem theo giá' content={prices} isDouble type={'priceCode'}/>
          <ItemSideBar title = 'Xem theo diện tích' content={acreages} isDouble type={'acreageCode'}/>
          <ItemSideBar title = 'Danh mục cho thuê' content={categories}/>
          <RelatedBox isnewPost={true}/>
          <RelatedBox isnewPost={false}/>
        </div>
      </div>
    </div>
  )
}
export default Homepage
