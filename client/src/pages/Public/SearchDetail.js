
import React, { useEffect, useState} from 'react'
import {Search} from './index'
import {FilterItem, ItemSideBar, RelatedBox} from "../../components";
import {text} from '../../constants/path' ;
import TopLocation from './TopLocation';
import ListContent from './ListContent'; 
import Pagination from './Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
const SearchDetail = () => {
  const Location = useLocation();
  const {prices,acreages,categories} = useSelector(state => state.app);
  return (
    <div className='w-full flex flex-col gap-3'>
      <div className='mb-2'>
        <h1 className='text-center text-[1.8rem] leading-5 mb-[10px] font-bold float-left'>
          {Location?.state?.TextTitle_Search || 'Tìm kiếm chỗ thuê ưng ý'}
        </h1>
        <p className='text-sm text-[#65676b] leading-6 m-0 font-normal float-left'>
        Cho thuê phòng trọ - Kênh thông tin số 1 về phòng trọ giá rẻ, phòng trọ sinh viên, phòng trọ cao cấp mới nhất năm 2024. Tất cả nhà trọ cho thuê giá tốt nhất tại Việt Nam.
        </p>
      </div>
      <TopLocation/>
      <div className='w-full flex gap-4'>
        <div className='left w-[70%]'>
          <ListContent/>
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

export default SearchDetail