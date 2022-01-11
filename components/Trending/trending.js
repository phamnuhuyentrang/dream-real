import React from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';

import selfie1 from "../../static/img/avatar/selfie1.jpg"
import selfie2 from "../../static/img/avatar/selfie2.jpg"
import selfie3 from "../../static/img/avatar/selfie3.jpg"
import selfie4 from "../../static/img/avatar/selfie4.jpg"
import selfie5 from "../../static/img/avatar/selfie5.jpg"
import selfie6 from "../../static/img/avatar/selfie6.jpg"
import selfie7 from "../../static/img/avatar/selfie7.jpg"

import drink_beer from "../../static/img/trending/drink_beer.jpg"
import eating_pizza from "../../static/img/trending/eating_pizza.jpg"
import looking_for_job from "../../static/img/trending/looking_for_job.jpg"
import skating from "../../static/img/trending/skating.jpg"
import travel_to_vietnam from "../../static/img/trending/travel_to_vietnam.jpg"
import travel from "../../static/img/trending/travel.jpg"


import TrendingItems from './trending_items';
const screen = Dimensions.get("screen");
const window = Dimensions.get("window");
const figma_screen_w = 428;
const figma_screen_h = 926;


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

const Trending = () => {
    return (
        <View style={styles.container}> 
            {data.map((person, index) => {
                return (
                    <TrendingItems data={person} key={index} ava={"N/A"}/>
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