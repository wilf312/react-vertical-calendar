import styled, { css } from 'styled-components'
import { HolidayType, SelectStatus } from '../const'

// カレンダー 日のスタイル
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
  height: 36px;
  width: 40px;
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
  // range 選択開始のみ選択
  ${props =>
    props.selectStatus === SelectStatus.RANGE_FROM_ONLY &&
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
      border-radius: 50% 0 0 50% / 50% 0 0 50%;
    `};
  // range 選択終了
  ${props =>
    props.selectStatus === SelectStatus.RANGE_END &&
    css`
      background: red;
      color: white;
      border-radius: 0 50% 50% 0 / 0 50% 50% 0;
    `};
  // range 選択期間中
  ${props =>
    props.selectStatus === SelectStatus.RANGE_INCLUDED &&
    css`
      background: red;
      color: white;
      border-radius: 0;
    `};
  // range 開始と終了が同じ日
  ${props =>
    props.selectStatus === SelectStatus.RANGE_BOTH &&
    css`
      background: red;
      color: white;
    `};
`
