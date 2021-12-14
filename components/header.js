import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import avatar from '../static/img/raiden_shogun.png';
import CustomBar from './statusbar';

const Header = () => {
    return (
        <View style={styles.container}>
            <Image source={avatar} style={styles.avatar}></Image>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#3D3D4E"
    },
    avatar: {
        marginLeft: 10,
        marginTop: 10,
        width: 64,
        height: 64,
        borderRadius: 50
    }
})

export default Header;