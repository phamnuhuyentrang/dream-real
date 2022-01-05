import React, {PureComponent} from 'react';
import { View, Image, StyleSheet, Dimensions, Animated, Pressable, TouchableOpacity } from 'react-native';
import CircleList from "./circle_list";
import sara from "../../static/img/trending/sara.png";
import kazuha from "../../static/img/trending/kazuha.png";
import itto from "../../static/img/trending/itto.png";
import raiden from "../../static/img/raiden_shogun.png"

import liyue from "../../static/img/trending/liyue.png";
import apple from "../../static/img/trending/golden_apple_island.png";
import inazuma from "../../static/img/trending/inazuma.png";

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
        name: "Sara Kujou",
        avatar: sara,
        post : [
            {
                emotion: "is traveling to Liyue",
                place_detail: "Mountain, Liyue",
                number_react: 9,
                number_comment: 8,
                place: liyue
            },
            {
                emotion: "is traveling to Inazuma",
                place_detail: "Island, Inazuma",
                number_react: 19,
                number_comment: 80,
                place: inazuma
            },
            {
                emotion: "is traveling to Liyue",
                place_detail: "Mountain, Liyue",
                number_react: 9,
                number_comment: 8,
                place: liyue
            },
        ]
    },
    {
        id: keyGenerator(),
        name: "Kaedehara Kazuha",
        avatar: kazuha,
        post: [
            {
                emotion: "is mining at Golden Apple Island",
                place_detail: "Island, Monstadt",
                number_react: 200,
                number_comment: 171,
                place: apple
            }
        ]
    },
    {
        id: keyGenerator(),
        name: "Arataki Itto",
        avatar: itto,
        post: [
            {
                emotion: "is combatting at Inazuma",
                place_detail: "Tower, Inazuma",
                number_react: "1k6",
                number_comment: 501,
                place: inazuma
            }
        ]
    },
    {
        id: keyGenerator(),
        name: "Ayaka",
        avatar: itto,
        post: [
            {
                emotion: "is combatting at Inazuma",
                place_detail: "Tower, Inazuma",
                number_react: "1k6",
                number_comment: 501,
                place: inazuma
            }
        ]
    },
    {
        id: keyGenerator(),
        name: "Venti",
        avatar: itto,
        post: [
            {
                emotion: "is combatting at Inazuma",
                place_detail: "Tower, Inazuma",
                number_react: "1k6",
                number_comment: 501,
                place: inazuma
            }
        ]
    },
    {
        id: keyGenerator(),
        name: "Jean",
        avatar: itto,
        post: [
            {
                emotion: "is combatting at Inazuma",
                place_detail: "Tower, Inazuma",
                number_react: "1k6",
                number_comment: 501,
                place: inazuma
            }
        ]
    },
    {
        id: keyGenerator(),
        name: "Yoimiya",
        avatar: itto,
        post: [
            {
                emotion: "is combatting at Inazuma",
                place_detail: "Tower, Inazuma",
                number_react: "1k6",
                number_comment: 501,
                place: inazuma
            }
        ]
    }
];

const Stories = () => {
    const navigation = useNavigation();
    const ref = React.useState();
    const showPost = (item) => {
        // console.log(" Clicked item: " + item.name)
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