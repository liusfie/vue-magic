export function formatDate (number) {
  let datetime
  if (!(number instanceof Date)) {
    number = parseInt(number)
    datetime = new Date(number)
  } else {
    datetime = number
  }
  const year = addZero(datetime.getFullYear())
  const month = addZero(datetime.getMonth() + 1)
  const day = addZero(datetime.getDate())
  const hours = addZero(datetime.getHours())
  const minutes = addZero(datetime.getMinutes())
  const seconds = addZero(datetime.getSeconds())
  const result = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  return result
};
// 小于10时补零
export function addZero (date) {
  return date < 10 ? '0' + date : date
}
