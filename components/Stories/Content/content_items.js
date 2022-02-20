import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, StatusBar, Alert, Platform } from "react-native"
import like from "../../../static/img/emoji/like.png";
import love from "../../../static/img/emoji/love.png";
import sad from "../../../static/img/emoji/sad.png";
import angry from "../../../static/img/emoji/angry.png";
import wow from "../../../static/img/emoji/wow.png";
import haha from "../../../static/img/emoji/haha.png";
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native';
import userIdProvider from "../../Context/user_id_provider" 
import axios from "axios"


const screen = Dimensions.get("screen");
const window = Dimensions.get("window");
const figma_screen_w = 428;
const figma_screen_h = 926;

const SLIDER_WIDTH = Dimensions.get('window').width 
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9)
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const ContentItem = ({ item, index }) => {
    return <Item item={item} index={index} />
}

const Item  = ({ item, index }) => {
    const [nbReact, setNbReact] = React.useState(item.react)
    const [reactIndex, setReactIndex] = React.useState(item.user_react === null ? 0 : item.user_react);
    const user = React.useContext(userIdProvider);

    const navigation = useNavigation()
    const showComments = (i) => {
        navigation.navigate('Comment', {comment: i})
    }
    return (
        <TouchableOpacity 
            activeOpacity={1} 
            onLongPress={() => {navigation.navigate("Home")}}
        >
            <View style={styles.container} key={index}>
            <Image
                source={{uri: global.image_host_url + item.image}}
                style={styles.image}
            />
            <View style={styles.content2}>
                <View>
                    <View style={styles.content4}>
                        <Image source={{uri : global.image_host_url + item.avatar}} style={styles.avatar}></Image>
                        <Text style={styles.item4}>{item.first_name + " " + item.last_name}</Text>
                    </View>
                    <Text style={styles.item3}>{item.title}</Text>
                </View>
                <FontAwesome5Icon color='red' name="map-marker-alt" regular size={12} style={styles.item2}>
                    <Text style={[styles.item2, {color:'#FFF'}]}> {item.location_city + ", " + item.location_country}</Text>
                </FontAwesome5Icon>
            </View>
            <View style={styles.content5}>
                <TouchableOpacity>
                    <Text style={styles.item5}>{nbReact} reacts</Text>
                </TouchableOpacity>
                <View style={styles.content7}>
                <TouchableOpacity onPress={() => {
                    if (reactIndex === 1) {
                        axios.post(global.back_end_url + '/react_album', {
                            "album_id": item.album_id,
                            "user_id": user.id,
                            "emoji": 0,
                            "action": "remove react"
                        }).then(function(response) {
                            let json = JSON.parse(JSON.stringify(response.data));
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
                                "album_id": item.album_id,
                                "user_id": user.id,
                                "emoji": 1,
                                "action": "old react"
                            }).then(function(response) {
                                let json = JSON.parse(JSON.stringify(response.data));
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
                                "album_id": item.album_id,
                                "user_id": user.id,
                                "emoji": 1,
                                "action": "new react"
                            }).then(function(response) {
                                let json = JSON.parse(JSON.stringify(response.data));
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
                                "album_id": item.album_id,
                                "user_id": user.id,
                                "emoji": 0,
                                "action": "remove react"
                            }).then(function(response) {
                                let json = JSON.parse(JSON.stringify(response.data));
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
                                    "album_id": item.album_id,
                                    "user_id": user.id,
                                    "emoji": 2,
                                    "action": "old react"
                                }).then(function(response) {
                                    let json = JSON.parse(JSON.stringify(response.data));
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
                                    "album_id": item.album_id,
                                    "user_id": user.id,
                                    "emoji": 2,
                                    "action": "new react"
                                }).then(function(response) {
                                    let json = JSON.parse(JSON.stringify(response.data));
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
                                "album_id": item.album_id,
                                "user_id": user.id,
                                "emoji": 0,
                                "action": "remove react"
                            }).then(function(response) {
                                let json = JSON.parse(JSON.stringify(response.data));;
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
                                    "album_id": item.album_id,
                                    "user_id": user.id,
                                    "emoji": 3,
                                    "action": "old react"
                                }).then(function(response) {
                                    let json = JSON.parse(JSON.stringify(response.data));;
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
                                    "album_id": item.album_id,
                                    "user_id": user.id,
                                    "emoji": 3,
                                    "action": "new react"
                                }).then(function(response) {
                                    let json = JSON.parse(JSON.stringify(response.data));;
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
                                "album_id": item.album_id,
                                "user_id": user.id,
                                "emoji": 0,
                                "action": "remove react"
                            }).then(function(response) {
                                let json = JSON.parse(JSON.stringify(response.data));;
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
                                    "album_id": item.album_id,
                                    "user_id": user.id,
                                    "emoji": 4,
                                    "action": "old react"
                                }).then(function(response) {
                                    let json = JSON.parse(JSON.stringify(response.data));;
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
                                    "album_id": item.album_id,
                                    "user_id": user.id,
                                    "emoji": 4,
                                    "action": "new react"
                                }).then(function(response) {
                                    let json = JSON.parse(JSON.stringify(response.data));;
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
                                "album_id": item.album_id,
                                "user_id": user.id,
                                "emoji": 0,
                                "action": "remove react"
                            }).then(function(response) {
                                let json = JSON.parse(JSON.stringify(response.data));;
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
                                    "album_id": item.album_id,
                                    "user_id": user.id,
                                    "emoji": 5,
                                    "action": "old react"
                                }).then(function(response) {
                                    let json = JSON.parse(JSON.stringify(response.data));;
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
                                    "album_id": item.album_id,
                                    "user_id": user.id,
                                    "emoji": 5,
                                    "action": "new react"
                                }).then(function(response) {
                                    let json = JSON.parse(JSON.stringify(response.data));;
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
                                "album_id": item.album_id,
                                "user_id": user.id,
                                "emoji": 0,
                                "action": "remove react"
                            }).then(function(response) {
                                let json = JSON.parse(JSON.stringify(response.data));;
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
                                    "album_id": item.album_id,
                                    "user_id": user.id,
                                    "emoji": 6,
                                    "action": "old react"
                                }).then(function(response) {
                                    let json = JSON.parse(JSON.stringify(response.data));;
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
                                    "album_id": item.album_id,
                                    "user_id": user.id,
                                    "emoji": 6,
                                    "action": "new react"
                                }).then(function(response) {
                                    let json = JSON.parse(JSON.stringify(response.data));
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
                    <TouchableOpacity onPress={() => showComments(item)}>
                        <FontAwesome5Icon color='white' name="comment-alt" regular size={10} style={styles.commenticon}>
                            <Text style={styles.item8}> {item.comment} comments</Text>
                        </FontAwesome5Icon>
                    </TouchableOpacity>
                </View>
            </View>
    </View>
    </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#3D3D4E',
        borderRadius: 0.02 * window.width,
        width: ITEM_WIDTH,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
        alignSelf: "center",
        height: 0.55 * (screen.height - STATUSBAR_HEIGHT),
        marginTop: 0.21 * (screen.height - STATUSBAR_HEIGHT) + STATUSBAR_HEIGHT
    },
    image: {
        borderTopLeftRadius: 0.02 * window.width,
        borderTopRightRadius: 0.02 * window.width,
        width: ITEM_WIDTH,
        height: 0.275 * (screen.height - STATUSBAR_HEIGHT),
    },
    item7: {
        width: 20 * screen.width / figma_screen_w,
        height: 20 * screen.width / figma_screen_w,
        marginRight: 0.03 * screen.width
    },
    content2: {
        margin: 0.02 * screen.width,
        flexDirection: 'row',
        alignItems: "stretch",
        justifyContent: 'space-between',
    },
    content4: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 0.01 * screen.height, 
    },
    item4: {
        marginLeft: 0.03 * screen.width, 
        fontStyle: "normal",
        fontWeight: "900",
        fontSize: 16,
        color: "#FFF"
    }, 
    item2: {
        marginBottom: 0.05 * screen.height,
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: 12,
        marginRight: 0.01 * screen.width,
        marginTop: 0.009 * screen.height,
        right: 0
    },
    item3: {
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: 12,
        color: "#FFF",
        textAlign: "left",
        marginTop: 0.01 * screen.height,
        marginLeft: 0.01 * screen.width
    },
    avatar: {
        width: 30 * screen.width / figma_screen_w,
        height: 30 * screen.width / figma_screen_w,
        borderRadius: 50,
        alignSelf: "flex-start",
        marginLeft: 0.0045 * screen.width
    },
    content5: {
        marginLeft: 0.03 * screen.width,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
    },
    item5: {
        marginTop: 0.02 * screen.height,
        marginBottom: 0.025 * screen.height,
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: 14,
        color: "#FFF"
    },
    content7: {
        flexDirection: 'row',
        alignItems: "center",
    },
    item8: {
        fontSize: 12,
        color: "#FFF",
    }
})

export default ContentItem