import React from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';


const screen = Dimensions.get("screen");
const window = Dimensions.get("window");

const MenuBar = () => {

    const [click, toogleClick] = React.useState(0);
    
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <TouchableOpacity onPress={() => toogleClick(0)}>
                    <Text style={styles.text}>Trending</Text>
                    <View style={click === 0 ? {...styles.underline, backgroundColor: "#B456F1"} : {...styles.underline}}></View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toogleClick(1)}>
                    <Text style={styles.text}>Destinations</Text>
                    <View style={click === 1 ? {...styles.underline, backgroundColor: "#B456F1"} : {...styles.underline}}></View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toogleClick(2)}>
                    <Text style={styles.text}>Messages</Text>
                    <View style={click === 2 ? {...styles.underline, backgroundColor: "#B456F1"} : {...styles.underline}}></View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toogleClick(3)}>
                    <Text style={styles.text}>Connect</Text>
                    <View style={click === 3 ? {...styles.underline, backgroundColor: "#B456F1"} : {...styles.underline}}></View>
                </TouchableOpacity>
            </View>
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
    }
})

export default MenuBar;