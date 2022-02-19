import React from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import like from "../../static/img/emoji/like.png";
import love from "../../static/img/emoji/love.png";
import sad from "../../static/img/emoji/sad.png";
import angry from "../../static/img/emoji/angry.png";
import wow from "../../static/img/emoji/wow.png";
import haha from "../../static/img/emoji/haha.png";
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import userIdProvider from "../Context/user_id_provider" 
import LoginPage from '../login_page';
import axios from 'axios';

const screen = Dimensions.get("screen");
const window = Dimensions.get("window");
const figma_screen_w = 428;
const figma_screen_h = 926;


const TrendingItems = (props) => {
    const data = props.data;
    const navigation = useNavigation()
    const user_item = React.useContext(userIdProvider);
    const userId = user_item.id;
    const [nbReact, setNbReact] = React.useState(data.react)
    const [reactIndex, setReactIndex] = React.useState(data.user_react === null ? 0 : data.user_react);
    const showComments = () => {
        if (userId === 0) {
            user_item.setLogin(!user_item.login)
        }
        else {
            navigation.navigate('Comment', {comment: data})
        }
    }
    return (
        <View style={styles.content}>
            <View style={styles.content2}>
                <View>
                    <View style={styles.content4}>
                        <Image source={{uri: global.image_host_url + data.avatar}} style={styles.avatar}></Image>
                        <Text style={styles.item4}>{data.first_name + " " + data.last_name}</Text>
                    </View>
                    <Text style={styles.item3}>{data.title}</Text>
                </View>
                <FontAwesome5Icon color='red' name="map-marker-alt" regular size={10} style={styles.item2}>
                    <Text style={[styles.item2, {color:'#FFF'}]}> {data.location_city + ", " + data.location_country}</Text>
                </FontAwesome5Icon>
            </View>
            {typeof(data.image) == "number" && <Image source={global.image_host_url + data.image} style={styles.place} />}
            {typeof(data.image) == "string" && <Image source={{uri: global.image_host_url + data.image}} style={styles.place} />}
            <View style={styles.content5}>
                <TouchableOpacity>
                    <Text style={styles.item5}>{nbReact} reacts</Text>
                </TouchableOpacity>
                <View>
                    <View style={styles.content7}>
                        <TouchableOpacity onPress={() => {
                            if (reactIndex === 1) {
                                axios.post(global.back_end_url + '/react_album', {
                                    "album_id": data.album_id,
                                    "user_id": userId,
                                    "emoji": 0,
                                    "action": "remove react"
                                }).then(async function(response) {
                                    let json = response.data;
                                    if (json.success) {
                                        setReactIndex(0);
                                        setNbReact(nbReact - 1);
                                    }
                                    else {
                                        Alert.alert("Dream Real React Failed", json.message)
                                    }
                                }).catch(function(error){
                                    Alert.alert("Dream Real React Error", error)
                                })
                            }
                            else {
                                if (reactIndex != 0) {
                                    axios.post(global.back_end_url + '/react_album', {
                                        "album_id": data.album_id,
                                        "user_id": userId,
                                        "emoji": 1,
                                        "action": "old react"
                                    }).then(async function(response) {
                                        let json = response.data;
                                        if (json.success) {
                                            setReactIndex(1);
                                        }
                                        else {
                                            Alert.alert("Dream Real React Failed", json.message)
                                        }
                                    }).catch(function(error){
                                        Alert.alert("Dream Real React Error", error)
                                    })
                                }
                                else {
                                    axios.post(global.back_end_url + '/react_album', {
                                        "album_id": data.album_id,
                                        "user_id": userId,
                                        "emoji": 1,
                                        "action": "new react"
                                    }).then(async function(response) {
                                        let json = response.data;
                                        if (json.success) {
                                            setReactIndex(1);
                                            setNbReact(nbReact + 1);
                                        }
                                        else {
                                            Alert.alert("Dream Real React Failed", json.message)
                                        }
                                    }).catch(function(error){
                                        Alert.alert("Dream Real React Error", error)
                                    })
                                }
                            };
                        }}>
                            <Image source={like} style={{...styles.item7, opacity:reactIndex != 1 || reactIndex === 0 ? 0.3 : 1}}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            if (reactIndex === 2) {
                                axios.post(global.back_end_url + '/react_album', {
                                    "album_id": data.album_id,
                                    "user_id": userId,
                                    "emoji": 0,
                                    "action": "remove react"
                                }).then(async function(response) {
                                    let json = response.data;
                                    if (json.success) {
                                        setReactIndex(0);
                                        setNbReact(nbReact - 1);
                                    }
                                    else {
                                        Alert.alert("Dream Real React Failed", json.message)
                                    }
                                }).catch(function(error){
                                    Alert.alert("Dream Real React Error", error)
                                })
                            }
                            else {
                                if (reactIndex != 0) {
                                    axios.post(global.back_end_url + '/react_album', {
                                        "album_id": data.album_id,
                                        "user_id": userId,
                                        "emoji": 2,
                                        "action": "old react"
                                    }).then(async function(response) {
                                        let json = response.data;
                                        if (json.success) {
                                            setReactIndex(2);
                                        }
                                        else {
                                            Alert.alert("Dream Real React Failed", json.message)
                                        }
                                    }).catch(function(error){
                                        Alert.alert("Dream Real React Error", error)
                                    })
                                }
                                else {
                                    axios.post(global.back_end_url + '/react_album', {
                                        "album_id": data.album_id,
                                        "user_id": userId,
                                        "emoji": 2,
                                        "action": "new react"
                                    }).then(async function(response) {
                                        let json = response.data;
                                        if (json.success) {
                                            setReactIndex(2);
                                            setNbReact(nbReact + 1);
                                        }
                                        else {
                                            Alert.alert("Dream Real React Failed", json.message)
                                        }
                                    }).catch(function(error){
                                        Alert.alert("Dream Real React Error", error)
                                    })
                                }
                            };
                        }}>
                            <Image source={love} style={{...styles.item7, opacity:reactIndex != 2 || reactIndex === 0 ? 0.3 : 1}}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            if (reactIndex === 3) {
                                axios.post(global.back_end_url + '/react_album', {
                                    "album_id": data.album_id,
                                    "user_id": userId,
                                    "emoji": 0,
                                    "action": "remove react"
                                }).then(async function(response) {
                                    let json = response.data;
                                    if (json.success) {
                                        setReactIndex(0);
                                        setNbReact(nbReact - 1);
                                    }
                                    else {
                                        Alert.alert("Dream Real React Failed", json.message)
                                    }
                                }).catch(function(error){
                                    Alert.alert("Dream Real React Error", error)
                                })
                            }
                            else {
                                if (reactIndex != 0) {
                                    axios.post(global.back_end_url + '/react_album', {
                                        "album_id": data.album_id,
                                        "user_id": userId,
                                        "emoji": 3,
                                        "action": "old react"
                                    }).then(async function(response) {
                                        let json = response.data;
                                        if (json.success) {
                                            setReactIndex(3);
                                        }
                                        else {
                                            Alert.alert("Dream Real React Failed", json.message)
                                        }
                                    }).catch(function(error){
                                        Alert.alert("Dream Real React Error", error)
                                    })
                                }
                                else {
                                    axios.post(global.back_end_url + '/react_album', {
                                        "album_id": data.album_id,
                                        "user_id": userId,
                                        "emoji": 3,
                                        "action": "new react"
                                    }).then(async function(response) {
                                        let json = response.data;
                                        if (json.success) {
                                            setReactIndex(3);
                                            setNbReact(nbReact + 1);
                                        }
                                        else {
                                            Alert.alert("Dream Real React Failed", json.message)
                                        }
                                    }).catch(function(error){
                                        Alert.alert("Dream Real React Error", error)
                                    })
                                }
                            };
                        }}>
                            <Image source={haha} style={{...styles.item7, opacity:reactIndex != 3 || reactIndex === 0 ? 0.3 : 1}}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            if (reactIndex === 4) {
                                axios.post(global.back_end_url + '/react_album', {
                                    "album_id": data.album_id,
                                    "user_id": userId,
                                    "emoji": 0,
                                    "action": "remove react"
                                }).then(async function(response) {
                                    let json = response.data;
                                    if (json.success) {
                                        setReactIndex(0);
                                        setNbReact(nbReact - 1);
                                    }
                                    else {
                                        Alert.alert("Dream Real React Failed", json.message)
                                    }
                                }).catch(function(error){
                                    Alert.alert("Dream Real React Error", error)
                                })
                            }
                            else {
                                if (reactIndex != 0) {
                                    axios.post(global.back_end_url + '/react_album', {
                                        "album_id": data.album_id,
                                        "user_id": userId,
                                        "emoji": 4,
                                        "action": "old react"
                                    }).then(async function(response) {
                                        let json = response.data;
                                        if (json.success) {
                                            setReactIndex(4);
                                        }
                                        else {
                                            Alert.alert("Dream Real React Failed", json.message)
                                        }
                                    }).catch(function(error){
                                        Alert.alert("Dream Real React Error", error)
                                    })
                                }
                                else {
                                    axios.post(global.back_end_url + '/react_album', {
                                        "album_id": data.album_id,
                                        "user_id": userId,
                                        "emoji": 4,
                                        "action": "new react"
                                    }).then(async function(response) {
                                        let json = response.data;
                                        if (json.success) {
                                            setReactIndex(4);
                                            setNbReact(nbReact + 1);
                                        }
                                        else {
                                            Alert.alert("Dream Real React Failed", json.message)
                                        }
                                    }).catch(function(error){
                                        Alert.alert("Dream Real React Error", error)
                                    })
                                }
                            };
                        }}>
                            <Image source={sad} style={{...styles.item7, opacity:reactIndex != 4 || reactIndex === 0 ? 0.3 : 1}}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            if (reactIndex === 5) {
                                axios.post(global.back_end_url + '/react_album', {
                                    "album_id": data.album_id,
                                    "user_id": userId,
                                    "emoji": 0,
                                    "action": "remove react"
                                }).then(async function(response) {
                                    let json = response.data;
                                    if (json.success) {
                                        setReactIndex(0);
                                        setNbReact(nbReact - 1);
                                    }
                                    else {
                                        Alert.alert("Dream Real React Failed", json.message)
                                    }
                                }).catch(function(error){
                                    Alert.alert("Dream Real React Error", error)
                                })
                            }
                            else {
                                if (reactIndex != 0) {
                                    axios.post(global.back_end_url + '/react_album', {
                                        "album_id": data.album_id,
                                        "user_id": userId,
                                        "emoji": 5,
                                        "action": "old react"
                                    }).then(async function(response) {
                                        let json = response.data;
                                        if (json.success) {
                                            setReactIndex(5);
                                        }
                                        else {
                                            Alert.alert("Dream Real React Failed", json.message)
                                        }
                                    }).catch(function(error){
                                        Alert.alert("Dream Real React Error", error)
                                    })
                                }
                                else {
                                    axios.post(global.back_end_url + '/react_album', {
                                        "album_id": data.album_id,
                                        "user_id": userId,
                                        "emoji": 5,
                                        "action": "new react"
                                    }).then(async function(response) {
                                        let json = response.data;
                                        if (json.success) {
                                            setReactIndex(5);
                                            setNbReact(nbReact + 1);
                                        }
                                        else {
                                            Alert.alert("Dream Real React Failed", json.message)
                                        }
                                    }).catch(function(error){
                                        Alert.alert("Dream Real React Error", error)
                                    })
                                }
                            };
                        }}>
                            <Image source={wow} style={{...styles.item7, opacity:reactIndex != 5 || reactIndex === 0 ? 0.3 : 1}}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            if (reactIndex === 6) {
                                axios.post(global.back_end_url + '/react_album', {
                                    "album_id": data.album_id,
                                    "user_id": userId,
                                    "emoji": 0,
                                    "action": "remove react"
                                }).then(async function(response) {
                                    let json = response.data;
                                    if (json.success) {
                                        setReactIndex(0);
                                        setNbReact(nbReact - 1);
                                    }
                                    else {
                                        Alert.alert("Dream Real React Failed", json.message)
                                    }
                                }).catch(function(error){
                                    Alert.alert("Dream Real React Error", error)
                                })
                            }
                            else {
                                if (reactIndex != 0) {
                                    axios.post(global.back_end_url + '/react_album', {
                                        "album_id": data.album_id,
                                        "user_id": userId,
                                        "emoji": 6,
                                        "action": "old react"
                                    }).then(async function(response) {
                                        let json = response.data;
                                        if (json.success) {
                                            setReactIndex(6);
                                        }
                                        else {
                                            Alert.alert("Dream Real React Failed", json.message)
                                        }
                                    }).catch(function(error){
                                        Alert.alert("Dream Real React Error", error)
                                    })
                                }
                                else {
                                    axios.post(global.back_end_url + '/react_album', {
                                        "album_id": data.album_id,
                                        "user_id": userId,
                                        "emoji": 6,
                                        "action": "new react"
                                    }).then(async function(response) {
                                        let json = response.data;
                                        if (json.success) {
                                            setReactIndex(6);
                                            setNbReact(nbReact + 1);
                                        }
                                        else {
                                            Alert.alert("Dream Real React Failed", json.message)
                                        }
                                    }).catch(function(error){
                                        Alert.alert("Dream Real React Error", error)
                                    })
                                }
                            };
                        }}>
                            <Image source={angry} style={{...styles.item7, opacity:reactIndex != 6 || reactIndex === 0 ? 0.3 : 1}}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={showComments}>
                            <FontAwesome5Icon color='white' name="comment-alt" regular size={10} style={styles.commenticon}>
                                <Text style={styles.item8}> {data.comment} comments</Text>
                            </FontAwesome5Icon>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <LoginPage login={user_item.login} setLogin={user_item.setLogin} loginned={user_item.loginned} setLoginned={user_item.setLoginned}></LoginPage>
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        backgroundColor: "#3D3D4E",
        height: 0.4 * screen.height,
        borderRadius: 0.02 * screen.width,
        marginBottom: 0.03 * screen.height
    },
    avatar: {
        width: 30 * screen.width / figma_screen_w,
        height: 30 * screen.width / figma_screen_w,
        borderRadius: 50,
        alignSelf: "flex-start"
    },
    content2: {
        marginLeft: 0.02 * screen.width,
        marginTop: 0.01 * screen.height,
        flexDirection: 'row',
        alignItems: "stretch",
        justifyContent: 'space-between',
    },
    content4: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 0.01 * screen.height, 
    },
    item2: {
        marginBottom: 0.05 * screen.height,
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: 10,
        marginRight: 0.05 * screen.width,
        marginTop: 0.01 * screen.height
    },
    item3: {
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: 10,
        color: "#FFF",
        textAlign: "left",
        marginLeft: 0.005 * screen.width
    },
    item4: {
        marginLeft: 0.03 * screen.width, 
        fontStyle: "normal",
        fontWeight: "900",
        fontSize: 15,
        color: "#FFF"
    }, 
    place: {
        marginLeft: 0.03 * screen.width,
        marginRight: 0.03 * screen.width,
        width: 0.85 * screen.width,
        height: 0.25 * screen.height
    },
    content5: {
        marginLeft: 0.03 * screen.width,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
    },
    item5: {
        marginTop: 0.02 * screen.height,
        marginBottom: 0.005 * screen.height,
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: 12,
        color: "#FFF"
    },
    content7: {
        flexDirection: 'row',
        alignItems: "center",
    },
    item7: {
        marginRight: 0.01 * screen.width,
        marginTop: 0.015 * screen.height,
        width: 15 * screen.width / figma_screen_w,
        height: 15 * screen.width / figma_screen_w
    },
    commenticon: {
        marginRight: 0.01 * screen.width,
        marginTop: 0.015 * screen.height,
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: 10,
    },
    item8: {
        fontSize: 12,
        color: "#FFF",
    }
});

export default TrendingItems;