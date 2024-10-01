import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import * as actions from '../../store/actions'
const HeaderSystem = () => {
    const dispatch = useDispatch()
    const {categories} = useSelector(state => state?.app)
    useEffect(()=>{
      dispatch(actions.getCategories())
    },[])
    return (
        <nav className='bg-[#055699] h-[45px] flex items-center fixed right-0 left-0 top-0 z-20 navbar-system'>
            <a className='px-[15px] font-bold w-[22%] text-white text-[1.1rem]'>Phongtro123.com</a>
            <div className='w-full text-white text-sm'>
                <ul className='flex items-center gap-4'>
                    <li className='hover:text-[#ffc107] cursor-pointer'><a href='/'>Trang chủ</a></li>
                    {categories.map(item =>{
                        return <li className='hover:text-[#ffc107] cursor-pointer' key={item.code}><a>{item?.value}</a></li>
                    })}
                
                </ul>
            </div>
        </nav>
    )
}

export default HeaderSystem