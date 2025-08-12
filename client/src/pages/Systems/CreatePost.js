import React ,{useEffect, useState}from 'react'
import Breadcrumb from './Breadcrumb'
import { DescriptionInfornation, InputFormv2, RentalAddress, Loading, SelectTpyePost} from '../../components'
import icons from '../../unltils/icon';
import { apiCreateNewPost, apiDeleteCloud, apiUpdatePostsAdmin, apiUploadImages } from '../../services';
import { useDispatch, useSelector } from 'react-redux';
import { getCodesPrices ,getCodesAcreages } from '../../constants/function/GetCode';
import { AiOutlineDelete } from 'react-icons/ai';
import Swal from 'sweetalert2';
import { useNavigate, useLocation} from 'react-router-dom';
import validate from '../../unltils/validateFieldsCreatePost';
import * as actions from '../../store/actions';
import generateDate from '../../constants/function/GenerateDate';
import {TypePrice_Day,TypePrice_Month,TypePrice_Week,TypeData} from '../../unltils/dataTypePost'
const {FcAddImage,FcVideoCall,MdOutlineDeleteForever, TiTick} = icons;
const CreatePost = ({dataPostAdmin , hashtag, isCheck}) => {
  const [payload,Setpayload] = useState({
    categoryCode : '',
    categoryValue : '',
    title : '',
    priceNumber : '',
    acreageNumber :'',
    images : '',
    address : '',
    priceCode : '',
    ward : '',
    district : '',
    acreageCode :'',
    description : '',
    target : 'Tất cả',
    province :'',
  });
  useEffect(()=>{
    dispatch(actions.changeDataPost(dataPostAdmin));
    // let categoryValue = categories.find(item => item.code === e.target.value).value;
    dataPostAdmin && SetimagesPreview(JSON.parse(dataPostAdmin?.imagesData?.images));
    dataPostAdmin && Setpayload({
      ...payload,
      categoryCode : dataPostAdmin?.categoryCode || '',
      // categoryValue : payload.categoryCode
      title : dataPostAdmin?.title || '',
      priceNumber : +dataPostAdmin?.priceNumber * 1000000 || '',
      acreageNumber : +dataPostAdmin?.acreageNumber || '',
      images : JSON.parse(dataPostAdmin?.imagesData?.images) || '',
      address : dataPostAdmin?.address || '',
      priceCode : dataPostAdmin?.priceCode || '',
      ward : dataPostAdmin?.ward || '',
      district : dataPostAdmin?.district || '',
      acreageCode : dataPostAdmin?.acreageCode || '',
      description : JSON.parse(dataPostAdmin?.description) || '',
      target : dataPostAdmin?.overviewData?.target || 'Tất cả',
      province : dataPostAdmin?.province || '',
    })
  },[dataPostAdmin])
  const [imagesPreview,SetimagesPreview] = useState([]);
  const [isLoading,SetIsloading] = useState(false);
  const [isLoadingDelete,SetIsloadingDelete] = useState(false);
  const [LoadingTimeoutIndex,SetLoadingTimeoutIndex] = useState();
  const [invalidFields,SetInvalidFields] = useState([]);
  const [public_id,Setpublic_id] = useState([]);
  const { prices, acreages, categories, province} = useSelector(state => state.app);
  const {TimePost,TypePost, NumberPost} = useSelector(state => state.post);
  const { user } = useSelector(state => state.user);
  const [postPackage,SetpostPackage] = useState('NORMAL');
  const [timePackage,SettimePackage] = useState('Đăng theo ngày');
  const [numberPackage,SetnumberPackage] = useState('4');
  const [checkPay,SetcheckPay] = useState(false);
  const [bonus,Setbonus] = useState('');
  const navigate =  useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const pathnameCU = location.pathname.split('/')[3] // C : CREATE , U : UPDATE
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
      if (response?.status === 200) {
        images.push(response.data.secure_url);
        public_id.push(response.data.public_id);
      }
    }
    SetIsloading(false);
    SetimagesPreview(prev => [...prev,...images]);  
    Setpublic_id(prev => [...prev,...public_id]);
    Setpayload(prev => ({...prev,images : [...payload?.images,...images]}))                                           
  }
  const pay = (money,accountBalance) =>{
    if (money > accountBalance) {
      return false
    }else{
      return true
    }
  }
  const handleDeleteImage = async (image,index,e) => {
    e.stopPropagation();
    SetIsloadingDelete(true);
    SetLoadingTimeoutIndex(index); 
    // let filename = public_id[index] || image.split('/').slice(-2).join('/').split('.')[0];
    // const response = await apiDeleteCloud({filename : filename});
    // if (response?.data.error === 0) {
    //   Setpublic_id(prev => prev?.filter(item => item !== filename));
    // }
    imagesPreview && SetimagesPreview(prev => prev?.filter(item => item !== image));  
    Setpayload(prev => ({...prev,images : prev.images.filter(item => item !== image)})) ;
    SetIsloadingDelete(false)
  }
  const handleSubmit = async () => {
    if (+payload.priceNumber < 0 || +payload.acreageNumber < 0) {
      Swal.fire({
        title: "Thất bại!",
        text: "Bạn nhập giá trị không hợp lệ",
        icon: "info",
        width : 450,
      });
      if (+payload.priceNumber < 0) {
        SetInvalidFields(prev => [...prev,{
          name : 'priceNumber',
          message :  'Bạn nhập giá phòng không hợp lệ'
        }]);
      }
      if (+payload.acreageNumber < 0) {
        SetInvalidFields(prev => [...prev,{
          name : 'acreageNumber',
          message :  'Bạn nhập diện tích không hợp lệ'
        }]);
      }
    }else{
      let priceCode = getCodesPrices(+payload.priceNumber / Math.pow(10,6),prices)[0].code;
      let handle_acreageCode = getCodesAcreages(+payload.acreageNumber,acreages);
      let acreageCode = handle_acreageCode.length > 0 ? handle_acreageCode[0].code : handle_acreageCode.code
      let addressString = payload?.address?.split(',');
      let categoryString = categories?.find(item => item.code === payload?.categoryCode)?.value;
      const finally_payload = {
        ...payload,
        priceCode,
        acreageCode,
        userID : user?.id,
        priceNumber : +payload.priceNumber / Math.pow(10,6),
        categoryValue : categoryString,
        label : `${categoryString ? categoryString : ''}${addressString[addressString.length - 2] ? addressString[addressString.length - 2] : ''}`
      };
      const results = validate(finally_payload,SetInvalidFields);
      if (results === 0) {
        if(dataPostAdmin) {
          finally_payload.postID = dataPostAdmin.id
          finally_payload.imagesID = dataPostAdmin.imagesID
          finally_payload.overviewID = dataPostAdmin.overviewID
          finally_payload.attributesID = dataPostAdmin.attributesID
          // finally_payload.categoryValue = 
        };
        if (hashtag) {
          if(isCheck || pathnameCU === 'dang-lai-tin') {
            let payment = pay(handlePricePAY(timePackage,numberPackage,postPackage),user?.accountBalance);
            let price = handlePricePAY(timePackage,numberPackage,postPackage) || 0;
            finally_payload.expired = generateDate(handleDay(timePackage,numberPackage)).expired
            finally_payload.bonus = handleType(TypePost);
            if (payment) {
              finally_payload.accountBalance = +(user?.accountBalance - price);
              const response = await apiUpdatePostsAdmin(finally_payload);
                if (response?.data.error === 0) {
                  Swal.fire({
                    title: "Thành công!",
                    text: `Cập nhật tin #${hashtag} thành công`,
                    icon: "success",
                    width : 450,
                  }).then((results) =>{
                    if (results.isConfirmed) {
                      dispatch(actions.getUser());
                      navigate('/quan-ly/tin-dang')
                    }
                  });
                }else{
                  Swal.fire({
                    title: "Oops!",
                    text: "Có vẻ có lỗi !",
                    icon: "error",
                    timer: 2000,
                    width : 450,
                  });
                }
            }else{
              Swal.fire({
                title: "Oops!",
                text: "Tài khoản của bạn không đủ tiền !",
                icon: "error",
                width : 450,
              })
            }
          }else{
            const response = await apiUpdatePostsAdmin(finally_payload);
            if (response?.data.error === 0) {
              Swal.fire({
                title: "Thành công!",
                text: `Cập nhật tin #${hashtag} thành công`,
                icon: "success",
                width : 450,
              }).then((results) =>{
                if (results.isConfirmed) {
                  navigate('/quan-ly/tin-dang')
                }
              });
            }else{
              Swal.fire({
                title: "Oops!",
                text: "Có vẻ có lỗi !",
                icon: "error",
                timer: 2000,
                width : 450,
              });
            }
          }

        }else{
          const response = await apiCreateNewPost(finally_payload);
          if (response?.data.error === 0) {
            Swal.fire({
              title: "Đăng Tin Thành công!",
              text: "Đã thêm bài đăng mới!",
              icon: "success",
              width : 450,
            }).then((results) => {
              if (results.isConfirmed) {
                navigate('/quan-ly/tin-dang')
              }
              Setpayload({
                categoryCode : '',
                title : '',
                priceNumber : '',
                acreageNumber : '',
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
              SetimagesPreview([]);
            });
          }else{
            Swal.fire({
              title: "Oops!",
              text: "Có vẻ có lỗi !",
              icon: "error",
              timer: 2000,
              width : 450,
            });
          }
        }
      }else{
        Swal.fire({
          title: "Thất bại!",
          text: "Vui lòng cung cấp thêm dữ liệu.",
          icon: "info",
          width : 450,
        });
      }
    }
  }
  useEffect(()=>{
    timePackage && dispatch(actions.TimePost(timePackage));
    timePackage && SetnumberPackage('');
    postPackage && dispatch(actions.TypePost(postPackage));
  },[timePackage,postPackage]);
  const handlePricePAY = (timePackage,NumberDay,type) =>{
    const DataPrice = NumberDay ? NumberDay : timePackage === 'Đăng theo ngày' ? 4 : 1;
    switch (timePackage) {
      case 'Đăng theo ngày':
        if (type === 'NORMAL') {
          return +DataPrice * TypePrice_Day.NORMAL
        }else if (type === 'VIP3') {
          return +DataPrice * TypePrice_Day.VIP3
        }else if (type === 'VIP2') {
          return +DataPrice * +TypePrice_Day.VIP2
        }else if (type === 'VIP1') {
          return +DataPrice * TypePrice_Day.VIP1
        }else{
          return +DataPrice * TypePrice_Day.PROVIP
        }
      case 'Đăng theo tháng' :
        if (type === 'NORMAL') {
          return +DataPrice * TypePrice_Month.NORMAL
        }else if (type === 'VIP3') {
          return +DataPrice * TypePrice_Month.VIP3
        }else if (type === 'VIP2') {
          return +DataPrice * TypePrice_Month.VIP2
        }else if (type === 'VIP1') {
          return +DataPrice * TypePrice_Day.VIP1
        }else{
          return +DataPrice * TypePrice_Month.PROVIP
        }
      case 'Đăng theo tuần' :
        if (type === 'NORMAL') {
          return +DataPrice * TypePrice_Week.NORMAL
        }else if (type === 'VIP3') {
          return +DataPrice * TypePrice_Week.VIP3
        }else if (type === 'VIP2') {
          return +DataPrice * TypePrice_Week.VIP2
        }else if (type === 'VIP1') {
          return +DataPrice * TypePrice_Week.VIP1
        }else{
          return +DataPrice * TypePrice_Week.PROVIP
        }
      default:
        break;
    }
  }
  const unitPrice = (Timetype,TypeData) =>{
    let Uprice = ''
    switch (Timetype) {
      case 'Đăng theo ngày':
        if (TypeData === 'NORMAL') {
          Uprice = `${TypePrice_Day.NORMAL.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ/ngày`
          break;
        }else if (TypeData === 'VIP1') {
          Uprice = `${TypePrice_Day.VIP1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ/ngày`
          break;
        }else if (TypeData === 'VIP2') {
          Uprice = `${TypePrice_Day.VIP2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ/ngày`
          break;
        }else if (TypeData === 'VIP3') {
          Uprice = `${TypePrice_Day.VIP3.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ/ngày`
          break;
        }else{
          Uprice = `${TypePrice_Day.PROVIP.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ/ngày`
          break;
        }
      case 'Đăng theo tháng' :
        if (TypeData === 'NORMAL') {
          Uprice = `${TypePrice_Month.NORMAL.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ/tháng`
          break;
        }else if (TypeData === 'VIP1') {
          Uprice = `${TypePrice_Month.VIP1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ/tháng`
          break;
        }else if (TypeData === 'VIP2') {
          Uprice = `${TypePrice_Month.VIP2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ/tháng`
          break;
        }else if (TypeData === 'VIP3') {
          Uprice = `${TypePrice_Month.VIP3.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ/tháng`
          break;
        }else{
          Uprice = `${TypePrice_Month.PROVIP.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ/tháng`
          break;
        }
      case 'Đăng theo tuần' :
        if (TypeData === 'NORMAL') {
          Uprice = `${TypePrice_Week.NORMAL.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ/tuần`
          break;
        }else if (TypeData === 'VIP1') {
          Uprice = `${TypePrice_Week.VIP1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ/tuần`
          break;
        }else if (TypeData === 'VIP2') {
          Uprice = `${TypePrice_Week.VIP2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ/tuần`
          break;
        }else if (TypeData === 'VIP3') {
          Uprice = `${TypePrice_Week.VIP3.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ/tuần`
          break;
        }else{
          Uprice = `${TypePrice_Week.PROVIP.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ/tuần`
          break;
        }
      default:
        break;
    }
    return Uprice
  }
  const handleDay = (type,numberPackage) => {
    let day = numberPackage ? numberPackage : type === 'Đăng theo ngày' ? 4 : 1
    if (type === 'Đăng theo tháng') {
      return day * 30
    }else if (type === 'Đăng theo ngày') {
      return day
    }else {
      return day * 7
    }
  }
  const handleType = (type) => {
    let typefinal = ''
    switch (type) {
      case 'NORMAL':
        typefinal = TypeData.NORMAL
        break;
      case 'VIP1':
        typefinal = TypeData.VIP1
        break;
      case 'VIP2':
        typefinal = TypeData.VIP2
        break;
      case 'VIP3':
        typefinal = TypeData.VIP3
        break;
      case 'PROVIP':
        typefinal = TypeData.PROVIP
        break;
      default:
        break;      
    }
    return typefinal
  }
  return (
    <div className='w-full h-full bg-white text-black'>
      <div className='py-[0.75rem] px-[1rem] bg-[#e9ecef] rounded'><Breadcrumb route={'Đăng tin mới'}/></div>
      <div className='border-b border-solid border-[#dee2e6] mb-4'>
        <h1 className='text-[2rem] mb-[.5rem]'>{pathnameCU === 'dang-lai-tin' ? 'Đăng lại tin' : pathnameCU === 'sua-tin-dang' ? `Sửa tin đăng (Mã tin: ${hashtag})` : 'Đăng tin mới'}</h1>
      </div>
      {dataPostAdmin ? <div className='mb-11'>
        <span>{dataPostAdmin.title}</span>
      </div> : <div className='bg-[#f8d7da] py-[0.75rem] px-[1.25rem] mb-11 border border-solid border-[#f5c6cb] text-sm rounded'>
        <span>Nếu bạn đã từng đăng tin trên Phongtro123.com, hãy sử dụng chức năng ĐẨY TIN / GIA HẠN / NÂNG CẤP VIP trong mục QUẢN LÝ TIN ĐĂNG để làm mới, đẩy tin lên cao thay vì đăng tin mới. Tin đăng trùng nhau sẽ không được duyệt.</span>
      </div>}
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
              <small className='text-red-500 text-[15px]'>
                {invalidFields?.some(item => item.name === 'images'.toLowerCase()) && invalidFields.find(item => item.name === 'images'.toLowerCase())?.message}
              </small>
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
          {(isCheck || pathnameCU === 'dang-lai-tin') && <div className='flex gap-5 text-sm'>
            <SelectTpyePost label = {'Chọn loại tin'} type = {'TypePost'} value = {postPackage} Setvalue={SetpostPackage}/>
            <SelectTpyePost label = {'Gói thời gian'} type = {'Time_Package'} value = {timePackage} Setvalue={SettimePackage}/>
            <SelectTpyePost label = {timePackage === 'Đăng theo tuần' ? 'Số tuần' : timePackage === 'Đăng theo tháng' ? 'Số tháng' : 'Số ngày'} type = {'Number_of_Packages'} value = {numberPackage} Setvalue={SetnumberPackage}/>
          </div>}
          {(isCheck || pathnameCU === 'dang-lai-tin') ? <button onClick={handleSubmit} className='w-full flex items-center justify-center mb-[1.5rem] mt-[1.5rem] submit_post text-[1rem] px[1rem] py-[0.5rem] bg-[#007bff] border-[#007bff] text-white rounded cursor-pointer'>
            {`Thanh toán phí gia hạn tin (${handlePricePAY(timePackage,numberPackage,postPackage).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ)`}
          </button> : dataPostAdmin ? <button onClick={handleSubmit} className='w-full flex items-center justify-center mb-[1.5rem] mt-[1.5rem] submit_post text-[1rem] hover:bg-[#28a746de] px[1rem] py-[0.5rem] bg-[#28a745] text-white rounded cursor-pointer'>
            <TiTick size={20}/>Cập nhật
          </button> : <button onClick={handleSubmit} className='w-full mb-[1.5rem] mt-[1.5rem] submit_post text-[1rem] hover:bg-[#28a746de] px[1rem] py-[0.5rem] bg-[#28a745] text-white rounded cursor-pointer'>
            Đăng tin !
          </button>}
        </div>
        {(isCheck || pathnameCU === 'dang-lai-tin') ? <div className='w-[30%] flex-none'>
          <div className='border-2 border-solid flex flex-col bg-white rounded'>
            <div className='p-4'>
              <h5 className='mb-3'>Thông tin thanh toán</h5>
              <table className='w-full max-w-full table-auto mb-[1rem] bg-transparent text-[0.9rem] border-collapse'>
                <tbody>
                  <tr className='bg-[#f2f2f2] border-t-2 border-b-2'>
                    <td className='p-2'>Bạn đang có:</td>
                    <td className='p-2'>{user?.accountBalance ? user?.accountBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : '0'}đ</td>
                  </tr>
                  <tr>
                    <td className='p-2'>Loại tin:</td>
                    <td className='p-2'>{handleType(TypePost)}</td>
                  </tr>
                  <tr className='bg-[#f2f2f2] border-t-2 border-b-2'>
                    <td className='p-2'>Gói thời gian:</td>
                    <td className='p-2'>{timePackage}</td>
                  </tr>
                  <tr>
                    <td className='p-2'>Đơn giá:</td>
                    <td className='p-2'>{unitPrice(timePackage,postPackage)}</td>
                  </tr>
                  <tr>
                    <td className='p-2'>Số ngày:</td>
                    <td className='p-2'>{handleDay(timePackage,numberPackage)}</td>
                  </tr>
                  <tr className='bg-[#f2f2f2] border-t-2 border-b-2'>
                    <td className='p-2'>Ngày hết hạn:</td>
                    <td className='p-2'>{`${generateDate(handleDay(timePackage,numberPackage)).expired.split(', ')[1]}`}</td>
                  </tr>
                  <tr>
                    <td className='p-2 align-middle'>Thành tiền:</td>
                    <td className='p-2 text-[30px] font-bold text-[#F90]'>{`${handlePricePAY(timePackage,numberPackage,postPackage).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ`}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div> : <div className='w-[30%] flex flex-col gap-9'>
          <div className='bg-map w-full h-[400px] bg-cover rounded-md'></div>
          <div className='bg-[#fbe8d2] p-5 flex flex-col gap-1 rounded-md'>
            <h3 className='text-[1.3rem] mb-2 font-bold'>Lưu ý tin đăng</h3>
            <div className='flex flex-col gap-1 text-sm'>
              <p>• Nội dung phải viết bằng tiếng Việt có dấu</p>
              <p>• Tiêu đề tin không dài quá 100 kí tự</p>
              <p>• Các bạn nên điền đầy đủ thông tin vào các mục để tin đăng có hiệu quả hơn.</p>
              <p>• Để tăng độ tin cậy và tin rao được nhiều người quan tâm hơn, hãy sửa vị trí tin rao của bạn trên bản đồ bằng cách kéo icon tới đúng vị trí của tin rao.</p>
              <p>• Tin đăng có hình ảnh rõ ràng sẽ được xem và gọi gấp nhiều lần so với tin rao không có ảnh. Hãy đăng ảnh để được giao dịch nhanh chóng!</p>
            </div>
          </div>
        </div>}
      </div>
    </div>
  )
}

export default CreatePost