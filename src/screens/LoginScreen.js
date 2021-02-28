import React, { useState, useContext, useEffect, useCallback } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    SafeAreaView,
    TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native-paper";
import FeatherIcon from "react-native-vector-icons/Feather";
import { UserContext } from "../context/UserContext";
import userApi from "../api/userApi";

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;
const LoginScreen = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const user = useContext(UserContext)

    const handleUsername = useCallback((value) => {
        setUsername(value);
    }, []);

    const handlePassword = useCallback((value) => {
        setPassword(value);
    }, []);

    const doLogin = async () => {
        try {
            const response = await userApi.post(
                "/login-professor",
                {
                    username: username,
                    password: password,
                },
                {
                    headers: {
                        "content-type": "application/json",
                    },
                }
            );
            
            if(response.data.success){
                user.setUser(response.data)
                user.setIsAuth(true)
                user.setToken(response.data.token)
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <SafeAreaView style={styles.root}>
            <View style={styles.container}>
                <Image
                    source={require("../../assets/picture/dentistLogo.png")}
                    resizeMode="stretch"
                    style={styles.dentistLogo}
                />
                <Image
                    source={require("../../assets/picture/logoApp.png")}
                    resizeMode="stretch"
                    style={styles.appLogo}
                />
                <Text style={styles.textTitle}>
                    สำหรับอาจารย์สถาบันทันตกรรม
                </Text>
                <TextInput
                    label="บัญชีผู้ใช้"
                    mode="outlined"
                    onChangeText={(text) => handleUsername(text)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.input}
                    theme={{
                        colors: { text: "black", primary: "rgb(46,196,182)" },
                    }}
                    focusable={true}
                />
                <TextInput
                    label="รหัสผ่าน"
                    mode="outlined"
                    onChangeText={(text) => handlePassword(text)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.input}
                    theme={{
                        colors: { text: "black", primary: "rgb(46,196,182)" },
                    }}
                    secureTextEntry={true}
                />
                <TouchableOpacity style={styles.loginButton} onPress={doLogin}>
                    <Text style={styles.textButton}>เข้าสู่ระบบ</Text>
                    <FeatherIcon
                        name="arrow-right"
                        size={24}
                        style={styles.iconArrow}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.forgetButton}>
                    <Text style={styles.forgetText}>ลืมรหัสผ่าน?</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "white",
    },
    container: {
        marginHorizontal: 24,
        marginVertical: 18,
    },
    center: {
        justifyContent: "center",
        alignItems: "center",
    },
    appLogo: {
        width: WIDTH / 2.5,
        height: HEIGHT / 5,
        marginVertical: 36,
        alignSelf: "center",
    },
    dentistLogo: {
        width: WIDTH / 7,
        height: HEIGHT / 15,
        left: 0,
    },
    input: {
        backgroundColor: "white",
        color: "green",
        margin: 15,
        fontFamily: "kanitRegular",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    loginButton: {
        flexDirection: "row",
        backgroundColor: "rgb(46,196,182)",
        width: WIDTH / 1.8,
        height: HEIGHT / 15,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        alignSelf: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginVertical: 18,
    },
    textButton: {
        fontSize: 18,
        fontFamily: "kanitRegular",
        color: "white",
    },
    iconArrow: {
        color: "white",
        right: 10,
        position: "absolute",
    },
    forgetButton: {
        alignSelf: "center",
    },
    forgetText: {
        fontFamily: "kanitRegular",
        fontSize: 12,
    },
    textTitle: {
        fontFamily: "kanitSemiBold",
        fontSize: 24,
        alignSelf: "center",
        marginVertical: 12,
    },
});

export default LoginScreen;
