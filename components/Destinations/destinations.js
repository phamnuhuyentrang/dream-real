import React from 'react';
import { View, Dimensions, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

import DestinationItems from './destinations_items';

const screen = Dimensions.get("screen");

const Destinations = () => {
    const [data, setData] = React.useState([]);
    const [offset, setOffset] = React.useState(0);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        if (loading) {
            axios.get(global.back_end_url + `/destination`, {
                params: { offset: offset } 
            })
            .then((response) => {
                let json = response.data
                if (json.success) {
                    setData([...data, ...JSON.parse(JSON.stringify(json.destinations))])
                    setLoading(false)
                    setOffset(offset + 10)
                }
                else {
                    Alert.alert("Dream Real Loading Error", "Error occured when trying to load destinations: " + json.message)
                }
            })
            .catch((error) => Alert.alert("Dream Real Loading Error", "Error occured when trying to load destinations: " + error))
        }
    }, [loading])

    return (
        <View> 
            {data != [] ? data.map((destination, index) => {
                return (
                    <DestinationItems data={destination} key={index}/>
                )
            }): <Text>Loading ...</Text>}
            {data != [] && <TouchableOpacity style={styles.buttonLoad} onPress={() => setLoading(true)}>
                <Text style={{textAlign: "center", alignItems: "center", justifyContent: "center", fontSize: 0.03 * screen.height, color: "white"}}> Load more </Text>
            </TouchableOpacity> }
        </View>
    )
}

const styles = StyleSheet.create({
    buttonLoad: {
        width: 0.9 * screen.width,
        height: 0.05 * screen.height,
        marginBottom: 0.02 * screen.height,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 0.02 * screen.width,
        backgroundColor: "#3D3D4E",
    }
})

export default Destinations;