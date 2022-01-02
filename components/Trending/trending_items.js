import React from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import like from "../../static/img/emoji/like.png";
import love from "../../static/img/emoji/love.png";
import sad from "../../static/img/emoji/sad.png";
import angry from "../../static/img/emoji/angry.png";
import wow from "../../static/img/emoji/wow.png";
import haha from "../../static/img/emoji/haha.png";


const screen = Dimensions.get("screen");
const window = Dimensions.get("window");
const figma_screen_w = 428;
const figma_screen_h = 926;


const TrendingItems = (props) => {
    const data = props.data;
    return (
        <View style={styles.content}>
            <View style={styles.content2}>
                <View style={styles.content3}>
                    <View style={styles.content4}>
                        <Image source={data.avatar} style={styles.avatar}></Image>
                        <Text style={styles.item4}>{data.name}</Text>
                    </View>
                    <Text style={styles.item3}>{data.emotion}</Text>
                </View>
                <Text style={styles.item2}>&#128204; {data.place_detail}</Text>
            </View>
            <Image source={data.place} style={styles.place}></Image>
            <View style={styles.content5}>
                <TouchableOpacity>
                    <Text style={styles.item5}>{data.number_react} reacts</Text>
                </TouchableOpacity>
                <View>
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
                        <TouchableOpacity>
                            <Text style={styles.commenticon}>&#128172; 
                                <Text style={styles.item8}> {data.number_comment} comments</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        backgroundColor: "#3D3D4E",
        height: 0.4 * screen.height,
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
        flexDirection: 'row',
        alignItems: "stretch",
        justifyContent: 'space-between',
    },
    content4: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 0.01 * screen.height, 
    },
    item2: {
        marginBottom: 0.05 * screen.height,
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: 10,
        marginRight: 0.05 * screen.width,
        marginTop: 0.01 * screen.height,
        color: "#FFF"
    },
    item3: {
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: 10,
        color: "#FFF",
        textAlign: "center"
    },
    item4: {
        marginLeft: 0.03 * screen.width, 
        fontStyle: "normal",
        fontWeight: "900",
        fontSize: 15,
        color: "#FFF"
    }, 
    place: {
        marginLeft: 0.03 * screen.width,
        marginRight: 0.03 * screen.width,
        width: 0.85 * screen.width,
        height: 0.25 * screen.height
    },
    content5: {
        marginLeft: 0.03 * screen.width,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
    },
    item5: {
        marginTop: 0.02 * screen.height,
        marginBottom: 0.005 * screen.height,
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: 12,
        color: "#FFF"
    },
    content7: {
        flexDirection: 'row',
        alignItems: "center",
    },
    item7: {
        marginRight: 0.01 * screen.width,
        marginTop: 0.015 * screen.height,
        width: 15 * screen.width / figma_screen_w,
        height: 15 * screen.width / figma_screen_w,
    },
    commenticon: {
        marginRight: 0.01 * screen.width,
        marginTop: 0.015 * screen.height,
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: 10,
    },
    item8: {
        fontSize: 12,
        color: "#FFF",
    }
});

export default TrendingItems;