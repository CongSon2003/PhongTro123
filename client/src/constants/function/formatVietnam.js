export const normalizedString = (text)=>{
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/[\s,/-]+/g, '-').toLocaleLowerCase();
}
export const getNumberInString = (string) =>{
    return parseInt(string.match(/\d+/)[0]);
}
