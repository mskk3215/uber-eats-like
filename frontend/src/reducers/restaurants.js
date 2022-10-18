import { REQUEST_STATE } from "../constants";

export const initialState = {
  //fetchStateはget apiの状態を表す
  fetchState: REQUEST_STATE.INITIAL,
  //apiから取得したレストラン一覧が入る
  restaurantsList: [],
};

export const restaurantsActionTypes = {
  FETCHING: "FETCHING",
  FETCH_SUCCESS: "FETCH_SUCCESS",
};

//stateにはinitialStateか加工後のstateが入る。
//actionにはrestaurantTypesのいずれかが入る。
export const restaurantsReducer = (state, action) => {
  switch (action.type) {
    case restaurantsActionTypes.FETCHING:
      return {
        ...state,
        fetchState: REQUEST_STATE.LOADING,
      };

    case restaurantsActionTypes.FETCH_SUCCESS:
      return {
        fetchState: REQUEST_STATE.OK,
        restaurantsList: action.payload.restaurants,
      };
    default:
      throw new Error();
  }
};
