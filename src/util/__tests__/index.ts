import {
  formatYYYYMM,
  formatYYYYMMDD,
  getHolidayType,
  isPublicHoliday,
  isToday,
  getMonthRangeForYear,
  getMonthRange,
  getMonthYearRange,
  createMonthList
} from '../index'
import { HolidayType } from '../../const'

describe('format YYYY/MM', () => {
  test('format 1234/12', () => {
    expect(formatYYYYMM('1234-12-23 01:23:45')).toBe('1234/12')
    expect(formatYYYYMM(new Date('1234-12-23 01:23:45'))).toBe('1234/12')

    expect(formatYYYYMM(null)).toBe('1970/01')
    expect(formatYYYYMM(0)).toBe('1970/01')
    expect(formatYYYYMM(1000)).toBe('1970/02')
  })
})

describe('format YYYY/MM/DD', () => {
  test('format 1234/12/23', () => {
    expect(formatYYYYMMDD('1234-12-23 01:23:45')).toBe('1234/12/23')
    expect(formatYYYYMMDD(new Date('1234-12-23 01:23:45'))).toBe('1234/12/23')
  })
})

describe('getHolidayType', () => {
  test('SATURDAY_OFF', () => {
    expect(getHolidayType(0)).toBe(HolidayType.SATURDAY_OFF)
    expect(getHolidayType(6)).toBe(HolidayType.SATURDAY_OFF)
  })
  test('PUBLIC_HOLIDAY', () => {
    expect(getHolidayType(1)).toBe(HolidayType.PUBLIC_HOLIDAY)
    expect(getHolidayType(2)).toBe(HolidayType.PUBLIC_HOLIDAY)
    expect(getHolidayType(3)).toBe(HolidayType.PUBLIC_HOLIDAY)
    expect(getHolidayType(4)).toBe(HolidayType.PUBLIC_HOLIDAY)
    expect(getHolidayType(5)).toBe(HolidayType.PUBLIC_HOLIDAY)

    expect(getHolidayType(10)).toBe(HolidayType.PUBLIC_HOLIDAY)
  })
})

describe('isPublicHoliday', () => {
  test.todo('祝日判定をする')
})

describe('isToday', () => {
  test.todo('今日の判定をする')
})
