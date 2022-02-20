import React from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, Alert, Modal } from 'react-native';
import CustomBar from '../statusbar';
import { Svg, Ellipse } from 'react-native-svg'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { FloatingAction } from "react-native-floating-action";

import logo from '../../static/img/dream-real-logo-nav.png'
import TrendingItems from '../Trending/trending_items';

import follows from "../../static/img/icon-button/follows.png"
import friends from "../../static/img/icon-button/friends.png"
import axios from 'axios';
// import userIdProvider from '../Context/user_id_provider';

const screen = Dimensions.get("screen");
const window = Dimensions.get("window")
const figma_screen_w = 428;
const figma_screen_h = 926;

const APPBAR_HEIGHT = 200 * screen.height / figma_screen_h;

const PostMaps = (props) => {
    const d = props.route.params.post;
    const config = {
        velocityThreshold: 0,
        directionalOffsetThreshold: 90
    };
    const navigation = useNavigation()
    const region = {
        latitude: 48.73201736668025, 
        longitude: 2.2646355681140853,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }
    const [initialRegion, setRegion] = React.useState(region)
    const [modalVisible, setModalVisible] = React.useState(false)
    const [ind, setIndex] = React.useState(0)
    const [data, setData] = React.useState(d);

    // const user_item = React.useContext(userIdProvider);
    const userId = props.route.params.userId;

    const actions = [
        {
            text: "Only followings's posts",
            icon: follows,
            name: "bt_only_follow",
            position: 2
        },
        {
            text: "Only friends's posts",
            icon: friends,
            name: "bt_only_friends",
            position: 1
        }
    ];

    const onRegionChange = (r) => setRegion(r)

    React.useEffect(() => {
        setData(data)
    }, [d])

    return (
        <View style={{flex: 1}}>
            <MapView
                initialRegion={initialRegion}
                onRegionChange={onRegionChange}
                style={{...styles.map, flex: 1}}>
                {data.map((marker, index) => (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: parseInt(marker.latitude),
                            longitude: parseInt(marker.longitude)
                        }}
                        onPress={() => {setModalVisible(true); setIndex(index)}}
                    />
                ))}
            </MapView>
            <CustomBar translucent backgroundColor="#3d3d4e" barStyle="light-content" />
            <View style={styles.container}>
                <View style={styles.content}>
                    <Image source={logo} style={styles.logo} />
                </View>
                <TouchableOpacity onPress={() => {navigation.goBack();}} style={{position: "absolute", left: 0.5 * screen.width, top: 0.4 * APPBAR_HEIGHT, zIndex: 0}}>
                    <FontAwesome5Icon color='white' name="arrow-circle-up" solid size={18} />
                </TouchableOpacity>
                <Svg height={APPBAR_HEIGHT * 0.8} width={screen.width} overflow="hidden" style={styles.svg1} >
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
            </View>
            <View style={{justifyContent: 'flex-end', marginTop: 0.85 * screen.height, marginLeft: 0.85 * screen.width}}>
                <FloatingAction
                    actions={actions}
                    onPressItem={name => {
                        switch(name) {
                            case "bt_only_follow":
                                console.log(userId)
                                axios.get(global.back_end_url + '/filter_album_by_following', {
                                    params: {
                                        user_id: userId,
                                        offset: 0
                                    }
                                }).then((response) => {
                                    let json = JSON.parse(JSON.stringify(response.data))
                                    if (json.success) {
                                        setData(json.album)
                                    }else {
                                        Alert.alert("Dream Real Load Failed", json.message)
                                    }
                                }).catch(function(error){
                                    Alert.alert("Dream Real Load Error", error)
                                })
                                break;
                            case "bt_only_friends":
                                axios.get(global.back_end_url + '/filter_album_by_friend', {
                                    params: {
                                        user_id: userId,
                                        offset: 0
                                    }
                                }).then((response) => {
                                    let json = JSON.parse(JSON.stringify(response.data))
                                    if (json.success) {
                                        setData(json.album)
                                    }else {
                                        Alert.alert("Dream Real Load Failed", json.message)
                                    }
                                }).catch(function(error){
                                    Alert.alert("Dream Real Load Error", error)
                                })
                                break;
                            default:
                                break;
                        }
                    }}
                />
            </View>
            <Modal 
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}
            >
                <TouchableOpacity 
                    style={styles.centeredView} 
                    activeOpacity={1} 
                    onPressOut={() => {setModalVisible(false)}}
                >
                    <TrendingItems data={data[ind]} key={ind} />
                </TouchableOpacity>
            </Modal>
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
        zIndex: -1,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    modalView: {
        backgroundColor: "#3D3D4E",
        height: 0.4 * screen.height,
        borderRadius: 0.02 * screen.width,
        marginBottom: 0.03 * screen.height,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
})

export default PostMaps;