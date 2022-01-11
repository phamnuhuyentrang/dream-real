import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from '../components/header';
import CustomBar from '../components/statusbar';
import MenuBar from '../components/menubar';
// import * as SecureStore from 'expo-secure-store';

// const getToken = async () => {
// 	let token = await SecureStore.getItemAsync("token");
// 	console.log(token)
// }

class Home extends PureComponent  {
	render() {
        return (
            <View style={styles.container}>
                <CustomBar backgroundColor="#3d3d4e" barStyle="light-content" />
                <Header />
                <View style={{ flex: 1, backgroundColor: "#252a38" }}>
                    <MenuBar></MenuBar>
                </View>
            </View>
	    );
    }
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	text: {
		fontSize: 25,
		fontWeight: '500',
		textAlign: "center"
	}
})

export default Home