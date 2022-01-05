import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, StatusBar } from "react-native"
import like from "../../../static/img/emoji/like.png";
import love from "../../../static/img/emoji/love.png";
import sad from "../../../static/img/emoji/sad.png";
import angry from "../../../static/img/emoji/angry.png";
import wow from "../../../static/img/emoji/wow.png";
import haha from "../../../static/img/emoji/haha.png";
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'

const screen = Dimensions.get("screen");
const window = Dimensions.get("window");
const figma_screen_w = 428;
const figma_screen_h = 926;

const SLIDER_WIDTH = Dimensions.get('window').width 
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9)
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const ContentItem = ({ item, index }) => {
    return (
        <View style={styles.container} key={index}>
            <Image
                source={item.place}
                style={styles.image}
            />
            <View style={styles.content2}>
                <View>
                    <View style={styles.content4}>
                        <Image source={item.avatar} style={styles.avatar}></Image>
                        <Text style={styles.item4}>{item.name}</Text>
                    </View>
                    <Text style={styles.item3}>{item.emotion}</Text>
                </View>
                <FontAwesome5Icon color='red' name="map-marker-alt" regular size={12} style={styles.item2}>
                    <Text style={[styles.item2, {color:'#FFF'}]}> {item.place_detail}</Text>
                </FontAwesome5Icon>
            </View>
            <View style={styles.content5}>
                <TouchableOpacity>
                    <Text style={styles.item5}>{item.number_react} reacts</Text>
                </TouchableOpacity>
                <View style={styles.content7}>
                    <TouchableOpacity>
                        <Image source={like} style={styles.item7}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={love} style={styles.item7}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={haha} style={styles.item7}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={sad} style={styles.item7}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={wow} style={styles.item7}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={angry} style={styles.item7}></Image>
                    </TouchableOpacity>
                </View>
            </View>
    </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#3D3D4E',
        borderRadius: 0.05 * window.width,
        width: ITEM_WIDTH,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
        alignSelf: "center",
        height: 0.55 * (screen.height - STATUSBAR_HEIGHT),
        marginTop: 0.21 * (screen.height - STATUSBAR_HEIGHT) + STATUSBAR_HEIGHT
    },
    image: {
        borderTopLeftRadius: 0.05 * window.width,
        borderTopRightRadius: 0.05 * window.width,
        width: ITEM_WIDTH,
        height: 300,
    },
    item7: {
        width: 20 * screen.width / figma_screen_w,
        height: 20 * screen.width / figma_screen_w,
        marginRight: 0.03 * screen.width
    },
    content2: {
        margin: 0.02 * screen.width,
        flexDirection: 'row',
        alignItems: "stretch",
        justifyContent: 'space-between',
    },
    content4: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 0.01 * screen.height, 
    },
    item4: {
        marginLeft: 0.03 * screen.width, 
        fontStyle: "normal",
        fontWeight: "900",
        fontSize: 16,
        color: "#FFF"
    }, 
    item2: {
        marginBottom: 0.05 * screen.height,
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: 12,
        marginRight: 0.01 * screen.width,
        marginTop: 0.009 * screen.height,
        right: 0
    },
    item3: {
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: 12,
        color: "#FFF",
        textAlign: "left",
        marginTop: 0.01 * screen.height,
        marginLeft: 0.01 * screen.width
    },
    avatar: {
        width: 30 * screen.width / figma_screen_w,
        height: 30 * screen.width / figma_screen_w,
        borderRadius: 50,
        alignSelf: "flex-start",
        marginLeft: 0.0045 * screen.width
    },
    content5: {
        marginLeft: 0.03 * screen.width,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
    },
    item5: {
        marginTop: 0.02 * screen.height,
        marginBottom: 0.025 * screen.height,
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: 14,
        color: "#FFF"
    },
    content7: {
        flexDirection: 'row',
        alignItems: "center",
    },
    item8: {
        fontSize: 12,
        color: "#FFF",
    }
})

export default ContentItem