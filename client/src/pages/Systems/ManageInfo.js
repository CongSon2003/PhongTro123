import React, { useEffect, useState } from 'react';
import Breadcrumb from './Breadcrumb';
import { useDispatch, useSelector } from 'react-redux';
import { apiUploadCloud, apiUploadImages, UpdateUser } from '../../services';
import { TailSpin } from 'react-loader-spinner';
import * as actions from '../../store/actions';
import {toBase64,blobToBase64} from '../../constants/function/TogetBase64'
import Swal from 'sweetalert2';
import { Buffer } from 'buffer';
const ManageInfo = () => {
    const {user} = useSelector(state => state.user);
    const [previewAvatar, SetPreviewAvatar] = useState('');
    const [public_id,SetPublic_id] = useState('');
    const [isLoading,SetIsloading] = useState(false);
    const dispatch = useDispatch();
    const [payload,SetPayload] = useState({
        name : '',
        fbUrl : '',
        phone : '',
        zalo : '',
        avatar : '',
        email : ''
    });
    useEffect(()=>{
        user && SetPayload({
            name : user.name  || '',
            fbUrl : JSON.parse(user.fbUrl)  || '',
            phone : user.phone  || '',
            zalo : (user.zalo || user.phone)  || '',
            avatar : blobToBase64(user.avatar) || '',
            email : user.email || ''
        });
        user?.avatar && SetPreviewAvatar(blobToBase64(user.avatar));
    },[user]);
    const handleAvatar_cloudinary = async (e) =>{
        SetIsloading(true);
        e.stopPropagation();
        let files = e.target.files;
        let image_url = '';
        let public_id = '';
        let formData = new FormData;
        formData.append('file',files[0]);
        formData.append('upload_preset',process.env.REACT_APP_UPLOAD_ASSETS_NAME);
        const response = await apiUploadImages(formData);
        if (response?.status === 200) {
            image_url = response.data.url;
            public_id = response.data.public_id;
        }
        SetPreviewAvatar(image_url);
        SetPublic_id(public_id);
        SetPayload(prev => ({...prev,avatar : image_url}));
        SetIsloading(false);
    }
    const handleAvatar_base64 = async (e) =>{
        const imageBase64 = await toBase64(e.target.files[0]);
        if (imageBase64) {
            SetPreviewAvatar(imageBase64);
            SetPayload(prev => ({
                ...prev,
                avatar : imageBase64
            }))
        }
    }
    const handleSubmit = async () =>{
        const response = await UpdateUser(payload);
        if (response?.status === 200 && response?.data.error === 0) {
            dispatch(actions.getUser());
            Swal.fire({
                title: `Thông báo`,
                text: "Cập nhật thông tin cá nhân thành công",
                icon: "success",
                showCloseButton : true,
                showCancelButton: false,
                showConfirmButton: false,
                timer : 3000
            })
        }else{
            Swal.fire({
                title: `Thông báo`,
                text: "Cập nhật thông tin cá nhân không thành công",
                icon: "error",
            })
        }
    }
    const handleDeleteAvatar = ()=>{
        Swal.fire({
            title: `Bạn chắc chứ ?`,
            text: "Bạn chắc muốn xóa hình này chứ!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Vâng, xóa nó đi!",
            cancelButtonText : "Hủy bỏ",
        }).then(async (result) => {
            if (result.isConfirmed) {
                SetPreviewAvatar('');
                SetPayload(prev => ({...prev,avatar : ''}));
            }
        });
    }
  return (
    <div className='w-full h-full bg-white text-black'>
        <div className='py-[0.75rem] px-[1rem] bg-[#e9ecef] rounded'><Breadcrumb route={'Cập nhật thông tin cá nhân'}/></div>
        <div className='border-b border-solid border-[#dee2e6] mb-4'>
            <h1 className='text-[2rem] mb-[.5rem]'>Cập nhật thông tin cá nhân</h1>
        </div>
        <div className='flex flex-col gap-10'>
            <div className='flex flex-col gap-4 text-sm'>
                <div className='flex items-center justify-center'>
                    <label htmlFor='user-id' className='w-1/5'>Mã thành viên</label>
                    <div className='w-1/2'>
                        <input type='text' value={`#${user?.accountCode ? user?.accountCode : '...'}`} readOnly id='user-id' className='bg-[#e9ecef] w-full px-2 py-1 rounded border border-solid border-[#ced4da]'></input>
                    </div>
                </div>
                <div className='flex items-center justify-center'>
                    <label htmlFor='user-phone' className='w-1/5'>Số điện thoại</label>
                    <div className='w-1/2'>
                        <input type='text' value={user?.phone || ''} readOnly id='user-phone' className='bg-[#e9ecef] w-full px-2 py-1 rounded border border-solid border-[#ced4da]'></input>
                        <div className='mt-1'>
                            <a className='text-[#007bff] cursor-pointer hover:underline'>Đổi số điện thoại</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-4 text-sm'>
                <div className='flex items-center justify-center'>
                    <label htmlFor='user-name' className='w-1/5'>Tên hiển thị</label>
                    <div className='w-1/2'>
                        <input type='text' onChange={(e) => SetPayload(prev => ({...prev,name : e.target.value}))} value={payload.name} id='user-name' className='w-full px-2 py-1 rounded border border-solid border-[#ced4da]'></input>
                    </div>
                </div>
                <div className='flex items-center justify-center'>
                    <label htmlFor='user-email' className='w-1/5'>Email</label>
                    <div className='w-1/2'>
                        <input type='email' onChange={e => SetPayload(prev => ({...prev, email : e.target.value}))} value={payload.email} id='user-email' className='w-full px-2 py-1 rounded border border-solid border-[#ced4da]'></input>
                    </div>
                </div>
                <div className='flex items-center justify-center'>
                    <label htmlFor='user-zalo' className='w-1/5'>Số Zalo</label>
                    <div className='w-1/2'>
                        <input type='text' onChange={e => SetPayload(prev => ({...prev,zalo : e.target.value}))} value={payload.zalo || payload.phone} id='user-zalo' className='w-full px-2 py-1 rounded border border-solid border-[#ced4da]'></input>
                    </div>
                </div>
                <div className='flex items-center justify-center'>
                    <label htmlFor='user-facebook' className='w-1/5'>Facebook</label>
                    <div className='w-1/2'>
                        <input type='text' onChange={e => SetPayload(prev => ({...prev,fbUrl : e.target.value}))} value={payload.fbUrl} id='user-facebook' className='w-full px-2 py-1 rounded border border-solid border-[#ced4da]'></input>
                    </div>
                </div>
            </div>
            <div className='text-sm'>
                <div className='flex items-center justify-center'>
                    <span className='w-1/5'>Mật khẩu</span>
                    <div className='w-1/2'>
                        <a className='text-[#007bff] cursor-pointer hover:underline'>Đổi mật khẩu</a>
                    </div>
                </div>
            </div>
            <div className='text-sm'>
                <div className='flex items-center justify-center'>
                    <span className='w-1/5'>Ảnh đại diện</span>
                    <div className='w-1/2'>
                        <div className='w-[140px] flex flex-col gap-1'>
                            <div className='w-full h-[140px] bg-center object-cover text-center flex justify-center'>
                                <img className='w-full h-full border border-[#fafafa] border-solid object-cover rounded-full' src={previewAvatar ? previewAvatar : 'https://res.cloudinary.com/dhelgqbba/image/upload/v1729568294/PhongTro123/km9lyky8jwbp2dkuddj7.jpg'}></img>
                            </div>
                            <div className='flex flex-col gap-2'>
                                {previewAvatar && <button onClick={handleDeleteAvatar} className='text-red-500 cursor-pointer text-center bg-[#f1f1f1] px-3 py-2 rounded-md'>Xóa hình này</button>}
                                <label htmlFor='uploadAvatar'>
                                    <span className='bg-[#f1f1f1] block w-full cursor-pointer text-center px-3 py-2 rounded-md'>Chọn ảnh</span>
                                </label>
                                <input onChange={handleAvatar_base64} id='uploadAvatar' hidden type='file'></input>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-center mb-12'>
                <button onClick={handleSubmit} className='bg-[#007bff] text-white py-2 px-8 w-[70%] rounded-md'>Lưu & Cập nhật</button>
            </div>
        </div>
    </div>
  )
}

export default ManageInfo