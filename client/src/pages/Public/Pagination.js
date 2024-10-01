import { useSelector } from 'react-redux'
import {PageNumber} from '../../components'
import React, { useEffect, useState } from 'react'
import icons from '../../unltils/icon';
import { useSearchParams } from 'react-router-dom';
import { max } from 'moment';
const Pagination = () => {
  const {posts,count} = useSelector(state => state.post);
  const [arrPage,setArrPage] = useState([]);
  const [currentPage,SetCurrentPage] = useState(1);
  const [searchParams] = useSearchParams();
  const [isHideNextpage,SetIsHideNextpage] = useState(false);
  const [isHideAfterpage,SetIsHideAfterpage] = useState(false);
  const [isHideEndpage,SetIsHideEndpage] = useState(false);
  const [isHideStartpage,SetIsHideStartpage] = useState(false);
  const [isHideVariousLeftpage,SetIsHideVariousLeftpage] = useState(false);
  const [isHideVariousRightpage,SetIsHideVariousRightpage] = useState(false);
  const LengthPost = Object.keys(posts).length;
  useEffect(()=>{
    let page = searchParams.get('page');
    page && parseInt(page) !== currentPage && SetCurrentPage(parseInt(page))
    !page && SetCurrentPage(1)
  },[searchParams])
  useEffect(()=>{
    let maxPage = Math.ceil(count / process.env.REACT_APP_LIMIT_POSTS);
    let end = (currentPage + 2) > maxPage ? maxPage : (currentPage + 2);
    let start = (currentPage - 2) <= 0 ? 1 : (currentPage - 2)
    let template = [];
    for (let index = start; index <= end; index++) {
      template.push(index);
    }
    setArrPage(template)
    if (currentPage === maxPage || LengthPost === 0) {
      SetIsHideNextpage(true)
    } else {
      SetIsHideNextpage(false)
    }
    if (currentPage > start) {
      SetIsHideAfterpage(true);
    }else{
      SetIsHideAfterpage(false)
    }
    if (currentPage < maxPage - 1) {
      SetIsHideEndpage(true)
    } else {
      SetIsHideEndpage(false)
    }
    if (currentPage >= 4) {
      SetIsHideStartpage(true);
    } else {
      SetIsHideStartpage(false);
    }
    if (currentPage > 4) {
      SetIsHideVariousLeftpage(true)
    } else {
      SetIsHideVariousLeftpage(false)
    }
    if (currentPage < (maxPage - 2)) {
      SetIsHideVariousRightpage(true)
    } else {
      SetIsHideVariousRightpage(false)
    }
  },[count,posts,currentPage])
  return (
    <div className='flex items-center justify-center gap-1 text-sm pt-5 pb-12'>
      {isHideAfterpage && <PageNumber number={'« Trang trước'} type='after'/>}
      {isHideStartpage && <PageNumber number={1} type='start' />}
      {isHideVariousLeftpage && <PageNumber number={'...'} />}
      {arrPage.length > 0 && arrPage.map((item,index)=> {
        return (
          <PageNumber 
          number={item} 
          key={index} 
          cursorPointer 
          currentPage={currentPage}
          setCurrentPage = {SetCurrentPage}
          />
        )
      })}
      {isHideVariousRightpage && <PageNumber number={'...'} />}
      {isHideEndpage && <PageNumber number={'»»'} type = 'end'/>}
      {!isHideNextpage && <PageNumber number={'Trang sau »'} cursorPointer type = 'next'/>}
    </div>
  )
}

export default Pagination