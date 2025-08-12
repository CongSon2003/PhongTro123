import React, { useState, useEffect } from "react";
import { Link, redirect,useNavigate } from "react-router-dom";
import {
  LOGIN_PATH,
  REGISTER_PATH,
  REGULATION_PATH,
} from "../../constants/path";
import { InputForm, Button } from "../../components";
import { apiRegister } from "../../services/auth";
import Swal from "sweetalert2";
import * as actions from "../../store/actions";
import { useDispatch ,useSelector} from "react-redux";
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState([]);
  const [selectedTpyeUser, setselectedTpyeUser] = useState("");
  const [IscheckRegister,SetIscheckRegister] = useState(false);
  const {isLoggedIn,message,checkRegister} = useSelector(state => state.auth);
  const [payload, setpayload] = useState({
    phone: "",
    password: "",
    name: "",
  });
  useEffect(()=>{
    if (!isLoggedIn && IscheckRegister) {
      message && Swal.fire({
      icon: "error",
      title: "Lỗi",
      text: message,
      timer: 5000,
      width : 500,
    })
  }
  },[message,checkRegister])
  useEffect(()=>{
    if (isLoggedIn) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Signed in successfully"
      });
      navigate('/')
    }
  },[isLoggedIn])
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const countError = validate(payload);
    if (countError === 0) {
      const { password, phone, name } = payload;
      dispatch(actions.register({ password, phone, name }));
      SetIscheckRegister(true)
    }
  };
  const validate = (payload) => {
    let attribute = Object.entries(payload);
    let countError = 0;
    attribute.forEach((item) => {
      if (item[1] === "") {
        setError((prev) => [
          ...prev,
          {
            name: item[0],
            message: "Không được để trống trường " + item[0],
          },
        ]);
        countError++;
      }
    });
    attribute.forEach((item) => {
      switch (item[0]) {
        case "password":
          if (item[1].length < 7) {
            setError((prev) => [
              ...prev,
              {
                name: item[0],
                message: "Password phải có tối thiểu 7 ký tự",
              },
            ]);
            countError++;
          }
          break;
        case "phone":
          if (isNaN(item[1])) {
            setError((prev) => [
              ...prev,
              {
                name: item[0],
                message: "Số điện thoại phải là số",
              },
            ]);
            countError++;
          }
          break;
        case "name":
          if (item[1].length < 4 && item[1] !== "") {
            setError((prev) => [
              ...prev,
              {
                name: item[0],
                message: "Họ và tên phải có tối thiểu 4 ký tự",
              },
            ]);
            countError++;
          }else if (item[1].length > 15) {
            setError((prev) => [
              ...prev,
              {
                name: item[0],
                message: "Họ và tên quá dài",
              },
            ]);
            countError++;
          }
          break;
        default:
          break;
      }
    });
    return countError;
  };
  const handleTypeUserChange = (event) => {
    setselectedTpyeUser(event.target.value);
  };
  return (
    <>
      <div className="section section-access">
        <div className="section-header">
          <h1 className="text-[1.7rem] font-semibold">Tạo tài khoản mới</h1>
        </div>
        <div className="section-content flex flex-col justify-between">
          <form method="POST" className="from-register" onSubmit={handleSubmit}>
            <div className="w-full flex flex-col gap-[15px] mb-[20px]">
              <InputForm
                invalidFields={error}
                setError={setError}
                label={"HỌ VÀ TÊN"}
                keyPayload={"name"}
                type={"text"}
                value={payload.name}
                setvalue={setpayload}
              />
              <InputForm
                invalidFields={error}
                setError={setError}
                label={"SỐ ĐIỆN THOẠI"}
                type={"text"}
                value={payload.phone}
                setvalue={setpayload}
                keyPayload={"phone"}
              />
              <InputForm
                invalidFields={error}
                setError={setError}
                label={"TẠO MẬT KHẨU"}
                type={"password"}
                value={payload.password}
                setvalue={setpayload}
                keyPayload={"password"}
              />
              <label  className='block text-[.9rem] mb-1 uppercase font-normal'>LOẠI TÀI KHOẢN</label>
              <div className="w-full h-[45px] p-[30px] border-[7px] border-dashed border-[#e8eefc] ">
                <div className="flex items-center justify-start">
                  <label className="w-[25%]">
                    <div>
                      <label
                        htmlFor="user_type_guest"
                        className="font-normal text-[0.9rem] uppercase items-center flex"
                      >
                        <input
                          type="radio"
                          name="user_type"
                          value="option1"
                          id="user_type_guest"
                          checked = {selectedTpyeUser === 'option1'}
                          onChange={handleTypeUserChange}
                          required
                        />
                        <span className="ml-1">Tìm kiếm</span>
                      </label>
                    </div>
                  </label>
                  <label className="w-[25%]">
                    <div>
                      <label
                        htmlFor="user_type_owner"
                        className="font-normal text-[0.9rem] uppercase items-center flex"
                      >
                        <input
                          type="radio"
                          name="user_type"
                          value="option2"
                          id="user_type_owner"
                          checked = {selectedTpyeUser === 'option2'}
                          onChange={handleTypeUserChange}
                          required
                        />
                        <span className="ml-1">chính chủ</span>
                      </label>
                    </div>
                  </label>
                  <label className="w-[25%]">
                    <div>
                      <label
                        htmlFor="user_type_broker"
                        className="font-normal text-[0.9rem] uppercase items-center flex"
                      >
                        <input
                          type="radio"
                          name="user_type"
                          value="option3"
                          id="user_type_broker"
                          checked = {selectedTpyeUser === 'option3'}
                          onChange={handleTypeUserChange}
                          required
                        />
                        <span className="ml-1">môi giới</span>
                      </label>
                    </div>
                  </label>
                </div>
              </div>
            </div>
            <Button
              text="Tạo tài khoản"
              bgColor={"bg-secondary1"}
              texColor={"text-white"}
              fullwidth
              type={"submit"}
            />
            <div className="from-group flex justify-start mt-2 flex-col">
              <p className="py-1 leading-[1.5] text-sm my-[14px] ">
                Bấm vào nút đăng ký tức là bạn đã đồng ý với{" "}
                <Link
                  to={REGULATION_PATH}
                  className="text-[#1266dd] hover:text-[#ff8d52]"
                >
                  quy định sử dụng{" "}
                </Link>
                của chúng tôi
              </p>
              <p className="py-1 leading-[1.5] text-sm">
                Bạn đã có tài khoản?{" "}
                <Link
                  className="text-[#1266dd] hover:text-[#ff8d52]"
                  to={'/dang-nhap-tai-khoan'}
                >
                  Đăng nhập ngay
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Register;
