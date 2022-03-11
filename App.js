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
	const [login, setLogin] = React.useState(false);
    const [loginned, setLoginned] = React.useState(false);
	const [firstname, setFirstname] = React.useState("");
	const [lastname, setLastname] = React.useState("");
	const [avatar, setAvatar] = React.useState("");
	const [cover, setCover] = React.useState("N/A");
	const [username, setUsername] = React.useState("");
	const [oldId, setOldId] = React.useState(0);
	const [postTrending, setPostTrending] = React.useState([]);
	const [postOffset, setPostOffset] = React.useState(0);
	const [postLoading, setPostLoading] = React.useState(true);
	const userSettings = {
		id: userId,
		setUserId,
		username: username,
		setUsername,
		login: login,
		setLogin,
		loginned: loginned,
		setLoginned,
		firstname: firstname,
		setFirstname,
		lastname: lastname,
		setLastname,
		avatar: avatar,
		setAvatar,
		cover: cover,
		setCover,
		oldId: oldId,
		setOldId,
		posts: postTrending,
		setPostTrending,
		postOffset: postOffset,
		setPostOffset,
		postLoading: postLoading,
		setPostLoading
	}
	return (
		<userIdProvider.Provider value={userSettings}>
			<NavigationContainer ref={navigationRef}>
				<Stack.Navigator screenOptions={{headerShown: false}}>
					<Stack.Screen name="Home" component={Home} />
					<Stack.Screen name="DestinationDetails" component={DestinationDetails} />
					<Stack.Screen name="StoryContent" component={StoryContent} />
					<Stack.Screen name="Comment" component={Comment} />
					<Stack.Screen name="Maps" component={PostMaps} initialParams={{"userId": userSettings.id}}/>
					<Stack.Screen name="SignUp" component={SignUp} />
					<Stack.Screen name="Profile" component={Profile} initialParams={{"profile": {}}}/>
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