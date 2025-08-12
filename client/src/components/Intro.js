import React, { useEffect ,memo} from 'react'
import { text } from '../unltils/dataIntro'
import icons from '../unltils/icon'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {normalizedString} from '../constants/path'
const {MdOutlineStar} = icons;
const {answer,author,commentUser,decription1,decription2,question,star,statistics,titleOne,titleTwo} = text
const handleStar = (star) =>{
    let stars = [];
    for (let index = 0; index < star; index++) {
        stars.push(index) 
    }
    return stars
}
const Intro = () => {
    const {categories} = useSelector(state =>state.app);
    return (
        <div className='mb-5 p-5 w-11/12 lg:w-3/4 bg-[#fff] border border-solid border-[#dedede] rounded-lg'>
            <div className='pt-5 px-[50px] pb-[50px] text-center'>
                <h4 className='font-bold text-xl m-0 p-0'>{titleOne}</h4>
                <p className='text-sm my-4'>{decription1}{categories.map((item,index)=>{
                    return (<Link to={normalizedString(item.value)} key={index} className='text-[#1266dd] font-bold'> {item.value},</Link>)
                })}{decription2}</p>
                <div className='flex justify-around'>{statistics.map((item,idex)=>{
                    return (
                    <div key={idex} className='w-[25%]'>
                        <span className='font-bold text-xl block mb-1'>{item.value}</span>
                        <span className='text-sm'>{item.name}</span>
                    </div>
                    )
                    })}
                </div>
                <br/><br/>
                <h5 className='font-bold m-0 p-0 text-xl'>{titleTwo}</h5>
                <div className='flex justify-center my-3'>{handleStar(star).length > 0 && handleStar(star).map((item,index) => {return <MdOutlineStar key={index} size={25} color="#febb02"/>})}</div>
                <p className='text-sm italic'>{commentUser}<br></br><span className='not-italic block mt-3'>{author}</span></p>
                <br/>
                <h6 className='font-bold text-xl m-0 p-0'>{question}</h6>
                <p className='my-3 text-sm'>{answer}</p>
                <button className='bg-[#f73859] text-[#fff] py-[10px] px-[30px] text-sm font-bold rounded-md hover:underline'>Đăng tin ngay</button>
            </div>
        </div>
    )
}

export default memo(Intro)