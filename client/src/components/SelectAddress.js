import React ,{memo, useEffect, useState} from 'react'
import icons from '../unltils/icon'
import { useSelector } from 'react-redux';
const {IoIosArrowDown,IoIosArrowUp} = icons
const SelectAddress = ({label,options,setValue,type,reset,invalidFields, SetInvalidFields}) => {
  // const {dataChange}
  const [showProvice,setShowProvince] = useState(false);
  const {dataChange} = useSelector(state => state.post);
  const [dataAdress,SetdataAdress] = useState();
  const handleClickProvince = () =>{
    setShowProvince((prev) => !prev);
  }
  useEffect(()=>{
    let addressArr = dataChange?.address?.split(',') || '';
    (dataChange && Object.keys(dataChange).length > 0) && SetdataAdress(type === 'Province' ? addressArr[addressArr.length - 1] :  type === 'District' ?  addressArr[addressArr.length - 2] : addressArr[addressArr.length - 3] )
    reset && SetdataAdress(type === 'Province' ? '-- Chọn Tỉnh/TP --' : type === 'District' ? 'Chọn quận huyện' : 'Chọn phường xã')
  },[dataChange,reset]);
  useEffect(()=>{
    SetdataAdress(type === 'Province' ? '-- Chọn Tỉnh/TP --' : type === 'District' ? 'Chọn quận huyện' : 'Chọn phường xã')
  },[]);
  const handleDataAdress = (data,data_id) =>{
    if (data_id) {
      let arrInvalid = invalidFields.filter(item => item.name !== type.toLowerCase());
      SetInvalidFields(arrInvalid);
    }
    SetdataAdress(data);
    setValue(data_id);
  }
  return (
    <div className='w-[30%]'>
        <div className='text-sm flex flex-col w-full'>
          <span className='flex flex-col gap-[3px] relative'>
            <span className='font-bold'>{label}</span>
            <div onClick={() => handleClickProvince()} className={`cursor-pointer relative w-full flex items-center border border-solid border-[#aaa] h-[2rem] outline-none pl-[8px] pr-[20px] ${showProvice ? 'rounded' : 'rounded'}`}>
              <div className='flex justify-between items-center w-full'>
                <span className='text-[#495057] whitespace-nowrap w-[150px] text-ellipsis overflow-hidden'>{dataAdress}</span>
                {showProvice ? <IoIosArrowUp/> : <IoIosArrowDown/>}
              </div>
              {showProvice && <div className='absolute rounded left-0 right-[-1px] top-[30px] bg-white z-10 border border-solid border-[#aaa]'>
                <ul className='max-h-[200px] overflow-y-auto list-none'>
                  <li onClick={() => handleDataAdress(type === 'Province' ? '-- Chọn Tỉnh/TP --' : type === 'District' ? 'Chọn quận huyện' : 'Chọn phường xã',null)} className='p-[6px] hover:bg-[#5897fb]'>{type === 'Province' ? '-- Chọn Tỉnh/TP --' : type === 'District' ? 'Chọn quận huyện' : 'Chọn phường xã'}</li> 
                  {((type !== 'Ward') || !reset) && options?.map((item)=>{
                    let province = (type === 'District' || type === 'Ward') ? '' : item?.province_name.includes('Thành phố') ? item?.province_name?.split(' ').slice(2,item?.province_name?.length).join(' ') : item?.province_name.split(' ').slice(1,item?.province_name?.length).join(' ');
                    return (
                      <li key={type === 'District' ? item?.district_id : type === 'Ward' ? item?.ward_id : item?.province_id} onClick={() => handleDataAdress(type === 'District' ? item?.district_name : type === 'Ward' ? item?.ward_name : item?.province_name,type === 'District' ? item?.district_id : type === 'Ward' ? item?.ward_id : item?.province_id)} className='p-[6px] hover:bg-[#5897fb] hover:text-white cursor-pointer'>{province || item?.district_name || item?.ward_name}</li>
                    )
                  })}                   
                </ul>
              </div>}
            </div>
            <small className='text-red-500 text-[15px] absolute bottom-[-20px] left-0 right-0'>
              {invalidFields?.some(item => item.name === type.toLowerCase()) && invalidFields.find(item => item.name === type.toLowerCase())?.message}
            </small>
          </span>
        </div>
    </div>
  )
}

export default memo(SelectAddress)