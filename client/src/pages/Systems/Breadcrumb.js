import React from 'react'

const Breadcrumb = ({route}) => {
  return (
    <div className='flex gap-2 text-sm'>
        <a href='/' className='text-[#007bff]'>Phongtro123.com</a>
        <span className='text-[#6c757d]'>/</span>
        <a href='/quan-ly' className='text-[#007bff]' >Quản lý</a>
        <span className='text-[#6c757d]'>/</span>
        <span className='text-[#6c757d]'>{route || ''}</span>
    </div>
  )
}

export default Breadcrumb