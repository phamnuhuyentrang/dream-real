import React from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, Alert, Modal, SafeAreaView, Text, } from 'react-native';
import CustomBar from '../statusbar';
import { Svg, Ellipse } from 'react-native-svg'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { FloatingAction } from "react-native-floating-action";
import logo from '../../static/img/dream-real-logo-nav.png'
import TrendingItems from '../Trending/trending_items';
import ModalPickerFeeling from './modal_picker_feeling';
import follows from "../../static/img/icon-button/follows.png"
import friends from "../../static/img/icon-button/friends.png"
import userIdProvider from '../Context/user_id_provider';
import feeling from "../../static/img/icon-button/1f600.png"
import traveling from "../../static/img/icon-button/1f4ba.png"
import getting from "../../static/img/icon-button/1f4b5.png"
import thinking from "../../static/img/icon-button/1f4ad.png"
import making from "../../static/img/icon-button/1f4cf.png"
import eating from "../../static/img/icon-button/1f37d.png"
import looking from "../../static/img/icon-button/1f52d.png"
import remembering from "../../static/img/icon-button/1f56f.png"
import celebrating from "../../static/img/icon-button/1f389.png"
import meeting from "../../static/img/icon-button/1f454.png"
import drinking from "../../static/img/icon-button/1f943.png"
import custom from "../../static/img/icon-button/1f485-1f3fc.png"
import allfeeling from "../../static/img/icon-button/1f9d0.png"
import allentries from "../../static/img/icon-button/270d.png"
import ModalPickerActivity from './modal_picker_activity';
import axios from 'axios';
const screen = Dimensions.get("screen");
const window = Dimensions.get("window")
const figma_screen_w = 428;
const figma_screen_h = 926;
const listFeeling = [
    {label: 'Feeling/Activity', value: 'allFeeling', url: allfeeling},
    {label: 'Feeling', value: 'feeling', url: feeling},
    {label: 'Eating', value: 'eating', url: eating},
    {label: 'Drinking', value: 'drinking', url: drinking},
    {label: 'Traveling To', value: 'traveling', url: traveling},
    {label: 'Looking For', value: 'looking', url: looking},
    {label: 'Celebrating', value: 'celebrating', url: celebrating},
    {label: 'Meeting', value: 'meeting', url: meeting},
    {label: 'Getting', value: 'getting', url: getting},
    {label: 'Making', value: 'making', url: making},
    {label: 'Thinking About', value: 'thinking', url: thinking},
    {label: 'Remembering', value: 'remembering', url: remembering},
    {label: 'Custom', value: 'custom', url: custom},
]


const APPBAR_HEIGHT = 200 * screen.height / figma_screen_h; 
const PostMaps = (props) => {
    const d = props.route.params.post;
    const [selectedFeeling, setSelectedFeeling] = React.useState({label: "Feeling/Activity", value: "allFeeling", url: allfeeling})
    const [selectedActivity, setSelectedActivity] = React.useState({label: "All Entries", value: "allActivity", url: allentries})
    const [listActivity, setListActivity] = React.useState([]);
    const config = {
        velocityThreshold: 0,
        directionalOffsetThreshold: 90
    };
    const [isModalVisible1, setIsModalVisible1] = React.useState(false)
    const [isModalVisible2, setIsModalVisible2] = React.useState(false)
    const changeModalVisibility1 = (bool) => {
        setIsModalVisible1(bool)
    }
    const changeModalVisibility2 = (bool) => {
        setIsModalVisible2(bool)
    }
    const navigation = useNavigation()
    const region = {
        latitude: 48.73201736668025, 
        longitude: 2.2646355681140853,
        latitudeDelta: 100,
        longitudeDelta: 100 * window.width / window.height,
    }
    const [initialRegion, setRegion] = React.useState(region)
    const [modalVisible, setModalVisible] = React.useState(false)
    const [ind, setIndex] = React.useState(0)
    const [data, setData] = React.useState(d);

    // console.log(data)
    const user_item = React.useContext(userIdProvider);
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
        },
        
    ];

    const onRegionChange = (r) => setRegion(r)

    React.useEffect(() => {
        setData(data)
    }, [data])

    return (
        <View style={{flex: 1}}>
            <MapView
                initialRegion={initialRegion}
                onRegionChange={onRegionChange}
                style={{...styles.map, flex: 1, zIndex:-1}}>
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
            <FloatingAction
                actions={actions}
                onPressItem={name => {
                    switch(name) {
                        case "bt_only_follow":
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
                style = {{position: 'absolute', bottom: 0, right: 0, width: 100 * screen.width / figma_screen_w, height: 100 * screen.width / figma_screen_w, backgroundColor: 'transparent'}}
            />
            <View style={{position: 'absolute', bottom: 0, right: 0, left: 0, backgroundColor: "#3d3d4e", alignItems: "center"}}>
                <View style={{flexDirection: "row", justifyContent: "space-around"}}> 
                    <SafeAreaView style={{marginRight: 0.09 * screen.width}}>
                        <TouchableOpacity onPress={()=> changeModalVisibility1(true)} style={{flexDirection: "row", alignItems:"center", justifyContent:"center", marginLeft: 0.03 * screen.width}}>
                            <Image source={selectedFeeling.url} style={{height: 0.08*screen.width, width: 0.08*screen.width}}></Image>
                            <Text style={{color: "white", fontSize: 0.03 * screen.height}}> {selectedFeeling.label}</Text>
                        </TouchableOpacity>
                        <Modal transparent={true} 
                            animationType='fade' 
                            visible={isModalVisible1}
                            nRequestClose={()=> changeModalVisibility1(false)}>
                            <ModalPickerFeeling changeModalVisibility={changeModalVisibility1} listValue={listFeeling} setData={setData} userId={userId} setSelectedFeeling={setSelectedFeeling} setListActivity={setListActivity} setSelectedActivity={setSelectedActivity}></ModalPickerFeeling>
                        </Modal>
                    </SafeAreaView>

                    <SafeAreaView style={{marginLeft: 0.09 * screen.width}}>
                        <TouchableOpacity onPress={()=> changeModalVisibility2(true)} style={{flexDirection: "row", alignItems:"center", justifyContent:"center", marginRight: 0.03 * screen.width}}>
                            {Number.isInteger(selectedActivity.url) ? <Image source={selectedActivity.url} style={{height: 0.08*screen.width, width: 0.08*screen.width}}></Image>: 
                            <Image source={{uri: global.image_host_url + selectedActivity.url}} style={{height: 0.08*screen.width, width: 0.08*screen.width}}></Image>}
                            <Text style={{color: "white", fontSize: 0.03 * screen.height}}> {selectedActivity.label}</Text>
                        </TouchableOpacity>
                        <Modal transparent={true} 
                            animationType='fade' 
                            visible={isModalVisible2}
                            nRequestClose={()=> changeModalVisibility2(false)}>
                            <ModalPickerActivity changeModalVisibility={changeModalVisibility2} listValue={listActivity} setData={setData} userId={userId} setSelectedActivity={setSelectedActivity} selectedFeeling={selectedFeeling}></ModalPickerActivity>
                        </Modal>
                    </SafeAreaView>
                </View>
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
                    <TrendingItems data={data[ind]} key={ind}/>
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