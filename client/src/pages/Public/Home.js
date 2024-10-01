import React, { useState,useEffect } from 'react';
import { Header , SideBar} from '.';
import { Outlet, useLocation} from 'react-router-dom';
import {Search} from './index';
import { Contact, Intro,Footer } from '../../components';
const Home = () => {
  const location = useLocation();
  return (
      <>
      <div className='w-full flex flex-col items-center h-full border-red-500'>
        <Header/>
        <SideBar/>
        {!(location.pathname === '/dang-nhap-tai-khoan' || location.pathname === '/dang-ky-tai-khoan') && <Search/> }
        <div className='w-11/12 lg:w-3/4 flex flex-col justify-start'>
          <Outlet/>
        </div>
        <Intro/>
        <Contact/>
        <Footer/>
      </div>
      </>
  )
}
export default Home
