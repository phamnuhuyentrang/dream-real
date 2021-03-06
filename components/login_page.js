import React from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput, Dimensions, TouchableOpacity } from "react-native";
import { Svg, Line } from 'react-native-svg'
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import userIdProvider from "./Context/user_id_provider"
import axios from "axios";
// export const userIdProvider = React.createContext();
// import manage_user_id from "../global";

const screen = Dimensions.get("screen");
const LoginPage = (props) => {
    const navigation = useNavigation();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const user_item = React.useContext(userIdProvider);

    const login = () => {
        axios.post(global.back_end_url + '/login', {
            "email": email,
            "password": password
        }).then(async function(response) {
            let json = response.data;
            if (json.success) {
                let cookie = response.headers["set-cookie"][0].split("; ")[0].split("=")[1];
                await SecureStore.setItemAsync("token", cookie);
                Alert.alert("Dream Real Login Success", "Welcome back !")
                props.setLogin(!props.login);
                props.setLoginned(!props.loginned);
                user_item.setUserId(json.id)
                user_item.setAvatar(json.avatar)
                user_item.setFirstname(json.first_name)
                user_item.setLastname(json.last_name)
                user_item.setUsername(json.username)
                user_item.setCover(json.cover)
            }
            else {
                Alert.alert("Dream Real Login Failed", json.message)
            }
        }).catch(function(error){
            Alert.alert("Dream Real Login Error", "Error occured when trying to log in: " + error)
        })
    }

   

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={props.login}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}
            >
                <TouchableOpacity 
                    style={styles.centeredView} 
                    activeOpacity={1} 
                    onPressOut={() => {props.setLogin(false); props.setLoginned(false)}}
                >
                    <View style={styles.modalView}>
                        <View style={styles.inputView}>
                            <TextInput
                            style={styles.TextInput}
                            placeholder="Email..."
                            placeholderTextColor="#003f5c"
                            onChangeText={(email) => setEmail(email)}
                            />
                        </View>

                        <View style={styles.inputView}>
                            <TextInput
                            style={styles.TextInput}
                            placeholder="Password..."
                            placeholderTextColor="#003f5c"
                            secureTextEntry={true}
                            onChangeText={(password) => setPassword(password)}
                            />
                        </View>

                        <TouchableOpacity>
                            <Text style={styles.forgot_button}>Forgot Password?</Text>
                        </TouchableOpacity>
                        <View style={{flexDirection: "row", flexWrap: "wrap"}}>
                            <Pressable
                                style={[styles.loginBtn, {marginRight: 0.065 * screen.width}]}
                                onPress={login}
                            >
                                <Text style={styles.LoginText}>LOGIN</Text>
                            </Pressable>
                            <Pressable
                                style={styles.loginBtn}
                                onPress={() => {
                                    navigation.navigate("SignUp"); 
                                    props.setLogin(!props.login);
                                }}
                            >
                                <Text style={styles.LoginText}>SIGN UP</Text>
                            </Pressable>
                        </View>
                        <Svg style={{overflow: "hidden"}}>
                            <Line 
                            x1={(0.05 * screen.width)}
                            y1={(0.025 * screen.height)}
                            x2={(0.25 * screen.width)}
                            y2={(0.025 * screen.height)}
                            stroke="#c4c4c4" 
                            strokeWidth="2" />
                            <Line 
                            x1={(0.55 * screen.width)}
                            y1={(0.025 * screen.height)}
                            x2={(0.75 * screen.width)}
                            y2={(0.025 * screen.height)}
                            stroke="#c4c4c4" 
                            strokeWidth="2" />
                            <View>
                                <Text style={{color: "white", textAlign: "center", marginTop: 0.005 * screen.height}}> or you can </Text>
                            </View>
                            <View style={{flexDirection: "column", width: "110%", marginLeft: 0.05 * screen.width}}>
                                <Pressable style={styles.loginOther}>
                                    <FontAwesome5Icon color='white' name="facebook-f" style={styles.LoginText}>
                                        <Text>  CONNECT WITH FACEBOOK</Text>
                                    </FontAwesome5Icon>
                                </Pressable>
                                <Pressable style={styles.loginOther}>
                                    <FontAwesome5Icon color='white' name="instagram" style={styles.LoginText}>
                                        <Text>  CONNECT WITH INSTAGRAM</Text>
                                    </FontAwesome5Icon>
                                </Pressable>
                            </View>
                        </Svg>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
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
    inputView: {
        backgroundColor: "#c4c4c4",
        borderRadius: 0.02 * screen.width,
        width: "90%",
        height: 0.06 *  screen.height,
        marginBottom: 0.03 * screen.height,
        textAlign: "left"
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
        width: "40%",
        borderRadius: 0.02 * screen.width,
        height: 0.1 * screen.width,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 0.05 * screen.width,
        backgroundColor: "#B456F1",
    },
    LoginText: {
        color: "white"
    },

    loginOther: {
        width: "80%",
        borderRadius: 0.02 * screen.width,
        height: 0.1 * screen.width,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 0.05 * screen.width,
        backgroundColor: "#B456F1",
    }
});

export default LoginPage;
