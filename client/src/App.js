import { Route , Routes } from 'react-router-dom';
import { Home , Loggin ,Register,Rental,DetailPost,Homepage, SearchDetail} from './pages/Public';
import {CHOTHUEPHONGTRO_PATH, HOME_PATH__PAGE, HOME_PATH ,DETAIL_POST__TITLE__POSTID, LOGIN_PATH ,REGISTER_PATH,CHOTHUECAHO_PATH,CHOTHUEMATBANG_PATH,NHACHOTHUE_PATH, SEARCH_PATH, MANAGER, CREATE_POST, MANAGER_POST } from './constants/path';
import { CreatePost, ManagerPost, System } from './pages/Systems';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import * as acitions from './store/actions';
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
          <Route path= '*' element={<Homepage/>}/>
          <Route path={LOGIN_PATH} element={<Loggin/>}/>
          <Route path={REGISTER_PATH} element={<Register/>}/>
          <Route path={CHOTHUEPHONGTRO_PATH} element = {<Rental/>}/>
          <Route path={CHOTHUECAHO_PATH} element = {<Rental/>}/>
          <Route path={CHOTHUEMATBANG_PATH} element = {<Rental/>}/>
          <Route path={NHACHOTHUE_PATH} element = {<Rental/>}/>
          <Route path={DETAIL_POST__TITLE__POSTID} element = {<DetailPost/>}/>
          <Route path={SEARCH_PATH} element={<SearchDetail/>}/>
        </Route>
        <Route path={MANAGER} element={<System/>}>
          <Route path={CREATE_POST} element={<CreatePost/>}/>
          <Route path={MANAGER_POST} element={<ManagerPost/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
