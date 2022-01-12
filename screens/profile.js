import React from "react";
import { StatusBar, Modal, StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, Platform, TextInput } from "react-native";
import { ScrollView } from "react-native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import * as ImagePicker from 'expo-image-picker';
import logo from '../static/img/dream-real-logo-nav.png'
import coverRaiden from '../static/img/destinations/hanoi.jpg'
import CustomBar from '../components/statusbar';
import * as SecureStore from 'expo-secure-store';
import { Svg, Ellipse, Line } from 'react-native-svg'
import { useNavigation } from '@react-navigation/native';

import avatarRaiden from '../static/img/my_ava.jpeg';
import selfie1 from "../static/img/avatar/selfie1.jpg"
import selfie2 from "../static/img/avatar/selfie2.jpg"
import selfie3 from "../static/img/avatar/selfie3.jpg"
import selfie4 from "../static/img/avatar/selfie4.jpg"
import selfie5 from "../static/img/avatar/selfie5.jpg"
import selfie6 from "../static/img/avatar/selfie6.jpg"
import selfie7 from "../static/img/avatar/selfie7.jpg"
import selfie8 from "../static/img/avatar/selfie8.jpg"
import selfie10 from "../static/img/avatar/selfie10.jpg"
import selfie11 from "../static/img/avatar/selfie11.jpg"
import selfie12 from "../static/img/avatar/selfie12.jpg"


import drink_beer from "../static/img/trending/drink_beer.jpg"
import eating_pizza from "../static/img/trending/eating_pizza.jpg"
import looking_for_job from "../static/img/trending/looking_for_job.jpg"
import skating from "../static/img/trending/skating.jpg"
import travel_to_vietnam from "../static/img/trending/travel_to_vietnam.jpg"
import travel from "../static/img/trending/travel.jpg"

import TrendingItems from "../components/Trending/trending_items";

const screen = Dimensions.get("screen");
const window = Dimensions.get("window");
const figma_screen_w = 428;
const figma_screen_h = 926;
const APPBAR_HEIGHT = 200 * screen.height / figma_screen_h;

const SLIDER_WIDTH = Dimensions.get('window').width 
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9)
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const friends = [selfie1, selfie2, selfie3, selfie4, selfie5, selfie6, selfie7];
const followers = [selfie10, selfie11, selfie8, selfie4, selfie5, selfie6, selfie7];
const following = [selfie12, selfie3, selfie8, selfie11, selfie6, selfie1, selfie7];
const avatarDefaultUri = Image.resolveAssetSource(avatarRaiden).uri

const initData = [
    {
        name: "Trang Pham",
        emotion: "is drinking beer " +  '\u{1f37b}',
        place_detail: "Lisbon, Portugal",
        number_react: 9,
        number_comment: 6,
        avatar: avatarDefaultUri,
        place: drink_beer,
        comment: [
            {
                avatar: selfie7,
                name: "Tina Zhou",
                time: "1 week ago",
                content: "Have fun !"
            },
            {
                avatar: selfie2,
                name: "Liwen Chan",
                time: "2 days ago",
                content: "Wish to join youuu !"
            },{
                avatar: selfie6,
                name: "Michele Hyatt",
                time: "1 week ago",
                content: "1 2 3 Cheers !"
            },
            {
                avatar: selfie3,
                name: "Alexandre Analy",
                time: "2 days ago",
                content: "Cool !"
            },{
                avatar: selfie4,
                name: "Alex Kurt",
                time: "1 hour ago",
                content: "Niceeeeee weekend !"
            },
            {
                avatar: selfie5,
                name: "Kelly Cat",
                time: "2 days ago",
                content: "Beautiful !"
            }
        ]
    },
    {
        name: "Trang Pham",
        emotion: "is eating pizza " + '\u{1f355}',
        place_detail: "Kualar Lumpur, Malaysia",
        number_react: 200,
        number_comment: 2,
        avatar: avatarDefaultUri,
        place: eating_pizza,
        comment: [
            {
                avatar: selfie1,
                name: "Anna Scott",
                time: "3 weeks ago",
                content: "Delicious !"
            },
            {
                avatar: selfie5,
                name: "Kelly Cat",
                time: "3 days ago",
                content: "I love it !"
            }
        ]
    },
    {
        name: "Trang Pham",
        emotion: "is skating " + '\u{1f6f9}',
        place_detail: "Nantes, France",
        number_react: "1k6",
        number_comment: 2,
        avatar: avatarDefaultUri,
        place: skating,
        comment: [
            {
                avatar: selfie2,
                name: "Liwen Chan",
                time: "1 hour ago",
                content: "Cooooooool !"
            },
            {
                avatar: selfie4,
                name: "Alex Kurt",
                time: "1 hour ago",
                content: "Nice air !"
            }
        ]
    },
    {
        name: "Trang Pham",
        emotion: "is traveling to Vietnam " + '\u{1f1fb}',
        place_detail: "Hanoi, Vietnam",
        number_react: "1k",
        number_comment: 2,
        avatar: avatarDefaultUri,
        place: travel_to_vietnam,
        comment: [
            {
                avatar: selfie2,
                name: "Liwen Chan",
                time: "1 hour ago",
                content: "So beautiful this country !"
            },
            {
                avatar: selfie4,
                name: "Alex Kurt",
                time: "1 hour ago",
                content: "I really want to travel there !"
            }
        ]
    },
    {
        name: "Trang Pham",
        emotion: "is looking for job " + '\u{1f468}',
        place_detail: "New York, USA",
        number_react: "10",
        number_comment: 2,
        avatar: avatarDefaultUri,
        place: looking_for_job,
        comment: [
            {
                avatar: selfie3,
                name: "Alexandre Analy",
                time: "1 hour ago",
                content: "You an send me your CV and cover letter to my email at aanaly@dream-real-group.co"
            },
            {
                avatar: selfie6,
                name: "Michele Hyatt",
                time: "1 hour ago",
                content: "You can reach me at PM for more details !"
            }
        ]
    },
    {
        name: "Trang Pham",
        emotion: "is traveling " + '\u{1f3d4}',
        place_detail: "Titlis, Switzerland",
        number_react: "100",
        number_comment: 2,
        avatar: avatarDefaultUri,
        place: travel,
        comment: [
            {
                avatar: selfie3,
                name: "Alexandre Analy",
                time: "1 hour ago",
                content: "Wow ! Too nice"
            },
            {
                avatar: selfie7,
                name: "Tina Zhou",
                time: "1 hour ago",
                content: "I really love this place !"
            }
        ]
    }
];

const coverDefaultUri = Image.resolveAssetSource(coverRaiden).uri

const Profile = (props) => {
    const navigation = useNavigation()
    const [avatar, setAvatar] = React.useState(avatarDefaultUri);
    const [cover, setCover] = React.useState(coverDefaultUri);
    const [data, setData] = React.useState(initData);
    const [seeFriends, setSeeFriends] = React.useState(true);
    const [seeFollowers, setSeeFollowers] = React.useState(false);
    const [seeFollowing, setSeeFollowing] = React.useState(false);
    const [textColorFriends, setTextColorFriends] = React.useState("#B456F1");
    const [textColorFollowers, setTextColorFollowers] = React.useState("white");
    const [textColorFollowing, setTextColorFollowing] = React.useState("white");
    const [postPhoto, setPostPhoto] = React.useState(null);
    const [postFeeling, setPostFeeling] = React.useState(null);
    const [postLocation, setPostLocation] = React.useState(null);
    // const [postTag, setPostTag] = React.useState(null);
    const [showPostModal, setPostModal] = React.useState(false);
    const [blurIntensity, setBlurIntensity] = React.useState(0);

    const pickAvatar = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
        });
        
        if (!result.cancelled) {
            setAvatar(result.uri);
        }
    };

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

    React.useEffect(() => {
        setData(changeValue => {
            const list = changeValue.map((d) => {
                return {...d, avatar: avatar}
            })
            return list;
        })
    }, [avatar])

    const pickCover = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
        });
        
        if (!result.cancelled) {
            setCover(result.uri);
        }
    };

    return (
        <View>
        <CustomBar backgroundColor="#3d3d4e" barStyle="light-content" />
            <ScrollView style={styles.container}>  
                <View style={styles.content}>
                    <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                        <View style={styles.backButton} >
                            <FontAwesome5Icon name="chevron-left" size={25} solid color='white'></FontAwesome5Icon>
                        </View>
                    </TouchableOpacity>
                    <Image source={logo} style={styles.logo} />
                </View>
                <TouchableOpacity onPress={pickAvatar} style={{position: "absolute", left: 0.42 * screen.width, top: 0.21 * screen.height, zIndex: 1}}>
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
                <TouchableOpacity onPress={pickCover} style={styles.cover}>
                    <Image source={{uri: cover}} style={styles.coverImage}/>
                </TouchableOpacity>
                <View style={{top: 0.06 * screen.height, zIndex: 3}}>
                    <Text adjustsFontSizeToFit style={{color: "white", textAlign: "center", textAlignVertical: "center", fontSize: 20, fontWeight: 'bold'}}>Trang Pham</Text>
                </View>
                <View style={{backgroundColor: "#252A38", marginTop: 0.1 * screen.height}}>
                    <View style={styles.row}>
                        <View style={styles.col1}>
                            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-around", marginTop: 0.015 * screen.height}}>
                                <TouchableOpacity onPress={() => navigation.navigate("Maps", {post: data})}>
                                    <View style={{width: 0.1*screen.width, height: 0.02*screen.height, backgroundColor:"#B456F1", marginLeft: 0.05 * screen.width, borderRadius: 0.01 * screen.width, alignItems: "center"}}>
                                        <FontAwesome5Icon name="map-marked-alt" size={10} solid color='white'></FontAwesome5Icon>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate("Maps", {post: data})}>
                                    <View style={{width: 0.1*screen.width, height: 0.02*screen.height, backgroundColor:"#B456F1", marginRight: 0.05 * screen.width, borderRadius: 0.01 * screen.width, alignItems: "center"}}>
                                        <FontAwesome5Icon name="bookmark" size={10} solid color='white'></FontAwesome5Icon>
                                    </View>
                                </TouchableOpacity>
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
                                >8 Friends</Text>
                                <Text style={{color: textColorFollowers}} 
                                    onPress={() => {
                                        setSeeFriends(false); 
                                        setSeeFollowing(false); 
                                        setSeeFollowers(true);
                                        setTextColorFriends("white");
                                        setTextColorFollowing("white");
                                        setTextColorFollowers("#B456F1");
                                    }}
                                >8 Followers</Text>
                                <Text style={{color: textColorFollowing}} 
                                    onPress={() => {
                                        setSeeFriends(false); 
                                        setSeeFollowing(true); 
                                        setSeeFollowers(false);
                                        setTextColorFriends("white");
                                        setTextColorFollowers("white");
                                        setTextColorFollowing("#B456F1")
                                    }}
                                >8 Following</Text>
                            </View>
                            {seeFriends && <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{marginTop: 0.01 * screen.height}}>
                                {friends.map((friend, index) => (
                                    <TouchableOpacity  key={index}>
                                        <Image source={friend} style={styles.friend}></Image>
                                    </TouchableOpacity>
                                ))}       
                            </ScrollView>
                            }
                            {seeFollowers && <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{marginTop: 0.01 * screen.height}}>
                                {followers.map((friend, index) => (
                                    <TouchableOpacity  key={index}>
                                        <Image source={friend} style={styles.friend}></Image>
                                    </TouchableOpacity>
                                ))}       
                            </ScrollView>
                            }
                            {seeFollowing && <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{marginTop: 0.01 * screen.height}}>
                                {following.map((friend, index) => (
                                    <TouchableOpacity  key={index}>
                                        <Image source={friend} style={styles.friend}></Image>
                                    </TouchableOpacity>
                                ))}       
                            </ScrollView>
                            }
                        </View>
                    </View>
                    <View style={{flexDirection: 'column', backgroundColor: "#3D3D4E", marginTop: 0.02 * screen.height, height: 0.175 * screen.height, width: 0.9 * screen.width, borderRadius: 0.02 * screen.width, alignSelf: "center"}}>
                        <TouchableOpacity style={{flexDirection: "row"}} onPress={() => setPostModal(true)}>
                            <Image source={{uri: avatar}} style={{width: 50 * screen.width / figma_screen_w, height: 50 * screen.width / figma_screen_w, borderRadius: 0.1 * screen.width, margin: 0.015 * screen.height}}/>
                            <TextInput 
                                placeholder="Share your experiences..." 
                                placeholderTextColor="#c4c4c4" 
                                style={{width: 0.9 * screen.width - (50 * screen.width / figma_screen_w), 
                                height: 50 * screen.width / figma_screen_w}}
                            >
                            </TextInput>
                        </TouchableOpacity>
                        <View
                            style={{
                                borderBottomColor: 'white',
                                borderBottomWidth: 1,
                            }}
                        />
                        <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 0.01 * screen.height, marginLeft: 0.02 * screen.height, marginRight: 0.02 * screen.height}}>
                            <TouchableOpacity style={{justifyContent: "center", alignItems: "center"}} onPress={pickPhoto}>
                                <FontAwesome5Icon name="image" size={16} solid color='#89ff69' style={{marginBottom: 0.005 * screen.height}}></FontAwesome5Icon> 
                                <Text style={{color: "white", fontSize: 14}}>Photo</Text>
                            </TouchableOpacity>
                            <View style={{borderRightColor: "#c4c4c4", borderRightWidth: 0.5}} />
                            <TouchableOpacity style={{justifyContent: "center", alignItems: "center"}} onPress={() => setPostFeeling("grin-tongue-wink")}>
                                <FontAwesome5Icon name="smile-wink" size={16} regular color='#ffff69' style={{marginBottom: 0.005 * screen.height}}></FontAwesome5Icon> 
                                <Text style={{color: "white", fontSize: 14}}>Feeling/Activity</Text>
                            </TouchableOpacity>
                            <View style={{borderRightColor: "#c4c4c4", borderRightWidth: 0.5}} />
                            <TouchableOpacity style={{justifyContent: "center", alignItems: "center"}} onPress={() => setPostLocation("Paris, France")}>
                                <FontAwesome5Icon name="map-marker-alt" size={16} solid color='#80b0ff' style={{marginBottom: 0.005 * screen.height}}></FontAwesome5Icon> 
                                <Text style={{color: "white", fontSize: 14}}>Location</Text>
                            </TouchableOpacity>
                            <View style={{borderRightColor: "#c4c4c4", borderRightWidth: 0.5}} />
                            <TouchableOpacity style={{justifyContent: "center", alignItems: "center"}}>
                                <FontAwesome5Icon name="tag" size={16} solid color='#ff5c5c' style={{marginBottom: 0.005 * screen.height}}></FontAwesome5Icon> 
                                <Text style={{color: "white", fontSize: 14}}>Tag</Text>
                            </TouchableOpacity>
                        </View>
                    </View> 
                    <View style={styles.containerPost}> 
                        {data.map((person, index) => {
                            return (
                                <TrendingItems data={person} key={index} />
                            )
                        })}
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
                onPressOut={() => {setPostModal(false)}}
            >
                <View style={{width: 0.9 * screen.width, height: 0.438 * screen.height, flexDirection: "column", backgroundColor: "#3D3D4E", borderRadius: 0.02 * screen.width}}>
                    <View style={{flexDirection: "row", height: 0.08 * screen.height}}>
                        <Image source={{uri: avatar}} style={{margin: 0.02 * screen.height, width: 40 * screen.width / figma_screen_w, height: 40 * screen.width / figma_screen_w, borderRadius: 0.1 * screen.width, 
                            margin: 0.015 * screen.width}}/>
                        <Text style={{color: "white", fontSize: 12, fontWeight: "bold", textAlignVertical: "center", marginTop: 0.015 * screen.width + 10 * screen.width / figma_screen_w}}>Trang Pham </Text>
                        {postFeeling != null && 
                            <View style={{flexDirection: "row", marginTop: 0.015 * screen.width + 10 * screen.width / figma_screen_w}}>
                                <Text style={{color: "white", fontSize: 12, fontWeight: "normal", textAlignVertical: "center"}}>is feeling </Text>
                                <FontAwesome5Icon name={postFeeling} size={12} solid color='#ffff69'></FontAwesome5Icon>  
                                <Text style={{color: "white", fontSize: 12, fontWeight: "normal", textAlignVertical: "center"}}> funny</Text>
                            </View>
                        }
                        {postFeeling == null && 
                            <TouchableOpacity onPress={() => setPostFeeling("grin-tongue-wink")} style={{flexDirection: "row", marginTop: 0.015 * screen.width + 10 * screen.width / figma_screen_w}}>
                                <Text style={{color: "white", fontSize: 12, fontWeight: "normal", textAlignVertical: "center"}}>is adding </Text>
                                <FontAwesome5Icon name="smile-wink" size={12} regular color='#ffff69'></FontAwesome5Icon>  
                                <Text style={{color: "white", fontSize: 12, fontWeight: "normal", textAlignVertical: "center"}}> a Feeling/Activity</Text>
                            </TouchableOpacity>
                        }
                    </View>
                    <TextInput 
                        multiline={true}
                        placeholder="What's happening?" 
                        placeholderTextColor="#c4c4c4" 
                        style={{width: 0.86 * screen.width, 
                        padding: 0.02 * screen.width,
                        textAlignVertical: "top",
                        height: 0.25 * screen.height,
                        marginLeft: 0.02 * screen.width,
                        backgroundColor: "#363847",
                        borderRadius: 0.02 * screen.width,
                        color: "white"}}
                        onPress={() => setPostModal(true)}
                    />


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