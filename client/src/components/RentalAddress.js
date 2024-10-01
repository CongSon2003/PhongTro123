import React ,{memo, useEffect, useState} from 'react'
import {SelectAddress} from '../components';
import { apiGetPublicDistrict, apiGetPublicProvinces, apiGetPublicWard } from '../services';
import { useDispatch, useSelector } from 'react-redux';
const RentalAddress = ({Setpayload,invalidFields,SetInvalidFields}) => {
  const [provinces,SetProvinces] = useState([]);
  const [districts,SetDistricts] = useState([]);
  const [wards,SetWards] = useState([]);
  const [province,SetProvince] = useState();
  const [district,SetDistrict] = useState();
  const [ward,SetWard] = useState();
  const [houseNumber,SetHouseNumber] = useState();
  const [resetDefault,SetresetDefault] = useState(false);
  useEffect(()=>{
    const fetchProvinces = async () =>{
      const response = await apiGetPublicProvinces();
      SetProvinces(response?.data?.results)
    }
    fetchProvinces()
  },[])
  useEffect(()=>{
    SetDistrict(null);
    const fetchPublicDistrict = async () =>{
      const response = await apiGetPublicDistrict(province);
      if (response?.status === 200) {
        SetDistricts(response?.data?.results)
      }
    }
    province && fetchPublicDistrict();
    !province ? SetresetDefault(true) : SetresetDefault(false);
    !province && SetDistricts([]);
  },[province])
  useEffect(()=>{
    SetWard(null);
    const fetchPublicWard = async () =>{
      const response = await apiGetPublicWard(district);
      if (response?.status === 200) {
        SetWards(response?.data?.results)
      }
    }
    district && fetchPublicWard();
    !district ? SetresetDefault(true) : SetresetDefault(false);
  },[district]);
  let provincefullname = province ? `${provinces.find(item => item.province_id === province)?.province_name}` : '';
  let provinceName = provincefullname.includes('Thành phố') ? provincefullname.split(' ').slice(2,provincefullname.length).join(' ') : provincefullname.split(' ').slice(1,provincefullname.length).join(' ');
  useEffect(()=>{
    Setpayload(prev => ({
      ...prev,
      address : `${houseNumber ? `${houseNumber}, ` : ''}${ward ? `${wards.find(item => item.ward_id === ward)?.ward_name}, ` : ''}${district ? `${districts.find(item => item.district_id === district)?.district_name}, ` : ''}${province ? `${provinces.find(item => item.province_id === province)?.province_name}` : ''}`,
      province : `${province ? provinceName : ''}`,
      ward : `${wards?.find(item => item.ward_id === ward)?.ward_name || ''}`,
      district : `${district ? `${districts.find(item => item.district_id === district)?.district_name}` : ''}`
    }))
  },[province,district,ward]);
  return (
    <div className='flex flex-col gap-5'>
      <h2 className='font-bold text-[1.5rem]'>Địa chỉ cho thuê</h2>
      <div className={`flex flex-col gap-5`}>
        <div className={`flex items-center gap-[21px] ${invalidFields.length > 0 ? 'mb-[15px]' : ''}`}>
          <SelectAddress invalidFields={invalidFields} SetInvalidFields = {SetInvalidFields} type={'Province'} setValue={SetProvince} options={provinces} label={'Tỉnh/Thành phố'}/>
          <SelectAddress invalidFields={invalidFields} SetInvalidFields = {SetInvalidFields} type={'District'} reset = {resetDefault} setValue={SetDistrict} options={districts} label={'Quận/Huyện'}/>
          <SelectAddress invalidFields={invalidFields} SetInvalidFields = {SetInvalidFields} type={'Ward'} reset={resetDefault} setValue={SetWard} options={wards} label={'Phường/Xã'}/>
        </div>
        <div className='flex items-end gap-[21px]'>
          <div className='flex flex-col w-[30%] gap-1'>
            <label htmlFor='streetNumber' className='text-sm font-bold'>Số nhà, Đường/Phố</label>
            <input type='text' value={houseNumber || ''} onChange={(e) => SetHouseNumber(e.target.value)} name='streetNumber' id='streetNumber' className='border border-solid border-[#aaa] h-[2rem] outline-none px-[10px] py-[5px] w-full rounded text-[#495057]'></input>
          </div>
          <span className='text-red-500 h-[2rem] text-center py-[5px]'>VD : Đình làng Bùi Xá Bùi Xá, Thuận Thành, Bắc Ninh</span>
        </div>
        <div className='flex flex-col'>
          <div className='flex flex-col w-full text-sm gap-1'>
            <label className='pb-1 font-bold'>Địa chỉ chính xác</label>
            <input type='text' value={`${houseNumber ? `${houseNumber}, ` : ''}${ward ? `${wards.find(item => item.ward_id === ward)?.ward_name}, ` : ''}${district ? `${districts.find(item => item.district_id === district)?.district_name}, ` : ''}${province ? `${provinces.find(item => item.province_id === province)?.province_name}` : ''}`} readOnly className='bg-[#e9ecef] opacity-100 border border-solid border-[#ced4da] h-[2rem] focus-Input outline-none px-[10px] py-[5px] w-full rounded text-[#495057]'/>
          </div>
          {(!province && invalidFields?.length > 0) && <small className='text-red-500 text-[15px]'>Chưa chọn khu vực đăng tin</small>}
        </div>
      </div>
    </div>
  )
}

export default memo(RentalAddress)