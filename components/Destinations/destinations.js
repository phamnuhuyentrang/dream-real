import React from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';

import bangkok from "../../static/img/destinations/bangkok.jpg"
import hanoi from "../../static/img/destinations/hanoi.jpg"
import havana from "../../static/img/destinations/havana.jpg"
import london from "../../static/img/destinations/london.jpg"
import paris from "../../static/img/destinations/paris.jpg"
import titlis from "../../static/img/destinations/titlis.jpg"

import DestinationItems from './destinations_items';

const screen = Dimensions.get("screen");
const window = Dimensions.get("window");

const data = [
    {
        place_detail: "Hanoi, Vietnam",
        place: hanoi
    },
    {
        place_detail: "Bangkok, Thailand",
        place: bangkok
    },
    {
        place_detail: "Havana, Cuba",
        place: havana
    },
    {
        place_detail: "London, UK",
        place: london
    },
    {
        place_detail: "Paris, France",
        place: paris
    },
    {
        place_detail: "Titlis, Switzerland",
        place: titlis
    }
]

const Destinations = () => {
    return (
        <View> 
            {data.map((person, index) => {
                return (
                    <DestinationItems data={person} key={index}/>
                )
            })}
        </View>
    )
}

export default Destinations;