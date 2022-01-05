import React from 'react';
import { Animated, View, Text, StyleSheet, TouchableOpacity, Dimensions, TextInput, KeyboardAvoidingView } from 'react-native';
import { ScrollView, PanGestureHandler, State } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Comment from '../comment';


const screen = Dimensions.get("screen");

const CommentLayout = (props) => {
    const comment = props.comment;
    return (
        <View style={styles.content}>
            <View style={styles.content2}>
                <View style={styles.content4}>
                    <Image source={data.avatar} style={styles.avatar}></Image>
                    <Text style={styles.item4}>{comment.name}</Text>
                </View>
                <View style={{backgroundColor:"#B456F1", borderRadius: 0.05 * screen.width,  marginBottom: 0.01 * screen.height}}>
                    <Text style={styles.item3}>{comment.content}</Text>
                </View>
                <View>
                    <Text style={styles.item3}>{comment.time}</Text>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    content: {
        backgroundColor: "#3D3D4E",
        height: 0.15 * screen.height,
        borderRadius: 0.05 * screen.width,
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
        fontSize: 12,
        color: "white",
        textAlign: "center"
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
        textAlign: "center"
    }
})

export default CommentLayout;