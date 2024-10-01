import React, { useState } from 'react'
import Breadcrumb from './Breadcrumb';
import icons from '../../unltils/icon';
const {IoIosArrowDown,IoIosArrowUp} = icons;
const ManagerPost = () => {
    const [focusFilterVIP,SetFocusFilterVIP] = useState(false);
    const [focusFilterStatus,SetfocusFilterStatus] = useState(false);
    const handleFocus = ()=>{
        SetFocusFilterVIP(prev => !prev);
    }
    const handleFocusFilterStatus = () =>{
        SetfocusFilterStatus(prev => !prev);
    }
    window.onclick = function(event) {
        const dropdown_filterVip = document.getElementsByClassName('filterVip');
        const dropdown_filterStatus = document.getElementsByClassName('filterStatus');
        const Svg_filterVip = document.getElementsByClassName('Svg_filterVip');
        if (event.target.parentNode !== dropdown_filterVip[0] && event.target.parentNode !== null && event.target.parentNode !== Svg_filterVip[0]) {
            SetFocusFilterVIP(false);
        }
        if (event.target.parentNode !== dropdown_filterStatus[0] && event.target.parentNode !== null && event.target.parentNode !== Svg_filterVip[0]) {
            SetfocusFilterStatus(false);
        }
        
    };
  return (
    <div className='w-full h-full bg-white text-black'>
      <div className='py-[0.75rem] px-[1rem] bg-[#e9ecef] rounded'><Breadcrumb route={'Danh sách tin đăng'}/></div>
      <div className='pb-[0.5rem] border-b border-solid border-[#dee2e6] mb-4 flex items-center justify-between'>
        <h1 className='text-[2rem] py-2'>Quản lý tin đăng</h1>
        <div className='flex items-center gap-1'>
            <div className='w-52 border rounded border-[#6c757d] text-[#6c757d]'>
                <input className='Search-Code-title text-sm rounded w-full outline-none py-1 px-2' placeholder='Tìm theo mã tin hoặc tiêu đề'></input>
            </div>
            <div onClick={() => handleFocus()} className={`${focusFilterVIP ? 'Focus-filterVip' : ''} cursor-pointer relative border text-sm rounded border-[#6c757d] flex items-center`}>
                <div className={`flex items-center filterVip ${focusFilterVIP ? '' : 'text-[#6c757d]'} hover:bg-[#6c757d] hover:text-white`}>
                    <button className='py-1 pl-2'>
                        Lọc theo loại VIP
                    </button>
                    <span className='p-1'>{focusFilterVIP ? <IoIosArrowDown className='Svg_filterVip'/> : <IoIosArrowUp className='Svg_filterVip'/>}</span>
                </div>
                {focusFilterVIP && <div className='absolute top-8 left-0 right-0 border rounded text-black'>
                    <ul className='bg-white rounded'>
                        <li className='py-2 px-3 hover:bg-slate-200'>Tin thường</li>
                        <li className='py-2 px-3 hover:bg-slate-200'>Tin VIP 3</li>
                        <li className='py-2 px-3 hover:bg-slate-200'>Tin VIP 2</li>
                        <li className='py-2 px-3 hover:bg-slate-200'>Tin VIP 1</li>
                        <li className='py-2 px-3 hover:bg-slate-200'>Tin Hot</li>
                    </ul>
                </div>}
            </div>
            <div onClick={() => handleFocusFilterStatus()} className={`${focusFilterStatus ? 'Focus-filterStatus' : ''} cursor-pointer relative border text-sm rounded border-[#6c757d] flex items-center`}>
                <div className={`flex items-center filterStatus ${focusFilterStatus ? '' : 'text-[#6c757d]'} hover:bg-[#6c757d] hover:text-white`}>
                    <button className='py-1 pl-2'>
                        Lọc theo trạng thái
                    </button>
                    <span className='p-1'>{focusFilterStatus? <IoIosArrowDown/> : <IoIosArrowUp/>}</span>
                </div>
                {focusFilterStatus && <div className='absolute top-8 left-0 right-0 border rounded text-black'>
                    <ul className='bg-white rounded'>
                        <li className='py-2 px-3 hover:bg-slate-200'>Tin đang hiện thị</li>
                        <li className='py-2 px-3 hover:bg-slate-200'>Tin hết hạn</li>
                        <li className='py-2 px-3 hover:bg-slate-200'>Tin đang ẩn</li>
                    </ul>
                </div>}
            </div>
            <div className='border rounded gap-1 text-sm bg-[#dc3545] text-white flex items-center'>
                <button className='py-1 px-2'>
                    Đăng tin mới
                </button>
            </div>
        </div>
      </div>
      <div className='bg-[#f8d7da] py-[0.75rem] px-[1.25rem] mb-11 border border-solid border-[#f5c6cb] text-sm rounded'>
        <span>Nếu bạn đã từng đăng tin trên Phongtro123.com, hãy sử dụng chức năng ĐẨY TIN / GIA HẠN / NÂNG CẤP VIP trong mục QUẢN LÝ TIN ĐĂNG để làm mới, đẩy tin lên cao thay vì đăng tin mới. Tin đăng trùng nhau sẽ không được duyệt.</span>
      </div>
      <table class="w-full text-sm">
        <thead>
            <tr>
                <th>Mã tin</th>
                <th>Ảnh đại diện</th>
                <th>Tiêu đề</th>
                <th>Giá</th>
                <th>Ngày bắt đầu</th>
                <th>Ngày hết hạn</th>
                <th>Trạng thái</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                <td>Malcolm Lockyer</td>
                <td>1961</td>
                <td>1961</td>
                <td>1961</td>
                <td>1961</td>
                <td>1961</td>
            </tr>
        </tbody>
        </table>
    </div>
  )
}

export default ManagerPost