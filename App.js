
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import WelcomeScreen from './components/screens/WelcomeScreen';
import ParksScreen from './components/screens/ParksScreen';
import SignupScreen from './components/screens/SignupScreen';
import SplashScreen from 'react-native-splash-screen';

type Props = {};
export default class App extends Component<Props> {

  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <Nav />
    );
  }
}

const MainStackNav = createStackNavigator({
  Welcome: {
    screen: WelcomeScreen,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  },
  Signup: {
    screen: SignupScreen,
    navigationOptions: ({ navigation }) => ({
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={styles.leftArrow} source={require("./assets/images/arrowLeft.png")} />
        </TouchableOpacity>),
      headerStyle: {
        backgroundColor: '#F5FCFF',
        borderBottomWidth: 0,
        shadowColor: 'transparent',
        elevation: 0
      },
    })
  },
  Parks: {
    screen: ParksScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'California Parks',
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={styles.leftArrow} source={require("./assets/images/arrowLeft.png")} />
        </TouchableOpacity>),
        headerTitleStyle: {
          marginLeft: Platform.OS === 'ios' ? null : ('18%'),
          fontFamily: Platform.OS === 'ios' ? 'Montserrat-Bold' : 'montserrat_bold',
      },
      headerStyle: {
        backgroundColor: '#FFF',
        borderBottomWidth: 0,
      },
    })
  },
    initialRouteName: "Welcome"
});

const Nav = createAppContainer(createStackNavigator({
  mainApp: {
    screen: MainStackNav,
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    }
  }
}));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  leftArrow: {
    marginLeft: 20
  }
});
