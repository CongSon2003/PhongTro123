import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams, useSearchParams ,createSearchParams} from 'react-router-dom'
import { getPosts, getPostsLimit } from '../../store/actions';
import { RelatedBox, Slider, SmallItem } from '../../components';
import { MdOutlineStar } from 'react-icons/md';
import { RiMapPinUserFill } from 'react-icons/ri';
import { blobToBase64 } from '../../constants/function/TogetBase64';
import { FaCircleCheck } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import { CiShare2 } from "react-icons/ci";
import { FaExclamationCircle } from "react-icons/fa";
import * as actions from '../../store/actions';
import { SEARCH, SEARCH_PATH} from '../../constants/path';
const DetailPost = () => {
  const location = useLocation();
  const {postId} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {posts} = useSelector(state => state?.post);
  const {postsAll} = useSelector(state => state?.post);
  const [quantityPosts , SetquantityPosts] = useState(0);
  const [createdDateUser,SetcreatedDateUser] = useState('');
  const [isHoverHeart, SetisHoverHeart] = useState(false);
  const [OnClickHeart, SetOnClickHeart] = useState(false);
  const handleClickHeart = () => {
    if (OnClickHeart === true) {
      SetOnClickHeart(false);
    } else {
      SetOnClickHeart(true);
    }
  };
  useEffect(()=>{
    if (posts.length > 0 && postsAll.length > 0) {
      const DateUser = new Date(posts[0]?.userData?.createdAt);
      const countQuantity = postsAll.filter(item => item.userID === posts[0]?.userID);
      SetquantityPosts(countQuantity.length);
      SetcreatedDateUser(`${DateUser.getUTCDate()}/${DateUser.getUTCMonth()}/${DateUser.getFullYear()}`)
    }
  },[postsAll])
  useEffect(()=>{
    dispatch(getPostsLimit({id : postId}));
    dispatch(getPosts());
  },[postId]);
  const handleStar = (star) =>{
    let Stars = []
    for (let index = 0; index < parseInt(star); index++) {
      Stars.push(index)
    }
    return Stars
  }
  const handleFilterLabel = () => {
    let TextTitle_Search = `${posts[0]?.labelData?.value}`
    navigate({
      pathname : SEARCH,
      search : createSearchParams({labelCode : posts[0]?.labelData?.code}).toString(),
    },{state: {TextTitle_Search}});
  }
  return (
    <div className='w-full flex gap-4 mt-[12px] mb-[20px]'>
      <div className='left w-[70%] h-fit rounded-lg flex flex-col gap-4'>
        <Slider images={(posts.length > 0 && posts) ? JSON.parse(posts[0].imagesData.images) : null}/>
        <div className='bg-white p-[21px] flex flex-col gap-6 rounded-[0.5rem]'>
          <header className='flex flex-col gap-3 pb-5 border-b border-solid border-[#ddd]'>
            { posts[0]?.overviewData?.bonus === 'Tin thường' ? '' :
              <div className={`flex bg-[#E13427] text-white ${+posts[0]?.star >= 5 ? 'w-[27%]' : +posts[0]?.star <= 3 ? 'w-[18%]' : 'w-[21%]'} justify-center text-sm rounded-md uppercase items-center`}>
              {(handleStar(posts[0]?.star).length > 0 && posts && posts.length > 0) && handleStar(posts[0].star).map((item,index) =>{
                return <MdOutlineStar key={index} size={18} className="star-item mt-[1px]" color="yellow" />
              })}
              <span >{posts[0]?.overviewData?.bonus || '...'}</span>
              </div>
            }
            <h1 className='text-[#E13427] uppercase text-xl'>{posts[0]?.title}</h1>
            <address className='flex items-center gap-2'><RiMapPinUserFill />{posts[0]?.address}</address>
            <div>
              <span>Chuyên mục : </span>
              <span className='text-blue-600 underline font-medium hover:text-red-600 cursor-pointer'
                onClick={() => handleFilterLabel()}
              >{posts[0]?.labelData?.value}</span>
            </div>
            <div className='flex justify-between items-center'>
              <div>
                <span className='text-[#4daf51] font-bold'>{posts[0]?.attributesData?.price}</span>
                <span className='w-1 bg-[#aaa] rounded-[50%] h-1 inline-block ml-[1rem] mr-[1rem] mb-[5px]'></span>
                <span>{posts[0]?.acreageNumber}m <sup className='top-[-.5rem]'>2</sup></span>
                <span className='w-1 bg-[#aaa] rounded-[50%] h-1 inline-block ml-[1rem] mr-[1rem] mb-[5px]'></span>
                <time>Cập nhật : {posts[0]?.attributesData?.published}</time>
              </div>
              <div>
                <span>{`Mã tin: #${posts[0]?.attributesData?.hashtag}`}</span>
              </div>
            </div>
          </header>
          <div className='flex flex-col gap-3 pb-5 border-b border-solid border-[#ddd]'>
            <h2 className='font-bold text-lg'>
              Thông tin mô tả
            </h2>
            <div className='flex flex-col gap-3'>
              {posts[0]?.description && (typeof JSON.parse(posts[0]?.description) === 'object' ? JSON.parse(posts[0]?.description).map((item,index) =>{
                return (
                  <span key={index}>{item}</span>
                )
              }) : posts[0]?.description && JSON.parse(posts[0]?.description)?.split('\n').filter(i => i !== '').map(item => {return <span>{item}</span>}))}
            </div>
          </div>
          <div className='flex flex-col gap-3 pb-5 border-b border-solid border-[#ddd]'>
            <h2 className='font-bold text-lg'>Đặc điểm tin đăng</h2>
            <table className='w-full'>
              <tbody>
                <tr className='w-full bg-gray-200'>
                  <td className='p-2'>Mã tin</td>
                  <td className='p-2'>{posts[0]?.overviewData?.code}</td>
                </tr>
                <tr >
                  <td className='p-2'>Khu vực</td>
                  <td className='p-2'>{posts[0]?.overviewData?.area}</td>
                </tr>
                <tr className='w-full bg-gray-200'>
                  <td className='p-2'>Loại tin đăng</td>
                  <td className='p-2'>{posts[0]?.overviewData?.type}</td>
                </tr>
                <tr>
                  <td className='p-2'>Đối tượng</td>
                  <td className='p-2'>{posts[0]?.overviewData?.target}</td>
                </tr>
                <tr className='w-full bg-gray-200'>
                  <td className='p-2'>Gói tin</td>
                  <td className='p-2 text-[red]'>{posts[0]?.overviewData?.bonus}</td>
                </tr>
                <tr>
                  <td className='p-2'>Ngày đăng</td>
                  <td className='p-2'>{posts[0]?.overviewData?.created}</td>
                </tr>
                <tr className='w-full bg-gray-200'>
                  <td className='p-2'>Ngày hết hạn</td>
                  <td className='p-2'>{posts[0]?.overviewData?.expired}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='flex flex-col gap-3 pb-5'>
              <h2 className='font-bold text-lg'>Thông tin liên hệ</h2>
              <div className='flex gap-4'>
                <div className='w-[100px] h-[100px]'>
                  <img className='rounded-[50%] w-full h-full object-cover border-2 border-solid border-[#ddd]' src={posts[0]?.userData?.avatar ? blobToBase64(posts[0]?.userData?.avatar) : "https://res.cloudinary.com/dhelgqbba/image/upload/v1729568294/PhongTro123/km9lyky8jwbp2dkuddj7.jpg"}></img>
                </div>
                <div className='flex flex-col gap-2'>
                  <div className='flex justify-between items-center'>
                    <span>{posts[0]?.userData?.name}</span>
                    <div className='flex gap-1 items-center'>
                      <FaCircleCheck color='#45b674' size={15}/>
                      <span className='text-[#aaa] text-sm'>Đang hoạt động</span>
                    </div>
                  </div>
                  <div className='flex items-center'>
                    <span>{quantityPosts} tin đăng</span>
                    <span className='w-[3px] bg-[#aaa] rounded-[50%] h-[3px] inline-block ml-[1rem] mr-[1rem] mb-[5px]'></span>
                    <span>Tham gia từ: {createdDateUser || ''}</span>
                  </div>
                  <div className='flex justify-between items-center'>
                      <button className='flex items-center gap-2 bg-[#45b677] text-white px-[10px] py-[5px] rounded-[1rem]'>
                        <FaPhone/>
                        <span>{posts[0]?.userData?.phone}</span>
                      </button>
                      <a href='https://zalo.me/0847201199' className='flex items-center gap-2 bg-[#0068ff] px-[10px] py-[5px] text-white rounded-[1rem]'>
                        <AiOutlineMessage size={20}/>
                        <span>Nhắn Zalo</span>
                      </a>
                  </div>
                </div>
              </div>
          </div>
          <div className='p-[1rem] flex flex-col gap-2 bg-[#fffae8] border-2 border-solid border-[#ffe69c]'>
            <span className='font-bold'>Lưu ý:</span>
            <p>Chỉ đặt khi cọc xác định được chủ nhà và có thỏa thuận biên nhận rõ ràng. Kiểm tra mọi điều khoản và yêu cầu liệt kê tất cả chi phí hàng tháng vào hợp đồng. <span className='underline text-[#0068ff]'>Xem thêm</span></p>
            <p>Mọi thông tin liên quan đến tin đăng này chỉ mang tính chất tham khảo. Nếu bạn thấy rằng tin đăng này không đúng hoặc có dấu hiệu lừa đảo, <span className='underline text-[#0068ff]'>hãy phản ánh với chúng tôi.</span></p>
          </div>
        </div>
      </div>
      <div className='right w-[30%]'>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col justify-center items-center gap-4 bg-[#fee499] rounded-lg p-4'>
            <div className='w-[100px] h-[100px]'>
              <img className='rounded-[50%] w-full h-full object-cover border-2 border-solid border-[#ddd]' src={posts[0]?.userData?.avatar ? blobToBase64(posts[0]?.userData?.avatar) : "https://res.cloudinary.com/dhelgqbba/image/upload/v1729568294/PhongTro123/km9lyky8jwbp2dkuddj7.jpg"}></img>
            </div>
            <div className='flex flex-col gap-2'>
              <div className='flex flex-col justify-between items-center'>
                <span>{posts[0]?.userData?.name}</span>
                <div className='flex gap-1 items-center'>
                  <FaCircleCheck color='#45b674' size={15}/>
                  <span className='text-sm'>Đang hoạt động</span>
                </div>
              </div>
              <div className='flex items-center'>
                <span>{quantityPosts} tin đăng</span>
                <span className='w-[3px] bg-[#aaa] rounded-[50%] h-[3px] inline-block ml-[1rem] mr-[1rem] mb-[5px]'></span>
                <span>Tham gia từ: {createdDateUser || ''}</span>
              </div>
              <div className='flex flex-col justify-between items-center gap-2'>
                  <button className='flex items-center justify-center gap-2 bg-[#45b677] w-full text-white px-[14px] py-[7px] rounded-[1rem]'>
                    <FaPhone/>
                    <span>{posts[0]?.userData?.phone}</span>
                  </button>
                  <a href={`https://zalo.me/${posts[0]?.userData?.zalo}`} className='flex items-center justify-center gap-2 bg-[#0068ff] px-[14px] w-full py-[7px] text-white rounded-[1rem]'>
                    <AiOutlineMessage size={20}/>
                    <span>Nhắn Zalo</span>
                  </a>
              </div>
              <div className='flex gap-2 text-sm'>
                <button  
                  onClick={handleClickHeart}
                  className='px-3 py-1 gap-1 flex items-center bg-white rounded-md'>
                  <span className="w-[23px] h-[23px]">
                    {OnClickHeart ? (
                      <i className="bg-HEARTFILL bg-center w-[23px] h-[23px] bg-no-repeat inline-block bg-contain"></i>
                    ) : isHoverHeart ? (
                      <i className="bg-HEARTFILL bg-center w-[23px] h-[23px] bg-no-repeat inline-block bg-contain"></i>
                    ) : (
                      <i className="bg-NOHEARTFILL bg-center w-[23px] h-[23px] bg-no-repeat inline-block bg-contain"></i>
                    )}
                  </span>
                  <span>{OnClickHeart ? 'Đã lưu' : 'Lưu tin'}</span>
                </button>
                <button className='px-3 py-1 gap-1 flex items-center bg-white rounded-md'><CiShare2/>Chia sẻ</button>
                <button className='px-3 py-1 gap-1 flex items-center bg-white rounded-md'><FaExclamationCircle color='red'/>Báo xấu</button>
              </div>
            </div>
          
          </div>
          <RelatedBox isnewPost={true}/>
          <RelatedBox isnewPost={false}/>
        </div>
      </div>
    </div>
  )
}
export default DetailPost