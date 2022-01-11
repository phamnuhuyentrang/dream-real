import React, { useState } from "react";
import { StatusBar, Modal, StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, Platform } from "react-native";
import { ScrollView } from "react-native";
import background from "../static/img/signup/signup_background.jpg"
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import * as ImagePicker from 'expo-image-picker';
import logo from '../static/img/dream-real-logo-nav.png'
import coverRaiden from '../static/img/destinations/hanoi.jpg'
import CustomBar from '../components/statusbar';
import * as SecureStore from 'expo-secure-store';
import { Svg, Ellipse } from 'react-native-svg'
import { useNavigation } from '@react-navigation/native';
import avatarRaiden from '../static/img/raiden_shogun.png';
 
import selfie1 from "../static/img/avatar/selfie1.jpg"
import selfie2 from "../static/img/avatar/selfie2.jpg"
import selfie3 from "../static/img/avatar/selfie3.jpg"
import selfie4 from "../static/img/avatar/selfie4.jpg"
import selfie5 from "../static/img/avatar/selfie5.jpg"
import selfie6 from "../static/img/avatar/selfie6.jpg"
import selfie7 from "../static/img/avatar/selfie7.jpg"

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
const avatarDefaultUri = Image.resolveAssetSource(avatarRaiden).uri

const initData = [
    {
        name: "Raiden Shogun",
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
        name: "Raiden Shogun",
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
        name: "Raiden Shogun",
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
        name: "Raiden Shogun",
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
        name: "Raiden Shogun",
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
        name: "Raiden Shogun",
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
            setData(changeValue => {
                const list = changeValue.map((d) => {
                    return {...d, avatar: avatar}
                })
                return list;
            })
        }
    };

    React.useEffect(() => {
        setAvatar(avatar)
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
            <TouchableOpacity onPress={pickAvatar} style={{position: "absolute", left: 0.425 * screen.width, top: 0.375 * APPBAR_HEIGHT, zIndex: 0}}>
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
            <View style={{backgroundColor: "#252A38"}}>
                <View style={styles.row}>
                    <View style={styles.col1}>
                        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-around", marginTop: 0.015 * screen.height}}>
                            <TouchableOpacity onPress={() => navigation.navigate("Maps", {post: data})}>
                                <View style={{width: 0.1*screen.width, height: 0.02*screen.height, backgroundColor:"#B456F1", marginLeft: 0.05 * screen.width, borderRadius: 0.01 * screen.width}}>
                                    <FontAwesome5Icon name="map-marked-alt" size={10} solid color='white'></FontAwesome5Icon>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate("Maps", {post: data})}>
                                <View style={{width: 0.1*screen.width, height: 0.02*screen.height, backgroundColor:"#B456F1", marginRight: 0.05 * screen.width, borderRadius: 0.01 * screen.width}}>
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
                        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-around", marginTop: 0.015 * screen.height}}>
                            <Text style={{color: "#fff"}}>8 Friends</Text>
                        </View>
                        <ScrollView horizontal={true} style={{marginTop: 0.01 * screen.height}}>
                            {friends.map((friend, index) => (
                                <TouchableOpacity  key={index}>
                                    <Image source={friend} style={styles.friend}></Image>
                                </TouchableOpacity>
                            ))}       
                        </ScrollView>
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
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#3D3D4E',
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
        width: 50 * screen.width / figma_screen_w,
        height: 50 * screen.width / figma_screen_w,
        borderRadius: 0.1 * screen.width,
        alignItems: "center",
        justifyContent: "center",
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
        flexDirection: "column",
        width: 0.5 * screen.width,
        height: 0.13 * screen.height,
        backgroundColor: '#3D3D4E',
        marginRight: 0.05 * screen.width,
        borderRadius: 0.02 * screen.width,
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