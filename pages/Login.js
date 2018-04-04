import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  View,
  Button,
  TouchableHighlight,
  AlertAndroid,
  NetInfo,
  Dimensions,
  AsyncStorage,
  ActivityIndicator,
  StyleSheet,
  ImageBackground
} from "react-native";
import { login } from "../redux/actions/auth";
import { style } from "../style/elecStyle";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import RootNavigation from "../navigation/RootNavigation";
import playerList from "./playerList";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      route: "Login",
      username: "",
      status: true,
      isloading: true
    };
  }

  componentWillMount() {
    this.getUser();
  }

  getUser() {
    const { navigate } = this.props.navigation;
    AsyncStorage.getItem("username").then(result => {
      if (result != "" && result != null) {
        navigate("Dashboard", { name: result });
      } else {
        this.setState({ isloading: false });
      }
    });
  }

  // static navigationOptions = {
  //   header: null
  // };

  userLoginNRegistration(e) {
    NetInfo.isConnected
      .fetch()
      .then(isConnected => {
        if (this.state.route == "Login" && isConnected) {
          const { navigate } = this.props.navigation;
          this.props.onLogin(this.state.username);
          this.storeUser(this.state.username);
          navigate("Dashboard", { name: this.state.username });
        }
      })
      .catch(function(error) {
        Alert.alert(error.message);
      });
  }

  async storeUser(name) {
    await AsyncStorage.setItem("username", name);
  }

  render() {
    let alt = this.state.route;
    if (this.state.isloading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
      return (
        <ImageBackground
          source={require("../assets/manchester-city.jpg")}
          style={styles.imageContainer}
        >
          <View style={styles.container}>
            <View style={{ margin: 28 }} />
            <TextInput
              placeholder="Username"
              autoCapitalize="none"
              autoCorrect={false}
              autoFocus={false}
              keyboardType="email-address"
              value={this.state.username}
              onChangeText={text => this.setState({ username: text })}
              style={{ padding: 10, fontWeight: "bold" }}
            />
            <View style={{ margin: 2 }} />
            <Icon.Button
              color="#000000"
              backgroundColor={"#ffffff"}
              size={20}
              borderRadius={100}
              onPress={e => this.userLoginNRegistration(e)}
              title={alt}
            >
              {alt}
            </Icon.Button>
          </View>
        </ImageBackground>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isLoggedIn: state.auth.isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (username, password) => {
      dispatch(login(username, password));
    }
  };
};

const styles = StyleSheet.create({
  team: {
    margin: 7,
    borderWidth: 2,
    borderColor: "grey",
    borderRadius: 5
  },
  container: {
    width: 300,
    height: 300,
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 40,
    marginTop: Dimensions.get("screen").height - 450,
    backgroundColor: "transparent"
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
  imageContainer: {
    flex: 1,
    position: "relative",
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
