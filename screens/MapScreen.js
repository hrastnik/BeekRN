import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TextInput,
  TouchableOpacity,
  Button,
  AsyncStorage,
  ListView
} from "react-native";
import { connect } from "react-redux";
import bindActionCreators from "redux";

import { diff } from "deep-diff";

import { MapView, Permissions, Location, Constants } from "expo";
import customMapStyle from "../resources/customMapStyle";
import { updateLocation, updateBeeks } from "../actions/actions";
import BeekList from "../components/BeekList";

import PropTypes from "prop-types";

const mapSettings = {
  zoomEnabled: false,
  rotateEnabled: false,
  scrollEnabled: false,
  pitchEnabled: false,
  toolbarEnabled: false,
  moveOnMarkerPress: false
};

class MapScreen extends React.Component {
  constructor(props) {
    super(props);
    this.checkPermissions();
  }

  async checkPermissions() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      Alert.alert(
        "Beek requires location in order to work properlly. Please grant access to location."
      );
    } else {
      this.initLocationUpdates();
    }
  }

  async initLocationUpdates() {
    const positionWatcher = await Location.watchPositionAsync(
      {
        enableHighAccuracy: true,
        timeInterval: 10000,
        distanceInterval: 20
      },
      this.onLocationUpdate.bind(this)
    );

    this.positionWatcherHandle = positionWatcher;
  }

  async getBeeks(latitude, longitude) {
    const { restClient } = this.context;
    try {
      const data = await restClient.getBeeks(latitude, longitude);
      this.props.dispatch(updateBeeks(data.beeks));
    } catch (err) {
      console.log("Error in getBeeks:\n", err);
      this.positionWatcherHandle.remove();
    }
  }

  onLocationUpdate(location) {
    const { latitude, longitude } = location.coords;

    this.props.dispatch(updateLocation({ latitude, longitude }));

    this.getBeeks(latitude, longitude);
  }

  getMap() {
    const { beeks } = this.props;

    const myLocationMarker = (
      <MapView.Marker
        key="myLocation"
        coordinate={this.props.location}
        pinColor="#00ff00"
        style={{ zIndex: 5 }}
      />
    );

    this.markerRefs = {};

    const beekMarkers =
      beeks &&
      beeks.map((beek, index) => {
        const center = { latitude: beek.latitude, longitude: beek.longitude };

        return (
          <MapView.Marker
            key={beek.id + "m"}
            ref={ref => {
              this.markerRefs[beek.id] = ref;
            }}
            coordinate={center}
            title={beek.message}
            description={`Radius: ${beek.radius}`}
          />
        );
      });

    const beekCircles =
      beeks &&
      beeks.map(beek => {
        const center = { latitude: beek.latitude, longitude: beek.longitude };

        return (
          <MapView.Circle
            key={beek.id + "c"}
            center={center}
            radius={beek.radius}
            strokeWidth={0}
            fillColor={"rgba(0, 200, 0, 0.1)"}
          />
        );
      });

    const { latitude, longitude } = this.props.location;

    return (
      <MapView
        style={{
          flex: 1
        }}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.003,
          longitudeDelta: 0.003
        }}
        {...mapSettings}
        customMapStyle={customMapStyle}
      >
        {myLocationMarker}
        {beekMarkers}
        {beekCircles}
      </MapView>
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    const difference = diff(this.props, nextProps);
    if (difference) {
      return true;
    }
    return false;
  }

  selectMarker = beekId => {
    console.log("Clicked this bitch");
    for (const markerId in this.markerRefs) {
      //      console.log(e.nativeEvent.target.id);
      if (markerId == beekId) {
        this.markerRefs[markerId].showCallout();
      } else {
        this.markerRefs[markerId].hideCallout();
      }
    }
  };

  render() {
    console.log("MapScreen::render");

    const mapView = this.getMap();
    return (
      <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
        {mapView}
        <BeekList beeks={this.props.beeks} onBeekSelected={this.selectMarker} />
      </View>
    );
  }
}

MapScreen.contextTypes = {
  restClient: PropTypes.object
};

const mapStateToProps = state => {
  return {
    location: state.location,
    beeks: state.beeks
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(mapStateToProps)(MapScreen);
