import * as React from 'react'
import Calendar from './Calendar'
import { isBefore, isWithinRange } from 'date-fns'
import { SelectMode, SelectStatus, CreateYearCount, HolidayType } from './const'
import {
  getMonthYearRangeExtra,
  createMonthList,
  getMonthRangeForYear,
  formatYYYYMM,
  formatYYYYMMDD
} from './util'

interface State {
  date: Date | null // 選択された月
  rangeDate: Date[] // 選択された range
  calendar: any // 表示情報
  scrollToIndex: number
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

  setRangeList(_rangeDate: Date[], newDate: Date) {
    let list = this.state.calendar
    let monthYearRange = []
    let rangeDate = _rangeDate
    if (rangeDate.length === 1 && isBefore(rangeDate[0], newDate)) {
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
          // 開始日 と 終了日が同じ日
          if (fromString === dayString && toString === dayString) {
            return {
              ...day,
              selectStatus: SelectStatus.RANGE_BOTH
            }
            // 終了日
          } else if (fromString === dayString) {
            return {
              ...day,
              selectStatus: SelectStatus.RANGE_START
            }
            // 終了日
          } else if (toString === dayString) {
            return {
              ...day,
              selectStatus: SelectStatus.RANGE_END
            }
            // 選択中
          } else if (isWithinRange(day.date, from, to)) {
            return {
              ...day,
              selectStatus: SelectStatus.RANGE_INCLUDED
            }
            // 選択外
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
  }

  // mode single 選択
  setSelectForSingle(date: Date) {
    let list = this.state.calendar
    const monthYearRange = getMonthYearRangeExtra(date, date)

    // カレンダーの変更された部分を取得
    monthYearRange.forEach(month => {
      const monthDayList = list[formatYYYYMM(month)]
      list[formatYYYYMM(month)] = monthDayList.map(day => {
        if (day.date.toString() === date.toString()) {
          return {
            ...day,
            selectStatus: SelectStatus.SELECTED
          }
        } else {
          return day
        }
      })
    })

    this.setState({ date, calendar: list })
  }

  // mode single 選択解除
  resetSelectForSingle() {
    let list = this.state.calendar
    const date = this.state.date

    if (!date) {
      return
    }
    const monthYearRange = getMonthYearRangeExtra(date, date)

    // カレンダーの変更された部分を取得
    monthYearRange.forEach(month => {
      const monthDayList = list[formatYYYYMM(month)]
      list[formatYYYYMM(month)] = monthDayList.map(day => {
        return {
          ...day,
          selectStatus: SelectStatus.NOT_SELECT
        }
      })
    })

    this.setState({ date, calendar: list })
  }

  setDate(date) {
    if (this.props.selectMode === SelectMode.RANGE) {
      let rangeDate = this.state.rangeDate
      this.setRangeList(rangeDate, date)
    } else if (this.props.selectMode === SelectMode.SINGLE) {
      this.resetSelectForSingle()
      this.setSelectForSingle(date)
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
