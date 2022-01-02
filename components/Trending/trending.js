import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
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
        place: liyue
    },
    {
        name: "Kaedehara Kazuha",
        emotion: "is mining at Golden Apple Island",
        place_detail: "Island, Monstadt",
        number_react: 200,
        number_comment: 171,
        avatar: kazuha,
        place: apple
    },
    {
        name: "Arataki Itto",
        emotion: "is combatting at Inazuma",
        place_detail: "Tower, Inazuma",
        number_react: "1k6",
        number_comment: 501,
        avatar: itto,
        place: inazuma
    },
];



const Trending = () => {
    return (
        <View style={styles.container}> 
            {data.map((person, index) => {
                return (
                    <TrendingItems data={person} key={index}/>
                )
            })}
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
    }
});

export default Trending;