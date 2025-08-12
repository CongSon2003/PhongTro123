import React from 'react';

const Button = ({text,fontsize, texColor, bgColor,border, IcAffer ,fullwidth ,px,py,type,onClick}) =>{
    return (
        <button 
            type = {type ? type : 'button'}
            className={`${py ? py : 'py-2'} ${border && border}  ${fontsize && fontsize} ${px? px:'px-2'} ${texColor} ${bgColor} ${fullwidth && 'w-full'} hover:underline rounded-md gap-1 outline-none flex items-center justify-center`}
            onClick={onClick}
        >
        <span>{text}</span>
        {IcAffer && <span><IcAffer/></span>}
        </button>
    )
}
export default Button