import styled, { css } from "styled-components";

// カレンダー部分
export const DateGrid = styled.div`
  align-items: center;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-flow: dense;
  grid-gap: 2px 10px;
`;

// カレンダー 日のスタイル
const itemSize = 36;
export const DateItem = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: ${itemSize}px;
  width: ${itemSize}px;

  border-radius: 50%;

  // 休日
  color: ${props => (props.isHoliday ? "black" : "palevioletred")};
  // 表示月の範囲外の日
  opacity: ${props => (props.isCurrentMonth ? 1 : 0.5)};

  // 当日
  ${props =>
    props.isToday &&
    css`
      background: #1a73e8;
      color: white;
    `};

  // 選択日
  ${props =>
    props.selectStatus === 'SELECTED' &&
    css`
      background: red;
      color: white;
    `};
`;
