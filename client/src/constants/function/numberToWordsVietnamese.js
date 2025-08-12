// Hàm chuyển đổi số thành chữ
const units = ["", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"];
const tens = ["", "", "hai mươi", "ba mươi", "bốn mươi", "năm mươi", "sáu mươi", "bảy mươi", "tám mươi", "chín mươi"];
const scales = ["", "nghìn", "triệu", "tỷ"];

function convertToWords(num) {
    if (num === 0) return "không";

    let words = "";
    let scale = 0;

    while (num > 0) {
        let chunk = num % 1000;
        if (chunk) {
            let chunkWords = convertChunk(chunk);
            words = chunkWords + " " + scales[scale] + " " + words;
        }
        num = Math.floor(num / 1000);
        scale++;
    }

    return words.trim().replace(/\s+/g, ' '); // Clean up extra spaces
}

function convertChunk(chunk) {
    if (chunk === 0) return "";

    let hundreds = Math.floor(chunk / 100);
    let remainder = chunk % 100;
    let tensDigit = Math.floor(remainder / 10);
    let unitsDigit = remainder % 10;

    let words = "";

    if (hundreds) {
        words += units[hundreds] + " trăm ";
    }

    if (remainder) {
        if (hundreds && remainder < 10) {
            words += "lẻ ";
        }

        if (remainder < 10) {
            words += units[remainder];
        } else if (remainder < 20) {
            words += "mười " + units[unitsDigit];
        } else {
            words += tens[tensDigit];
            if (unitsDigit) {
                words += " " + units[unitsDigit];
            }
        }
    }

    return words.trim();
}
export default convertToWords