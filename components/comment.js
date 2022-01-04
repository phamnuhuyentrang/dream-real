import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Text, Dimensions, StyleSheet } from 'react-native';

const Comment = (props) => {
    comment = props.comment;
    return (
        <View style={styles.container}>
            <Text>{comment}</Text>
        </View>
    )
}

const screenWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 15
    },
})