import React, {memo} from 'react'
const inputForm = ({label, keyPayload,type,value,setvalue,invalidFields = {},setError}) => {
  return (
      <div>
          <label htmlFor={keyPayload} className='block text-[.9rem] mb-1 uppercase font-normal'>{label}</label>
          <input required autoComplete='true' onFocus={()=>setError([])} name={keyPayload} value={value}  onChange={(e) => setvalue(prev => ({ ...prev, [keyPayload]: e.target.value }))} type={type} id={keyPayload} className='outline-none bg-[#e8f0fe] rounded-md w-full h-[45px] px-[10px]'></input>
          {invalidFields.length > 0 && invalidFields.some(element => element.name === keyPayload) && <small className='text-red-500 italic'>{invalidFields.find(i => i.name === keyPayload)?.message}</small>} 
      </div>
  )
}

export default memo(inputForm)