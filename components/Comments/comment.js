import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Text, Dimensions, StyleSheet, ScrollView, TextInput } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import like from "../../static/img/emoji/like.png";
import love from "../../static/img/emoji/love.png";
import sad from "../../static/img/emoji/sad.png";
import angry from "../../static/img/emoji/angry.png";
import wow from "../../static/img/emoji/wow.png";
import haha from "../../static/img/emoji/haha.png";
import sendIcon from "../../static/img/icon-button/send.png";
import raiden from "../../static/img/raiden_shogun.png";

import CommentLayout from './comment_layout';
import Header from '../header';
import CustomBar from '../statusbar';

const figma_screen_w = 428;
const figma_screen_h = 926;
const screen = Dimensions.get('screen');

const Comment = (props) => {
    const [data, setData] = React.useState(props.route.params.comment);

    const [textInit, onChangeText] = React.useState("");

    React.useEffect(() => {
        // console.log(textInit)
    }, [textInit])

    const onChange = (event) => {
        const {eventCount, target, text} = event.nativeEvent;
        onChangeText(text)
    }

    const addComment = () => {
        setData(prevData => ({
            ...prevData,
            comment: [...prevData.comment, {avatar: raiden, name: "Raiden Shogun", time: "1s ago", content: textInit}]
        }))
    }
    
    return (
        <View style={{flex: 1}}>
            <ScrollView style={{backgroundColor: "#252a38", height: screen.height - 100}}>
                <View style={{flex: 1}}>
                    <CustomBar backgroundColor="#3d3d4e" barStyle="light-content" />
                    <Header />
                    <View style={{ flex: 1, backgroundColor: "#252a38" }}>
                        <View style={styles.content2}>
                            <View>
                                <View style={styles.content4}>
                                    <Image source={data.avatar} style={styles.avatar}></Image>
                                    <Text style={styles.item4}>{data.name}</Text>
                                </View>
                                <Text style={styles.item3}>{data.emotion}</Text>
                            </View>
                            <FontAwesome5Icon color='red' name="map-marker-alt" regular size={10} style={styles.item2}>
                                <Text style={[styles.item2, {color:'#FFF'}]}> {data.place_detail}</Text>
                            </FontAwesome5Icon>
                        </View>
                        <Image source={data.place} style={styles.place}></Image>
                        <View style={styles.content5}>
                            <TouchableOpacity>
                                <Text style={styles.item5}>{data.number_react} reacts</Text>
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
                                        <Image source={angry} style={styles.itemlast}></Image>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        <View style={styles.container}> 
                            {data.comment.map((item, index) => {
                                return (
                                    <CommentLayout comment={item} key={index}/>
                                )
                            })}
                        </View> 
                    </View>
                </View>
            </ScrollView>
            <View style={styles.comment_area}>
                <TextInput
                    style={textInit === "" ? styles.input : {...styles.input, width: 0.9 * screen.width - 32 - 0.02 * screen.width, marginRight: 0.02 * screen.width}}
                    onChange={onChange}
                    value={textInit}
                    placeholder='add a comment ...'
                />
                {textInit != "" && <TouchableOpacity onPress={addComment}>
                    <Image style={styles.send_button} source={sendIcon}></Image> 
                </TouchableOpacity>}
            </View>
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
    avatar: {
        width: 30 * screen.width / figma_screen_w,
        height: 30 * screen.width / figma_screen_w,
        borderRadius: 50,
        alignSelf: "flex-start"
    },
    content2: {
        marginLeft: 0.05 * screen.width,
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
        marginTop: 0.01 * screen.height
    },
    item3: {
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: 10,
        color: "#FFF",
        textAlign: "left",
    },
    item4: {
        marginLeft: 0.03 * screen.width, 
        fontStyle: "normal",
        fontWeight: "900",
        fontSize: 15,
        color: "#FFF"
    }, 
    place: {
        width: 0.9 * screen.width,
        marginLeft: 0.05 * screen.width,
        marginRight: 0.05 * screen.width,
        height: 0.25 * screen.height
    },
    content5: {
        marginLeft: 0.05 * screen.width,
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
        marginRight: 0.05 * screen.width
    },
    item7: {
        marginRight: 0.02 * screen.width,
        marginTop: 0.015 * screen.height,
        width: 15 * screen.width / figma_screen_w,
        height: 15 * screen.width / figma_screen_w,
    },
    itemlast: {
        width: 15 * screen.width / figma_screen_w,
        height: 15 * screen.width / figma_screen_w,
        marginTop: 0.015 * screen.height,
    },

    comment_area: {
        height: 100,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#252a40"
    },
    input: {
        width: 0.9 * screen.width,
        marginLeft: 0.05 * screen.width,
        marginRight: 0.05 * screen.width,
        backgroundColor: "#3D3D4E",
        height: 40,
        borderRadius: 0.05 * screen.width,
        fontStyle: "normal",
        fontWeight: "900",
        fontSize: 15,
        color: "#FFF",
        paddingLeft: 0.05 * screen.width,
        paddingRight: 0.05 * screen.width, 
    },
    send_button: {
        width: 32,
        height: 32,
        marginRight: 0.05 * screen.width, 
    }
})

export default Comment;