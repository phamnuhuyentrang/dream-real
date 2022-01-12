import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions, Button, TouchableOpacity, TextInput, TouchableHighlight } from 'react-native';
import avatar from '../static/img/my_ava.jpeg';
import logo from '../static/img/dream-real-logo-nav.png'
import { Svg, Ellipse } from 'react-native-svg'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import Stories from './Stories/stories'
import GestureRecognizer from 'react-native-swipe-gestures';
import { useNavigation } from '@react-navigation/native';
import LoginPage from './login_page';

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

const data = [
    {
        name: "Anna Scott",
        emotion: "is drinking beer " +  '\u{1f37b}',
        place_detail: "Lisbon, Portugal",
        number_react: 9,
        number_comment: 6,
        avatar: Image.resolveAssetSource(selfie1).uri,
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
        name: "Liwen Chan",
        emotion: "is eating pizza " + '\u{1f355}',
        place_detail: "Kualar Lumpur, Malaysia",
        number_react: 200,
        number_comment: 2,
        avatar: Image.resolveAssetSource(selfie2).uri,
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
        name: "Kelly Cat",
        emotion: "is skating " + '\u{1f6f9}',
        place_detail: "Nantes, France",
        number_react: "1k6",
        number_comment: 2,
        avatar: Image.resolveAssetSource(selfie5).uri,
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
        name: "Tina Zhou",
        emotion: "is traveling to Vietnam " + '\u{1f1fb}',
        place_detail: "Hanoi, Vietnam",
        number_react: "1k",
        number_comment: 2,
        avatar: Image.resolveAssetSource(selfie6).uri,
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
        name: "Alex Kurt",
        emotion: "is looking for job " + '\u{1f468}',
        place_detail: "New York, USA",
        number_react: "10",
        number_comment: 2,
        avatar: Image.resolveAssetSource(selfie4).uri,
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
        name: "Michele Hyatt",
        emotion: "is traveling " + '\u{1f3d4}',
        place_detail: "Titlis, Switzerland",
        number_react: "100",
        number_comment: 2,
        avatar: Image.resolveAssetSource(selfie7).uri,
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

const screen = Dimensions.get("screen");
const window = Dimensions.get("window")
const figma_screen_w = 428;
const figma_screen_h = 926;

const APPBAR_HEIGHT = 200 * screen.height / figma_screen_h;
const Header = () => {
    const navigation = useNavigation()
    const [showLogo, toogleShowLogo] = React.useState(true);
    const [value, onChangeText] = React.useState('');

    const [login, setLogin] = React.useState(false);
    const [loginned, setLoginned] = React.useState(false);

    const startSearch = () => toogleShowLogo(displayLogo => !displayLogo);
    const onSwipeDown = (gestureState) => {
        navigation.navigate("Maps", {post: data});
    }
    const config = {
        velocityThreshold: 0,
        directionalOffsetThreshold: 90
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {loginned ? <TouchableOpacity onPress={() => navigation.navigate("Profile")}><Image source={avatar} style={styles.avatar}></Image></TouchableOpacity> :
                <TouchableOpacity  onPress={() => setLogin(!login)}><View style={styles.avatar} ><FontAwesome5Icon name="user-circle" size={25} solid color='white'></FontAwesome5Icon></View></TouchableOpacity>}
                
                {showLogo? <Image source={logo} style={styles.logo} />: <TextInput style={styles.search_textbox} onChangeText={text => onChangeText(text)}
    value={value} maxLength={40} placeholder='Search' blurOnSubmit onSubmitEditing={(event) => alert(event.nativeEvent.text)}/> } 
                <TouchableOpacity style={styles.button} onPress={startSearch}>
                    <FontAwesome5Icon color='white' name="search" size={20}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <FontAwesome5Icon color='white' name="bell" solid size={20}/>
                </TouchableOpacity>
            </View>
            <Stories />
            <Svg height={APPBAR_HEIGHT} width={screen.width} overflow="hidden" style={styles.svg2}>
                <Ellipse
                    cx={screen.width / 2}
                    cy={0}
                    rx={`${0.9 * screen.width}`}
                    ry={`${APPBAR_HEIGHT}`}
                    fill="#2E2F41"
                    stroke="#2E2F41"
                    strokeWidth="2"
                />
            </Svg>
            <Svg height={APPBAR_HEIGHT * 0.7} width={screen.width} overflow="hidden" style={styles.line1}>
                <Ellipse
                    cx={screen.width / 2}
                    cy={0}
                    rx={`${0.7 * screen.width}`}
                    ry={`${0.65 * APPBAR_HEIGHT}`}
                    fill="transparent"
                    stroke="#262A3B"
                    strokeWidth="2"
                />
            </Svg>
            <Svg height={APPBAR_HEIGHT * 0.8} width={screen.width} overflow="hidden" style={styles.line2}>
                <Ellipse
                    cx={screen.width / 2}
                    cy={0}
                    rx={`${0.8 * screen.width}`}
                    ry={`${0.77 * APPBAR_HEIGHT}`}
                    fill="transparent"
                    stroke="#262A3B"
                    strokeWidth="2"
                />
            </Svg>
            <Svg height={APPBAR_HEIGHT * 0.9} width={screen.width} overflow="hidden" style={styles.line3}>
                <Ellipse
                    cx={screen.width / 2}
                    cy={0}
                    rx={`${0.9 * screen.width}`}
                    ry={`${0.89 * APPBAR_HEIGHT}`}
                    fill="transparent"
                    stroke="#262A3B"
                    strokeWidth="2"
                />
            </Svg>
            <GestureRecognizer 
                onSwipeDown={(state) => onSwipeDown(state)}
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
            <FontAwesome5Icon color='white' name="arrow-circle-down" solid size={18} style={{position: "absolute", left: 0.5 * screen.width, top: 0.45 * APPBAR_HEIGHT}} />
            <FontAwesome5Icon color='white' name="star" solid size={10} style={{position: "absolute", left: 0.1 * screen.width,
                top: 0.5 * APPBAR_HEIGHT}}/>
            <FontAwesome5Icon color='white' name="star" solid size={10} style={{position: "absolute", left: 0.3 * screen.width,
                top: 0.92 * APPBAR_HEIGHT}}/>
            <FontAwesome5Icon color='white' name="star" solid size={10} style={{position: "absolute", left: 0.9 * screen.width,
                top: 0.63 * APPBAR_HEIGHT}}/>
            <FontAwesome5Icon color='white' name="star" solid size={10} style={{position: "absolute", left: 0.6 * screen.width,
                top: 0.85 * APPBAR_HEIGHT}}/>
            <FontAwesome5Icon color='white' name="star" solid size={10} style={{position: "absolute", left: 0.6 * screen.width,
                top: 0.85 * APPBAR_HEIGHT}}/>
            <FontAwesome5Icon color='white' name="star" solid size={10} style={{position: "absolute", left: 0.7 * screen.width,
                top: 0.45 * APPBAR_HEIGHT}}/>
            <FontAwesome5Icon color='white' name="star" solid size={10} style={{position: "absolute", left: 0.25 * screen.width,
                top: 0.45 * APPBAR_HEIGHT}}/>
            <FontAwesome5Icon color='white' name="star" solid size={10} style={{position: "absolute", left: 0.4 * screen.width,
                top: 0.72 * APPBAR_HEIGHT}}/>
            <FontAwesome5Icon color='white' name="star" solid size={10} style={{position: "absolute", left: 0.97 * screen.width,
                top: 0.45 * APPBAR_HEIGHT}}/>
            <FontAwesome5Icon color='white' name="star" solid size={10} style={{position: "absolute", left: 0.05 * screen.width,
                top: 0.85 * APPBAR_HEIGHT}}/>
            <FontAwesome5Icon color='white' name="star" solid size={10} style={{position: "absolute", left: 0.8 * screen.width,
                top: 0.9 * APPBAR_HEIGHT}}/>
            <LoginPage login={login} setLogin={setLogin} loginned={loginned} setLoginned={setLoginned}></LoginPage>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: screen.width,
        height: APPBAR_HEIGHT,
        backgroundColor: "#252a38",
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
        marginLeft: 0.02 * screen.width,
        marginTop: 0.02 * screen.height,
        width: 35 * screen.width / figma_screen_w,
        height: 35 * screen.width / figma_screen_w,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center"
    },

    logo: {
        width: 136 * screen.width / figma_screen_w,
        height: 36 * screen.height / figma_screen_h,
        marginTop: 15,
        marginLeft: "auto", 
        marginRight: "auto"
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
    svg2: {
        position: "absolute",
        zIndex: -4,
    },
    line1: {
        position: "absolute",
        zIndex: -1,
    },
    line2: {
        position: "absolute",
        zIndex: -2,
    },
    line3: {
        position: "absolute",
        zIndex: -3,
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
    star: {
    }
})

export default Header;