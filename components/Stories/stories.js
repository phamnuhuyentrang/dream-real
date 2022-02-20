import React, {PureComponent} from 'react';
import { View, Image, StyleSheet, Dimensions, Alert, Pressable, TouchableOpacity } from 'react-native';
import CircleList from "./circle_list";

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

import axios from "axios"


const ITEM_SIZE = wp(50);
const SPACE_ITEM_SIZE = (hp(38) - ITEM_SIZE) / 2;

const screen = Dimensions.get("screen");
const window = Dimensions.get("window");
const figma_screen_w = 428;
const figma_screen_h = 926;

const APPBAR_HEIGHT = 200 * screen.height / figma_screen_h;

const Stories = () => {
    const [loading, setLoading] = React.useState(true)
    const [displayData, setDisplayData] = React.useState([])

    React.useEffect(() => {
        if (loading) {
            axios.get(global.back_end_url + `/get_admin`)
            .then((response) => {
                let json = JSON.parse(JSON.stringify(response.data))
                if (json.success == true) {
                    setDisplayData(json.admin);
                    if (json.admin.length <= 16) {
                        for (var i = 0; i <= 16 - json.admin.length; i++) {
                            setDisplayData([...json.admin, json.admin[i % json.admin.length]])
                        }
                    }
                    setLoading(false);
                } 
                else {
                    Alert.alert("Dream Real Get Admin Error", json.message)
                }
            })
            .catch((error) => Alert.alert("Dream Real Get Admin Error", error))
        }
    }, [loading])

    const navigation = useNavigation();
    const showPost = (item) => {
        navigation.navigate('StoryContent', {user_id: item.user_id})
    }
    const keyExtractor = (item, index) => index;
    const renderItem = ({ item }) => <TouchableOpacity onPress={() => showPost(item)}><Image style={styles.avatar} source={{uri: global.image_host_url + item.avatar}} /></TouchableOpacity>
    
    return (
        displayData.length > 0 && <CircleList 
            elementCount={16}
            data={displayData}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
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
        overflow: 'hidden',
    },
});

export default Stories;
