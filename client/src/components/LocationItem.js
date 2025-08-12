import React, {memo} from 'react'
import { createSearchParams,useLocation,useNavigate } from 'react-router-dom';
import { SEARCH_PATH } from '../constants/path';
const LocationItem = ({background,text,provinceData}) =>{
    const navigate = useNavigate();
    const location = useLocation();
    const handleNavigate = () =>{
        const provinceCode = {provinceCode : provinceData.provinceCode};
        const TextTitle_Search = `Cho Thuê Phòng Trọ ${provinceData.province}, Giá Rẻ, Tiện Nghi, Mới Nhất 2024`;
        if (location.pathname === '/') {
            navigate({
                pathname : SEARCH_PATH,
                search : createSearchParams(provinceCode).toString(),
            },{state: {TextTitle_Search}})
        }else{
            navigate({
                pathname : '/tim-kiem',
                search : createSearchParams(provinceCode).toString(),
            },{state: {TextTitle_Search}})
        }
    }
    return (
        <div onClick={handleNavigate} className='flex flex-col location-item w-[220px] bg-white rounded-xl shadow-md overflow-hidden'>
            <div className={`${background && background} bg-center bg-cover bg-no-repeat w-full h-[110px]`}>
            </div>
            <span className='py-3 px-3 text-[#1266dd] text-sm font-bold'>{text}</span>
        </div>
    )
}
export default LocationItem