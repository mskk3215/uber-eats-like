import axios from "axios";
import { restaurantsIndex } from "../urls";

export const fetchRestaurants = () => {
  //getリクエストなのでaxios.get。postであればaxios.postになる
  return axios
    .get(restaurantsIndex)
    .then((res) => {
      //axiosで取得したデータはresponse。response.dataでデータ取得可能。
      return res.data;
    })
    .catch((e) => console.error(e));
};
