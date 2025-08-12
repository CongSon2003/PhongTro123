/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import icons from "../../unltils/icon";
import {
  Link,
  useNavigate,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import { LOGIN_PATH, REGISTER_PATH, LOVE_POST } from "../../constants/path";
import { useSelector, useDispatch } from "react-redux";
import dropdownMenu from "../../unltils/dropdownMenu";
import * as actions from "../../store/actions";
import { User } from "../../components";
const { GoHeart, RxDashboard } = icons;
export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [showdropdownMenu, SetshowdropdownMenu] = useState(false);
  let scrollListHead = useRef();
  let NumberPage = searchParams.get("page");
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const {idPost} = useSelector(state => state.lovepost);
  useEffect(() => {
    if (scrollListHead.current) {
      scrollListHead.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [NumberPage, location.pathname]);
  const ToLogin = useCallback(() => {
    navigate(LOGIN_PATH);
  });
  const ToRegister = useCallback(() => {
    navigate(REGISTER_PATH);
  });
  const handleLogout = () => {
    SetshowdropdownMenu(false);
    dispatch(actions.logout);
  };
  const handleClickDropdownMenu = () => {
    SetshowdropdownMenu((prev) => !prev);
  };
  const handleIconDropdown = (id) => {
    switch (id) {
      case 1:
        return "post";
      case 2:
        return "manage";
      case 3:
        return "pay";
      case 4:
        return "pay_history";
      case 5:
        return "user_info";
      case 6:
        return "heart";
      case 7:
        return "logout";
      default:
        break;
    }
  };
  window.onclick = function(event) {
    const dropdown = document.getElementsByClassName('dropdown');
    if (event.target.parentNode !== dropdown[0] && showdropdownMenu) {
      SetshowdropdownMenu(false)
      // parentNode : nút gốc
    }
  };

  return (
    <div className="w-full flex justify-center bg-white">
      <div ref={scrollListHead} className="container w-3/4 flex justify-between">
      <Link className="cursor-pointer" to={"/"}>
        <img
          src="https://phongtro123.com/images/logo-phongtro.svg"
          className="w-[240px] h-[70px]"
        ></img>
      </Link>
      <div className="user-welcome gap-16 flex text-sm align-center float-right items-center font-normal">
        {(isLoggedIn) && <User name={user?.name} phone={user?.phone} avatar={user?.avatar} id={user?.id} accountCode = {user?.accountCode}/>}
        <div className="flex justify-around gap-3">
          <Link to={LOVE_POST} className="btn hover:underline text-[#333] relative">
            <GoHeart size={18} className="mr-[5px]" />
            Yêu thích
            <span className="absolute text-white bg-[#e4012b] top-0 left-[18px] px-1 rounded-3xl text-xs ">
              {idPost?.length || '0'}
            </span>
          </Link>
          {!isLoggedIn && (
            <div>
              <a className="btn" onClick={ToLogin}>
                <i className="icon fa-solid fa-user-plus"></i>
                <span className="hover:underline">Đăng nhập</span>
              </a>
              <a className="btn" onClick={ToRegister}>
                <i className="icon fa-solid fa-right-to-bracket"></i>
                <span className="hover:underline">Đăng ký</span>
              </a>
            </div>
          )}
          {isLoggedIn && (
            <div className="flex items-center gap-[5px] relative dropbtn">
              <button
                onClick={() => handleClickDropdownMenu()}
                id="dropdown"
                className="hover:underline flex items-center gap-[5px] dropdown"
              >
                <RxDashboard size={16} className="mb-[1px]" />
                <span>Quản lý tài khoản</span>
              </button>
              {showdropdownMenu && (
                <div className="absolute dropdown-menu bg-white top-10 min-w-[200px] flex flex-col py-[15px] px-[20px] left-[-15px] rounded-md">
                  {dropdownMenu.map((item, index) => {
                    return (
                      <Link
                        key={item.id}
                        className="py-[10px] border-b border-solid text-sm flex hover:text-[#f73859] cursor-pointer"
                        to={item.path}
                      >
                        <span
                          className={`icon-menu ${handleIconDropdown(
                            index + 1
                          )}`}
                        ></span>
                        {item.text}
                      </Link>
                    );
                  })}
                  <span
                    onClick={() => handleLogout()}
                    className="py-[10px] text-sm flex hover:text-[#f73859] cursor-pointer"
                  >
                    <span
                      className={`icon-menu logout`}
                    ></span>
                    Đăng xuất
                  </span>
                </div>
              )}
            </div>
          )}
          <Link to={'/quan-ly/dang-tin-moi'} className="btn btn-add-post ">
            <span className="text-sm hover:underline">Đăng tin miễn phí</span>
            <i className="icon-rg fa-solid fa-circle-plus"></i>
          </Link>
        </div>
      </div>
      </div>
    </div>
  );
}
