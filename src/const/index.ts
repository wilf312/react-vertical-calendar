export const CreateYearCount = 30

// 日の選択状態
export const SelectStatus = {
  NOT_SELECT: 'NOT_SELECT',

  // mode: SINGLE
  SELECTED: 'SELECTED',

  // mode: RANGE
  // from のみ選択したとき
  RANGE_FROM_ONLY: 'RANGE_FROM_ONLY',
  // from to 揃ったとき
  RANGE_START: 'RANGE_START',
  RANGE_INCLUDED: 'RANGE_INCLUDED',
  RANGE_END: 'RANGE_END'
}

// カレンダーの選択モード
// TODO 19.3.18 時点では SINGLEのみ実装
export const SelectMode = {
  SINGLE: 'SINGLE',
  RANGE: 'RANGE'
}

export const HolidayType = {
  NOT_HOLIDAY: 'NOT_HOLIDAY',
  SATURDAY_OFF: 'SATURDAY_OFF', // 土日休み
  PUBLIC_HOLIDAY: 'PUBLIC_HOLIDAY' // 祝日
}
