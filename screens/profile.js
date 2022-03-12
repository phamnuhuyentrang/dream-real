import React from "react";
import { StatusBar, Modal, StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, Platform, TextInput,Alert, Button, Touchable } from "react-native";
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
import moment from "moment";
import TrendingItems from "../components/Trending/trending_items";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { LogBox } from 'react-native';
import { ListItem, Switch, Avatar } from 'react-native-elements'

import feeling from "../static/img/icon-button/1f600.png"
import traveling from "../static/img/icon-button/1f4ba.png"
import getting from "../static/img/icon-button/1f4b5.png"
import thinking from "../static/img/icon-button/1f4ad.png"
import making from "../static/img/icon-button/1f4cf.png"
import eating from "../static/img/icon-button/1f37d.png"
import looking from "../static/img/icon-button/1f52d.png"
import remembering from "../static/img/icon-button/1f56f.png"
import celebrating from "../static/img/icon-button/1f389.png"
import meeting from "../static/img/icon-button/1f454.png"
import drinking from "../static/img/icon-button/1f943.png"
import dream from "../static/img/icon-button/dream.png"
import real from "../static/img/icon-button/real.png"

const screen = Dimensions.get("screen");
const window = Dimensions.get("window");
const figma_screen_w = 428;
const figma_screen_h = 926;
const APPBAR_HEIGHT = 200 * screen.height / figma_screen_h;

const SLIDER_WIDTH = Dimensions.get('window').width 
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9)
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const GOOGLE_PLACES_API_KEY = 'AIzaSyBBkRlU71iBx0edNJz1TxHxdtuFZWCiAqg';

const isCloseToRight = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToRight = 0.05 * screen.width;
    return layoutMeasurement.width + contentOffset.x >= contentSize.width - paddingToRight;
};


const Profile = (props) => {
    const navigation = useNavigation()

    const [end, setEnd] = React.useState(false)
    const [seeFriends, setSeeFriends] = React.useState(true);
    const [endFriends, setEndFriends] = React.useState(false);
    const [seeFollowers, setSeeFollowers] = React.useState(false);
    const [endFollowers, setEndFollowers] = React.useState(false);
    const [seeFollowing, setSeeFollowing] = React.useState(false);
    const [endFollowing, setEndFollowing] = React.useState(false);
    const [textColorFriends, setTextColorFriends] = React.useState("#B456F1");
    const [textColorFollowers, setTextColorFollowers] = React.useState("white");
    const [textColorFollowing, setTextColorFollowing] = React.useState("white");

    const [postPhoto, setPostPhoto] = React.useState(null);
    const [postFeeling, setPostFeeling] = React.useState(null);
    const [location, setLocation] = React.useState("");
    const [locationHash, setLocationHash] = React.useState("");

    const [postText, setPostText] = React.useState("");
    // const [postTag, setPostTag] = React.useState(null);
    const [showPostModal, setPostModal] = React.useState(false);
    const [showFeelingModal, setFeelingModal] = React.useState(false);
    const [blurIntensity, setBlurIntensity] = React.useState(1);
    const [loadingFriends, setLoadingFriends] = React.useState(true);
    const [offsetFriends, setOffsetFriends] = React.useState(0);
    const [friends, setFriends] = React.useState([]);
    const [nbFriends, setNbFriends] = React.useState(0);
    const [dream_or_real, setDreamReal] = React.useState(true);

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
    const [favoriteData, setFavoriteData] = React.useState([]);

    const user = React.useContext(userIdProvider);
    const [userId, setUserId] = React.useState(user.id);
    const userProfile = props.route.params.profile;
    const [userConsult, setUserConsult] = React.useState(null);
    const [listFeeling, setListFeeling] = React.useState([]);
    const [feelingExpanded, setFeelingExpanded] = React.useState(false);
    const [travelingExpanded, setTravelingExpanded] = React.useState(false);
    const [listTraveling, setListTraveling] = React.useState([]);
    const [listEating, setListEating] = React.useState([]);
    const [eatingExpanded, setEatingExpanded] = React.useState(false);
    const [listDrinking, setListDrinking] = React.useState([]);
    const [drinkingExpanded, setDrinkingExpanded] = React.useState(false);
    const [listLooking, setListLooking] = React.useState([]);
    const [lookingExpanded, setLookingExpanded] = React.useState(false);
    const [listMeeting, setListMeeting] = React.useState([]);
    const [meetingExpanded, setMeetingExpanded] = React.useState(false);
    const [listCelebrating, setListCelebrating] = React.useState([]);
    const [celebratingExpanded, setCelebratingExpanded] = React.useState(false);
    const [listGetting, setListGetting] = React.useState([]);
    const [gettingExpanded, setGettingExpanded] = React.useState(false);
    const [listMaking, setListMaking] = React.useState([]);
    const [makingExpanded, setMakingExpanded] = React.useState(false);
    const [listRemembering, setListRemembering] = React.useState([]);
    const [rememberingExpanded, setRememberingExpanded] = React.useState(false);
    const [score, setScore] = React.useState(null);
    React.useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        
        if (loadingPost) {
            // Loading favorite posts at the same time
            axios.get(global.back_end_url + '/album_favorite', {
                params: { user_id: user.id, offset: offset },
                withCredentials: true 
            })
            .then((response) => {
                let json = JSON.parse(JSON.stringify(response.data));
                if (json.success) {
                    if (json.albums.length > 0) {
                        setFavoriteData([...favoriteData, ...JSON.parse(JSON.stringify(json.albums))])
                    }
                }
                else {
                    Alert.alert("Dream Real Loading Favorite Posts Error", json.message)
                }
            })
            .catch((error) => Alert.alert("Dream Real Loading Favorite Posts Error", error.message))

            // Loading posts for maps and new feeds
            axios.get(global.back_end_url + '/album_user', {
                params: { user_id: user.id, offset: offset, user_react_id: Object.keys(userProfile).length ? userProfile.user_id: user.id },
                withCredentials: true 
            })
            .then((response) => {
                let json = JSON.parse(JSON.stringify(response.data));
                if (json.success) {
                    if (json.albums.length > 0) {
                        setUserConsult(JSON.parse(JSON.stringify(json.user[0])))
                        setScore(JSON.parse(JSON.stringify(json.user[0])).score)
                        if (json.albums.length < 10 ) {
                            setEnd(true)
                        } 
                        setData([...data, ...JSON.parse(JSON.stringify(json.albums))])
                        setLoadingPosts(false)
                        setOffset(offset + 10)
                    }
                }
                else {
                    Alert.alert("Dream Real Loading Posts Error", json.message)
                }
            })
            .catch((error) => Alert.alert("Dream Real Loading Posts Error", error.message))
        }
        if (loadingFriends) {
            axios.get(global.back_end_url + `/get_friends`, {
                withCredentials: true,
                params: { user_id: Object.keys(userProfile).length ? userProfile.user_id: user.id, offset: offsetFriends } 
            })
            .then((response) => {
                let json = response.data;
                if (json.success) {
                    if (json.friends.length > 0) {
                        if (json.nb_friends < 10) {
                            setEndFriends(true)
                        }
                        setFriends([...friends, ...JSON.parse(JSON.stringify(json.friends))])
                        setOffsetFriends(offsetFriends + 10)
                        setNbFriends(json.nb_friends)
                    }
                    setLoadingFriends(false)        
                }
                else {
                    Alert.alert("Dream Real Loading Friends Error", json.message)
                }
            })
            .catch((error) => Alert.alert("Dream Real Loading Friends Error", error.message))
        }
        if (loadingFollowers) {
            axios.get(global.back_end_url + `/get_followers`, {
                withCredentials: true,
                params: { user_id: Object.keys(userProfile).length ? userProfile.user_id: user.id, offset: offsetFollowers } 
            })
            .then((response) => {
                let json = response.data;
                if (json.success) {
                    if (json.followers.length > 0) {
                        if (json.nb_followers < 10) {
                            setEndFollowers(true)
                        }
                        setNbFollowers(json.nb_followers)
                        setFollowers([...followers, ...JSON.parse(JSON.stringify(json.followers))])
                        setOffsetFollowers(offsetFollowers + 10)
                    }
                    setLoadingFollowers(false)
                }
                else {
                    Alert.alert("Dream Real Loading Followers Error", json.message)
                }
            })
            .catch((error) => Alert.alert("Dream Real Loading Followers Error", error.message))
        }
        if (loadingFollowing) {
            axios.get(global.back_end_url + `/get_following`, {
                withCredentials: true,
                params: { user_id: Object.keys(userProfile).length ? userProfile.user_id: user.id, offset: offsetFollowing }, 
            })
            .then((response) => {
                let json = response.data;
                if (json.success) {
                    if (json.following.length > 0) {
                        if (json.nb_following < 10) {
                            setEndFollowing(true)
                        }
                        setFollowing([...following, ...JSON.parse(JSON.stringify(json.following))])
                        setOffsetFollowing(offsetFollowing + 10)
                        setNbFollowing(json.nb_following)
                    }      
                    setLoadingFollowing(false)               
                }
                else {
                    Alert.alert("Dream Real Loading Following Error", json.message)
                }
            })
            .catch((error) => Alert.alert("Dream Real Loading Following Error", error))
        }
        if (feelingExpanded && listFeeling.length == 0) {
            axios.get(global.back_end_url + "/tags", {
                params: {slug: "feeling"}
            }).then((response) => {
                var json = JSON.parse(JSON.stringify(response.data))
                if (json.success) {
                    setListFeeling(JSON.parse(JSON.stringify(json.tags)))
                }
            }).catch((error) => {
                Alert.alert("Dream Real Loading Tags Error", json.message)
            })
        }
        if (travelingExpanded && listTraveling.length == 0) {
            axios.get(global.back_end_url + "/tags", {
                params: {slug: "traveling"}
            }).then((response) => {
                let json = JSON.parse(JSON.stringify(response.data))
                if (json.success) {
                    setListTraveling(JSON.parse(JSON.stringify(json.tags)))
                }
            }).catch((error) => {
                Alert.alert("Dream Real Loading Tags Error", json.message)
            })
        }
        setLocation(location)
        setLocationHash(locationHash)
        return() => {
            
            if (Object.keys(userProfile).length) {
                setUserId(userProfile.user_id);
            }
        }
    }, [loadingPost, loadingFriends, loadingFollowers, loadingFollowing, feelingExpanded, travelingExpanded, eatingExpanded, eatingExpanded, drinkingExpanded, lookingExpanded, celebratingExpanded, meetingExpanded, gettingExpanded, makingExpanded, rememberingExpanded, location, locationHash])

    // React.useEffect(async () => {
    //     if (loadingFriends) {
    //         axios.get(global.back_end_url + `/get_friends`, {
    //             withCredentials: true,
    //             params: { user_id: userId, offset: offsetFriends } 
    //         })
    //         .then((response) => {
    //             let json = response.data;
    //             if (json.success) {
    //                 setFriends([...friends, ...JSON.parse(JSON.stringify(json.friends))])
    //                 setNbFriends(json.nb_friends)
    //                 setLoadingFriends(false)
    //                 setOffsetFriends(offsetFriends + 10)
    //             }
    //             else {
    //                 Alert.alert("Dream Real Loading Friends Error", json.message)
    //             }
    //         })
    //         .catch((error) => Alert.alert("Dream Real Loading Friends Error", error.message))
    //     }
    // }, [loadingFriends])

    // React.useEffect(async () => {
    //     if (loadingFollowers) {
    //         axios.get(global.back_end_url + `/get_followers`, {
    //             withCredentials: true,
    //             params: { user_id: userId, offset: offsetFollowers } 
    //         })
    //         .then((response) => {
    //             let json = response.data;
    //             if (json.success) {
    //                 setFollowers([...followers, ...JSON.parse(JSON.stringify(json.followers))])
    //                 setNbFollowers(json.nb_followers)
    //                 setLoadingFollowers(false)
    //                 setOffsetFollowers(offsetFollowers + 10)
    //             }
    //             else {
    //                 Alert.alert("Dream Real Loading Followers Error", json.message)
    //             }
    //         })
    //         .catch((error) => Alert.alert("Dream Real Loading Followers Error", error.message))
    //     }
    // }, [loadingFollowers])

    // React.useEffect(async () => {
    //     let tkn = await SecureStore.getItemAsync("token")
    //     if (loadingFollowing) {
    //         axios.get(global.back_end_url + `/get_following`, {
    //             withCredentials: true,
    //             params: { user_id: userId, offset: offsetFollowing },
    //             // headers: {
    //             //     // Cookie: "access_token=" + tkn
    //             //     "cookie": "access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1pbHNhdmljIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjQ0MDk5MDMyfQ.AFL3RxurB6FcdqgK_r08OZ7KQTiIw_vuyDRyyG2-ag4"
    //             // }  
    //         })
    //         .then((response) => {
    //             let json = response.data;
    //             if (json.success) {
    //                 setFollowing([...following, ...JSON.parse(JSON.stringify(json.following))])
    //                 setNbFollowing(json.nb_following)
    //                 setLoadingFollowing(false)
    //                 setOffsetFollowing(offsetFollowing + 10)
    //             }
    //             else {
    //                 Alert.alert("Dream Real Loading Following Error", json.message)
    //             }
    //         })
    //         .catch((error) => Alert.alert("Dream Real Loading Following Error", error))
    //     }
    // }, [loadingFollowing])

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

    const pickPhoto = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
        });
        
        if (!result.cancelled) {
            setPostPhoto(result.uri);
        }
    };

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

    const logOut = () => {
        axios.get(global.back_end_url + `/logout`, {
            withCredentials: true        
        })
        .then((response) => {
            let json = response.data;
            if (json.success) {
                user.setLoginned(false)
                user.setUserId(0)
                user.setAvatar("")
                user.setFirstname("")
                user.setLastname("")
                user.setUsername("")
                user.setCover("N/A")
                Alert.alert("Dream Real Logout", json.message)
                navigation.navigate("Home");
            }
            else {
                Alert.alert("Dream Real Logout Error")
            }
        })
        .catch((error) => Alert.alert("Dream Real Logout Error", error.message))
    }

    return (
        <View>
            <CustomBar backgroundColor="#3d3d4e" barStyle="light-content" />
            <ScrollView style={{...styles.container, opacity: blurIntensity}}>  
                <View style={styles.content}>
                    <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                        <View style={styles.backButton} >
                            <FontAwesome5Icon name="arrow-alt-circle-left" size={25} solid color='white'></FontAwesome5Icon>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => logOut()}>
                        <View style={styles.backButton} >
                            <FontAwesome5Icon name="user-alt-slash" size={25} solid color='white'></FontAwesome5Icon>
                        </View>
                    </TouchableOpacity>
                    <Image source={logo} style={styles.logo} />
                </View>
                <TouchableOpacity onPress={() => console.log("Clicked")} style={{position: "absolute", left: 0.42 * screen.width, top: 0.21 * screen.height, zIndex: 1}}>
                    <Image source={{uri: user.id === userId? global.image_host_url + user.avatar : global.image_host_url + userProfile.avatar}} style={styles.avatar}/>
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
                    <Image source={{uri: user.id === userId? global.image_host_url + user.cover : global.image_host_url + userProfile.cover_image}} style={styles.coverImage}/>
                </TouchableOpacity>
                <View style={{top: 0.06 * screen.height, zIndex: 3}}>
                    <Text adjustsFontSizeToFit style={{color: "white", textAlign: "center", textAlignVertical: "center", fontSize: 20, fontWeight: 'bold'}}>{user.id === userId? user.firstname + " " + user.lastname : userProfile.first_name + " " + userProfile.last_name}</Text>
                </View>
                <View style={{backgroundColor: "#252A38", marginTop: 0.1 * screen.height}}>
                    <View style={styles.row}>
                        <View style={styles.col1}>
                            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-around", marginTop: 0.015 * screen.height}}>
                                <TouchableOpacity onPress={() => navigation.navigate("Maps", {post: data, userId: Object.keys(userProfile).length ? userProfile.user_id: user.id})}>
                                    <View style={{width: 0.1*screen.width, height: 0.02*screen.height, backgroundColor:"#B456F1", marginLeft: 0.05 * screen.width, borderRadius: 0.01 * screen.width, alignItems: "center", justifyContent: "center"}}>
                                        <FontAwesome5Icon name="map-marked-alt" size={10} solid color='white' style={{alignSelf: "center"}}></FontAwesome5Icon>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate("Maps", {post: favoriteData, userId: Object.keys(userProfile).length ? userProfile.user_id: user.id})}>
                                    <View style={{width: 0.1*screen.width, height: 0.02*screen.height, backgroundColor:"#B456F1", marginRight: 0.05 * screen.width, borderRadius: 0.01 * screen.width, alignItems: "center", justifyContent: "center"}}>
                                        <FontAwesome5Icon name="bookmark" size={10} solid color='white' style={{alignSelf: "center"}}></FontAwesome5Icon>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 0.01 * screen.height}}>
                                <Text style={{color: "#fff", textAlign: "left", marginLeft: 0.02 * screen.width}}>My score</Text>
                                <Text style={{color: "#fff", textAlign: "right", marginRight: 0.02 * screen.width}}>{score === null ? 0: score}</Text>
                            </View>
                            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 0.005 * screen.height}}>
                                <Text style={{color: "#fff", textAlign: "left", marginLeft: 0.02 * screen.width}}>Rank</Text>
                                <Text style={{color: "#fff", textAlign: "right", marginRight: 0.02 * screen.width}}>{userConsult === null ? "N/A": userConsult.rank}</Text>
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
                                if (isCloseToRight(nativeEvent) && !endFriends) {
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
                                if (isCloseToRight(nativeEvent) && !endFollowers) {
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
                                if (isCloseToRight(nativeEvent) && !endFollowing) {
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
                    {userId === user.id && <View style={{flexDirection: 'column', backgroundColor: "#3D3D4E", marginTop: 0.02 * screen.height, height: 0.175 * screen.height, width: 0.9 * screen.width, borderRadius: 0.02 * screen.width, alignSelf: "center"}}>
                        <TouchableOpacity style={{flexDirection: "row"}} onPress={() => {setPostModal(true); setBlurIntensity(0.5)}}>
                            <Image source={{uri: global.image_host_url + user.avatar}} style={{width: 50 * screen.width / figma_screen_w, height: 50 * screen.width / figma_screen_w, borderRadius: 0.1 * screen.width, margin: 0.015 * screen.height}}/>
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
                            {postPhoto == null && <TouchableOpacity style={{justifyContent: "center", alignItems: "center"}} onPress={() => pickPhoto()}>
                                <FontAwesome5Icon name="image" size={16} solid color='#89ff69' style={{marginBottom: 0.005 * screen.height}}></FontAwesome5Icon> 
                                <Text style={{color: "white", fontSize: 14}}>Photo</Text>
                            </TouchableOpacity>}
                            {postFeeling == null && <View style={{borderRightColor: "#c4c4c4", borderRightWidth: 1}} />}
                            <TouchableOpacity style={{justifyContent: "center", alignItems: "center"}} onPress={() => {setFeelingModal(true); setBlurIntensity(0.5)}}>
                                <FontAwesome5Icon name="smile-wink" size={16} regular color='#ffff69' style={{marginBottom: 0.005 * screen.height}}></FontAwesome5Icon>
                                <Text style={{color: "white", fontSize: 14}}>Feeling/Activity</Text>
                            </TouchableOpacity>
                            <View style={{borderRightColor: "#c4c4c4", borderRightWidth: 1}} />
                            <TouchableOpacity style={{justifyContent: "center", alignItems: "center"}}>
                                <FontAwesome5Icon name="tag" size={16} solid color='#ff5c5c' style={{marginBottom: 0.005 * screen.height}}></FontAwesome5Icon> 
                                <Text style={{color: "white", fontSize: 14}}>Tag</Text>
                            </TouchableOpacity>
                        </View>
                    </View>} 
                    <View style={styles.containerPost}> 
                        {data != [] ? data.map((person) => {
                            return (
                                <TrendingItems data={person} key={person.album_id} score={score} setScore={setScore} />
                            )
                        }): <Text>Loading ...</Text>}
                        {data.length == 0 && <View style={{backgroundColor: '#252A38', width: "100%", height: 0.4 * screen.height}}/>}
                        {!end && <TouchableOpacity style={styles.buttonLoad} onPress={() => setLoadingPosts(true)}>
                            <Text style={styles.button}> Load more </Text>
                        </TouchableOpacity>}
                    </View> 
                </View>
            </ScrollView>
            <Modal 
                animationType="fade"
                transparent={true}
                visible={showFeelingModal}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    
                }}
            >
                <TouchableOpacity 
                    style={styles.centeredView} 
                    activeOpacity={1} 
                    onPressOut={() => {setFeelingModal(false); setBlurIntensity(1)}}
                >
                    <ScrollView showsVerticalScrollIndicator={false} 
                                bounces={true} 
                                style={{width: 0.9 * screen.width, 
                                        marginBottom: 0.2 * screen.height, 
                                        marginTop: 0.2 * screen.height, 
                                        height: 0.6 * screen.height, 
                                        flexDirection: "column", 
                                        backgroundColor: "#3D3D4E", 
                                        borderBottomLeftRadius: 0.02 * screen.width, 
                                        borderBottomRightRadius: 0.02 * screen.width}}
                                contentContainerStyle={{ flexGrow: 1, height: "auto"}}
                    >
                        <View key="Feeling">
                            <ListItem.Accordion style={{height: feelingExpanded ? "auto": 0.1 * screen.height}}
                                content={
                                    <>
                                        <Avatar title="Feeling" source={feeling} />
                                        <ListItem.Content>                    
                                            <ListItem.Title>  Feeling </ListItem.Title>
                                        </ListItem.Content>
                                    </>
                                }
                                isExpanded={feelingExpanded}
                                onPress={() => {
                                    setFeelingExpanded(!feelingExpanded);
                                }}
                                >
                                {listFeeling.length > 0 && listFeeling.map((l, i) => (
                                    <View key={l.id}>
                                        <ListItem key={i} onPress={() => {setPostFeeling(l); setFeelingModal(false); setBlurIntensity(1)}} bottomDivider>
                                        <Avatar title={l.title} source={{ uri: global.image_host_url + l.url }} />
                                        <ListItem.Content>
                                            <ListItem.Title>{l.title}</ListItem.Title>
                                        </ListItem.Content>
                                        </ListItem>
                                    </View>
                                ))}
                            </ListItem.Accordion>
                        </View>
                        <View key="Traveling">
                            <ListItem.Accordion style={{height: travelingExpanded ? "auto": 0.1 * screen.height}}
                                content={
                                    <>
                                        <Avatar title="Traveling to" source={traveling} />
                                        <ListItem.Content>                    
                                            <ListItem.Title>  Traveling to</ListItem.Title>
                                        </ListItem.Content>
                                    </>
                                }
                                isExpanded={travelingExpanded}
                                onPress={() => {
                                    setTravelingExpanded(!travelingExpanded);
                                }}
                                >
                                {listTraveling.length > 0 && listTraveling.map((l, i) => (
                                    <View>
                                        <ListItem key={i} onPress={() => {setPostFeeling(l); ; setFeelingModal(false); setBlurIntensity(1)}} bottomDivider>
                                        <Avatar title={l.title} source={{ uri: global.image_host_url + l.url }} />
                                        <ListItem.Content>
                                            <ListItem.Title>{l.title}</ListItem.Title>
                                        </ListItem.Content>
                                        </ListItem>
                                    </View>
                                ))}
                            </ListItem.Accordion>
                        </View>
                        <View key="Eating">
                            <ListItem.Accordion style={{height: eatingExpanded ? "auto": 0.1 * screen.height}}
                                content={
                                    <>
                                        <Avatar title="Eating" source={eating} />
                                        <ListItem.Content>                    
                                            <ListItem.Title>  Eating</ListItem.Title>
                                        </ListItem.Content>
                                    </>
                                }
                                isExpanded={eatingExpanded}
                                onPress={() => {
                                    setEatingExpanded(!eatingExpanded);
                                }}
                            >
                            </ListItem.Accordion>
                        </View>
                        <View key="Drinking">
                            <ListItem.Accordion style={{height: drinkingExpanded ? "auto": 0.1 * screen.height}}
                                content={
                                    <>
                                        <Avatar title="Drinking" source={drinking} />
                                        <ListItem.Content>                    
                                            <ListItem.Title>  Drinking</ListItem.Title>
                                        </ListItem.Content>
                                    </>
                                }
                                isExpanded={drinkingExpanded}
                                onPress={() => {
                                    setDrinkingExpanded(!drinkingExpanded);
                                }}
                            >
                            </ListItem.Accordion>
                        </View>
                        <View key="Looking">
                            <ListItem.Accordion style={{height: lookingExpanded ? "auto": 0.1 * screen.height}}
                                content={
                                    <>
                                        <Avatar title="Looking for" source={looking} />
                                        <ListItem.Content>                    
                                            <ListItem.Title>  Looking for</ListItem.Title>
                                        </ListItem.Content>
                                    </>
                                }
                                isExpanded={lookingExpanded}
                                onPress={() => {
                                    setLookingExpanded(!lookingExpanded);
                                }}
                            >
                            </ListItem.Accordion>
                        </View>
                        <View key="Celebrating">
                            <ListItem.Accordion style={{height: celebratingExpanded ? "auto": 0.1 * screen.height}}
                                content={
                                    <>
                                        <Avatar title="Celebrating" source={celebrating} />
                                        <ListItem.Content>                    
                                            <ListItem.Title>  Celebrating</ListItem.Title>
                                        </ListItem.Content>
                                    </>
                                }
                                isExpanded={celebratingExpanded}
                                onPress={() => {
                                    setCelebratingExpanded(!celebratingExpanded);
                                }}
                            >
                            </ListItem.Accordion>
                        </View>
                        <View key="Meeting">
                            <ListItem.Accordion style={{height: meetingExpanded ? "auto": 0.1 * screen.height}}
                                content={
                                    <>
                                        <Avatar title="Meeting" source={meeting} />
                                        <ListItem.Content>                    
                                            <ListItem.Title>  Meeting</ListItem.Title>
                                        </ListItem.Content>
                                    </>
                                }
                                isExpanded={meetingExpanded}
                                onPress={() => {
                                    setMeetingExpanded(!meetingExpanded);
                                }}
                            >
                            </ListItem.Accordion>
                        </View>
                        <View key="Getting">
                            <ListItem.Accordion style={{height: gettingExpanded ? "auto": 0.1 * screen.height}}
                                content={
                                    <>
                                        <Avatar title="Getting" source={getting} />
                                        <ListItem.Content>                    
                                            <ListItem.Title>  Getting</ListItem.Title>
                                        </ListItem.Content>
                                    </>
                                }
                                isExpanded={gettingExpanded}
                                onPress={() => {
                                    setGettingExpanded(!gettingExpanded);
                                }}
                            >
                            </ListItem.Accordion>
                        </View>
                        <View key="Making">
                            <ListItem.Accordion style={{height: makingExpanded ? "auto": 0.1 * screen.height}}
                                content={
                                    <>
                                        <Avatar title="Making" source={making} />
                                        <ListItem.Content>                    
                                            <ListItem.Title>  Making</ListItem.Title>
                                        </ListItem.Content>
                                    </>
                                }
                                isExpanded={makingExpanded}
                                onPress={() => {
                                    setMakingExpanded(!makingExpanded);
                                }}
                            >
                            </ListItem.Accordion>
                        </View>
                        <View key="Remembering">
                            <ListItem.Accordion style={{height: rememberingExpanded ? "auto": 0.1 * screen.height}}
                                content={
                                    <>
                                        <Avatar title="Remembering" source={remembering} />
                                        <ListItem.Content>                    
                                            <ListItem.Title>  Remembering</ListItem.Title>
                                        </ListItem.Content>
                                    </>
                                }
                                isExpanded={rememberingExpanded}
                                onPress={() => {
                                    setRememberingExpanded(!rememberingExpanded);
                                }}
                            >
                            </ListItem.Accordion>
                        </View>
                    </ScrollView>
                </TouchableOpacity>
            </Modal>
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
                                <TouchableOpacity 
                                    disabled={postText == "" || postFeeling == null || location == null || postPhoto == null ? true: false} 
                                    style={{
                                        backgroundColor: postText == "" || postFeeling == null || location == null || postPhoto == null ? "#c4c4c4": "#29b6f6", 
                                        width: "125%", height: "75%", 
                                        marginRight: 0.02 * screen.width, 
                                        alignItems: "center", 
                                        justifyContent: "center",
                                        borderRadius: 0.02 * screen.width}}
                                    onPress={async () => {
                                        const formData = new FormData()
                                        formData.append("first_name", user.firstname)
                                        formData.append("last_name", user.lastname)
                                        formData.append("username", user.username)
                                        if (postPhoto != null) {
                                            formData.append("image", {
                                                uri: postPhoto,
                                                type: "image/jpg",
                                                name: user.username + "_" + moment().format("YYYYMMDDhhmmss") + ".jpg" 
                                            })
                                        }
                                        formData.append("location", location)
                                        formData.append("location_hash", locationHash)
                                        formData.append("user_id", user.id)
                                        formData.append("description", postText)
                                        formData.append("id_tag", postFeeling.id)
                                        formData.append("dream_real", dream_or_real == true? 1:0)
                                        try {
                                            const response = await fetch(global.back_end_url + "/new_album", {
                                                "method": "POST",
                                                "headers": {
                                                    "Content-Type": "multipart/form-data"
                                                },
                                                "body": formData
                                            })
                                            let json = await response.json();
                                            if (json.success) {
                                                setData([JSON.parse(JSON.stringify(json)).album[0], ...data])
                                                user.setPostTrending([])
                                                user.setPostOffset(0)
                                                user.setPostLoading(true)
                                                Alert.alert("Dream Real Post Success", "Post to Dream Real !")
                                            }
                                            else {
                                                Alert.alert("Dream Real Post Failed")
                                            }
                                        }
                                        catch(err) {
                                            Alert.alert("Dream Real Post Error", "Error occured when trying to post: " + err.message);
                                        }
                                        setBlurIntensity(1);
                                        setPostFeeling(null);
                                        setPostPhoto(null);
                                        setPostText("")
                                        setPostModal(false);
                                    }}>
                                    <Text style={{color: "#fff", fontSize: 18, textAlign: "center", opacity: postText == "" ? 0.5: 1}}>Post</Text>    
                                </TouchableOpacity>
                            </View>
                        </View>
                        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={"handled"} style={{width: 0.9 * screen.width, flexDirection: "column", backgroundColor: "#3D3D4E", borderBottomLeftRadius: 0.02 * screen.width, borderBottomRightRadius: 0.02 * screen.width}}>
                            <View style={{flexDirection: "row", height: 0.08 * screen.height}}>
                                <Image source={{uri: global.image_host_url + user.avatar}} style={{margin: 0.02 * screen.height, width: 40 * screen.width / figma_screen_w, height: 40 * screen.width / figma_screen_w, borderRadius: 0.1 * screen.width, margin: 0.015 * screen.width}}/>
                                <Text style={{color: "white", fontSize: 12, fontWeight: "bold", alignItems: "center", marginTop: 0.015 * screen.width + 10 * screen.width / figma_screen_w}}>{user.firstname + " " + user.lastname} </Text>
                                {postFeeling != null && 
                                    <View style={{flexDirection: "row", marginTop: 0.015 * screen.width + 10 * screen.width / figma_screen_w}}>
                                        <Text style={{color: "white", fontSize: 12, fontWeight: "normal", alignItems: "center"}}>is {postFeeling.slug} </Text>
                                        <Image source={{uri: global.image_host_url + postFeeling.url}} style={styles.emotion}></Image> 
                                        <Text style={{color: "white", fontSize: 12, fontWeight: "normal", alignItems: "center"}}> {postFeeling.title}</Text>
                                    </View>
                                }
                                {/* {postFeeling == null && 
                                    <TouchableOpacity onPress={() => setPostFeeling("grin-tongue-wink")} style={{flexDirection: "row", marginTop: 0.015 * screen.width + 10 * screen.width / figma_screen_w}}>
                                        <Text style={{color: "white", fontSize: 12, fontWeight: "normal", alignItems: "center"}}>is adding </Text>
                                        <FontAwesome5Icon name="smile-wink" size={12} regular color='#ffff69' style={{alignItems: "center"}}></FontAwesome5Icon>  
                                        <Text style={{color: "white", fontSize: 12, fontWeight: "normal", alignItems: "center"}}> a Feeling/Activity</Text>
                                    </TouchableOpacity>
                                } */}
                            </View>
                        
                            <GooglePlacesAutocomplete
                                placeholder= "Location"
                                query={{
                                    key: GOOGLE_PLACES_API_KEY,
                                    language: 'en', // language of the results
                                    types: '(cities)'
                                }}
                                value={location}
                                onPress={(data, details = null) => {
                                    setLocationHash(data.place_id)
                                    setLocation(data.description)
                                }}
                                onFail={(error) => console.error(error)}
                                styles={locationStyles}
                                textInputProps={{ placeholderTextColor: 'white' }}
                            />  

                            {postPhoto != null && 
                            <TouchableOpacity onPress={() => pickPhoto()}>
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
                                {postPhoto == null &&<TouchableOpacity style={{justifyContent: "center", alignItems: "center", flexDirection: "row"}} onPress={() => pickPhoto()}>
                                    <FontAwesome5Icon name="image" size={16} solid color='#89ff69' style={{marginBottom: 0.005 * screen.height}}></FontAwesome5Icon> 
                                    <Text style={{color: "white", fontSize: 14}}>  Photo</Text>
                                </TouchableOpacity>}
                                {postPhoto == null && <View style={{borderRightColor: "#c4c4c4", borderRightWidth: 1}} />}
                                <TouchableOpacity style={{justifyContent: "center", alignItems: "center", flexDirection: "row"}}>
                                    <FontAwesome5Icon name="tag" size={16} solid color='#ff5c5c' style={{marginBottom: 0.005 * screen.height}}></FontAwesome5Icon> 
                                    <Text style={{color: "white", fontSize: 14}}>  Tag</Text>
                                </TouchableOpacity>
                                <View style={{borderRightColor: "#c4c4c4", borderRightWidth: 1}} />
                                <TouchableOpacity style={{justifyContent: "center", alignItems: "center"}} onPress={() => {setDreamReal(!dream_or_real)}}>
                                    {dream_or_real && 
                                    <View style={{flexDirection: "row"}}>
                                        <Image source={dream} style={{width: 25 * screen.width/ figma_screen_w, height: 25 * screen.width/ figma_screen_w, borderRadius: 50}}>
                                        </Image>
                                        <Text style={{color: "white", fontSize: 14}}>  Dream</Text>
                                    </View>}
                                    {!dream_or_real && 
                                    <View style={{flexDirection: "row"}}>
                                        <Image source={real} style={{width: 25 * screen.width/ figma_screen_w, height: 25 * screen.width/ figma_screen_w, borderRadius: 50}}>
                                        </Image>
                                        <Text style={{color: "white", fontSize: 14}}>  Real</Text>
                                    </View>}
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
    },
    inputView: {
        height: 0.06 * screen.height, 
        width: 0.9 * screen.width
    },
    emotion: {
        width: 20 * screen.width / figma_screen_w,
        height: 20 * screen.width / figma_screen_w,
        borderRadius: 50,
        alignSelf: "flex-start"
    },
})
const locationStyles = StyleSheet.create({
    textInputContainer: {
        ...styles.inputView,
        marginBottom: 0.01 * screen.height
    },
    textInput: {
        backgroundColor: "#252A38",
        borderRadius: 0.02 * screen.width,
        width: 0.6 *screen.width,
        height: 0.06 *  screen.height,
        paddingLeft: 0.05 * screen.width,
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
        color: "#fff"
    }
})
export default Profile;