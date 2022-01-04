import React, { useRef } from 'react';
import { View, StyleSheet, Dimensions, Text, ScrollView } from 'react-native';
import sara from "../../static/img/trending/sara.png";
import kazuha from "../../static/img/trending/kazuha.png";
import itto from "../../static/img/trending/itto.png";

import liyue from "../../static/img/trending/liyue.png";
import apple from "../../static/img/trending/golden_apple_island.png";
import inazuma from "../../static/img/trending/inazuma.png";

import TrendingItems from './trending_items';
const screen = Dimensions.get("screen");
const window = Dimensions.get("window");
const figma_screen_w = 428;
const figma_screen_h = 926;


const data = [
    {
        name: "Sara Kujou",
        emotion: "is traveling to Liyue",
        place_detail: "Mountain, Liyue",
        number_react: 9,
        number_comment: 8,
        avatar: sara,
        place: liyue,
        comments: [
            {
                name: "Kaedehara Kazuha",
                avatar: kazuha,
                text: "Nice Place"
            },
            {
                name: "Sara Kujou",
                avatar: sara,
                text: "Thanks"
            },
            {
                name: "Arataki Itto",
                avatar: itto,
                text: "Have a nice trip"
            }
        ]
    },
    {
        name: "Kaedehara Kazuha",
        emotion: "is mining at Golden Apple Island",
        place_detail: "Island, Monstadt",
        number_react: 200,
        number_comment: 171,
        avatar: kazuha,
        place: apple,
        comments: [
            {
                name: "Sara Kujou",
                avatar: sara,
                text: "What do you mine?"
            },
            {
                name: "Kaedehara Kazuha",
                avatar: kazuha,
                text: "Mora and primogems"
            },
            {
                name: "Kaedehara Kazuha",
                avatar: kazuha,
                text: "Do you when some?"
            }
        ]
    },
    {
        name: "Arataki Itto",
        emotion: "is combatting at Inazuma",
        place_detail: "Tower, Inazuma",
        number_react: "1k6",
        number_comment: 501,
        avatar: itto,
        place: inazuma,
        comments: [
            {
                name: "Sara Kujou",
                avatar: sara,
                text: "Cool"
            },
            {
                name: "Arataki Itto",
                avatar: itto,
                text: "Thanks babe"
            },
            {
                name: "Sara Kujou",
                avatar: sara,
                text: "I love you"
            }
        ]
    },
];



const Trending = () => {
    const scrollViewRef = useRef(null);
    const onPressHandleTrendingItems = () => {
        scrollViewRef.scrollTo({
            x: screen.width * 2,
            y: 0,
            animated: true
        })
    }
    return (
        <View style={styles.container}> 
            <ScrollView horizontal={true} pagingEnabled = {true} ref={scrollViewRef} directionalLockEnabled={true} scrollEnabled={false}>
                <View style={styles.content}>
                    {data.map((person, key) => {
                        return (
                            <TrendingItems key={key} data={person} parentCallBack={onPressHandleTrendingItems} />
                        )
                    })}
                </View>
                <View style={styles.content}>
                    <Text>Comment 1</Text>
                    <Text>Comment 2</Text>
                    <Text>Comment 3</Text>
                </View>
            </ScrollView>
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
    content: {
        width: screen.width * 0.9
    }
});

export default Trending;