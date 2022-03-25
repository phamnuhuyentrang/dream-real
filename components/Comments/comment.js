import React from 'react';
import { View, Image, TouchableOpacity, Text, Dimensions, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback , Platform, Keyboard, Alert } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import like from "../../static/img/emoji/like.png";
import love from "../../static/img/emoji/love.png";
import sad from "../../static/img/emoji/sad.png";
import angry from "../../static/img/emoji/angry.png";
import wow from "../../static/img/emoji/wow.png";
import haha from "../../static/img/emoji/haha.png";
import sendIcon from "../../static/img/icon-button/send.png";
import CommentLayout from './comment_layout';
import Header from '../header';
import CustomBar from '../statusbar';
import userIdProvider from '../Context/user_id_provider';
import dream from "../../static/img/icon-button/dream.png"
import real from "../../static/img/icon-button/real.png"
import axios from "axios"
const figma_screen_w = 428;
const figma_screen_h = 926;
const screen = Dimensions.get('screen');

const Comment = (props) => {
    const [data, setData] = React.useState([]);
    const album = props.route.params.comment;
    const user_item = React.useContext(userIdProvider)
    const userId = user_item.id
    const [end, setEnd] = React.useState(false)
    const score = props.score;
    const setScore = props.setScore;
    const [offset, setOffset] = React.useState(0);
    const [textInit, onChangeText] = React.useState("");
    const [loading, setLoading] = React.useState(true);
    const [favorite, setFavorite] = React.useState(album.favorite);
    const [nbReact, setNbReact] = React.useState(album.react)
    const [reactIndex, setReactIndex] = React.useState(album.user_react === null ? 0 : album.user_react)
    React.useEffect(() => {
        if (loading) {
            axios.get(global.back_end_url + `/get_comment`, {
                params: { user_id: user_item.id, offset: offset, album_id: album.album_id } 
            }).then((response) => {
                if (JSON.parse(JSON.stringify(response.data.comments)).length < 10) {    
                    setEnd(true)
                }
                setData([...data, ...JSON.parse(JSON.stringify(response.data.comments))])
                setLoading(false)
                setOffset(offset + 10)
            })
            .catch((error) => Alert.alert("Dream Real Loading Error", "Error occured when trying to load posts: " + error))
        }
    }, [loading])

    const onChange = (event) => {
        const {eventCount, target, text} = event.nativeEvent;
        onChangeText(text)
    }

    const addComment = () => {
        axios.post(global.back_end_url + '/add_comment', {
            album_id: album.album_id,
            user_id: user_item.id,
            context: textInit
        }).then((response) => {
            // console.log(response.data)
            setData([ ...JSON.parse(JSON.stringify(response.data.comment)), ...data])
            onChangeText("")
        }).catch((error) => Alert.alert("Dream Real Loading Error", "Error occured when trying to add comment: " + error))
    }
    
    return ( 
        <View style={{flex: 1}}>
            <ScrollView style={{backgroundColor: "#252a38", height: screen.height - 100}} keyboardShouldPersistTaps='handled'>
                <View style={{flex: 1}}>
                    <CustomBar backgroundColor="#3d3d4e" barStyle="light-content" />
                    <Header />
                    <View style={{ flex: 1, backgroundColor: "#252a38" }}>
                        <View style={styles.content2}>
                            <View>
                                <View style={styles.content4}>
                                    <Image source={{uri: global.image_host_url + album.avatar}} style={styles.avatar}></Image>
                                    <Text style={styles.item4}>{album.first_name + " " + album.last_name}</Text>
                                </View>
                                <View style={styles.content4}>
                                    <Text style={styles.item3}>is {album.slug}  </Text>
                                    <Image source={{uri: global.image_host_url + album.url}} style={styles.emotion}></Image>
                                    <Text style={styles.item3}>  {album.title}</Text>
                                </View>
                                <View style={styles.content4}>
                                    <Text style={styles.item3}>{album.description}</Text>
                                </View>
                            </View>
                            <View style={{maxWidth: 0.4 * screen.width, alignItems: "flex-end"}}>
                                <View>
                                    <FontAwesome5Icon color='red' name="map-marker-alt" regular size={10} style={styles.item2}>
                                        <Text style={[styles.item2, {color:'#FFF'}]}> {album.location_city + ", " + album.location_country}</Text>
                                    </FontAwesome5Icon>
                                </View>
                                <View style={{alignItems: "flex-end", marginRight: 0.05 * screen.width}}>
                                    {album.dream_real == 1 && 
                                    <View style={{flexDirection: "row"}}>
                                        <Image source={dream} style={{width: 15 * screen.width/ figma_screen_w, height: 15 * screen.width/ figma_screen_w, borderRadius: 50}}>
                                        </Image>
                                        <Text style={{color: "white", fontSize: 10}}>  Dream</Text>
                                    </View>}
                                    {album.dream_real == 0 && 
                                    <View style={{flexDirection: "row"}}>
                                        <Image source={real} style={{width: 15 * screen.width/ figma_screen_w, height: 15 * screen.width/ figma_screen_w, borderRadius: 50}}>
                                        </Image>
                                        <Text style={{color: "white", fontSize: 10}}>  Real</Text>
                                    </View>}
                                </View>
                            </View>
                        </View>
                        {album.user_tagged != null && <View style={{marginLeft: 0.05 * screen.width,  marginBottom: 0.02 * screen.width, flexDirection: "row", overflow: "scroll",  flexWrap: 'wrap',}}>
                            <Text style={{color: "white", fontSize: 12, fontWeight: "bold", alignItems: "center"}}>with: </Text>
                            {album.user_tagged.map((item, index) => <View style={{marginRight: 0.01, flexDirection: "row"}}><TouchableOpacity><Text style={{color: "white", fontSize: 12, fontWeight: "bold", alignItems: "center"}}>{item.first_name + " " + item.last_name}</Text></TouchableOpacity>{index != album.user_tagged.length - 1 && <Text style={{color: "white", fontSize: 12, fontWeight: "bold", alignItems: "center"}}>, </Text> }</View>)} 
                        </View>}
                        {typeof(album.image) == "number" && <Image source={{uri: global.image_host_url + album.image}} style={styles.place} />}
                        {typeof(album.image) == "string" && <Image source={{uri: global.image_host_url + album.image}} style={styles.place} />}
                        <View style={styles.content5}>
                            <TouchableOpacity>
                                <Text style={styles.item5}>{nbReact} reacts</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                if (favorite === 1) {
                                    axios.post(global.back_end_url + '/add_to_favorite', {
                                        "album_id": album.album_id,
                                        "user_id": user_item.id,
                                        "action": "unfavorite"
                                    }).then(function(response) {
                                        let json = JSON.parse(JSON.stringify(response.data));
                                        if (json.success) {
                                            setFavorite(0)
                                            if (score != undefined) {
                                                setScore(score - 5)
                                            }
                                        }
                                        else {
                                            Alert.alert("Dream Real React Failed", json.message)
                                        }
                                    }).catch(function(error){
                                        Alert.alert("Dream Real React Error", error)
                                    })
                                }
                                if (favorite === 0) {
                                    axios.post(global.back_end_url + '/add_to_favorite', {
                                        "album_id": album.album_id,
                                        "user_id": user_item.id,
                                        "action": "favorite"
                                    }).then(function(response) {
                                        let json = JSON.parse(JSON.stringify(response.data));
                                        if (json.success) {
                                            setFavorite(1)
                                            if (score != undefined) {
                                                setScore(score + 5)
                                            }
                                        }
                                        else {
                                            Alert.alert("Dream Real React Failed", json.message)
                                        }
                                    }).catch(function(error){
                                        Alert.alert("Dream Real React Error", error)
                                    })
                                }
                            }}>
                                {favorite === 0 && <FontAwesome5Icon color="white" name="bookmark" regular size={10} style={styles.item7} />}
                                {favorite === 1 && <FontAwesome5Icon color="red" name="bookmark" regular size={10} style={styles.item7} />}
                            </TouchableOpacity>
                            <View style={styles.content7}>
                                <TouchableOpacity onPress={() => {
                                    if (reactIndex === 1) {
                                        axios.post(global.back_end_url + '/react_album', {
                                            "album_id": data.album_id,
                                            "user_id": userId,
                                            "emoji": 0,
                                            "action": "remove react"
                                        }).then(function(response) {
                                            let json = JSON.parse(JSON.stringify(response.data));
                                            if (json.success) {
                                                setReactIndex(0);
                                                setNbReact(nbReact - 1);
                                                if (score != undefined) {
                                                    setScore(score - 5)
                                                }
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
                                                "album_id": data.album_id,
                                                "user_id": userId,
                                                "emoji": 1,
                                                "action": "new react"
                                            }).then(function(response) {
                                                let json = JSON.parse(JSON.stringify(response.data));
                                                if (json.success) {
                                                    setReactIndex(1);
                                                    setNbReact(nbReact + 1);
                                                    if (score != undefined) {
                                                        setScore(score + 5)
                                                    }
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
                                        }).then(function(response) {
                                            let json = JSON.parse(JSON.stringify(response.data));
                                            if (json.success) {
                                                setReactIndex(0);
                                                setNbReact(nbReact - 1);
                                                if (score != undefined) {
                                                    setScore(score - 5)
                                                }
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
                                                "album_id": data.album_id,
                                                "user_id": userId,
                                                "emoji": 2,
                                                "action": "new react"
                                            }).then(function(response) {
                                                let json = JSON.parse(JSON.stringify(response.data));
                                                if (json.success) {
                                                    setReactIndex(2);
                                                    setNbReact(nbReact + 1);
                                                    if (score != undefined) {
                                                        setScore(score + 5)
                                                    }
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
                                        }).then(function(response) {
                                            let json = JSON.parse(JSON.stringify(response.data));
                                            if (json.success) {
                                                setReactIndex(0);
                                                setNbReact(nbReact - 1);
                                                if (score != undefined) {
                                                    setScore(score - 5)
                                                }
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
                                            }).then(function(response) {
                                                let json = JSON.parse(JSON.stringify(response.data));
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
                                            }).then(function(response) {
                                                let json = JSON.parse(JSON.stringify(response.data));
                                                if (json.success) {
                                                    setReactIndex(3);
                                                    setNbReact(nbReact + 1);
                                                    if (score != undefined) {
                                                        setScore(score + 5)
                                                    }
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
                                        }).then(function(response) {
                                            let json = JSON.parse(JSON.stringify(response.data));
                                            if (json.success) {
                                                setReactIndex(0);
                                                setNbReact(nbReact - 1);
                                                if (score != undefined) {
                                                    setScore(score - 5)
                                                }
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
                                            }).then(function(response) {
                                                let json = JSON.parse(JSON.stringify(response.data));
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
                                            }).then(function(response) {
                                                let json = JSON.parse(JSON.stringify(response.data));
                                                if (json.success) {
                                                    setReactIndex(4);
                                                    setNbReact(nbReact + 1);
                                                    if (score != undefined) {
                                                        setScore(score + 5)
                                                    }
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
                                        }).then(function(response) {
                                            let json = JSON.parse(JSON.stringify(response.data));
                                            if (json.success) {
                                                setReactIndex(0);
                                                setNbReact(nbReact - 1);
                                                if (score != undefined) {
                                                    setScore(score - 5)
                                                }
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
                                            }).then(function(response) {
                                                let json = JSON.parse(JSON.stringify(response.data));
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
                                            }).then(function(response) {
                                                let json = JSON.parse(JSON.stringify(response.data));
                                                if (json.success) {
                                                    setReactIndex(5);
                                                    setNbReact(nbReact + 1);
                                                    if (score != undefined) {
                                                        setScore(score + 5)
                                                    }
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
                                        }).then(function(response) {
                                            let json = JSON.parse(JSON.stringify(response.data));
                                            if (json.success) {
                                                setReactIndex(0);
                                                setNbReact(nbReact - 1);
                                                if (score != undefined) {
                                                    setScore(score - 5)
                                                }
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
                                            }).then(function(response) {
                                                let json = JSON.parse(JSON.stringify(response.data));
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
                                            }).then(function(response) {
                                                let json = JSON.parse(JSON.stringify(response.data));
                                                if (json.success) {
                                                    setReactIndex(6);
                                                    setNbReact(nbReact + 1);
                                                    if (score != undefined) {
                                                        setScore(score + 5)
                                                    }
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
                                    <Image source={angry} style={{...styles.itemlast, opacity:reactIndex != 6 || reactIndex === 0 ? 0.3 : 1}}></Image>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.container}> 
                            {data.map((item, index) => {
                                return (
                                    <CommentLayout comment={item} key={index}/>
                                )
                            })}
                            {!end && <TouchableOpacity style={styles.buttonLoad} onPress={() => setLoading(true)}>
                                <Text style={styles.button}> Load more </Text>
                            </TouchableOpacity> }
                        </View> 
                    </View>
                </View>
            </ScrollView>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.comment_area}> 
                        <TextInput
                            style={textInit === "" ? styles.input : {...styles.input, width: 0.9 * screen.width - 32 - 0.02 * screen.width, marginRight: 0.02 * screen.width}}
                            onChange={onChange}
                            value={textInit}
                            placeholder='add a comment ...'
                        />
                        {textInit != "" && <TouchableOpacity onPress={addComment}>
                            <Image style={styles.send_button} source={sendIcon}></Image> 
                        </TouchableOpacity>}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </View>      
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 0.02 * screen.height,
        overflow: "hidden",
        marginLeft: 0.05 * screen.width,
        marginRight: 0.05 * screen.width,
        marginBottom: 0.02 * screen.height,
    },
    avatar: {
        width: 30 * screen.width / figma_screen_w,
        height: 30 * screen.width / figma_screen_w,
        borderRadius: 50,
        alignSelf: "flex-start"
    },
    emotion: {
        width: 20 * screen.width / figma_screen_w,
        height: 20 * screen.width / figma_screen_w,
        borderRadius: 50,
        alignSelf: "flex-start"
    },
    content2: {
        marginLeft: 0.05 * screen.width,
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
        marginBottom: 0.025 * screen.height,
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
    },
    item4: {
        marginLeft: 0.03 * screen.width, 
        fontStyle: "normal",
        fontWeight: "900",
        fontSize: 15,
        color: "#FFF"
    }, 
    place: {
        width: 0.9 * screen.width,
        marginLeft: 0.05 * screen.width,
        marginRight: 0.05 * screen.width,
        height: 0.25 * screen.height
    },
    content5: {
        marginLeft: 0.05 * screen.width,
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
        marginRight: 0.05 * screen.width
    },
    item7: {
        marginRight: 0.02 * screen.width,
        marginTop: 0.015 * screen.height,
        width: 15 * screen.width / figma_screen_w,
        height: 15 * screen.width / figma_screen_w,
    },
    itemlast: {
        width: 15 * screen.width / figma_screen_w,
        height: 15 * screen.width / figma_screen_w,
        marginTop: 0.015 * screen.height,
    },

    comment_area: {
        height: 100,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#252a40"
    },
    input: {
        width: 0.9 * screen.width,
        marginLeft: 0.05 * screen.width,
        marginRight: 0.05 * screen.width,
        backgroundColor: "#3D3D4E",
        height: 40,
        borderRadius: 0.02 * screen.width,
        fontStyle: "normal",
        fontWeight: "900",
        fontSize: 15,
        color: "#FFF",
        paddingLeft: 0.05 * screen.width,
        paddingRight: 0.05 * screen.width, 
    },
    send_button: {
        width: 32,
        height: 32,
        marginRight: 0.05 * screen.width, 
    },
    buttonLoad: {
        width: 0.9 * screen.width,
        height: 0.05 * screen.height,
        marginBottom: 0.02 * screen.height,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 0.02 * screen.width,
        backgroundColor: "#3D3D4E",
    },
    button: {
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 0.03 * screen.height,
        color: "white"
    }
})

export default Comment;