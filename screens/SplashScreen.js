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

  async gotoScreen(screenName) {
    return this.props.navigation.navigate(screenName);
  }

  async initRestClient() {
    console.log("Getting JWT from AsyncStorage");
    let jwt = await AsyncStorage.getItem("@RestClientJWT");

    if (jwt === null) {
      return this.gotoScreen("Login");
    } else {
      let { restClient } = this.context;
      console.log("JWT = ", jwt);
      restClient.setJWT(jwt);

      try {
        const isLoggedIn = await restClient.isLoggedIn();
        console.log('isLoggedIn ? ', isLoggedIn);
        const newTabName = isLoggedIn ? "Tabs" : "Login";
        console.log('newTabName:', newTabName);
        return this.gotoScreen(newTabName);
      } catch (err) {
        console.log("Error initializing REST client\n", err);
        return false;
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
