

// 日の選択状態
export const SelectStatus = {
  NOT_SELECT: "NOT_SELECT",
  SELECTED: "SELECTED",
  RANGE_START: "RANGE_START",
  RANGE_INCLUDED: "RANGE_INCLUDED",
  RANGE_END: "RANGE_END"
};

// カレンダーの選択モード
// TODO 19.3.18 時点では SINGLEのみ実装
export const SelectMode = {
  SINGLE: "SINGLE",
  RANGE: "RANGE"
};