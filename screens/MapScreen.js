import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TextInput,
  TouchableOpacity,
  Button,
  AsyncStorage
} from "react-native";
import { MapView, Permissions, Location } from "expo";

const PropTypes = require("prop-types");

export default class MapScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: null
    };

    this.checkPermissions();
  }

  async checkPermissions() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      Alert.alert(
        "Beek requires location in order to work properlly. Please grant access to location."
      );
    } else {
      console.log("Getting location");
      this.getLocation();
    }
  }

  async getLocation() {
    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true
    });
    this.setState({ location: location });
  }

  render() {
    let shouldShowMap = this.state.location != null;

    let view;
    if (shouldShowMap) {
      const { latitude, longitude } = this.state.location.coords;

      console.log("Lat ", latitude, "Lon ", longitude);
      view = (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        />
      );
    } else {
      view = (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text>Loading map...</Text>
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        {view}
      </View>
    );
  }
}
