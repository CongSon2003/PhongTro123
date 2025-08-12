import { IoMdClipboard } from "react-icons/io";
import icons from "./icon";
const {LuClipboardList,LiaEdit,GoClock, AiOutlineDollar,GoHeart,MdOutlineBookmarkAdded,BiMessageRoundedError} = icons;
const menuSideBar = [
    {
        id : 1,
        text : 'Quản lý tin đăng',
        path : '/quan-ly/tin-dang',
        image : <img src="../../public/cash.png" ></img>,
        icon : <LuClipboardList size={17}/>
    },{
        id : 2,
        text : 'Sửa thông tin cá nhân',
        path : '/quan-ly/cap-nhat-thong-tin-ca-nhan',
        icon : <LiaEdit size={17}/>
    },{
        id : 3,
        text : 'Nạp tiền vào tài khoản',
        path : '/quan-ly/nap-tien',
        icon : < AiOutlineDollar size={17} />
    },{
        id : 4,
        text : 'Lịch sử nạp tiền',
        path : '/quan-ly/lich-su-nap-tien',
        icon : <GoClock size={17}/>
    },{
        id : 5,
        text : 'Bảng giá dịch vụ',
        path : '/bang-gia-dich-vu',
        icon : <IoMdClipboard size={17}/>
    },{
        id : 6,
        text : 'Liên hệ',
        path : '/lien-he',
        icon : <BiMessageRoundedError size={17}/>
    },{
        id : 7,
        text : 'Tin đã lưu',
        path : '/tin-dang-da-luu',
        icon :<GoHeart size={17}/>
    }
];
export default menuSideBar