import React from "react";
import { StackNavigator, TabNavigator } from "react-navigation";

import LoginScreen from "../screens/LoginScreen";
import SplashScreen from "../screens/SplashScreen";
import MyBeeksScreen from "../screens/MyBeeksScreen";
import MapScreen from "../screens/MapScreen";

const Tabs = TabNavigator({
  Map: {
    screen: MapScreen
  },
  MyBeeks: {
    screen: MyBeeksScreen
  }
});

const Root = StackNavigator({
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
  Tabs: {
    screen: Tabs
  }
});

export default Root;

// Add functionality to getStateForAction method
const prevGetStateForAction = Root.router.getStateForAction;

Root.router.getStateForAction = (action, state) => {
  console.log("NavigationAction:\n", action, "\nState:", state);
  // Add new action type
  if (state && action.type === "ResetStack") {
    return {
      ...state,
      routes: [state.routes[state.routes.length - 1]],
      index: 0
    };
  }

  return prevGetStateForAction(action, state);
};
