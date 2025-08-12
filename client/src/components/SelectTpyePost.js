import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
const SelectTpyePost = ({label,type,value,Setvalue}) => {
    const {TimePost, NumberPost, TypePost} = useSelector(state => state.post);
    const [arrNumber,SetarrNumber] = useState([1]);
    const handlePrice = (price,TimePost)=>{
        if (TimePost === 'Đăng theo tuần') {
            return (price * 6).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        }else if (TimePost === 'Đăng theo tháng') {
            return (price * 24).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        }else{
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        }
    }
    useEffect(()=>{
        if (TimePost) {
            let arrNumber = [];
            if (TimePost === 'Đăng theo ngày') {
                for (let index = 3; index < 90; index++) {
                    arrNumber.push(index + 1);
                };
                SetarrNumber(arrNumber);
            }else if(TimePost === 'Đăng theo tuần'){
                for (let index = 0; index < 10; index++) {
                    arrNumber.push(index + 1);
                };
                SetarrNumber(arrNumber);
            }else{
                for (let index = 0; index < 12; index++) {
                    arrNumber.push(index + 1);
                };
                SetarrNumber(arrNumber);
            }
        }
    },[TimePost])
  return (
    <div className='flex flex-col w-[32%]'>
        <label form={type}>
            <strong>{label || ''}</strong>
        </label>
        {type === 'Time_Package' ? <select value={TimePost ? TimePost : value || ''} onChange={(e) => Setvalue(e.target.value)} id={type} name={type} className='leading-8 rounded text-[#495057] border-[#aaa] border px-1 py-2'>
            <option value={'Đăng theo ngày'}>Đăng theo ngày</option>
            <option value={'Đăng theo tuần'}>Đăng theo tuần</option>
            <option value={'Đăng theo tháng'}>Đăng theo tháng</option>
        </select> : type === 'TypePost' ? <select value={TypePost ? TypePost : value || ''} onChange={(e) => Setvalue(e.target.value)} id={type} name={type} className='leading-8 rounded text-[#495057] border-[#aaa] border px-1 py-2'>
            <option value={'NORMAL'}>{`Tin Thường (${handlePrice(2000,TimePost)}/${TimePost === 'Đăng theo tuần' ? 'tuần' : TimePost === 'Đăng theo tháng' ? 'tháng' : 'ngày' })`}</option>
            <option value={'VIP3'}>{`Tin VIP 3 (${handlePrice(10000,TimePost)}/${TimePost === 'Đăng theo tuần' ? 'tuần' : TimePost === 'Đăng theo tháng' ? 'tháng' : 'ngày' })`}</option>
            <option value={'VIP2'}>{`Tin VIP 2 (${handlePrice(20000,TimePost)}/${TimePost === 'Đăng theo tuần' ? 'tuần' : TimePost === 'Đăng theo tháng' ? 'tháng' : 'ngày' })`}</option>
            <option value={'VIP1'}>{`Tin VIP 1 (${handlePrice(30000,TimePost)}/${TimePost === 'Đăng theo tuần' ? 'tuần' : TimePost === 'Đăng theo tháng' ? 'tháng' : 'ngày' })`}</option>
            <option value={'PROVIP'}>{`Tin VIP Nổi bật (${handlePrice(50000,TimePost)}/${TimePost === 'Đăng theo tuần' ? 'tuần' : TimePost === 'Đăng theo tháng' ? 'tháng' : 'ngày' })`}</option>
        </select> : <select value={NumberPost ? NumberPost : value || ''} onChange={(e) => Setvalue(e.target.value)} id={type} name={type} className='leading-8 rounded text-[#495057] border-[#aaa] border px-1 py-2'>
            {TimePost === 'Đăng theo ngày' && <><option value={1} disabled className='text-[#aaa]'>1</option>
            <option value={2} disabled className='text-[#aaa]'>2</option>
            <option value={3} disabled className='text-[#aaa]'>3</option></>}
            {arrNumber && arrNumber.map((item,index) => {
                return <option key={index} value={item}>{`${item} ${TimePost === 'Đăng theo tuần' ? 'tuần' : TimePost === 'Đăng theo tháng' ? 'tháng' : 'ngày' }`}</option>
            })}
        </select>}
    </div>
  )
}

export default SelectTpyePost