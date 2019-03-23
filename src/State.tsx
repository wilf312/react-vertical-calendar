import * as React from 'react'
import Calendar from './Calendar'
import * as dateFns from 'date-fns'
import { SelectMode, SelectStatus, CreateYearCount } from './const'
import {
  getMonthYearRange,
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
      rangeDate: [new Date('2019-01-01 00:00:00')],
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

    this.setState({ date, calendar: list })
  }

  setRangeList(rangeDate: Date[]) {
    let list = this.state.calendar

    if (rangeDate.length === 2) {
      const monthYearRange = getMonthYearRange(rangeDate[0], rangeDate[1])

      const from = rangeDate[0]
      const to = rangeDate[rangeDate.length -1]
      monthYearRange.unshift(dateFns.addMonths(from, -1))
      monthYearRange.push(dateFns.addMonths(to, 1))
      const fromString =  from.toString()
      const toString =  to.toString()

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
      this.setState({ calendar: list, rangeDate })

    } else if (rangeDate.length === 1) {

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
    console.log('setDate')

    if (this.props.selectMode === SelectMode.RANGE) {
      let rangeDate = this.state.rangeDate
      if (rangeDate.length === 0) {
        rangeDate.push(date)
        this.setRangeList(rangeDate)

      } else if (rangeDate.length === 1) {
        rangeDate.push(date)
        this.setRangeList(rangeDate)

      } else if (rangeDate.length === 2) {
        this.setState({rangeDate: []})

      } else {
        console.error('error')
      }

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
        <button
          onClick={() => {
            this.addState()
          }}
        >
          追加
        </button>
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
