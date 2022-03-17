import React from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, Text, Alert } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native';
import userIdProvider from "../../components/Context/user_id_provider"

const screen = Dimensions.get("screen");

const DestinationItems = (props) => {
    const user = React.useContext(userIdProvider);
    const data = props.data;
    const navigation = useNavigation();
    const showImage = () => {
        navigation.navigate('DestinationDetails', {place: global.image_host_url + data.image})
    }

    return (
        <TouchableOpacity style={styles.content} onPress={() => {
            user.selectDestination(data.location_formatted)
            user.setPostTrending([])
            user.setPostOffset(0)
            user.setPostLoading(true)
            Alert.alert("Dream Real Destination", "Filter posts by selected destination !")
        }}>
            <View style={styles.content2}>
                <FontAwesome5Icon color='red' name="map-marker-alt" regular size={10} style={styles.item2}>
                    <Text style={[styles.item2, {color:'#FFF'}]}> {data.location_formatted}</Text>
                </FontAwesome5Icon>
            </View>
            <TouchableOpacity onPress={showImage}>
                <Image source={{uri: global.image_host_url + data.image}} style={styles.place}></Image>
                {/* <Image source={data.image} style={styles.place}></Image> */}
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

// navigate("DestinationDetails", {place: data.place})

const styles = StyleSheet.create({
    content: {
        backgroundColor: "#3D3D4E",
        height: 0.4 * screen.height,
        width: 0.9 * screen.width,
        borderRadius: 0.02 * screen.width,
        marginBottom: 0.03 * screen.height,
        alignSelf: "center",
        marginTop: 0.02 * screen.height
    },
    content2: {
        marginLeft: 0.02 * screen.width,
        marginTop: 0.01 * screen.height,
        flexDirection: 'row',
        alignItems: "stretch",
        justifyContent: 'space-between',
    },
    item2: {
        marginBottom: 0.02 * screen.height,
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: 10,
        marginRight: 0.02 * screen.width,
        marginTop: 0.03 * screen.height,
        marginLeft: "auto"
    },
    place: {
        marginLeft: 0.03 * screen.width,
        marginRight: 0.03 * screen.width,
        width: 0.85 * screen.width,
        height: 0.28 * screen.height
    }
});

export default DestinationItems;