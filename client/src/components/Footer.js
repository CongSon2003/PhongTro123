import React from 'react'
import {text} from '../unltils/dataFooter'
import {dataAddressAdmin } from '../unltils/dataAddressAdmin'
const {col_4,col_1,col_2,col_3} = text;
const {Copyright,Email,Hotline,address,conpanyName,license} = dataAddressAdmin;
const Footer = () => {
  return (
    <div className='mt-12 w-full flex justify-center text-[#333] text-base bg-white'>
      <div className='w-11/12 lg:w-3/4 pb-[30px]'>
        <div className='pt-[20px] flex'>
          <div className='w-[34%] float-left'>
            <a><img className='w-[220px] h-[70px]' src={`${col_1[0].bacground}`}></img></a>
            <p className='text-sm max-w-[350px]'>{col_1[0].introduction}</p>
          </div>
          <div className='w-[22%] float-left pr-[20px]'>
            <span className='block mb-[10px] font-bold text-sm'>{col_2[0].title}</span>
            <ul className='flex flex-col gap-[10px]'>
              <li><a className='hover:underline cursor-pointer text-sm'>{col_2[0].link1}</a></li>
              <li><a className='hover:underline cursor-pointer text-sm'>{col_2[0].link2}</a></li>
              <li><a className='hover:underline cursor-pointer text-sm'>{col_2[0].link3}</a></li>
              <li><a className='hover:underline cursor-pointer text-sm'>{col_2[0].link4}</a></li>
              <li><a className='hover:underline cursor-pointer text-sm'>{col_2[0].link5}</a></li>
              <li><a className='hover:underline cursor-pointer text-sm'>{col_2[0].link6}</a></li>
              <li><a className='hover:underline cursor-pointer text-sm'>{col_2[0].link7}</a></li>
            </ul>
          </div>
          <div className='w-[22%] float-left pr-[20px]'>
            <span className='font-bold mb-[10px] block text-sm'>{col_3[0].title}</span>
            <ul className='flex flex-col gap-[10px]'>
              <li><a className='hover:underline cursor-pointer text-sm'>{col_3[0].link1}</a></li>
              <li><a className='hover:underline cursor-pointer text-sm'>{col_3[0].link2}</a></li>
              <li><a className='hover:underline cursor-pointer text-sm'>{col_3[0].link3}</a></li>
              <li><a className='hover:underline cursor-pointer text-sm'>{col_3[0].link4}</a></li>
              <li><a className='hover:underline cursor-pointer text-sm'>{col_3[0].link5}</a></li>
            </ul>
          </div>
          <div className='w-[22%] float-left pr-[20px]'>
            <div>
              <span className='font-bold mb-[10px] block text-sm'>{col_4[0]?.title1}</span>
              <div className='flex gap-[10px]'>
                <a href='http://localhost:3000/'><i className='bg-facebook block bg-center bg-contain bg-no-repeat h-[35px] w-[35px]'></i></a>
                <a href='http://localhost:3000/'><i className='bg-youtobe block bg-center bg-contain bg-no-repeat h-[35px] w-[35px]'></i></a>
                <a href='http://localhost:3000/'><i className='bg-zalo block bg-center bg-contain bg-no-repeat h-[35px] w-[35px]'></i></a>
                <a href='http://localhost:3000/'><i className='bg-twitter block bg-center bg-contain bg-no-repeat h-[35px] w-[35px]'></i></a>
              </div>
            </div>
            <br/>
            <div>
              <span className='font-bold mb-[10px] block text-sm'>{col_4[0]?.title2}</span>
              <div>
                <span className='bg-visa inline-block w-[54px] h-[33px] bg-center bg-contain bg-no-repeat'></span>
                <span className='bg-mastercard inline-block w-[54px] h-[33px] bg-center bg-contain bg-no-repeat'></span>
                <span className='bg-jcb inline-block w-[54px] h-[33px] bg-center bg-contain bg-no-repeat'></span>
                <span className='bg-banking inline-block w-[54px] h-[33px] bg-center bg-contain bg-no-repeat'></span>
                <span className='bg-momo inline-block w-[54px] h-[33px] bg-center bg-contain bg-no-repeat'></span>
                <span className='bg-cash inline-block w-[54px] h-[33px] bg-center bg-contain bg-no-repeat'></span>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-[30px] py-5 flex items-center gap-3 border-t border-solid border-[#eee]'>
          <span className='font-bold text-sm'>Cùng hệ thống LBKCorp:</span>
          <div className='flex gap-[25px] items-center'>
            <a className='inline-block'><img src='https://phongtro123.com/images/logo-bds123.svg' className='inline-block h-[30px] w-[140px] object-contain bg-center bg-contain bg-no-repeat'></img></a>
            <a className='inline-block'><img src='https://phongtro123.com/images/logo-chothuenha.svg' className='inline-block h-[30px] w-[140px] object-contain bg-center bg-contain bg-no-repeat'></img></a>
            <a className='inline-block'><img src='https://phongtro123.com/images/logo-thuecanho.svg' className='inline-block h-[30px] w-[140px] object-contain bg-center bg-contain bg-no-repeat'></img></a>
            <a className='inline-block'><img src='https://phongtro123.com/images/logo-phongtro.svg' className='border border-[white] inline-block h-[30px] w-[140px] object-contain bg-center bg-contain bg-no-repeat'></img></a>
          </div>
        </div>
        <div className='pt-[20px] flex justify-center flex-col gap-[13px] text-center border-t border-solid border-[#eee]'>
          <span className='block text-sm font-bold'>{conpanyName}</span>
          <span className='block text-sm font-bold'>{Hotline}</span>
          <span className='block text-sm'>{Copyright}</span>
          <span className='block text-sm'>{Email}</span>
          <p className='block text-sm'>{address}</p>
          <p className='block text-sm'>{license}</p>
          <div className='flex justify-center'>
            <span className='font-bold text-sm'>TÌM WEBSITE PHÒNG TRỌ BẰNG CÁCH SCAN QR : </span>
            <div className='bg-qrPT w-[200px] h-[100px] object-contain bg-center bg-contain bg-no-repeat'></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer