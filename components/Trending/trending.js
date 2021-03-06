import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text, Alert, LogBox } from 'react-native';
import axios from 'axios';
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import userIdProvider from "../Context/user_id_provider"
import TrendingItems from './trending_items';

const screen = Dimensions.get("screen");
const window = Dimensions.get("window");
const figma_screen_w = 428;
const figma_screen_h = 926;

LogBox.ignoreLogs([
    'Each child in a list should have a unique "key" prop'
]);

// const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
//     const paddingToRight = 0.05 * screen.width;
//     return layoutMeasurement.width + contentOffset.x >= contentSize.width - paddingToRight;
// };
const Trending = () => {
    // const [offset, setOffset] = React.useState(0);
    // const [loading, setLoading] = React.useState(true);
    const [end, setEnd] = React.useState(false);
    const user_item = React.useContext(userIdProvider);
    const userId = user_item.id;
    const oldId = user_item.oldId;
    
    React.useEffect(() => {
        if (userId != oldId) {
            user_item.setPostLoading(true);
            user_item.setPostOffset(0);
            user_item.setPostTrending([]);
            user_item.setOldId(userId);
        }
        if (user_item.postLoading) {
            axios.get(global.back_end_url + `/album_trending`, {
                params: { user_id: userId, offset: user_item.postOffset } 
            }).then((response) => {
                if (JSON.parse(JSON.stringify(response.data.albums)).length < 10) {    
                    setEnd(true)
                }
                user_item.setPostTrending([...user_item.posts, ...JSON.parse(JSON.stringify(response.data.albums))]);
                user_item.setPostLoading(false)
                user_item.setPostOffset(user_item.postOffset + 10)
            })
            .catch((error) => Alert.alert("Dream Real Loading Error", "Error occured when trying to load posts: " + error))
        }
        
    }, [user_item.postLoading, userId, oldId])
    
    return (
        <View style={styles.container}>
            <TouchableOpacity style={{
                width: 0.4 * screen.width,
                height: 0.05 * screen.height,
                marginBottom: 0.02 * screen.height,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 0.02 * screen.width,
                backgroundColor: "#3D3D4E"}}
                onPress={() => {
                    user_item.selectDestination("")
                    user_item.setPostTrending([])
                    user_item.setPostOffset(0)
                    user_item.setPostLoading(true)
                    Alert.alert("Dream Real", "Destination filter deleted !")
                }}
            >
                {/* <FontAwesome5Icon name="filter-circle-xmark" size={25} solid color='white'></FontAwesome5Icon> */}
                <Text style={{
                    textAlign: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 0.015 * screen.height,
                    color: "white"}}
                > Clear Destination Filter </Text>
            </TouchableOpacity>
            {user_item.posts != [] ? user_item.posts.map((person) => {
                if (user_item.destination != "") {
                    if (user_item.destination == person.location_formatted) {
                        return (
                            <TrendingItems data={person} key={person.album_id}/>
                        )
                    }
                }
                else {
                    return (
                        <TrendingItems data={person} key={person.album_id}/>
                    )
                }
            }): <Text>Loading ...</Text>}
            {!end && <TouchableOpacity style={styles.buttonLoad} onPress={() => user_item.setPostLoading(true)}>
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