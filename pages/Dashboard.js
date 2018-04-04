import React,{ Component } from 'react';
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
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            username:''
        }
    }

    static navigationOptions = {
        title: "Dashboard",
        headerLeft: null
      };

    componentDidMount(){
        this.setState({
          username: this.props.navigation.state.params.name
        });
    }

    render(){
        const { navigate } = this.props.navigation;
        return(
            <View>
               <View style={{ margin: 5 }} />  
              <Text style={{fontWeight: 'bold',fontSize: 20}}>
                  Dashboard for {this.state.username}
              </Text>
              <View style={{ margin: 15 }} />
              <Icon.Button
              color="#000000"
              backgroundColor={"#ffffff"}
              size={50}
              borderRadius={10}
              onPress={e =>  navigate("playerList", { name: this.state.username })}
              title="Player List"
            >
              Player List
            </Icon.Button>
            </View>
        )
    }
}
export default connect()(Dashboard);