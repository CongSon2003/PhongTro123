/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { useSelector } from 'react-redux'
import { blobToBase64 } from '../constants/function/TogetBase64';
const User = ({name,phone,avatar,id,accountCode}) => {
    const {user} = useSelector(state => state.user);
  return (
    <>
    {(user) && <a className="flex items-center gap-1">
        <div className='w-[45px] h-[45px]'><img
            className="w-full h-full block rounded-[50%] object-cover border border-solid border-[#ddd]"
            src={(user && user?.avatar?.data?.length > 0) ? blobToBase64(user.avatar) : "https://res.cloudinary.com/dhelgqbba/image/upload/v1729568294/PhongTro123/km9lyky8jwbp2dkuddj7.jpg"}
            alt='avatar'
        ></img></div>
        <div className="flex flex-col gap-1">
            <span className="flex items-center text-[1.1rem]">
                <span className='inline-block mr-1'>Xin chào,</span>
                {" "}
                <strong className='w-[150px] inline-block whitespace-nowrap overflow-hidden text-ellipsis'>{name || '...'}</strong>
            </span>
            <span className="block text-sm">
                Mã tài khoản:{" "}<strong >{accountCode || '...'}</strong>. TK Chính:{" "}
                <strong>{user?.accountBalance ? user?.accountBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : '0'}đ</strong>
            </span>
        </div>
    </a>}
    </>
  )
}

export default User