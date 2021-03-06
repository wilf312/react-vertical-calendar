import * as React from 'react'
import { getYear, getMonth, getDate } from 'date-fns'
import { DateGrid, DateItem, YearMonthHead } from '../component'

import styled from 'styled-components'
import { getHolidayType } from '../util/index'

interface Props {
  monthYear: string
  month: any
  style: any
  clickHandler: any
}
export default class CalendarItem extends React.Component<Props> {
  constructor(props) {
    super(props)
  }

  shouldComponentUpdate(nextProps) {
    return JSON.stringify(nextProps.month) !== JSON.stringify(this.props.month)
  }

  render() {
    const { monthYear, month, style, clickHandler } = this.props
    const monthYearForDate = new Date(monthYear)
    return (
      <Wrap style={style}>
        <YearMonthHead>
          {getYear(monthYearForDate)}年{getMonth(monthYearForDate) + 1}月
        </YearMonthHead>
        <div>
          <DateGrid>
            {month.map((d, index) => {
              return (
                <DateItem
                  key={index}
                  isToday={d.isToday}
                  holidayType={getHolidayType(d.day)}
                  isCurrentMonth={d.isCurrentMonth}
                  selectStatus={d.selectStatus}
                  onClick={() => clickHandler(d.date)}
                >
                  {getDate(d.date)}
                </DateItem>
              )
            })}
          </DateGrid>
        </div>
      </Wrap>
    )
  }
}

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`
