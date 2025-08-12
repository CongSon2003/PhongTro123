import React from 'react'

const InputFormv2 = ({label,type,Setpayload,value,options,invalidFields,SetInvalidFields}) => {
    const handleInvalidFields = (e,typeInvalied) =>{
        switch (typeInvalied) {
            case 'priceNumber':
                let arrInvalid_price = invalidFields?.filter(item => item.name !== type);
                SetInvalidFields(arrInvalid_price);
                Setpayload(prev => ({...prev,priceNumber : +e.target.value}));
                break ;
            case 'acreageNumber':
                let arrInvalid_acreageNumber = invalidFields?.filter(item => item.name !== type);
                SetInvalidFields(arrInvalid_acreageNumber);
                Setpayload(prev => ({...prev,acreageNumber : +e.target.value}));
                break;
            case 'sex' :
                Setpayload(prev => ({...prev,target : e.target.value}));
                break;
            case 'title':
                let arrInvalid_title = invalidFields?.filter(item => item.name !== type);
                SetInvalidFields(arrInvalid_title);
                Setpayload(prev => ({...prev,title : e.target.value}));
                break;
            default:
                break;
        }
    }
    const handleInvalidText = () =>{
        let haveExits = invalidFields?.some(item => item.name === type);
        let findExits = haveExits && invalidFields.find(item => item.name === type)?.message;
        return findExits || ''
    }
  return (
    <div className={`flex flex-col text-sm gap-1 ${(type === 'title' || type === 'linkYT') ? 'w-full' : 'w-[50%]'}`}>
        <label htmlFor='title_post' className='font-bold'>{label || ''}</label>
        {type === 'priceNumber' ? <div className='flex'>
            <input type='number' id='title_post' value={value} onChange={(e) => handleInvalidFields(e,type)} className='focus-Input rounded-l-[4px] border w-full px-[10px] py-[5px] border-solid border-[#aaa] outline-none'>
            </input>
            <select className='px-[10px] py-[5px] ml-[-1px] border border-solid border-[#aaa] text-[#495057] rounded-r-[4px]'>
                <option>đồng/tháng</option>
            </select>
        </div> : type === 'acreageNumber' ? <div className='flex'>
            <input type='number' id='title_post' value={value} onChange={(e) => handleInvalidFields(e,type)} className='focus-Input rounded-l-[4px] border w-full px-[10px] py-[5px] border-solid border-[#aaa] outline-none'>
            </input>
            <div className='flex items-center bg-[#e9ecef] px-[10px] py-[5px] border border-solid border-[#aaa] text-[#495057] ml-[-1px] rounded-r-[4px]'>
                <span>m<sub className='top-[-5px]'>2</sub></span>
            </div>
        </div> : type === 'sex' ? <div className='flex w-full'>
            <select value={value || ''} onChange={e => handleInvalidFields(e,type)} className='px-[10px] py-[5px] w-full focus-Input ml-[-1px] border border-solid border-[#aaa] text-[#495057] rounded'>
                <option value='Tất cả'>-- Tất cả --</option>
                {options && options.map(item => {
                    return (
                        <option key={item.code}>{item.value || ''}</option>
                    )
                })}
            </select>
        </div> : <div className='flex w-full'>
            <input type='text' id='title_post' value={value || ''} onChange={(e) => handleInvalidFields(e,type)} className='rounded focus-Input border w-full px-[10px] py-[5px] border-solid border-[#aaa] outline-none'>
            </input>
        </div>}
        {type === 'price' && <small className='text-[12px] text-[#495057]'>Nhập đầy đủ số, ví dụ 1 triệu thì nhập là 1000000</small>}
        {<small className='text-red-500 text-[15px]'>{handleInvalidText()}</small>}       
    </div>
  )
}

export default InputFormv2