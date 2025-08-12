const validate = (payload, SetInvalidFields) =>{
    let attributes = Object.entries(payload);
    let countError = 0;
    attributes?.forEach((item)=>{
        // || item[0] === 'district' || item[0] === 'address'
        if ((item[0] === 'province') && (item[1] === '')) {
            SetInvalidFields(prev => [...prev,{
                name : item[0],
                message :  'Chưa chọn Tỉnh/TP'
            }]);
            countError++;
        }else if(item[0] === 'ward' && item[1] === ''){
            SetInvalidFields(prev => [...prev,{
                name : item[0],
                message :  'Chưa chọn Phường/Xã'
            }]);
            countError++;
        }else if(item[0] === 'district' && item[1] === ''){
            SetInvalidFields(prev => [...prev,{
                name : item[0],
                message :  'Chưa chọn Quận/Huyện'
            }]);
            countError++;
        }else if(item[0] === 'images' && item[1] === ''){
            SetInvalidFields(prev => [...prev,{
                name : item[0],
                message :  'Bạn chưa đẩy hình ảnh lên'
            }]);
            countError++;
        }else if(item[0] === 'priceNumber' && +item[1] === 0){
            SetInvalidFields(prev => [...prev,{
                name : item[0],
                message :  'Bạn chưa nhập giá phòng'
            }]);
            countError++;
        }else if(item[0] === 'categoryCode' && item[1] === ''){
            SetInvalidFields(prev => [...prev,{
                name : item[0],
                message :  'Chưa chọn loại chuyên mục'
            }]);
            countError++;
        }else if(item[0] === 'description' && item[1] === ''){
            SetInvalidFields(prev => [...prev,{
                name : item[0],
                message :  'Bạn chưa nhập nội dung'
            }]);
            countError++;
        }else if(item[0] === 'acreageNumber' && +item[1] === 0){
            SetInvalidFields(prev => [...prev,{
                name : item[0],
                message :  'Bạn chưa nhập diện tích'
            }]);
            countError++;
        }else if(item[0] === 'title' && item[1] === ''){
            SetInvalidFields(prev => [...prev,{
                name : item[0],
                message :  'Tiêu đề không được để trống'
            }]);
            countError++;
        }
    })
    return countError
}
export default validate