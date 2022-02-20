import React from 'react';
import { View, Dimensions, TouchableOpacity, StyleSheet, Text, Alert } from 'react-native';
import axios from "axios";


import ConnectItems from "./connect_items"
import userIdProvider from '../Context/user_id_provider';

const screen = Dimensions.get("screen");
const window = Dimensions.get("window");

const Connect = () => {

    const [data, setData] = React.useState([])
    const [end, setEnd] = React.useState(false)
    const [offset, setOffset] = React.useState(0)
    const [loading, setLoading] = React.useState(true);
    const user_item = React.useContext(userIdProvider)
    React.useEffect(() => {
        if (loading) {
            axios.get(global.back_end_url + "/get_connection", {
                params: { user_id: user_item.id, offset: offset } 
            }).then((response) => {
                if (JSON.parse(JSON.stringify(response.data.friends)).length < 10) {    
                    setEnd(true)
                }
                setData([...data, ...JSON.parse(JSON.stringify(response.data.friends))])
                setLoading(false)
                setOffset(offset + 20)
            }).catch((error) => Alert.alert("Dream Real Loading Error", "Error occured when trying to load connectors: " + error))
        }
    }, [loading])

    return (
        <View style={{flexDirection: "row", flexWrap: "wrap"}}> 
            {data.map((person, index) => {
                return (
                    <ConnectItems data={person} key={index}/>
                )
            })}
            {!end && <TouchableOpacity style={styles.buttonLoad} onPress={() => setLoading(true)}>
                <Text style={styles.button}> Load more </Text>
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
    },
    button: {
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 0.03 * screen.height,
        color: "white"
    }
});

export default Connect;