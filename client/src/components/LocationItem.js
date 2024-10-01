import React, {memo} from 'react'
const LocationItem = ({background,text}) =>{
    return (
        <div className='flex flex-col location-item w-[220px] bg-white rounded-xl shadow-md overflow-hidden'>
            <div className={`${background && background} bg-center bg-cover bg-no-repeat w-full h-[110px]`}>
            </div>
            <span className='py-3 px-3 text-[#1266dd] text-sm font-bold'>{text}</span>
        </div>
    )
}
export default LocationItem