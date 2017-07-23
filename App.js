import React from "react";
import Root from "./router/router";
import RestClient from "./network/RestClient";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducerBeek from "./reducers/reducer";
import PropTypes from "prop-types";

const store = createStore(reducerBeek);

export default class App extends React.Component {
  getChildContext() {
    return {
      restClient: new RestClient()
    };
  }

  render() {
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    );
  }
}

App.childContextTypes = {
  restClient: PropTypes.object
};
