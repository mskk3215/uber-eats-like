import axios from "axios";
import { lineFoods, lineFoodsReplace } from "../urls/index";

export const postLineFoods = (params) => {
  return (
    axios
      //第一引数lineFoodsがurl文字列、 第二引数がパラメーター
      .post(lineFoods, {
        food_id: params.foodId,
        count: params.count,
      })
      .then((res) => {
        return res.data;
      })
      .catch((e) => {
        throw e;
      })
  );
};

export const replaceLineFoods = (params) => {
  return axios
    .put(lineFoodsReplace, {
      food_id: params.foodId,
      count: params.count,
    })
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      throw e;
    });
};

export const fetchLineFoods = () => {
  return axios
    .get(lineFoods)
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      throw e;
    });
};
