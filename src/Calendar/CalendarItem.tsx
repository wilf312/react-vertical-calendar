import * as React from 'react'
import { getYear, getMonth, getDate } from 'date-fns'
import { DateGrid, DateItem } from './CalendarAtom'
import styled from 'styled-components'
import { isHoliday } from '../util/index'

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
    return (
      <Wrap style={style}>
        <div>
          {getYear(monthYear)}年{getMonth(monthYear) + 1}月
        </div>
        <div>
          <DateGrid>
            {month.map((d, index) => {
              return (
                <DateItem
                  key={index}
                  isToday={d.isToday}
                  isHoliday={isHoliday(d.day)}
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
