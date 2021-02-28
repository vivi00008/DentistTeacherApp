import React from "react";
import { View, Text, SafeAreaView, ImageBackground } from "react-native";
import { Avatar } from "react-native-paper";
import styles from "../Styles";

const StatusScreen = () =>{
    return (
        <ImageBackground
            source={require("../../assets/picture/mainBg.png")}
            style={styles.root}
        >
            <SafeAreaView style={styles.bgContainer}>
                <Text style={styles.textHeader}>
                    ตารางนัดหมาย
                </Text>
            </SafeAreaView>
            <View style={styles.contentBg}>
                <View style={styles.container}>
                    <Avatar.Image
                        size={108}
                        source={require("../../assets/picture/dental-care.png")}
                        style={styles.iconContent}
                    />
                </View>
            </View>
        </ImageBackground>
    )
}

export default StatusScreen