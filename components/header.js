import React from 'react';
import { View, Image, StyleSheet, Dimensions, Button, TouchableOpacity } from 'react-native';
import avatar from '../static/img/raiden_shogun.png';
import logo from '../static/img/dream-real-logo-nav.png'
import { Svg, Ellipse } from 'react-native-svg'
import star from '../static/img/star.png'

const screen = Dimensions.get("screen");
const window = Dimensions.get("window")
const figma_screen_w = 428;
const figma_screen_h = 926;

const APPBAR_HEIGHT = 200 * screen.height / figma_screen_h;
const Header = () => {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                    <Image source={avatar} style={styles.avatar}></Image> 
                    <Image source={logo} style={styles.logo}></Image>
                    <Button title="click" style={styles.button}></Button>
                    <Button title="check" style={styles.button}></Button>
            </View>
            <Svg height={APPBAR_HEIGHT} width={screen.width} overflow="hidden" style={styles.svg1}>
                <Ellipse
                    cx={screen.width/2}
                    cy={0}
                    rx={`${140 * figma_screen_w / screen.width}`}
                    ry={`${12 * figma_screen_h / APPBAR_HEIGHT}`}
                    fill="#252A38"
                    stroke="#252A38"
                    strokeWidth="2"
                />
            </Svg>
            <Svg height={APPBAR_HEIGHT * 1.75} width={screen.width} overflow="hidden" style={styles.svg2}>
                <Ellipse
                    cx={screen.width / 2}
                    cy={0}
                    rx={`${160 * figma_screen_w / screen.width}`}
                    ry={`${28 * figma_screen_h / APPBAR_HEIGHT}`}
                    fill="#3D3D4E"
                    stroke="#3D3D4E"
                    strokeWidth="2"
                />
                {/* <Image source={star} style={styles.star}></Image> */}
            </Svg>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: screen.width,
        height: APPBAR_HEIGHT * 2.5,
        backgroundColor: "#252a38",
        overflow: "hidden"
    },
    
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1
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
    },

    svg1: {
        position: "absolute",
        zIndex: 0,
    },
    svg2: {
        position: "absolute",
        zIndex: -1,
    },
    star: {
    }
})

export default Header;