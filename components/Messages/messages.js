import React from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import MessageItem from './message_items';
import selfie3 from "../../static/img/avatar/selfie3.jpg"
import selfie7 from "../../static/img/avatar/selfie7.jpg"
const screen = Dimensions.get("screen");
const window = Dimensions.get("window");

const data = [
    {
        avatar: selfie3,
        name: "Alexandre Analy",
        content: [{
            name: "Alexandre Analy",
            message: "Hi",
            time: "7 minute ago"
        },
        {
            name: "Alexandre Analy",
            message: "Would u like to enjoy?"
        },
        {
            name: "",
            message: "Yes"
        }]
    },
    {
        avatar: selfie7,
        name: "Tina Zhou",
        content: [{
            name: "Alexandre Analy",
            message: "Hi"
        },
        {
            name: "Alexandre Analy",
            message: "Would u like to enjoy?"
        },
        {
            name: "",
            message: "Yes"
        },
        {
            name: "",
            message: "What do we enjoy?"
        }]
    }
]

const Messages = () => {
    return (
        <View style={styles.container}> 
            {data.map((item, index) => {
                return (
                    <MessageItem message={item} key={index}/>
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

export default Messages;