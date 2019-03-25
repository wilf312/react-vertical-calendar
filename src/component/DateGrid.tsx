import styled from 'styled-components'

// カレンダー部分
export const DateGrid = styled.div`
  align-items: center;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-flow: dense;
  grid-gap: 4px 0;
`
