import React, { Component } from "react";
import { connect } from "react-redux";
import {
  ScrollView,
  Text,
  View,
  Button,
  Alert,
  Image,
  ListView,
  StyleSheet,
  ActivityIndicator,
  BackHandler,
  BackAndroid,
  AsyncStorage,
  Dimensions,
  FlatList
} from "react-native";
import { ListItem } from "react-native-elements";
import { logout } from "../redux/actions/auth";
import Logout from './Logout';
import style from "../style/elecStyle";
import { screen } from "../redux/actions/auth";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

class playerList extends Component {
  constructor(props) {
    super(props);
    this.state = { isloading: true, data: [] };
  }

  static navigationOptions = {
    title: "Player List",
    headerLeft: null
  };

  componentDidMount() {
    this.getPlayer();
    BackHandler.addEventListener("hardwareBackPress", () => {
      if (this.props.screen == "playerList") {
        BackHandler.exitApp();
      } else {
        this.props.onScreen("playerList");
        return false;
      }
    });
  }

  async getPlayer() {
    return await fetch("http://api.football-data.org/v1/teams/65/players", {
      headers: {
        "X-Auth-Token": "9bdea33d0595482c9617b8c929c1462d"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          data: responseJson.players,
          isloading: false
        });
      })
      .done();
  }

  playerInfo(rowData) {
    const { navigate } = this.props.navigation;
    navigate("PlayerInfo", { profile: rowData });
  }

  render() {
    let name = this.props.navigation.state.params.name;
    if (this.state.isloading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1, paddingTop: 20, backgroundColor: "#f5f5f5" }}>
          <Text style={{ fontWeight: "bold" }}>Welcome {name}</Text>
          <View style={{ margin: 7 }} />
          <View style={styles.container}>
            <FlatList
              data={this.state.data}
              style={styles.listview}
              renderItem={({ item }) => (
                <ListItem
                  style={styles.team}
                  onPress={player => this.playerInfo(item)}
                  title={item.name}
                  subtitle={item.position}
                />
              )}
              keyExtractor={item => item.name}
            />
          </View>
          <View style={{ margin: 7 }} />
          <Logout data={this.props} />
        </View>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    username: state.auth.username,
    screen: state.auth.screen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onScreen: name => {
      dispatch(screen(name));
    }
  };
};

const styles = StyleSheet.create({
  team: {
    margin: 7,
    borderWidth: 2,
    borderColor: "skyblue",
    borderRadius: 5,
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10
  },
  container: {
    height: Dimensions.get("screen").height - 232
  },
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  },
  listview: {
    borderWidth: 2,
    borderColor: "skyblue",
    borderRadius: 5
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(playerList);
