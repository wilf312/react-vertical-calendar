import * as React from 'react'
import Calendar from './Calendar'
import * as dateFns from 'date-fns'
import { SelectMode, SelectStatus, CreateYearCount } from './const'
import {
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
  beforeDate: Date
  calendar: any
  scrollToIndex: number
  list?: DateItem[]
}
class StateList extends React.Component<{}, State> {
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
      beforeDate: null,
      calendar: calendar,
      scrollToIndex: months.findIndex(d => {
        return formatYYYYMM(d) === currentMonth
      })
    }
  }

  addState() {
    // const aaa = "2018/12";
    // this.state.list.unshift(createList(aaa));
    // console.log(this.state.list);
    // this.setState({ list: this.state.list });
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

    this.setState({ date, beforeDate: this.state.date, calendar: list })
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
    this.resetBeforeSelect()
    this.setSelectDateForList(date)
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
          beforeDate
          {this.state.beforeDate
            ? formatYYYYMMDD(this.state.beforeDate.toString())
            : ''}
        </div>
        <button
          onClick={() => {
            this.addState()
          }}
        >
          追加
        </button>
        {}
        <Calendar
          state={this.state.calendar}
          scrollToIndex={this.state.scrollToIndex}
          setDate={setDate.bind(this)}
          selectMode={SelectMode.SINGLE}
          calendar={this.state.calendar}
        />
      </div>
    )
  }
}

export default StateList
