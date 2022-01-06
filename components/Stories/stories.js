import React, {PureComponent} from 'react';
import { View, Image, StyleSheet, Dimensions, Animated, Pressable, TouchableOpacity } from 'react-native';
import CircleList from "./circle_list";
import selfie1 from "../../static/img/avatar/selfie1.jpg"
import selfie15 from "../../static/img/avatar/selfie15.jpg"
import selfie14 from "../../static/img/avatar/selfie14.jpg"
import selfie13 from "../../static/img/avatar/selfie13.jpg"
import selfie12 from "../../static/img/avatar/selfie12.jpg"
import selfie11 from "../../static/img/avatar/selfie11.jpg"
import selfie10 from "../../static/img/avatar/selfie10.jpg"

import drink_beer from "../../static/img/trending/drink_beer.jpg"
import eating_pizza from "../../static/img/trending/eating_pizza.jpg"
import looking_for_job from "../../static/img/trending/looking_for_job.jpg"
import skating from "../../static/img/trending/skating.jpg"
import travel_to_vietnam from "../../static/img/trending/travel_to_vietnam.jpg"
import travel from "../../static/img/trending/travel.jpg"
import listen_music from "../../static/img/trending/listen_music.jpeg"
import play_video_game from "../../static/img/trending/play_video_game.jpeg"
import karate from "../../static/img/trending/karate.jpeg"

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

const ITEM_SIZE = wp(50);
const SPACE_ITEM_SIZE = (hp(38) - ITEM_SIZE) / 2;

const screen = Dimensions.get("screen");
const window = Dimensions.get("window");
const figma_screen_w = 428;
const figma_screen_h = 926;

const APPBAR_HEIGHT = 200 * screen.height / figma_screen_h;

const keyGenerator = () => '_' + Math.random().toString(36).substr(2, 9)

const data = [
    {
        id: keyGenerator(),
        name: "Anna Scott",
        avatar: selfie1,
        post : [
            {
                emotion: "is traveling " + '\u{1f3d4}',
                place_detail: "Titlis, Switzerland",
                number_react: 9,
                number_comment: 8,
                place: travel
            },
            {
                emotion: "is traveling to Vietnam " + '\u{1f1fb}',
                place_detail: "Hoi An, Vietnam",
                number_react: 19,
                number_comment: 80,
                place: travel_to_vietnam
            },
            {
                emotion: "is skating " + '\u{1f6f9}',
                place_detail: "Nantes, France",
                number_react: 9,
                number_comment: 8,
                place: skating
            },
        ]
    },
    {
        id: keyGenerator(),
        name: "Allison Bernard",
        avatar: selfie10,
        post: [
            {
                emotion: "is listening to music "  + '\u{1f3a7}',
                place_detail: "Berlin, Germany",
                number_react: 200,
                number_comment: 171,
                place: listen_music
            }
        ]
    },
    {
        id: keyGenerator(),
        name: "Jenny Pham",
        avatar: selfie11,
        post: [
            {
                emotion: "is drinking beer " +  '\u{1f37b}',
                place_detail: "Nha Trang, Vietnam",
                number_react: "1k6",
                number_comment: 501,
                place: drink_beer
            }
        ]
    },
    {
        id: keyGenerator(),
        name: "Victoria Rodriguez",
        avatar: selfie12,
        post: [
            {
                emotion: "is combatting LoL " + '\u{1f3ae}',
                place_detail: "Ottawa, Canada",
                number_react: "1k",
                number_comment: 500,
                place: play_video_game
            }
        ]
    },
    {
        id: keyGenerator(),
        name: "Bella Tiptons",
        avatar: selfie13,
        post: [
            {
                emotion: "is eating pizza " + '\u{1f355}',
                place_detail: "California, USA",
                number_react: 100,
                number_comment: 50,
                place: eating_pizza
            }
        ]
    },
    {
        id: keyGenerator(),
        name: "Jean Hathaway",
        avatar: selfie14,
        post: [
            {
                emotion: "is looking for job " + '\u{1f468}',
                place_detail: "Oslo, Norway",
                number_react: "15",
                number_comment: 5,
                place: looking_for_job
            }
        ]
    },
    {
        id: keyGenerator(),
        name: "Cindy Hilton",
        avatar: selfie15,
        post: [
            {
                emotion: "is praticing Karaté " + '\u{1f94b}',
                place_detail: "Kyoto, Japan",
                number_react: "1k6",
                number_comment: 501,
                place: karate
            }
        ]
    }
];

const Stories = () => {
    const navigation = useNavigation();
    const ref = React.useState();
    const showPost = (item) => {
        navigation.navigate('StoryContent', {post: item.post, name: item.name, avatar: item.avatar})
    }
    const keyExtractor = (item, index) => index;
    const renderItem = ({ item }) => <TouchableOpacity onPress={() => showPost(item)}><Image style={styles.avatar} source={item.avatar} /></TouchableOpacity>
    const displayData = data;
    if (displayData.length < 16) {
        for (var i = 0; i < 16 - displayData.length; i++) {
            displayData.push(
                displayData[i % displayData.length]
            )
        }
    }
    return (
        <CircleList 
            elementCount={16}
            data={displayData}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
        />        
    )
}

const styles = StyleSheet.create({
    avatar: {
        width: 50 * screen.width / figma_screen_w,
        height: 50 * screen.width / figma_screen_w,
        borderRadius: 70    
    },
    container: {
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'stretch',
        overflow: 'hidden',
    },
});

export default Stories;
