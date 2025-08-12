import React from 'react'

const DepositHistory = () => {
  return (
    <div className='w-full h-full'>
        <div className='border-b border-solid border-[#dee2e6] mb-4'>
            <h1 className='text-[2rem]'>Lịch sử nạp tiền</h1>
        </div>
        <div className='bg-[#f1f1f1] p-[20px]'>
            <table class="table-auto w-full border-b border-solid">
                <thead className='bg-[#0094da] text-white'>
                    <tr>
                        <th className='p-[5px]'>Mã giao dịch</th>
                        <th className='p-[5px]'>Thời gian</th>
                        <th className='p-[5px]'>Số tiền nhận</th>
                        <th className='p-[5px]'>Phương thức thanh toán</th>
                        <th className='p-[5px]'>Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='text-center'>
                        <td>null</td>
                        <td>null</td>
                        <td>null</td>
                        <td>null</td>
                        <td>null</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default DepositHistory