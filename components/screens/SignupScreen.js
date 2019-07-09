/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, ImageBackground, TouchableOpacity, Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

type Props = {};
export default class SignupScreen extends Component<Props> {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      selected: [],
      image: 'https://cdn.zeplin.io/5d0a727aac271715e7773fc0/assets/D8717CF3-73C7-428B-8FC7-702635DBA441.png',
      type: "3 places",
      name: "California",
      mounted: false
    };


  }

  componentWillMount() {
    this.state.mounted = true;
    fetch("http://qeepfake.herokuapp.com/selectedPark")
      .then(response => response.json())
      .then((responseJson) => {
        console.log("line 39", responseJson)
        this.setState({
          name: responseJson.itemName,
          image: responseJson.itemImage,
          type: responseJson.itemType,
        })

        if (this.state.mounted) {
          this.setState({
            loading: false,
            selected: responseJson
          })
        }
      })
      .catch(error => console.log(error))
  }

  shouldComponentUpdate(nextProps) {
    console.log("line 71", this.props, nextProps)
    if (this.props !== nextProps) { 
      console.log("line 73")
      this.setState({
        name: nextProps.navigation.getParam("itemName"),
        image: nextProps.navigation.getParam("itemImage"),
        type: nextProps.navigation.getParam("itemType"),
      });
      return true }
      return true 
  }


  saveButton() {
    const itemButton = this.props.navigation.getParam('itemButton', 'Save');
    if (itemButton === 'Confirm') {
      return (
        <TouchableOpacity onPress={() => {
          Alert.alert(
            'Confirm Selected Park',
            'Are you sure you this the park you want to select?',
            [
              { text: 'NO', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
              { text: 'YES', onPress: () => this.props.navigation.navigate('Welcome') },
            ],
            { cancelable: false }
          )
        }} style={styles.button}><Text style={styles.textButton}>{itemButton}</Text></TouchableOpacity>)
    } else {
      return (
        <TouchableOpacity onPress={() => { Alert.alert('Alert', 'Please select a park first.', [{ text: 'Ok' }]); }}
          style={styles.button}><Text style={styles.textButton}>{itemButton}</Text></TouchableOpacity>)
    }
  };

  alert() {
    Alert.alert('Alert', 'Please select a park first.', [{ text: 'Ok' }]);
  };

  render() {
    const { navigation } = this.props;
    const itemTitle = navigation.getParam('itemTitle', 'Select location');
    let bookmark = navigation.getParam('bookmark', []);

    const image = this.state.image ? { uri: this.state.image } : { uri: this.state.selected.itemImage }


    return (
      <View style={styles.container}>
        <Text style={styles.mainText}>
          {itemTitle}
        </Text>
        <TouchableOpacity onPress={() => { this.props.navigation.navigate("Parks", { "bookmark": bookmark }) }}>
          <ImageBackground style={styles.image} source={image}>
            <View style={[styles.imageBox, styles.overlay]}>
              <Text style={styles.mainTextSecondary}>
                {this.state.name ? this.state.name : this.state.selected.itemName}
              </Text>
              <Text style={styles.secondaryText}>
                {this.state.type ? this.state.type : this.state.selected.itemType}
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
        {this.saveButton()}
        <Text style={styles.footerText}>
          Please note not all national parks are available. {"\n"}
          Verify if a reservation is needed for your visit.
          </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  image: {
    marginTop: 40,
    width: 219,
    height: Platform.OS === 'ios' ? hp("30%") : hp("40%"),
    borderRadius: 10,
    overflow: 'hidden',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  mainText: {
    color: "rgb(10,31,68)",
    fontSize: 28,
    marginTop: Platform.OS === 'ios' ? hp("-13%") : null,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Montserrat-Black' : 'montserrat_black'
  },
  imageBox: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  mainTextSecondary: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 150,
    fontFamily: Platform.OS === 'ios' ? 'Montserrat-Bold' : 'montserrat_bold'
  },
  secondaryText: {
    marginTop: 10,
    fontWeight: '200',
    fontSize: 19,
    color: 'white',
    fontFamily: Platform.OS === 'ios' ? 'Montserrat-Regular' : 'montserrat_regular'
  },
  footerText: {
    fontWeight: '200',
    fontSize: 13,
    color: 'black',
    textAlign: 'center',
    marginTop: Platform.OS === 'ios' ? hp("6%") : hp("6%"),
    fontFamily: Platform.OS === 'ios' ? 'Montserrat-Regular' : 'montserrat_regular'
  },
  button: {
    backgroundColor: "rgb(255,140,0)",
    justifyContent: 'center',
    width: 100,
    borderRadius: 22,
    marginTop: Platform.OS === 'ios' ? hp("6%") : hp("6%"),
    width: 315,
    height: 44,

  },
  textButton: {
    fontSize: 17,
    fontWeight: '800',
    color: 'white',
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Montserrat-ExtraBold' : 'montserrat_extrabold'
  }
});