import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text, ScrollView } from 'react-native';
import Trending from './Trending/trending';
import Destinations from './Destinations/destinations';
import Messages from './Messages/messages';
import Connect from './Connect/connect';
import userIdProvider from './Context/user_id_provider';
const screen = Dimensions.get("screen");
const window = Dimensions.get("window");

const MenuBar = () => {

    const user_item = React.useContext(userIdProvider);
    const loadContent = () => {
        switch(user_item.click) {
            case 1:
                return <Destinations />
            case 0:
                return <Trending />
            case 2:
                return <Messages />
            default:
                return <Connect />
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <TouchableOpacity onPress={() => user_item.toogleClick(0)}>
                    <Text style={styles.text}>Trending</Text>
                    <View style={user_item.click === 0 ? {...styles.underline, backgroundColor: "#B456F1"} : {...styles.underline}}></View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => user_item.toogleClick(1)}>
                    <Text style={styles.text}>Destination</Text>
                    <View style={user_item.click === 1 ? {...styles.underline, backgroundColor: "#B456F1"} : {...styles.underline}}></View>
                </TouchableOpacity>
                {user_item.id != 0 && <TouchableOpacity onPress={() => user_item.toogleClick(2)}>
                    <Text style={styles.text}>Messages</Text>
                    <View style={user_item.click === 2 ? {...styles.underline, backgroundColor: "#B456F1"} : {...styles.underline}}></View>
                </TouchableOpacity>}
                {user_item.id != 0 && <TouchableOpacity onPress={() => user_item.toogleClick(3)}>
                    <Text style={styles.text}>Connect</Text>
                    <View style={user_item.click === 3 ? {...styles.underline, backgroundColor: "#B456F1"} : {...styles.underline}}></View>
                </TouchableOpacity>}
            </View>
            <ScrollView style={styles.second_content}>
                {loadContent()}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        backgroundColor: "#252a38",
        overflow: "hidden"
    },
    
    content: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1
    },
    text: {
        color: "#FFFFFF",
        marginBottom: 2
    },
    underline: {
        height: 3, 
    },
    second_content: {
        borderTopColor: "#3D3D4E",
        borderTopWidth: 3
    }
})

export default MenuBar;