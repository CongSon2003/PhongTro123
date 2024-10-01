export const HOME_PATH = '/*';
export const HOME_PATH__PAGE = ':page';
export const LOGIN_PATH = 'dang-nhap-tai-khoan';
export const REGISTER_PATH = 'dang-ky-tai-khoan';
export const REGULATION_PATH = 'quy-dinh-su-dung';
export const CHOTHUEPHONGTRO_PATH = 'cho-thue-phong-tro';
export const ForgotPassword_PATH = 'quen-mat-khau';
export const CHOTHUECAHO_PATH = 'cho-thue-can-ho';
export const NHACHOTHUE_PATH = 'nha-cho-thue';
export const CHOTHUEMATBANG_PATH = 'cho-thue-mat-bang';
export const DETAIL_POST__TITLE__POSTID = 'chi-tiet/:title/:postId';
export const SEARCH_PATH = 'tim-kiem';
// SYSTEM ROUTE: 
export const MANAGER = 'quan-ly/*';
export const CREATE_POST = 'dang-tin-moi';
export const MANAGER_POST = 'tin-dang';


export const text = {
    HOME_TEXT : 'Tìm kiếm chỗ thuê ưng ý',
    HOME_DESCRIPTION : 'Kênh thông tin Phòng trọ số 1 Việt Nam - Website đăng tin cho thuê phòng trọ, nhà nguyên căn, căn hộ, ở ghép nhanh, hiệu quả với 100.000+ tin đăng và 2.500.000 lượt xem mỗi tháng.'
};
export const normalizedString = (text)=>{
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, "").split(' ').join('-').toLocaleLowerCase();
}
