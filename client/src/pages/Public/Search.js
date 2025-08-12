import React, { useCallback, useEffect, useState } from 'react'
import {FilterItem, Model} from "../../components"
import icon from '../../unltils/icon'
import { useSelector } from 'react-redux';
import {SEARCH_PATH} from '../../constants/path';
import { createSearchParams,useLocation,useNavigate } from 'react-router-dom';
const {GrNext,IoSearch,PiBuildingApartmentLight,IoPricetagsOutline,TbVectorOff,TfiLocationPin,FaDeleteLeft} = icon
const Search = () => {
  const {provinces,acreages,prices,categories} = useSelector(state => state.app);
  const [isShowModel,SetIsShowModel] = useState(false);
  const [content,SetContent] = useState([]);
  const [titleModel,SettitleModel] = useState('');
  const [defaultText,SetDefaultText] = useState('');
  const [defaultProvince,SetdefaultProvince] = useState('Toàn quốc');
  const [name,SetName] = useState('');
  const [queries,Setqueries] = useState({});
  const [arrFilter,SetArrFilter] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(()=>{
    const defaultP = location.search.toString().split('=')[1];
    if (defaultP) {
      const ProviceText = provinces.find(item => item.code === defaultP)?.value;
      ProviceText && SetdefaultProvince(ProviceText);
    }

    if (!location.pathname.includes(SEARCH_PATH)) {
      SetArrFilter({})
      Setqueries({})
    }
  },[location])
  const handleClickModel = (content,titlename,name ,defaultText) =>{
    SetContent(content);
    SettitleModel(titlename);
    SetIsShowModel(true);
    SetDefaultText(defaultText);
    SetName(name);
  }
  const handleSubmit = useCallback((e,CodeValue,arrFilter)=>{
    e.stopPropagation();
    arrFilter && SetArrFilter(prev => ({...prev,...arrFilter}))
    Setqueries(prev => ({...prev,...CodeValue}));
    SetIsShowModel(false);
  },[isShowModel,queries]);
  const handleSearch = () =>{
    const queryCodes = Object.entries(queries).filter(item => item[0].includes('Number') || item[0].includes('Code')).filter(item => item[1]);
    const queryCodesObj = {};
    queryCodes.forEach(item => {
      queryCodesObj[item[0]] = item[1];
    })
    let queryText = Object.entries(queries).filter(item => !item[0].includes('Code') || !item[0].includes('Number'));
    let queryTextObj = {}
    queryText.forEach(item => {queryTextObj[item[0]] = item[1]});
    let TextTitle_Search = `${queryTextObj.category ? queryTextObj.category : 'Cho thuê Phòng trọ'} ${queryTextObj.province ? `Tỉnh ${queryTextObj.province}` : ``} ${queryTextObj.price_contentFilter ? `Giá từ ${queryTextObj.price_contentFilter}` : ''}${queryTextObj.acreage_contentFilter ? `${Object.keys(queryTextObj).length === 1 ? `Diện tích từ ${queryTextObj.acreage_contentFilter}` : `, Diện tích từ ${queryTextObj.acreage_contentFilter}`}` : ``}`;
    if (Object.keys(queryTextObj).length > 0) {
      navigate({
        pathname : SEARCH_PATH,
        search : createSearchParams(queryCodesObj).toString(),
      },{state: {TextTitle_Search}})
    }
  }
  return (
    <>
      <div className='mb-[20px] p-[10px] lg:w-3/4 my-3 bg-secondary3 rounded-lg flex-col lg:flex-row flex content-center items-center gap-2'>
        <span onClick={()=>handleClickModel(categories,'CHỌN LOẠI BẤT ĐỘNG SẢN','category','Phòng trọ, nhà trọ')} className='flex-1 filter-top'>
          <FilterItem text = {queries['category']} defaultText = {'Phòng trọ, nhà trọ'} background={'bg-white'} fontWeight IconBefore={PiBuildingApartmentLight} IconAfter={FaDeleteLeft}/>
        </span>
        <span onClick={()=>handleClickModel(provinces,'CHỌN TỈNH THÀNH','province','Toàn quốc')} className='flex-1 filter-top'>
          <FilterItem text = {queries['province'] } defaultText = {defaultProvince} background={'bg-white'} IconAfter={GrNext} IconBefore={TfiLocationPin}/>
        </span>
        <span onClick={()=>handleClickModel(prices,'CHỌN GIÁ','price','Chọn giá')} className='flex-1 filter-top'>
          <FilterItem text={queries['price_contentFilter']} defaultText = {'Chọn giá'} background={'bg-white'} IconAfter={GrNext} IconBefore={IoPricetagsOutline}/>
        </span>
        <span onClick={()=>handleClickModel(acreages,'CHỌN DIỆN TÍCH','acreage','Chọn diện tích')} className='flex-1 filter-top'>
          <FilterItem text={queries['acreage_contentFilter']} defaultText = {'Chọn diện tích'} background={'bg-white'} IconAfter={GrNext} IconBefore={TbVectorOff}/>
        </span>
        <span className='flex-1 filter-top'>
          <button type='button' onClick={handleSearch} className='text-sm font-bold text-white flex justify-center gap-2 py-2 px-2 bg-[#0070c2] rounded-md border-solid border-[#0070c2] border-[1px] w-[100%] h-[35px] mx-[3px] p-0 cursor-pointer'>
            <span>
              <IoSearch size={18}/>
            </span>
            <span>
              Tìm Kiếm
            </span>
          </button>
        </span>
      </div>
      {isShowModel && <Model defaultText={defaultText} queries={queries} arrFilter={arrFilter} name={name} titleModel={titleModel} handleSubmit={handleSubmit} content={content} SetIsShowModel={SetIsShowModel}/>}
    </>
  )
}
export default Search