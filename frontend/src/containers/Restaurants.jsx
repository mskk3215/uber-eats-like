import React, { Fragment, useEffect, useReducer } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

//components
import { Skeleton } from "@mui/material";

// apis
import { fetchRestaurants } from "../apis/restaurants";

//reducers
import {
  initialState,
  restaurantsActionTypes,
  restaurantsReducer,
} from "../reducers/restaurants";

//constants
import { REQUEST_STATE } from "../constants";

// images
import MainLogo from "../images/logo.png";
import MainCoverImage from "../images/main-cover-image.png";
import RestaurantImage from "../images/restaurant-image.jpg";
import { HeaderWrapper, MainLogoImage } from "../components/StyledHeader";

const MainCoverImageWrapper = styled.div`
  text-align: center;
`;

const MainCover = styled.img`
  height: 600px;
`;

const RestaurantsContentsList = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 150px;
`;

const RestaurantsContentWrapper = styled.div`
  width: 450px;
  height: 300px;
  padding: 48px;
`;

const RestaurantsImageNode = styled.img`
  width: 100%;
`;
const MainText = styled.p`
  color: black;
  font-size: 18px;
`;

const SubText = styled.p`
  color: black;
  font-size: 12px;
`;

export const Restaurants = () => {
  //以下の宣言を行うことによって、stateのデータ, dispatchの関数が使用できるようになる。
  const [state, dispatch] = useReducer(restaurantsReducer, initialState);
  // 一度だけ実行
  useEffect(() => {
    dispatch({ type: restaurantsActionTypes.FETCHING });
    //apiのデータ取得関数
    fetchRestaurants().then((data) =>
      //dispatchは、actionType１つか、actionTypeともう１つを引数として取る
      dispatch({
        type: restaurantsActionTypes.FETCH_SUCCESS,
        // 慣例的にpayloadと名付けてそこにresponse.dataを入れる。
        payload: {
          //response.data.restaurantsでrestaurantsのデータ取得
          restaurants: data.restaurants,
        },
      })
    );
  }, []);

  return (
    <>
      <HeaderWrapper>
        <MainLogoImage src={MainLogo} alt="main logo" />
      </HeaderWrapper>
      <MainCoverImageWrapper>
        <MainCover src={MainCoverImage} alt="main cover" />
      </MainCoverImageWrapper>

      <RestaurantsContentsList>
        {state.fetchState === REQUEST_STATE.LOADING ? (
          <>
            {/* ロード状態を表すUIパーツ。サイズや色程度に留めておく?*/}
            {/* ローディング状態ではskeltonで指定したものを表示 */}
            <Skeleton variant="rect" width={450} height={300} />
            <Skeleton variant="rect" width={450} height={300} />
            <Skeleton variant="rect" width={450} height={300} />
          </>
        ) : (
          state.restaurantsList.map((item, index) => (
            //Linkはaタグと同じ
            <Link
              to={`/restaurants/${item.id}/foods`}
              key={index}
              style={{ textDecoration: "none" }}
            >
              <RestaurantsContentWrapper>
                <RestaurantsImageNode src={RestaurantImage} />
                <MainText>{item.name}</MainText>
                <SubText>{`配送料:${item.fee}円 ${item.time_required}分`}</SubText>
              </RestaurantsContentWrapper>
            </Link>
          ))
        )}
      </RestaurantsContentsList>
    </>
  );
};
