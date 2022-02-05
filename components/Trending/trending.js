import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import userIdProvider from '../../context/user_id_provider';
// import selfie1 from "../../static/img/avatar/selfie1.jpg"
// import selfie2 from "../../static/img/avatar/selfie2.jpg"
// import selfie3 from "../../static/img/avatar/selfie3.jpg"
// import selfie4 from "../../static/img/avatar/selfie4.jpg"
// import selfie5 from "../../static/img/avatar/selfie5.jpg"
// import selfie6 from "../../static/img/avatar/selfie6.jpg"
// import selfie7 from "../../static/img/avatar/selfie7.jpg"

// import drink_beer from "../../static/img/trending/drink_beer.jpg"
// import eating_pizza from "../../static/img/trending/eating_pizza.jpg"
// import looking_for_job from "../../static/img/trending/looking_for_job.jpg"
// import skating from "../../static/img/trending/skating.jpg"
// import travel_to_vietnam from "../../static/img/trending/travel_to_vietnam.jpg"
// import travel from "../../static/img/trending/travel.jpg"
import axios from 'axios';

import TrendingItems from './trending_items';
// import { off } from 'npm';
const screen = Dimensions.get("screen");
const window = Dimensions.get("window");
const figma_screen_w = 428;
const figma_screen_h = 926;

// const api = axios.create({
//     baseURL: ""
// })
// const data = [
//     {
//         name: "Anna Scott",
//         emotion: "is drinking beer " +  '\u{1f37b}',
//         place_detail: "Lisbon, Portugal",
//         number_react: 9,
//         number_comment: 6,
//         avatar: Image.resolveAssetSource(selfie1).uri,
//         place: drink_beer,
//         comment: [
//             {
//                 avatar: selfie7,
//                 name: "Tina Zhou",
//                 time: "1 week ago",
//                 content: "Have fun !"
//             },
//             {
//                 avatar: selfie2,
//                 name: "Liwen Chan",
//                 time: "2 days ago",
//                 content: "Wish to join youuu !"
//             },{
//                 avatar: selfie6,
//                 name: "Michele Hyatt",
//                 time: "1 week ago",
//                 content: "1 2 3 Cheers !"
//             },
//             {
//                 avatar: selfie3,
//                 name: "Alexandre Analy",
//                 time: "2 days ago",
//                 content: "Cool !"
//             },{
//                 avatar: selfie4,
//                 name: "Alex Kurt",
//                 time: "1 hour ago",
//                 content: "Niceeeeee weekend !"
//             },
//             {
//                 avatar: selfie5,
//                 name: "Kelly Cat",
//                 time: "2 days ago",
//                 content: "Beautiful !"
//             }
//         ]
//     },
//     {
//         name: "Liwen Chan",
//         emotion: "is eating pizza " + '\u{1f355}',
//         place_detail: "Kualar Lumpur, Malaysia",
//         number_react: 200,
//         number_comment: 2,
//         avatar: Image.resolveAssetSource(selfie2).uri,
//         place: eating_pizza,
//         comment: [
//             {
//                 avatar: selfie1,
//                 name: "Anna Scott",
//                 time: "3 weeks ago",
//                 content: "Delicious !"
//             },
//             {
//                 avatar: selfie5,
//                 name: "Kelly Cat",
//                 time: "3 days ago",
//                 content: "I love it !"
//             }
//         ]
//     },
//     {
//         name: "Kelly Cat",
//         emotion: "is skating " + '\u{1f6f9}',
//         place_detail: "Nantes, France",
//         number_react: "1k6",
//         number_comment: 2,
//         avatar: Image.resolveAssetSource(selfie5).uri,
//         place: skating,
//         comment: [
//             {
//                 avatar: selfie2,
//                 name: "Liwen Chan",
//                 time: "1 hour ago",
//                 content: "Cooooooool !"
//             },
//             {
//                 avatar: selfie4,
//                 name: "Alex Kurt",
//                 time: "1 hour ago",
//                 content: "Nice air !"
//             }
//         ]
//     },
//     {
//         name: "Tina Zhou",
//         emotion: "is traveling to Vietnam " + '\u{1f1fb}',
//         place_detail: "Hanoi, Vietnam",
//         number_react: "1k",
//         number_comment: 2,
//         avatar: Image.resolveAssetSource(selfie6).uri,
//         place: travel_to_vietnam,
//         comment: [
//             {
//                 avatar: selfie2,
//                 name: "Liwen Chan",
//                 time: "1 hour ago",
//                 content: "So beautiful this country !"
//             },
//             {
//                 avatar: selfie4,
//                 name: "Alex Kurt",
//                 time: "1 hour ago",
//                 content: "I really want to travel there !"
//             }
//         ]
//     },
//     {
//         name: "Alex Kurt",
//         emotion: "is looking for job " + '\u{1f468}',
//         place_detail: "New York, USA",
//         number_react: "10",
//         number_comment: 2,
//         avatar: Image.resolveAssetSource(selfie4).uri,
//         place: looking_for_job,
//         comment: [
//             {
//                 avatar: selfie3,
//                 name: "Alexandre Analy",
//                 time: "1 hour ago",
//                 content: "You an send me your CV and cover letter to my email at aanaly@dream-real-group.co"
//             },
//             {
//                 avatar: selfie6,
//                 name: "Michele Hyatt",
//                 time: "1 hour ago",
//                 content: "You can reach me at PM for more details !"
//             }
//         ]
//     },
//     {
//         name: "Michele Hyatt",
//         emotion: "is traveling " + '\u{1f3d4}',
//         place_detail: "Titlis, Switzerland",
//         number_react: "100",
//         number_comment: 2,
//         avatar: Image.resolveAssetSource(selfie7).uri,
//         place: travel,
//         comment: [
//             {
//                 avatar: selfie3,
//                 name: "Alexandre Analy",
//                 time: "1 hour ago",
//                 content: "Wow ! Too nice"
//             },
//             {
//                 avatar: selfie7,
//                 name: "Tina Zhou",
//                 time: "1 hour ago",
//                 content: "I really love this place !"
//             }
//         ]
//     }
// ];

const Trending = () => {
    const [data, setData] = React.useState([]);
    const [offset, setOffset] = React.useState(0);
    const [loading, setLoading] = React.useState(true);
    const userId = React.useContext(userIdProvider);
    React.useEffect(() => {
        if (loading) {
            axios.get(`http://192.168.1.27:5000/album_trending`, {
                params: { user_id: JSON.parse(), offset: offset } 
            }).then((response) => {
                setData([...data, ...JSON.parse(JSON.stringify(response.data))])
                setLoading(false)
                setOffset(offset + 10)
                console.log(JSON.parse(userId))
            })
            .catch((err) => console.log(err))
        }
    }, [loading])
    
    return (
        <View style={styles.container}> 
            {data != [] ? data.map((person) => {
                return (
                    <TrendingItems data={person} key={person.album_id} ava={"N/A"}/>
                )
            }): <Text>Loading ...</Text>}
            {data != [] && <TouchableOpacity style={styles.buttonLoad} onPress={() => setLoading(true)}>
                <Text style={styles.button}> Load more </Text>
            </TouchableOpacity> }
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
    buttonLoad: {
        width: 0.9 * screen.width,
        height: 0.05 * screen.height,
        marginBottom: 0.02 * screen.height,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 0.02 * screen.width,
        backgroundColor: "#3D3D4E",
    },
    button: {
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 0.03 * screen.height,
        color: "white"
    }
});

export default Trending;