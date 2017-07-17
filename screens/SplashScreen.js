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

  gotoScreen(screenName) {
    this.props.navigation.dispatch({
      type: "ReplaceCurrentScreen",
      routeName: screenName,
      params: {},
      key: "transition_splash_to_" + screenName
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
      restClient.isLoggedIn((err, isLoggedIn) => {
        console.log(
          "isLoggedIn callback, err=",
          err,
          " isLoggedIn=",
          isLoggedIn
        );

        if (err != null) {
          console.log("Error in restClient");
          return Alert.alert(err);
        }

        if (isLoggedIn) {
          console.log("Logged in, going to Map screen");
          return this.gotoScreen("Map");
        } else {
          console.log("Not logged in, going to Login");
          return this.gotoScreen("Login");
        }
      });
    }
  }

  render() {
    console.log("Rendering SplashScreen");
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
