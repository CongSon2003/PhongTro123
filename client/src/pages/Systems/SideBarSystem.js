import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { Button } from '../../components';
import { NavLink, useNavigate } from 'react-router-dom';
import icons from '../../unltils/icon';
import menuSideBar from '../../unltils/sideBarMenu';
import * as actions from '../../store/actions';
const activeStyle = 'py-[10px] px-[10px] border-b border-solid text-sm font-bold flex gap-[10px] hover:bg-[#eee] cursor-pointer';
const notActiveSyle = 'py-[10px] px-[10px] border-b border-solid text-sm flex gap-[10px] hover:bg-[#eee] cursor-pointer';
const {IoIosLogOut} = icons;
const SideBarSystem = () => {
    const {user} = useSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const NextPathButton = () =>{
        navigate('/quan-ly/dang-tin-moi')
    };
    const handleLogout = () => {
        dispatch(actions.logout);
    };
    return (
        <div className='w-[18%] p-4 overflow-y-auto overflow-x-hidden fixed left-0 bottom-0 top-[45px] flex flex-col bg-[#f8f9fb] gap-6 border-r border-solid border-[#e6e6e6]'>
            <div className='flex flex-col gap-3'>
                <div className='flex items-center'>
                    <div><img
                        className="w-[50px] h-[50px] mr-2 rounded-full object-cover"
                        src={user?.fburl || "https://phongtro123.com/images/default-user.png"}
                        alt='avatar'
                        ></img>
                    </div>
                    <div className='flex flex-col'>
                        <span className='font-bold text-[1.1rem] text-ellipsis overflow-hidden'>{user?.name}</span>
                        <span className='text-[0.9rem] text-[#555]'>{user?.phone}</span>
                    </div>
                </div>
                <div className='flex flex-col text-sm '>
                    <span>Mã thành viên:{" "}<strong>{user?.id?.replace(/[^\d]/g, '')?.slice(0,6)}</strong></span>
                    <span>TK Chính:<strong>{" "}0</strong></span>
                </div>
                <div className='text-sm flex gap-3'>
                    <Button text={'Nạp tiền'} py={'py-[4px]'} px={'px-[7px]'} bgColor={'bg-[#ffc107]'}/>
                    <Button text={'Đăng tin'} onClick={() => NextPathButton()} texColor={'text-white'} py={'py-[4px]'} px={'px-[7px]'} bgColor={'bg-[#dc3545]'}/>
                </div>
            </div>
            <div className='bg-[#fff9e6] p-3'>
                <span className='block text-sm'>Nhân viên hỗ trợ riêng của bạn:</span>
                <span className='block font-bold text-sm'>Thanh Ly - LBKCorp</span>
                <span className='block font-bold text-sm'>0901424123</span>
            </div>
            <div className='ml-[-10px]'>
                <ul>
                    {menuSideBar.map((item, index) => {
                        return (
                        <li key={index}><NavLink
                            className={({isActive}) => isActive ? activeStyle : notActiveSyle}
                            to={item?.path}
                        >
                            {item?.icon}
                        <span>{item?.text}</span>
                        </NavLink></li>
                        );
                    })}
                    <li>
                        <NavLink
                            onClick={() => handleLogout()}
                            className={notActiveSyle}
                        >
                            <IoIosLogOut size={17}/>
                            <span>Đăng xuất</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SideBarSystem