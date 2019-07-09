/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ImageBackground, Button, Dimensions, TouchableOpacity  } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



type Props = {};
export default class WelcomeScreen extends Component<Props> {

    render() {
        return (
            <ImageBackground style={styles.container} source={require("../../assets/images/bg.png")}>
                <ImageBackground style={styles.container} source={require("../../assets/images/bgCopy.png")}>
                    <View style={styles.textBox}>
                        <Text style={styles.mainText}>
                            ADVENTURE {"\n"}
                            IS ONLY{"\n"}
                            A CLICK{"\n"}
                            AWAY.
                        </Text>
                        <Text style={styles.secondaryText}>
                        Select an image to find the right {"\n"}national park to visit.
                        </Text>
                        <TouchableOpacity onPress={() => {this.props.navigation.navigate("Signup")}} style={styles.button}>
                            <Text style={styles.textButton}>
                                Start
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        left: -1,
        width: '101%',
        height: '101%'
    },
    textBox: {
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 65
    },
    mainText: { 
        color: 'white', 
        fontSize: Platform.OS === 'ios' ? hp('5%') : hp('7%'),
        fontWeight: '700' ,
        alignSelf: 'center',
        fontFamily: Platform.OS === 'ios' ? 'Montserrat-Bold' : 'montserrat_bold',
        marginLeft: Platform.OS === 'ios' ? hp('-4%') : hp('-9%'),
    },
    secondaryText: {
        fontWeight: '200',
        fontSize: Platform.OS === 'ios' ? hp('2%') : hp('3%'),
        color: 'white',
        marginTop: 25,
        marginRight: 15,
        left: Platform.OS === 'ios' ? hp('-1%') : null,
        fontFamily: Platform.OS === 'ios' ? 'Montserrat-Regular' : 'montserrat_regular',
    },
    button: {
        backgroundColor: "rgb(255,140,0)",
        justifyContent: 'center',
        width: 100,
        borderRadius: 22,
        marginTop: 80,
        width: 315,
        height: 44,

    },
    textButton: {
        fontSize: 17,
        fontWeight: '800',
        color: 'white',
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: Platform.OS === 'ios' ? 'Montserrat-ExtraBold' : 'montserrat_extrabold',
    }
});