import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LOGIN_PATH } from '../../constants/path';
import {HeaderSystem,SideBarSystem} from './';
import * as actions from '../../store/actions';
const System = () => {
    const {isLoggedIn} = useSelector(state => state.auth);
    const {postAdmin} = useSelector(state => state.post);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    // useEffect(()=>{
    //     if (location.pathname === '/quan-ly/tin-dang/sua-tin-dang') {
    //         navigate('/khong-tim-thay-trang')
    //     }else{
    //         if (location.pathname.replace(/\/\d+$/, '') === '/quan-ly/tin-dang/sua-tin-dang') {
    //             let codePost = location.pathname.match(/\d+/)[0];
    //             if (+postAdmin.length > 0) {
    //                 const isCheck = postAdmin?.find(item => item.overviewData?.code.replace(/#/g, '') === codePost)
    //                 if (!isCheck) {
    //                     navigate('/khong-tim-thay-trang')
    //                 }
    //             }
    //         }
    //     }
    // },[postAdmin]);
    // useEffect(()=>{
    //     if ((location.pathname !== '/quan-ly/tin-dang' && location.pathname !== '/quan-ly/dang-tin-moi' && location.pathname.replace(/\/\d+$/, '') !== '/quan-ly/tin-dang/sua-tin-dang')) {
    //         navigate('/khong-tim-thay-trang')
    //     }
    //     dispatch(actions.getPostsLimitAmin());
    // },[])
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