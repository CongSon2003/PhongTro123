import React, { useEffect, useState } from 'react'
import Breadcrumb from './Breadcrumb';
import moment from 'moment';
import Swal from 'sweetalert2';
import icons from '../../unltils/icon';
import {useSelector,useDispatch} from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { apiDeletePostsAdmin } from '../../services';
import * as actions from '../../store/actions';
const {IoIosArrowDown,IoIosArrowUp,HiArrowPathRoundedSquare,BsPencilSquare, AiOutlineDelete, MdOutlineStar, FaRegEyeSlash} = icons;
const ManagerPost = () => {
    const [focusFilterVIP,SetFocusFilterVIP] = useState(false);
    const [focusFilterStatus,SetfocusFilterStatus] = useState(false);
    const [RerenderUpdateData,SetRerenderUpdateData] = useState(false);
    const [posts,Setposts] = useState([]);
    const {postAdmin} = useSelector(state => state.post);
    const {categories} = useSelector(state => state.app);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(actions.getPostsLimitAmin());
    },[RerenderUpdateData])
    useEffect(()=>{
        postAdmin && Setposts(postAdmin);
    },[postAdmin]);
    const handleFocus = ()=>{
        SetFocusFilterVIP(prev => !prev);
    }
    const handleFocusFilterStatus = () =>{
        SetfocusFilterStatus(prev => !prev);
    }
    const routePost_again = (dataCode,isExpired) =>{
        let code = dataCode.replace('#','');
        if (isExpired) {
            dispatch(actions.IsCheckPost(true));
            navigate(`/quan-ly/tin-dang/dang-lai-tin/${code}`);
        }else{
            dispatch(actions.IsCheckPost(false));
            navigate(`/quan-ly/tin-dang/sua-tin-dang/${code}`);
        }
    }
    const handleCheckStatus =(expiredDate) =>{
        // Tạo các đối tượng moment để so sánh :
        // item expired day
        const timeString = expiredDate?.split(', ')[1];
        let expiredTime = timeString.split(' ')[0];
        let expiredDay = timeString.split(' ')[1];
        let [day,month,year] = expiredDay.split('/'); // day and month , year expired
        // item current day
        let today = new Date();
        let today_time = `${today.getHours()}:${today.getMinutes()}` // current time
        let today_year_month_day = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

        var currentMoment = moment(`${today_year_month_day} ${today_time}`, 'YYYY-MM-DD HH:mm');
        var expiredMoment = moment(`${year}-${month}-${day} ${expiredTime}`, 'YYYY-MM-DD HH:mm');

        // So sánh hai thời điểm Current và Expired :
        var diffInSeconds = expiredMoment.diff(currentMoment, 'seconds');
        return diffInSeconds <= 0 ? true : false

    }
    const handleDeletePost = async (postID,hashtag) =>{
        Swal.fire({
            title: `Bạn có chắc xóa tin ${hashtag} này không?`,
            text: "Bạn sẽ không thể hoàn tác điều này!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Vâng, xóa nó đi!",
            cancelButtonText : "Hủy bỏ",
          }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await apiDeletePostsAdmin(postID);
                if (response?.data?.error === 0) {
                    SetRerenderUpdateData(prev => !prev);
                    Swal.fire({
                        title: "Deleted!",
                        text: "Tin đăng của bạn đã bị xóa.",
                        icon: "success"
                    });
                }
            }
        });
    }
    const handleFilterStatus = (status) =>{
        switch (status) {
            case 0 :
                Setposts(postAdmin);
                break;
            case 1:
                const publishPost = postAdmin?.filter(item => !handleCheckStatus(item.overviewData.expired));
                Setposts(publishPost);
                break;
            case 2 :
                const expiredPost = postAdmin?.filter(item => handleCheckStatus(item.overviewData.expired));
                Setposts(expiredPost);
                break;
            case 3 :
                // const hiddenPost = 
                break;
            default:
                break;
        }
    }
    window.onclick = function(event) {
        const dropdown_filterVip = document.getElementsByClassName('filterVip');
        const dropdown_filterStatus = document.getElementsByClassName('filterStatus');
        const Svg_filterVip = document.getElementsByClassName('Svg_filterVip');
        if (event.target.parentNode !== dropdown_filterVip[0] && event.target.parentNode !== null && event.target.parentNode !== Svg_filterVip[0]) {
            SetFocusFilterVIP(false);
        }
        if (event.target.parentNode !== dropdown_filterStatus[0] && event.target.parentNode !== null && event.target.parentNode !== Svg_filterVip[0]) {
            SetfocusFilterStatus(false);
        }
        
    };
  return (
    <div className='bg-white text-black flex flex-col'>
      <div className='py-[0.75rem] px-[1rem] bg-[#e9ecef] rounded'><Breadcrumb route={'Danh sách tin đăng'}/></div>
      <div className='border-b border-solid border-[#dee2e6] mb-4 flex items-center justify-between'>
        <h1 className='text-[2rem] py-2'>Quản lý tin đăng</h1>
        <div className='flex items-center gap-1'>
            <div className='w-52 border rounded border-[#6c757d] text-[#6c757d]'>
                <input name='searchCode' className='Search-Code-title text-sm rounded w-full outline-none py-1 px-2' placeholder='Tìm theo mã tin hoặc tiêu đề'></input>
            </div>
            <div onClick={() => handleFocus()} className={`${focusFilterVIP ? 'Focus-filterVip' : ''} cursor-pointer relative border text-sm rounded border-[#6c757d] flex items-center`}>
                <div className={`flex items-center filterVip ${focusFilterVIP ? '' : 'text-[#6c757d]'} hover:bg-[#6c757d] hover:text-white`}>
                    <button className='py-1 pl-2'>
                        Lọc theo loại VIP
                    </button>
                    <span className='p-1'>{focusFilterVIP ? <IoIosArrowDown className='Svg_filterVip'/> : <IoIosArrowUp className='Svg_filterVip'/>}</span>
                </div>
                {focusFilterVIP && <div className='absolute top-8 left-0 right-0 border rounded text-black'>
                    <ul className='bg-white rounded'>
                        <li className='py-2 px-3 hover:bg-slate-200'>Tin thường</li>
                        <li className='py-2 px-3 hover:bg-slate-200'>Tin VIP 3</li>
                        <li className='py-2 px-3 hover:bg-slate-200'>Tin VIP 2</li>
                        <li className='py-2 px-3 hover:bg-slate-200'>Tin VIP 1</li>
                        <li className='py-2 px-3 hover:bg-slate-200'>Tin Hot</li>
                    </ul>
                </div>}
            </div>
            <div onClick={() => handleFocusFilterStatus()} className={`${focusFilterStatus ? 'Focus-filterStatus' : ''} cursor-pointer relative border text-sm rounded border-[#6c757d] flex items-center`}>
                <div className={`flex items-center filterStatus ${focusFilterStatus ? '' : 'text-[#6c757d]'} hover:bg-[#6c757d] hover:text-white`}>
                    <button className='py-1 pl-2'>
                        Lọc theo trạng thái
                    </button>
                    <span className='p-1'>{focusFilterStatus? <IoIosArrowDown/> : <IoIosArrowUp/>}</span>
                </div>
                {focusFilterStatus && <div className='absolute top-8 left-0 right-0 border rounded text-black'>
                    <ul className='bg-white rounded'>
                        <li onClick={() => handleFilterStatus(0)} className='py-2 px-3 hover:bg-slate-200'>Tất cả tin</li>
                        <li onClick={() => handleFilterStatus(1)} className='py-2 px-3 hover:bg-slate-200'>Tin đang hiện thị</li>
                        <li onClick={() => handleFilterStatus(2)} className='py-2 px-3 hover:bg-slate-200'>Tin hết hạn</li>
                        <li onClick={() => handleFilterStatus(3)} className='py-2 px-3 hover:bg-slate-200'>Tin đang ẩn</li>
                    </ul>
                </div>}
            </div>
            <div className='border rounded gap-1 text-sm bg-[#dc3545] text-white flex items-center'>
                <button className='py-1 px-2'>
                    Đăng tin mới
                </button>
            </div>
        </div>
      </div>
      <table className="w-full text-sm table-auto border border-solid border-[#dee2e6]">
        <thead>
            <tr>
                <th className='border border-b-2 border-solid border-[#dee2e6] p-3'>Mã tin</th>
                <th className='border border-b-2 border-solid border-[#dee2e6] p-3'>Ảnh đại diện</th>
                <th className='border border-b-2 border-solid border-[#dee2e6] p-3'>Tiêu đề</th>
                <th className='border border-b-2 border-solid border-[#dee2e6] p-3'>Giá</th>
                <th className='border border-b-2 border-solid border-[#dee2e6] p-3'>Ngày bắt đầu</th>
                <th className='border border-b-2 border-solid border-[#dee2e6] p-3'>Ngày hết hạn</th>
                <th className='border border-b-2 border-solid border-[#dee2e6] p-3'>Trạng thái</th>
            </tr>
        </thead>
        <tbody>
            {posts.length > 0 ? posts?.map(item =>{
                return (
                    <tr key={item.id}>
                        <th className='border border-[#dee2e6] p-2 font-normal'>{item.overviewData?.code}</th>
                        <th className='border border-[#dee2e6] p-2 font-normal items-center'>
                           <div className='w-[100px] h-[100px] overflow-hidden'>
                                <img src={JSON.parse(item.imagesData.images)[0] || ''} className='w-full h-full bg-cover object-cover' alt='avatarPost' ></img>
                           </div>
                        </th>
                        <th className='border border-[#dee2e6] p-2 font-normal text-left'>
                            <div className='flex flex-col items-start'>
                                <span className='px-2 py-1 bg-[#28a745] rounded-3xl text-white'>{categories?.find(i => i.code === item.categoryCode).code}</span>
                                <span className='text-[#055699] cursor-pointer hover:underline w-[450px] overflow-hidden font-bold text-ellipsis whitespace-nowrap'>{item.title || ''}</span>
                                <p className='my-3'><strong>Địa chỉ: </strong>{item.address || ''}</p>
                                <div className='flex gap-2'>
                                    {handleCheckStatus(item.overviewData.expired) ? <div onClick={() => routePost_again(item.overviewData?.code,handleCheckStatus(item.overviewData.expired))} className='flex items-center gap-1 bg-[#eee] p-1 rounded cursor-pointer'>
                                        <HiArrowPathRoundedSquare size={15}/>
                                        <span>Sửa và đăng lại</span>
                                    </div> : <div onClick={() => routePost_again(item.overviewData?.code,handleCheckStatus(item.overviewData.expired))} className='flex items-center gap-1 bg-[#eee] p-1 rounded cursor-pointer'>
                                        <BsPencilSquare size={15}/>
                                        <span>Sửa</span>
                                    </div>}
                                    {!handleCheckStatus(item.overviewData.expired) && <div className='flex items-center gap-1 bg-[#eee] p-1 rounded cursor-pointer '>
                                        <MdOutlineStar size={15} className="star-item" color="#febb02" />
                                        <span>Nâng cấp VIP</span>
                                    </div>}
                                    {!handleCheckStatus(item.overviewData.expired) && <div className='flex items-center gap-1 bg-[#eee] p-1 rounded cursor-pointer '>
                                        <FaRegEyeSlash size={15} className="star-item"/>
                                        <span>Ẩn tin</span>
                                    </div>}
                                    <div onClick={() => handleDeletePost(item?.id,item.overviewData?.code)} className='flex items-center gap-1 bg-[#eee] p-1 rounded cursor-pointer hover:bg-red-500 hover:text-white'>
                                        <AiOutlineDelete size={15}/>
                                        <span>Xóa</span>
                                    </div>
                                </div>
                            </div>
                        </th>
                        <th className='border border-[#dee2e6] p-2 text-[#37a344] font-normal'>{item.attributesData?.price || ''}</th>
                        <th className='border border-[#dee2e6] p-2 font-normal'>{item.overviewData?.created || ''}</th>
                        <th className='border border-[#dee2e6] p-2 font-normal'>{item.overviewData?.expired || ''}</th>
                        <th className={`border border-[#dee2e6] p-2 font-normal ${!handleCheckStatus(item.overviewData.expired) ? 'text-[#37a344]' : 'text-[#ffc107]'}`}>{handleCheckStatus(item.overviewData.expired) ? 'Tin đã hết hạn' : 'Tin đang hiển thị'}</th>
                    </tr>
                )
            }) : <tr><td className='p-2'>Bạn chưa có tin đăng nào. Bấm vào đây để bắt đầu đăng tin</td></tr>}
        </tbody>
        </table>
    </div>
  )
}

export default ManagerPost