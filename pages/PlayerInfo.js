import React, { Component } from "react";
import {
  BackHandler,
  ListView,
  Dimensions,
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  Image,
  Alert
} from "react-native";
import { StackNavigator } from "react-navigation";
import { connect } from "react-redux";
import { screen } from "../redux/actions/auth";
import Logout from "./Logout";

class PlayerInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      isloading: true,
      imageUri: ""
    };
  }

  static navigationOptions = {
      title:'Player Profile',
      headerLeft:null
  }

  componentDidMount() {
    this.getPlayerImage();
    this.props.onScreen('PlayerInfo');
  }

  async getPlayerImage() {
    let playerName = this.props.navigation.state.params.profile.name;
    return fetch(
      "https://api.qwant.com/api/search/images?count=5&offset=1&q=" +
        playerName +
        "manchester city"
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          imageUri: responseJson.data.result.items[0].media,
          isloading: false
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isloading) {
      return <View style={style.loading}>
          <ActivityIndicator size='large'/>
        </View>
    } else {
      let prof = this.props.navigation.state.params.profile;
      return <View style={style.mainContainer}>
          <Image style={style.imageWidth} source={{ uri: this.state.imageUri }} />
          <View style={style.mainContainer}>
            <Text style={style.team}>
              Player: {prof.name} {"\n"}
              Position: {prof.position} {"\n"}
              Number: {prof.jerseyNumber} {"\n"}
              Nationality: {prof.nationality}
            </Text>
          </View>
          <View style={{ margin: 7 }} />
          <Logout data = {this.props}/>
        </View>;
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return { username: state.auth.username };
};

const mapDispatchToProps = dispatch => {
  return {
    onScreen: (name) => {
      dispatch(screen(name))
  }
}
}


const { width, height } = Dimensions.get("window");

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    borderWidth: 4,
    borderRadius: 3,
    borderColor: "skyblue",
    height: 600
  },
  imageWidth: {
    width: width,
    margin:'auto',
    height: 300,
    resizeMode: "contain"
  },
  team: {
    margin: 7,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 5,
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10
  },
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  }
});
export default connect(mapStateToProps,mapDispatchToProps)(PlayerInfo);
