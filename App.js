import React from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './components/header';
import CustomBar from './components/statusbar';

const App = () => {
	return (
		<View style={styles.container}>
			<CustomBar backgroundColor="#3d3d4e" barStyle="light-content" />
			<Header />
			<View style={{ flex: 1, backgroundColor: "#3d3d4e" }}>
				{/* Display your content */}
			</View>
		</View>
	);
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

export default App