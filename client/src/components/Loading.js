import React from 'react'
import { RotatingLines } from 'react-loader-spinner'
const Loading = ({size,text}) => {
  return (
    <div className='leading-10'>
      <RotatingLines
        visible={true}
        height={size || '80'}
        width={size || '80'}
        color="grey"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
        {text && <span >Đang tải lên...</span>}
    </div>
  )
}

export default Loading