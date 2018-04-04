import React, { Component } from "react";
import {AsyncStorage} from "react-native";
import {connect} from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { StackNavigator } from "react-navigation";
import { logout } from "../redux/actions/auth";

class Logout extends Component {
  constructor(props){
    super(props)
    this.userlogout = this.userlogout.bind(this);
  }

  userlogout() {
    const {navigate} = this.props.data.navigation;
    this.props.onLogout();
    AsyncStorage.removeItem("username");
    navigate("Login");
  }

  render() {
    return (
      <Icon.Button
        color="#000000"
        backgroundColor="skyblue"
        size={10}
        onPress={() => this.userlogout()}
        title="LOGOUT"
        style={{justifyContent:'center'}}
      >
        LOGOUT
      </Icon.Button>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    username: state.auth.username
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => {
      dispatch(logout());
    }
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Logout);