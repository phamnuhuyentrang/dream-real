import React, {PureComponent} from 'react';
import { View, Image, StyleSheet, Dimensions, Animated, Pressable } from 'react-native';
import sara from "../../static/img/trending/sara.png";
import kazuha from "../../static/img/trending/kazuha.png";
import itto from "../../static/img/trending/itto.png";
import raiden from "../../static/img/raiden_shogun.png"

import liyue from "../../static/img/trending/liyue.png";
import apple from "../../static/img/trending/golden_apple_island.png";
import inazuma from "../../static/img/trending/inazuma.png";

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const ITEM_SIZE = wp(50);
const SPACE_ITEM_SIZE = (hp(38) - ITEM_SIZE) / 2;

const screen = Dimensions.get("screen");
const window = Dimensions.get("window");
const figma_screen_w = 428;
const figma_screen_h = 926;

const APPBAR_HEIGHT = 200 * screen.height / figma_screen_h;

const keyGenerator = () => '_' + Math.random().toString(36).substr(2, 9)

const data = [
    {
        id: keyGenerator(),
        name: "Sara Kujou",
        emotion: "is traveling to Liyue",
        place_detail: "Mountain, Liyue",
        number_react: 9,
        number_comment: 8,
        avatar: sara,
        place: liyue
    },
    {
        id: keyGenerator(),
        name: "Kaedehara Kazuha",
        emotion: "is mining at Golden Apple Island",
        place_detail: "Island, Monstadt",
        number_react: 200,
        number_comment: 171,
        avatar: kazuha,
        place: apple
    },
    {
        id: keyGenerator(),
        name: "Arataki Itto",
        emotion: "is combatting at Inazuma",
        place_detail: "Tower, Inazuma",
        number_react: "1k6",
        number_comment: 501,
        avatar: itto,
        place: inazuma
    },
    {
        id: keyGenerator(),
        name: "Ayato",
        emotion: "is combatting at Inazuma",
        place_detail: "Tower, Inazuma",
        number_react: "1k6",
        number_comment: 501,
        avatar: itto,
        place: inazuma
    },
    {
        id: keyGenerator(),
        name: "Ayaka",
        emotion: "is combatting at Inazuma",
        place_detail: "Tower, Inazuma",
        number_react: "1k6",
        number_comment: 501,
        avatar: itto,
        place: inazuma
    },
    {
        id: keyGenerator(),
        name: "Baal",
        emotion: "is combatting at Inazuma",
        place_detail: "Tower, Inazuma",
        number_react: "1k6",
        number_comment: 501,
        avatar: itto,
        place: inazuma
    },
    {
        id: keyGenerator(),
        name: "Venti",
        emotion: "is combatting at Inazuma",
        place_detail: "Tower, Inazuma",
        number_react: "1k6",
        number_comment: 501,
        avatar: itto,
        place: inazuma
    }
];

const Stories = () => {
    const scrollX = React.useRef(new Animated.Value(0)).current;
    const keyExtractor = item => item.id;
    const renderItem = ({ item, index }) => {
        const radius = 0.7 * screen.width;
        // const inputRange2 = [
        //     (index - 3) * ITEM_SIZE,
        //     (index - 2) * ITEM_SIZE,
        //     (index - 1) * ITEM_SIZE,
        //     index * ITEM_SIZE,
        //     (index + 1) * ITEM_SIZE,
        //     (index + 2) * ITEM_SIZE,
        //     (index + 3) * ITEM_SIZE
        // ]
        const inputRange = [
            (index - 4) * ITEM_SIZE,
            (index - 3) * ITEM_SIZE,
            (index - 2) * ITEM_SIZE,
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
            (index + 1) * ITEM_SIZE,
            (index + 2) * ITEM_SIZE
        ]

        // outputRange_translateY = [];
        // outputRange_translateX = [];

        // for (var i = 0; i < 7; i++) {
        //     var move_x = Math.sin(inputRange[i] * Math.PI * 2) * radius;
        //     var move_y = -Math.cos(inputRange[i] * Math.PI * 2) * radius;
        //     outputRange_translateX.push(move_x);
        //     outputRange_translateY.push(move_y);
        // }
        const translateX = scrollX.interpolate({
            inputRange,
            outputRange: ['-35deg','-25deg','-10deg','0deg','10deg','25deg','35deg']
        })
        const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [0.1 * APPBAR_HEIGHT, 0.2 * APPBAR_HEIGHT, 0.5 * APPBAR_HEIGHT ,0.75 * APPBAR_HEIGHT, 0.5 * APPBAR_HEIGHT, 0.2 * APPBAR_HEIGHT, 0.1 * APPBAR_HEIGHT]
        })
        const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.6, 0.8, 1, 1.3, 1, 0.8, 0.6]
        })
        if (!item.name) {
            return (
            <View style={{ height: SPACE_ITEM_SIZE }} />
            )
        } else {
            return (
            <Animated.View
                key={item.name}
                style={[styles.container, {
                    width: wp("30%"),
                    height: ITEM_SIZE,
                    transform: [{ translateX }, { scale }, { translateY }],
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: wp("17%")            
                }]}>
                <Image style={styles.avatar} source={item.avatar}/>
                {/* <Pressable
                    onPress={() => console.log("Pressed")}
                    style={{
                        width: wp("50%"),
                        height: ITEM_SIZE,
                        borderWidth: 0,
                        borderRadius: wp("17%"),
                        width: wp("49.8%"), height: wp("49%"),
                        justifyContent: 'center', alignItems: 'center'
                    }}>
                </Pressable> */}
            </Animated.View>
        )}};
    return (
        <Animated.FlatList
            horizontal
            showsVerticalScrollIndicator={false}  
            showsHorizontalScrollIndicator={false} 
            data={data}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            contentContainerStyle={{ alignItems: 'center' }}
            snapToInterval={ITEM_SIZE}
            decelerationRate={0.4}
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: true } 
            )}
            scrollEventThrottle={16}
        />
    )
}

const styles = StyleSheet.create({
    avatar: {
        width: 50 * screen.width / figma_screen_w,
        height: 50 * screen.width / figma_screen_w,
        borderRadius: 70    
    },
    container: {
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'stretch',
        overflow: 'hidden'
    }
});

export default Stories;