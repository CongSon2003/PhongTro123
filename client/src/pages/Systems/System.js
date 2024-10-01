import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';
import { LOGIN_PATH } from '../../constants/path';
import {HeaderSystem,SideBarSystem} from './'
const System = () => {
    const {isLoggedIn} = useSelector(state => state.auth);
    if (!isLoggedIn) {
        return <Navigate to={`/${LOGIN_PATH}`} replace = {true}/>
    }
    return (
        <div className='w-full h-full flex flex-col bg-white'>
            <HeaderSystem/>
            <div className='flex justify-end h-full'>
                <SideBarSystem/>
                <div className='w-[82%] pt-[60px] pl-[2.7rem] pr-[2.7rem] pb-[3rem]'>
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default System