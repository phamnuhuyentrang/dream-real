import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions, Button, TouchableOpacity, TextInput, Text } from 'react-native';
import avatar from '../static/img/raiden_shogun.png';
import logo from '../static/img/dream-real-logo-nav.png'
import { Svg, Ellipse } from 'react-native-svg'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import Stories from './Stories/stories'
import GestureRecognizer from 'react-native-swipe-gestures';
import { useNavigation } from '@react-navigation/native';
import LoginPage from './login_page';

const screen = Dimensions.get("screen");
const window = Dimensions.get("window")
const figma_screen_w = 428;
const figma_screen_h = 926;

const APPBAR_HEIGHT = 200 * screen.height / figma_screen_h;
const Header = () => {
    const navigation = useNavigation()
    const [showLogo, toogleShowLogo] = React.useState(true);
    const [value, onChangeText] = React.useState('');

    const [login, setLogin] = React.useState(false);
    const [loginned, setLoginned] = React.useState(false);

    const startSearch = () => toogleShowLogo(displayLogo => !displayLogo);
    const onSwipeDown = (gestureState) => {
        navigation.navigate("Maps");
    }
    const config = {
        velocityThreshold: 0,
        directionalOffsetThreshold: 90
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {loginned ? <TouchableOpacity><Image source={avatar} style={styles.avatar}></Image></TouchableOpacity> :
                <TouchableOpacity  onPress={() => setLogin(!login)}><View style={styles.avatar} ><FontAwesome5Icon name="user-circle" size={20} solid color='white'></FontAwesome5Icon></View></TouchableOpacity>}
                
                {showLogo? <Image source={logo} style={styles.logo} />: <TextInput style={styles.search_textbox} onChangeText={text => onChangeText(text)}
    value={value} maxLength={40} placeholder='Search' blurOnSubmit onSubmitEditing={(event) => alert(event.nativeEvent.text)}/> } 
                <TouchableOpacity style={styles.button} onPress={startSearch}>
                    <FontAwesome5Icon color='white' name="search" size={20}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <FontAwesome5Icon color='white' name="bell" solid size={20}/>
                </TouchableOpacity>
            </View>
            <Stories />
            <Svg height={APPBAR_HEIGHT} width={screen.width} overflow="hidden" style={styles.svg2}>
                <Ellipse
                    cx={screen.width / 2}
                    cy={0}
                    rx={`${0.9 * screen.width}`}
                    ry={`${APPBAR_HEIGHT}`}
                    fill="#2E2F41"
                    stroke="#2E2F41"
                    strokeWidth="2"
                />
            </Svg>
            <Svg height={APPBAR_HEIGHT * 0.7} width={screen.width} overflow="hidden" style={styles.line1}>
                <Ellipse
                    cx={screen.width / 2}
                    cy={0}
                    rx={`${0.7 * screen.width}`}
                    ry={`${0.65 * APPBAR_HEIGHT}`}
                    fill="transparent"
                    stroke="#262A3B"
                    strokeWidth="2"
                />
            </Svg>
            <Svg height={APPBAR_HEIGHT * 0.8} width={screen.width} overflow="hidden" style={styles.line2}>
                <Ellipse
                    cx={screen.width / 2}
                    cy={0}
                    rx={`${0.8 * screen.width}`}
                    ry={`${0.77 * APPBAR_HEIGHT}`}
                    fill="transparent"
                    stroke="#262A3B"
                    strokeWidth="2"
                />
            </Svg>
            <Svg height={APPBAR_HEIGHT * 0.9} width={screen.width} overflow="hidden" style={styles.line3}>
                <Ellipse
                    cx={screen.width / 2}
                    cy={0}
                    rx={`${0.9 * screen.width}`}
                    ry={`${0.89 * APPBAR_HEIGHT}`}
                    fill="transparent"
                    stroke="#262A3B"
                    strokeWidth="2"
                />
            </Svg>
            <GestureRecognizer 
                onSwipeDown={(state) => onSwipeDown(state)}
                config={config}
                style={styles.svg1}>
                <Svg height={APPBAR_HEIGHT * 0.6} width={screen.width} overflow="hidden" >
                    <Ellipse
                        cx={screen.width/2}
                        cy={0}
                        rx={`${0.6 * screen.width}`}
                        ry={`${0.5 * APPBAR_HEIGHT}`}
                        fill="#3D3D4E"
                        stroke="#3D3D4E"
                        strokeWidth="2"
                    />
                </Svg>
            </GestureRecognizer>
            <FontAwesome5Icon color='white' name="arrow-circle-down" solid size={18} style={{position: "absolute", left: 0.5 * screen.width, top: 0.45 * APPBAR_HEIGHT}} />
            <FontAwesome5Icon color='white' name="star" solid size={10} style={{position: "absolute", left: 0.1 * screen.width,
                top: 0.5 * APPBAR_HEIGHT}}/>
            <FontAwesome5Icon color='white' name="star" solid size={10} style={{position: "absolute", left: 0.3 * screen.width,
                top: 0.92 * APPBAR_HEIGHT}}/>
            <FontAwesome5Icon color='white' name="star" solid size={10} style={{position: "absolute", left: 0.9 * screen.width,
                top: 0.63 * APPBAR_HEIGHT}}/>
            <FontAwesome5Icon color='white' name="star" solid size={10} style={{position: "absolute", left: 0.6 * screen.width,
                top: 0.85 * APPBAR_HEIGHT}}/>
            <FontAwesome5Icon color='white' name="star" solid size={10} style={{position: "absolute", left: 0.6 * screen.width,
                top: 0.85 * APPBAR_HEIGHT}}/>
            <FontAwesome5Icon color='white' name="star" solid size={10} style={{position: "absolute", left: 0.7 * screen.width,
                top: 0.45 * APPBAR_HEIGHT}}/>
            <FontAwesome5Icon color='white' name="star" solid size={10} style={{position: "absolute", left: 0.25 * screen.width,
                top: 0.45 * APPBAR_HEIGHT}}/>
            <FontAwesome5Icon color='white' name="star" solid size={10} style={{position: "absolute", left: 0.4 * screen.width,
                top: 0.72 * APPBAR_HEIGHT}}/>
            <FontAwesome5Icon color='white' name="star" solid size={10} style={{position: "absolute", left: 0.97 * screen.width,
                top: 0.45 * APPBAR_HEIGHT}}/>
            <FontAwesome5Icon color='white' name="star" solid size={10} style={{position: "absolute", left: 0.05 * screen.width,
                top: 0.85 * APPBAR_HEIGHT}}/>
            <FontAwesome5Icon color='white' name="star" solid size={10} style={{position: "absolute", left: 0.8 * screen.width,
                top: 0.9 * APPBAR_HEIGHT}}/>
            <LoginPage login={login} setLogin={setLogin} loginned={loginned} setLoginned={setLoginned}></LoginPage>
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
        position: 'relative',
        zIndex: 1
    },
    avatar: {
        marginLeft: 10,
        marginTop: 10,
        width: 45 * screen.width / figma_screen_w,
        height: 45 * screen.width / figma_screen_w,
        borderRadius: 50,
    },

    logo: {
        width: 136 * screen.width / figma_screen_w,
        height: 36 * screen.height / figma_screen_h,
        marginTop: 15,
        marginLeft: "auto", 
        marginRight: "auto"
    },

    button: {
        width: 30 * screen.width / figma_screen_w,
        height: 30 * screen.width / figma_screen_w,
        marginTop: 15,
        marginRight: 10
    },

    svg1: {
        position: "absolute",
        zIndex: 0,
    },
    svg2: {
        position: "absolute",
        zIndex: -4,
    },
    line1: {
        position: "absolute",
        zIndex: -1,
    },
    line2: {
        position: "absolute",
        zIndex: -2,
    },
    line3: {
        position: "absolute",
        zIndex: -3,
    },
    search_textbox: {
        marginTop: 10,
        marginLeft: "auto", 
        marginRight: "auto",
        backgroundColor: "#c4c4c4",
        fontSize: 15,
        borderColor: "white",
        borderRadius: 40,
        width: 250 * screen.width / figma_screen_w,
        paddingHorizontal: 10
    },
    star: {
    }
})

export default Header;