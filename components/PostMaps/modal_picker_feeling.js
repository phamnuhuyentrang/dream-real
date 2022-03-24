import axios from 'axios';
import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView, Image, Alert } from 'react-native'
import allentries from "../../static/img/icon-button/270d.png"

const screen = Dimensions.get("screen");
const window = Dimensions.get("window")

const ModalPickerFeeling = (props) => {

    const onPressItem = (option) => {
        if (option.value === "allFeeling") {
            axios.get(global.back_end_url + "/album_trending", {
                params: {
                    user_id: props.userId,
                    offset: 0,
                    limit: 10
                }
            }).then((response) => {
                let json = JSON.parse(JSON.stringify(response.data))
                if (json.success) {
                    props.changeModalVisibility(false)
                    props.setSelectedFeeling({label: option.label.toString(), value: option.value.toString(), url: option.url})
                    props.setData(JSON.parse(JSON.stringify(json.albums)))
                    props.setListActivity([{label: "All Entries", value: "allActivities", url: allentries}])
                    props.setSelectedActivity({label: "All Entries", value: "allActivities", url: allentries})
                }else {
                    Alert.alert("Dream Real Load Failed", json.message)
                }
            }).catch(function(error){
                Alert.alert("Dream Real Load Error", error)
            })
            props.setListActivity({label: "All Entries", value: "allActivities", url: allentries})
        }
        else {
            axios.get(global.back_end_url + "/filter_album_by_feeling", {
                params: {
                    user_id: props.userId,
                    feeling: option.value
                }
            }).then((response) => {
                let json = JSON.parse(JSON.stringify(response.data))
                if (json.success) {
                    props.changeModalVisibility(false)
                    props.setSelectedFeeling({label: option.label.toString(), value: option.value.toString(), url: option.url})
                    props.setData(json.album)
                }else {
                    Alert.alert("Dream Real Load Failed", json.message)
                }
            }).catch(function(error){
                Alert.alert("Dream Real Load Error", error)
            })

            axios.get(global.back_end_url + "/tags", {
                params: {
                    slug: option.value
                }
            }).then((response) => {
                let json = JSON.parse(JSON.stringify(response.data))
                if (json.success) {
                    props.setListActivity([{label: "All Entries", value: "allActivity", url: allentries}, ...json.tags.map((tag) => {return {label: tag.title, value: tag.title, url: tag.url}})])
                }else {
                    Alert.alert("Dream Real Load Failed", json.message)
                }
            }).catch(function(error){
                Alert.alert("Dream Real Load Error", error)
            })
        }
    }
    const options = props.listValue.map((item, index) => {
        return (
            <TouchableOpacity
                key={index}
                onPress={() => onPressItem(item)}
            >
                <View style={{height: 0.1 * screen.height, flexDirection: 'row', alignItems: "center"}}>
                    <Image source={item.url} style={{width: 0.1 * screen.width, height: 0.1 * screen.width, marginRight: 0.05 * screen.width, marginLeft: 0.05 * screen.width}}></Image>
                    <Text style={styles.text}>
                        {item.label}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    })

    return (
        <TouchableOpacity style={{flex: 1, alignItems: "center", justifyContent: "center"}} onPress={() => props.changeModalVisibility(false)}>
            <View style={{height: screen.height * 0.5, width: 0.9 * screen.width, backgroundColor: "white", borderRadius: 10}}>
                <ScrollView>
                    {options}
                </ScrollView>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({});

export default ModalPickerFeeling;