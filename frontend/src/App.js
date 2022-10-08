import React from "react";
import "./App.css";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import { Restaurants } from "./containers/Restaurants";
import { Foods } from "./containers/Foods";
import { Orders } from "./containers/Orders";

function App() {
  return (
    <Router>
      <Switch>
        {/* 店舗ページ */}
        <Route exact path="/restaurants">
          <Restaurants />
        </Route>

        {/* フード一覧ページ */}
        <Route exact path="/foods">
          <Foods />
        </Route>

        {/* 注文ページ */}
        <Route exact path="/orders">
          <Orders />
        </Route>

        <Route
          exact
          // パラメータとして設定した部分は:paramsNameと:をつける
          path="/restaurants/:restaurantsId/foods"
          render={({ match }) => <Foods match={match} />}
        />
      </Switch>
    </Router>
  );
}

export default App;
