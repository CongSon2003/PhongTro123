import React ,{useEffect, useState}from 'react'
import Breadcrumb from './Breadcrumb'
import { DescriptionInfornation, InputFormv2, RentalAddress, Loading} from '../../components'
import icons from '../../unltils/icon';
import { apiCreateNewPost, apiDeleteCloud, apiUploadImages } from '../../services';
import { useDispatch, useSelector } from 'react-redux';
import { getCodesPrices ,getCodesAcreages } from '../../constants/function/GetCode';
import { AiOutlineDelete } from 'react-icons/ai';
import Swal from 'sweetalert2';
import { Navigate, useNavigate } from 'react-router-dom';
import validate from '../../unltils/validateFieldsCreatePost';
const {FcAddImage,FcVideoCall,MdOutlineDeleteForever} = icons;
const CreatePost = () => {
  const [payload,Setpayload] = useState({
    categoryCode : '',
    title : '',
    priceNumber : 0,
    acreageNumber : 0,
    images : '',
    address : '',
    priceCode : '',
    ward : '',
    district : '',
    acreageCode : '',
    description : '',
    target : 'Tất cả',
    province : '',
  });
  const [imagesPreview,SetimagesPreview] = useState([]);
  const [isLoading,SetIsloading] = useState(false);
  const [isLoadingDelete,SetIsloadingDelete] = useState(false);
  const [isLoadingCreate,SetIsLoadingCreate] = useState(false);
  const [LoadingTimeoutIndex,SetLoadingTimeoutIndex] = useState();
  const [invalidFields,SetInvalidFields] = useState([]);
  const [public_id,Setpublic_id] = useState([]);
  const { prices, acreages, categories, province} = useSelector(state => state.app);
  const { user } = useSelector(state => state.user);
  const navigate =  useNavigate();
  const handlFiles = async (e) =>{
    e.stopPropagation();
    SetIsloading(true);
    let images = [];
    let public_id = [];
    const files = e.target.files;
    const formData = new FormData;
    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      formData.append("file",element);
      formData.append("upload_preset",process.env.REACT_APP_UPLOAD_ASSETS_NAME); 
      // Below is the api Call;
      const response = await apiUploadImages(formData);
      if (response.status === 200) {
        images.push(response.data.secure_url);
        public_id.push(response.data.public_id);
      }
    }
    SetIsloading(false);
    SetimagesPreview(prev => [...prev,...images]);  
    Setpublic_id(prev => [...prev,...public_id]);
    Setpayload(prev => ({...prev,images : [...payload.images,...images]}))                                           
  }
  const handleDeleteImage = async (image,index,e) => {
    e.stopPropagation();
    SetIsloadingDelete(true);
    SetLoadingTimeoutIndex(index);
    let filename = public_id[index];
    const response = await apiDeleteCloud({filename : filename});
    if (response?.data.error === 0) {
      Setpublic_id(prev => prev?.filter(item => item !== filename));
    }
    SetimagesPreview(prev => prev?.filter(item => item !== image));  
    Setpayload(prev => ({...prev,images : prev.images.filter(item => item !== image)})) ;
    SetIsloadingDelete(false)
  }
  const handleSubmit = async () => {
    let priceCode = getCodesPrices(+payload.priceNumber / Math.pow(10,6),prices)[0].code;
    let acreageCode = getCodesAcreages(+payload.acreageNumber,acreages)[0].code;
    let addressString = payload?.address?.split(',');
    let categoryString = categories?.find(item => item.code === payload?.categoryCode)?.value;
    const finally_payload = {
      ...payload,
      priceCode,
      acreageCode,
      userID : user?.id,
      priceNumber : +payload.priceNumber / Math.pow(10,6),
      label : `${categoryString ? categoryString : ''}${addressString[addressString.length - 2] ? addressString[addressString.length - 2] : ''}`
    };
    const results = validate(finally_payload,SetInvalidFields);
    if (results === 0) {
      console.log(finally_payload);
      // const response = await apiCreateNewPost(finally_payload);
      // if (response?.data.error === 0) {
      //   Swal.fire({
      //     title: "Đăng Tin Thành công!",
      //     text: "Đã thêm bài đăng mới!",
      //     icon: "success",
      //     timer: 2000,
      //     width : 450,
      //   }).then(() =>{
      //    Setpayload({
      //     categoryCode : '',
      //     title : '',
      //     priceNumber : 0,
      //     acreageNumber : 0,
      //     images : '',
      //     address : '',
      //     priceCode : '',
      //     ward : '',
      //     district : '',
      //     acreageCode : '',
      //     description : '',
      //     target : 'Tất cả',
      //     province : '',
      //   });
      //   SetimagesPreview([]);
      //   });
      // }else{
      //   Swal.fire({
      //     title: "Oops!",
      //     text: "Có vẻ có lỗi !",
      //     icon: "error",
      //     timer: 2000,
      //     width : 450,
      //   });
      // }
    }
  }
  return (
    <div className='w-full h-full bg-white text-black'>
      <div className='py-[0.75rem] px-[1rem] bg-[#e9ecef] rounded'><Breadcrumb route={'Đăng tin mới'}/></div>
      <div className='pb-[0.5rem] border-b border-solid border-[#dee2e6] mb-4'>
        <h1 className='text-[2rem] mb-[.5rem]'>Đăng tin mới</h1>
      </div>
      <div className='bg-[#f8d7da] py-[0.75rem] px-[1.25rem] mb-11 border border-solid border-[#f5c6cb] text-sm rounded'>
        <span>Nếu bạn đã từng đăng tin trên Phongtro123.com, hãy sử dụng chức năng ĐẨY TIN / GIA HẠN / NÂNG CẤP VIP trong mục QUẢN LÝ TIN ĐĂNG để làm mới, đẩy tin lên cao thay vì đăng tin mới. Tin đăng trùng nhau sẽ không được duyệt.</span>
      </div>
      <div className='flex gap-5'>
        <div className='flex-auto flex-col'>
          <RentalAddress invalidFields={invalidFields} SetInvalidFields={SetInvalidFields} payload={payload} Setpayload = {Setpayload}/>
          <DescriptionInfornation invalidFields={invalidFields} SetInvalidFields={SetInvalidFields} payload={payload} Setpayload = {Setpayload}/>
          <div className='flex flex-col gap-5'>
            <h2 className='font-bold text-[1.5rem] mt-[3rem]'>Hình ảnh</h2>
            <div className='flex flex-col gap-3 justify-between text-sm'>
              <span>Cập nhật hình ảnh rõ ràng sẽ cho thuê nhanh hơn</span>
              <div className='h-[180px]'>
                <label htmlFor='uploadFile' className='border-[2px] flex flex-col items-center gap-2 h-full border-dashed border-[#ddd] p-[2rem] text-center cursor-copy'>
                  {isLoading ? <Loading text/> : <div className='leading-7'>
                    <div className='bg-UPLOAD_IMG w-[90px] h-[90px] bg-contain bg-no-repeat bg-center'></div>
                    <span>Thêm Ảnh</span>
                  </div>}
                </label>
                <input onChange={handlFiles} hidden type='file' id='uploadFile' multiple></input>
              </div>
              <div className='flex gap-[21px] flex-wrap justify-start'>
                {imagesPreview?.map((item,index) =>{
                  return (
                    <div key={index} className='flex flex-col photo-item'>
                      <div className='overflow-hidden w-[140px] h-[140px]'>
                        <img className='h-full w-full object-cover' src={item || ''} alt="preview"></img>
                      </div>
                      <div className='flex items-center text-[0.9rem] justify-center py-[5px]'>
                        <span onClick={(e) => handleDeleteImage(item,index,e)} title='Xoá' className='bg-red-500 rounded text-white flex items-center py-[3px] px-3 cursor-pointer'>
                          {(isLoadingDelete === true && LoadingTimeoutIndex === index) ? <Loading size = {20}/> : <AiOutlineDelete size={20}/>}
                          <span className='mt-[3px] ml-[4px]'>Xoá</span>
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-5'>
            <h2 className='font-bold text-[1.5rem] mt-[3rem]'>Video</h2>
            <InputFormv2 label={'Video Link (Youtube)'} type={'linkYT'}/>
            <div className='flex flex-col gap-3 text-sm'>
              <span>Hoặc upload Video từ máy của bạn</span>
              <div className='mb-[1rem] h-[180px]'>
                <div className='border-[2px] flex flex-col items-center gap-2 h-full border-dashed border-[#ddd] p-[2rem] text-center cursor-copy'>
                    <div className='bg-UPLOAD_VIDEO w-[90px] h-[90px] bg-no-repeat bg-contain bg-center'></div>
                    <span>Thêm Video</span>
                </div>
              </div>
            </div>
          </div>
          <button onClick={handleSubmit} className='w-full mb-[3rem] mt-[3rem] submit_post text-[1rem] hover:bg-[#28a746de] px[1rem] py-[0.5rem] bg-[#28a745] text-white rounded cursor-pointer'>
            {isLoadingCreate ? 'Đang tạo...' : 'Tiếp Tục'}
          </button>
        </div>
        <div className='w-[30%] flex-none bg-yellow-400'>
          maps
          <Loading/>
        </div>
      </div>
    </div>
  )
}

export default CreatePost