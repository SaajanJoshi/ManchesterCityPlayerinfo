import React, {Component} from 'react';
import Login from '../pages/Login';
import playerList from "../pages/playerList";
import PlayerInfo from '../pages/PlayerInfo';
import Dashboard from "../pages/Dashboard";
import Logout from '../pages/Logout';
import { StackNavigator } from 'react-navigation';

const RootNavigation = StackNavigator(
  {
    Login: { screen: Login },
    Dashboard: {screen: Dashboard},
    playerList: { screen: playerList },
    PlayerInfo: { screen: PlayerInfo },
    Logout: { screen: Logout }
  },
  {
    navigationOptions: {
      initialRouteName: "Login"
    }
  }
);
export default RootNavigation;
