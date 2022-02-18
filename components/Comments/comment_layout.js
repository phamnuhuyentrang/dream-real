import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import moment from "moment";
const screen = Dimensions.get("screen");
const figma_screen_w = 428;
const figma_screen_h = 926;

const CommentLayout = (props) => {
    const comment = props.comment;
    return (
        <View style={styles.content}>
            <View style={styles.content2}>
                <View style={styles.content4}>
                    <Image source={{uri: global.image_host_url + comment.avatar}} style={styles.avatar}></Image>
                    <Text style={styles.item4}>{comment.first_name + " " + comment.last_name}</Text>
                </View>
                <View style={{backgroundColor:"#363847", borderRadius: 0.02 * screen.width,  marginBottom: 0.01 * screen.height, marginRight: 0.025 * screen.width}}>
                    <Text style={styles.item3}>{comment.context}</Text>
                </View>
                <View style={{marginBottom: 0.01 * screen.height}}>
                    <Text style={styles.comment_time}>{moment(comment.created_at).format("YYYY-MM-DD hh:mm:ss")}</Text>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    content: {
        backgroundColor: "#3D3D4E",
        borderRadius: 0.02 * screen.width,
        marginBottom: 0.03 * screen.height
    },
    avatar: {
        width: 30 * screen.width / figma_screen_w,
        height: 30 * screen.width / figma_screen_w,
        borderRadius: 50,
        alignSelf: "flex-start"
    },
    content2: {
        marginLeft: 0.02 * screen.width,
        marginTop: 0.01 * screen.height,
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

export default CommentLayout;