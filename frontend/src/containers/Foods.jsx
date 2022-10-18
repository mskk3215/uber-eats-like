import React, { Fragment, useReducer, useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory, Link } from "react-router-dom";

// components
import { LocalMallIcon } from "../components/Icons";
import { FoodWrapper } from "../components/FoodWrapper";
import { NewOrderConfirmDialog } from "../components/NewOrderConfirmDialog";
import { Skeleton } from "@mui/material";

// reducers
import {
  // initialStateとして定義しているものをfoodsInitialStateとしてimportする
  // initialStateが出てきてかぶるからFoodsコンポーネントではfoodsInitialStateとして使用する
  initialState as foodsInitialState,
  foodsActionTypes,
  foodsReducer,
} from "../reducers/foods";

// apis
import { fetchFoods } from "../apis/foods";
import { postLineFoods, replaceLineFoods } from "../apis/line_foods";

// images
import MainLogo from "../images/logo.png";
import { FoodOrderDialog } from "../components/FoodOrderDialog";
import FoodImage from "../images/food-image.jpg";

// constants
import { HTTP_STATUS_CODE, REQUEST_STATE } from "../constants";
import { COLORS } from "../style_constants";
import { HeaderWrapper, MainLogoImage } from "../components/StyledHeader";

const BagIconWrapper = styled.div`
  padding-top: 24px;
`;

const ColoredBagIcon = styled(LocalMallIcon)`
  color: ${COLORS.MAIN};
`;

const FoodsList = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 50px;
`;

const ItemWrapper = styled.div`
  margin: 16px;
`;

export const Foods = ({ match }) => {
  const initialState = {
    isOpenOrderDialog: false,
    selectedFood: null,
    //選択されている数量を表す
    selectedFoodCount: 1,
    isOpenNewOrderDialog: false,
    existingRestaurantName: "",
    newRestaurantName: "",
  };

  const [state, setState] = useState(initialState);
  const [foodsState, dispatch] = useReducer(foodsReducer, foodsInitialState);
  const history = useHistory();
  // 一度だけ実行
  useEffect(() => {
    dispatch({ type: foodsActionTypes.FETCHING });
    fetchFoods(match.params.restaurantsId).then((data) => {
      dispatch({
        type: foodsActionTypes.FETCH_SUCCESS,
        payload: {
          foods: data.foods,
        },
      });
    });
  }, []);

  const submitOrder = () => {
    postLineFoods({
      //すでにstateにid,countがセットされているのでstateを参照
      foodId: state.selectedFood.id,
      count: state.selectedFoodCount,
    })
      .then(() => history.push("/orders"))
      .catch((e) => {
        if (e.response.status === HTTP_STATUS_CODE.NOT_ACCEPTABLE) {
          setState({
            ...state,
            isOpenOrderDialog: false,
            isOpenNewOrderDialog: true,
            //NewOrderConfirmDialogで使用するので記述
            existingRestaurantName: e.response.data.existing_restaurant,
            newRestaurantName: e.response.data.new_restaurant,
          });
        } else {
          throw e;
        }
      });
  };

  const replaceOrder = () => {
    replaceLineFoods({
      //foodId,countをreplaceLineFoodに渡す
      foodId: state.selectedFood.id,
      count: state.selectedFoodCount,
      //history.push("/orders")で注文ページへ遷移
    }).then(() => history.push("/orders"));
  };

  return (
    <>
      <HeaderWrapper>
        <Link to="/restaurants">
          <MainLogoImage src={MainLogo} alt="main logo" />
        </Link>

        <BagIconWrapper>
          <Link to="/orders">
            <ColoredBagIcon fontSize="large" />
          </Link>
        </BagIconWrapper>
      </HeaderWrapper>

      <FoodsList>
        {foodsState.fetchState === REQUEST_STATE.LOADING ? (
          <>
            {[...Array(12).keys()].map((i) => (
              <ItemWrapper key={i}>
                <Skeleton key={i} variant="rect" width={450} height={180} />
              </ItemWrapper>
            ))}
          </>
        ) : (
          foodsState.foodsList.map((food) => (
            <ItemWrapper key={food.id}>
              <FoodWrapper
                food={food}
                // フードitemクリックじにsetStateする
                onClickFoodWrapper={(food) =>
                  setState({
                    ...state,
                    selectedFood: food,
                    isOpenOrderDialog: true,
                  })
                }
                imageUrl={FoodImage}
              />
            </ItemWrapper>
          ))
        )}
      </FoodsList>

      {state.isOpenOrderDialog && (
        <FoodOrderDialog
          isOpen={state.isOpenOrderDialog}
          food={state.selectedFood}
          countNumber={state.selectedFoodCount}
          onClickCountUp={() =>
            setState({
              ...state,
              selectedFoodCount: state.selectedFoodCount + 1,
            })
          }
          onClickCountDown={() =>
            setState({
              ...state,
              selectedFoodCount: state.selectedFoodCount - 1,
            })
          }
          //モーダルの外側をクリックするとonCloseに渡した関数setCloseが実行されてstateが更新され、
          //モーダルに渡したstate.isOpenOrderDialogがfalseになる。
          onClickOrder={() => submitOrder()}
          onClose={() =>
            setState({
              ...state,
              isOpenOrderDialog: false,
              selectedFood: null,
              selectedFoodCount: 1,
            })
          }
        />
      )}

      {/* isOpenNewOrderDialog=falseは持っているが、falseの時にNewOrder Dialogコンポーネントを実行したくないので&&を使用 */}
      {state.isOpenNewOrderDialog && (
        <NewOrderConfirmDialog
          isOpen={state.isOpenNewOrderDialog}
          onClose={() => setState({ ...state, isOpenNewOrderDialog: false })}
          existingRestaurantName={state.existingRestaurantName}
          newRestaurantName={state.newRestaurantName}
          onClickSubmit={() => replaceOrder()}
        />
      )}
    </>
  );
};
