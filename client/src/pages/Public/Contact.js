import React, { useState } from 'react'
import {text, text2}from '../../unltils/dataContact'
import Swal from 'sweetalert2'
const Contact = () => {
    const [payload,Setpayload] = useState({
        yourName : '',
        yourPhone : '',
        yourContent : ''
    });
    const [checkinput,SetCheckinput] = useState([]);
    const handleSumbit = () =>{
        let countError = 0
        if (payload.yourContent === '') {
            SetCheckinput(prev => [...prev,{name : 'Content',message : 'Vui lòng nhập nội dung'}]);
            countError++
        }
        if (payload.yourName === '') {
            SetCheckinput(prev => [...prev,{name : 'Name',message : 'Vui lòng nhập họ tên'}]);
            countError++
        }
        if(payload.yourPhone == '') {
            SetCheckinput(prev => [...prev,{name : 'Phone',message : 'Vui lòng nhập số điện thoại'}]);
            countError++
        }
        if (countError === 0) {
            Swal.fire(
                {
                    icon : 'success',
                    title : 'Thành công',
                    text : 'Chúng tôi đã nhận được thông tin phản hồi của bạn. Cảm ơn bạn đã liên hệ với chúng tôi.',
                    showCancelButton: false,
                    showConfirmButton: false,
                    showCloseButton : true,
                    timer : 4000
                }
            )
            SetCheckinput([]);
            Setpayload({
                yourName : '',
                yourPhone : '',
                yourContent : ''
            });
        }
    }
  return (
    <div className='mb-[20px]'>
        <div className='mb-[5px]'>
            <h1 className="text-[1.8rem] mt-3 font-semibold">Liên hệ với chúng tôi</h1>
        </div>
        <div className='flex gap-9'>
            <div className='contain-info w-[50%] flex flex-col gap-4'>
                <div>
                    <h3 className='text-[1.3rem]'>Thông tin liên hệ</h3>
                </div>
                <div className='flex flex-col gap-4'>
                    <p>{text2.discription || ''}</p>
                    <p><strong>Điện thoại</strong>: {text2.phone || ''}</p>
                    <p><strong>Email</strong>: {text2.Email || ''}</p>
                    <p><strong>Zalo</strong>: {text2.Zalo || ''}</p>
                    <p><strong>Viber</strong>: {text2.Viber || ''}</p>
                    <p><strong>Địa chỉ</strong>: {text2.address || ''}</p>
                </div>
            </div>
            <div className='flex flex-col gap-4 w-[50%] p-[30px] border border-solid bg-white border-[#dedede] rounded-lg'>
                <div>
                    <h3 className='text-[1.3rem] text-[#333] font-semibold'>Liên hệ trực tuyến</h3>
                </div>
                <div className='flex flex-col gap-5'>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor='name' className='uppercase text-sm'>Họ tên của bạn</label>
                        <input value={payload.yourName} onChange={e => Setpayload(prev => ({...prev,yourName : e.target.value}))} className='h-[45px] outline-none bg-[#e8f0fe] border-[0] rounded-md pl-[10px] pr-[10px] ' type="text" id="name" name="name" autoComplete='name'/>
                        {checkinput?.find(item => item?.name === 'Name') && <span className='text-[red] uppercase text-[13px]'>{checkinput?.find(item => item?.name === 'Name')?.message}</span>}
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor='phone' className='uppercase text-sm'>Số điện thoại</label>
                        <input value={payload.yourPhone} onChange={e => Setpayload(prev => ({...prev,yourPhone : e.target.value}))} className='h-[45px] outline-none bg-[#e8f0fe] border-[0] rounded-md pl-[10px] pr-[10px] ' type="tel" id="phone" name="phone" autoComplete='tel'/>
                        {checkinput?.find(item => item?.name === 'Phone') && <span className='text-[red] uppercase text-[13px]'>{checkinput?.find(item => item?.name === 'Phone')?.message}</span>}
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor='messager' className='uppercase text-sm'>Nội dung</label>
                        <textarea value={payload.yourContent} onChange={e => Setpayload(prev => ({...prev,yourContent : e.target.value}))} className='p-[10px] h-[90px] outline-none bg-[#e8f0fe]' id='messager' name='messager' ></textarea>
                        {checkinput?.find(item => item?.name === 'Content') && <span className='text-[red] uppercase text-[13px]'>{checkinput?.find(item => item?.name === 'Content')?.message}</span>}
                    </div>
                    <div className='flex flex-col text-sm'>
                        <button onClick={handleSumbit} className='p-3 bg-[#3961fb] hover:underline text-white rounded-lg'>Gửi liên hệ</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Contact