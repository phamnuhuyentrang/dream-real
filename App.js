import React from 'react';
import { StyleSheet } from 'react-native';
import Home from "./screens/home"
import DestinationDetails from './components/Destinations/destination_details';
import StoryContent from "./components/Stories/Content/content"
import Comment from './components/Comments/comment';
import PostMaps from './components/PostMaps/posts_pins';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationRef } from './navigation-root';

const Stack = createNativeStackNavigator();

const App = () => {
	return (
		<NavigationContainer ref={navigationRef}>
			<Stack.Navigator screenOptions={{headerShown: false}}>
				<Stack.Screen name="Home" component={Home} />
				<Stack.Screen name="DestinationDetails" component={DestinationDetails} />
				<Stack.Screen name="StoryContent" component={StoryContent} />
				<Stack.Screen name="Comment" component={Comment} />
				<Stack.Screen name="Maps" component={PostMaps} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: "red"
	},
	text: {
		fontSize: 25,
		fontWeight: '500',
		textAlign: "center"
	}
})

export default App