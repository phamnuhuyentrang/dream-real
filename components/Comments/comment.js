import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Text, Dimensions, StyleSheet } from 'react-native';
import CommentLayout from './comment_layout';

const Comment = (props) => {
    const data = props.route.params;
    return (
        <View style={{flex: 1}}>
            <CustomBar backgroundColor="#3d3d4e" barStyle="light-content" />
            <Header />
            <View style={{ flex: 1, backgroundColor: "#252a38" }}>
                <View style={styles.container}> 
                    {data.map((item, index) => {
                        return (
                            <CommentLayout comment={item} key={index}/>
                        )
                    })}
                </View> 
            </View>
        </View>
    )
}

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
        marginTop: 0.02 * screen.height,
        overflow: "hidden",
        marginLeft: 0.05 * screen.width,
        marginRight: 0.05 * screen.width,
        marginBottom: 0.02 * screen.height,
    },
})

export default Comment;