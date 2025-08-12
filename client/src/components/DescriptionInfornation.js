import React, { memo } from 'react'
import { useSelector } from 'react-redux';
import {InputFormv2} from './';
const targets = [
  {code : 'Nam', value : 'Nam'},
  {code : 'Nữ',value : 'Nữ'}
]
const DescriptionInfornation = ({payload, Setpayload, invalidFields, SetInvalidFields}) => {
  const {user} = useSelector(state => state.user);
  const {categories} = useSelector(state => state.app);
  const {dataChange} = useSelector(state => state.post);
  const SetpayloadCategory = (e,type) =>{
    let arrInvalid = invalidFields.filter(item => item.name !== type);
    SetInvalidFields(arrInvalid);
    Setpayload(prev => ({...prev,categoryCode : e.target.value}))
  }
  const handleInvalidFields = (type) =>{
    let haveExits = invalidFields?.some(item => item.name === type);
    let findExits = haveExits && invalidFields.find(item => item.name === type)?.message;
    return findExits
  }
  const handleInvalidDescription = (e,type) =>{
    let arrInvalid = invalidFields.filter(item => item.name !== type);
    SetInvalidFields(arrInvalid);
    Setpayload(prev => ({...prev,description : e.target.value}))
  }
  return (
    <div className='flex flex-col gap-5'>
      <h2 className='font-bold text-[1.5rem] mt-[3rem]'>Thông tin mô tả</h2>
      <div className='flex flex-col gap-5'>
        <div className='flex flex-col w-[50%] text-sm gap-1'>
          <label htmlFor='categories' className='font-bold'>Loại chuyên mục</label>
          <select 
            name='categories' 
            value={payload.categoryCode || ''} 
            onChange={(e) => SetpayloadCategory(e,'categoryCode')} 
            id='categories'
            className='focus-Input px-[10px] py-[5px] h-[2rem] rounded border border-solid border-[#aaa]'>
            <option value="">-- Chọn loại chuyên mục --</option>
            {categories?.map((item) =>{
              return (
                <option value={item.code} key={item.code}>{item.value}</option>
              )
            })}
          </select>
          {<small className='text-red-500 text-[15px]'>{handleInvalidFields('categoryCode')}</small>}
        </div>
        <InputFormv2 type={'title'} invalidFields = {invalidFields} SetInvalidFields = {SetInvalidFields} Setpayload={Setpayload} value = {payload.title} label={'Tiêu đề'}/>
        <div className='flex flex-col tex-sm gap-1'>
          <label className='font-bold' htmlFor='post_content'>Nội dung mô tả</label>
          <textarea id='post_content' value={payload.description || ''} onChange={(e) => handleInvalidDescription(e,'description')} className='w-full h-[220px] px-[10px] py-[5px] border border-solid border-[#ced4da]' minLength={100}></textarea>
          {<small className='text-red-500 text-[15px]'>{handleInvalidFields('description')}</small>}
        </div>
        <div className='flex flex-col text-sm w-[50%] gap-1'>
          <label htmlFor='name_contact' className='font-bold'>Thông tin liên hệ</label>
          <input readOnly id='name_contact' value={user?.name || ''} className='bg-[#e9ecef] text-[#495057]  rounded border px-[10px] py-[5px] border-solid border-[#ced4da] outline-none'></input>
        </div>
        <div className='flex flex-col text-sm w-[50%] gap-1'>
          <label htmlFor='phone_contact' className='font-bold'>Điện thoại</label>
          <input readOnly id='phone_contact' value={user?.phone || ''} className='bg-[#e9ecef] text-[#495057]  rounded border px-[10px] py-[5px] border-solid border-[#ced4da] outline-none'></input>
        </div>
        <InputFormv2 type={'priceNumber'} invalidFields = {invalidFields} SetInvalidFields = {SetInvalidFields} value={payload.priceNumber} Setpayload={Setpayload} label={'Giá cho thuê'}/>
        <InputFormv2 type={'acreageNumber'} invalidFields = {invalidFields} SetInvalidFields = {SetInvalidFields} value={payload.acreageNumber} Setpayload={Setpayload} label={'Diện tích'}/>
        <InputFormv2 type={'sex'} invalidFields = {invalidFields} SetInvalidFields = {SetInvalidFields} value={payload.target} options = {targets} Setpayload={Setpayload} label={'Đối tượng cho thuê'}/>
      </div>
    </div>
  )
}

export default memo(DescriptionInfornation)