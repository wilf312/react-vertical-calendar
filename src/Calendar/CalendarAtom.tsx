import styled, { css } from 'styled-components'
import { HolidayType, SelectStatus } from '../const'

// 年月
export const YearMonthHead = styled.div`
  font-size: 20px;
`

// カレンダー部分
export const DateGrid = styled.div`
  align-items: center;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-flow: dense;
  grid-gap: 2px 10px;
`

// カレンダー 日のスタイル
const itemSize = 36
type IDateItem = {
  holidayType: string
  isCurrentMonth: boolean
  isToday: boolean
  selectStatus: string
}
export const DateItem = styled.div<IDateItem>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: ${itemSize}px;
  width: ${itemSize}px;
  border-radius: 50%;

  // 休日
  color: ${props =>
    props.holidayType === HolidayType.SATURDAY_OFF ? 'palevioletred' : 'black'};
  // 表示月の範囲外の日
  opacity: ${props => (props.isCurrentMonth ? 1 : 0.5)};

  // 当日
  ${(props: IDateItem) =>
    props.isToday &&
    css`
      background: #1a73e8;
      color: white;
    `};
  // 選択日
  ${props =>
    props.selectStatus === SelectStatus.SELECTED &&
    css`
      background: red;
      color: white;
    `};
  // range 選択開始
  ${props =>
    props.selectStatus === SelectStatus.RANGE_START &&
    css`
      background: red;
      color: white;
    `};
  // range 選択終了
  ${props =>
    props.selectStatus === SelectStatus.RANGE_END &&
    css`
      background: red;
      color: white;
    `};
  // range 選択期間中
  ${props =>
    props.selectStatus === SelectStatus.RANGE_INCLUDED &&
    css`
      background: red;
      color: white;
      border-radius: 0;
    `};
`
