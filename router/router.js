import React from "react";
import { StackNavigator } from "react-navigation";

import LoginScreen from "../screens/LoginScreen";
import SplashScreen from "../screens/SplashScreen";
import MyBeeksScreen from "../screens/MyBeeksScreen";
import MapScreen from "../screens/MapScreen";

export default (Root = StackNavigator({
  Splash: {
    screen: SplashScreen,
    navigationOptions: {
      header: null,
      title: "Splash Title"
    }
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      title: "Login"
    }
  },
  MyBeeks: {
    screen: MyBeeksScreen
  },
  Map: {
    screen: MapScreen,
    navigationOptions: {
      header: null
    }
  }
}));

// Add functionality to getStateForAction method
const prevGetStateForAction = Root.router.getStateForAction;

Root.router.getStateForAction = (action, state) => {
  console.log("Custom getStateForAction");
  // Add new action type
  if (state && action.type === "ReplaceCurrentScreen") {
    const routes = state.routes.slice(0, state.routes.length - 1);
    routes.push(action); // Action holds the new screen info
    return {
      ...state,
      routes,
      index: routes.length - 1
    };
  }

  return prevGetStateForAction(action, state);
};
