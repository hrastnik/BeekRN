import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Alert,
  AsyncStorage
} from "react-native";

const PropTypes = require("prop-types");

export default class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
    this.initRestClient();
  }

  gotoScreen(screenName, params = {}) {
    this.props.navigation.dispatch({
      type: "ReplaceCurrentScreen",
      routeName: screenName,
      key: "transition_splash_to_" + screenName,
      params
    });
  }

  async initRestClient() {
    console.log("Getting JWT from AsyncStorage");
    let jwt = await AsyncStorage.getItem("@RestClientJWT");

    if (jwt === null) {
      console.log("JWT is null, going to LoginScreen");
      return this.gotoScreen("Login");
    } else {
      let { restClient } = this.context;
      console.log("JWT = ", jwt);
      restClient.setJWT(jwt);

      try {
        const isLoggedIn = await restClient.isLoggedIn();
        if (isLoggedIn) {
          console.log("Logged in, going to Map screen");
          this.gotoScreen("Map");
        } else {
          console.log("Not logged in, going to Login");
          return this.gotoScreen("Login");
        }
      } catch (err) {
        console.log("Error in restClient\n", err);
        throw err;
      }
    }
  }

  render() {
    console.log("SplashScreen::render");
    var screen_w = Dimensions.get("window").width;
    var screen_h = Dimensions.get("window").height;
    return (
      <View style={{ flex: 1 }}>
        <Image
          source={require("../resources/images/splashscreen.png")}
          style={{ width: screen_w, height: screen_h }}
        />
      </View>
    );
  }
}

SplashScreen.contextTypes = {
  restClient: PropTypes.object
};
