import React, { useCallback } from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, Text, TouchableHighlight, Linking, Alert } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import rocket from "../../static/img/rocket.png"
import facebook from "../../static/img/facebook.png"
import instagram from "../../static/img/instagram.png"

const screen = Dimensions.get("screen");
const window = Dimensions.get("window");
const figma_screen_w = 428;
const figma_screen_h = 926;


const ConnectItems = (props) => {
    const data = props.data;
    const [follow, setFollow] = React.useState(data.is_followed);

    const listReplace = data.name.substring(0, 13).split(" ")
    const lastItem = listReplace[listReplace.length - 1]
    const nameReplace = data.name.substring(0, 13 - lastItem.length) + lastItem.substring(0, 1)

    const handlePressFacebook = useCallback(async () => {
        // Checking if the link is supported for links with custom URL scheme.
        // const url = "fb://profile/" + data.facebook;
        const supported = await Linking.canOpenURL(data.facebook);
        if (supported) {
          // Opening the link with some app, if the URL scheme is "http" the web link should be opened
          // by some browser in the mobile
          await Linking.openURL(data.facebook);
        } else {
          Alert.alert(`Don't know how to open this URL: ${data.facebook}`);
        }
    });
    const handlePressInstagram = useCallback(async () => {
        // Checking if the link is supported for links with custom URL scheme.
        // const url = "fb://profile/" + data.facebook;
        const supported = await Linking.canOpenURL(data.instagram);
        if (supported) {
          // Opening the link with some app, if the URL scheme is "http" the web link should be opened
          // by some browser in the mobile
          await Linking.openURL(data.instagram);
        } else {
          Alert.alert(`Don't know how to open this URL: ${data.instagram}`);
        }
    });
    return (
        <View style={styles.content}>
            {(() => {
                if (follow === true) {
                    return (
                        <TouchableOpacity onPress={() => {setFollow(!follow); data.is_followed = false}}>
                            <FontAwesome5Icon color='red' name="heart" solid size={10} style={styles.item2} />
                        </TouchableOpacity>
                    )
                }
                else {
                    return (
                        <TouchableOpacity onPress={() => {setFollow(!follow); data.is_followed = true}}>
                            <FontAwesome5Icon color='#FFF' name="heart" regular size={10} style={styles.item2} />
                        </TouchableOpacity>
                    )
                }     
            })()}
            <View style={styles.content7}>
                <View style={{flexDirection: "row", alignContent: "center", alignItems: "center"}}>
                    <View style={styles.content4}>
                        <Image source={data.avatar} style={styles.avatar}></Image>
                        <Text style={styles.item4}>{data.name.length <= 15 ? data.name : nameReplace}</Text>
                        <FontAwesome5Icon color='red' name="map-marker-alt" regular size={10} style={styles.item3}>
                            <Text style={[styles.item3, {color:'#FFF'}]}> {data.place_detail}</Text>
                        </FontAwesome5Icon>
                    </View>                   
                </View>
            </View>
            <View style={styles.content7}>
                <TouchableOpacity>
                    <Image source={rocket} style={styles.avatar}></Image> 
                </TouchableOpacity>
                <TouchableOpacity onPress={handlePressFacebook}>
                    <Image source={facebook} style={styles.avatar}></Image> 
                </TouchableOpacity>
                <TouchableOpacity onPress={handlePressInstagram}>
                    <Image source={instagram} style={styles.avatar}></Image> 
                </TouchableOpacity>
            </View>
            <TouchableHighlight
                style={styles.button}
                onPress={() => console.log("Add friend")}
                underlayColor='#fff'>
                    <Text style={styles.buttonlabel}>Friend request</Text>
            </TouchableHighlight>
            <TouchableHighlight
                style={styles.button}
                onPress={() => console.log("Send message")}
                underlayColor='#fff'>
                    <Text style={styles.buttonlabel}>Send message</Text>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        backgroundColor: "#3D3D4E",
        width: wp(40),
        height: wp(60),
        borderRadius: 0.05 * screen.width,
        marginBottom: 0.03 * screen.height,
        margin: 0.02 * screen.height
    },
    avatar: {
        width: 35 * screen.width / figma_screen_w,
        height: 35 * screen.width / figma_screen_w,
        borderRadius: 50,
        alignSelf: "center",
        margin: 0.005 * screen.width
    },
    content4: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 0.01 * screen.height,    
    },
    item2: {
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: 18,
        marginRight: 0.05 * screen.width,
        marginTop: 0.01 * screen.height,
        marginLeft: "auto",
        left: 0
    },
    item3: {
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: 10,
        textAlign: "center"    
    },
    item4: {
        marginBottom: 0.01 * screen.height,
        fontStyle: "normal",
        fontWeight: "900",
        fontSize: 15,
        color: "#FFF",
        alignSelf: "center"
    }, 
    content7: {
        flexDirection: 'row',
        alignItems: "center",
        alignSelf: "center",
        marginTop: 0.01 * screen.height
    },
    button: {
        backgroundColor: '#B456F1',
        borderRadius: 50,
        width: screen.width / 2 - 0.12 * screen.width,
        alignSelf: "center",
        marginTop: 0.015 * screen.width
    },
    buttonlabel: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: "bold" 
    }
});

export default ConnectItems;