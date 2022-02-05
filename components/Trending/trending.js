import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';

import axios from 'axios';
import userIdProvider from "../Context/user_id_provider"
import TrendingItems from './trending_items';

const screen = Dimensions.get("screen");
const window = Dimensions.get("window");
const figma_screen_w = 428;
const figma_screen_h = 926;


const Trending = () => {
    const [data, setData] = React.useState([]);
    const [offset, setOffset] = React.useState(0);
    const [loading, setLoading] = React.useState(true);
    const user_id = React.useContext(userIdProvider);
    const userId = user_id.id;
    console.log(userId)
    console.log(global.back_end_url)
    React.useEffect(() => {
        if (loading) {
            axios.get(global.back_end_url + `/album_trending`, {
                params: { user_id: userId, offset: offset } 
            }).then((response) => {
                setData([...data, ...JSON.parse(JSON.stringify(response.data.albums))])
                setLoading(false)
                setOffset(offset + 10)
            })
            .catch((error) => Alert.alert("Dream Real Loading Error", "Error occured when trying to load posts: " + error))
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