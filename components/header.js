import React from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import avatar from '../static/img/raiden_shogun.png';
import logo from '../static/img/dream-real-logo-nav.png'
import notifIcons from '../static/img/icon/notif-icon.png'
import searchIcons from '../static/img/icon/search-icon.png'

const screen = Dimensions.get("screen");
const figma_screen_w = 428;
const figma_screen_h = 926;

const Header = () => {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Image source={avatar} style={styles.avatar}></Image> 
                <Image source={logo} style={styles.logo}></Image>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity>
                        <Image source={searchIcons} style={styles.button}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={notifIcons} style={styles.button}></Image>
                    </TouchableOpacity>    
                </View>
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
    },
    
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    avatar: {
        marginLeft: 10,
        marginTop: 10,
        width: 45 * screen.width / figma_screen_w,
        height: 45 * screen.width / figma_screen_w,
        borderRadius: 50,
        alignSelf: "flex-start"
    },

    logo: {
        width: 136 * screen.width / figma_screen_w,
        height: 36 * screen.height / figma_screen_h,
        marginTop: 20,
    },

    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'space-around',
    },

    button: {
        marginLeft: 10,
        marginTop: 10,
        marginRight: 10,
        width: 20 * screen.width / figma_screen_w,
        height: 20 * screen.width / figma_screen_w,
    }
})

export default Header;