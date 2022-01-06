import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const screen = Dimensions.get("screen");
const figma_screen_w = 428;
const figma_screen_h = 926;

const MessageItem = (props) => {
    const message = props.message;
    return (
        <TouchableOpacity style={styles.content}>
            <Image source={message.avatar} style={styles.avatar}></Image>
            <View style={styles.content2}>
                <Text>{message.name}</Text>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    content: {
        backgroundColor: "#3D3D4E",
        height: 0.08 * screen.height,
        marginBottom: 0.03 * screen.height,
        flexDirection: "row"
    },
    avatar: {
        width: 50 * screen.width / figma_screen_w,
        height: 50 * screen.width / figma_screen_w,
        borderRadius: 50,
        alignSelf: "flex-start"
    },
    content2: {
        marginLeft: 0.02 * screen.width,
        marginTop: 0.005 * screen.height,
        flexDirection: 'column',
        alignItems: "stretch",
        justifyContent: 'space-between',
    },
    content4: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 0.01 * screen.height, 
    },
    item3: {
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: 13,
        color: "white",
        textAlign: "left",
        margin: 0.02 * screen.width
    },
    item4: {
        marginLeft: 0.03 * screen.width, 
        fontStyle: "normal",
        fontWeight: "900",
        fontSize: 15,
        color: "#FFF"
    }, 
    comment_time: {
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: 10,
        color: "#FFF",
        textAlign: "left"
    }
})

export default MessageItem;