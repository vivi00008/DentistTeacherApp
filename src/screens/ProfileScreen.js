import React, {useContext} from "react";
import { View, Text, SafeAreaView, ImageBackground, TouchableOpacity} from "react-native";
import styles from "../Styles";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {UserContext} from '../context/UserContext'


const ProfileScreen = () =>{
    const user = useContext(UserContext)
    const doLogout =() =>{
        user.setIsAuth(false)
    }
    return (
        <ImageBackground
            source={require("../../assets/picture/mainBg.png")}
            style={styles.root}
        >
            <SafeAreaView style={styles.bgContainer}>
                <Text style={styles.textHeader}>
                    โปรไฟล์
                </Text>
            </SafeAreaView>
            <View style={styles.contentBg}>
                <View style={styles.container}>
                <TouchableOpacity
                        style={styles.loginButton}
                        onPress={doLogout}
                    >
                        <Text style={styles.textButton}>ออกจากระบบ</Text>
                        <MaterialIcons
                            name="logout"
                            size={24}
                            style={styles.iconArrowRight}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    )
}

export default ProfileScreen