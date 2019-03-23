import {
  getYear,
  setMonth,
  getDate,
  format as DateFormat,
  parse,
  getDay,
  setDate,
  lastDayOfMonth,
  addMonths,
  setYear,
  format,
  differenceInCalendarMonths,
  startOfMonth,
  getMonth
} from 'date-fns'
import { SelectStatus, HolidayType } from '../const'

export const formatYYYYMM = date => {
  return format(date, 'YYYY/MM')
}
export const formatYYYYMMDD = date => {
  return format(date, 'YYYY/MM/DD')
}

// 曜日番号を渡す 土日判定
export const getHolidayType = day => {
  // console.log(date);
  // console.log(dateFns.getDay(date));
  return day === 0 || day === 6
    ? HolidayType.SATURDAY_OFF
    : HolidayType.PUBLIC_HOLIDAY
}

// 祝日判定 todo
export const isPublicHoliday = day => {
  return false
}

// 今日
export const isToday = date => {
  return formatYYYYMMDD(date) === formatYYYYMMDD(new Date())
}

// 指定された日付からrange数分の年を取得
export const getMonthRangeForYear = (currentDate, range) => {
  let monthArr = []
  const year = getYear(currentDate)
  for (let start = year - range; start < year + range; start++) {
    monthArr = [...monthArr, ...getMonthRange(start)]
  }
  return monthArr
}

// 指定された年の月リストを取得 ['2000/01', '2000/02' ... '2000/12']
export const getMonthRange = year => {
  const date = setYear(setDate(new Date(), 14), year)
  const monthArr = []
  for (let start = 0; start < 12; start++) {
    const month = setMonth(date, start)
    monthArr.push(formatYYYYMM(month))
  }
  return monthArr
}

export const getMonthYearRange = (start, end) => {
  let diff = differenceInCalendarMonths(start, end)
  let arr = []
  for (let i = 0; i <= -diff; i++) {
    arr.push(setMonth(startOfMonth(start), getMonth(start) + i) )
  }
  return arr
}

// 1ヶ月のカレンダーデータ作成
export const createMonthList = month => {
  const start = parse(month)
  const startDate = getDate(start)
  const end = lastDayOfMonth(start)
  const count = getDate(end)

  const arr = []
  // カレンダーのデータ追加
  for (var i = 0; i < count; i++) {
    const date = setDate(start, startDate + i)
    arr.push({
      date: date,
      day: getDay(date),
      isToday: isToday(date),
      isCurrentMonth: true,
      selectStatus: SelectStatus.NOT_SELECT
    })
  }

  // 前月の曜日追加
  const beforePaddingCount = getDay(arr[0].date)
  // console.log(beforePaddingCount);
  // console.log(start);
  for (var i = 1; i <= beforePaddingCount; i++) {
    const date = setDate(start, startDate - i)
    // console.log(startDate - i);
    arr.unshift({
      date: date,
      day: getDay(date),
      isToday: isToday(date),
      isCurrentMonth: false
    })
  }

  // 次月の曜日追加
  const endObj = arr[arr.length - 1]
  const nextPaddingCount = 7 - getDay(endObj.date)
  const endDate = getDate(endObj.date)
  for (var i = 1; i < nextPaddingCount; i++) {
    const date = setDate(endObj.date, endDate + i)
    // console.log(startDate - i);
    arr.push({
      date: date,
      day: getDay(date),
      isToday: isToday(date),
      isCurrentMonth: false
    })
  }

  return arr
}
