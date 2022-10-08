import React, { Fragment } from "react";

export const Foods = ({ match }) => {
  return (
    <Fragment>
      フード一覧
      {/* matchオブジェクトを受け取りパラメータを抽出 */}
      <p>restaurantsidは{match.params.restaurantsId}です</p>
    </Fragment>
  );
};
