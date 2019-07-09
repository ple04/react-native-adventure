/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, Image, Alert, StyleSheet, Text, View, FlatList, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const bookmark = require("../../assets/images/bookmark.png");
const filledBookmark = require("../../assets/images/bookmarkfilled.png");

type Props = {};
export default class ParksScreen extends Component<Props> {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      parksList: [],
      bookmark: props.navigation.getParam('bookmark', []),
    };
  }

  componentDidMount() {
    fetch("http://qeepfake.herokuapp.com/parks")
      .then(response => response.json())
      .then((responseJson) => {
        console.log('line 35', this.props.navigation.getParam('bookmark', []))
        let _bookmark = (this.props.navigation.getParam('bookmark', []).length) ? this.props.navigation.getParam('bookmark', []) : new Array(responseJson.length);
        (!this.props.navigation.getParam('bookmark', []).length) ? _bookmark.fill(true) : null;
        this.setState({
          loading: false,
          bookmark: _bookmark,
          parksList: responseJson
        })
      })
      .catch(error => console.log(error))
  }

  async confirmPark(item) {

    let body = JSON.stringify({
      itemName: item.name,
      itemImage: item.imageUrls[2],
      itemType: item.type,
    });

    await fetch('http://qeepfake.herokuapp.com/selectedPark', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',

      },
      body: body
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json()
        }
        else {
          Alert.alert('Park did not get picked')
        }
      })

      .then((responseJson) => {
        if (responseJson.itemName) {
          this.props.navigation.navigate('Signup', {
            itemTitle: 'Confirm Park \n Selection',
            itemName: item.name,
            itemImage: item.imageUrls[2],
            itemType: item.type,
            item: responseJson,
            itemButton: 'Confirm',
            bookmark: this.state.bookmark,
          });
        } else {
          Alert.alert('response is not valid')
        }
      })

      .catch((error) => {
        Alert.alert('ERROR CATCH', error);
        console.error(error);
        console.log('ERROR CATCH', error);

      });


  }

  render() {

    //console.log('line 103',this.state.bookmark, this.props.navigation.getParam('bookmark', []))

    if (this.state.loading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color='black' style={{marginTop: hp('40%')}}/>
        </View>
      )
    }
    return (
      <ScrollView style={{ backgroundColor: 'rgb(247,248,250)', }}>
        <FlatList
          style={{ flex: 1, backgroundColor: 'rgb(247,248,250)', }}
          data={this.state.parksList}
          renderItem={({ item, index }) => (
            <View style={styles.container}>
              <TouchableOpacity
                onPress={() => { this.confirmPark(item); }}
              >
                <View style={styles.cardContainer}>
                  <Image style={styles.image} source={{ uri: item.imageUrls[2] }} />
                  <View style={styles.cardItem}>
                    <Text style={styles.titleText}>{item.name} - {item.type}</Text>
                    <View style={styles.address}>
                      <Image style={styles.like} source={require("../../assets/images/like.png")} />
                      <Text style={styles.addressText}>{item.location}</Text>
                    </View>
                  </View>
                  <TouchableOpacity onPress={() => {
                    //console.log(this.state.bookmark);
                    let bookmarkTmp = this.state.bookmark.slice();
                    bookmarkTmp.splice(index, 1, !bookmarkTmp[index]);
                    //console.log("line 127", bookmarkTmp)
                    this.setState({ bookmark: bookmarkTmp })
                  }}>
                    <Image style={styles.bookmark} source={this.state.bookmark[index] ? bookmark : filledBookmark} />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(247,248,250)',
  },
  cardContainer: {
    margin: 15,
    backgroundColor: 'white',
    flexDirection: 'row',
    width: 345,
    height: 129,
    borderRadius: 8,
    shadowColor: 'rgb(210,211,215)',
    shadowOpacity: 1,
    shadowRadius: 2,
    shadowOffset: {
      height: 5,
      width: 1
    },
    elevation: Platform.OS === 'ios' ? null : hp('1.5%'),
  },
  cardItem: {
    flexDirection: 'column'
  },
  address: {
    flexDirection: 'row',
  },
  titleText: {
    flex: 1,
    fontSize: 20,
    marginRight: 48,
    marginLeft: 10,
    marginTop: 25,
    width: 158,
    fontWeight: '600',
    color: 'black',
    fontFamily: Platform.OS === 'ios' ? 'Montserrat-Bold' : 'montserrat_bold'
  },
  image: {
    alignSelf: 'center',
    marginLeft: 15,
    width: 90,
    height: 90
  },
  like: {
    width: 10,
    height: 15,
    marginLeft: 10,
    marginBottom: 35
  },
  addressText: {
    color: 'rgb(184,187,198)',
    width: 150,
    fontWeight: '400',
    fontSize: 15,
    marginLeft: 6,
    marginBottom: 15,
    fontFamily: Platform.OS === 'ios' ? 'Montserrat-Regular' : 'montserrat_regular',
  },
  bookmark: {
    width: 15.7,
    height: 23.6,
    marginRight: hp('8%'),
    marginTop: 15
  }
});
