import React ,{memo} from 'react';
import LocationItem from '../../components/LocationItem';
const TopLocation = ()=>{
    return (
        <div className='text-center mb-5'>
            <div className='mt-0 mb-4'>
                <h2 className='text-lg font-bold'>Khu vực nổi bật</h2>
            </div>
            <div className='flex justify-center gap-5 cursor-pointer '>
                <LocationItem background={'bg-HCM'} text={'Phòng trọ Hồ Chí Minh'}/>
                <LocationItem background={'bg-HN'} text={'Phòng trọ Hà Nội'}/>
                <LocationItem background={'bg-DN'} text={'Phòng trọ Đà nẵng'}/>
            </div>
        </div>
    )
}
export default TopLocation