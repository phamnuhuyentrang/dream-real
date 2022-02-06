import React from "react";
import { StatusBar, Modal, StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, Platform, TextInput,Alert } from "react-native";
import { ScrollView } from "react-native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import * as ImagePicker from 'expo-image-picker';
import logo from '../static/img/dream-real-logo-nav.png'
import CustomBar from '../components/statusbar';
import * as SecureStore from 'expo-secure-store';
import { Svg, Ellipse } from 'react-native-svg'
import { useNavigation } from '@react-navigation/native';
import userIdProvider from "../components/Context/user_id_provider"
import axios from 'axios';

import TrendingItems from "../components/Trending/trending_items";

const screen = Dimensions.get("screen");
const window = Dimensions.get("window");
const figma_screen_w = 428;
const figma_screen_h = 926;
const APPBAR_HEIGHT = 200 * screen.height / figma_screen_h;

const SLIDER_WIDTH = Dimensions.get('window').width 
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9)
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const isCloseToRight = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToRight = 0.05 * screen.width;
    return layoutMeasurement.width + contentOffset.x >= contentSize.width - paddingToRight;
};


const Profile = (props) => {
    const navigation = useNavigation()
    const [avatar, setAvatar] = React.useState("N/A");
    const [cover, setCover] = React.useState("N/A");
    const [name, setName] = React.useState("N/A");
    
    const [seeFriends, setSeeFriends] = React.useState(true);
    const [seeFollowers, setSeeFollowers] = React.useState(false);
    const [seeFollowing, setSeeFollowing] = React.useState(false);
    const [textColorFriends, setTextColorFriends] = React.useState("#B456F1");
    const [textColorFollowers, setTextColorFollowers] = React.useState("white");
    const [textColorFollowing, setTextColorFollowing] = React.useState("white");
    const [postPhoto, setPostPhoto] = React.useState(null);
    const [postFeeling, setPostFeeling] = React.useState(null);
    const [postLocation, setPostLocation] = React.useState(null);
    const [postText, setPostText] = React.useState("");
    // const [postTag, setPostTag] = React.useState(null);
    const [showPostModal, setPostModal] = React.useState(false);
    const [blurIntensity, setBlurIntensity] = React.useState(1);

    const [loadingFriends, setLoadingFriends] = React.useState(true);
    const [offsetFriends, setOffsetFriends] = React.useState(0);
    const [friends, setFriends] = React.useState([]);
    const [nbFriends, setNbFriends] = React.useState(0);

    const [loadingFollowers, setLoadingFollowers] = React.useState(true);
    const [offsetFollowers, setOffsetFollowers] = React.useState(0);
    const [followers, setFollowers] = React.useState([]);
    const [nbFollowers, setNbFollowers] = React.useState(0);

    const [loadingFollowing, setLoadingFollowing] = React.useState(true);
    const [offsetFollowing, setOffsetFollowing] = React.useState(0);
    const [following, setFollowing] = React.useState([])
    const [nbFollowing, setNbFollowing] = React.useState(0);

    const [loadingPost, setLoadingPosts] = React.useState(true);
    const [offset, setOffset] = React.useState(0);
    const [data, setData] = React.useState([]);

    const user_id = React.useContext(userIdProvider);
    const userId = user_id.id;

    React.useEffect(async () => {
        if (loadingPost) {
            axios.get(global.back_end_url + '/album_user', {
                params: { user_id: userId, offset: offset, user_react_id: userId },
                withCredentials: true 
            })
            .then((response) => {
                let json = response.data;
                if (json.success) {
                    setData([...data, ...JSON.parse(JSON.stringify(json.albums))])
                    setLoadingPosts(false)
                    setOffset(offset + 10)
                    let js = JSON.parse(JSON.stringify(json.albums))
                    setAvatar(global.image_host_url + js[0].avatar)
                    setCover(global.image_host_url + js[0].cover_image)
                    setName(js[0].first_name + " " + js[0].last_name)
                }
                else {
                    Alert.alert("Dream Real Loading Posts Error", json.message)
                }
            })
            .catch((error) => Alert.alert("Dream Real Loading Posts Error", error.message))
        }
    }, [loadingPost])

    React.useEffect(async () => {
        if (loadingFriends) {
            axios.get(global.back_end_url + `/get_friends`, {
                withCredentials: true,
                params: { user_id: userId, offset: offsetFriends } 
            })
            .then((response) => {
                let json = response.data;
                if (json.success) {
                    setFriends([...friends, ...JSON.parse(JSON.stringify(json.friends))])
                    setNbFriends(json.nb_friends)
                    setLoadingFriends(false)
                    setOffsetFriends(offsetFriends + 10)
                }
                else {
                    Alert.alert("Dream Real Loading Friends Error", json.message)
                }
            })
            .catch((error) => Alert.alert("Dream Real Loading Friends Error", error.message))
        }
    }, [loadingFriends])

    React.useEffect(async () => {
        if (loadingFollowers) {
            axios.get(global.back_end_url + `/get_followers`, {
                withCredentials: true,
                params: { user_id: userId, offset: offsetFollowers } 
            })
            .then((response) => {
                let json = response.data;
                if (json.success) {
                    setFollowers([...followers, ...JSON.parse(JSON.stringify(json.followers))])
                    setNbFollowers(json.nb_followers)
                    setLoadingFollowers(false)
                    setOffsetFollowers(offsetFollowers + 10)
                }
                else {
                    Alert.alert("Dream Real Loading Followers Error", json.message)
                }
            })
            .catch((error) => Alert.alert("Dream Real Loading Followers Error", error.message))
        }
    }, [loadingFollowers])

    React.useEffect(async () => {
        let tkn = await SecureStore.getItemAsync("token")
        if (loadingFollowing) {
            axios.get(global.back_end_url + `/get_following`, {
                withCredentials: true,
                params: { user_id: userId, offset: offsetFollowing },
                // headers: {
                //     // Cookie: "access_token=" + tkn
                //     "cookie": "access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1pbHNhdmljIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjQ0MDk5MDMyfQ.AFL3RxurB6FcdqgK_r08OZ7KQTiIw_vuyDRyyG2-ag4"
                // }  
            })
            .then((response) => {
                let json = response.data;
                if (json.success) {
                    setFollowing([...following, ...JSON.parse(JSON.stringify(json.following))])
                    setNbFollowing(json.nb_following)
                    setLoadingFollowing(false)
                    setOffsetFollowing(offsetFollowing + 10)
                }
                else {
                    Alert.alert("Dream Real Loading Following Error", json.message)
                }
            })
            .catch((error) => Alert.alert("Dream Real Loading Following Error", error))
        }
    }, [loadingFollowing])

    // const pickAvatar = async () => {
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //         allowsEditing: true,
    //         aspect: [4, 3],
    //         quality: 1,
    //         base64: true
    //     });
        
    //     if (!result.cancelled) {
    //         setAvatar(result.uri);
    //     }
    // };

    // const pickPhoto = async () => {
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //         allowsEditing: true,
    //         aspect: [4, 3],
    //         quality: 1,
    //         base64: true
    //     });
        
    //     if (!result.cancelled) {
    //         setPostPhoto(result.uri);
    //     }
    // };

    // React.useEffect(() => {
    //     setData(changeValue => {
    //         const list = changeValue.map((d) => {
    //             return {...d, avatar: avatar}
    //         })
    //         return list;
    //     })
    // }, [avatar])

    // const pickCover = async () => {
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //         allowsEditing: true,
    //         aspect: [4, 3],
    //         quality: 1,
    //         base64: true
    //     });
        
    //     if (!result.cancelled) {
    //         setCover(result.uri);
    //     }
    // };

    return (
        <View>
            <CustomBar backgroundColor="#3d3d4e" barStyle="light-content" />
            <ScrollView style={{...styles.container, opacity: blurIntensity}}>  
                <View style={styles.content}>
                    <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                        <View style={styles.backButton} >
                            <FontAwesome5Icon name="chevron-left" size={25} solid color='white'></FontAwesome5Icon>
                        </View>
                    </TouchableOpacity>
                    <Image source={logo} style={styles.logo} />
                </View>
                <TouchableOpacity onPress={() => console.log("Clicked")} style={{position: "absolute", left: 0.42 * screen.width, top: 0.21 * screen.height, zIndex: 1}}>
                    <Image source={{uri: avatar}} style={styles.avatar}/>
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
                <TouchableOpacity onPress={() => console.log("Clicked")} style={styles.cover}>
                    <Image source={{uri: cover}} style={styles.coverImage}/>
                </TouchableOpacity>
                <View style={{top: 0.06 * screen.height, zIndex: 3}}>
                    <Text adjustsFontSizeToFit style={{color: "white", textAlign: "center", textAlignVertical: "center", fontSize: 20, fontWeight: 'bold'}}>{name}</Text>
                </View>
                <View style={{backgroundColor: "#252A38", marginTop: 0.1 * screen.height}}>
                    <View style={styles.row}>
                        <View style={styles.col1}>
                            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-around", marginTop: 0.015 * screen.height}}>
                                {/* <TouchableOpacity onPress={() => navigation.navigate("Maps", {post: data})}>
                                    <View style={{width: 0.1*screen.width, height: 0.02*screen.height, backgroundColor:"#B456F1", marginLeft: 0.05 * screen.width, borderRadius: 0.01 * screen.width, alignItems: "center", justifyContent: "center"}}>
                                        <FontAwesome5Icon name="map-marked-alt" size={10} solid color='white' style={{alignSelf: "center"}}></FontAwesome5Icon>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate("Maps", {post: data})}>
                                    <View style={{width: 0.1*screen.width, height: 0.02*screen.height, backgroundColor:"#B456F1", marginRight: 0.05 * screen.width, borderRadius: 0.01 * screen.width, alignItems: "center", justifyContent: "center"}}>
                                        <FontAwesome5Icon name="bookmark" size={10} solid color='white' style={{alignSelf: "center"}}></FontAwesome5Icon>
                                    </View>
                                </TouchableOpacity> */}
                            </View>
                            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 0.01 * screen.height}}>
                                <Text style={{color: "#fff", textAlign: "left", marginLeft: 0.02 * screen.width}}>My score</Text>
                                <Text style={{color: "#fff", textAlign: "right", marginRight: 0.02 * screen.width}}>535</Text>
                            </View>
                            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 0.005 * screen.height}}>
                                <Text style={{color: "#fff", textAlign: "left", marginLeft: 0.02 * screen.width}}>Rank</Text>
                                <Text style={{color: "#fff", textAlign: "right", marginRight: 0.02 * screen.width}}>N/A</Text>
                            </View>
                        </View>
                        <View style={styles.col2}>
                            <View style={{flexDirection: "column", marginLeft: 0.01 * screen.width, justifyContent: "space-around"}}>
                                <Text style={{color: textColorFriends}} 
                                    onPress={() => {
                                        setSeeFriends(true); 
                                        setSeeFollowing(false); 
                                        setSeeFollowers(false);
                                        setTextColorFriends("#B456F1");
                                        setTextColorFollowing("white");
                                        setTextColorFollowers("white");
                                    }}
                                >{nbFriends} Friends</Text>
                                <Text style={{color: textColorFollowers}} 
                                    onPress={() => {
                                        setSeeFriends(false); 
                                        setSeeFollowing(false); 
                                        setSeeFollowers(true);
                                        setTextColorFriends("white");
                                        setTextColorFollowing("white");
                                        setTextColorFollowers("#B456F1");
                                    }}
                                >{nbFollowers} Followers</Text>
                                <Text style={{color: textColorFollowing}} 
                                    onPress={() => {
                                        setSeeFriends(false); 
                                        setSeeFollowing(true); 
                                        setSeeFollowers(false);
                                        setTextColorFriends("white");
                                        setTextColorFollowers("white");
                                        setTextColorFollowing("#B456F1")
                                    }}
                                >{nbFollowing} Following</Text>
                            </View>
                            {seeFriends && friends != [] && <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{marginTop: 0.01 * screen.height}} onScroll={({nativeEvent}) => {
                                if (isCloseToRight(nativeEvent)) {
                                    setLoadingFriends(true);
                                }
                            }} scrollEventThrottle={400}>
                                {friends.map((friend, index) => (
                                    <TouchableOpacity  key={index}>
                                        <Image source={{uri: global.image_host_url + friend.avatar}} style={styles.friend}></Image>
                                    </TouchableOpacity>
                                ))}       
                            </ScrollView>
                            }
                            {seeFollowers && followers != [] && <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{marginTop: 0.01 * screen.height}} onScroll={({nativeEvent}) => {
                                if (isCloseToRight(nativeEvent)) {
                                    setLoadingFollowers(true);
                                }
                            }} scrollEventThrottle={400}>
                                {followers.map((follower, index) => (
                                    <TouchableOpacity  key={index}>
                                        <Image source={{uri: global.image_host_url + follower.avatar}} style={styles.friend}></Image>
                                    </TouchableOpacity>
                                ))}       
                            </ScrollView>
                            }
                            {seeFollowing && following != [] && <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{marginTop: 0.01 * screen.height}} onScroll={({nativeEvent}) => {
                                if (isCloseToRight(nativeEvent)) {
                                    setLoadingFollowing(true);
                                }
                            }} scrollEventThrottle={400}>
                                {following.map((following, index) => (
                                    <TouchableOpacity  key={index}>
                                        <Image source={{uri: global.image_host_url + following.avatar}} style={styles.friend}></Image>
                                    </TouchableOpacity>
                                ))}       
                            </ScrollView>
                            }
                        </View>
                    </View>
                    <View style={{flexDirection: 'column', backgroundColor: "#3D3D4E", marginTop: 0.02 * screen.height, height: 0.175 * screen.height, width: 0.9 * screen.width, borderRadius: 0.02 * screen.width, alignSelf: "center"}}>
                        <TouchableOpacity style={{flexDirection: "row"}} onPress={() => {setPostModal(true); setBlurIntensity(0.5)}}>
                            <Image source={{uri: avatar}} style={{width: 50 * screen.width / figma_screen_w, height: 50 * screen.width / figma_screen_w, borderRadius: 0.1 * screen.width, margin: 0.015 * screen.height}}/>
                            <Text
                                style={{
                                    width: 0.9 * screen.width - (50 * screen.width / figma_screen_w), 
                                    height: 50 * screen.width / figma_screen_w,
                                    alignSelf: "center",
                                    color: "#c4c4c4" 
                                }}
                            >
                                Share your experiences...
                            </Text>
                        </TouchableOpacity>
                        <View
                            style={{
                                borderBottomColor: 'white',
                                borderBottomWidth: 1,
                            }}
                        />
                        <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 0.01 * screen.height, marginLeft: 0.02 * screen.height, marginRight: 0.02 * screen.height}}>
                            {postPhoto == null && <TouchableOpacity style={{justifyContent: "center", alignItems: "center"}} onPress={() => console.log("Clicked")}>
                                <FontAwesome5Icon name="image" size={16} solid color='#89ff69' style={{marginBottom: 0.005 * screen.height}}></FontAwesome5Icon> 
                                <Text style={{color: "white", fontSize: 14}}>Photo</Text>
                            </TouchableOpacity>}
                            {postPhoto == null && <View style={{borderRightColor: "#c4c4c4", borderRightWidth: 1}} />}
                            <TouchableOpacity style={{justifyContent: "center", alignItems: "center"}} onPress={() => setPostFeeling("grin-tongue-wink")}>
                                <FontAwesome5Icon name="smile-wink" size={16} regular color='#ffff69' style={{marginBottom: 0.005 * screen.height}}></FontAwesome5Icon> 
                                <Text style={{color: "white", fontSize: 14}}>Feeling/Activity</Text>
                            </TouchableOpacity>
                            <View style={{borderRightColor: "#c4c4c4", borderRightWidth: 1}} />
                            {postLocation == null && <TouchableOpacity style={{justifyContent: "center", alignItems: "center"}} onPress={() => setPostLocation("Paris, France")}>
                                <FontAwesome5Icon name="map-marker-alt" size={16} solid color='#80b0ff' style={{marginBottom: 0.005 * screen.height}}></FontAwesome5Icon> 
                                <Text style={{color: "white", fontSize: 14}}>Location</Text>
                            </TouchableOpacity>}
                            {postLocation == null && <View style={{borderRightColor: "#c4c4c4", borderRightWidth: 1}} />}
                            <TouchableOpacity style={{justifyContent: "center", alignItems: "center"}}>
                                <FontAwesome5Icon name="tag" size={16} solid color='#ff5c5c' style={{marginBottom: 0.005 * screen.height}}></FontAwesome5Icon> 
                                <Text style={{color: "white", fontSize: 14}}>Tag</Text>
                            </TouchableOpacity>
                        </View>
                    </View> 
                    <View style={styles.containerPost}> 
                        {data != [] ? data.map((person) => {
                            return (
                                <TrendingItems data={person} key={person.album_id}/>
                            )
                        }): <Text>Loading ...</Text>}
                        {data != [] && <TouchableOpacity style={styles.buttonLoad} onPress={() => setLoadingPosts(true)}>
                            <Text style={{textAlign: "center", alignItems: "center", justifyContent: "center", fontSize: 0.03 * screen.height, color: "white"}}> Load more </Text>
                        </TouchableOpacity>}
                    </View> 
                </View>
            </ScrollView>
            <Modal 
                animationType="fade"
                transparent={true}
                visible={showPostModal}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    
                }}
            >
                <TouchableOpacity 
                    style={styles.centeredView} 
                    activeOpacity={1} 
                    onPressOut={() => {setPostModal(false); setBlurIntensity(1)}}
                >
                    <View style={{height: 0.45 * screen.height}}>
                        <View style={{width: 0.9 * screen.width, flexDirection: "row", backgroundColor: "#3D3D4E", borderTopLeftRadius: 0.02 * screen.width, borderTopRightRadius: 0.02 * screen.width, height: 0.05 * screen.height, justifyContent: "space-between"}}>
                            <TouchableOpacity onPress={() => {setPostModal(false); setBlurIntensity(1)}} style={{alignItems: "center", justifyContent: "center"}}>
                                <FontAwesome5Icon name="times" size={20} regular color='#fff' style={{marginLeft: 0.02 * screen.width, alignSelf: "center"}}></FontAwesome5Icon> 
                            </TouchableOpacity>
                            <View style={{alignItems: "center", justifyContent: "center"}}>
                                <Text style={{color: "#fff", fontSize: 18, textAlign: "center"}}>Create Post</Text>
                            </View>
                            <View style={{alignItems: "center", justifyContent: "center", marginRight: 0.04 * screen.width}}>
                                {/* <TouchableOpacity 
                                    disabled={postText == "" || postFeeling == null || postLocation == null || postPhoto == null ? true: false} 
                                    style={{
                                        backgroundColor: postText == "" || postFeeling == null || postLocation == null || postPhoto == null ? "#c4c4c4": "#29b6f6", 
                                        width: "125%", height: "75%", 
                                        marginRight: 0.02 * screen.width, 
                                        alignItems: "center", 
                                        justifyContent: "center",
                                        borderRadius: 0.02 * screen.width}}
                                    onPress={() => {
                                        setData(addData => [{
                                            name: "Trang Pham",
                                            emotion: "is feeling happy " +  '\u{1f61c}',
                                            place_detail: postLocation,
                                            number_react: 0,
                                            number_comment: 0,
                                            avatar: avatar,
                                            place: postPhoto,
                                            comment: []
                                        }, ...addData])
                                        setBlurIntensity(1);
                                        setPostFeeling(null);
                                        setPostPhoto(null);
                                        setPostText("")
                                        setPostModal(false);
                                    }}>
                                    <Text style={{color: "#fff", fontSize: 18, textAlign: "center", opacity: postText == "" ? 0.5: 1}}>Post</Text>    
                                </TouchableOpacity> */}
                            </View>
                        </View>
                        <ScrollView showsVerticalScrollIndicator={false} style={{width: 0.9 * screen.width, flexDirection: "column", backgroundColor: "#3D3D4E", borderBottomLeftRadius: 0.02 * screen.width, borderBottomRightRadius: 0.02 * screen.width}}>
                            <View style={{flexDirection: "row", height: 0.08 * screen.height}}>
                                <Image source={{uri: avatar}} style={{margin: 0.02 * screen.height, width: 40 * screen.width / figma_screen_w, height: 40 * screen.width / figma_screen_w, borderRadius: 0.1 * screen.width, 
                                    margin: 0.015 * screen.width}}/>
                                <Text style={{color: "white", fontSize: 12, fontWeight: "bold", alignItems: "center", marginTop: 0.015 * screen.width + 10 * screen.width / figma_screen_w}}>Trang Pham </Text>
                                {postFeeling != null && 
                                    <View style={{flexDirection: "row", marginTop: 0.015 * screen.width + 10 * screen.width / figma_screen_w}}>
                                        <Text style={{color: "white", fontSize: 12, fontWeight: "normal", alignItems: "center"}}>is feeling </Text>
                                        <FontAwesome5Icon name={postFeeling} size={12} solid color='#ffff69' style={{alignItems: "center"}}></FontAwesome5Icon>  
                                        <Text style={{color: "white", fontSize: 12, fontWeight: "normal", alignItems: "center"}}> funny</Text>
                                    </View>
                                }
                                {postFeeling == null && 
                                    <TouchableOpacity onPress={() => setPostFeeling("grin-tongue-wink")} style={{flexDirection: "row", marginTop: 0.015 * screen.width + 10 * screen.width / figma_screen_w}}>
                                        <Text style={{color: "white", fontSize: 12, fontWeight: "normal", alignItems: "center"}}>is adding </Text>
                                        <FontAwesome5Icon name="smile-wink" size={12} regular color='#ffff69' style={{alignItems: "center"}}></FontAwesome5Icon>  
                                        <Text style={{color: "white", fontSize: 12, fontWeight: "normal", alignItems: "center"}}> a Feeling/Activity</Text>
                                    </TouchableOpacity>
                                }
                            </View>
                            {postPhoto != null && 
                            <TouchableOpacity onPress={() => console.log("Clicked")}>
                            <Image source={{uri: postPhoto}} style={{
                                width: 0.86 * screen.width, 
                                height: 0.3 * screen.height,
                                marginLeft: 0.02 * screen.width,
                                borderRadius: 0.02 * screen.width,
                                marginBottom: 0.02 * screen.height
                            }}></Image></TouchableOpacity>}
                            <TextInput 
                                multiline={true}
                                placeholder="What's happening?" 
                                placeholderTextColor="#c4c4c4" 
                                style={{
                                    width: 0.86 * screen.width, 
                                    padding: 0.02 * screen.width,
                                    textAlignVertical: "top",
                                    height: 0.25 * screen.height,
                                    marginLeft: 0.02 * screen.width,
                                    backgroundColor: "#363847",
                                    borderRadius: 0.02 * screen.width,
                                    color: "white"
                                }}
                                onChangeText={setPostText}
                                value={postText}
                            />
                            <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 0.01 * screen.height, marginLeft: 0.02 * screen.height, marginRight: 0.02 * screen.height}}>
                                {postPhoto == null &&<TouchableOpacity style={{justifyContent: "center", alignItems: "center"}} onPress={() => console.log("Clicked")}>
                                    <FontAwesome5Icon name="image" size={16} solid color='#89ff69' style={{marginBottom: 0.005 * screen.height}}></FontAwesome5Icon> 
                                    <Text style={{color: "white", fontSize: 14}}>Photo</Text>
                                </TouchableOpacity>}
                                {postPhoto == null && <View style={{borderRightColor: "#c4c4c4", borderRightWidth: 1}} />}
                                {postLocation == null && <TouchableOpacity style={{justifyContent: "center", alignItems: "center"}} onPress={() => setPostLocation("Paris, France")}>
                                    <FontAwesome5Icon name="map-marker-alt" size={16} solid color='#80b0ff' style={{marginBottom: 0.005 * screen.height}}></FontAwesome5Icon> 
                                    <Text style={{color: "white", fontSize: 14}}>Location</Text>
                                </TouchableOpacity>}
                                {postLocation == null && <View style={{borderRightColor: "#c4c4c4", borderRightWidth: 1}} />}
                                <TouchableOpacity style={{justifyContent: "center", alignItems: "center"}}>
                                    <FontAwesome5Icon name="tag" size={16} solid color='#ff5c5c' style={{marginBottom: 0.005 * screen.height}}></FontAwesome5Icon> 
                                    <Text style={{color: "white", fontSize: 14}}>Tag</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        backgroundColor: '#252A38',
        width: "100%",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
        alignSelf: "center",
    },
    avatar: {
        width: 75 * screen.width / figma_screen_w,
        height: 75 * screen.width / figma_screen_w,
        borderRadius: 0.1 * screen.width,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#252A38",
        borderWidth: 3
    },
    backButton: {
        marginLeft: 0.02 * screen.width,
        marginTop: 0.01 * screen.height,
        width: 35 * screen.width / figma_screen_w,
        height: 35 * screen.width / figma_screen_w,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center"
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1
    },
    logo: {
        width: 136 * screen.width / figma_screen_w,
        height: 36 * screen.height / figma_screen_h,
        marginTop: 0.015 * screen.height,
        marginLeft: "auto", 
        marginRight: 0.35 * screen.width
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
    cover: {
        height: 0.2 * screen.height, 
        width: 0.9 * screen.width,
        marginLeft: 0.05 * screen.width,
        marginRight: 0.05 * screen.width,
        overflow: "hidden",
        zIndex: -2,
    },
    coverImage: {
        width: screen.width,
        height: 0.2 * screen.height,
    },
    row: {
        flexDirection: "row",
        marginTop: 0.02 * screen.height,
        marginLeft: 0.05 * screen.width,
        marginRight: 0.05 * screen.width,
        overflow: "hidden",
    },
    col1: {
        flexDirection: "column",
        width: 0.35 * screen.width,
        height: 0.13 * screen.height,
        backgroundColor: '#3D3D4E',
        borderRadius: 0.02 * screen.width,
        marginRight: 0.05 * screen.width
    },

    col2: {
        flexDirection: "row",
        width: 0.5 * screen.width,
        height: 0.13 * screen.height,
        backgroundColor: '#3D3D4E',
        marginRight: 0.05 * screen.width,
        borderRadius: 0.02 * screen.width,
        justifyContent: "space-between",
        alignItems: "center"
    },

    containerPost: {
        marginTop: 0.02 * screen.height,
        overflow: "hidden",
        marginLeft: 0.05 * screen.width,
        marginRight: 0.05 * screen.width,
        marginBottom: 0.02 * screen.height,
    },
    friend: {
        width: 35 * screen.width / figma_screen_w,
        height: 35 * screen.width / figma_screen_w,
        borderRadius: 0.1 * screen.width,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 0.02 * screen.width,
        marginRight: 0.02 * screen.width
    }
})
export default Profile;