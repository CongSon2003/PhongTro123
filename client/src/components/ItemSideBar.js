import React, { memo, useEffect } from 'react'
import icons from '../unltils/icon';
import { Link } from 'react-router-dom';
import { normalizedString } from '../constants/function/formatVietnam';
import * as actions from '../store/actions';
import { createSearchParams,useLocation,useNavigate } from 'react-router-dom';
let {FaAngleRight} = icons
const ItemSideBar = ({page,title,content,isDouble,type}) => {
  const location = useLocation();
  const Navigate = useNavigate();
  const handleFilterPost = (code)=>{
    Navigate({
      pathname : location.pathname,
      search : createSearchParams({
        [type] : code
      }).toString()
    })
  }
  
  return (
    <div className='p-5 bg-white border border-solid border-[#dedede] rounded-lg w-full'>
        <div className='mt-0 mb-4'>
            <h3 className='text-lg font-semibold'>{`${title}`}</h3>
        </div>
        {!isDouble && <div>
            {content?.length > 0 && content.map((item,index) => {
              return <Link to={`${normalizedString(item.value)}`} key={index} className={`flex text-sm gap-2 items-center cursor-pointer ${(index + 1) === content.length ? '' : 'border-b border-dashed border-[#eee]'}`}>
                <FaAngleRight opacity={.3}/>
                <p className='py-1 hover:text-[#f60] '>{item.value}</p>
              </Link>
            })}
        </div>
        }
        {isDouble && <div>
            {content?.length > 0 && content.map((item,index) => {
              return <span
              onClick={() => handleFilterPost(item.code)} 
              key={index} 
              className={`flex w-1/2 float-left text-sm gap-2 items-center cursor-pointer ${(index + 1) === content.length ? '' : 'border-b border-dashed border-[#eee]'}`}>
                <FaAngleRight opacity={.3}/>
                <p className='py-1 hover:text-[#f60] '>{item.value}{type === 'acreageCode' ? <sub className='top-[-.5rem]'>2</sub> : ''}</p>
              </span>
            })}
        </div>}
    </div>
  )
}
export default memo(ItemSideBar)
