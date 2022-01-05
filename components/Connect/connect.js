import React from 'react';
import { View, Dimensions } from 'react-native';

import ava1 from "../../static/img/avatar/ava1.jpg"
import ava2 from "../../static/img/avatar/ava2.jpg"
import selfie1 from "../../static/img/avatar/selfie1.jpg"
import selfie2 from "../../static/img/avatar/selfie2.jpg"
import selfie3 from "../../static/img/avatar/selfie3.jpg"
import selfie4 from "../../static/img/avatar/selfie4.jpg"
import selfie5 from "../../static/img/avatar/selfie5.jpg"
import selfie6 from "../../static/img/avatar/selfie6.jpg"
import selfie7 from "../../static/img/avatar/selfie7.jpg"
import selfie8 from "../../static/img/avatar/selfie8.jpg"
import selfie10 from "../../static/img/avatar/selfie10.jpg"
import selfie11 from "../../static/img/avatar/selfie11.jpg"
import selfie15 from "../../static/img/avatar/selfie15.jpg"

import ConnectItems from "./connect_items"

const screen = Dimensions.get("screen");
const window = Dimensions.get("window");

const data = [
    {
        name: "Alex Kurt",
        place_detail: "New York, USA",
        avatar: selfie4,
        is_followed: false,
        facebook: "https://www.facebook.com/alex.kurt.35380",
        dream_real: "N/A",
        instagram: "https://www.instagram.com/alexkurtu/"
    },
    {
        name: "Anna Scott",
        place_detail: "Lisbon, Portugal",
        avatar: selfie1,
        is_followed: true,
        facebook: "https://www.facebook.com/anna.scott.xo",
        dream_real: "N/A",
        instagram: "https://www.instagram.com/annascottartiste/"
    },
    {
        name: "Alexandre Analy",
        place_detail: "Brussels, Belgium",
        avatar: selfie3,
        is_followed: true,
        facebook: "https://www.facebook.com/anna.scott.xo",
        dream_real: "N/A",
        instagram: "https://www.instagram.com/annascottartiste/"
    },
    {
        name: "Liwen Chan",
        place_detail: "Beijing, China",
        avatar: selfie2,
        is_followed: false,
        facebook: "https://www.facebook.com/liwenchan",
        dream_real: "N/A",
        instagram: "https://www.instagram.com/chan_liwen/"
    },
    {
        name: "Michele Hyatt",
        place_detail: "London, UK",
        avatar: selfie6,
        is_followed: true,
        facebook: "https://www.facebook.com/michele.hyatt.9",
        dream_real: "N/A",
        instagram: "https://www.instagram.com/michelle.hyatt/"
    },
    {
        name: "Allison Bernard",
        place_detail: "Berlin, Germany",
        avatar: selfie10,
        is_followed: true,
        facebook: "https://www.facebook.com/allison.bernard.3",
        dream_real: "N/A",
        instagram: "https://www.instagram.com/allisonbernard_ri/"
    },
    {
        name: "Alexandre Bornand",
        place_detail: "Oslo, Norway",
        avatar: ava1,
        is_followed: false,
        facebook: "https://www.facebook.com/alexandre.bornand.54",
        dream_real: "N/A",
        instagram: "https://www.instagram.com/epicerielatraction/"
    },
    {
        name: "Louis Grosfilley",
        place_detail: "Vancouver, Canada",
        avatar: ava2,
        is_followed: false,
        facebook: "https://www.facebook.com/louis.grosfilley",
        dream_real: "N/A",
        instagram: "https://www.instagram.com/tigerofmilenium/"
    },
    {
        name: "Tina Zhou",
        place_detail: "Paris, France",
        avatar: selfie7,
        is_followed: true,
        facebook: "https://www.facebook.com/tina.zhou.10236",
        dream_real: "N/A",
        instagram: "https://www.instagram.com/tina.zhou.1694/"
    },
    {
        name: "Jenny Pham",
        place_detail: "Nha Trang, Vietnam",
        avatar: selfie11,
        is_followed: true,
        facebook: "https://www.facebook.com/profile.php?id=100044974662119",
        dream_real: "N/A",
        instagram: "https://www.instagram.com/jenny.phamm/"
    },
    {
        name: "Cindy Hilton",
        place_detail: "Tokyo, Japan",
        avatar: selfie15,
        is_followed: false,
        facebook: "https://www.facebook.com/cindy.hilton.7547",
        dream_real: "N/A",
        instagram: "https://www.instagram.com/hilton.cindy/"
    },
    {
        name: "Taylor Sparks",
        place_detail: "Zurich, Switzerland",
        avatar: selfie8,
        is_followed: false,
        facebook: "https://www.facebook.com/taylor.sparks.750",
        dream_real: "N/A",
        instagram: "https://www.instagram.com/taylor.sparksss/"
    },
    {
        name: "Kelly Cat",
        place_detail: "Havana, Cuba",
        avatar: selfie5,
        is_followed: false,
        facebook: "https://www.facebook.com/kelly.cat.127648",
        dream_real: "N/A",
        instagram: "https://www.instagram.com/kelly._.cat/"
    }
]

const Connect = () => {
    return (
        <View style={{flexDirection: "row", flexWrap: "wrap"}}> 
            {data.map((person, index) => {
                return (
                    <ConnectItems data={person} key={index}/>
                )
            })}
        </View>
    )
}

export default Connect;