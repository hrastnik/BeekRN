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
  ListView,
  FlatList
} from "react-native";
import { connect } from "react-redux";
import bindActionCreators from "redux";

import { updateLocation, updateBeeks } from "../actions/actions";

export default class BeekList extends React.Component {
  renderItem = ({ item }) => {
    const beek = item;
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => this.props.onBeekSelected(beek.id)}
      >
        <View style={styles.row}>
          <Text style={styles.label}>Id:</Text>
          <Text style={styles.value}>
            {beek.id}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Radius:</Text>
          <Text style={styles.value}>
            {beek.radius}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Message:</Text>
          <Text style={styles.value}>
            {beek.message}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const { beeks } = this.props;
    return (
      <FlatList
        style={styles.container}
        data={beeks}
        keyExtractor={(beek, index) => beek.id}
        renderItem={this.renderItem}
      />
    );
  }
}

const styles = StyleSheet.create({
  label: {
    color: "#FFCB6B",
    fontWeight: "bold"
  },
  value: {
    color: "#333",
    marginLeft: 20
  },
  row: {
    flexDirection: "row",
    flex: 1
  },
  itemContainer: {
    borderColor: "#222",
    borderBottomWidth: 1,
    paddingLeft: 10,
    paddingBottom: 5,
    paddingTop: 5
  },
  container: {
    borderTopWidth: 5,
    borderColor: "#472D30"
  }
});
