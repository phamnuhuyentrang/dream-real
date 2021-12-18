import React from 'react';
import { View, Image, StyleSheet, Dimensions, Button, TouchableOpacity, TextInput } from 'react-native';
import avatar from '../static/img/raiden_shogun.png';
import logo from '../static/img/dream-real-logo-nav.png'
import { Svg, Ellipse } from 'react-native-svg'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import star from '../static/img/star.png'

const screen = Dimensions.get("screen");
const window = Dimensions.get("window")
const figma_screen_w = 428;
const figma_screen_h = 926;

const APPBAR_HEIGHT = 200 * screen.height / figma_screen_h;
const Header = () => {
    const [showLogo, toogleShowLogo] = React.useState(true);
    const [value, onChangeText] = React.useState('Search');
    const startSearch = () => toogleShowLogo(displayLogo => !displayLogo);
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                    <Image source={avatar} style={styles.avatar}></Image> 
                    {showLogo? <Image source={logo} style={styles.logo} />: <TextInput style={styles.search_textbox} onChangeText={text => onChangeText(text)}
        value={value} maxLength={40} blurOnSubmit onSubmitEditing={(event) => alert(event.nativeEvent.text)}/> } 
                    <TouchableOpacity style={styles.button} onPress={startSearch}>
                        <FontAwesome5Icon color='white' name="search" size={20}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ ...styles.button, marginRight: 20 }}>
                        <FontAwesome5Icon color='white' name="bell" solid size={20}/>
                    </TouchableOpacity>
            </View>
            <Svg height={APPBAR_HEIGHT} width={screen.width} overflow="hidden" style={styles.svg1}>
                <Ellipse
                    cx={screen.width / 2}
                    cy={APPBAR_HEIGHT / 5}
                    rx="250"
                    ry="80"
                    fill="#252A38"
                    stroke="#252A38"
                    strokeWidth="2"
                />
            </Svg>
            <Svg height={APPBAR_HEIGHT * 2.5} width={screen.width} overflow="hidden" style={styles.svg2}>
                <Ellipse
                    cx={screen.width / 2}
                    cy={APPBAR_HEIGHT * 2.5/ 3}
                    rx="250"
                    ry="120"
                    fill="#3D3D4E"
                    stroke="#3D3D4E"
                    strokeWidth="2"
                />
                {/* <Image source={star}></Image> */}
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
        width: 30 * screen.width / figma_screen_w,
        height: 30 * screen.width / figma_screen_w,
        marginTop: 15
    },

    svg1: {
        position: "absolute",
        zIndex: 0
    },
    svg2: {
        position: "absolute",
        zIndex: -1
    },
    search_textbox: {
        backgroundColor: "#c4c4c4",
        borderColor: "#ffffff",
        borderRadius: 10,
        width: 200 * screen.width / figma_screen_w
    }
})

export default Header;