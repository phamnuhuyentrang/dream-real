import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput, Dimensions, TouchableOpacity, Image, Keyboard, Platform, KeyboardAvoidingView, TouchableWithoutFeedback } from "react-native";

import background from "../static/img/signup/signup_background.jpg"
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import * as ImagePicker from 'expo-image-picker';
import logo from '../static/img/dream-real-logo-nav.png'
import CustomBar from '../components/statusbar';
import { ScrollView } from "react-native-gesture-handler";
import * as SecureStore from 'expo-secure-store';

const screen = Dimensions.get("screen");
const figma_screen_w = 428;
const figma_screen_h = 926;

const SignUp = (props) => {
    const [firstname, setFirstname] = React.useState("");
    const [lastname, setLastname] = React.useState("");
    const [location, setLocation] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [cpassword, setCPassword] = React.useState("");
    const [avatar, setAvatar] = React.useState(null);
    const [cover, setCover] = React.useState(null);

    const signup = async () => {
        let body = {
            first_name: firstname,
            last_name: lastname,
            info_lives: location,
            location_hash: "ChIJzWXFYYuifDUR64Pq5LTtioU",
            email: username,
            password: password,
            c_password: cpassword
        }
        if (avatar != null) {
            body.avatar = avatar
        }
        if (cover != null) {
            body.cover = cover
        }
        let response = await fetch('https://v3-beta.dreamreal.co/api/register/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        try {
            let json = await response.json();
            if (json.success) {
                await SecureStore.setItemAsync("token", json.data.token);
                await SecureStore.setItemAsync("name", json.data.name);
                Alert.alert("Dream Real Register Success", "Welcome " + json.data.name+ " to Dream Real !")
            }
            else {
                Alert.alert("Dream Real Register Failed", json.message)
            }
        }
        catch(e) {
            Alert.alert("Dream Real Register Error", "Error occured when trying to sign up: " + e)
        }
    }

    const txt = '\u{1f5bc}' + " Upload your cover image " 

    const pickAvatar = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
        });
        
        if (!result.cancelled) {
            setAvatar(result.base64);
        }
    };

    const pickCover = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
        });
        
        if (!result.cancelled) {
            setCover(result.base64);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{flex: 1}}
        >
            <CustomBar backgroundColor="black" barStyle="light-content" />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.centeredView}>
                    <Image source={background} resizeMode="cover" style={styles.background}>
                    </Image>
                    <Image source={logo} style={{width: 0.5 * screen.width, height: 0.05 * screen.height, marginBottom: 0.04 * screen.height}} />
                    <View style={styles.content}>
                        <Text style={{color: "#fff", fontSize: 30, textAlign: "center", marginBottom: 0.02 * screen.height}}>Create your account!</Text>
                        
                        <View style={styles.row}>
                            <TouchableOpacity style={styles.addPhoto} onPress={pickAvatar}>
                                <FontAwesome5Icon name="user-circle" size={45} solid color='white'></FontAwesome5Icon>
                                <View style={{width: "90%"}}>
                                    <Text style={{textAlign: "center"}}>Add your photo</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={styles.col}>
                                <View style={styles.inputViewCol1}>
                                    <TextInput
                                        style={styles.TextInput}
                                        placeholder="First Name"
                                        placeholderTextColor="#003f5c"
                                        onChangeText={(firstname) => setFirstname(firstname)}
                                    />
                                </View>
                                <View style={styles.inputViewCol2}>
                                    <TextInput
                                    style={styles.TextInput}
                                    placeholder="Last Name"
                                    placeholderTextColor="#003f5c"
                                    onChangeText={(ln) => setLastname(ln)}
                                    />
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.inputView} onPress={pickCover}>
                            <Text style={{...styles.TextInput, color: "#003f5c", marginTop: 0.017*screen.height}}>{txt}</Text>
                        </TouchableOpacity>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Location"
                                placeholderTextColor="#003f5c"
                                onChangeText={(location) => setLocation(location)}
                            />
                        </View>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Email"
                                placeholderTextColor="#003f5c"
                                onChangeText={(usr) => setUsername(usr)}
                            />
                        </View>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Password"
                                placeholderTextColor="#003f5c"
                                secureTextEntry={true}
                                onChangeText={(pwd) => setPassword(pwd)}
                            />
                        </View>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Repeat password"
                                placeholderTextColor="#003f5c"
                                secureTextEntry={true}
                                onChangeText={(cpwd) => setCPassword(cpwd)}
                            />
                        </View>
                        <Pressable
                            style={styles.loginBtn}
                            onPress={signup}
                        >
                            <Text style={styles.LoginText}>SIGN UP</Text>
                        </Pressable>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: 250 * screen.width / figma_screen_w,
        height: 80 * screen.height / figma_screen_h,
        marginBottom: 0.03 * screen.height
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    background: {
        flex: 1,
        resizeMode: "stretch",
        top: 0,
        left: 0,
        position: "absolute",
        zIndex: 0
    },
    content: {
        position: "relative",
        zIndex: 1,
    },
    addPhoto: {
        backgroundColor: "#c4c4c4", 
        justifyContent: "center", 
        alignItems: "center", 
        marginRight: 0.02 * screen.width,
        borderRadius: 0.02 * screen.width,
        width: 0.3 * screen.width
    },
    row: {
        flexDirection: "row",
        marginLeft: 0.05 * screen.width,
        marginRight: 0.05 * screen.width,
        marginBottom: 0.02 * screen.height,
        height: 0.16 * screen.height
    },
    col: {
        flexDirection: "column"
    },
    modalView: {
        marginTop: 0.28 * screen.height,
        marginBottom: 0.02 * screen.height,
        marginRight: 0.05 * screen.width,
        marginLeft: 0.05 * screen.width,
        backgroundColor: "#3D3D4E",
        borderRadius: 0.02 * screen.width,
        paddingTop: 0.05 * screen.height,
        paddingLeft: 0.05 * screen.width,  
        paddingRight: 0.05 * screen.width,        
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: "90%",
        height: 0.7 * screen.height
    },
    inputViewCol1: {
        backgroundColor: "#c4c4c4",
        borderTopLeftRadius: 0.02 * screen.width,
        borderTopRightRadius: 0.02 * screen.width,
        width: 0.58 * screen.width,
        borderBottomWidth: 0.1, 
        height: 0.08 *  screen.height,
        textAlign: "left"
    },
    inputViewCol2: {
        backgroundColor: "#c4c4c4",
        borderTopWidth: 0.1, 
        borderBottomLeftRadius: 0.02 * screen.width,
        borderBottomRightRadius: 0.02 * screen.width,
        width: 0.58 * screen.width,
        height: 0.08 *  screen.height,
        textAlign: "left"
    },
    inputView: {
        backgroundColor: "#c4c4c4",
        borderRadius: 0.02 * screen.width,
        width: 0.9 *screen.width,
        height: 0.06 *  screen.height,
        marginBottom: 0.02 * screen.height,
        textAlign: "left",
        marginLeft: 0.05 * screen.width,
    },
    
    TextInput: {
        flex: 1,
        paddingLeft: 0.005 * screen.width,
        marginLeft: 0.05 * screen.width,
    },
    forgot_button: {
        height: 0.05 * screen.width,
        marginBottom: 0.0 * screen.height,
        color: "white"
    },
    
    loginBtn: {
        borderRadius: 0.02 * screen.width,
        width: 0.9 *screen.width,
        height: 0.06 *  screen.height,
        marginBottom: 0.02 * screen.height,
        marginLeft: 0.05 * screen.width,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#B456F1",
    },
    LoginText: {
        color: "white"
    }
});

export default SignUp;