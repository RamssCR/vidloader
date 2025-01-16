export const formatTime = (date) => {
    const day = String(date.getDate()).padStart(2, "0")
    const month = String(date.getMonth()).padStart(2, "0")
    const year = date.getFullYear()

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return `${months[month]}. ${day}, ${year}`
}