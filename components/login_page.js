import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput, Dimensions, TouchableOpacity } from "react-native";

const screen = Dimensions.get("screen");

const LoginPage = (props) => {

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("")

    const login = () => {
        props.setLogin(!props.login);
        props.setLoginned(!props.loginned)
    }

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={props.login}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    console.log("Login Page: "+ login)
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.inputView}>
                            <TextInput
                            style={styles.TextInput}
                            placeholder="Email..."
                            placeholderTextColor="#003f5c"
                            onChangeText={(username) => setUsername(username)}
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
                        <Pressable
                            style={styles.loginBtn}
                            onPress={login}
                        >
                            <Text style={styles.LoginText}>LOGIN</Text>
                        </Pressable>
                        <Pressable
                            style={styles.loginBtn}
                        >
                            <Text style={styles.LoginText}>SIGN UP</Text>
                        </Pressable>
                    </View>
                </View>
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
        marginTop: 0.02 * screen.height,
        marginBottom: 0.02 * screen.height,
        marginRight: 0.05 * screen.width,
        marginLeft: 0.05 * screen.width,
        backgroundColor: "#3D3D4E",
        borderRadius: 0.05 * screen.width,
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
        height: 0.45 * screen.height
    },
    inputView: {
        backgroundColor: "#B456F1",
        borderRadius: 0.05 * screen.width,
        width: "90%",
        height: 0.06 *  screen.height,
        marginBottom: 0.03 * screen.height,
        textAlign: "left"
    },
    
    TextInput: {
        // height: 50,
        flex: 1,
        paddingLeft: 0.005 * screen.width,
        marginLeft: 0.05 * screen.width,
    },
    forgot_button: {
        height: 0.05 * screen.width,
        marginBottom: 0.0 * screen.height,
    },
    
    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 0.05 * screen.width,
        backgroundColor: "#AAA",
    },
});

export default LoginPage;