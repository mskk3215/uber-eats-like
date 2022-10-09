// 大文字の変数にすることで値が不変で代入不可であることを明示
//apiリクエスト中に画面が今どういう状態なのかを知るための状態
export const REQUEST_STATE = {
  INITIAL: "INITIAL",
  LOADING: "LOADING",
  OK: "OK",
};

export const HTTP_STATUS_CODE = {
  NOT_ACCEPTABLE: 406,
};
