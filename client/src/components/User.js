import React from 'react'

const User = ({name,phone,avatar,id}) => {
  return (
    <a className="flex items-center">
        <img
            className="w-[40px] h-[40px] mr-2 rounded-[50%]"
            src={avatar || "https://phongtro123.com/images/default-user.png"}
            alt='avatar'
        ></img>
        <div className="flex flex-col gap-1">
            <span className="flex items-center text-[1.1rem]">
                <span className='inline-block mr-1'>Xin chào,</span>
                {" "}
                <strong className='w-[150px] inline-block whitespace-nowrap overflow-hidden text-ellipsis'>{name || '...'}</strong>
            </span>
            <span className="block text-sm">
                Mã tài khoản:{" "}<strong >{id?.replace(/[^\d]/g, '')?.slice(0,6) || '...'}</strong>. TK Chính:{" "}
                <strong>0 VNĐ</strong>
            </span>
        </div>
    </a>
  )
}

export default User