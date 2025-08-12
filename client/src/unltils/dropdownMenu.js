import icons from "./icon";
const {LuClipboardList,LiaEdit,GoClock, AiOutlineDollar,GoHeart,MdOutlineBookmarkAdded} = icons;
const dropdownMenu = [
    {
        id : 1,
        text : 'Đăng tin cho thuê',
        path : '/quan-ly/dang-tin-moi',
        image : <img src="../../public/cash.png" ></img>,
        icon : <LuClipboardList size={17}/>
    },{
        id : 2,
        text : 'Quản lý tin đăng',
        path : '/quan-ly/tin-dang',
        icon : <MdOutlineBookmarkAdded size={17}/>
    },{
        id : 3,
        text : 'Nạp tiền',
        path : '/quan-ly/nap-tien',
        icon : < AiOutlineDollar size={17} />
    },{
        id : 4,
        text : 'Lịch sử nạp tiền',
        path : '/quan-ly/lich-su-nap-tien',
        icon : <GoClock size={17}/>
    },{
        id : 5,
        text : 'Thông tin cá nhân',
        path : '/quan-ly/cap-nhat-thong-tin-ca-nhan',
        icon : <LiaEdit size={17}/>
    },{
        id : 6,
        text : 'Tin đã lưu',
        path : '/tin-dang-da-luu',
        icon :<GoHeart size={17}/>
    },
];
export default dropdownMenu