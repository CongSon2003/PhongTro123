import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { FaRegCopy } from "react-icons/fa6";
import numberToWordsVietnamese from '../../constants/function/numberToWordsVietnamese';
import { GrLinkNext } from "react-icons/gr";
const Payment = () => {
  const {user} = useSelector(state => state.user);
  const [bank,SetBank] = useState(0);
  const [selectedValue, setSelectedValue] = useState(50000);
  const [PayorQr,SetPayorQr] = useState(0);
  async function copyText(id) {
    const textElement = document.getElementById(id);
    try {
      await navigator.clipboard.writeText(textElement.innerText);
      alert("Đã sao chép: " + textElement.innerText);
    } catch (err) {
      alert("Có lỗi xảy ra khi sao chép.");
    }
}
  const handleRadioChange = (event) => {
    setSelectedValue(Number(event.target.value)); // Cập nhật giá trị đã chọn
  };
  const fomatNumber = (number) =>{
    const formattedNumber = new Intl.NumberFormat('vi-VN').format(number);
    return formattedNumber
  }
  const handlePromotion = (value,type) =>{
    if(type) {
      if (value >= 50000 && value < 1000000) {
        return fomatNumber(value * 0.1)
      }else if (value >= 1000000 && value < 2000000) {
        return fomatNumber(value * 0.2)
      }else if(value >= 2000000){
        return fomatNumber(value * 0.25)
      }else{
        return 0
      }
    }else{
      if (value >= 50000 && value < 1000000) {
        return value * 0.1
      }else if (value >= 1000000 && value < 2000000) {
        return value * 0.2
      }else if(value >= 2000000){
        return value * 0.25
      }else {
        return 0
      }
    }
  }
  return (
    <div className='w-full h-full'>
      <div className='border-b ml-[-1px] px-[42px] border-solid border-[#dee2e6]'>
        <h1 className='text-[2rem]'>Nạp tiền vào tài khoản</h1>
        <nav className='flex gap-5 py-2'>
          <a onClick={() => SetPayorQr(0)} className={`${PayorQr === 0 && 'text-red-500'} relative cursor-pointer`}>Chuyển khoản
            {PayorQr === 0 ? <div className='border-[1px] right-0 left-0 top-8 absolute border-red-500'></div> : ''}
          </a>
          <a onClick={() => SetPayorQr(1)} className={`${PayorQr === 1 && 'text-red-500'} relative cursor-pointer`}>
            QRCode
            {PayorQr === 1 && <div className='border-[1px] right-0 left-0 top-8 absolute border-red-500'></div>}
          </a>
        </nav>
      </div>
      {PayorQr === 0 ? <div className='flex items-center justify-center'>
        <div className='py-[21px] px-[42px] p-lg-5 pt-lg-4 w-2/3'>
          <div>
            <div className='flex flex-col gap-[14px]'>
              <div className='p-[14px] bg-[#cff4fc] rounded-md border-l-[3px] border-[#4cb1c6]'>
                <p className='font-bold'>Ưu đãi nạp tiền:</p>
                <p>• Nạp từ 50.000 đến dưới 1.000.000 tặng 10%</p>
                <p>• Nạp từ 1.000.000 đến dưới 2.000.000 tặng 20%</p>
                <p>• Nạp từ 2.000.000 trở lên tặng 25%</p>
              </div>
              <div className='p-[14px] bg-[#f7d7da] flex flex-col gap-2 rounded-md'>
                <p><span className='font-bold'>Lưu ý quan trọng:</span> Nội dung chuyển tiền bạn vui lòng ghi đúng thông tin sau:</p>
                <div className='bg-white rounded'>
                  <div className='p-[7px] flex justify-between items-center'>
                    <p id='Codepay' className='text-red-500'>{`PT123 - ${user?.accountCode} - ${user?.phone}`}</p>
                    <button onClick={() => copyText('Codepay')} className='bg-[#6c787f] text-white py-1 px-[7px] rounded-md flex items-center gap-1 text-sm'><FaRegCopy/> Sao Chép</button>
                  </div>
                </div>
                <p>Trong đó <span className='font-bold'>{user?.accountCode} </span>
                  là mã thành viên, <span className='font-bold'>{user?.phone}</span> là số điện thoại của bạn đăng ký trên website phongtro123.com.</p>
              </div>
              <div>
                <div className='flex'>
                  <div onClick={() => SetBank(0)} className={`w-1/2 h-[55px] items-center ${bank === 0 ? 'bg-[#fff9e6]' : 'bg-[#f8f9fb]'} flex justify-center py-2 px-5 rounded-t-md cursor-pointer`}>
                    <img src='https://phongtro123.com/images/logo-vietcombank.svg' className='w-[140px] h-[25px]'></img>
                  </div>
                  <div onClick={() => SetBank(1)} className={`w-1/2 h-[55px] items-center ${bank === 0 ? 'bg-[#f8f9fb]' : 'bg-[#fff9e6]'} flex justify-center py-2 px-5 rounded-t-md cursor-pointer`}>
                    <img src='https://phongtro123.com/images/logo-acb.svg' className='w-[140px] h-[25px]'></img>
                  </div>
                </div>
                {bank == 0 ? <div className='p-[14px] bg-[#fff9e6]'>
                  <table className='w-full'>
                    <tbody>
                      <tr>
                        <td className='py-[7px] pr-[7px] w-[160px]'>Ngân hàng:</td>
                        <td className='font-bold'>VIETCOMBANK - NGÂN HÀNG THƯƠNG MẠI CỔ PHẦN NGOẠI THƯƠNG VIỆT NAM</td>
                      </tr>
                      <tr>
                        <td className='py-[7px] pr-[7px]'>Chủ tài khoản:</td>
                        <td>Công ty TNHH LBKCORPCORP</td>
                      </tr>
                      <tr>
                        <td className='py-[7px] pr-[7px]'>Số tài khoản:</td>
                        <td className='flex items-center gap-3'>
                          <p id='STK' className='text-red-500'>150590888</p>
                          <button onClick={() => copyText('STK')} className='bg-[#6c787f] text-white py-1 px-[7px] rounded-md flex items-center gap-1 text-sm'><FaRegCopy/> Sao Chép</button>
                        </td>
                      </tr>
                      <tr>
                        <td className='py-[7px] pr-[7px]'>Chi nhánh:</td>
                        <td>Đông Sài Gòn</td>
                      </tr>
                      <tr className=''>
                        <td className='py-[7px] pr-[7px] w-[200px]'>Nội dung chuyển khoản:</td>
                        <td className='flex items-center gap-3 mt-1'>
                          <p id='Codepay2' className='text-red-500'>{`PT123 - ${user?.accountCode} - ${user?.phone}`}</p>
                          <button onClick={() => copyText('Codepay2')} className='bg-[#6c787f] text-white py-1 px-[7px] rounded-md flex items-center gap-1 text-sm'><FaRegCopy/> Sao Chép</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div> : <div className='p-[14px] bg-[#fff9e6]'>
                  <table className='w-full'>
                    <tbody>
                      <tr>
                        <td className='py-[7px] pr-[7px] w-[160px]'>Ngân hàng:</td>
                        <td className='font-bold'>ACB - NGÂN HÀNG THƯƠNG MẠI CỔ PHẦN Á CHÂU</td>
                      </tr>
                      <tr>
                        <td className='py-[7px] pr-[7px]'>Chủ tài khoản:</td>
                        <td>Công ty TNHH LBKCORP</td>
                      </tr>
                      <tr>
                        <td className='py-[7px] pr-[7px]'>Số tài khoản:</td>
                        <td className='flex items-center gap-3'>
                          <p id='STK' className='text-red-500'>0071001050516</p>
                          <button onClick={() => copyText('STK')} className='bg-[#6c787f] text-white py-1 px-[7px] rounded-md flex items-center gap-1 text-sm'><FaRegCopy/> Sao Chép</button>
                        </td>
                      </tr>
                      <tr>
                        <td className='py-[7px] pr-[7px]'>Chi nhánh:</td>
                        <td>CN HỒ CHÍ MINH</td>
                      </tr>
                      <tr className=''>
                        <td className='py-[7px] pr-[7px] w-[200px]'>Nội dung chuyển khoản:</td>
                        <td className='flex items-center gap-3 mt-1'>
                          <p id='Codepay2' className='text-red-500'>{`PT123 - ${user?.accountCode} - ${user?.phone}`}</p>
                          <button onClick={() => copyText('Codepay2')} className='bg-[#6c787f] text-white py-1 px-[7px] rounded-md flex items-center gap-1 text-sm'><FaRegCopy/> Sao Chép</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>}
              </div>
            </div>
          </div>
        </div>
      </div> : <div className='flex items-center justify-center'>
        <div className='py-[21px] px-[42px] p-lg-5 pt-lg-4 w-2/3'>
          <div>
            <div className='flex flex-col gap-[14px]'>
              <div className='p-[14px] bg-[#cff4fc] rounded-md border-l-[3px] border-[#4cb1c6]'>
                <p className='font-bold'>Ưu đãi nạp tiền:</p>
                <p>• Nạp từ 50.000 đến dưới 1.000.000 tặng 10%</p>
                <p>• Nạp từ 1.000.000 đến dưới 2.000.000 tặng 20%</p>
                <p>• Nạp từ 2.000.000 trở lên tặng 25%</p>
              </div>
              <div className='p-[14px] flex flex-col gap-2 rounded-md bg-[#f4f4f4]'>
                <div className='flex gap-[14px] flex-col'>
                  <h2>Chọn nhanh số tiền cần nạp</h2>
                  <div className='rounded flex flex-wrap gap-2'>
                    <div className='w-[23%]'>
                      <div onClick={() => setSelectedValue(50000)} className='bg-white rounded-md flex gap-2 px-5 py-2 w-full cursor-pointer'>
                        <input name='amount' checked = {selectedValue === 50000} type='radio' id='radio50000' value={50000}></input>
                        <label className='cursor-pointer' htmlFor='radio50000'>50.000</label>
                      </div>
                    </div>
                    <div className='w-[23%]'>
                      <div onClick={() => setSelectedValue(100000)} className='bg-white rounded-md flex gap-2 px-5 py-2 w-full cursor-pointer'>
                        <input name='amount' checked = {selectedValue === 100000} type='radio' id='radio100000' value={100000}></input>
                        <label className='cursor-pointer' htmlFor='radio100000'>100.000</label>
                      </div>
                    </div>
                    <div className='w-[23%]'>
                      <div onClick={() => setSelectedValue(200000)} className='bg-white rounded-md flex gap-2 px-5 py-2 cursor-pointer'>
                        <input name='amount' checked = {selectedValue === 200000}  type='radio' id='radio200000' value={200000}></input>
                        <label className='cursor-pointer' htmlFor='radio200000'>200.000</label>
                      </div>
                    </div>
                    <div className='w-[23%]'>
                      <div onClick={() => setSelectedValue(500000)} className='bg-white rounded-md flex gap-2 px-5 py-2 cursor-pointer'>
                        <input name='amount' checked = {selectedValue === 500000} type='radio' id='radio500000' value={500000}></input>
                        <label className='cursor-pointer' htmlFor='radio500000'>500.000</label>
                      </div>
                    </div>
                    <div className='w-[23%]'>
                      <div onClick={() => setSelectedValue(1000000)} className='bg-white rounded-md flex gap-2 px-5 py-2 cursor-pointer'>
                        <input name='amount' type='radio' checked = {selectedValue === 1000000} id='radio1000000' value={1000000}></input>
                        <label className='cursor-pointer' htmlFor='radio1000000'>1.000.000</label>
                      </div>
                    </div>
                    <div className='w-[23%]'>
                      <div onClick={() => setSelectedValue(2000000)} className='bg-white rounded-md flex gap-2 px-5 py-2 cursor-pointer'>
                        <input name='amount' type='radio' checked = {selectedValue === 2000000} id='radio2000000' value={2000000}></input>
                        <label className='cursor-pointer' htmlFor='radio2000000'>2.000.000</label>
                      </div>
                    </div>
                    <div className='w-[23%]'>
                      <div onClick={() => setSelectedValue(5000000)} className='bg-white rounded-md flex gap-2 px-5 py-2 cursor-pointer'>
                        <input name='amount' type='radio' checked = {selectedValue === 5000000} id='radio5000000' value={5000000}></input>
                        <label className='cursor-pointer' htmlFor='radio5000000'>5.000.000</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h2>Hoặc nhập số tiền cần nạp</h2>
                  <div className='w-full'>
                    <div className='flex border rounded-md bg-white border-solid border-[#dadada]'>
                      <input value={selectedValue || ''} onChange={(e) => setSelectedValue(Number(e.target.value))} type='text' className='rounded-l-md py-2 px-4 w-full border-r-[1px] border-solid border-[#dadada]'></input>
                      <span className='py-2 px-4'>đ</span>
                    </div>
                    <span id='amountInWords' className='text-black opacity-[0.5]'>{numberToWordsVietnamese(Number(selectedValue))} đồng</span>
                  </div>
                </div>
              </div>
              <div className='p-[14px] bg-[#cff4fc] rounded-md'>
                <h2 className='font-bold text-[1.2rem]'>Thông tin nạp tiền</h2>
                <table className='w-full'>
                  <tbody className='flex flex-col'>
                    <tr className='border-b items-center flex justify-between border-solid border-[#a6c3ca]'>
                      <td className='p-[7px] w-1/2'>Số tiền nạp</td>
                      <td className='text-left'>{fomatNumber(selectedValue)}đ</td>
                    </tr>
                    <tr className='border-b items-center flex justify-between border-solid border-[#a6c3ca]'>
                      <td className='p-[7px]'>Khuyến mãi</td>
                      <td className='text-left'>{`+${handlePromotion(selectedValue,true)}đ`}</td>
                    </tr>
                    <tr className='items-center flex justify-between'>
                      <td className='p-[7px]'>Thực nhận</td>
                      <td className='text-left'>{fomatNumber(+selectedValue + Number(handlePromotion(selectedValue, false)))}đ</td>
                    </tr>
                  </tbody>
                </table>
              </div>
                <button className='px-[16px] py-[10px] text-white rounded-md bg-[#e51f40] hover:bg-[#d61117] flex items-center justify-center gap-2'>Tiếp Tục <GrLinkNext /></button>
            </div>
          </div>
        </div>
      </div>}
    </div>
  )
}

export default Payment