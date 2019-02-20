/**
 * 1天的时长
 * 返回毫秒数
 */
let totalDay = () => {
  return 24 * 60 * 60 * 1000
}
/**
 * 当月的时长
 * 返回毫秒数
 */
let totalMonth = () => {
  let now = new Date()
  now.setHours(0, 0, 0, 0)
  now.setDate(1)

  let currentYear = now.getFullYear()
  let currentMonth = now.getMonth()

  let nextMonth = null
  if (currentMonth == 11) {
    nextMonth = new Date(currentYear + 1, 0, 1)
  } else {
    nextMonth = new Date(currentYear, currentMonth + 1, 1)
  }

  return nextMonth.getTime() - now.getTime()
}
/**
 * 当年的时长
 * 返回毫秒数
 */
let totalYear = () => {
  let now = new Date()
  now.setHours(0, 0, 0, 0)
  now.setMonth(0, 1)

  let nextYear = new Date(now.getFullYear() + 1, 0, 1)

  return nextYear.getTime() - now.getTime()
}
/**
 * 一生的时长，平均寿命76.7岁（2017年）
 * 返回毫秒数
 */
let totalLife = () => {
  return (76.7 * 365 + 19) * 24 * 60 * 60 * 1000
}
/**
 * 当天已经度过的时间
 * 返回毫秒数
 */
let hasPassDay = (now) => {
  if (now == undefined || now == null) {
    now = new Date()
  }

  let today = new Date()
  today.setHours(0, 0, 0, 0)

  return now.getTime() - today.getTime()
}
/**
 * 当月已经度过的时间
 * 返回毫秒数
 */
let hasPassMonth = (now) => {
  if (now == undefined || now == null) {
    now = new Date()
  }

  let currentMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  return now.getTime() - currentMonth.getTime()
}
/**
 * 当年已经度过的时间
 * 返回毫秒数
 */
let hasPassYear = (now) => {
  if (now == undefined || now == null) {
    now = new Date()
  }

  let currentYear = new Date(now.getFullYear(), 0, 1)

  return now.getTime() - currentYear.getTime()
}
/**
 * 一生已经度过的时间
 * 返回毫秒数
 */
let hasPassLife = (now, born) => {
  if (now == undefined || now == null) {
    now = new Date()
  }

  return now.getTime() - born.getTime()
}


module.exports = {
  totalDay: totalDay,
  totalMonth: totalMonth,
  totalYear: totalYear,
  totalLife: totalLife,
  hasPassDay: hasPassDay,
  hasPassMonth: hasPassMonth,
  hasPassYear: hasPassYear,
  hasPassLife: hasPassLife,
}
