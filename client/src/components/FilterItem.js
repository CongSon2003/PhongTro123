import React ,{memo, useEffect, useState} from 'react';
const FilterItem = ({text,background,textColor,defaultText,IconBefore,IconAfter , fontWeight,})=>{
    return (
        <div className={`bg-white ${textColor ? textColor : 'text-[#777]'} text-sm py-2 px-2 rounded-md border-solid border-[#fff] border-[1px] items-center flex w-[100%] h-[35px] mx-[3px] p-0 cursor-pointer justify-between`}>
            <div className='flex items-center gap-1'>
                {IconBefore && <IconBefore className='mb-[2px]' />}
                <span className={` ${fontWeight && 'font-[700] text-black'} ${text ? 'font-[700] text-black' : ''} overflow-hidden text-ellipsis whitespace-nowrap`}>{text || defaultText}</span>
            </div>
            {IconAfter && <IconAfter />}
        </div>
    )
}
export default memo(FilterItem)