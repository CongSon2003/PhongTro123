export const getNumbersPrice = (string) =>{
    return string?.split(' ').map(item => +item).filter(item => !item === false);
}
export const getNumbersAcreage = (string) =>{
    return  string?.split(' ').map(item => +item.match(/\d+/)).filter(item => item !== 0);
}