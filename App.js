import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Header from './components/header';
import CustomBar from './components/statusbar';
const App = () => {
	return (
		<SafeAreaProvider>
			<SafeAreaView style={styles.container}>
				<Header />
				<CustomBar />
			</SafeAreaView>
		</SafeAreaProvider>
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