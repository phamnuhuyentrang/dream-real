import React from 'react';
import { StyleSheet } from 'react-native';
import Home from "./screens/home"
import DestinationDetails from './components/Destinations/destination_details';
import StoryContent from "./components/Stories/Content/content"
import Comment from './components/Comments/comment';
import SignUp from './screens/signup';
import PostMaps from './components/PostMaps/posts_pins';
import Profile from './screens/profile';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationRef } from './navigation-root';
import userIdProvider from "./components/Context/user_id_provider"


const Stack = createNativeStackNavigator();

const App = () => {
	const [userId, setUserId] = React.useState(0);
	const userSettings = {
		id: userId,
		setUserId
	}
	return (
		<userIdProvider.Provider value={userSettings}>
			<NavigationContainer ref={navigationRef}>
				<Stack.Navigator screenOptions={{headerShown: false}}>
					<Stack.Screen name="Home" component={Home} />
					<Stack.Screen name="DestinationDetails" component={DestinationDetails} />
					<Stack.Screen name="StoryContent" component={StoryContent} />
					<Stack.Screen name="Comment" component={Comment} />
					<Stack.Screen name="Maps" component={PostMaps} />
					<Stack.Screen name="SignUp" component={SignUp} />
					<Stack.Screen name="Profile" component={Profile} />
				</Stack.Navigator>
			</NavigationContainer>
		</userIdProvider.Provider>
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