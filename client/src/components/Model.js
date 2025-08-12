import React ,{memo,useState,useEffect} from 'react'
import {getCodesAcreages,getCodesPrices} from '../constants/function/GetCode'
import icons from '../unltils/icon'
const {GoArrowLeft} = icons
const Model = ({SetIsShowModel,content,titleModel,handleSubmit,queries,name,arrFilter,defaultText}) => {
    const [percentOne,SetPercentOne] = useState((name === 'price' && arrFilter.priceArr) ? arrFilter.priceArr[0] : (name === 'acreage' && arrFilter.acreageArr) ? arrFilter.acreageArr[0] : 0);
    const [percentTwo,SetPercentTwo] = useState((name === 'price' && arrFilter.priceArr) ? arrFilter.priceArr[1] : (name === 'acreage' && arrFilter.acreageArr) ? arrFilter.acreageArr[1] : 100);
    const [activeElement,SetActiveElement] = useState('');
    const [contentFilter,SetcontentFilter] = useState([]);
    useEffect(()=>{
        const activedTrackEl = document.getElementById('track-active');
        const contentFilter = document.getElementById('range-value')?.innerText?.replace(/\r?\n/g,' ');
        SetcontentFilter(prev => ({...prev,contentFilter}))
        if (activedTrackEl) {
            if (percentOne >= percentTwo) {
                activedTrackEl.style.left = `${percentTwo + 0.5}%`
                activedTrackEl.style.right = `${100 - percentOne}%`
            }else{
                activedTrackEl.style.left = `${percentOne + 0.5}%`
                activedTrackEl.style.right = `${100 - percentTwo}%`
            }
        }
    },[percentOne,percentTwo]);
    const handleClickTrack = (e,value) =>{
        e.stopPropagation();
        const track = document.getElementById('track');
        const rect = track.getBoundingClientRect();
        let percent = value >= 0 ? value : Math.round((e.clientX - rect.left) * 100 / rect.width, 0)
        if (Math.abs(percent - percentOne) <=  Math.abs(percent - percentTwo)) {
            SetPercentOne(percent)
        }else{
            SetPercentTwo(percent)
        }
    }
    const convertchangePercent100 = (percent) =>{
        return titleModel === 'CHỌN GIÁ' ? (Math.ceil(Math.round((percent * 1.5)) / 5) * 5) / 10 : (Math.ceil(Math.round((percent * 0.9)) / 5) * 5)
    }
    const convertchangePercent15to100 = (percent) =>{
        let target = titleModel === 'CHỌN GIÁ' ? 15 : titleModel === 'CHỌN DIỆN TÍCH' ? 90 : 1
        return Math.floor((percent / target) * 100)
    }
    const  GetNumberIntheString = (String) =>{
        return String.match(/\d+/g);
    }
    const handleActive = (code,value)=>{
        let arrayMaxMin = GetNumberIntheString(value);
        if (arrayMaxMin.length === 1) {
            if (parseInt(arrayMaxMin[0]) === 1) {
                SetPercentOne(0)
                SetPercentTwo(convertchangePercent15to100(1))
            }
            if (parseInt(arrayMaxMin[0]) === 20) {
                SetPercentOne(0)
                SetPercentTwo(convertchangePercent15to100(20))
            }
            if (parseInt(arrayMaxMin[0]) === 15 || parseInt(arrayMaxMin[0]) === 90) {
                SetPercentOne(100)
                SetPercentTwo(100)
            }
        }
        if (arrayMaxMin.length === 2) {
            SetPercentOne(convertchangePercent15to100(arrayMaxMin[0]))
            SetPercentTwo(convertchangePercent15to100(arrayMaxMin[1]))
        }
    }
    const handleBeforSubmit = (e) =>{
        // const gaps = name === 'price' ? getCodesPrices([convertchangePercent100(percentOne),convertchangePercent100(percentTwo)],content) : name === 'acreage' ? getCodesAcreages([convertchangePercent100(percentOne),convertchangePercent100(percentTwo)],content) : []
        // const gapsCode = gaps.map(item => (item.code))
        const arrMinMax = (percentTwo === percentOne && percentOne === 100) ? [convertchangePercent100(percentOne),99999] : [convertchangePercent100(percentOne),convertchangePercent100(percentTwo)]                                                                   
        handleSubmit(e,{
            [`${name}Number`] : arrMinMax,
            [`${name}_numberFilter`] : arrMinMax,
            [`${name}_contentFilter`] : contentFilter.contentFilter
        },{
            [`${name}Arr`] : [percentOne,percentTwo]
        })
    }
    return (
        <div onClick={(e => {SetIsShowModel(false)})} 
            className='fixed top-0 left-0 right-0 bottom-0 bg-overlay-05 z-20 flex items-center justify-center'>
            <div
            onClick={(e => {
                e.stopPropagation()
                SetIsShowModel(true)
            })}  
            className='w-[45%] h-[500px] relative bg-white rounded-lg'>
                <div className='h-[45px] relative text-center flex items-center justify-center border-b border-solid border-[#ddd]'>
                    <span onClick={e => {
                        e.stopPropagation();
                        SetIsShowModel(false)
                    }} className='cursor-pointer absolute left-[7px]'><GoArrowLeft size={35}/></span>
                    <span className='font-bold uppercase text-sm'>{titleModel}</span>
                </div>
                {(titleModel === 'CHỌN LOẠI BẤT ĐỘNG SẢN' || titleModel === 'CHỌN TỈNH THÀNH') && <div className='filter-popup-content w-full h-[450px] overflow-y-scroll py-[10px] px-[25px]'>
                    <div>
                        <ul>
                            <li className='py-[12px] pr-[10px] border-b border-solid items-center flex gap-2 hover:text-[#1266dd] border-[#ddd] cursor-pointer'>
                                <input 
                                type='radio'
                                id='level-1' 
                                checked={!queries[`${name}Code`] ? true : false}
                                onChange={(e) => handleSubmit(e,{[name] : defaultText,[`${name}Code`] : null})}
                                name={name}></input>
                                <label htmlFor='level-1' className='cursor-pointer text-sm'>{defaultText}</label>
                            </li>   
                            {content?.length > 0 && content?.map((item,index)=>{
                                return (
                                    <li key={index} className='py-[12px] pr-[10px] border-b border-solid items-center flex gap-2 hover:text-[#1266dd] border-[#ddd] cursor-pointer'>
                                        <input 
                                        onChange={(e) => handleSubmit(e,{[name] : item.value,[`${name}Code`] : item.code})} 
                                        type='radio' 
                                        id={`level-${index + 2}`} 
                                        checked={queries[`${name}Code`] === item?.code ? true : false}
                                        name={name}></input>
                                        <label htmlFor={`level-${index + 2}`} className='cursor-pointer text-sm'>{item?.value}</label>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>}
                {(titleModel === 'CHỌN GIÁ' || titleModel === 'CHỌN DIỆN TÍCH') && <div className='p-3 px-7 flex flex-col bottom-0 gap-3'>
                    <div id='range-value' className='range-value flex justify-center items-center gap-1'>
                        {(percentOne === 100 && percentTwo === 100) ? 
                        <>
                            <span>Trên </span>
                            <span>{convertchangePercent100 (percentTwo)}{titleModel === 'CHỌN DIỆN TÍCH' ? 'm2' : ' triệu'}</span>
                        </> : percentOne === 0 ? <>
                            <span>Từ {percentOne > percentTwo ? convertchangePercent100 (percentTwo) : convertchangePercent100 (percentOne)}</span>
                            <span>&ndash;</span>
                            <span>{convertchangePercent100 (percentTwo)}{titleModel === 'CHỌN DIỆN TÍCH' ? 'm2' : ' triệu+'}</span>
                        </> : <>
                            <span id='range1'> {percentOne > percentTwo ? convertchangePercent100 (percentTwo) : convertchangePercent100 (percentOne)} </span>
                            <span>&ndash;</span>
                            <span id='range2'> {percentOne > percentTwo ? convertchangePercent100 (percentOne) : convertchangePercent100 (percentTwo)}{titleModel === 'CHỌN DIỆN TÍCH' ? 'm2' : ' triệu'}</span>
                        </>}
                    </div>
                    <div className='flex items-center my-8 relative justify-center'>
                        <div onClick={handleClickTrack} id = 'track' className='bg-[#ddd] rounded-lg h-[5px] absolute top-0 bottom-0 w-[99.5%]'></div>
                        <div onClick={handleClickTrack} id='track-active' className='bg-[#fe6800] rounded-full h-[5px] absolute top-0 bottom-0'></div>
                        
                        <input type='range' onChange={e => {
                            SetPercentOne(+e.target.value)
                            activeElement && SetActiveElement('')
                        }} value={percentOne} className='w-full appearance-none pointer-events-none absolute top-0 bottom-0' min={0} max={100} step={1}></input>
                        <input type='range' onChange={e => {
                            SetPercentTwo(+e.target.value)
                            activeElement && SetActiveElement('')
                        }} value={percentTwo} className='w-full appearance-none pointer-events-none absolute top-0 bottom-0' min={0} max={100} step={1}></input>
                        <span onClick={e => handleClickTrack(e,0)} className='absolute top-5 left-0 text-sm cursor-pointer'>0{` ${titleModel === 'CHỌN GIÁ' ? 'triệu' : `m`}`}{titleModel === 'CHỌN GIÁ' ? '+' : <sup>2</sup>}</span>
                        <span onClick={e => handleClickTrack(e,100)} className={titleModel ==='CHỌN GIÁ' ? 'absolute top-5 right-1 text-sm cursor-pointer' : 'absolute top-5 right-1 text-sm cursor-pointer'}>{titleModel === 'CHỌN GIÁ' ? '15' : '90'}</span>
                    </div> 
                    <p className='font-bold text-sm my-2'>Chọn nhanh</p>
                    <ul className=''>
                        {content?.length > 0 && content?.map((item,index)=>{
                            return (
                                <li key={index} onClick={() => handleActive(item.code,item?.value)} className = {`inline-block border border-solid border-[#f1f1f1] cursor-pointer py-2 px-4 rounded-md text-sm bg-[#f1f1f1] m-1 ${item.code === activeElement ? 'bg-black text-white' : ''}`}>
                                    {item?.value} {titleModel === 'CHỌN GIÁ' ? 'đồng' : ''}
                                </li>
                            )
                        })}
                    </ul>
                </div>}
                {(titleModel === 'CHỌN GIÁ' || titleModel === 'CHỌN DIỆN TÍCH') && <div className=' w-full h-[50px] absolute bottom-0 flex justify-center items-center'>
                    <div onClick={(e) => handleBeforSubmit(e)} className='w-full rounded-b-lg h-full flex justify-center text-black uppercase font-bold cursor-pointer items-center bg-[orange] text-sm'>áp dụng</div>
                </div>}
            </div>
        </div>
    )
}

export default memo(Model)