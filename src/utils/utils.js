export function capitalizeFirstWord(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function formatVietNamCurrency(money) {
    return Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(money)
}