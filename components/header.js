import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import avatar from '../static/img/raiden_shogun.png';

const Header = () => {
    return (
        <View style={styles.container}>
            <Image source={avatar} style={styles.avatar}></Image>
        </View>
    )
}

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 80 : 56;

const styles = StyleSheet.create({
    container: {
        height: APPBAR_HEIGHT,
        backgroundColor: "#3D3D4E"
    },
    avatar: {
        marginLeft: 10,
        marginTop: 10,
        width: 40,
        height: 40,
        borderRadius: 50
    }
})

export default Header;