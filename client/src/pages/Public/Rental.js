import React, { useEffect, useState} from 'react'
import {Search} from './index'
import {FilterItem, ItemSideBar, RelatedBox} from "../../components";
import {text} from '../../constants/path' ;
import TopLocation from './TopLocation';
import ListContent from './ListContent'; 
import Pagination from './Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {normalizedString} from '../../constants/function/formatVietnam'
const Rental= () => {
  const Location = useLocation();
  const {prices,acreages,categories} = useSelector(state => state.app);
  const [categoryCurrent,SetCategoryCurrent] = useState('');
  const [categoryCode,SetCategoryCode] = useState('none');
  useEffect(()=>{
    const category = categories?.find(item => `/${normalizedString(item.value)}` === Location.pathname);
    SetCategoryCurrent(category)
    if (category) {
      SetCategoryCode(category.code)
    }
  },[Location]);
  return (
    <div className='w-full flex flex-col gap-3'>
      <div className='mb-2'>
        <h1 className='text-center text-[1.8rem] leading-5 mb-[10px] font-bold float-left'>
          {categoryCurrent?.header}
        </h1>
        <p className='text-base text-[#65676b] leading-6 m-0 font-normal float-left'>
        {categoryCurrent?.subheader}
        </p>
      </div>
      <TopLocation/>
      <div className='w-full flex gap-4'>
        <div className='left w-[70%]'>
          <ListContent categoryCode = {categoryCode}/>
          <Pagination/>
        </div>
        <div className='right w-[30%] gap-5 flex flex-col items-center justify-start'>
          <ItemSideBar title = 'Xem theo giá' content={prices} isDouble type={'priceCode'}/>
          <ItemSideBar title = 'Xem theo diện tích' content={acreages} isDouble type={'acreageCode'}/>
          <RelatedBox/>
        </div>
      </div>
    </div>
  )
}
export default Rental