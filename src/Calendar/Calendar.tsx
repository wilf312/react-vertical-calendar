import * as React from 'react'
import { getYear, getMonth, getDate, format as DateFormat } from 'date-fns'
import { List, AutoSizer } from 'react-virtualized'
import CalendarItem from './CalendarItem'
import styled from 'styled-components'
import { DateItem, DateGrid } from './CalendarAtom'
import { SelectStatus } from '../const'
import { getHolidayType } from '../util'

const itemSize = 250
const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function rowRenderer(data, calendar, setDate) {
  const {
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style // Style object to be applied to row (to position it)
  } = data
  const calendarKey = Object.keys(calendar)[index]
  const month = calendar[calendarKey]
  const monthYear = month[14]

  return (
    <CalendarItem
      key={key}
      style={style}
      monthYear={monthYear.date}
      month={month}
      clickHandler={setDate}
    />
  )
}
interface Props {
  setDate: any
  state: any
  scrollToIndex?: number
  calendar: any
}
export default class Calendar extends React.Component<Props> {
  constructor(props) {
    super(props)
  }
  render() {
    const props = this.props
    const { calendar } = props
    return (
      <div>
        <Wrap>
          <DateGrid>
            {week.map((weekday, index) => {
              return (
                <DateItem
                  key={index}
                  isToday={false}
                  holidayType={getHolidayType(index)}
                  isCurrentMonth={true}
                  selectStatus={SelectStatus.NOT_SELECT}
                  onClick={() => console.log}
                >
                  {weekday}
                </DateItem>
              )
            })}
          </DateGrid>
        </Wrap>
        <List
          width={window.innerWidth}
          height={window.innerHeight}
          rowCount={Object.keys(calendar).length}
          rowHeight={itemSize}
          // onScroll={a => console.log("onScroll", a)}
          // onRowsRendered={a => console.log("onRowsRendered", a)}
          // scrollToCell={a => console.log("scrollToCell", a)}
          scrollToIndex={props.scrollToIndex}
          rowRenderer={params => {
            return rowRenderer(params, calendar, props.setDate)
          }}
        />
      </div>
    )
  }
}

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`
