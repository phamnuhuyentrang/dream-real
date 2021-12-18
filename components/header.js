import React from 'react';
import { View, Image, StyleSheet, Dimensions, Button, TouchableOpacity } from 'react-native';
import avatar from '../static/img/raiden_shogun.png';
import logo from '../static/img/dream-real-logo-nav.png'
import { Svg, Circle } from 'react-native-svg'

const screen = Dimensions.get("screen");
const window = Dimensions.get("window")
const figma_screen_w = 428;
const figma_screen_h = 926;

const APPBAR_HEIGHT = 118 * screen.height / figma_screen_h;

const Header = () => {
    return (
        <View style={styles.container}>
            <Svg height={APPBAR_HEIGHT} width={screen.width} overflow="hidden">
                <Circle
                    cx={screen.width / 2}
                    cy={`-${898 - APPBAR_HEIGHT + 2}`}
                    r="898.5"
                    fill="#3D3D4E"
                    stroke="#3D3D4E"
                    strokeWidth="2"
                />
                <View style={styles.content}>
                    <Image source={avatar} style={styles.avatar}></Image> 
                    <Image source={logo} style={styles.logo}></Image>
                    <Button title="click" style={styles.button}></Button>
                    <Button title="check" style={styles.button}></Button>
                </View>
            </Svg>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: screen.width,
        height: APPBAR_HEIGHT,
        backgroundColor: "#252a38",
        overflow: "hidden"
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
        marginTop: 15,
    },

    button: {
        width: 15 * screen.width / figma_screen_w,
        height: 15 * screen.width / figma_screen_w,
    }
})

export default Header;