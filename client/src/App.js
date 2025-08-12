/* eslint-disable react-hooks/exhaustive-deps */
import { Route , Routes } from 'react-router-dom';
import { Home , Loggin ,Register,Rental,DetailPost,Homepage, SearchDetail, Contact, LovePost, Block} from './pages/Public';
import {CHOTHUEPHONGTRO_PATH, HOME_PATH ,DETAIL_POST__TITLE__POSTID, LOGIN_PATH ,REGISTER_PATH,CHOTHUECAHO_PATH,CHOTHUEMATBANG_PATH,NHACHOTHUE_PATH, SEARCH_PATH, MANAGER, CREATE_POST, UPDATE_POST, POST, REPOST, MANAGE_INFO, CONTACT, DETAIL_ALL, PAYMENT, DEPOSIT_HISTORY, LOVE_POST, BLOCK } from './constants/path';
import { CreatePost, ManagerPost, Post, System,ManageInfo, Payment, DepositHistory } from './pages/Systems';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import * as acitions from './store/actions';
import UpdatePost from './pages/Systems/UpdatePost';
function App() {
  const dispatch = useDispatch();
  const {isLoggedIn} = useSelector(state => state.auth);
  useEffect(()=>{
    setTimeout(()=>{
      isLoggedIn && dispatch(acitions.getUser())
    },1000)
  },[isLoggedIn]);
  useEffect(()=>{
    dispatch(acitions.getAcreage())
    dispatch(acitions.getPrice())
    dispatch(acitions.getProvinces())
  },[])
  return (
    <div className='bg-primary'>
      <Routes>
        <Route path={HOME_PATH} element={<Home/>}>
          <Route path= '/*' element={<Homepage/>}/>
          <Route path={LOGIN_PATH} element={<Loggin/>}/>
          <Route path={REGISTER_PATH} element={<Register/>}/>
          <Route path={CHOTHUEPHONGTRO_PATH} element = {<Rental/>}/>
          <Route path={CHOTHUECAHO_PATH} element = {<Rental/>}/>
          <Route path={CHOTHUEMATBANG_PATH} element = {<Rental/>}/>
          <Route path={NHACHOTHUE_PATH} element = {<Rental/>}/>
          <Route path={DETAIL_POST__TITLE__POSTID} element = {<DetailPost/>}/>
          <Route path={DETAIL_ALL} element={<DetailPost/>}/>
          <Route path={SEARCH_PATH} element={<SearchDetail/>}/>
          <Route path={CONTACT} element = {<Contact/>}/>
          <Route path={LOVE_POST} element = {<LovePost/>}/>
          <Route path={BLOCK} element = {<Block/>}></Route>
        </Route>
        <Route path={MANAGER} element={<System/>}>
          <Route path={CREATE_POST} element={<CreatePost/>}/>
          <Route path={PAYMENT} element = {<Payment/>}/>
          <Route path={DEPOSIT_HISTORY} element = {<DepositHistory/>}/>
          <Route path={MANAGE_INFO} element={<ManageInfo/>}/>
          <Route path={POST} element={<Post/>}>
            <Route index element={<ManagerPost/>} />
            <Route path={REPOST} element={<UpdatePost/>} />
            <Route path={UPDATE_POST} element={<UpdatePost/>}/>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
