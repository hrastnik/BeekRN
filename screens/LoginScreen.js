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
const PropTypes = require("prop-types");

export default class LoginScreen extends React.Component {
  onSubmit() {
    const { username, password } = this.state;

    this.context.restClient.login(username, password, (err, data) => {
      if (err) {
        return Alert.alert("Error logging in");
      } else {
        console.log("Login Success", data);
        AsyncStorage.setItem("@RestClientJWT", data.jwt, err => {
          if (err != null) {
            console.log("saving JWT to local storage", err);
          } else {
            console.log("Success saving JWT");
          }
        });

        this.props.navigation.dispatch({
          type: "ReplaceCurrentScreen",
          routeName: "Map",
          params: {},
          key: "transition_login_to_map"
        });
      }
    });
  }

  render() {
    console.log("Rendering LoginScreen");
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.rootView}>
          <Text style={styles.labels}>Username:</Text>
          <TextInput
            style={styles.inputs}
            placeholder="Enter username..."
            placeholderTextColor="#E26D5C"
            underlineColorAndroid="#E26D5C"
            onChangeText={text => {
              this.setState({ username: text });
            }}
          />

          <Text
            style={[
              styles.labels,
              {
                marginTop: 30
              }
            ]}
          >
            Password:
          </Text>
          <TextInput
            style={styles.inputs}
            placeholder="Enter password..."
            placeholderTextColor="#E26D5C"
            underlineColorAndroid="#E26D5C"
            secureTextEntry={true}
            onChangeText={text => {
              this.setState({ password: text });
            }}
          />

          <TouchableOpacity onPress={this.onSubmit.bind(this)}>
            <View
              style={{
                width: 100,
                height: 45,
                marginRight: 10,
                alignSelf: "flex-end",
                backgroundColor: "#E26D5C",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text> Submit </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#FFCB6B"
          }}
        >
          <Text
            style={{
              color: "#0000ff"
            }}
            onPress={() => Alert.alert("sub")}
          >
            Or subscribe...
          </Text>
        </View>
      </View>
    );
  }
}

LoginScreen.contextTypes = {
  restClient: PropTypes.object
};

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#FFCB6B"
  },
  labels: {
    paddingLeft: 8,
    fontSize: 18
  },
  inputs: {
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: "#472D30",
    margin: 10,
    height: 60
  },
  loginButton: {
    width: 100,
    height: 100
  }
});
