import * as React from 'react'
import Calendar from './Calendar'
import * as dateFns from 'date-fns'
import { SelectMode, SelectStatus, CreateYearCount } from './const'
import {
  getMonthYearRangeExtra,
  createMonthList,
  getMonthRangeForYear,
  formatYYYYMM,
  formatYYYYMMDD
} from './util'

interface DateItem {
  date: Date
  day: number
  isToday: boolean
  isCurrentMonth: boolean
  selectStatus: string
}
interface State {
  date: Date
  rangeDate: Date[]
  calendar: any
  scrollToIndex: number
  list?: DateItem[]
  monthYearRange: Date[]
}
interface Props {
  selectMode: string
}
class StateList extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    const current = new Date()
    const currentMonth = formatYYYYMM(current)
    const months = getMonthRangeForYear(current, CreateYearCount)

    let calendar = {}
    months.forEach(d => {
      calendar[d] = createMonthList(d)
    })

    this.state = {
      date: null,
      rangeDate: [],
      calendar: calendar,
      scrollToIndex: months.findIndex(d => {
        return formatYYYYMM(d) === currentMonth
      }),
      monthYearRange: []
    }
  }

  setSelectDateForList(date: Date) {
    let list = this.state.calendar
    const selectedMonth = formatYYYYMM(date)
    const beforeMonth = formatYYYYMM(dateFns.addMonths(date, -1))
    const afterMonth = formatYYYYMM(dateFns.addMonths(date, 1))

    // カレンダーの変更された部分を取得
    const updateSelectedDateForMonth = (month, date) => {
      return month.map(d => {
        if (d.date.toString() === date.toString()) {
          return {
            ...d,
            selectStatus: SelectStatus.SELECTED
          }
        } else {
          return d
        }
      })
    }
    list[selectedMonth] = updateSelectedDateForMonth(list[selectedMonth], date)
    list[beforeMonth] = updateSelectedDateForMonth(list[beforeMonth], date)
    list[afterMonth] = updateSelectedDateForMonth(list[afterMonth], date)

    this.setState({ date, calendar: list })
  }

  setRangeList(_rangeDate: Date[], newDate: Date) {
    let list = this.state.calendar
    let monthYearRange = []
    let rangeDate = _rangeDate
    if (rangeDate.length === 1 && dateFns.isBefore(rangeDate[0], newDate)) {
      rangeDate.push(newDate)
    } else {
      rangeDate.unshift(newDate)
    }

    // from to のセットが揃ったとき
    if (rangeDate.length === 2) {
      monthYearRange = getMonthYearRangeExtra(rangeDate[0], rangeDate[1])

      const from = rangeDate[0]
      const to = rangeDate[rangeDate.length - 1]
      const fromString = from.toString()
      const toString = to.toString()

      monthYearRange.map(month => {
        const monthDayList = list[formatYYYYMM(month)]
        list[formatYYYYMM(month)] = monthDayList.map(day => {
          const dayString = day.date.toString()
          if (fromString === dayString) {
            return {
              ...day,
              selectStatus: SelectStatus.RANGE_START
            }
          } else if (toString === dayString) {
            return {
              ...day,
              selectStatus: SelectStatus.RANGE_END
            }
          } else if (dateFns.isWithinRange(day.date, from, to)) {
            return {
              ...day,
              selectStatus: SelectStatus.RANGE_INCLUDED
            }
          } else {
            return {
              ...day,
              selectStatus: SelectStatus.NOT_SELECT
            }
          }
        })
      })
      this.setState({ calendar: list, rangeDate, monthYearRange })
      return
      // from のみ選択されたとき
    } else if (rangeDate.length === 1) {
      const fromString = rangeDate[0].toString()
      monthYearRange = getMonthYearRangeExtra(rangeDate[0], rangeDate[0])

      monthYearRange.map(month => {
        const monthDayList = list[formatYYYYMM(month)]
        list[formatYYYYMM(month)] = monthDayList.map(day => {
          const dayString = day.date.toString()
          return {
            ...day,
            selectStatus:
              fromString === dayString
                ? SelectStatus.RANGE_FROM_ONLY
                : SelectStatus.NOT_SELECT
          }
        })
      })
      this.setState({ calendar: list, rangeDate })
      return
      // それ以外
    } else {
      this.state.monthYearRange.forEach(month => {
        const monthDayList = list[formatYYYYMM(month)]
        list[formatYYYYMM(month)] = monthDayList.map(day => {
          return {
            ...day,
            selectStatus: SelectStatus.NOT_SELECT
          }
        })
      })
      this.setState({ calendar: list, rangeDate: [], monthYearRange: [] })
    }

    return

    // const selectedMonth = formatYYYYMM(date)
    // const beforeMonth = formatYYYYMM(dateFns.addMonths(date, -1))
    // const afterMonth = formatYYYYMM(dateFns.addMonths(date, 1))

    // // カレンダーの変更された部分を取得
    // const updateSelectedDateForMonth = (month, date) => {
    //   return month.map(d => {
    //     const dateString = d.date.toString()
    //     if (rangeDate.some(date => date.toString() === dateString )) {
    //       return {
    //         ...d,
    //         selectStatus: SelectStatus.SELECTED
    //       }
    //     } else {
    //       return d
    //     }
    //   })
    // }
    // list[selectedMonth] = updateSelectedDateForMonth(list[selectedMonth], date)
    // list[beforeMonth] = updateSelectedDateForMonth(list[beforeMonth], date)
    // list[afterMonth] = updateSelectedDateForMonth(list[afterMonth], date)

    // this.setState({ rangeDate, calendar: list })
  }

  resetBeforeSelect() {
    let list = this.state.calendar
    const date = this.state.date

    if (!date) {
      return
    }
    const selectedMonth = formatYYYYMM(date)
    const beforeMonth = formatYYYYMM(dateFns.addMonths(date, -1))
    const afterMonth = formatYYYYMM(dateFns.addMonths(date, 1))

    // カレンダーの変更された部分を取得
    const updateSelectedDateForMonth = (month, date) => {
      return month.map(d => {
        if (d.date.toString() === date.toString()) {
          return {
            ...d,
            selectStatus: SelectStatus.NOT_SELECT
          }
        } else {
          return d
        }
      })
    }
    list[selectedMonth] = updateSelectedDateForMonth(list[selectedMonth], date)
    list[beforeMonth] = updateSelectedDateForMonth(list[beforeMonth], date)
    list[afterMonth] = updateSelectedDateForMonth(list[afterMonth], date)

    this.setState({ calendar: list })
  }

  setDate(date) {
    if (this.props.selectMode === SelectMode.RANGE) {
      let rangeDate = this.state.rangeDate
      this.setRangeList(rangeDate, date)
    } else if (this.props.selectMode === SelectMode.SINGLE) {
      this.resetBeforeSelect()
      this.setSelectDateForList(date)
    }
  }

  render() {
    const setDate = this.setDate
    return (
      <div className="State">
        <div>
          date
          {this.state.date ? formatYYYYMMDD(this.state.date.toString()) : ''}
        </div>
        <div>
          mode: {this.props.selectMode}
          <div>{JSON.stringify(this.state.rangeDate)}</div>
        </div>
        <Calendar
          state={this.state.calendar}
          scrollToIndex={this.state.scrollToIndex}
          setDate={setDate.bind(this)}
          calendar={this.state.calendar}
        />
      </div>
    )
  }
}

export default StateList
