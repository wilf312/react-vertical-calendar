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

type dateForDateFns = Date | string | number

export const formatYYYYMM = (date: dateForDateFns) => {
  return format(date, 'YYYY/MM')
}
export const formatYYYYMMDD = (date: dateForDateFns) => {
  return format(date, 'YYYY/MM/DD')
}

// 曜日番号を渡す 土日判定
export const getHolidayType = (day: number) => {
  return day === 0 || day === 6
    ? HolidayType.SATURDAY_OFF
    : HolidayType.PUBLIC_HOLIDAY
}

// 祝日判定 todo
export const isPublicHoliday = day => {
  return false
}

// 今日
export const isToday = (date: Date) => {
  return date.toString() === new Date().toString()
}

// 指定された日付からrange数分の年を取得
export const getMonthRangeForYear = (
  currentDate: dateForDateFns,
  range: number
) => {
  let monthArr = []
  const year = getYear(currentDate)
  for (let start = year - range; start < year + range; start++) {
    monthArr = [...monthArr, ...getMonthRange(start)]
  }
  return monthArr
}

// 指定された年の月リストを取得 ['2000/01', '2000/02' ... '2000/12']
export const getMonthRange = (year: number): string[] => {
  const date = setYear(setDate(new Date(), 14), year)
  const monthArr = []
  for (let start = 0; start < 12; start++) {
    const month = setMonth(date, start)
    monthArr.push(formatYYYYMM(month))
  }
  return monthArr
}

// start-end間の月の初日のリストを取得する
// 2000/01/02 - 2000/03-24 => [2000/1, 2000/2, 2000/3]
export const getMonthYearRange = (
  start: dateForDateFns,
  end: dateForDateFns
): Date[] => {
  let diff = differenceInCalendarMonths(start, end)
  let monthYearRange = []
  const startOfMonthDate: Date = startOfMonth(start)
  const startMonth: number = getMonth(start)
  for (let i = 0; i <= -diff; i++) {
    monthYearRange.push(setMonth(startOfMonthDate, startMonth + i))
  }
  return monthYearRange
}

// 1ヶ月のカレンダーデータ作成
interface IDate {
  date: Date
  day: number
  isToday: boolean
  isCurrentMonth: boolean
}
export const createMonthList = (month: dateForDateFns): IDate[] => {
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
  // TODO: 別の関数に切り出す
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
  // TODO: 別の関数に切り出す
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
