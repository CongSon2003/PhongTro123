import React ,{useEffect,useState} from "react";
import {NavLink,useLocation} from 'react-router-dom';
import { useDispatch,useSelector } from "react-redux";
import * as acitions from "../../store/actions";
import {normalizedString} from '../../constants/function/formatVietnam'
const notActive = 'hover:bg-secondary2 px-3 h-full flex items-center bg-secondary1 font-bold'
const active = 'hover:bg-secondary2 px-3 h-full flex items-center bg-secondary2 font-bold'
export default function SideBar(){
    const location = useLocation();
    const dispatch = useDispatch()
    const {categories} = useSelector(state => state.app)
    useEffect(()=>{
      dispatch(acitions.getCategories())
    },[])
    return (
        <>
          <div id="navnar-menu" className="flex h-[40px] justify-center w-full bg-secondary1 items-center text-white ">
              <div className="w-3/4 flex h-full items-center text-sm font-medium">
                <NavLink
                  to={`/`}
                  className={`${location.pathname === '/' ? active : notActive}`}
                >
                  Trang chủ
                </NavLink>
                  {
                    categories?.length > 0 && categories.map((item) => {
                      const router = "/" + normalizedString(item.value);
                      return (
                        <div key={item.code} className="h-full flex justify-center items-center">
                          <NavLink
                            to={`${normalizedString(item.value)}`}
                            className={`${location.pathname === router ? active : notActive}`}
                          >
                            {item.value}
                          </NavLink>
                        </div>
                      );
                    })
                  }
                <NavLink
                  to={`/block`}
                  className={`${location.pathname === '/block' ? active : notActive}`}
                >
                  Tin tức
                </NavLink>
                <NavLink
                  to={`/lien-he`}
                  className={`${location.pathname === '/lien-he' ? active : notActive}`}
                >
                  Liên hệ
                </NavLink>
                <NavLink
                  to={`/bang-gia-dich-vu`}
                  className={`${location.pathname === '/bang-gia-dich-vu' ? active : notActive}`}
                >
                  Bảng giá dịch vụ
                </NavLink>
              </div>
          </div>
        </>
    )
}