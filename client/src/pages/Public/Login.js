import React, { useState, useEffect, useCallback } from "react";
import {Link,useLocation,useNavigate} from "react-router-dom"
import { InputForm, Button } from "../../components";
import { ForgotPassword_PATH, REGISTER_PATH } from "../../constants/path";
import { apiLogin } from "../../services/auth";
import * as actions from '../../store/actions';
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2';
const Login = () =>{
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [error , setError] = useState([]);
  const [IscheckLogin,SetIscheckLogin] = useState(false);
  const {isLoggedIn,checkLoggin,message,idLove} = useSelector(state => state.auth);
  const [payload,setpayload] = useState({
    phone : '',
    password : ''
  })
  const handleSubmit =(ev)=>{
    ev.preventDefault()
    const countError = validate(payload);
    if (countError === 0) {
      const {password,phone} = payload;
      dispatch(actions.login({password,phone}));
      SetIscheckLogin(true)
    }else{
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Tài khoản hoặc MẬT KHẨU không đúng.",
        timer: 5000,
        width : 450,
      });
    }
  }
  useEffect(()=>{
    if (message && !message.includes('LOGIN_SUCESS') && IscheckLogin) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Tài khoản hoặc MẬT KHẨU không đúng.",
        timer: 2000,
        width : 450,
      });
    }
  },[message,checkLoggin])
  useEffect(()=>{
    if (isLoggedIn === true) {
      Swal.fire({
        title: "Đăng nhập thành công!",
        text: "Chúc bạn trải nhiệm website vui vẻ!",
        icon: "success",
        timer: 2000,
        width : 450,
      });
      navigate('/')
    }
  },[isLoggedIn])
  const validate = (payload) =>{
    let attribute = Object.entries(payload)
    let countError = 0;
    attribute.forEach(item => {
      if(item[1] === ''){
        setError(prev => [...prev,{
          name : item[0],
          message :  'Không được để trống trường ' + item[0]
        }])
        countError++
      }
    })
    attribute.forEach(item => {
      switch (item[0]) {
        case 'password':
          if (item[1].length < 6) {
            setError(prev => [...prev,{
              name : item[0],
              message :  'password phải có tối thiểu 6 ký tự'
            }])
            countError++
          }
          break;
        case 'phone' :
          if (isNaN(item[1])) {
            setError(prev => [...prev,{
              name : item[0],
              message :  'Phone number phải là số'
            }])
            countError++
          }
          if (item[1].length < 10) {
            setError(prev => [...prev,{
              name : item[0],
              message :  'Phone number phải lớn hơn 10 số'
            }])
            countError++
          }
          break;  
        default:
          break;
      }
    })
    return countError
  }
  return (
    <>
      <div className="section section-access">
        <div className="section-header">
          <h1 className="text-[2rem] font-semibold">Đăng nhập</h1>
        </div>
        <div className="section-content flex flex-col justify-between rounded-md">
          <form method="POST" className="from-loggin" onSubmit={handleSubmit}>
            <div className="w-full flex flex-col gap-5 mb-[20px]">
                <InputForm setError={setError} label={"SỐ ĐIỆN THOẠI"} type={'text'} value={payload.phone} setvalue={setpayload} keyPayload={"phone"} />
                <InputForm setError={setError} label={"MẬT KHẨU"} type={'password'} value={payload.password} setvalue={setpayload} keyPayload={"password"} />
            </div>
            <Button
              text={'Đăng nhập'}
              bgColor={"bg-secondary1"}
              texColor={"text-white"}
              fullwidth
              type={'submit'}
            />
            <div className="from-group flex items-center justify-between mt-7">
              <Link to={`/${ForgotPassword_PATH}`} className="no-underline text-[#1266dd] cursor-pointer hover:text-[red]">
                Bạn quên mật khẩu?
              </Link>
              <Link to={`/${REGISTER_PATH}`} 
                className="no-underline text-[#1266dd] cursor-pointer hover:text-[red]">
                Tạo tài khoản mới
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Login