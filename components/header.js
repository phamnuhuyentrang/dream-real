import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import avatar from '../static/img/raiden_shogun.png';
import logo from '../static/img/dream-real-logo-nav.png'

const screen = Dimensions.get("screen");
const figma_screen_w = 428;
const figma_screen_h = 926;

const Header = () => {
    return (
        <View style={styles.container}>
            {/* <View style={styles.avatar_container}> */}
                <Image source={avatar} style={styles.avatar}></Image> 
            {/* </View> */}
            <View style={styles.logo_container}>
                <Image source={logo} style={styles.logo}></Image>
            </View>
        </View>
    )
}

const APPBAR_HEIGHT = 118 * screen.height / figma_screen_h;

const styles = StyleSheet.create({
    container: {
        width: screen.width,
        height: APPBAR_HEIGHT,
        backgroundColor: "#3D3D4E",
        display: "flex", 
        flexDirection: "row", 
        alignItems: "center", 
        flexWrap: "wrap", 
        alignContent: "center", 
    },
    avatar_container: {
        alignContent: "flex-start", 
        alignItems: "center", 
        justifyContent: "flex-start"
    },
    avatar: {
        marginLeft: 10,
        marginTop: 10,
        width: 45 * screen.width / figma_screen_w,
        height: 45 * screen.height / figma_screen_h,
        borderRadius: 50,
        alignSelf: "flex-start"
    },
    logo_container: {
        alignContent: "center", 
        alignItems: "center", 
        justifyContent: "center"
    },
    logo: {
        width: 136 * screen.width / figma_screen_w,
        height: 36 * screen.height / figma_screen_h,
        // alignSelf: "center",
    }
})

export default Header;