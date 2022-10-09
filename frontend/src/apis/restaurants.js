import axios from "axios";
import { restaurantsIndex } from "../urls";

export const fetchRestaurants = () => {
  //getリクエストなのでaxios.get。postであればaxios.postになる
  return axios
    .get(restaurantsIndex)
    .then((res) => {
      return res.data;
    })
    .catch((e) => console.error(e));
};
