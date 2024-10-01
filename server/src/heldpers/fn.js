require('dotenv').config()
const normalizedString = (text)=>{
    return text.normalize('NFD').replace(/[\u0300-\u036f]|-/g, "").split(' ').join('').toLocaleLowerCase();
}
export const generateCode = (value)=>{
    let result = '';
    let merge = normalizedString(value) + process.env.SECRET_GENERATE ;
    let length = merge.length;
    let count = 0;
    while(count < 3) {
        let index = count === 2 ? Math.floor(merge.length / 2 + length / 2) : Math.floor(length / 2);
        result += merge.charAt(index);
        length = index
        count++
    }
    return `${merge.charAt(3)}${merge.charAt(5)}${result}`.toUpperCase()
}