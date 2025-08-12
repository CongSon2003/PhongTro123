import { getNumbersAcreage, getNumbersPrice} from './GetNumber'
export const getCodePrice = (totals) =>{
    let arrayMaxAndMin = [];
    return totals.map((item) =>{
        let array = getNumbersPrice(item.value);
        if(array.length === 1){
            arrayMaxAndMin.push(array[0])
        }
        let SortarrayMaxAndMin = arrayMaxAndMin.sort()
        let min = SortarrayMaxAndMin.indexOf(array[0]) === 0 ? array.length > 1 ? array[0] : 0 : array[0]
        let max = SortarrayMaxAndMin.indexOf(array[0]) === 0 ? array.length > 1 ? array[1] : array[0] : SortarrayMaxAndMin.indexOf(array[0]) === 1 ? 99999 : array[1]
        return ({
            ...item,
            arr : array,
            min,max 
        })
    })
}
export const getCodeAcreage = (totals) =>{
    let arrayMaxAndMin = [];
    return totals.map((item) =>{
        let array = getNumbersAcreage(item.value);
        if(array.length === 1){
            arrayMaxAndMin.push(array[0])
        }
        let SortarrayMaxAndMin = arrayMaxAndMin.sort()
        let min = SortarrayMaxAndMin.indexOf(array[0]) === 0 ? array.length > 1 ? array[0] : 0 : array[0]
        let max = SortarrayMaxAndMin.indexOf(array[0]) === 0 ? array.length > 1 ? array[1] : array[0] : SortarrayMaxAndMin.indexOf(array[0]) === 1 ? 99999 : array[1]
        return ({
            ...item,
            arr : array,
            min,max 
        })
    })
}
export const getCodesPrices = (entry, prices)=>{
    // arr = [1,2] => min : 1, max = 2;
    let orderPrices = getCodePrice(prices);
    let NewPrices = orderPrices.filter((item, index) => item.min <= entry && item.max > entry);
    if (entry > 99999) {
        let threshold = orderPrices.find((item, index) => item.order === 5);
        return threshold
    }else{
        return NewPrices
    }
}
export const getCodesAcreages = (entry,acreages) =>{
    let orderAcreages = getCodeAcreage(acreages);
    let NewAcreages = orderAcreages.filter((item, index) => item.min <= entry && item.max > entry)
    if (entry > 99999) {
        let threshold = orderAcreages.find((item, index) => item.order === 5);
        return threshold
    }else{
        return NewAcreages
    }
}