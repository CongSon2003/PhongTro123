import moment from 'moment';
require('moment/locale/vi');
const generateDate = (limit) => {
    const startTime = moment();
    let today = new Date();
    let Day = today.getDay() === 0 ? 'Chủ nhật' : `Thứ ${today.getDay() + 1}`;
    let Day_month_year = `${today.getDate()}/${(today.getMonth() + 1) / 10 < 1 ? `0${today.getMonth() + 1}` : `${today.getMonth() + 1}`}/${today.getFullYear()}`
    let time = `${today.getHours()}:${today.getMinutes()}`;
    const ExpiredAdd= moment(startTime).add((limit || 3), 'days');
    const ExpiredTime = ExpiredAdd.format('HH:mm');
    const ExpiredDays_of_TheWeek = ExpiredAdd.format('dddd');
    const ExpiredDay_month_year = ExpiredAdd.format('DD/MM/YYYY');
    // Hiển thị kết quả
    return {
        created : `${Day}, ${time} ${Day_month_year}`,
        expired : `${ExpiredDays_of_TheWeek.charAt(0).toUpperCase() + ExpiredDays_of_TheWeek.slice(1)}, ${ExpiredTime} ${ExpiredDay_month_year}`
    }
}
export default generateDate