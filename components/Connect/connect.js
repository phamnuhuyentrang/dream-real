import React from 'react';
import { View, Dimensions, TouchableOpacity, StyleSheet, Text, Alert } from 'react-native';
import axios from "axios";


import ConnectItems from "./connect_items"
import userIdProvider from '../Context/user_id_provider';

const screen = Dimensions.get("screen");
const window = Dimensions.get("window");

// const data = [
//     {
//         name: "Alex Kurt",
//         place_detail: "New York, USA",
//         avatar: selfie4,
//         is_followed: false,
//         facebook: "https://www.facebook.com/alex.kurt.35380",
//         dream_real: "N/A",
//         instagram: "https://www.instagram.com/alexkurtu/"
//     },
//     {
//         name: "Anna Scott",
//         place_detail: "Lisbon, Portugal",
//         avatar: selfie1,
//         is_followed: true,
//         facebook: "https://www.facebook.com/anna.scott.xo",
//         dream_real: "N/A",
//         instagram: "https://www.instagram.com/annascottartiste/"
//     },
//     {
//         name: "Alexandre Analy",
//         place_detail: "Brussels, Belgium",
//         avatar: selfie3,
//         is_followed: true,
//         facebook: "https://www.facebook.com/anna.scott.xo",
//         dream_real: "N/A",
//         instagram: "https://www.instagram.com/annascottartiste/"
//     },
//     {
//         name: "Liwen Chan",
//         place_detail: "Beijing, China",
//         avatar: selfie2,
//         is_followed: false,
//         facebook: "https://www.facebook.com/liwenchan",
//         dream_real: "N/A",
//         instagram: "https://www.instagram.com/chan_liwen/"
//     },
//     {
//         name: "Michele Hyatt",
//         place_detail: "London, UK",
//         avatar: selfie6,
//         is_followed: true,
//         facebook: "https://www.facebook.com/michele.hyatt.9",
//         dream_real: "N/A",
//         instagram: "https://www.instagram.com/michelle.hyatt/"
//     },
//     {
//         name: "Allison Bernard",
//         place_detail: "Berlin, Germany",
//         avatar: selfie10,
//         is_followed: true,
//         facebook: "https://www.facebook.com/allison.bernard.3",
//         dream_real: "N/A",
//         instagram: "https://www.instagram.com/allisonbernard_ri/"
//     },
//     {
//         name: "Alexandre Bornand",
//         place_detail: "Oslo, Norway",
//         avatar: ava1,
//         is_followed: false,
//         facebook: "https://www.facebook.com/alexandre.bornand.54",
//         dream_real: "N/A",
//         instagram: "https://www.instagram.com/epicerielatraction/"
//     },
//     {
//         name: "Louis Grosfilley",
//         place_detail: "Vancouver, Canada",
//         avatar: ava2,
//         is_followed: false,
//         facebook: "https://www.facebook.com/louis.grosfilley",
//         dream_real: "N/A",
//         instagram: "https://www.instagram.com/tigerofmilenium/"
//     },
//     {
//         name: "Tina Zhou",
//         place_detail: "Paris, France",
//         avatar: selfie7,
//         is_followed: true,
//         facebook: "https://www.facebook.com/tina.zhou.10236",
//         dream_real: "N/A",
//         instagram: "https://www.instagram.com/tina.zhou.1694/"
//     },
//     {
//         name: "Jenny Pham",
//         place_detail: "Nha Trang, Vietnam",
//         avatar: selfie11,
//         is_followed: true,
//         facebook: "https://www.facebook.com/profile.php?id=100044974662119",
//         dream_real: "N/A",
//         instagram: "https://www.instagram.com/jenny.phamm/"
//     },
//     {
//         name: "Cindy Hilton",
//         place_detail: "Tokyo, Japan",
//         avatar: selfie15,
//         is_followed: false,
//         facebook: "https://www.facebook.com/cindy.hilton.7547",
//         dream_real: "N/A",
//         instagram: "https://www.instagram.com/hilton.cindy/"
//     },
//     {
//         name: "Taylor Sparks",
//         place_detail: "Zurich, Switzerland",
//         avatar: selfie8,
//         is_followed: false,
//         facebook: "https://www.facebook.com/taylor.sparks.750",
//         dream_real: "N/A",
//         instagram: "https://www.instagram.com/taylor.sparksss/"
//     },
//     {
//         name: "Kelly Cat",
//         place_detail: "Havana, Cuba",
//         avatar: selfie5,
//         is_followed: false,
//         facebook: "https://www.facebook.com/kelly.cat.127648",
//         dream_real: "N/A",
//         instagram: "https://www.instagram.com/kelly._.cat/"
//     }
// ]

const Connect = () => {

    const [data, setData] = React.useState([])
    const [end, setEnd] = React.useState(false)
    const [offset, setOffset] = React.useState(0)
    const [loading, setLoading] = React.useState(true);
    const user_item = React.useContext(userIdProvider)
    React.useEffect(() => {
        if (loading) {
            axios.get(global.back_end_url + "/get_connection", {
                params: { user_id: user_item.id, offset: offset } 
            }).then((response) => {
                if (JSON.parse(JSON.stringify(response.data.friends)).length < 10) {    
                    setEnd(true)
                }
                setData([...data, ...JSON.parse(JSON.stringify(response.data.friends))])
                setLoading(false)
                setOffset(offset + 20)
            }).catch((error) => Alert.alert("Dream Real Loading Error", "Error occured when trying to load connectors: " + error))
        }
    }, [loading])

    return (
        <View style={{flexDirection: "row", flexWrap: "wrap"}}> 
            {data.map((person, index) => {
                return (
                    <ConnectItems data={person} key={index}/>
                )
            })}
            {!end && <TouchableOpacity style={styles.buttonLoad} onPress={() => setLoading(true)}>
                <Text style={styles.button}> Load more </Text>
            </TouchableOpacity> }
        </View>
    )
}

const styles = StyleSheet.create({
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

export default Connect;