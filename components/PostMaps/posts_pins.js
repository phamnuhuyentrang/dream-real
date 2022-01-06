import React from 'react';
import { View, Image, StyleSheet, Dimensions, Button, TouchableOpacity, TextInput } from 'react-native';
import CustomBar from '../statusbar';
import { Svg, Ellipse } from 'react-native-svg'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import GestureRecognizer from 'react-native-swipe-gestures';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

import avatar from '../../static/img/raiden_shogun.png';
import logo from '../../static/img/dream-real-logo-nav.png'

const postLocation = [
    {
        latLng: {
            latitude: 38.727805168037385,
            longitude: -9.139949624585213
        }
    },
    {
        latLng: {
            latitude: 3.1393316812370626,
            longitude: 101.68838088443376
        }
    },
    {
        latLng: {
            latitude: 47.22069233922117, 
            longitude: -1.5535203250560288
        }
    },
    {
        latLng: {
            latitude: 21.03283049674375, 
            longitude: 105.833873069872
        }
    },
    {
        latLng: {
            latitude: 40.75022860852176, 
            longitude: -74.00855746690083
        }
    },
    {
        latLng: {
            latitude: 46.772811324448014, 
            longitude: 8.437770366918052
        }
    },
]

const screen = Dimensions.get("screen");
const window = Dimensions.get("window")
const figma_screen_w = 428;
const figma_screen_h = 926;

const APPBAR_HEIGHT = 200 * screen.height / figma_screen_h;

const PostMaps = () => {
    const config = {
        velocityThreshold: 0,
        directionalOffsetThreshold: 90
    };
    const navigation = useNavigation()
    const onSwipeUp = (gestureState) => {
        navigation.navigate("Home");
    }
    const region = {
        latitude: 48.73201736668025, 
        longitude: 2.2646355681140853,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }
    const [showLogo, toogleShowLogo] = React.useState(true);
    const [initialRegion, setRegion] = React.useState(region)
    const onRegionChange = (r) => setRegion(r)
    const startSearch = () => toogleShowLogo(displayLogo => !displayLogo);
    return (
        <View style={{flex: 1}}>
            <CustomBar backgroundColor="#3d3d4e" barStyle="light-content" />
            <MapView
                initialRegion={initialRegion}
                onRegionChange={onRegionChange}
                style={styles.map}>
                {postLocation.map((marker, index) => (
                    <Marker
                        key={index}
                        coordinate={marker.latLng}
                    />
                ))}
            </MapView>
            <View style={styles.container}>
                <View style={styles.content}>
                    <Image source={avatar} style={styles.avatar}></Image> 
                    {showLogo? <Image source={logo} style={styles.logo} />: <TextInput style={styles.search_textbox} onChangeText={text => onChangeText(text)}
                                value={value} maxLength={40} placeholder='Search' blurOnSubmit onSubmitEditing={(event) => alert(event.nativeEvent.text)}/> } 
                    <TouchableOpacity style={styles.button} onPress={startSearch}>
                        <FontAwesome5Icon color='white' name="search" size={20}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <FontAwesome5Icon color='white' name="bell" solid size={20}/>
                    </TouchableOpacity>
                </View>
                <GestureRecognizer 
                    onSwipeUp={(state) => onSwipeUp(state)}
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
                <FontAwesome5Icon color='white' name="arrow-circle-up" solid size={18} style={{position: "absolute", left: 0.5 * screen.width, top: 0.45 * APPBAR_HEIGHT}} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: screen.width,
        height: 0.55 * APPBAR_HEIGHT,
        backgroundColor: "transparent",
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
    map: {
        ...StyleSheet.absoluteFillObject,
    }
})

export default PostMaps;