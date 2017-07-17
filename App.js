import React from "react";
import Root from "./router/router";
import RestClient from "./network/RestClient";
import { AsyncStorage } from "react-native";

const PropTypes = require("prop-types");

export default class App extends React.Component {
  getChildContext() {
    console.log("App::getChildContext");
    return {
      restClient: new RestClient()
    };
  }

  render() {
    return <Root />;
  }
}

App.childContextTypes = {
  restClient: PropTypes.object
};
